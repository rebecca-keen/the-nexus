import { useState, useRef, useCallback, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { CSS, VBadge, Sidebar, PrivacyModal, SubmitSourceForm } from './components.jsx';
import {
  ADMIN_USER, ADMIN_PASS, TOPICS, REGIONS, VERDICTS, MEDIA_LIBRARY,
  SEED_STORIES, SEED_POSTS, REDDIT_SUBS, SOURCES, RESEARCHERS,
  autoVerdict, getType, fmtNum, OPENROUTER_KEY, AI_MODEL,
} from './data.js';

// ── AI helper — OpenRouter (free tier, browser-safe) ─────────────────────────
const callAI = async (system, userMsg, history = [], maxTokens = 900) => {
  const messages = [
    ...(history.length ? history.map(m => ({ role: m.role, content: m.content })) : []),
    { role: "user", content: userMsg },
  ];
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENROUTER_KEY}`,
      "HTTP-Referer": "https://thenexusapp.com",
      "X-Title": "The Nexus",
    },
    body: JSON.stringify({
      model: AI_MODEL,
      max_tokens: maxTokens,
      messages: [{ role: "system", content: system }, ...messages],
    }),
  });
  if (!res.ok) throw new Error(`AI error ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
};
let _session = null; // eslint-disable-line
const saveSession = u => { _session = u; };
const clearSession = () => { _session = null; };

const TYPE_ICON = { book:"📖", documentary:"🎬", film:"🎥", article:"📰" };
const TYPE_CLR  = { book:"#5a9ac8", documentary:"#a060d0", film:"#4a9a5a", article:"#c0a020" };
const CONF_LABELS = { confirmed:"✓ Confirmed", likely:"↑ Likely", contested:"⚖ Disputed", unverified:"? Unverified" };
const CONF_COLORS = { confirmed:{bg:"#0d2010",c:"#40c070",b:"#1a4a1a"}, likely:{bg:"#0d1a10",c:"#60c080",b:"#1a3a1a"}, contested:{bg:"#1e1808",c:"#c0a020",b:"#3a3010"}, unverified:{bg:"#1a1008",c:"#c07020",b:"#3a2010"} };
const CT_LABELS = { research:"🔬 Research", document:"📄 Document", sighting:"👁 Sighting", tip:"💡 Tip", rebuttal:"⚖ Counter", media:"📷 Media" };

const toSlug = str => (str || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);

// Convert relative time strings to readable dates for display
const fmtDate = (timeStr) => {
  if (!timeStr) return '';
  // If it looks like a relative time ("6h ago", "2d ago") convert to approx date
  const hoursMatch = timeStr.match(/^(\d+)h ago/);
  const daysMatch  = timeStr.match(/^(\d+)d? ago/);
  if (hoursMatch || daysMatch) {
    const hrs = hoursMatch ? parseInt(hoursMatch[1]) : parseInt(daysMatch[1]) * 24;
    const d = new Date(Date.now() - hrs * 3600000);
    return d.toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' });
  }
  return timeStr;
};

