import { useState, useCallback, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CSS, VBadge, Sidebar, PrivacyModal, SubmitSourceForm } from './components.jsx';
import {
  ADMIN_USER, ADMIN_PASS, TOPICS, REGIONS, MEDIA_LIBRARY,
  SEED_STORIES as _RAW_STORIES, SEED_POSTS, REDDIT_SUBS, SOURCES, RESEARCHERS,
  autoVerdict, getType, fmtNum, OPENROUTER_KEY, AI_MODEL,
} from './data.js';
import { STORY_BODIES } from './data.body.js';

// Merge article body content into stories for AdSense content depth requirements
const SEED_STORIES = _RAW_STORIES.map(s =>
  STORY_BODIES[s.id] ? { ...s, body: STORY_BODIES[s.id] } : s
);

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
const saveSession = u => { window.__nexusSession = u; };

// eslint-disable-next-line
const TYPE_ICON = { book:"📖", documentary:"🎬", film:"🎥", article:"📰" };
const TYPE_CLR  = { book:"#5a9ac8", documentary:"#a060d0", film:"#4a9a5a", article:"#c0a020" };
// eslint-disable-next-line
const CONF_LABELS = { confirmed:"✓ Confirmed", likely:"↑ Likely", contested:"⚖ Disputed", unverified:"? Unverified" };
// eslint-disable-next-line
const CONF_COLORS = { confirmed:{bg:"#0d2010",c:"#40c070",b:"#1a4a1a"}, likely:{bg:"#0d1a10",c:"#60c080",b:"#1a3a1a"}, contested:{bg:"#1e1808",c:"#c0a020",b:"#3a3010"}, unverified:{bg:"#1a1008",c:"#c07020",b:"#3a2010"} };
// eslint-disable-next-line
const CT_LABELS = { research:"🔬 Research", document:"📄 Document", sighting:"👁 Sighting", tip:"💡 Tip", rebuttal:"⚖ Counter", media:"📷 Media" };

const toSlug = str => (str || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);

const fmtDate = (timeStr) => {
  if (!timeStr) return '';
  const hoursMatch = timeStr.match(/^(\d+)h ago/);
  const daysMatch  = timeStr.match(/^(\d+)d? ago/);
  if (hoursMatch || daysMatch) {
    const hrs = hoursMatch ? parseInt(hoursMatch[1]) : parseInt(daysMatch[1]) * 24;
    const d = new Date(Date.now() - hrs * 3600000);
    return d.toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' });
  }
  return timeStr;
};

// ── Article Body Renderer ─────────────────────────────────────────────────────
function ArticleBody({ story, verdicts }) {
  if (!story.body || !story.body.length) return null;
  return (
    <div style={{ borderTop:"1px solid #1c2330", marginTop:24, paddingTop:24 }}>
      {story.body.map((section, i) => (
        <div key={i} style={{ marginBottom:28 }}>
          {section.heading && (
            <h2 style={{
              fontSize:11, fontWeight:600, color:"#8a9aaa", letterSpacing:2,
              textTransform:"uppercase", fontFamily:"monospace", marginBottom:12,
              paddingBottom:8, borderBottom:"1px solid #1c2330",
            }}>
              {section.heading}
            </h2>
          )}
          {section.paragraphs && section.paragraphs.map((p, j) => (
            <p key={j} style={{
              fontSize:15, color:"#9a9a96", lineHeight:1.9, marginBottom:16,
              fontFamily:"Georgia, 'Times New Roman', serif",
            }}>
              {p}
            </p>
          ))}
          {section.facts && (
            <div style={{
              background:"#0b0d14", border:"1px solid #1c2330",
              borderLeft:"3px solid #b02020", padding:"14px 16px", marginBottom:16,
            }}>
              <div style={{
                fontSize:9, color:"#b02020", letterSpacing:1.5,
                textTransform:"uppercase", fontFamily:"monospace", marginBottom:10,
              }}>
                Key Facts
              </div>
              {section.facts.map((fact, k) => (
                <div key={k} style={{
                  display:"flex", gap:10, padding:"6px 0",
                  borderBottom:"1px solid #0e1018", fontSize:12,
                  color:"#7a8a9a", fontFamily:"monospace", lineHeight:1.5,
                }}>
                  <span style={{ color:"#b02020", flexShrink:0 }}>›</span>
                  <span>{fact}</span>
                </div>
              ))}
            </div>
          )}
          {section.quote && (
            <blockquote style={{
              borderLeft:"3px solid #3a4a5a", margin:"16px 0",
              padding:"12px 18px", background:"#0b0d14",
              fontStyle:"italic", color:"#6a7a8a", fontSize:14,
              lineHeight:1.75, fontFamily:"Georgia, serif",
            }}>
              "{section.quote}"
              {section.quoteSource && (
                <div style={{
                  fontSize:10, color:"#3a4a5a", fontFamily:"monospace",
                  marginTop:8, fontStyle:"normal",
                }}>
                  — {section.quoteSource}
                </div>
              )}
            </blockquote>
          )}
        </div>
      ))}

      {/* Credibility bar */}
      <div style={{
        background:"#0b0d14", border:"1px solid #1c2330",
        padding:"14px 16px", marginTop:8,
      }}>
        <div style={{
          fontSize:9, color:"#3a4a5a", letterSpacing:1.5,
          textTransform:"uppercase", fontFamily:"monospace", marginBottom:10,
        }}>
          Credibility Assessment
        </div>
        <div style={{ display:"flex", gap:16, alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ flex:1 }}>
            <div style={{ height:6, background:"#1c2330", borderRadius:3, marginBottom:6, maxWidth:260 }}>
              <div style={{
                height:"100%", width:`${story.credible}%`,
                background:"linear-gradient(90deg,#1a5a1a,#40c070)", borderRadius:3,
              }} />
            </div>
            <div style={{ fontSize:11, color:"#4a5a6a", fontFamily:"monospace" }}>
              {story.credible}% credibility — based on source quality and independent corroboration
            </div>
          </div>
          <span style={{
            fontSize:10, fontFamily:"monospace", color:"#5a9ac8",
            background:"#0d1a2a", border:"1px solid #1a2a3a", padding:"4px 10px",
          }}>
            {story.topic}
          </span>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser]         = useState({ plan:"free", isAdmin:false });
  const isAdmin = user.isAdmin;

  const [view, setView]         = useState("home");
  const [openStory, setOpenStory] = useState(null);

  const [stories, setStories]   = useState(SEED_STORIES);
  const [posts,   setPosts]     = useState(SEED_POSTS);
  const [verdicts] = useState({});
  const [saved,   setSaved]     = useState({});

  const [filters, setFilters]   = useState({ topic:"All Topics", region:"All Regions", srcType:"All Sources", sortBy:"Latest", search:"", verdict:"All" });
  const [libType, setLibType]   = useState("All");
  const [libTopic, setLibTopic] = useState("All Topics");
  const [libQ, setLibQ]         = useState("");

  const [rPosts, setRPosts]     = useState([]);
  const [rLoad,  setRLoad]      = useState(false);
  const [sub,    setSub]        = useState(REDDIT_SUBS[0]);
  const [rSort,  setRSort]      = useState("hot");

  const [showSrc, setShowSrc]   = useState(false);
  const [np, setNp]             = useState({ title:"", body:"", topic:TOPICS[1], region:"🌍 Global", contentType:"research", confidence:"unverified", tags:"" });
  const [refs, setRefs]         = useState([{ label:"", url:"" }]);
  const [uploads, setUploads]   = useState([]);
  const [disc, setDisc]         = useState(false);
  const [cSort, setCSort]       = useState("Hot");

  const [showPrivacy, setShowPrivacy] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [activeResearcher, setActiveResearcher] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  // refs removed - not used in this build

  const [toast, setToast] = useState(null);
  const toast2 = msg => { setToast(msg); setTimeout(() => setToast(null), 2200); };

  useEffect(() => {
    if (openStory) {
      const slug = toSlug(openStory.title);
      window.history.pushState({}, '', '/records/' + slug);
      document.title = openStory.title + ' - The Nexus';
      const desc = openStory.summary ? openStory.summary.slice(0, 160) : openStory.title;
      let meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', desc);
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
      document.title = 'The Nexus - Independent Research Platform';
      const setOG = (prop, val) => { const el = document.querySelector(`meta[property="${prop}"]`); if (el) el.setAttribute('content', val); };
      setOG('og:title', 'The Nexus - Independent Research Platform');
      setOG('og:description', 'Investigative journalism, declassified records, whistleblower testimony, and disputed history.');
      setOG('og:url', 'https://nexusverse.app/');
    }
  }, [openStory]);

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
  }, [filters.topic, filters.search, view, openStory]);

  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/records/')) {
      const urlSlug = path.replace('/records/', '').replace(/\/$/, '');
      if (urlSlug && !urlSlug.startsWith('topic/')) {
        const match = SEED_STORIES.find(s => toSlug(s.title) === urlSlug);
        if (match) { setOpenStory(match); setView('feed'); document.title = match.title + ' - The Nexus'; }
        else { setView('feed'); }
      }
    } else if (path.startsWith('/sources')) { setView('sources');
    } else if (path.startsWith('/community')) { setView('community');
    } else if (path.startsWith('/library')) { setView('library');
    } else if (path.startsWith('/reddit')) { setView('reddit');
    } else if (path.startsWith('/records')) { setView('feed');
    }
  }, []);

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

  // eslint-disable-next-line
  const handleFiles = files => Array.from(files).forEach(f => {
    const r = new FileReader();
    r.onload = ev => {
      const type = f.type.startsWith("image/") ? "image" : f.type === "application/pdf" ? "pdf" : "doc";
      setUploads(p => [...p, { type, name:f.name, data:ev.target.result, size:f.size }]);
    };
    r.readAsDataURL(f);
  });

  // eslint-disable-next-line
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

  const { topic, region, srcType, sortBy, search, verdict } = filters;
  const filteredStories = stories.filter(s => {
    if (topic !== "All Topics" && s.topic?.trim() !== topic.trim()) return false;
    if (region !== "All Regions" && s.region?.trim() !== region.trim()) return false;
    if (srcType && srcType !== "All Sources" && srcType !== "All Types" && srcType !== "All") {
      const typeMap = { "News":"news", "Research":"research", "Archive":"archive", "Podcast":"podcast", "Blog":"blog" };
      const mapped = typeMap[srcType];
      if (mapped && s.type !== mapped) return false;
    }
    if (verdict !== "All") {
      const ev = verdicts[s.id] || autoVerdict(s.credible);
      if (ev !== verdict.toLowerCase()) return false;
    }
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
    const idA = parseInt(a.id.replace(/\D/g,'')) || 0;
    const idB = parseInt(b.id.replace(/\D/g,'')) || 0;
    return idB - idA;
  });

  const visibleStories = filteredStories;
  const sidebarProps = { filters, setFilters, isAdmin, onFetch:fetchMore, visibleTopics:TOPICS, visibleRegions:REGIONS };

  const navTo = (v) => {
    setView(v); setOpenStory(null); setMobileMenu(false);
    window.history.pushState({}, '', v === "home" ? '/' : '/' + v);
    if (v === "home") setFilters({ topic:'All Topics', region:'All Regions', srcType:'All Sources', verdict:'All', sortBy:'Latest', search:'' });
    document.title = 'The Nexus';
    if (v === "reddit" && !rPosts.length) fetchReddit();
  };

  return (
    <>
      <style>{CSS}</style>
      <div style={{ minHeight:"100vh", background:"#07080c", color:"#ccc8be" }}>

        {toast && (
          <div className="fade" style={{ position:"fixed", bottom:20, right:20, background:"#10131e", border:"1px solid #2a3a4a", color:"#8a9aaa", padding:"8px 14px", fontSize:11, zIndex:9999, fontFamily:"monospace" }}>
            {toast}
          </div>
        )}

        {/* NAV */}
        <div style={{ background:"#07080c", borderBottom:"1px solid #1c2330", position:"sticky", top:0, zIndex:100 }}>
          <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 12px", display:"flex", alignItems:"center", justifyContent:"space-between", height:48 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", flexShrink:0 }}
              onClick={() => navTo('home')}>
              <div style={{ width:18, height:18, background:"#b02020", clipPath:"polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)" }} />
              <span className="bb" style={{ fontSize:16, letterSpacing:3, color:"#eeeae0" }}>THE NEXUS</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", overflowX:"auto", gap:0 }} className="desktop-nav">
              {[["home","Home"],["feed","Records"],["saved","Saved"],["sources","Sources"],["researchers","Researchers"],["community","Community"],["reddit","Reddit"],["library","Library"],["ai","Analysis"],...(isAdmin?[["admin","Admin"]]:[])].map(([v,l]) => (
                <button key={v} onClick={() => navTo(v)}
                  style={{ background:"none", border:"none", borderBottom:view===v?"2px solid #b02020":"2px solid transparent", color:view===v?"#eeeae0":"#3a4a5a", padding:"0 9px", height:48, fontFamily:"monospace", fontSize:9, letterSpacing:.5, textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 }}>
                  {l}
                </button>
              ))}
            </div>
            {mobileMenu && (
              <div style={{ position:"fixed", top:56, left:0, right:0, background:"#0b0d14", borderBottom:"1px solid #1c2330", zIndex:1000, padding:"8px 0" }}>
                {[["home","Home"],["feed","Records"],["saved","Saved"],["sources","Sources"],["researchers","Researchers"],["community","Community"],["reddit","Reddit"],["library","Library"],["ai","Analysis"]].map(([v,l]) => (
                  <button key={v} onClick={() => navTo(v)}
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

        {openStory && (
          <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 16px" }}>
            <div className="back-bar" style={{ marginBottom:0 }}>
              <button className="back-btn back-btn-primary" onClick={() => { setOpenStory(null); window.history.pushState({}, "", "/records"); document.title = "The Nexus"; }}>← Records</button>
              <button className="back-btn back-btn-ghost" onClick={() => { setOpenStory(null); setView("home"); setFilters({ topic:"All Topics", region:"All Regions", srcType:"All Sources", verdict:"All", sortBy:"Latest", search:"" }); window.history.pushState({}, "", "/"); }}>Home</button>
              <button className="back-btn back-btn-ghost" onClick={() => { setOpenStory(null); setFilters({ topic:"All Topics", region:"All Regions", srcType:"All Sources", verdict:"All", sortBy:"Latest", search:"" }); window.history.pushState({}, "", "/records"); }}>Reset</button>
              <button className="back-btn back-btn-ghost" onClick={() => setFocusMode(f => !f)} style={{ marginLeft:"auto", color:focusMode?"#8a9aaa":"#3a4a5a", borderColor:focusMode?"#3a4a6a":"#1c2330" }}>
                {focusMode ? "⊡ Exit Focus" : "⊠ Focus"}
              </button>
            </div>
          </div>
        )}

        <div className="nexus-shell">

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

                {openStory && (
                  <div>
                    <div className="back-bar">
                      <button className="back-btn back-btn-primary" onClick={() => { setOpenStory(null); setFocusMode(false); window.history.pushState({}, "", "/records"); document.title = "The Nexus - Open Records"; }}>&larr; Back</button>
                      <button className="back-btn back-btn-ghost" onClick={() => { setOpenStory(null); setView("home"); setFilters({ topic:"All Topics", region:"All Regions", srcType:"All Sources", verdict:"All", sortBy:"Latest", search:"" }); window.history.pushState({}, "", "/"); }}>Home</button>
                      <button className="back-btn back-btn-ghost" onClick={() => { setOpenStory(null); setFilters({ topic:"All Topics", region:"All Regions", srcType:"All Sources", verdict:"All", sortBy:"Latest", search:"" }); window.history.pushState({}, "", "/records"); }}>Reset</button>
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

                      {/* ── ARTICLE BODY — AdSense content depth requirement ── */}
                      <ArticleBody story={openStory} verdicts={verdicts} />

                      <div style={{ display:"flex", gap:6, flexWrap:"wrap", margin:"20px 0 16px" }}>
                        {openStory.tags?.map(t => (
                          <span key={t} onClick={() => { setFilters(f => ({...f, search:t})); setOpenStory(null); window.history.pushState({}, '', '/records?q='+encodeURIComponent(t)); }}
                            style={{ fontSize:8, background:"#10131e", border:"1px solid #1c2330", color:"#3a4a5a", padding:"1px 7px", fontFamily:"monospace", cursor:"pointer" }}
                            title={"Search: "+t}>#{t}</span>
                        ))}
                      </div>

                      <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:16 }}>
                        {openStory.sourceUrl && <a href={openStory.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ background:"#b02020", color:"#fff", padding:"10px 18px", fontFamily:"monospace", fontSize:10, letterSpacing:.5, borderRadius:3 }}>Read Source ↗</a>}
                        <button onClick={() => { setSaved(p => ({ ...p, [openStory.id]:!p[openStory.id] })); toast2(saved[openStory.id] ? "Removed" : "Saved"); }} style={{ background:"transparent", border:"1px solid #1c2330", color:saved[openStory.id]?"#c08030":"#3a4a5a", padding:"10px 14px", fontFamily:"monospace", fontSize:10, cursor:"pointer", borderRadius:3 }}>{saved[openStory.id] ? "* Saved" : "Save"}</button>
                        <button onClick={() => { setLibTopic(openStory.topic); setView("library"); }} style={{ background:"transparent", border:"1px solid #2a3a1a", color:"#4a7a4a", padding:"7px 12px", fontFamily:"monospace", fontSize:9, cursor:"pointer" }}>Related Reading</button>
                      </div>

                      <div style={{ borderTop:"1px solid #1c2330", paddingTop:12, marginBottom:16 }}>
                        <div style={{ fontSize:8, color:"#1c2a38", letterSpacing:1.5, textTransform:"uppercase", fontFamily:"monospace", marginBottom:8 }}>Share This Record</div>
                        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(openStory.sourceUrl||"https://nexusverse.app")}&quote=${encodeURIComponent(openStory.title)}`} target="_blank" rel="noopener noreferrer" style={{ background:"#1877f2", color:"#fff", padding:"7px 14px", fontFamily:"monospace", fontSize:9, letterSpacing:.5, textDecoration:"none", display:"inline-block" }}>f Facebook</a>
                          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(openStory.title)}&url=${encodeURIComponent(openStory.sourceUrl||"https://nexusverse.app")}&hashtags=${encodeURIComponent((openStory.tags||[]).slice(0,3).join(","))}`} target="_blank" rel="noopener noreferrer" style={{ background:"#000", color:"#fff", padding:"7px 14px", fontFamily:"monospace", fontSize:9, letterSpacing:.5, textDecoration:"none", display:"inline-block" }}>X / Twitter</a>
                          <button onClick={() => { navigator.clipboard?.writeText(openStory.title + " - " + (openStory.sourceUrl||"https://nexusverse.app")); toast2("Link copied - paste into Instagram post"); }} style={{ background:"linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", color:"#fff", padding:"7px 14px", fontFamily:"monospace", fontSize:9, letterSpacing:.5, border:"none", cursor:"pointer" }}>Instagram</button>
                          <button onClick={() => { navigator.clipboard?.writeText(openStory.sourceUrl||"https://nexusverse.app"); toast2("Source link copied to clipboard"); }} style={{ background:"transparent", border:"1px solid #2a3a4a", color:"#5a6a7a", padding:"7px 12px", fontFamily:"monospace", fontSize:9, cursor:"pointer" }}>Copy Link</button>
                        </div>
                      </div>

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
                                <a key={m.id} href={m.url} target="_blank" rel="noopener noreferrer" style={{ background:"#0b0d14", border:"1px solid #1c2330", padding:"8px 10px", display:"block", transition:"border-color .12s" }} onMouseEnter={e => e.currentTarget.style.borderColor="#2a4a2a"} onMouseLeave={e => e.currentTarget.style.borderColor="#1c2330"}>
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

                      {/* Related Records */}
                      {(() => {
                        const related = stories.filter(s => s.id !== openStory.id && (s.topic === openStory.topic || openStory.tags?.some(t => s.tags?.includes(t)))).slice(0, 4);
                        if (!related.length) return null;
                        return (
                          <div style={{ borderTop:"1px solid #1c2330", marginTop:20, paddingTop:16 }}>
                            <div style={{ fontSize:8, color:"#3a4a5a", letterSpacing:1.5, textTransform:"uppercase", fontFamily:"monospace", marginBottom:10 }}>Related Records</div>
                            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:6 }}>
                              {related.map(r => (
                                <div key={r.id} onClick={() => { setOpenStory(r); window.scrollTo(0,0); }} className="card" style={{ padding:"10px 14px", cursor:"pointer" }}>
                                  <div style={{ display:"flex", gap:5, marginBottom:4 }}>
                                    <span style={{ background:getType(r.type).bg, color:getType(r.type).text, padding:"1px 5px", fontSize:7, fontFamily:"monospace" }}>{getType(r.type).label}</span>
                                    <span style={{ fontSize:7, color:"#2a3a4a", fontFamily:"monospace" }}>{r.topic}</span>
                                  </div>
                                  <div style={{ fontSize:11, color:"#8a9aaa", fontFamily:"monospace", lineHeight:1.3 }}>{r.title.slice(0,90)}{r.title.length>90?"...":""}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                )}

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
                    <div style={{ padding:"18px 0", textAlign:"center", borderTop:"1px solid #0e1018", marginTop:8 }}>
                      <div style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace", marginBottom:8 }}>
                        {filters.topic !== "All Topics" ? `Showing all ${visibleStories.length} records for "${filters.topic}"` : `Showing all ${visibleStories.length} records`}
                      </div>
                      <div style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace" }}>New records added regularly · Check back soon</div>
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
                <div>
                  <div className="back-bar">
                    <button className="back-btn back-btn-primary" onClick={() => setActiveResearcher(null)}>← Researchers</button>
                    <button className="back-btn back-btn-ghost" onClick={() => { setView("home"); setActiveResearcher(null); window.history.pushState({},"","/"); }}>Home</button>
                  </div>
                  <div style={{ display:"flex", gap:24, flexWrap:"wrap", marginBottom:28 }}>
                    <div style={{ flex:1, minWidth:260 }}>
                      <div style={{ fontSize:9, color:"#b02020", letterSpacing:2, textTransform:"uppercase", fontFamily:"monospace", marginBottom:6 }}>{activeResearcher.role}</div>
                      <h1 style={{ fontSize:28, color:"#eeeae0", fontWeight:700, marginBottom:8, letterSpacing:1 }}>{activeResearcher.name}</h1>
                      <p style={{ fontSize:14, color:"#6a7a8a", lineHeight:1.8, marginBottom:16 }}>{activeResearcher.bio}</p>
                      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:16 }}>
                        {activeResearcher.topics.map(t => (
                          <button key={t} onClick={() => { setFilters(f => ({...f, topic:t})); setView("feed"); setActiveResearcher(null); }} style={{ background:"#0b0d14", border:"1px solid #1c2330", color:"#5a9ac8", padding:"4px 12px", fontFamily:"monospace", fontSize:9, cursor:"pointer", borderRadius:20 }}>{t}</button>
                        ))}
                      </div>
                      <a href={activeResearcher.url} target="_blank" rel="noopener noreferrer" style={{ display:"inline-block", background:"#b02020", color:"#fff", padding:"8px 18px", fontFamily:"monospace", fontSize:9, letterSpacing:1 }}>Official Site ↗</a>
                    </div>
                  </div>
                  <div style={{ marginBottom:24 }}>
                    <div style={{ fontSize:9, color:"#3a4a5a", letterSpacing:2, textTransform:"uppercase", fontFamily:"monospace", marginBottom:12, paddingBottom:8, borderBottom:"1px solid #1c2330" }}>Related Records</div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:8 }}>
                      {stories.filter(s => activeResearcher.tags.some(tag => s.tags?.includes(tag) || s.title?.toLowerCase().includes(tag.toLowerCase()))).slice(0,6).map(s => {
                        const t = getType(s.type);
                        return (
                          <div key={s.id} onClick={() => { setOpenStory(s); setView("feed"); setActiveResearcher(null); }} className="rec-card" style={{ cursor:"pointer" }}>
                            <div className="rec-body">
                              <div className="rec-meta"><span className="rec-type" style={{ background:t.bg, color:t.text }}>{t.label}</span><span className="rec-source">{s.source}</span></div>
                              <div className="rec-title">{s.title.slice(0,80)}{s.title.length>80?"...":""}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ marginBottom:24 }}>
                    <div className="sec-head">RESEARCHERS</div>
                    <div className="sec-sub">Key investigators, journalists, scientists and whistleblowers behind the records</div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:10 }}>
                    {RESEARCHERS.map(r => (
                      <div key={r.id} onClick={() => setActiveResearcher(r)} className="card" style={{ padding:"18px 20px", cursor:"pointer", border:"1px solid #1a2030", transition:"border-color .15s" }} onMouseEnter={e => e.currentTarget.style.borderColor="#2a4a6a"} onMouseLeave={e => e.currentTarget.style.borderColor="#1a2030"}>
                        <div style={{ fontSize:9, color:"#b02020", letterSpacing:1, textTransform:"uppercase", fontFamily:"monospace", marginBottom:4 }}>{r.role}</div>
                        <div style={{ fontSize:18, color:"#eeeae0", fontWeight:700, marginBottom:6 }}>{r.name}</div>
                        <div style={{ fontSize:11, color:"#4a5a6a", lineHeight:1.7, marginBottom:10 }}>{r.bio.slice(0,160)}...</div>
                        <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                          {r.topics.slice(0,2).map(t => <span key={t} style={{ fontSize:8, background:"#0b0d14", border:"1px solid #1c2330", color:"#3a5a7a", padding:"2px 8px", fontFamily:"monospace" }}>{t}</span>)}
                          <span style={{ fontSize:8, color:"#b02020", fontFamily:"monospace", marginLeft:"auto" }}>{r.country}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── HOME ── */}
          {view === "home" && (
            <div>
              <div style={{ padding:"52px 0 44px", borderBottom:"1px solid #1c2330", marginBottom:32 }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:16, marginBottom:18 }}>
                  <div style={{ width:3, height:60, background:"linear-gradient(180deg,#b02020,transparent)", flexShrink:0, marginTop:4 }} />
                  <div>
                    <div style={{ fontSize:10, color:"#b02020", letterSpacing:3, fontFamily:"monospace", textTransform:"uppercase", marginBottom:10 }}>— Independent Research Platform</div>
                    <div className="bb hero-title" style={{ color:"#eeeae0", lineHeight:1.1, marginBottom:4 }}>SOME QUESTIONS</div>
                    <div className="bb hero-sub" style={{ color:"#b02020", lineHeight:1.1, marginBottom:20 }}>NEVER GET ANSWERED.</div>
                    <div className="hero-desc" style={{ color:"#5a6a7a", lineHeight:1.8, maxWidth:580, fontFamily:"Georgia,serif", fontStyle:"italic", marginBottom:28 }}>
                      The Nexus aggregates investigative journalism, declassified records, whistleblower testimony, and disputed history — for adults who ask questions the mainstream stopped asking.
                    </div>
                    <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                      <button onClick={() => { setView("feed"); window.history.pushState({},"","/records"); }} style={{ background:"#b02020", color:"#fff", padding:"12px 28px", fontFamily:"monospace", fontSize:10, letterSpacing:2, border:"none", cursor:"pointer", fontWeight:700 }}>ENTER THE ARCHIVE →</button>
                      <button onClick={() => { setView("sources"); window.history.pushState({},"","/sources"); }} style={{ background:"transparent", border:"1px solid #2a3a4a", color:"#5a6a7a", padding:"12px 20px", fontFamily:"monospace", fontSize:10, letterSpacing:1, cursor:"pointer" }}>Browse Sources</button>
                    </div>
                  </div>
                </div>
                <div className="hero-stats" style={{ marginTop:8, paddingLeft:19 }}>
                  {[{ n:String(stories.length)+"+", l:"Records" },{ n:String(TOPICS.length-1), l:"Topics" },{ n:String(SOURCES.reduce((a,g)=>a+g.items.length,0))+"+", l:"Sources" },{ n:"25", l:"Researchers" }].map(s => (
                    <div key={s.l} style={{ textAlign:"center" }}>
                      <div className="bb" style={{ fontSize:28, color:"#eeeae0" }}>{s.n}</div>
                      <div style={{ fontSize:9, color:"#3a4a5a", fontFamily:"monospace", letterSpacing:1 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display:"flex", gap:8, overflowX:"auto", marginBottom:32, padding:"16px 0 14px", borderBottom:"1px solid #1c2330", WebkitOverflowScrolling:"touch", scrollbarWidth:"none" }}>
                {[{ label:"Open Records", icon:"▦", view:"feed", color:"#b02020" },{ label:"Researchers", icon:"◈", view:"researchers", color:"#4a7aaa" },{ label:"Sources", icon:"◎", view:"sources", color:"#4a8a4a" },{ label:"Library", icon:"◉", view:"library", color:"#8a6a2a" },{ label:"Community", icon:"◇", view:"community", color:"#6a4aaa" }].map(item => (
                  <button key={item.view} onClick={() => { setView(item.view); window.history.pushState({},"","/"+item.view); }} style={{ display:"flex", alignItems:"center", gap:8, background:"#0b0d14", border:"1px solid #1c2330", color:"#8a9aaa", padding:"10px 18px", fontFamily:"monospace", fontSize:10, cursor:"pointer", borderRadius:3, transition:"all .15s", letterSpacing:.5 }} onMouseEnter={e => { e.currentTarget.style.borderColor=item.color; e.currentTarget.style.color=item.color; }} onMouseLeave={e => { e.currentTarget.style.borderColor="#1c2330"; e.currentTarget.style.color="#8a9aaa"; }}>
                    <span style={{ fontSize:14 }}>{item.icon}</span> {item.label}
                  </button>
                ))}
                <div style={{ flex:1 }} />
                <span style={{ fontSize:9, color:"#1c2a38", fontFamily:"monospace", alignSelf:"center" }}>{stories.length} records · {SOURCES.reduce((a,g)=>a+g.items.length,0)} sources</span>
              </div>

              <div className="home-grid" style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:24, marginBottom:32 }}>
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                    <div style={{ width:3, height:18, background:"#b02020" }} />
                    <div style={{ fontSize:11, letterSpacing:3, color:"#eeeae0", fontFamily:"monospace", textTransform:"uppercase", fontWeight:700 }}>Latest Disclosures</div>
                    <div style={{ flex:1, height:1, background:"#1c2330" }} />
                    <button onClick={() => { setView("feed"); setFilters(f => ({...f, sortBy:"Latest"})); window.history.pushState({},"","/records"); }} style={{ fontSize:9, color:"#b02020", fontFamily:"monospace", background:"none", border:"none", cursor:"pointer", letterSpacing:.5 }}>View All →</button>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    {stories.slice(-5).reverse().map(s => {
                      const t = getType(s.type);
                      return (
                        <div key={s.id} onClick={() => { setOpenStory(s); setView("feed"); window.history.pushState({},"","/records/"+toSlug(s.title)); }} style={{ display:"flex", gap:12, padding:"14px 16px", background:"#0b0d14", border:"1px solid #1a2030", borderRadius:3, cursor:"pointer", transition:"border-color .15s", alignItems:"flex-start" }} onMouseEnter={e => e.currentTarget.style.borderColor="#2a3a5a"} onMouseLeave={e => e.currentTarget.style.borderColor="#1a2030"}>
                          <div style={{ background:"#b02020", color:"#fff", fontSize:7, padding:"2px 7px", fontFamily:"monospace", letterSpacing:1, flexShrink:0, marginTop:3 }}>NEW</div>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ display:"flex", gap:6, marginBottom:5, flexWrap:"wrap" }}>
                              <span style={{ background:t.bg, color:t.text, padding:"1px 5px", fontSize:7, fontFamily:"monospace" }}>{t.label}</span>
                              <span style={{ fontSize:8, color:"#3a5a7a", fontFamily:"monospace" }}>{s.topic}</span>
                              <span style={{ fontSize:8, color:"#2a3a4a", fontFamily:"monospace", marginLeft:"auto" }}>{s.region}</span>
                            </div>
                            <div style={{ fontSize:14, color:"#d0ccc4", lineHeight:1.35, fontWeight:500, marginBottom:4 }}>{s.title.slice(0,120)}{s.title.length>120?"...":""}</div>
                            <div style={{ fontSize:10, color:"#3a4a5a", fontFamily:"monospace" }}>{s.source}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                  <div style={{ background:"linear-gradient(160deg,#110e08,#1a1410)", border:"1px solid #4a3a1a", borderRadius:6, padding:"20px 18px", textAlign:"center" }}>
                    <div style={{ fontSize:20, marginBottom:8 }}>☕</div>
                    <div style={{ fontSize:13, color:"#c0a060", fontWeight:700, marginBottom:6, letterSpacing:.5 }}>Support The Nexus</div>
                    <div style={{ fontSize:11, color:"#6a5a3a", lineHeight:1.7, marginBottom:14 }}>Free forever. No ads. No paywall. If it's been useful, a coffee helps keep it running.</div>
                    <a href="https://buymeacoffee.com/thenexus" target="_blank" rel="noopener noreferrer" style={{ display:"block", background:"#FFDD00", color:"#000", padding:"10px 0", fontFamily:"monospace", fontSize:11, fontWeight:700, textDecoration:"none", borderRadius:4, letterSpacing:1 }}>BUY ME A COFFEE →</a>
                  </div>

                  <div style={{ background:"#0b0d14", border:"1px solid #1c2330", borderRadius:6, padding:"16px 18px" }}>
                    <div style={{ fontSize:9, color:"#3a4a5a", letterSpacing:2, textTransform:"uppercase", fontFamily:"monospace", marginBottom:12 }}>Archive Stats</div>
                    {[{ label:"Records", value:stories.length },{ label:"Topics", value:TOPICS.length-1 },{ label:"Sources", value:SOURCES.reduce((a,g)=>a+g.items.length,0) },{ label:"Researchers", value:"25" }].map(stat => (
                      <div key={stat.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 0", borderBottom:"1px solid #0e1018" }}>
                        <span style={{ fontSize:10, color:"#4a5a6a", fontFamily:"monospace" }}>{stat.label}</span>
                        <span style={{ fontSize:16, color:"#eeeae0", fontFamily:"monospace", fontWeight:700 }}>{stat.value}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ background:"#0b0d14", border:"1px solid #1c2330", borderRadius:6, padding:"16px 18px" }}>
                    <div style={{ fontSize:9, color:"#3a4a5a", letterSpacing:2, textTransform:"uppercase", fontFamily:"monospace", marginBottom:12 }}>Hot Topics</div>
                    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                      {["UAP & Anomalous","Aliens & Extraterrestrial","Government & Intelligence","Ancient Civilizations","Surveillance","Finance & Power"].map(t => {
                        const count = stories.filter(s => s.topic === t).length;
                        return (
                          <button key={t} onClick={() => { setFilters(f => ({...f, topic:t})); setView("feed"); }} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", background:"transparent", border:"none", color:"#6a7a8a", padding:"6px 0", fontFamily:"monospace", fontSize:10, cursor:"pointer", borderBottom:"1px solid #0e1018", textAlign:"left", transition:"color .12s" }} onMouseEnter={e => e.currentTarget.style.color="#b02020"} onMouseLeave={e => e.currentTarget.style.color="#6a7a8a"}>
                            <span>{t}</span><span style={{ fontSize:9, color:"#2a3a4a" }}>{count} →</span>
                          </button>
                        );
                      })}
                      <button onClick={() => setView("feed")} style={{ fontSize:9, color:"#b02020", fontFamily:"monospace", background:"none", border:"none", cursor:"pointer", textAlign:"left", paddingTop:8, letterSpacing:.5 }}>All {TOPICS.length-1} topics →</button>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom:32 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                  <div style={{ width:3, height:18, background:"#3a4a5a" }} />
                  <div style={{ fontSize:11, letterSpacing:3, color:"#eeeae0", fontFamily:"monospace", textTransform:"uppercase", fontWeight:700 }}>All Topics</div>
                  <div style={{ flex:1, height:1, background:"#1c2330" }} />
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:6 }}>
                  {TOPICS.filter(t => t !== "All Topics").map(t => {
                    const count = stories.filter(s => s.topic === t).length;
                    if (!count) return null;
                    return (
                      <button key={t} onClick={() => { setFilters(f => ({...f, topic:t})); setView("feed"); window.history.pushState({},"","/records/topic/"+t.toLowerCase().replace(/[^a-z0-9]+/g,"-")); }} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", background:"#0b0d14", border:"1px solid #1a2030", color:"#7a8a9a", padding:"13px 14px", fontFamily:"monospace", fontSize:10, cursor:"pointer", textAlign:"left", transition:"all .15s", borderRadius:3, minHeight:48 }} onMouseEnter={e => { e.currentTarget.style.borderColor="#b02020"; e.currentTarget.style.color="#eeeae0"; }} onMouseLeave={e => { e.currentTarget.style.borderColor="#1a2030"; e.currentTarget.style.color="#7a8a9a"; }}>
                        <span>{t}</span><span style={{ fontSize:9, color:"#2a3a4a", background:"#0f1018", padding:"1px 7px", borderRadius:10 }}>{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* SAVED */}
          {view === "saved" && (
            <div className="feed-wrap">
              <div className="nexus-sidebar"><Sidebar {...sidebarProps} /></div>
              <div style={{ flex:1 }}>
                <div style={{ marginBottom:14 }}>
                  <div className="bb" style={{ fontSize:20, letterSpacing:2, color:"#eeeae0" }}>SAVED RECORDS</div>
                  <div style={{ fontSize:8, color:"#1c2a38", marginTop:3, fontFamily:"monospace" }}>{Object.keys(saved).filter(id => saved[id]).length} saved · Session only · Clears on page refresh</div>
                </div>
                {Object.keys(saved).filter(id => saved[id]).length === 0 ? (
                  <div style={{ textAlign:"center", padding:"60px 0", color:"#2a3a4a", fontFamily:"monospace" }}>
                    <div style={{ fontSize:24, marginBottom:12, opacity:.3 }}>*</div>
                    <div style={{ fontSize:11 }}>No saved records yet</div>
                    <button onClick={() => setView("feed")} style={{ marginTop:16, background:"#b02020", border:"none", color:"#fff", padding:"8px 20px", fontFamily:"monospace", fontSize:9, cursor:"pointer", letterSpacing:1 }}>Browse Records</button>
                  </div>
                ) : (
                  <>
                    <div style={{ marginBottom:8, textAlign:"right" }}><button onClick={() => setSaved({})} style={{ background:"transparent", border:"1px solid #1c2330", color:"#3a4a5a", padding:"4px 12px", fontFamily:"monospace", fontSize:8, cursor:"pointer" }}>Clear All</button></div>
                    {stories.filter(s => saved[s.id]).map(s => {
                      const t = getType(s.type);
                      return (
                        <div key={s.id} onClick={() => { setOpenStory(s); setView("feed"); }} className="card fade" style={{ padding:"14px 16px", marginBottom:8, cursor:"pointer" }}>
                          <div style={{ display:"flex", gap:6, marginBottom:6, alignItems:"center" }}>
                            <span style={{ background:t.bg, color:t.text, padding:"1px 6px", fontFamily:"monospace", fontSize:7 }}>{t.label}</span>
                            <span style={{ fontSize:8, color:"#5a9ac8", fontFamily:"monospace" }}>{s.source}</span>
                            <span style={{ fontSize:8, color:"#2a3a4a", fontFamily:"monospace", marginLeft:"auto" }}>{s.topic}</span>
                          </div>
                          <div style={{ fontSize:14, color:"#eeeae0", lineHeight:1.4, marginBottom:6 }}>{s.title}</div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          )}

          {/* COMMUNITY, REDDIT, LIBRARY, AI, SOURCES — kept from original, abbreviated for space */}
          {view === "community" && (
            <div className="feed-wrap">
              {!focusMode && <Sidebar {...sidebarProps} />}
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14, flexWrap:"wrap", gap:8 }}>
                  <div>
                    <div className="bb" style={{ fontSize:20, letterSpacing:2, color:"#eeeae0" }}>COMMUNITY BOARD</div>
                    <div style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace" }}>Submit records, evidence & source links · All posts publicly visible</div>
                  </div>
                  <div style={{ display:"flex", gap:6, alignItems:"center", flexWrap:"wrap" }}>
                    {["Hot","New","Top"].map(s => (<button key={s} onClick={() => setCSort(s)} style={{ background:cSort===s?"#1c2330":"transparent", border:`1px solid ${cSort===s?"#3a4a5a":"#1c2330"}`, color:cSort===s?"#ccc8be":"#2a3a4a", padding:"4px 10px", fontFamily:"monospace", fontSize:8, cursor:"pointer", textTransform:"uppercase" }}>{s}</button>))}
                    <button onClick={() => setShowForm(p => !p)} style={{ background:"#b02020", border:"none", color:"#fff", padding:"6px 14px", fontFamily:"monospace", fontSize:8, letterSpacing:1, cursor:"pointer", textTransform:"uppercase" }}>+ Submit Record</button>
                    <button onClick={() => setShowSrc(p => !p)} style={{ background:"#1a2a3a", border:"1px solid #5a9ac8", color:"#5a9ac8", padding:"6px 14px", fontFamily:"monospace", fontSize:8, letterSpacing:1, cursor:"pointer", textTransform:"uppercase" }}>+ Submit Source</button>
                  </div>
                </div>
                {showSrc && (
                  <div className="fade" style={{ background:"#0b0d14", border:"1px solid #5a9ac8", padding:20, marginBottom:14 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                      <div className="bb" style={{ fontSize:18, letterSpacing:2, color:"#eeeae0" }}>SUBMIT A SOURCE</div>
                      <button onClick={() => setShowSrc(false)} style={{ background:"none", border:"none", color:"#3a4a5a", cursor:"pointer", fontSize:16 }}>✕</button>
                    </div>
                    <SubmitSourceForm onClose={() => setShowSrc(false)} toast2={toast2} />
                  </div>
                )}
                {(() => {
                  let ps = [...posts];
                  if (cSort === "Hot") ps.sort((a, b) => (b.upvotes + b.comments * 2) - (a.upvotes + a.comments * 2));
                  if (cSort === "Top") ps.sort((a, b) => b.upvotes - a.upvotes);
                  ps = [...ps.filter(p => p.pinned), ...ps.filter(p => !p.pinned)];
                  return ps.map(post => (
                    <div key={post.id} className="card fade" style={{ display:"flex", gap:10, padding:"12px 14px", marginBottom:3 }}>
                      <div style={{ width:38, flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center", gap:3, paddingTop:2 }}>
                        <button onClick={() => setPosts(p => p.map(pp => pp.id === post.id ? { ...pp, upvotes:pp.upvotes + 1 } : pp))} style={{ background:"none", border:"1px solid #1c2330", color:"#2a3a4a", width:26, height:22, cursor:"pointer", fontSize:10, display:"flex", alignItems:"center", justifyContent:"center" }} onMouseEnter={e => { e.currentTarget.style.borderColor="#2a6a2a"; e.currentTarget.style.color="#40c070"; }} onMouseLeave={e => { e.currentTarget.style.borderColor="#1c2330"; e.currentTarget.style.color="#2a3a4a"; }}>▲</button>
                        <span style={{ fontSize:11, color:"#4a5a6a", fontFamily:"monospace" }}>{fmtNum(post.upvotes)}</span>
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ display:"flex", gap:6, alignItems:"center", marginBottom:5, flexWrap:"wrap" }}>
                          <span style={{ fontSize:9, color:"#b02020", fontFamily:"monospace" }}>u/{post.user}</span>
                          <span style={{ fontSize:8, color:"#eeeae0", background:"#1c2330", padding:"1px 6px", fontFamily:"monospace" }}>{post.badge}</span>
                          <span style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace" }}>{post.time}</span>
                        </div>
                        <div className="bk" style={{ fontSize:15, color:"#d8d0c4", lineHeight:1.3, marginBottom:6 }}>{post.title}</div>
                        {post.body && <div style={{ fontSize:10, color:"#3a4a5a", lineHeight:1.65, marginBottom:7, fontFamily:"monospace" }}>{post.body}</div>}
                        {post.refs?.length > 0 && (
                          <div style={{ background:"#07080c", border:"1px solid #1c2a1a", padding:"8px 10px", marginBottom:7 }}>
                            <div style={{ fontSize:7, color:"#2a4a2a", letterSpacing:1, textTransform:"uppercase", marginBottom:5, fontFamily:"monospace" }}>📚 Sources ({post.refs.length})</div>
                            {post.refs.map((ref, i) => (
                              <a key={i} href={ref.url} target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", gap:6, padding:"4px 7px", background:"#0b0d14", border:"1px solid #1c2330", marginBottom:3 }}>
                                <span style={{ fontSize:9, color:"#5a9ac8", flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", fontFamily:"monospace" }}>{ref.label || ref.url}</span>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          )}

          {view === "reddit" && (
            <div className="feed-wrap">
              {!focusMode && <Sidebar {...sidebarProps} />}
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:14 }}>
                  {REDDIT_SUBS.map(s => (<button key={s.name} onClick={() => { setSub(s); fetchReddit(s, rSort); }} style={{ background:sub.name===s.name?"#0b0d14":"transparent", border:`1px solid ${sub.name===s.name?s.color:"#1c2330"}`, color:sub.name===s.name?s.color:"#2a3a4a", padding:"4px 11px", fontFamily:"monospace", fontSize:9, cursor:"pointer" }}>{s.name}</button>))}
                  <div style={{ marginLeft:"auto", display:"flex", gap:4 }}>
                    {["hot","new","top","rising"].map(s => (<button key={s} onClick={() => { setRSort(s); fetchReddit(sub, s); }} style={{ background:rSort===s?"#1c2330":"transparent", border:`1px solid ${rSort===s?"#3a4a5a":"#1c2330"}`, color:rSort===s?"#8a9aaa":"#2a3a4a", padding:"4px 9px", fontFamily:"monospace", fontSize:8, cursor:"pointer", textTransform:"uppercase" }}>{s}</button>))}
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                  <div className="bb" style={{ fontSize:18, letterSpacing:2, color:sub.color }}>{sub.name}</div>
                  <span style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace" }}>{sub.desc}</span>
                  <a href={sub.url} target="_blank" rel="noopener noreferrer" style={{ marginLeft:"auto", background:"#b02020", color:"#fff", padding:"4px 12px", fontFamily:"monospace", fontSize:8 }}>Open on Reddit ↗</a>
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
                        <span style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace" }}>u/{post.author} · {Math.floor((Date.now()/1000 - post.created) / 3600)}h ago</span>
                      </div>
                      <a href={post.permalink} target="_blank" rel="noopener noreferrer" className="bk" style={{ fontSize:14, color:"#d8d0c4", display:"block", marginBottom:4, lineHeight:1.3 }} onMouseEnter={e => e.target.style.color="#e06030"} onMouseLeave={e => e.target.style.color="#d8d0c4"}>{post.title}</a>
                      {post.selftext && <div style={{ fontSize:9, color:"#2a3a4a", lineHeight:1.55, marginBottom:5, fontFamily:"monospace" }}>{post.selftext}{post.selftext.length >= 240 ? "…" : ""}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "library" && (
            <div className="feed-wrap">
              {!focusMode && <Sidebar {...sidebarProps} />}
              <div style={{ flex:1 }}>
                <div style={{ marginBottom:14 }}>
                  <div className="bb" style={{ fontSize:20, letterSpacing:2, color:"#eeeae0" }}>MEDIA & REFERENCE LIBRARY</div>
                  <div style={{ fontSize:8, color:"#1c2a38", marginTop:3, fontFamily:"monospace" }}>{MEDIA_LIBRARY.length} references · Books · Documentaries · Films · Articles</div>
                </div>
                <div style={{ display:"flex", gap:6, marginBottom:14, flexWrap:"wrap", alignItems:"center" }}>
                  {["All","Books","Documentaries","Films","Articles","Podcasts"].map(t => (<button key={t} onClick={() => setLibType(t)} style={{ background:libType===t?"#1c2330":"transparent", border:`1px solid ${libType===t?"#3a4a5a":"#1c2330"}`, color:libType===t?"#ccc8be":"#2a3a4a", padding:"4px 12px", fontFamily:"monospace", fontSize:8, cursor:"pointer", textTransform:"uppercase" }}>{{ All:"All Types", Books:"Books", Documentaries:"Docs", Films:"Films", Articles:"Articles", Podcasts:"Podcasts" }[t]}</button>))}
                  <input value={libQ} onChange={e => setLibQ(e.target.value)} placeholder="Search library..." style={{ flex:1, minWidth:140, background:"#0b0d14", border:"1px solid #1c2330", color:"#ccc8be", padding:"4px 9px", fontFamily:"monospace", fontSize:10, outline:"none" }} />
                </div>
                {(() => {
                  const tm = { Books:"book", Documentaries:"documentary", Films:"film", Articles:"article", Podcasts:"podcast" };
                  const filt = MEDIA_LIBRARY.filter(m => {
                    if (libType !== "All" && m.type !== tm[libType]) return false;
                    if (libTopic !== "All Topics" && m.topic !== libTopic) return false;
                    if (libQ) { const q = libQ.toLowerCase(); return m.title.toLowerCase().includes(q) || m.author.toLowerCase().includes(q) || m.tags.some(t => t.toLowerCase().includes(q)); }
                    return true;
                  });
                  if (!filt.length) return <div style={{ fontSize:10, color:"#1c2a38", textAlign:"center", padding:32, fontFamily:"monospace" }}>No results. Try clearing filters.</div>;
                  const groups = ["book","documentary","film","article"].map(type => ({ type, items:filt.filter(m => m.type === type) })).filter(g => g.items.length > 0);
                  const tLabel = { book:"BOOKS", documentary:"DOCUMENTARIES", film:"FILMS", article:"ARTICLES" };
                  return groups.map(group => (
                    <div key={group.type} style={{ marginBottom:26 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10, paddingBottom:6, borderBottom:"1px solid #1c2330" }}>
                        <span style={{ fontSize:18 }}>{TYPE_ICON[group.type]}</span>
                        <span className="bb" style={{ fontSize:16, letterSpacing:2, color:TYPE_CLR[group.type] }}>{tLabel[group.type]}</span>
                        <span style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace" }}>{group.items.length} titles</span>
                      </div>
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(275px,1fr))", gap:7 }}>
                        {group.items.map(m => (
                          <a key={m.id} href={m.url} target="_blank" rel="noopener noreferrer" style={{ background:"#0b0d14", border:"1px solid #1c2330", padding:"14px", display:"block" }} onMouseEnter={e => e.currentTarget.style.borderColor=TYPE_CLR[m.type]+"44"} onMouseLeave={e => e.currentTarget.style.borderColor="#1c2330"}>
                            <div style={{ fontSize:7, color:TYPE_CLR[m.type], textTransform:"uppercase", marginBottom:4, fontFamily:"monospace" }}>{m.type} · {m.year}</div>
                            <div className="bk" style={{ fontSize:13, color:"#d8d0c4", lineHeight:1.25, marginBottom:4 }}>{m.title}</div>
                            <div style={{ fontSize:8, color:"#3a4a5a", fontFamily:"monospace", marginBottom:6 }}>{m.author}</div>
                            <div style={{ fontSize:9, color:"#3a4a5a", lineHeight:1.6, fontFamily:"monospace" }}>{m.desc?.slice(0,100)}...</div>
                          </a>
                        ))}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          )}

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
                  <div style={{ fontSize:10, color:"#3a4a5a", fontFamily:"monospace", lineHeight:1.8, maxWidth:420, margin:"0 auto 24px" }}>AI-powered analysis of unresolved events, classified programs, and suppressed history is currently being configured.</div>
                  <div style={{ background:"#0b0d14", border:"1px solid #1a3a1a", padding:"12px 20px", display:"inline-block" }}>
                    <span style={{ fontSize:9, color:"#40c070", fontFamily:"monospace", letterSpacing:1 }}>✓ COMING IN NEXT UPDATE</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {view === "sources" && (
            <div className="feed-wrap">
              {!focusMode && <Sidebar {...sidebarProps} />}
              <div style={{ flex:1 }}>
                <div style={{ marginBottom:12 }}>
                  <div className="bb" style={{ fontSize:20, letterSpacing:2, color:"#eeeae0" }}>SOURCE DIRECTORY</div>
                  <div style={{ fontSize:8, color:"#1c2a38", marginTop:3, fontFamily:"monospace" }}>{SOURCES.reduce((acc, g) => acc + g.items.length, 0)} sources across {SOURCES.length} categories</div>
                </div>
                <div style={{ display:"flex", gap:6, marginBottom:14, flexWrap:"wrap", alignItems:"center" }}>
                  <input value={filters.search} onChange={e => setFilters(p => ({ ...p, search:e.target.value }))} placeholder="Search sources..." style={{ background:"#07080c", border:"1px solid #1c2330", color:"#ccc8be", padding:"4px 10px", fontFamily:"monospace", fontSize:9, outline:"none", flex:1, minWidth:160, maxWidth:280 }} />
                  {filters.search && <button onClick={() => setFilters(p => ({ ...p, search:"" }))} style={{ background:"transparent", border:"1px solid #1c2330", color:"#3a4a5a", padding:"4px 10px", fontFamily:"monospace", fontSize:8, cursor:"pointer" }}>Clear</button>}
                </div>
                {SOURCES.filter(group => {
                  if (!filters.search) return true;
                  return group.items.some(item => item.n.toLowerCase().includes(filters.search.toLowerCase()));
                }).map(group => {
                  const t = getType(group.type);
                  const items = filters.search ? group.items.filter(item => item.n.toLowerCase().includes(filters.search.toLowerCase())) : group.items;
                  if (!items.length) return null;
                  return (
                    <div key={group.label} style={{ marginBottom:20 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8, paddingBottom:6, borderBottom:"1px solid #1c2330" }}>
                        <span style={{ background:t.bg, color:t.text, padding:"1px 6px", fontFamily:"monospace", fontSize:7 }}>{t.label}</span>
                        <span style={{ fontSize:9, color:"#2a3a4a", fontFamily:"monospace" }}>{group.label}</span>
                        <span style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace" }}>({items.length})</span>
                      </div>
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:5 }}>
                        {items.map(item => (
                          <a key={item.n} href={item.u} target="_blank" rel="noopener noreferrer" style={{ background:"#0b0d14", border:"1px solid #1c2330", padding:"9px 12px", display:"flex", alignItems:"center", justifyContent:"space-between" }} onMouseEnter={e => e.currentTarget.style.borderColor=t.text+"44"} onMouseLeave={e => e.currentTarget.style.borderColor="#1c2330"}>
                            <span style={{ fontSize:10, color:"#7a8a9a", fontFamily:"monospace" }}>{item.n}</span>
                            <span style={{ color:"#2a3a4a", fontSize:10 }}>↗</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

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
                  {[{ l:"Total Stories", v:stories.length, c:"#5a9ac8" },{ l:"Community Posts", v:posts.length, c:"#40c070" },{ l:"Total Sources", v:SOURCES.reduce((a,g)=>a+g.items.length,0), c:"#a070d0" },{ l:"Reddit Subs", v:REDDIT_SUBS.length, c:"#e0c060" }].map(s => (
                    <div key={s.l} style={{ background:"#0b0d14", border:"1px solid #1c2330", padding:"12px 14px" }}>
                      <div style={{ fontSize:8, color:"#2a3a4a", marginBottom:4, fontFamily:"monospace" }}>{s.l}</div>
                      <div className="bb" style={{ fontSize:22, letterSpacing:1, color:s.c }}>{s.v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background:"#0b0d14", border:"1px solid #1c2330", padding:"14px 16px", marginBottom:14 }}>
                  <div style={{ fontSize:9, color:"#4a3a10", letterSpacing:1, marginBottom:10, textTransform:"uppercase", fontFamily:"monospace" }}>Preview As User Type</div>
                  <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
                    {[{ l:"👻 Free User", p:"free" },{ l:"🔍 Investigator", p:"monthly" },{ l:"📊 Analyst", p:"annual" }].map(opt => (
                      <button key={opt.p} onClick={() => { setUser({ username:"Preview", plan:opt.p, isAdmin:false }); setView("home"); toast2(`Viewing as ${opt.l}`); }} style={{ background:"#07080c", border:"1px solid #1c2330", color:"#5a6a7a", padding:"9px 14px", fontFamily:"monospace", fontSize:9, cursor:"pointer" }}>{opt.l}</button>
                    ))}
                    <button onClick={() => { setUser({ plan:"admin", isAdmin:true }); setView("admin"); toast2("Back to admin view"); }} style={{ background:"#1e1808", border:"1px solid #4a3a10", color:"#e0c060", padding:"9px 14px", fontFamily:"monospace", fontSize:9, cursor:"pointer" }}>⚙ Admin View</button>
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* ── FOOTER ── */}
        <div style={{ borderTop:"1px solid #1c2330", marginTop:32, padding:"16px 20px 24px", background:"#07080c" }}>
          <div style={{ maxWidth:1280, margin:"0 auto" }}>
            <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:12, alignItems:"center", marginBottom:12 }}>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {["Records","Sources","Researchers","Library","Community"].map(nav => (
                  <button key={nav} onClick={() => navTo(nav.toLowerCase())} style={{ background:"none", border:"none", color:"#5a6a7a", fontFamily:"monospace", fontSize:10, cursor:"pointer", padding:"2px 8px" }} onMouseEnter={e => e.currentTarget.style.color="#b02020"} onMouseLeave={e => e.currentTarget.style.color="#5a6a7a"}>{nav}</button>
                ))}
              </div>
              <a href="https://buymeacoffee.com/thenexus" target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#FFDD00", color:"#000", padding:"7px 16px", fontFamily:"monospace", fontSize:10, fontWeight:700, textDecoration:"none", borderRadius:3, letterSpacing:.5 }}>☕ Buy Me a Coffee</a>
            </div>
            {/* AdSense required footer links */}
            <div style={{ borderTop:"1px solid #1c2330", paddingTop:12, display:"flex", gap:16, flexWrap:"wrap", alignItems:"center" }}>
              <span style={{ fontSize:10, color:"#4a5a6a", fontFamily:"monospace" }}>© 2026 The Nexus · nexusverse.app</span>
              <a href="/about.html" style={{ fontSize:10, color:"#4a5a6a", fontFamily:"monospace", textDecoration:"none" }} onMouseEnter={e => e.target.style.color="#b02020"} onMouseLeave={e => e.target.style.color="#4a5a6a"}>About</a>
              <a href="/contact.html" style={{ fontSize:10, color:"#4a5a6a", fontFamily:"monospace", textDecoration:"none" }} onMouseEnter={e => e.target.style.color="#b02020"} onMouseLeave={e => e.target.style.color="#4a5a6a"}>Contact</a>
              <a href="/privacy-policy.html" style={{ fontSize:10, color:"#4a5a6a", fontFamily:"monospace", textDecoration:"none" }} onMouseEnter={e => e.target.style.color="#b02020"} onMouseLeave={e => e.target.style.color="#4a5a6a"}>Privacy Policy</a>
              <span style={{ fontSize:10, color:"#3a4a5a", fontFamily:"monospace" }}>Independent research only · Adults 18+</span>
            </div>
          </div>
          <div style={{ display:"flex", gap:10, alignItems:"center", marginTop:8 }}>
            <span onDoubleClick={() => { const u = window.prompt("Admin username:"); const p = window.prompt("Admin password:"); if (u === ADMIN_USER && p === ADMIN_PASS) { saveSession({ plan:"admin", isAdmin:true }); setUser({ plan:"admin", isAdmin:true }); setView("admin"); toast2("Welcome, Admin"); } else if (u || p) { toast2("Access denied"); } }} style={{ width:6, height:6, borderRadius:"50%", background:"#1c2330", display:"inline-block", cursor:"default", marginLeft:4 }} title="" />
          </div>
        </div>
        </div>

        {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
        <Analytics />
        <a href="https://buymeacoffee.com/thenexus" target="_blank" rel="noopener noreferrer" className="float-coffee" style={{ position:"fixed", bottom:20, right:20, display:"inline-flex", alignItems:"center", gap:6, background:"#FFDD00", color:"#000", padding:"10px 16px", fontFamily:"monospace", fontSize:11, fontWeight:700, textDecoration:"none", borderRadius:30, boxShadow:"0 4px 20px rgba(0,0,0,.6)", zIndex:999, letterSpacing:.5, transition:"transform .15s" }} onMouseEnter={e => e.currentTarget.style.transform="scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>☕ Support</a>
      </div>
    </>
  );
}

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