function App() {
  // ── User state ─────────────────────────────────────────────────────────────
  const [user, setUser]         = useState({ plan:"free", isAdmin:false });
  const isAdmin = user.isAdmin;
  const isPaid  = true; // eslint-disable-line no-unused-vars

  // ── Navigation ──────────────────────────────────────────────────────────────
  const [view, setView]         = useState("home");
  const [openStory, setOpenStory] = useState(null);

  // ── Content state ───────────────────────────────────────────────────────────
  const [stories, setStories]   = useState(SEED_STORIES);
  const [posts,   setPosts]     = useState(SEED_POSTS);
  const [verdicts, setVerdicts] = useState({});
  const [saved,   setSaved]     = useState({});

  // ── Filters ─────────────────────────────────────────────────────────────────
  const [filters, setFilters]   = useState({ topic:"All Topics", region:"All Regions", srcType:"All Sources", sortBy:"Latest", search:"", verdict:"All" });
  const [libType, setLibType]   = useState("All");
  const [libTopic, setLibTopic] = useState("All Topics");
  const [libQ, setLibQ]         = useState("");

  // ── Reddit ──────────────────────────────────────────────────────────────────
  const [rPosts, setRPosts]     = useState([]);
  const [rLoad,  setRLoad]      = useState(false);
  const [sub,    setSub]        = useState(REDDIT_SUBS[0]);
  const [rSort,  setRSort]      = useState("hot");

  // ── Community form ──────────────────────────────────────────────────────────
  const [showForm, setShowForm] = useState(false);
  const [showSrc, setShowSrc]   = useState(false);
  const [np, setNp]             = useState({ title:"", body:"", topic:TOPICS[1], region:"🌍 Global", contentType:"research", confidence:"unverified", tags:"" });
  const [refs, setRefs]         = useState([{ label:"", url:"" }]);
  const [uploads, setUploads]   = useState([]);
  const [drag, setDrag]         = useState(false);
  const [disc, setDisc]         = useState(false);
  const [cSort, setCSort]       = useState("Hot");

  // ── AI chat ─────────────────────────────────────────────────────────────────

  // ── Modals ──────────────────────────────────────────────────────────────────
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [activeResearcher, setActiveResearcher] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  // ── Refs ────────────────────────────────────────────────────────────────────
  const imgRef = useRef(null);
  const docRef = useRef(null);

  // ── Toast ────────────────────────────────────────────────────────────────────
  const [toast, setToast] = useState(null);
  const toast2 = msg => { setToast(msg); setTimeout(() => setToast(null), 2200); };

  // Update URL, title, and Open Graph tags when a story opens (SEO)
  useEffect(() => {
    if (openStory) {
      const slug = toSlug(openStory.title);
      window.history.pushState({}, '', '/records/' + slug);
      document.title = openStory.title + ' - The Nexus';
      const desc = openStory.summary ? openStory.summary.slice(0, 160) : openStory.title;
      // Meta description
      let meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', desc);
      // Open Graph tags
      const setOG = (prop, val) => {
        let el = document.querySelector(`meta[property="${prop}"]`);
        if (!el) { el = document.createElement('meta'); el.setAttribute('property', prop); document.head.appendChild(el); }
        el.setAttribute('content', val);
      };
      setOG('og:title', openStory.title + ' - The Nexus');
      setOG('og:description', desc);
      setOG('og:url', 'https://nexusverse.app/records/' + slug);
      setOG('og:type', 'article');
      setOG('og:site_name', 'The Nexus');
      setOG('og:image', 'https://nexusverse.app/og-image.png');
      // Twitter card
      const setTW = (name, val) => {
        let el = document.querySelector(`meta[name="${name}"]`);
        if (!el) { el = document.createElement('meta'); el.setAttribute('name', name); document.head.appendChild(el); }
        el.setAttribute('content', val);
      };
      setTW('twitter:card', 'summary_large_image');
      setTW('twitter:title', openStory.title + ' - The Nexus');
      setTW('twitter:description', desc);
      setTW('twitter:image', 'https://nexusverse.app/og-image.png');
    } else {
      // Reset to defaults when no story open
      document.title = 'The Nexus - Independent Research Platform';
      const setOG = (prop, val) => { const el = document.querySelector(`meta[property="${prop}"]`); if (el) el.setAttribute('content', val); };
      setOG('og:title', 'The Nexus - Independent Research Platform');
      setOG('og:description', 'Investigative journalism, declassified records, whistleblower testimony, and disputed history.');
      setOG('og:url', 'https://nexusverse.app/');
    }
  }, [openStory]);

  // Update URL when topic filter changes
  useEffect(() => {
    if (view === 'feed' && !openStory) {
      if (filters.topic && filters.topic !== 'All Topics') {
        const slug = filters.topic.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        window.history.pushState({}, '', '/records/topic/' + slug);
        document.title = filters.topic + ' - The Nexus Records';
      } else if (filters.search) {
        window.history.pushState({}, '', '/records?q=' + encodeURIComponent(filters.search));
        document.title = 'Search: ' + filters.search + ' - The Nexus';
      } else {
        window.history.pushState({}, '', '/records');
        document.title = 'Open Records - The Nexus';
      }
    }
  }, [filters.topic, filters.search, view, openStory]); // eslint-disable-line

  // On load: check URL and open matching story if on a /records/ path
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/records/')) {
      const urlSlug = path.replace('/records/', '').replace(/\/$/, '');
      if (urlSlug) {
        const match = SEED_STORIES.find(s => toSlug(s.title) === urlSlug);
        if (match) {
          setOpenStory(match);
          setView('feed');
          document.title = match.title + ' - The Nexus';
        } else {
          // No exact match - go to feed and show all records
          setView('feed');
        }
      }
    } else if (path.startsWith('/sources')) {
      setView('sources');
    } else if (path.startsWith('/community')) {
      setView('community');
    } else if (path.startsWith('/library')) {
      setView('library');
    } else if (path.startsWith('/reddit')) {
      setView('reddit');
    } else if (path.startsWith('/records')) {
      setView('feed');
    }
  }, []); // eslint-disable-line





  // ── Fetch more stories ───────────────────────────────────────────────────────
  const fetchMore = useCallback(async (hint = "") => {
    try {
      const used = stories.slice(0, 6).map(s => s.title).join("; ");
      const system = `Generate 5 investigative research stories as a JSON array. No markdown, no backticks, output raw JSON only. Each object: {type:"news"|"blog"|"archive"|"research", source:"outlet name", sourceUrl:"url", topic:"one of: Government & Intelligence, Unresolved Events, Hidden History, Health & Science, Finance & Power, UAP & Anomalous, Ancient Civilizations, Forbidden Science, Lost Technology, Remote Viewing & PSI, Portals & Stargates, Animal Intelligence, Giants & Nephilim, Biblical & Religious Records", region:"flag + country", title:"specific headline", summary:"2-3 sentences with real names and document references", tags:["tag1","tag2","tag3"], credible:50-97, debunked:100-credible, upvotes:500-9000, comments:50-2000}. Use real outlets. Do not repeat: ${used}`;
      const raw = await callAI(system, hint ? `Focus on: ${hint}` : "Generate diverse stories across all topics", [], 1200);
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      const newStories = parsed.map((s, i) => ({ ...s, id:`ai-${Date.now()}-${i}`, time:`${i + 1}h ago` }));
      setStories(prev => [...newStories, ...prev]);
      toast2(`✓ ${newStories.length} new records loaded`);
    } catch { toast2("All records loaded — check back soon for more"); }
  }, [stories]);

  // Stories load from SEED_STORIES in data.js — no API call needed on mount

  // ── Fetch Reddit ─────────────────────────────────────────────────────────────
  const fetchReddit = useCallback(async (s = sub, srt = rSort) => {
    setRLoad(true); setRPosts([]);
    const name = s.name.replace("r/", "");
    try {
      let data;
      try {
        const r = await fetch(`https://www.reddit.com/r/${name}/${srt}.json?limit=20&raw_json=1`, { headers: { Accept:"application/json" } });
        data = await r.json();
      } catch {
        const r = await fetch(`https://corsproxy.io/?https://www.reddit.com/r/${name}/${srt}.json?limit=20&raw_json=1`);
        data = await r.json();
      }
      const ps = (data?.data?.children || [])
        .map(({ data:p }) => ({
          id:p.id, title:p.title, author:p.author, score:p.score,
          numComments:p.num_comments, permalink:`https://www.reddit.com${p.permalink}`,
          selftext:p.selftext?.slice(0, 240) || "", isSelf:p.is_self, url:p.url,
          preview:p.preview?.images?.[0]?.source?.url?.replace(/&amp;/g, "&") || null,
          flair:p.link_flair_text || null, created:p.created_utc,
          subreddit:p.subreddit, upvoteRatio:p.upvote_ratio, stickied:p.stickied,
        }))
        .filter(p => !p.stickied);
      setRPosts(ps);
      toast2(`✓ ${ps.length} posts from ${s.name}`);
    } catch { toast2("Reddit unavailable — try the direct link"); }
    finally { setRLoad(false); }
  }, [sub, rSort]);

  // ── AI chat ───────────────────────────────────────────────────────────────────

  // ── File uploads ──────────────────────────────────────────────────────────────
  const handleFiles = files => Array.from(files).forEach(f => {
    const r = new FileReader();
    r.onload = ev => {
      const type = f.type.startsWith("image/") ? "image" : f.type === "application/pdf" ? "pdf" : "doc";
      setUploads(p => [...p, { type, name:f.name, data:ev.target.result, size:f.size }]);
    };
    r.readAsDataURL(f);
  });

  // ── Submit community post ─────────────────────────────────────────────────────
  const submitPost = () => {
    if (!np.title.trim()) { toast2("Title required"); return; }
    if (!np.body.trim())  { toast2("Description required"); return; }
    const vRefs = refs.filter(r => r.url.trim().startsWith("http"));
    if (!vRefs.length) { toast2("At least one source URL required"); return; }
    if (!disc) { toast2("Please confirm the disclaimer"); return; }
    const badge = isAdmin ? "Admin" : user.plan === "annual" ? "Analyst" : user.plan === "monthly" ? "Investigator" : "Observer";
    const tags = (np.tags || "").split(",").map(t => t.trim()).filter(Boolean);
    const post = {
      id: `c${Date.now()}`, user:"You", badge, time:"just now",
      topic:np.topic, region:np.region, title:np.title, body:np.body,
      refs:vRefs, tags, contentType:np.contentType, confidence:np.confidence,
      upvotes:1, comments:0, image:uploads.find(u => u.type === "image")?.data || null,
      uploads:uploads.filter(u => u.type !== "image"), pinned:false,
    };
    setPosts(p => [post, ...p]);
    setNp({ title:"", body:"", topic:TOPICS[1], region:"🌍 Global", contentType:"research", confidence:"unverified", tags:"" });
    setRefs([{ label:"", url:"" }]);
    setUploads([]); setShowForm(false); setDisc(false);
    toast2("✓ Record submitted to community");
  };

  // ── Filtered stories ──────────────────────────────────────────────────────────
  const { topic, region, srcType, sortBy, search, verdict } = filters;
  const filteredStories = stories.filter(s => {
    // Topic filter
    if (topic !== "All Topics" && s.topic?.trim() !== topic.trim()) return false;
    // Region filter - exact match
    if (region !== "All Regions" && s.region?.trim() !== region.trim()) return false;
    // Record type filter (News / Research / Archive / Podcast)
    if (srcType && srcType !== "All Sources" && srcType !== "All Types" && srcType !== "All") {
      const typeMap = { "News":"news", "Research":"research", "Archive":"archive", "Podcast":"podcast", "Blog":"blog" };
      const mapped = typeMap[srcType];
      if (mapped && s.type !== mapped) return false;
    }
    // Verdict filter
    if (verdict !== "All") {
      const ev = verdicts[s.id] || autoVerdict(s.credible);
      if (ev !== verdict.toLowerCase()) return false;
    }
    // Search filter - title, summary, tags, source name
    if (search) {
      const q = search.toLowerCase();
      if (!s.title?.toLowerCase().includes(q) &&
          !s.summary?.toLowerCase().includes(q) &&
          !s.tags?.some(t => t.toLowerCase().includes(q)) &&
          !s.source?.toLowerCase().includes(q) &&
          !s.topic?.toLowerCase().includes(q)) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === "Most Credible") return b.credible - a.credible;
    if (sortBy === "Least Credible") return a.credible - b.credible;
    // "Latest" = reverse order of stories array (highest ID = newest)
    const idA = parseInt(a.id.replace(/\D/g,'')) || 0;
    const idB = parseInt(b.id.replace(/\D/g,'')) || 0;
    return idB - idA;
  });

  const visibleStories = filteredStories;
  

  // ── Shared sidebar props ──────────────────────────────────────────────────────
  const sidebarProps = { filters, setFilters, isAdmin, onFetch:fetchMore, visibleTopics:TOPICS, visibleRegions:REGIONS };

  // ──────────────────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{CSS}</style>
      {/* balance */}
      <div style={{ minHeight:"100vh", background:"#07080c", color:"#ccc8be" }}>

        {/* Toast */}
        {toast && (
          <div className="fade" style={{ position:"fixed", bottom:20, right:20, background:"#10131e", border:"1px solid #2a3a4a", color:"#8a9aaa", padding:"8px 14px", fontSize:11, zIndex:9999, fontFamily:"monospace" }}>
            {toast}
          </div>
        )}

        {/* NAV */}
        <div style={{ background:"#07080c", borderBottom:"1px solid #1c2330", position:"sticky", top:0, zIndex:100 }}>
          <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 12px", display:"flex", alignItems:"center", justifyContent:"space-between", height:48 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", flexShrink:0 }} onClick={() => { setView('home'); setOpenStory(null); setFilters({ topic:'All Topics', region:'All Regions', srcType:'All Sources', verdict:'All', sortBy:'Latest', search:'' }); window.history.pushState({}, '', '/'); document.title = 'The Nexus - Independent Research Platform'; }}>
              <div style={{ width:18, height:18, background:"#b02020", clipPath:"polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)" }} />
              <span className="bb" style={{ fontSize:16, letterSpacing:3, color:"#eeeae0" }}>THE NEXUS</span>
            </div>
            {/* Desktop nav */}
            <div style={{ display:"flex", alignItems:"center", overflowX:"auto", gap:0 }} className="desktop-nav">
              {[["home","Home"],["feed","Records"],["saved","Saved"],["sources","Sources"],["researchers","Researchers"],["community","Community"],["reddit","Reddit"],["library","Library"],["ai","Analysis"],...(isAdmin?[["admin","Admin"]]:[])].map(([v,l]) => (
                <button key={v} onClick={() => { setView(v); setOpenStory(null); setMobileMenu(false); window.history.pushState({}, '', v==="home" ? '/' : '/'+v); if(v==="home") setFilters({ topic:'All Topics', region:'All Regions', srcType:'All Sources', verdict:'All', sortBy:'Latest', search:'' }); document.title = 'The Nexus'; if(v==="reddit"&&!rPosts.length) fetchReddit(); }}
                  style={{ background:"none", border:"none", borderBottom:view===v?"2px solid #b02020":"2px solid transparent", color:view===v?"#eeeae0":"#3a4a5a", padding:"0 9px", height:48, fontFamily:"monospace", fontSize:9, letterSpacing:.5, textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 }}>
                  {l}
                </button>
              ))}
            </div>
            {/* Mobile hamburger */}
            {mobileMenu && (
              <div style={{ position:"fixed", top:56, left:0, right:0, background:"#0b0d14", borderBottom:"1px solid #1c2330", zIndex:1000, padding:"8px 0" }}>
                {[["home","Home"],["feed","Records"],["saved","Saved"],["sources","Sources"],["researchers","Researchers"],["community","Community"],["reddit","Reddit"],["library","Library"],["ai","Analysis"]].map(([v,l]) => (
                  <button key={v} onClick={() => { setView(v); setOpenStory(null); setMobileMenu(false); window.history.pushState({},'','/' +v); if(v==="home") setFilters({ topic:"All Topics", region:"All Regions", srcType:"All Sources", verdict:"All", sortBy:"Latest", search:"" }); if(v==="reddit"&&!rPosts.length) fetchReddit(); }}
                    style={{ display:"block", width:"100%", background:view===v?"#1c2330":"none", border:"none", borderLeft:view===v?"3px solid #b02020":"3px solid transparent", color:view===v?"#eeeae0":"#5a6a7a", padding:"12px 20px", fontFamily:"monospace", fontSize:11, letterSpacing:1, textTransform:"uppercase", cursor:"pointer", textAlign:"left" }}>
                    {l}
                  </button>
                ))}
              </div>
            )}
            <button onClick={() => setMobileMenu(m => !m)} className="mobile-hamburger"
              style={{ display:"none", background:"none", border:"1px solid #1c2330", color:"#5a6a7a", padding:"6px 10px", cursor:"pointer", fontFamily:"monospace", fontSize:14 }}>
              {mobileMenu ? "x" : "="}
            </button>
          </div>
        </div>

        {/* Global back bar */}
        <div className="nexus-shell">
          {openStory && (
            <div className="back-bar" style={{ marginBottom:0 }}>
              <button className="back-btn back-btn-primary" onClick={() => { setOpenStory(null); window.history.pushState({}, "", "/records"); document.title = "The Nexus"; }}>
                ← Records
              </button>
              <button className="back-btn back-btn-ghost" onClick={() => { setOpenStory(null); setView("home"); setFilters({ topic:"All Topics", region:"All Regions", srcType:"All Sources", verdict:"All", sortBy:"Latest", search:"" }); window.history.pushState({}, "", "/"); }}>
                Home
              </button>
              <button className="back-btn back-btn-ghost" onClick={() => { setOpenStory(null); setFilters({ topic:"All Topics", region:"All Regions", srcType:"All Sources", verdict:"All", sortBy:"Latest", search:"" }); window.history.pushState({}, "", "/records"); }}>
                Reset
              </button>
              <button className="back-btn back-btn-ghost" onClick={() => setFocusMode(f => !f)} style={{ marginLeft:"auto", color:focusMode?"#8a9aaa":"#3a4a5a", borderColor:focusMode?"#3a4a6a":"#1c2330" }}>
                {focusMode ? "⊡ Exit Focus" : "⊠ Focus"}
              </button>
            </div>
          )}

          {/* ── FEED ── */}
          {view === "feed" && (
            <div className="feed-wrap">
              {!focusMode && <div className="nexus-sidebar"><Sidebar {...sidebarProps} /></div>}
              <div className={focusMode ? "feed-main-full" : "feed-main"}>
                <div style={{ marginBottom:8 }}>
                  <div className="sec-head">OPEN RECORDS</div>
                  <div className="sec-sub">
                    {visibleStories.length} of {stories.length} records
                    {filters.topic !== "All Topics" && <span style={{ color:"#b02020", marginLeft:6 }}>· {filters.topic}</span>}
                  </div>
                </div>

                {/* Open story detail */}
                {openStory && (
                  <div>
                    <div className="back-bar">
                      <button className="back-btn back-btn-primary" onClick={() => { setOpenStory(null); setFocusMode(false); window.history.pushState({}, "", "/records"); document.title = "The Nexus - Open Records"; }}>
                        &larr; Back
                      </button>
                      <button className="back-btn back-btn-ghost" onClick={() => { setOpenStory(null); setView("home"); setFilters({ topic:"All Topics", region:"All Regions", srcType:"All Sources", verdict:"All", sortBy:"Latest", search:"" }); window.history.pushState({}, "", "/"); }}>
                        Home
                      </button>
                      <button className="back-btn back-btn-ghost" onClick={() => { setOpenStory(null); setFilters({ topic:"All Topics", region:"All Regions", srcType:"All Sources", verdict:"All", sortBy:"Latest", search:"" }); window.history.pushState({}, "", "/records"); }}>
                        Reset
                      </button>
                      <button className="back-btn back-btn-ghost" onClick={() => setFocusMode(f => !f)} style={{ marginLeft:"auto", color:focusMode?"#8a9aaa":"#3a4a5a" }}>
                        {focusMode ? "⊡ Exit Focus" : "⊠ Focus"}
                      </button>
                    </div>

                    <div className="rec-detail">
                      <div className="rec-detail-meta">
                        <span className="rec-type" style={{ background:getType(openStory.type).bg, color:getType(openStory.type).text }}>{getType(openStory.type).label}</span>
                        <a href={openStory.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize:10, color:"#5a9ac8", fontFamily:"monospace" }}>{openStory.source} ↗</a>
                        <span style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace" }}>{fmtDate(openStory.time)} · {openStory.region}</span>
                        <VBadge verdict={verdicts[openStory.id] || autoVerdict(openStory.credible)} />
                      </div>
                      <h1 className="rec-detail-title">{openStory.title}</h1>
                      <p className="rec-detail-summary">{openStory.summary}</p>
                      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:16 }}>
                        {openStory.tags?.map(t => <span key={t} onClick={() => { setFilters(f => ({...f, search:t})); setOpenStory(null); window.history.pushState({}, '', '/records?q='+encodeURIComponent(t)); }} style={{ fontSize:8, background:"#10131e", border:"1px solid #1c2330", color:"#3a4a5a", padding:"1px 7px", fontFamily:"monospace", cursor:"pointer" }} title={"Search: "+t}>#{t}</span>)}
                      </div>

                      {/* Actions */}
                      <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:16 }}>
                        {openStory.sourceUrl && <a href={openStory.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ background:"#b02020", color:"#fff", padding:"7px 16px", fontFamily:"monospace", fontSize:9, letterSpacing:.5 }}>Read Source ↗</a>}
                        <button onClick={() => { setSaved(p => ({ ...p, [openStory.id]:!p[openStory.id] })); toast2(saved[openStory.id] ? "Removed" : "Saved"); }} style={{ background:"transparent", border:"1px solid #1c2330", color:saved[openStory.id]?"#c08030":"#3a4a5a", padding:"7px 12px", fontFamily:"monospace", fontSize:9, cursor:"pointer" }}>{saved[openStory.id] ? "* Saved" : "Save"}</button>
                        <button onClick={() => { setLibTopic(openStory.topic); setView("library"); }} style={{ background:"transparent", border:"1px solid #2a3a1a", color:"#4a7a4a", padding:"7px 12px", fontFamily:"monospace", fontSize:9, cursor:"pointer" }}>Related Reading</button>
                      </div>

                      {/* Share buttons */}
                      <div style={{ borderTop:"1px solid #1c2330", paddingTop:12, marginBottom:16 }}>
                        <div style={{ fontSize:8, color:"#1c2a38", letterSpacing:1.5, textTransform:"uppercase", fontFamily:"monospace", marginBottom:8 }}>Share This Record</div>
                        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                          {/* Facebook */}
                          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(openStory.sourceUrl||"https://nexusverse.app")}&quote=${encodeURIComponent(openStory.title)}`}
                            target="_blank" rel="noopener noreferrer"
                            style={{ background:"#1877f2", color:"#fff", padding:"7px 14px", fontFamily:"monospace", fontSize:9, letterSpacing:.5, textDecoration:"none", display:"inline-block" }}>
                            f Facebook
                          </a>
                          {/* X / Twitter */}
                          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(openStory.title)}&url=${encodeURIComponent(openStory.sourceUrl||"https://nexusverse.app")}&hashtags=${encodeURIComponent((openStory.tags||[]).slice(0,3).join(","))}`}
                            target="_blank" rel="noopener noreferrer"
                            style={{ background:"#000", color:"#fff", padding:"7px 14px", fontFamily:"monospace", fontSize:9, letterSpacing:.5, textDecoration:"none", display:"inline-block" }}>
                            X / Twitter
                          </a>
                          {/* Instagram — no direct share API, opens Instagram */}
                          <button onClick={() => { navigator.clipboard?.writeText(openStory.title + " - " + (openStory.sourceUrl||"https://nexusverse.app")); toast2("Link copied - paste into Instagram post"); }}
                            style={{ background:"linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", color:"#fff", padding:"7px 14px", fontFamily:"monospace", fontSize:9, letterSpacing:.5, border:"none", cursor:"pointer" }}>
                            Instagram
                          </button>
                          {/* Copy link */}
                          <button onClick={() => { navigator.clipboard?.writeText(openStory.sourceUrl||"https://nexusverse.app"); toast2("Source link copied to clipboard"); }}
                            style={{ background:"transparent", border:"1px solid #2a3a4a", color:"#5a6a7a", padding:"7px 12px", fontFamily:"monospace", fontSize:9, cursor:"pointer" }}>
                            Copy Link
                          </button>
                        </div>
                        <div style={{ fontSize:7, color:"#1c2a38", fontFamily:"monospace", marginTop:6 }}>
                          Instagram: copies the link to your clipboard - paste it into your post or story
                        </div>
                      </div>

                      {/* Related media */}
                      {(() => {
                        const rel = MEDIA_LIBRARY.filter(m => m.topic === openStory.topic || openStory.tags?.some(t => m.tags.includes(t))).slice(0, 4);
                        if (!rel.length) return null;
                        return (
                          <div style={{ background:"#07080c", border:"1px solid #1c2a1a", padding:"12px 14px" }}>
                            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                              <div style={{ fontSize:8, color:"#2a4a2a", letterSpacing:1, textTransform:"uppercase", fontFamily:"monospace" }}>📚 Related Books, Docs & Films</div>
                              <button onClick={() => { setLibTopic(openStory.topic); setView("library"); }} style={{ background:"none", border:"none", color:"#2a4a2a", fontFamily:"monospace", fontSize:8, cursor:"pointer" }}>View all →</button>
                            </div>
                            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
                              {rel.map(m => (
                                <a key={m.id} href={m.url} target="_blank" rel="noopener noreferrer"
                                  style={{ background:"#0b0d14", border:"1px solid #1c2330", padding:"8px 10px", display:"block", transition:"border-color .12s" }}
                                  onMouseEnter={e => e.currentTarget.style.borderColor="#2a4a2a"}
                                  onMouseLeave={e => e.currentTarget.style.borderColor="#1c2330"}>
                                  <div style={{ display:"flex", gap:7, alignItems:"flex-start" }}>
                                    <span style={{ fontSize:16, flexShrink:0 }}>{TYPE_ICON[m.type]}</span>
                                    <div>
                                      <div style={{ fontSize:7, color:"#2a3a4a", textTransform:"uppercase", marginBottom:2, fontFamily:"monospace" }}>{m.type} · {m.year}</div>
                                      <div className="bk" style={{ fontSize:12, color:"#ccc8be", lineHeight:1.3 }}>{m.title}</div>
                                      <div style={{ fontSize:8, color:"#3a4a5a", fontFamily:"monospace" }}>{m.author}</div>
                                    </div>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                )}

                {/* Story list */}
                {!openStory && (
                  <div>
                    {visibleStories.map(s => {
                      const t = getType(s.type);
                      return (
                        <div key={s.id} className="rec-card fade" onClick={() => setOpenStory(s)}>

                          <div className="rec-body">
                            <div className="rec-meta">
                              <span className="rec-type" style={{ background:t.bg, color:t.text }}>{t.label}</span>
                              <span className="rec-source">{s.source}</span>
                              <span className="rec-date">{fmtDate(s.time)} · {s.region}</span>
                              <VBadge verdict={verdicts[s.id] || autoVerdict(s.credible)} />
                            </div>
                            <div className="bk rec-title">{s.title}</div>
                            <div className="rec-summary">{s.summary?.slice(0, 140)}…</div>
                            <div className="rec-credbar"><div style={{ height:"100%", width:`${s.credible}%`, background:"linear-gradient(90deg,#1a5a1a,#40c070)", borderRadius:2 }} /></div>
                            <div className="rec-tags">
                              {s.tags?.map(tg => <span key={tg} className="rec-tag" onClick={e => { e.stopPropagation(); setFilters(f => ({...f, search:tg})); }}>#{tg}</span>)}
                            </div>
                          </div>
                        </div>
                      );
                    })}




                      {/* Related Records */}
                      {openStory && (() => {
                        const related = stories
                          .filter(s => s.id !== openStory.id && (
                            s.topic === openStory.topic ||
                            openStory.tags?.some(t => s.tags?.includes(t))
                          ))
                          .slice(0, 4);
                        return related.length > 0 ? (
                          <div style={{ borderTop:"1px solid #1c2330", marginTop:20, paddingTop:16 }}>
                            <div style={{ fontSize:8, color:"#3a4a5a", letterSpacing:1.5, textTransform:"uppercase", fontFamily:"monospace", marginBottom:10 }}>Related Records</div>
                            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:6 }}>
                              {related.map(r => (
                                <div key={r.id} onClick={() => { setOpenStory(r); window.scrollTo(0,0); }}
                                  className="card" style={{ padding:"10px 14px", cursor:"pointer" }}>
                                  <div style={{ display:"flex", gap:5, marginBottom:4 }}>
                                    <span style={{ background:getType(r.type).bg, color:getType(r.type).text, padding:"1px 5px", fontSize:7, fontFamily:"monospace" }}>{getType(r.type).label}</span>
                                    <span style={{ fontSize:7, color:"#2a3a4a", fontFamily:"monospace" }}>{r.topic}</span>
                                  </div>
                                  <div style={{ fontSize:11, color:"#8a9aaa", fontFamily:"monospace", lineHeight:1.3 }}>{r.title.slice(0,90)}{r.title.length>90?"...":""}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null;
                      })()}

                    {/* End of records */}
                    <div style={{ padding:"18px 0", textAlign:"center", borderTop:"1px solid #0e1018", marginTop:8 }}>
                      <div style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace", marginBottom:8 }}>
                        {filters.topic !== "All Topics" ? `Showing all ${visibleStories.length} records for "${filters.topic}"` : `Showing all ${visibleStories.length} records`}
                      </div>
                      <div style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace" }}>
                        New records added regularly · Check back soon
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}


          {/* ── RESEARCHERS ── */}
          {view === "researchers" && (
            <div className="nexus-shell" style={{ paddingTop:24, paddingBottom:48 }}>
              {activeResearcher ? (
                /* ── RESEARCHER DETAIL ── */
                <div>
                  <div className="back-bar">
                    <button className="back-btn back-btn-primary" onClick={() => setActiveResearcher(null)}>← Researchers</button>
                    <button className="back-btn back-btn-ghost" onClick={() => { setView("home"); setActiveResearcher(null); window.history.pushState({},""," /"); }}>Home</button>
                  </div>
                  <div style={{ display:"flex", gap:24, flexWrap:"wrap", marginBottom:28 }}>
                    <div style={{ flex:1, minWidth:260 }}>
                      <div style={{ fontSize:9, color:"#b02020", letterSpacing:2, textTransform:"uppercase", fontFamily:"monospace", marginBottom:6 }}>{activeResearcher.role}</div>
                      <h1 style={{ fontSize:28, color:"#eeeae0", fontWeight:700, marginBottom:8, letterSpacing:1 }}>{activeResearcher.name}</h1>
                      <p style={{ fontSize:14, color:"#6a7a8a", lineHeight:1.8, marginBottom:16 }}>{activeResearcher.bio}</p>
                      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:16 }}>
                        {activeResearcher.topics.map(t => (
                          <button key={t} onClick={() => { setFilters(f => ({...f, topic:t})); setView("feed"); setActiveResearcher(null); }}
                            style={{ background:"#0b0d14", border:"1px solid #1c2330", color:"#5a9ac8", padding:"4px 12px", fontFamily:"monospace", fontSize:9, cursor:"pointer", borderRadius:20 }}>
                            {t}
                          </button>
                        ))}
                      </div>
                      <a href={activeResearcher.url} target="_blank" rel="noopener noreferrer"
                        style={{ display:"inline-block", background:"#b02020", color:"#fff", padding:"8px 18px", fontFamily:"monospace", fontSize:9, letterSpacing:1 }}>
                        Official Site ↗
                      </a>
                    </div>
                  </div>

                  {/* Related Records */}
                  <div style={{ marginBottom:24 }}>
                    <div style={{ fontSize:9, color:"#3a4a5a", letterSpacing:2, textTransform:"uppercase", fontFamily:"monospace", marginBottom:12, paddingBottom:8, borderBottom:"1px solid #1c2330" }}>Related Records</div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:8 }}>
                      {stories.filter(s => activeResearcher.tags.some(tag => s.tags?.includes(tag) || s.title?.toLowerCase().includes(tag.toLowerCase()))).slice(0,6).map(s => {
                        const t = getType(s.type);
                        return (
                          <div key={s.id} onClick={() => { setOpenStory(s); setView("feed"); setActiveResearcher(null); }} className="rec-card" style={{ cursor:"pointer" }}>
                            <div className="rec-body">
                              <div className="rec-meta">
                                <span className="rec-type" style={{ background:t.bg, color:t.text }}>{t.label}</span>
                                <span className="rec-source">{s.source}</span>
                              </div>
                              <div className="rec-title">{s.title.slice(0,80)}{s.title.length>80?"...":""}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {stories.filter(s => activeResearcher.tags.some(tag => s.tags?.includes(tag) || s.title?.toLowerCase().includes(tag.toLowerCase()))).length === 0 && (
                      <div style={{ color:"#2a3a4a", fontFamily:"monospace", fontSize:11 }}>No records found — try searching their name in Records</div>
                    )}
                  </div>

                  {/* Related Library */}
                  {activeResearcher.books.length > 0 && (
                    <div style={{ marginBottom:24 }}>
                      <div style={{ fontSize:9, color:"#3a4a5a", letterSpacing:2, textTransform:"uppercase", fontFamily:"monospace", marginBottom:12, paddingBottom:8, borderBottom:"1px solid #1c2330" }}>Books & Documentaries</div>
                      <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                        {MEDIA_LIBRARY.filter(m => activeResearcher.books.some(b => m.title.includes(b.split(" - ")[0]))).map(m => (
                          <a key={m.id} href={m.url} target="_blank" rel="noopener noreferrer"
                            style={{ background:"#0b0d14", border:"1px solid #1c2330", padding:"10px 14px", display:"block", minWidth:180, maxWidth:240 }}>
                            <div style={{ fontSize:8, color:"#3a4a5a", fontFamily:"monospace", marginBottom:3 }}>{m.type.toUpperCase()} · {m.year}</div>
                            <div style={{ fontSize:12, color:"#ccc8be" }}>{m.title}</div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Related Podcasts */}
                  {activeResearcher.podcasts.length > 0 && (
                    <div>
                      <div style={{ fontSize:9, color:"#3a4a5a", letterSpacing:2, textTransform:"uppercase", fontFamily:"monospace", marginBottom:12, paddingBottom:8, borderBottom:"1px solid #1c2330" }}>Podcasts & Appearances</div>
                      <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                        {activeResearcher.podcasts.map(pod => {
                          const src = SOURCES.flatMap(g => g.items).find(i => i.n.includes(pod.split(" - ")[0]) || pod.includes(i.n.split(" - ")[0]));
                          return src ? (
                            <a key={pod} href={src.u} target="_blank" rel="noopener noreferrer"
                              style={{ background:"#0b0d14", border:"1px solid #1c2330", padding:"8px 14px", fontFamily:"monospace", fontSize:10, color:"#5a9ac8" }}>
                              {pod} ↗
                            </a>
                          ) : (
                            <span key={pod} style={{ background:"#0b0d14", border:"1px solid #1c2330", padding:"8px 14px", fontFamily:"monospace", fontSize:10, color:"#3a4a5a" }}>{pod}</span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* ── RESEARCHER GRID ── */
                <div>
                  <div style={{ marginBottom:24 }}>
                    <div className="sec-head">RESEARCHERS</div>
                    <div className="sec-sub">Key investigators, journalists, scientists and whistleblowers behind the records</div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:10 }}>
                    {RESEARCHERS.map(r => (
                      <div key={r.id} onClick={() => setActiveResearcher(r)} className="card"
                        style={{ padding:"18px 20px", cursor:"pointer", border:"1px solid #1a2030", transition:"border-color .15s" }}
                        onMouseEnter={e => e.currentTarget.style.borderColor="#2a4a6a"}
                        onMouseLeave={e => e.currentTarget.style.borderColor="#1a2030"}>
                        <div style={{ fontSize:9, color:"#b02020", letterSpacing:1, textTransform:"uppercase", fontFamily:"monospace", marginBottom:4 }}>{r.role}</div>
                        <div style={{ fontSize:18, color:"#eeeae0", fontWeight:700, marginBottom:6 }}>{r.name}</div>
                        <div style={{ fontSize:11, color:"#4a5a6a", lineHeight:1.7, marginBottom:10 }}>{r.bio.slice(0,160)}...</div>
                        <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                          {r.topics.slice(0,2).map(t => (
                            <span key={t} style={{ fontSize:8, background:"#0b0d14", border:"1px solid #1c2330", color:"#3a5a7a", padding:"2px 8px", fontFamily:"monospace" }}>{t}</span>
                          ))}
                          <span style={{ fontSize:8, color:"#b02020", fontFamily:"monospace", marginLeft:"auto" }}>{r.country}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* THIS WEEK — Latest Disclosures on home */}
          {view === "home" && (
            <div className="nexus-shell" style={{ paddingTop:0, paddingBottom:48 }}>
              <div style={{ marginBottom:32 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:"#b02020" }} />
                  <div style={{ fontSize:10, letterSpacing:3, color:"#b02020", fontFamily:"monospace", textTransform:"uppercase" }}>Latest Disclosures</div>
                  <div style={{ flex:1, height:1, background:"#1c2330" }} />
                  <button onClick={() => { setView("feed"); setFilters(f => ({...f, sortBy:"Latest"})); window.history.pushState({},"","/records"); }} style={{ fontSize:8, color:"#2a3a4a", fontFamily:"monospace", background:"none", border:"none", cursor:"pointer" }}>View All →</button>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:8 }}>
                  {stories.slice(-6).reverse().map(s => {
                    const t = getType(s.type);
                    return (
                      <div key={s.id} onClick={() => { setOpenStory(s); setView("feed"); window.history.pushState({},"","/records/"+toSlug(s.title)); }} className="card"
                        style={{ padding:"14px 16px", cursor:"pointer", border:"1px solid #1c2330", position:"relative" }}>
                        <div style={{ position:"absolute", top:10, right:10, background:"#b02020", color:"#fff", fontSize:7, padding:"1px 7px", fontFamily:"monospace", letterSpacing:1 }}>NEW</div>
                        <div style={{ display:"flex", gap:5, marginBottom:6, alignItems:"center" }}>
                          <span style={{ background:t.bg, color:t.text, padding:"1px 5px", fontSize:7, fontFamily:"monospace" }}>{t.label}</span>
                          <span style={{ fontSize:8, color:"#2a3a4a", fontFamily:"monospace" }}>{s.topic}</span>
                        </div>
                        <div style={{ fontSize:13, color:"#c8c0b4", lineHeight:1.4, fontWeight:500, marginBottom:6 }}>{s.title.slice(0,90)}{s.title.length>90?"...":""}</div>
                        <div style={{ fontSize:10, color:"#2a3a4a", fontFamily:"monospace" }}>{s.source}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Support Banner */}
              <div style={{ background:"linear-gradient(135deg,#0f1218,#1a1008)", border:"1px solid #3a2a0a", borderRadius:4, padding:"18px 22px", marginBottom:32, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
                <div>
                  <div style={{ fontSize:11, color:"#c08030", fontFamily:"monospace", letterSpacing:1, marginBottom:4 }}>THE NEXUS IS FREE · NO ADS · NO PAYWALL</div>
                  <div style={{ fontSize:13, color:"#8a7a5a", lineHeight:1.6 }}>If this archive has been useful, consider buying a coffee to keep it running.</div>
                </div>
                <a href="https://buymeacoffee.com/thenexus" target="_blank" rel="noopener noreferrer"
                  style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#FFDD00", color:"#000", padding:"10px 20px", fontFamily:"monospace", fontSize:11, fontWeight:700, textDecoration:"none", borderRadius:4, letterSpacing:.5, whiteSpace:"nowrap", flexShrink:0 }}>
                  ☕ Buy Me a Coffee
                </a>
              </div>

              {/* Browse by Topic */}
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                  <div style={{ fontSize:10, letterSpacing:3, color:"#3a4a5a", fontFamily:"monospace", textTransform:"uppercase" }}>Browse by Topic</div>
                  <div style={{ flex:1, height:1, background:"#1c2330" }} />
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:6 }}>
                  {TOPICS.filter(t => t !== "All Topics").map(t => {
                    const count = stories.filter(s => s.topic === t).length;
                    if (!count) return null;
                    return (
                      <button key={t} onClick={() => { setFilters(f => ({...f, topic:t})); setView("feed"); window.history.pushState({},"","/records/topic/"+t.toLowerCase().replace(/[^a-z0-9]+/g,"-")); }}
                        style={{ background:"#0b0d14", border:"1px solid #1a2030", color:"#7a8a9a", padding:"12px 14px", fontFamily:"monospace", fontSize:10, cursor:"pointer", textAlign:"left", transition:"all .15s", borderRadius:3 }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor="#2a4a6a"; e.currentTarget.style.color="#ccc8be"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor="#1a2030"; e.currentTarget.style.color="#7a8a9a"; }}>
                        <div style={{ fontSize:8, color:"#2a3a4a", fontFamily:"monospace", marginBottom:3 }}>{count} records</div>
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}


          {/* SAVED RECORDS */}
          {view === "saved" && (
            <div className="feed-wrap">
              <div className="nexus-sidebar"><Sidebar {...sidebarProps} /></div>
              <div style={{ flex:1 }}>
                <div style={{ marginBottom:14 }}>
                  <div className="bb" style={{ fontSize:20, letterSpacing:2, color:"#eeeae0" }}>SAVED RECORDS</div>
                  <div style={{ fontSize:8, color:"#1c2a38", marginTop:3, fontFamily:"monospace" }}>
                    {Object.keys(saved).filter(id => saved[id]).length} saved · Session only · Clears on page refresh
                  </div>
                </div>
                {Object.keys(saved).filter(id => saved[id]).length === 0 ? (
                  <div style={{ textAlign:"center", padding:"60px 0", color:"#2a3a4a", fontFamily:"monospace" }}>
                    <div style={{ fontSize:24, marginBottom:12, opacity:.3 }}>*</div>
                    <div style={{ fontSize:11 }}>No saved records yet</div>
                    <div style={{ fontSize:9, marginTop:6, color:"#1c2a38" }}>Click "Save" on any record to bookmark it here</div>
                    <button onClick={() => setView("feed")} style={{ marginTop:16, background:"#b02020", border:"none", color:"#fff", padding:"8px 20px", fontFamily:"monospace", fontSize:9, cursor:"pointer", letterSpacing:1 }}>Browse Records</button>
                  </div>
                ) : (
                  <>
                    <div style={{ marginBottom:8, textAlign:"right" }}>
                      <button onClick={() => setSaved({})} style={{ background:"transparent", border:"1px solid #1c2330", color:"#3a4a5a", padding:"4px 12px", fontFamily:"monospace", fontSize:8, cursor:"pointer" }}>Clear All</button>
                    </div>
                    {stories.filter(s => saved[s.id]).map(s => {
                      const t = getType(s.type);
                      return (
                        <div key={s.id} onClick={() => { setOpenStory(s); setView("feed"); }} className="card fade"
                          style={{ padding:"14px 16px", marginBottom:8, cursor:"pointer" }}>
                          <div style={{ display:"flex", gap:6, marginBottom:6, alignItems:"center" }}>
                            <span style={{ background:t.bg, color:t.text, padding:"1px 6px", fontFamily:"monospace", fontSize:7 }}>{t.label}</span>
                            <span style={{ fontSize:8, color:"#5a9ac8", fontFamily:"monospace" }}>{s.source}</span>
                            <span style={{ fontSize:8, color:"#2a3a4a", fontFamily:"monospace", marginLeft:"auto" }}>{s.topic}</span>
                          </div>
                          <div style={{ fontSize:14, color:"#eeeae0", lineHeight:1.4, marginBottom:6 }}>{s.title}</div>
                          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                            {s.tags?.slice(0,4).map(tg => <span key={tg} style={{ fontSize:7, color:"#1c2a38", fontFamily:"monospace" }}>#{tg}</span>)}
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          )}

          {/* ── COMMUNITY ── */}
          {view === "community" && (
            <div className="feed-wrap">
              {!focusMode && <Sidebar {...sidebarProps} />}
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14, flexWrap:"wrap", gap:8 }}>
                  <div>
                    <div className="bb" style={{ fontSize:20, letterSpacing:2, color:"#eeeae0" }}>COMMUNITY BOARD</div>
                    <div style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace" }}>Submit records, evidence & source links · All posts publicly visible · No sign-up required</div>
                  </div>
                  <div style={{ display:"flex", gap:6, alignItems:"center", flexWrap:"wrap" }}>
                    {["Hot","New","Top"].map(s => (
                      <button key={s} onClick={() => setCSort(s)}
                        style={{ background:cSort===s?"#1c2330":"transparent", border:`1px solid ${cSort===s?"#3a4a5a":"#1c2330"}`, color:cSort===s?"#ccc8be":"#2a3a4a", padding:"4px 10px", fontFamily:"monospace", fontSize:8, cursor:"pointer", textTransform:"uppercase" }}>
                        {s}
                      </button>
                    ))}
                    <><button onClick={() => setShowForm(p => !p)} style={{ background:"#b02020", border:"none", color:"#fff", padding:"6px 14px", fontFamily:"monospace", fontSize:8, letterSpacing:1, cursor:"pointer", textTransform:"uppercase" }}>+ Submit Record</button>
                        <button onClick={() => setShowSrc(p => !p)} style={{ background:"#1a2a3a", border:"1px solid #5a9ac8", color:"#5a9ac8", padding:"6px 14px", fontFamily:"monospace", fontSize:8, letterSpacing:1, cursor:"pointer", textTransform:"uppercase" }}>+ Submit Source/Blog</button></>
                    
                  </div>
                </div>

                {/* Submission form */}
                {/* Submit Source / Blog Form */}
                {showSrc && (
                  <div className="fade" style={{ background:"#0b0d14", border:"1px solid #5a9ac8", padding:20, marginBottom:14 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                      <div>
                        <div className="bb" style={{ fontSize:18, letterSpacing:2, color:"#eeeae0" }}>SUBMIT A SOURCE / BLOG / PAPER</div>
                        <div style={{ fontSize:8, color:"#3a4a5a", marginTop:2, fontFamily:"monospace" }}>Suggest a researcher, blog, paper, or website to add to the Source Directory</div>
                      </div>
                      <button onClick={() => setShowSrc(false)} style={{ background:"none", border:"none", color:"#3a4a5a", cursor:"pointer", fontSize:16 }}>✕</button>
                    </div>
                    <SubmitSourceForm onClose={() => setShowSrc(false)} toast2={toast2} />
                  </div>
                )}

                {showForm && (
                  <div className="fade" style={{ background:"#0b0d14", border:"1px solid #b02020", padding:20, marginBottom:14 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                      <div>
                        <div className="bb" style={{ fontSize:18, letterSpacing:2, color:"#eeeae0" }}>SUBMIT A RECORD</div>
                        <div style={{ fontSize:8, color:"#3a4a5a", marginTop:2, fontFamily:"monospace" }}>At least one source link required · All fields publicly visible</div>
                      </div>
                      <button onClick={() => { setShowForm(false); setUploads([]); setRefs([{ label:"", url:"" }]); }} style={{ background:"none", border:"none", color:"#3a4a5a", cursor:"pointer", fontSize:16 }}>✕</button>
                    </div>

                    {/* Content type */}
                    <div style={{ marginBottom:10 }}>
                      <div style={{ fontSize:7, color:"#2a3a4a", letterSpacing:1, textTransform:"uppercase", marginBottom:5, fontFamily:"monospace" }}>Content Type</div>
                      <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                        {Object.entries(CT_LABELS).map(([id, label]) => (
                          <button key={id} onClick={() => setNp(p => ({ ...p, contentType:id }))}
                            style={{ background:np.contentType===id?"#1c1008":"#07080c", border:`1px solid ${np.contentType===id?"#b02020":"#1c2330"}`, color:np.contentType===id?"#e0c060":"#3a4a5a", padding:"5px 9px", fontFamily:"monospace", fontSize:9, cursor:"pointer", transition:"all .15s" }}>
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom:8 }}>
                      <div style={{ fontSize:7, color:"#2a3a4a", letterSpacing:1, textTransform:"uppercase", marginBottom:3, fontFamily:"monospace" }}>Title <span style={{ color:"#b02020" }}>*</span></div>
                      <input className="inp" value={np.title} onChange={e => setNp(p => ({ ...p, title:e.target.value }))} placeholder="Be specific and factual" />
                    </div>

                    <div style={{ marginBottom:8 }}>
                      <div style={{ fontSize:7, color:"#2a3a4a", letterSpacing:1, textTransform:"uppercase", marginBottom:3, fontFamily:"monospace" }}>Description <span style={{ color:"#b02020" }}>*</span></div>
                      <textarea value={np.body} onChange={e => setNp(p => ({ ...p, body:e.target.value }))} rows={4}
                        placeholder="Include dates, names, document titles, and specific facts"
                        style={{ width:"100%", background:"#07080c", border:"1px solid #1c2330", color:"#ccc8be", padding:"9px 11px", fontFamily:"monospace", fontSize:11, outline:"none", resize:"vertical" }} />
                    </div>

                    <div style={{ display:"flex", gap:7, marginBottom:10, flexWrap:"wrap" }}>
                      <select value={np.topic} onChange={e => setNp(p => ({ ...p, topic:e.target.value }))} style={{ flex:1, minWidth:140, background:"#07080c", border:"1px solid #1c2330", color:"#5a6a7a", padding:"7px 8px", fontFamily:"monospace", fontSize:9, outline:"none" }}>
                        {TOPICS.filter(t => t !== "All Topics").map(t => <option key={t}>{t}</option>)}
                      </select>
                      <select value={np.region} onChange={e => setNp(p => ({ ...p, region:e.target.value }))} style={{ flex:1, minWidth:110, background:"#07080c", border:"1px solid #1c2330", color:"#5a6a7a", padding:"7px 8px", fontFamily:"monospace", fontSize:9, outline:"none" }}>
                        {REGIONS.filter(r => r !== "All Regions").map(r => <option key={r}>{r}</option>)}
                      </select>
                      <input value={np.tags} onChange={e => setNp(p => ({ ...p, tags:e.target.value }))} placeholder="Tags (comma-separated)" style={{ flex:2, minWidth:140, background:"#07080c", border:"1px solid #1c2330", color:"#ccc8be", padding:"7px 10px", fontFamily:"monospace", fontSize:10, outline:"none" }} />
                    </div>

                    {/* Source references */}
                    <div style={{ background:"#07080c", border:"1px solid #2a3a1a", padding:"12px 14px", marginBottom:10 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                        <div style={{ fontSize:8, color:"#40c070", letterSpacing:1, textTransform:"uppercase", fontFamily:"monospace" }}>Source References <span style={{ color:"#b02020" }}>* Required</span></div>
                        <button onClick={() => setRefs(p => [...p, { label:"", url:"" }])} style={{ background:"#0d1a0d", border:"1px solid #2a4a2a", color:"#40c070", padding:"3px 9px", fontFamily:"monospace", fontSize:8, cursor:"pointer", letterSpacing:.5 }}>+ Add Source</button>
                      </div>
                      <div style={{ fontSize:8, color:"#1c2a38", marginBottom:7, fontFamily:"monospace" }}>Links must point to external sources: news articles, FOIA docs, gov sites, YouTube, Reddit</div>
                      {refs.map((ref, i) => (
                        <div key={i} style={{ display:"flex", gap:5, marginBottom:5, alignItems:"center" }}>
                          <span style={{ fontSize:8, color:"#2a3a4a", width:16, flexShrink:0, fontFamily:"monospace" }}>{i + 1}</span>
                          <input value={ref.label} onChange={e => setRefs(p => p.map((r, j) => j === i ? { ...r, label:e.target.value } : r))} placeholder="Source label" style={{ flex:1, background:"#0b0d14", border:"1px solid #1c2330", color:"#ccc8be", padding:"6px 9px", fontFamily:"monospace", fontSize:10, outline:"none" }} />
                          <input value={ref.url} onChange={e => setRefs(p => p.map((r, j) => j === i ? { ...r, url:e.target.value } : r))} placeholder="https://..." style={{ flex:2, background:"#0b0d14", border:"1px solid #1c2330", color:"#5a9ac8", padding:"6px 9px", fontFamily:"monospace", fontSize:10, outline:"none" }} />
                          {refs.length > 1 && <button onClick={() => setRefs(p => p.filter((_, j) => j !== i))} style={{ background:"none", border:"none", color:"#3a4a5a", cursor:"pointer", fontSize:12, padding:"0 3px" }}>✕</button>}
                        </div>
                      ))}
                    </div>

                    {/* Confidence */}
                    <div style={{ marginBottom:10 }}>
                      <div style={{ fontSize:7, color:"#2a3a4a", letterSpacing:1, textTransform:"uppercase", marginBottom:5, fontFamily:"monospace" }}>Confidence Level</div>
                      <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                        {Object.entries(CONF_LABELS).map(([id, label]) => {
                          const cc = CONF_COLORS[id];
                          return (
                            <button key={id} onClick={() => setNp(p => ({ ...p, confidence:id }))}
                              style={{ background:np.confidence===id?cc.bg:"#07080c", border:`1px solid ${np.confidence===id?cc.c:"#1c2330"}`, color:np.confidence===id?cc.c:"#3a4a5a", padding:"6px 10px", fontFamily:"monospace", fontSize:9, cursor:"pointer", flex:1, minWidth:110, transition:"all .15s" }}>
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* File uploads */}
                    <div style={{ marginBottom:10 }}>
                      <div style={{ fontSize:7, color:"#2a3a4a", letterSpacing:1, textTransform:"uppercase", marginBottom:5, fontFamily:"monospace" }}>Attach Files (optional)</div>
                      <div
                        onDragOver={e => { e.preventDefault(); setDrag(true); }}
                        onDragLeave={() => setDrag(false)}
                        onDrop={e => { e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files); }}
                        style={{ border:`2px dashed ${drag?"#b02020":"#1c2330"}`, background:drag?"#130508":"#07080c", padding:"12px", textAlign:"center", marginBottom:7, transition:"all .15s" }}>
                        <div style={{ fontSize:10, color:drag?"#b02020":"#2a3a4a", fontFamily:"monospace" }}>{drag ? "Drop files here" : "Drag & drop — images, PDFs, documents"}</div>
                      </div>
                      <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                        <input type="file" ref={imgRef} accept="image/*" multiple style={{ display:"none" }} onChange={e => handleFiles(e.target.files)} />
                        <input type="file" ref={docRef} accept=".pdf,.doc,.docx,.txt,.csv,.xls,.xlsx" multiple style={{ display:"none" }} onChange={e => handleFiles(e.target.files)} />
                        {[{ l:"📷 Photos", r:imgRef, c:"#1a3a5a", t:"#5a9ac8" }, { l:"📄 Documents", r:docRef, c:"#2a1a08", t:"#c08030" }].map(b => (
                          <button key={b.l} onClick={() => b.r.current.click()} style={{ background:b.c, border:`1px solid ${b.t}44`, color:b.t, padding:"6px 12px", fontFamily:"monospace", fontSize:9, cursor:"pointer", letterSpacing:.3 }}>{b.l}</button>
                        ))}
                      </div>
                      {uploads.length > 0 && (
                        <div style={{ marginTop:7, display:"flex", flexDirection:"column", gap:3 }}>
                          {uploads.map((u, i) => (
                            <div key={i} style={{ background:"#07080c", border:"1px solid #1c2330", padding:"6px 10px", display:"flex", alignItems:"center", gap:7 }}>
                              {u.type === "image" && <img src={u.data} alt="" style={{ width:36, height:27, objectFit:"cover", flexShrink:0 }} />}
                              {u.type !== "image" && <span style={{ fontSize:14 }}>{u.type === "pdf" ? "📄" : "📝"}</span>}
                              <span style={{ fontSize:9, color:"#5a6a7a", flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", fontFamily:"monospace" }}>{u.name}</span>
                              <button onClick={() => setUploads(p => p.filter((_, j) => j !== i))} style={{ background:"none", border:"none", color:"#3a4a5a", cursor:"pointer", fontSize:11 }}>✕</button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Disclaimer */}
                    <div style={{ display:"flex", gap:8, alignItems:"flex-start", background:"#07080c", border:"1px solid #1c2330", padding:"10px 12px", marginBottom:14 }}>
                      <input type="checkbox" checked={disc} onChange={e => setDisc(e.target.checked)} style={{ marginTop:2, accentColor:"#b02020", flexShrink:0 }} />
                      <div style={{ fontSize:9, color:"#3a4a5a", lineHeight:1.7, cursor:"pointer", fontFamily:"monospace" }} onClick={() => setDisc(p => !p)}>
                        I confirm this is my own original research or a reference to publicly available information. All source links point to external sources I do not control. This platform does not endorse any position as true or false.
                      </div>
                    </div>

                    <div style={{ display:"flex", gap:7 }}>
                      <button onClick={submitPost} style={{ background:"#b02020", border:"none", color:"#fff", padding:"9px 22px", fontFamily:"monospace", fontSize:9, letterSpacing:1.5, cursor:"pointer", textTransform:"uppercase" }}>Submit Record →</button>
                      <button onClick={() => { setShowForm(false); setUploads([]); setRefs([{ label:"", url:"" }]); setDisc(false); }} style={{ background:"transparent", border:"1px solid #1c2330", color:"#3a4a5a", padding:"9px 14px", fontFamily:"monospace", fontSize:9, cursor:"pointer" }}>Cancel</button>
                    </div>
                  </div>
                )}

                {/* Posts list */}
                {(() => {
                  let ps = [...posts];
                  if (cSort === "Hot")  ps.sort((a, b) => (b.upvotes + b.comments * 2) - (a.upvotes + a.comments * 2));
                  if (cSort === "Top")  ps.sort((a, b) => b.upvotes - a.upvotes);
                  ps = [...ps.filter(p => p.pinned), ...ps.filter(p => !p.pinned)];
                  return ps.map(post => (
                    <div key={post.id} className="card fade" style={{ display:"flex", gap:10, padding:"12px 14px", marginBottom:3 }}>
                      <div style={{ width:38, flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center", gap:3, paddingTop:2 }}>
                        <button onClick={() => setPosts(p => p.map(pp => pp.id === post.id ? { ...pp, upvotes:pp.upvotes + 1 } : pp))}
                          style={{ background:"none", border:"1px solid #1c2330", color:"#2a3a4a", width:26, height:22, cursor:"pointer", fontSize:10, display:"flex", alignItems:"center", justifyContent:"center", transition:"all .12s" }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor="#2a6a2a"; e.currentTarget.style.color="#40c070"; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor="#1c2330"; e.currentTarget.style.color="#2a3a4a"; }}>
                          ▲
                        </button>
                        <span style={{ fontSize:11, color:"#4a5a6a", fontFamily:"monospace" }}>{fmtNum(post.upvotes)}</span>
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ display:"flex", gap:6, alignItems:"center", marginBottom:5, flexWrap:"wrap" }}>
                          {post.pinned && <span style={{ fontSize:7, color:"#c08020", background:"#1e1808", border:"1px solid #3a2a10", padding:"1px 5px", fontFamily:"monospace" }}>📌 PINNED</span>}
                          {post.contentType && <span style={{ fontSize:7, color:"#5a9ac8", background:"#0d1a2a", border:"1px solid #1a2a3a", padding:"1px 5px", fontFamily:"monospace", textTransform:"uppercase" }}>{CT_LABELS[post.contentType] || post.contentType}</span>}
                          {post.confidence && (() => {
                            const cc = CONF_COLORS[post.confidence];
                            return <span style={{ fontSize:7, padding:"1px 5px", fontFamily:"monospace", textTransform:"uppercase", background:cc?.bg||"#10131e", color:cc?.c||"#5a6a7a", border:`1px solid ${cc?.b||"#1c2330"}` }}>{CONF_LABELS[post.confidence] || ""}</span>;
                          })()}
                          <span style={{ fontSize:9, color:"#b02020", fontFamily:"monospace" }}>u/{post.user}</span>
                          <span style={{ fontSize:8, color:"#eeeae0", background:"#1c2330", padding:"1px 6px", fontFamily:"monospace" }}>{post.badge}</span>
                          <span style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace" }}>{post.time} · {post.region}</span>
                        </div>
                        <div className="bk" style={{ fontSize:15, color:"#d8d0c4", lineHeight:1.3, marginBottom:6 }}>{post.title}</div>
                        {post.body && <div style={{ fontSize:10, color:"#3a4a5a", lineHeight:1.65, marginBottom:7, fontFamily:"monospace" }}>{post.body}</div>}
                        {post.image && <img src={post.image} alt="" style={{ maxWidth:"100%", maxHeight:220, objectFit:"cover", border:"1px solid #1c2330", marginBottom:7, display:"block" }} />}
                        {post.tags?.length > 0 && (
                          <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginBottom:6 }}>
                            {post.tags.map(t => <span key={t} style={{ fontSize:7, background:"#10131e", border:"1px solid #1c2330", color:"#1c2a38", padding:"1px 6px", fontFamily:"monospace" }}>#{t}</span>)}
                          </div>
                        )}
                        {post.refs?.length > 0 && (
                          <div style={{ background:"#07080c", border:"1px solid #1c2a1a", padding:"8px 10px", marginBottom:7 }}>
                            <div style={{ fontSize:7, color:"#2a4a2a", letterSpacing:1, textTransform:"uppercase", marginBottom:5, fontFamily:"monospace" }}>📚 Sources ({post.refs.length})</div>
                            {post.refs.map((ref, i) => (
                              <a key={i} href={ref.url} target="_blank" rel="noopener noreferrer"
                                style={{ display:"flex", alignItems:"center", gap:6, padding:"4px 7px", background:"#0b0d14", border:"1px solid #1c2330", marginBottom:3, transition:"border-color .12s" }}
                                onMouseEnter={e => e.currentTarget.style.borderColor="#2a4a2a"}
                                onMouseLeave={e => e.currentTarget.style.borderColor="#1c2330"}>
                                <span style={{ fontSize:7, color:"#2a4a2a", flexShrink:0, fontFamily:"monospace" }}>{i + 1}</span>
                                <span style={{ fontSize:9, color:"#5a9ac8", flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", fontFamily:"monospace" }}>{ref.label || ref.url}</span>
                                <span style={{ color:"#2a3a4a", fontSize:9 }}>↗</span>
                              </a>
                            ))}
                          </div>
                        )}
                        <div style={{ display:"flex", gap:12, alignItems:"center", flexWrap:"wrap" }}>

                          {isAdmin && (
                            <>
                              <button onClick={() => { setPosts(p => p.map(pp => pp.id === post.id ? { ...pp, pinned:!pp.pinned } : pp)); toast2(post.pinned ? "Unpinned" : "Pinned"); }}
                                style={{ background:post.pinned?"#1e1808":"none", border:`1px solid ${post.pinned?"#4a3a10":"#1c2330"}`, color:post.pinned?"#e0c060":"#3a4a5a", fontSize:7, cursor:"pointer", padding:"2px 6px", fontFamily:"monospace" }}>
                                {post.pinned ? "📌" : "Pin"}
                              </button>
                              <button onClick={() => { setPosts(p => p.filter(pp => pp.id !== post.id)); toast2("Removed"); }}
                                style={{ background:"#200a0a", border:"1px solid #4a1a1a", color:"#c04040", fontSize:7, cursor:"pointer", padding:"2px 6px", fontFamily:"monospace" }}>
                                Remove
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          )}

          {/* ── REDDIT ── */}
          {view === "reddit" && (
            <div className="feed-wrap">
              {!focusMode && <Sidebar {...sidebarProps} />}
              <div style={{ flex:1 }}>
                <>
                    <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:14 }}>
                      {REDDIT_SUBS.map(s => (
                        <button key={s.name} onClick={() => { setSub(s); fetchReddit(s, rSort); }}
                          style={{ background:sub.name===s.name?"#0b0d14":"transparent", border:`1px solid ${sub.name===s.name?s.color:"#1c2330"}`, color:sub.name===s.name?s.color:"#2a3a4a", padding:"4px 11px", fontFamily:"monospace", fontSize:9, cursor:"pointer", transition:"all .15s" }}>
                          {s.name}
                        </button>
                      ))}
                      <div style={{ marginLeft:"auto", display:"flex", gap:4 }}>
                        {["hot","new","top","rising"].map(s => (
                          <button key={s} onClick={() => { setRSort(s); fetchReddit(sub, s); }}
                            style={{ background:rSort===s?"#1c2330":"transparent", border:`1px solid ${rSort===s?"#3a4a5a":"#1c2330"}`, color:rSort===s?"#8a9aaa":"#2a3a4a", padding:"4px 9px", fontFamily:"monospace", fontSize:8, cursor:"pointer", textTransform:"uppercase" }}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                      <div className="bb" style={{ fontSize:18, letterSpacing:2, color:sub.color }}>{sub.name}</div>
                      <span style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace" }}>{sub.desc}</span>
                      <a href={sub.url} target="_blank" rel="noopener noreferrer" style={{ marginLeft:"auto", background:"#b02020", color:"#fff", padding:"4px 12px", fontFamily:"monospace", fontSize:8, letterSpacing:.5 }}>Open on Reddit ↗</a>
                    </div>
                    {rLoad && <div style={{ fontSize:10, color:"#2a3a4a", textAlign:"center", padding:32, fontFamily:"monospace" }}>Loading {sub.name}…</div>}
                    {!rLoad && !rPosts.length && <div style={{ fontSize:10, color:"#1c2a38", textAlign:"center", padding:32, fontFamily:"monospace" }}>Select a subreddit above to load live posts</div>}
                    {rPosts.map(post => (
                      <div key={post.id} className="card fade" style={{ display:"flex", gap:10, padding:"11px 13px", marginBottom:3 }}>
                        <div style={{ width:42, flexShrink:0, textAlign:"center", paddingTop:2 }}>
                          <span style={{ color:"#ff6030", fontSize:13 }}>▲</span>
                          <div style={{ fontSize:10, color:post.score>1000?"#ff6030":"#4a5a6a", fontFamily:"monospace" }}>{post.score >= 1000 ? (post.score/1000).toFixed(1)+"k" : post.score}</div>
                        </div>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ display:"flex", gap:6, alignItems:"center", marginBottom:4, flexWrap:"wrap" }}>
                            <span style={{ background:"#1a0a04", color:"#e06030", padding:"1px 5px", fontSize:7, fontFamily:"monospace" }}>REDDIT</span>
                            <span style={{ fontSize:8, color:"#e06030", fontFamily:"monospace" }}>r/{post.subreddit}</span>
                            {post.flair && <span style={{ fontSize:7, color:"#5a4a20", background:"#1e1808", border:"1px solid #2a2010", padding:"1px 5px", fontFamily:"monospace" }}>{post.flair}</span>}
                            <span style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace" }}>u/{post.author} · {Math.floor((Date.now()/1000 - post.created) / 3600)}h ago</span>
                          </div>
                          <a href={post.permalink} target="_blank" rel="noopener noreferrer" className="bk"
                            style={{ fontSize:14, color:"#d8d0c4", display:"block", marginBottom:4, lineHeight:1.3 }}
                            onMouseEnter={e => e.target.style.color="#e06030"}
                            onMouseLeave={e => e.target.style.color="#d8d0c4"}>
                            {post.title}
                          </a>
                          {post.selftext && <div style={{ fontSize:9, color:"#2a3a4a", lineHeight:1.55, marginBottom:5, fontFamily:"monospace" }}>{post.selftext}{post.selftext.length >= 240 ? "…" : ""}</div>}
                          {post.preview && <img src={post.preview} alt="" style={{ maxHeight:160, maxWidth:"100%", objectFit:"cover", border:"1px solid #1c2330", marginBottom:5, display:"block" }} onError={e => e.target.style.display="none"} />}
                          <div style={{ display:"flex", gap:12, alignItems:"center" }}>

                            {!post.isSelf && <a href={post.url} target="_blank" rel="noopener noreferrer" style={{ fontSize:9, color:"#3a5a7a", fontFamily:"monospace" }}>Link</a>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
              </div>
            </div>
          )}

          {/* ── LIBRARY ── */}
          {view === "library" && (
            <div className="feed-wrap">
              {!focusMode && <Sidebar {...sidebarProps} />}
              <div style={{ flex:1 }}>
                <div style={{ marginBottom:14 }}>
                  <div className="bb" style={{ fontSize:20, letterSpacing:2, color:"#eeeae0" }}>MEDIA & REFERENCE LIBRARY</div>
                  <div style={{ fontSize:8, color:"#1c2a38", marginTop:3, fontFamily:"monospace" }}>{MEDIA_LIBRARY.length} references · Books · Documentaries · Films · Articles · All link to original sources</div>
                </div>

                <div style={{ display:"flex", gap:6, marginBottom:14, flexWrap:"wrap", alignItems:"center" }}>
                  {["All","Books","Documentaries","Films","Articles","Podcasts"].map(t => (
                    <button key={t} onClick={() => setLibType(t)}
                      style={{ background:libType===t?"#1c2330":"transparent", border:`1px solid ${libType===t?"#3a4a5a":"#1c2330"}`, color:libType===t?"#ccc8be":"#2a3a4a", padding:"4px 12px", fontFamily:"monospace", fontSize:8, cursor:"pointer", textTransform:"uppercase", transition:"all .12s" }}>
                      {{ All:"All Types", Books:"Books", Documentaries:"Docs", Films:"Films", Articles:"Articles", Podcasts:"Podcasts" }[t]}
                    </button>
                  ))}
                  <select value={libTopic} onChange={e => setLibTopic(e.target.value)} style={{ background:"#0b0d14", border:"1px solid #1c2330", color:"#4a5a6a", padding:"4px 8px", fontFamily:"monospace", fontSize:8, outline:"none" }}>
                    <option>All Topics</option>
                    {[...new Set(MEDIA_LIBRARY.map(m => m.topic))].map(t => <option key={t}>{t}</option>)}
                  </select>
                  <input value={libQ} onChange={e => setLibQ(e.target.value)} placeholder="Search library..." style={{ flex:1, minWidth:140, background:"#0b0d14", border:"1px solid #1c2330", color:"#ccc8be", padding:"4px 9px", fontFamily:"monospace", fontSize:10, outline:"none" }} />
                  {(libType !== "All" || libTopic !== "All Topics" || libQ) && (
                    <button onClick={() => { setLibType("All"); setLibTopic("All Topics"); setLibQ(""); }} style={{ background:"none", border:"1px solid #1c2330", color:"#2a3a4a", padding:"4px 9px", fontFamily:"monospace", fontSize:8, cursor:"pointer" }}>Clear</button>
                  )}
                </div>

                {(() => {
                  const tm = { Books:"book", Documentaries:"documentary", Films:"film", Articles:"article", Podcasts:"podcast" };
                  const filt = MEDIA_LIBRARY.filter(m => {
                    if (libType !== "All" && m.type !== tm[libType]) return false;
                    if (libTopic !== "All Topics" && m.topic !== libTopic) return false;
                    if (libQ) {
                      const q = libQ.toLowerCase();
                      return m.title.toLowerCase().includes(q) || m.author.toLowerCase().includes(q) || m.tags.some(t => t.toLowerCase().includes(q));
                    }
                    return true;
                  });
                  if (!filt.length) return <div style={{ fontSize:10, color:"#1c2a38", textAlign:"center", padding:32, fontFamily:"monospace" }}>No results. Try clearing filters.</div>;
                  const groups = ["book","documentary","film","article"].map(type => ({ type, items:filt.filter(m => m.type === type) })).filter(g => g.items.length > 0);
                  const tLabel = { book:"BOOKS", documentary:"DOCUMENTARIES", film:"FILMS", article:"ARTICLES", podcast:"PODCASTS" };
                  return groups.map(group => (
                    <div key={group.type} style={{ marginBottom:26 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10, paddingBottom:6, borderBottom:"1px solid #1c2330" }}>
                        <span style={{ fontSize:18 }}>{TYPE_ICON[group.type]}</span>
                        <span className="bb" style={{ fontSize:16, letterSpacing:2, color:TYPE_CLR[group.type] }}>{tLabel[group.type]}</span>
                        <span style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace" }}>{group.items.length} titles</span>
                      </div>
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(275px,1fr))", gap:7 }}>
                        {group.items.map(m => (
                          <a key={m.id} href={m.url} target="_blank" rel="noopener noreferrer"
                            style={{ background:"#0b0d14", border:"1px solid #1c2330", padding:"14px", display:"block", transition:"border-color .12s" }}
                            onMouseEnter={e => e.currentTarget.style.borderColor=TYPE_CLR[m.type]+"44"}
                            onMouseLeave={e => e.currentTarget.style.borderColor="#1c2330"}>
                            <div style={{ display:"flex", gap:9, marginBottom:8 }}>
                              <div style={{ width:36, height:36, background:{ book:"#1a2a3a", documentary:"#1a0a1a", film:"#0a1a0a", article:"#1a1a0a" }[m.type], border:`1px solid ${TYPE_CLR[m.type]}22`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{TYPE_ICON[m.type]}</div>
                              <div style={{ flex:1, minWidth:0 }}>
                                <div style={{ fontSize:7, color:TYPE_CLR[m.type], letterSpacing:.5, textTransform:"uppercase", marginBottom:2, fontFamily:"monospace" }}>{m.type.toUpperCase()} · {m.year}</div>
                                <div className="bk" style={{ fontSize:13, color:"#d8d0c4", lineHeight:1.25 }}>{m.title}</div>
                                <div style={{ fontSize:8, color:"#3a4a5a", marginTop:2, fontFamily:"monospace" }}>{m.author}</div>
                              </div>
                              <div style={{ flexShrink:0, textAlign:"right" }}>
                                <div style={{ fontSize:8, color:"#c08030" }}>{"★".repeat(Math.floor(m.rating))}</div>
                                <div style={{ fontSize:7, color:"#2a3a4a", fontFamily:"monospace" }}>{m.rating}/5</div>
                              </div>
                            </div>
                            <div style={{ fontSize:9, color:"#3a4a5a", lineHeight:1.6, marginBottom:8, fontFamily:"monospace" }}>{m.desc}</div>
                            <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginBottom:7 }}>
                              <span style={{ fontSize:7, background:"#10131e", border:"1px solid #1c2330", color:"#2a3a4a", padding:"1px 6px", fontFamily:"monospace" }}>{m.topic}</span>
                              {m.tags.slice(0, 3).map(t => <span key={t} style={{ fontSize:7, background:"#10131e", border:"1px solid #1c2330", color:"#1c2a38", padding:"1px 6px", fontFamily:"monospace" }}>#{t}</span>)}
                            </div>
                            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                              <span style={{ fontSize:8, color:TYPE_CLR[m.type], fontFamily:"monospace" }}>{m.type === "book" ? "Read / Buy ↗" : "Watch ↗"}</span>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          )}

          {/* ── AI ANALYSIS ── */}
          {view === "ai" && (
            <div className="feed-wrap">
              {!focusMode && <Sidebar {...sidebarProps} />}
              <div style={{ flex:1 }}>
                <div style={{ marginBottom:12 }}>
                  <div className="bb" style={{ fontSize:20, letterSpacing:2, color:"#eeeae0" }}>ANALYSIS ENGINE</div>
                  <div style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace" }}>AI-powered investigative analysis — coming soon</div>
                </div>
                <div style={{ background:"#07080c", border:"1px solid #1c2330", padding:48, textAlign:"center" }}>
                  <div style={{ fontSize:32, marginBottom:16 }}>🔬</div>
                  <div className="bb" style={{ fontSize:18, letterSpacing:2, color:"#eeeae0", marginBottom:10 }}>ANALYSIS ENGINE</div>
                  <div style={{ fontSize:10, color:"#3a4a5a", fontFamily:"monospace", lineHeight:1.8, maxWidth:420, margin:"0 auto 24px" }}>
                    AI-powered analysis of unresolved events, classified programs, and suppressed history is currently being configured. Ask questions, get sourced breakdowns from all sides.
                  </div>
                  <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap", marginBottom:24 }}>
                    {["Operation Northwoods","MK-Ultra","Epstein network","Ancient civilizations","Remote viewing","Dolphin programs"].map(q => (
                      <span key={q} style={{ background:"#0b0d14", border:"1px solid #1c2330", color:"#2a3a4a", padding:"4px 10px", fontFamily:"monospace", fontSize:8 }}>{q}</span>
                    ))}
                  </div>
                  <div style={{ background:"#0b0d14", border:"1px solid #1a3a1a", padding:"12px 20px", display:"inline-block" }}>
                    <span style={{ fontSize:9, color:"#40c070", fontFamily:"monospace", letterSpacing:1 }}>✓ COMING IN NEXT UPDATE</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── SOURCES ── */}
          {view === "sources" && (
            <div className="feed-wrap">
              {!focusMode && <Sidebar {...sidebarProps} />}
              <div style={{ flex:1 }}>
                <div style={{ marginBottom:12 }}>
                  <div className="bb" style={{ fontSize:20, letterSpacing:2, color:"#eeeae0" }}>SOURCE DIRECTORY</div>
                  <div style={{ fontSize:8, color:"#1c2a38", marginTop:3, fontFamily:"monospace" }}>
                    {SOURCES.reduce((acc, g) => acc + g.items.length, 0)} sources across {SOURCES.length} categories · All links open in new tab
                  </div>
                </div>

                {/* Source filters */}
                <div style={{ display:"flex", gap:6, marginBottom:14, flexWrap:"wrap", alignItems:"center" }}>
                  {["All","Research","Podcasts","Blogs","Archives","Community"].map(f => {
                    const typeMap = { Research:"research", Podcasts:"podcast", Blogs:"blog", Archives:"archive", Community:"user" };
                    const active = (f === "All" && !filters.srcType.startsWith("src:")) ||
                                   (f !== "All" && filters.srcType === "src:" + f);
                    return (
                      <button key={f}
                        onClick={() => setFilters(p => ({ ...p, srcType: f === "All" ? "All Sources" : "src:" + f }))}
                        style={{ background:active?"#1c2330":"transparent", border:`1px solid ${active?"#3a4a5a":"#1c2330"}`, color:active?"#ccc8be":"#2a3a4a", padding:"4px 12px", fontFamily:"monospace", fontSize:8, cursor:"pointer", textTransform:"uppercase" }}>
                        {f}
                      </button>
                    );
                  })}
                  <input
                    value={filters.search}
                    onChange={e => setFilters(p => ({ ...p, search:e.target.value }))}
                    placeholder="Search sources..."
                    style={{ background:"#07080c", border:"1px solid #1c2330", color:"#ccc8be", padding:"4px 10px", fontFamily:"monospace", fontSize:9, outline:"none", flex:1, minWidth:160, maxWidth:280 }}
                  />
                  {(filters.search || filters.srcType !== "All Sources") && (
                    <button onClick={() => setFilters(p => ({ ...p, search:"", srcType:"All Sources" }))}
                      style={{ background:"transparent", border:"1px solid #1c2330", color:"#3a4a5a", padding:"4px 10px", fontFamily:"monospace", fontSize:8, cursor:"pointer" }}>
                      Clear
                    </button>
                  )}
                </div>

                {/* Filtered source groups */}
                {(() => {
                  const typeMap = { "src:Research":"research", "src:Podcasts":"podcast", "src:Blogs":"blog", "src:Archives":"archive", "src:Community":"user" };
                  const activeType = typeMap[filters.srcType] || null;
                  const searchTerm = filters.search.toLowerCase();

                  const filteredGroups = SOURCES
                    .map(group => {
                      if (activeType && group.type !== activeType) return null;
                      const filteredItems = searchTerm
                        ? group.items.filter(item => item.n.toLowerCase().includes(searchTerm) || item.u.toLowerCase().includes(searchTerm))
                        : group.items;
                      if (filteredItems.length === 0) return null;
                      return { ...group, items: filteredItems };
                    })
                    .filter(Boolean);

                  const totalShown = filteredGroups.reduce((acc, g) => acc + g.items.length, 0);

                  return (
                    <>
                      <div style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace", marginBottom:10 }}>
                        Showing {totalShown} sources across {filteredGroups.length} categories
                        {filters.search && <span style={{ color:"#b02020", marginLeft:6 }}>matching "{filters.search}"</span>}
                      </div>
                      {filteredGroups.map(group => {
                        const t = getType(group.type);
                        return (
                          <div key={group.label} style={{ marginBottom:20 }}>
                            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8, paddingBottom:6, borderBottom:"1px solid #1c2330" }}>
                              <span style={{ background:t.bg, color:t.text, padding:"1px 6px", fontFamily:"monospace", fontSize:7, letterSpacing:.5 }}>{t.label}</span>
                              <span style={{ fontSize:9, color:"#2a3a4a", fontFamily:"monospace" }}>{group.label}</span>
                              <span style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace" }}>({group.items.length})</span>
                            </div>
                            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:5 }}>
                              {group.items.map(item => (
                                <a key={item.n} href={item.u} target="_blank" rel="noopener noreferrer"
                                  style={{ background:"#0b0d14", border:"1px solid #1c2330", padding:"9px 12px", display:"flex", alignItems:"center", justifyContent:"space-between", transition:"border-color .12s" }}
                                  onMouseEnter={e => e.currentTarget.style.borderColor=t.text+"44"}
                                  onMouseLeave={e => e.currentTarget.style.borderColor="#1c2330"}>
                                  <span style={{ fontSize:10, color:"#7a8a9a", fontFamily:"monospace" }}>{item.n}</span>
                                  <span style={{ color:"#2a3a4a", fontSize:10 }}>↗</span>
                                </a>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                      {filteredGroups.length === 0 && (
                        <div style={{ textAlign:"center", padding:"40px 0", color:"#2a3a4a", fontFamily:"monospace", fontSize:11 }}>
                          No sources found · Try a different filter or search term
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          )}

          {/* ── ADMIN ── */}
          {view === "admin" && isAdmin && (
            <div style={{ display:"flex", gap:0 }}>
              {!focusMode && <Sidebar {...sidebarProps} />}
              <div style={{ flex:1 }}>
                <div style={{ background:"#1e1808", border:"1px solid #4a3a10", padding:"12px 16px", marginBottom:16, display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:18 }}>⚙️</span>
                  <div>
                    <div className="bb" style={{ fontSize:18, letterSpacing:2, color:"#e0c060" }}>ADMIN CONTROL CENTER</div>
                    <div style={{ fontSize:8, color:"#5a4a20", fontFamily:"monospace" }}>Master admin · Login: {ADMIN_USER} / {ADMIN_PASS}</div>
                  </div>
                </div>

                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:16 }}>
                  {[{ l:"Total Stories", v:stories.length, c:"#5a9ac8" }, { l:"Community Posts", v:posts.length, c:"#40c070" }, { l:"Total Sources", v:619, c:"#a070d0" }, { l:"Reddit Subs", v:24, c:"#e0c060" }].map(s => (
                    <div key={s.l} style={{ background:"#0b0d14", border:"1px solid #1c2330", padding:"12px 14px" }}>
                      <div style={{ fontSize:8, color:"#2a3a4a", marginBottom:4, fontFamily:"monospace" }}>{s.l}</div>
                      <div className="bb" style={{ fontSize:22, letterSpacing:1, color:s.c }}>{s.v}</div>
                    </div>
                  ))}
                </div>

                <div style={{ background:"#0b0d14", border:"1px solid #1c2330", padding:"14px 16px", marginBottom:14 }}>
                  <div style={{ fontSize:9, color:"#4a3a10", letterSpacing:1, marginBottom:10, textTransform:"uppercase", fontFamily:"monospace" }}>Preview As User Type</div>
                  <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
                    {[{ l:"👻 Free User", p:"free" }, { l:"🔍 Investigator", p:"monthly" }, { l:"📊 Analyst", p:"annual" }].map(opt => (
                      <button key={opt.p} onClick={() => { setUser({ username:`Preview`, plan:opt.p, isAdmin:false }); setView("home"); toast2(`Viewing as ${opt.l}`); }}
                        style={{ background:"#07080c", border:"1px solid #1c2330", color:"#5a6a7a", padding:"9px 14px", fontFamily:"monospace", fontSize:9, cursor:"pointer", transition:"all .12s" }}
                        onMouseEnter={e => e.currentTarget.style.borderColor="#4a3a10"}
                        onMouseLeave={e => e.currentTarget.style.borderColor="#1c2330"}>
                        {opt.l}
                      </button>
                    ))}
                    <button onClick={() => { setUser({ plan:"admin", isAdmin:true }); setView("admin"); toast2("Back to admin view"); }}
                      style={{ background:"#1e1808", border:"1px solid #4a3a10", color:"#e0c060", padding:"9px 14px", fontFamily:"monospace", fontSize:9, cursor:"pointer" }}>
                      ⚙ Admin View
                    </button>
                  </div>
                </div>

                <div style={{ background:"#0b0d14", border:"1px solid #1c2330", padding:"14px 16px", marginBottom:14 }}>
                  <div style={{ fontSize:9, color:"#4a3a10", letterSpacing:1, marginBottom:10, textTransform:"uppercase", fontFamily:"monospace" }}>Community Moderation</div>
                  {posts.map(post => (
                    <div key={post.id} style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"8px 0", borderBottom:"1px solid #1c2330" }}>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:9, color:"#7a8a9a", marginBottom:2, fontFamily:"monospace" }}>u/{post.user} · {post.badge} · {post.time}</div>
                        <div className="bk" style={{ fontSize:12, color:"#ccc8be", lineHeight:1.3 }}>{post.title}</div>
                      </div>
                      <div style={{ display:"flex", gap:4, flexShrink:0 }}>
                        <button onClick={() => { setPosts(p => p.map(pp => pp.id === post.id ? { ...pp, pinned:!pp.pinned } : pp)); toast2(post.pinned ? "Unpinned" : "Pinned"); }}
                          style={{ background:post.pinned?"#1e1808":"transparent", border:`1px solid ${post.pinned?"#4a3a10":"#1c2330"}`, color:post.pinned?"#e0c060":"#3a4a5a", padding:"3px 7px", fontSize:7, cursor:"pointer", fontFamily:"monospace" }}>
                          {post.pinned ? "📌 Pinned" : "Pin"}
                        </button>
                        <button onClick={() => { setPosts(p => p.filter(pp => pp.id !== post.id)); toast2("Post removed"); }}
                          style={{ background:"#200a0a", border:"1px solid #4a1a1a", color:"#c04040", padding:"3px 7px", fontSize:7, cursor:"pointer", fontFamily:"monospace" }}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ background:"#07080c", border:"1px dashed #4a3a10", padding:"14px 16px" }}>
                  <div style={{ fontSize:9, color:"#e0c060", letterSpacing:1, marginBottom:8, textTransform:"uppercase", fontFamily:"monospace" }}>💳 Payment Setup Checklist</div>
                  {[
                    "Sign up free at stripe.com",
                    "Create Investigator product — $7.99/month recurring",
                    "Create Analyst product — $59.99/year recurring",
                    "Copy both Payment Link URLs",
                    "Set up Google Play Billing when submitting to Play Store",
                    "Set up Apple In-App Purchase when submitting to App Store",
                  ].map((item, i) => (
                    <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start", padding:"6px 0", borderBottom:"1px solid #1c2330" }}>
                      <span style={{ color:"#3a4a5a", fontSize:11, flexShrink:0, marginTop:1 }}>○</span>
                      <span style={{ fontSize:10, color:"#4a5a6a", lineHeight:1.5, fontFamily:"monospace" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
        </div>

        {/* ── FOOTER ── */}
        <div style={{ borderTop:"1px solid #1c2330", marginTop:32, padding:"12px 20px", background:"#07080c" }}>
          <div style={{ maxWidth:1280, margin:"0 auto", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:6, alignItems:"center" }}>
            <div style={{ display:"flex", gap:12, alignItems:"center", flexWrap:"wrap" }}>
              <span style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace" }}>© 2025 The Nexus · thenexusapp.com</span>
              <span style={{ color:"#1c2330", fontSize:8 }}>·</span>
              <button onClick={() => setShowPrivacy(true)} style={{ background:"none", border:"none", color:"#3a4a5a", fontFamily:"monospace", fontSize:8, cursor:"pointer", textDecoration:"underline", padding:0 }}>Privacy Policy</button>
              <span style={{ color:"#1c2330", fontSize:8 }}>·</span>
              <span style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace" }}>For independent research only · Adults 18+</span>
              <span style={{ color:"#1c2330", fontSize:8 }}>·</span>
              <a href="https://buymeacoffee.com/thenexus" target="_blank" rel="noopener noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:5, background:"#FFDD00", color:"#000", padding:"4px 10px", fontFamily:"monospace", fontSize:8, fontWeight:700, textDecoration:"none", borderRadius:3, letterSpacing:.5 }}>
                ☕ Support The Nexus
              </a>
            </div>
            <div style={{ display:"flex", gap:10, alignItems:"center" }}>
              {/* Hidden admin — double-click the dot */}
              <span
                onDoubleClick={() => {
                  const u = window.prompt("Admin username:");
                  const p = window.prompt("Admin password:");
                  if (u === ADMIN_USER && p === ADMIN_PASS) {
                    saveSession({ plan:"admin", isAdmin:true });
                    setUser({ plan:"admin", isAdmin:true });
                    setView("admin");
                    toast2("Welcome, Admin");
                  } else if (u || p) { toast2("Access denied"); }
                }}
                style={{ width:6, height:6, borderRadius:"50%", background:"#1c2330", display:"inline-block", cursor:"default", marginLeft:4 }}
                title=""
              />
            </div>
          </div>
        </div>

        {/* Modals */}
        {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
        <Analytics />
      </div>
    </>
  );
}

// Slug helper
// Router wrapper — provides unique URLs for each record
function AppWithRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/records/:slug" element={<App />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppWithRouter;
