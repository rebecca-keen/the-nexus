import { useState, useRef, useEffect, useCallback } from 'react';
import { CSS, VBadge, Sidebar, PrivacyModal, SubmitSourceForm } from './components.jsx';
import {
  ADMIN_USER, ADMIN_PASS, TOPICS, REGIONS, VERDICTS, MEDIA_LIBRARY,
  SEED_STORIES, SEED_POSTS, REDDIT_SUBS, SOURCES,
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
let _session = null;
const saveSession = u => { _session = u; };
const clearSession = () => { _session = null; };

const TYPE_ICON = { book:"📖", documentary:"🎬", film:"🎥", article:"📰" };
const TYPE_CLR  = { book:"#5a9ac8", documentary:"#a060d0", film:"#4a9a5a", article:"#c0a020" };
const CONF_LABELS = { confirmed:"✓ Confirmed", likely:"↑ Likely", contested:"⚖ Disputed", unverified:"? Unverified" };
const CONF_COLORS = { confirmed:{bg:"#0d2010",c:"#40c070",b:"#1a4a1a"}, likely:{bg:"#0d1a10",c:"#60c080",b:"#1a3a1a"}, contested:{bg:"#1e1808",c:"#c0a020",b:"#3a3010"}, unverified:{bg:"#1a1008",c:"#c07020",b:"#3a2010"} };
const CT_LABELS = { research:"🔬 Research", document:"📄 Document", sighting:"👁 Sighting", tip:"💡 Tip", rebuttal:"⚖ Counter", media:"📷 Media" };

export default function App() {
  // ── User state ─────────────────────────────────────────────────────────────
  const [user, setUser]         = useState({ plan:"free", isAdmin:false });
  const isAdmin = user.isAdmin;
  const isPaid  = true; // All content free - monetized via AdSense

  // ── Navigation ──────────────────────────────────────────────────────────────
  const [view, setView]         = useState("home");
  const [openStory, setOpenStory] = useState(null);

  // ── Content state ───────────────────────────────────────────────────────────
  const [stories, setStories]   = useState(SEED_STORIES);
  const [posts,   setPosts]     = useState(SEED_POSTS);
  const [votes,   setVotes]     = useState({});
  const [verdicts, setVerdicts] = useState({});
  const [saved,   setSaved]     = useState({});
  const [loading, setLoading]   = useState(false);

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
  const [chat, setChat]         = useState([{ role:"assistant", content:"I analyze unresolved events, disputed records, and suppressed history. Ask about any topic — evidence from all sides with primary sources and relevant book/documentary recommendations." }]);
  const [aiIn, setAiIn]         = useState("");
  const [aiLoad, setAiLoad]     = useState(false);
  const chatEnd = useRef(null);

  // ── Modals ──────────────────────────────────────────────────────────────────
  const [showPrivacy, setShowPrivacy] = useState(false);

  // ── Refs ────────────────────────────────────────────────────────────────────
  const imgRef = useRef(null);
  const docRef = useRef(null);

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior:"smooth" }); }, [chat]);

  // ── Toast ────────────────────────────────────────────────────────────────────
  const [toast, setToast] = useState(null);
  const toast2 = msg => { setToast(msg); setTimeout(() => setToast(null), 2200); };

  // ── Fetch more stories ───────────────────────────────────────────────────────
  const fetchMore = useCallback(async (hint = "") => {
    setLoading(true);
    try {
      const used = stories.slice(0, 6).map(s => s.title).join("; ");
      const system = `Generate 5 investigative research stories as a JSON array. No markdown, no backticks, output raw JSON only. Each object: {type:"news"|"blog"|"archive"|"research", source:"outlet name", sourceUrl:"url", topic:"one of: Government & Intelligence, Unresolved Events, Hidden History, Health & Science, Finance & Power, UAP & Anomalous, Ancient Civilizations, Forbidden Science, Lost Technology, Remote Viewing & PSI, Portals & Stargates, Animal Intelligence, Giants & Nephilim, Biblical & Religious Records", region:"flag + country", title:"specific headline", summary:"2-3 sentences with real names and document references", tags:["tag1","tag2","tag3"], credible:50-97, debunked:100-credible, upvotes:500-9000, comments:50-2000}. Use real outlets. Do not repeat: ${used}`;
      const raw = await callAI(system, hint ? `Focus on: ${hint}` : "Generate diverse stories across all topics", [], 1200);
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      const newStories = parsed.map((s, i) => ({ ...s, id:`ai-${Date.now()}-${i}`, time:`${i + 1}h ago` }));
      setStories(prev => [...newStories, ...prev]);
      toast2(`✓ ${newStories.length} new records loaded`);
    } catch { toast2("All records loaded — check back soon for more"); }
    finally { setLoading(false); }
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
  const sendAi = async () => {
    if (!aiIn.trim() || aiLoad) return;
    const msg = aiIn.trim(); setAiIn("");
    setChat(p => [...p, { role:"user", content:msg }]);
    setAiLoad(true);
    try {
      const system = `You are an expert investigative analyst for The Nexus. Never use the word "conspiracy." Use: "disputed record," "unresolved event," "declassified program," "suppressed evidence."

Format every response:
**The Record:** [one sentence]
**Evidence Supporting It:** [3-4 bullets with real sources, names, dates]
**Official Position / Counter-Evidence:** [3-4 bullets]
**Key Primary Sources:** [2-3 named documents or researchers]
**Further Reading:** [suggest 1-2 relevant books or documentaries]

Be precise. Max 360 words. Treat the reader as an intelligent adult.`;
      const reply = await callAI(system, msg, chat, 900);
      setChat(p => [...p, { role:"assistant", content: reply || "Analysis unavailable." }]);
    } catch {
      setChat(p => [...p, { role:"assistant", content:"Connection error. Please check your OpenRouter API key in data.js — get a free key at openrouter.ai" }]);
    } finally { setAiLoad(false); }
  };

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
    // Topic / region / source / verdict / search filters apply to everyone
    if (topic !== "All Topics" && s.topic?.trim() !== topic.trim()) return false;
    if (region !== "All Regions" && s.region?.trim() !== region.trim()) return false;
    if (srcType !== "All Sources") {
      const m = { News:"news", Blogs:"blog", Archives:"archive", Research:"research", Podcasts:"podcast", Community:"user" };
      if (m[srcType] && s.type !== m[srcType]) return false;
    }
    if (verdict !== "All") {
      const ev = verdicts[s.id] || autoVerdict(s.credible);
      if (ev !== verdict.toLowerCase()) return false;
    }
    if (search) {
      const q = search.toLowerCase();
      if (!s.title.toLowerCase().includes(q) && !s.summary.toLowerCase().includes(q) && !s.tags?.some(t => t.toLowerCase().includes(q))) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === "Most Upvoted")  return b.upvotes - a.upvotes;
    if (sortBy === "Most Discussed") return b.comments - a.comments;
    if (sortBy === "Most Credible") return b.credible - a.credible;
    return 0;
  });

  const visibleStories = filteredStories;
  

  // ── Shared sidebar props ──────────────────────────────────────────────────────
  const sidebarProps = { filters, setFilters, isAdmin, onFetch:fetchMore, visibleTopics:TOPICS, visibleRegions:REGIONS };

  // ──────────────────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{CSS}</style>
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
            <div style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", flexShrink:0 }} onClick={() => setView("home")}>
              <div style={{ width:18, height:18, background:"#b02020", clipPath:"polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)" }} />
              <span className="bb" style={{ fontSize:16, letterSpacing:3, color:"#eeeae0" }}>THE NEXUS</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", overflowX:"auto", gap:0 }}>
              {[["feed","Records"],["sources","Sources"],["community","Community"],["reddit","Reddit"],["library","Library"],["ai","Analysis"],...(isAdmin?[["admin","Admin"]]:[])].map(([v,l]) => (
                <button key={v} onClick={() => { setView(v); setOpenStory(null); if(v==="reddit"&&!rPosts.length) fetchReddit(); }}
                  style={{ background:"none", border:"none", borderBottom:view===v?"2px solid #b02020":"2px solid transparent", color:view===v?"#eeeae0":"#3a4a5a", padding:"0 9px", height:48, fontFamily:"monospace", fontSize:9, letterSpacing:.5, textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 }}>
                  {l}
                </button>
              ))}
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
              {isAdmin && <span style={{ fontSize:8, color:"#e0c060", background:"#1e1808", border:"1px solid #4a3a10", padding:"2px 7px", fontFamily:"monospace" }}>ADMIN</span>}
              {isAdmin && <button onClick={() => { clearSession(); setUser({ plan:"free", isAdmin:false }); setView("home"); }} style={{ background:"none", border:"1px solid #1c2330", color:"#2a3a4a", padding:"3px 8px", fontFamily:"monospace", fontSize:9, cursor:"pointer" }}>Exit</button>}
            </div>
          </div>
        </div>

        <div style={{ maxWidth:1100, margin:"0 auto", padding:"16px 12px" }}>

          {/* HOME */}
          {view === "home" && (
            <div className="fade">

              {/* Hero */}
              <div style={{ background:"linear-gradient(180deg,#0f1520,#07080c)", border:"1px solid #1c2330", padding:"clamp(28px,5vw,52px) clamp(20px,4vw,44px)", marginBottom:12, position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,#b02020,#5a2a6a,#1a3a6a)" }} />
                <div style={{ fontSize:8, color:"#b02020", fontFamily:"monospace", letterSpacing:3, textTransform:"uppercase", marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ width:18, height:1, background:"#b02020", display:"inline-block" }} />
                  Independent Research Platform
                </div>
                <div className="bb" style={{ fontSize:"clamp(32px,6vw,68px)", letterSpacing:2, color:"#eeeae0", lineHeight:.95, marginBottom:18 }}>
                  SOME QUESTIONS<br />
                  <span style={{ color:"#b02020" }}>NEVER GET</span><br />
                  ANSWERED
                </div>
                <div className="bk" style={{ fontSize:"clamp(14px,2.5vw,18px)", fontWeight:300, color:"#7a8a9a", lineHeight:1.7, maxWidth:520, marginBottom:24, fontStyle:"italic" }}>
                  The Nexus aggregates investigative journalism, declassified records, whistleblower testimony, and disputed history — for adults who ask questions the mainstream stopped asking.
                </div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  <button onClick={() => setView("feed")} style={{ background:"#b02020", border:"none", color:"#fff", padding:"12px 26px", fontFamily:"monospace", fontSize:10, letterSpacing:1.5, cursor:"pointer", textTransform:"uppercase" }}>Enter the Archive →</button>
                  <button onClick={() => setView("sources")} style={{ background:"transparent", border:"1px solid #3a4a5a", color:"#8a9aaa", padding:"11px 18px", fontFamily:"monospace", fontSize:10, letterSpacing:1, cursor:"pointer" }}>Browse Sources</button>
                </div>
                <div style={{ marginTop:16, fontSize:8, color:"#2a3a4a", fontFamily:"monospace" }}>
                  For independent research & education · Adults 18+ · All sources linked · No editorial position taken
                </div>
              </div>

              {/* AdSense slot — Google will auto-fill this */}
              <div style={{ margin:"12px 0", textAlign:"center", minHeight:90, background:"#0b0d14", border:"1px solid #1c2330", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <ins className="adsbygoogle"
                  style={{ display:"block", width:"100%", minHeight:90 }}
                  data-ad-client="ca-pub-8145721366190659"
                  data-ad-slot="auto"
                  data-ad-format="horizontal"
                  data-full-width-responsive="true" />
              </div>

              {/* Stats */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:12 }}>
                {[
                  { n:"86+",  l:"Records",      s:"& growing daily" },
                  { n:"616+", l:"Sources",       s:"Books · Blogs · YouTube" },
                  { n:"200+", l:"Communities",   s:"Reddit & forums" },
                  { n:"Free", l:"No Paywall",    s:"No sign-up needed" },
                ].map(s => (
                  <div key={s.l} style={{ background:"#0b0d14", border:"1px solid #1c2330", padding:"14px 10px", textAlign:"center" }}>
                    <div className="bb" style={{ fontSize:"clamp(18px,3vw,26px)", letterSpacing:1, color:"#b02020", lineHeight:1 }}>{s.n}</div>
                    <div style={{ fontSize:9, color:"#ccc8be", fontFamily:"monospace", marginTop:4 }}>{s.l}</div>
                    <div style={{ fontSize:8, color:"#2a3a4a", fontFamily:"monospace" }}>{s.s}</div>
                  </div>
                ))}
              </div>

              {/* What we cover */}
              <div style={{ background:"#0b0d14", border:"1px solid #1c2330", padding:"16px", marginBottom:12 }}>
                <div style={{ fontSize:8, color:"#3a4a5a", letterSpacing:1.5, textTransform:"uppercase", fontFamily:"monospace", marginBottom:10 }}>What We Cover</div>
                <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                  {TOPICS.filter(t => t !== "All Topics").map(t => (
                    <button key={t} onClick={() => { setFilters(f => ({ ...f, topic:t })); setView("feed"); }}
                      style={{ background:"#07080c", border:"1px solid #1c2330", color:"#4a5a6a", padding:"5px 10px", fontFamily:"monospace", fontSize:8, cursor:"pointer", transition:"all .12s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor="#b02020"; e.currentTarget.style.color="#ccc8be"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor="#1c2330"; e.currentTarget.style.color="#4a5a6a"; }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Latest records preview */}
              <div style={{ marginBottom:12 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                  <div style={{ fontSize:8, color:"#3a4a5a", letterSpacing:1.5, textTransform:"uppercase", fontFamily:"monospace" }}>Latest Records</div>
                  <button onClick={() => setView("feed")} style={{ background:"none", border:"none", color:"#b02020", fontFamily:"monospace", fontSize:8, cursor:"pointer", letterSpacing:1 }}>View All →</button>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:6 }}>
                  {stories.slice(0,4).map(s => (
                    <div key={s.id} onClick={() => { setOpenStory(s); setView("feed"); }} className="card"
                      style={{ padding:"12px 14px", cursor:"pointer" }}>
                      <div style={{ display:"flex", gap:6, marginBottom:5, flexWrap:"wrap" }}>
                        <span style={{ background:getType(s.type).bg, color:getType(s.type).text, padding:"1px 5px", fontSize:7, fontFamily:"monospace" }}>{getType(s.type).label}</span>
                        <span style={{ fontSize:8, color:"#2a3a4a", fontFamily:"monospace" }}>{s.topic}</span>
                      </div>
                      <div style={{ fontSize:12, color:"#ccc8be", lineHeight:1.4, fontFamily:"monospace" }}>{s.title.slice(0,90)}{s.title.length>90?"...":""}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* About */}
              <div style={{ background:"#0b0d14", border:"1px solid #1c2330", padding:"18px 20px", marginBottom:12 }}>
                <div style={{ fontSize:8, color:"#3a4a5a", letterSpacing:1.5, textTransform:"uppercase", fontFamily:"monospace", marginBottom:10 }}>About The Nexus</div>
                <div style={{ fontSize:12, color:"#5a6a7a", fontFamily:"monospace", lineHeight:1.8 }}>
                  The Nexus is an independent research platform aggregating declassified government documents, investigative journalism, whistleblower testimony, alternative history, ancient civilizations, UAP disclosure, paranormal research, and suppressed science. Every record links directly to its original source. No sign-up. No paywall. No editorial position.
                </div>
                <div style={{ marginTop:12, display:"flex", gap:8, flexWrap:"wrap" }}>
                  <button onClick={() => setView("community")} style={{ background:"transparent", border:"1px solid #1c2330", color:"#5a6a7a", padding:"6px 12px", fontFamily:"monospace", fontSize:8, cursor:"pointer" }}>Join Community</button>
                  <button onClick={() => setView("library")} style={{ background:"transparent", border:"1px solid #1c2330", color:"#5a6a7a", padding:"6px 12px", fontFamily:"monospace", fontSize:8, cursor:"pointer" }}>Media Library</button>
                  <button onClick={() => setView("reddit")} style={{ background:"transparent", border:"1px solid #1c2330", color:"#5a6a7a", padding:"6px 12px", fontFamily:"monospace", fontSize:8, cursor:"pointer" }}>Reddit Feeds</button>
                </div>
              </div>

              <div style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace", textAlign:"center", lineHeight:1.8 }}>
                All content presented for independent research & educational purposes only. The Nexus does not endorse any position. All records link to original external sources. Not affiliated with any government, intelligence agency, political organization, or media company.
              </div>
            </div>
          )}

          {/* ── RECORDS (FEED) ── */}
          {view === "feed" && (
            <div style={{ display:"flex", gap:0 }}>
              <Sidebar {...sidebarProps} />
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                  <div>
                    <div className="bb" style={{ fontSize:20, letterSpacing:2, color:"#eeeae0" }}>OPEN RECORDS</div>
                    <div style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace" }}>
                      {visibleStories.length} of {stories.length} records
                      {filters.topic !== "All Topics" && <span style={{ color:"#b02020", marginLeft:6 }}>· {filters.topic}</span>}
                    </div>
                  </div>

                </div>

                {/* Story detail */}
                {openStory && (
                  <div className="fade">
                    <button onClick={() => setOpenStory(null)} style={{ background:"#0b0d14", border:"1px solid #2a3a4a", color:"#8a9aaa", fontFamily:"monospace", fontSize:10, cursor:"pointer", marginBottom:14, padding:"6px 14px", display:"flex", alignItems:"center", gap:6 }}>← Back to Records</button>
                    <div className="card" style={{ padding:22 }}>
                      {/* Header */}
                      <div style={{ display:"flex", gap:6, flexWrap:"wrap", alignItems:"center", marginBottom:10 }}>
                        <span style={{ background:getType(openStory.type).bg, color:getType(openStory.type).text, padding:"1px 6px", fontFamily:"monospace", fontSize:8, letterSpacing:.5 }}>{getType(openStory.type).label}</span>
                        {openStory.sourceUrl
                          ? <a href={openStory.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize:10, color:"#5a9ac8", fontFamily:"monospace" }}>{openStory.source} ↗</a>
                          : <span style={{ fontSize:10, color:"#5a7a9a", fontFamily:"monospace" }}>{openStory.source}</span>
                        }
                        <span style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace" }}>{openStory.time} · {openStory.region}</span>
                        <VBadge verdict={verdicts[openStory.id] || autoVerdict(openStory.credible)} />
                      </div>
                      <div className="bk" style={{ fontSize:22, color:"#eeeae0", lineHeight:1.25, marginBottom:12 }}>{openStory.title}</div>
                      <div className="bk" style={{ fontSize:15, fontWeight:300, color:"#7a8a9a", lineHeight:1.8, marginBottom:18, fontStyle:"italic" }}>{openStory.summary}</div>
                      <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:18 }}>
                        {openStory.tags?.map(t => <span key={t} style={{ fontSize:8, background:"#10131e", border:"1px solid #1c2330", color:"#3a4a5a", padding:"1px 7px", fontFamily:"monospace" }}>#{t}</span>)}
                      </div>

                      {/* Credibility */}
                      <div style={{ background:"#07080c", border:"1px solid #1c2330", padding:14, marginBottom:12 }}>
                        <div style={{ fontSize:8, color:"#1c2a38", letterSpacing:1, marginBottom:8, textTransform:"uppercase", fontFamily:"monospace" }}>Community Credibility</div>
                        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                          <span style={{ fontSize:10, color:"#40c070", fontFamily:"monospace" }}>Accurate {openStory.credible}%</span>
                          <span style={{ fontSize:10, color:"#c04040", fontFamily:"monospace" }}>{openStory.debunked}% Refuted</span>
                        </div>
                        <div className="cbar"><div className="cfill" style={{ width:`${openStory.credible}%` }} /></div>
                        <div style={{ display:"flex", gap:7, marginTop:10 }}>
                          <button onClick={() => { if (!votes[openStory.id]) { setVotes(p => ({ ...p, [openStory.id]:"up" })); toast2("Marked accurate"); } }}
                            style={{ flex:1, background:votes[openStory.id]==="up"?"#0a2010":"transparent", border:`1px solid ${votes[openStory.id]==="up"?"#2a6a2a":"#1c2330"}`, color:votes[openStory.id]==="up"?"#40c070":"#3a4a5a", padding:"6px", fontFamily:"monospace", fontSize:9, cursor:"pointer" }}>▲ Accurate</button>
                          <button onClick={() => { if (!votes[openStory.id]) { setVotes(p => ({ ...p, [openStory.id]:"dn" })); toast2("Marked refuted"); } }}
                            style={{ flex:1, background:votes[openStory.id]==="dn"?"#200a0a":"transparent", border:`1px solid ${votes[openStory.id]==="dn"?"#6a2a2a":"#1c2330"}`, color:votes[openStory.id]==="dn"?"#c04040":"#3a4a5a", padding:"6px", fontFamily:"monospace", fontSize:9, cursor:"pointer" }}>▼ Refuted</button>
                        </div>
                        <div style={{ marginTop:10, borderTop:"1px solid #1c2330", paddingTop:8 }}>
                          <div style={{ fontSize:8, color:"#1c2a38", letterSpacing:1, marginBottom:6, textTransform:"uppercase", fontFamily:"monospace" }}>Your Verdict</div>
                          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:4 }}>
                            {Object.entries(VERDICTS).map(([k, v]) => (
                              <button key={k} onClick={() => { setVerdicts(p => ({ ...p, [openStory.id]:k })); toast2(`Verdict: ${v.label}`); }}
                                style={{ background:verdicts[openStory.id]===k?v.color:"transparent", border:`1px solid ${verdicts[openStory.id]===k?v.border:"#1c2330"}`, color:verdicts[openStory.id]===k?v.text:"#2a3a4a", padding:"4px 3px", fontFamily:"monospace", fontSize:8, cursor:"pointer", transition:"all .12s" }}>
                                {v.icon} {v.short}
                              </button>
                            ))}
                          </div>
                        </div>
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
                      const t = getType(s.type); const v = votes[s.id];
                      return (
                        <div key={s.id} className="card fade" style={{ display:"flex", padding:"11px 13px 11px 9px", marginBottom:3, cursor:"pointer" }} onClick={() => setOpenStory(s)}>
                          <div style={{ width:38, flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center", gap:3, paddingTop:2 }} onClick={e => e.stopPropagation()}>
                            <button style={{ background:v==="up"?"#0a2010":"none", border:`1px solid ${v==="up"?"#2a6a2a":"#1c2330"}`, color:v==="up"?"#40c070":"#2a3a4a", width:26, height:22, cursor:"pointer", fontSize:10, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={() => { if (!v) setVotes(p => ({ ...p, [s.id]:"up" })); }}>▲</button>
                            <span style={{ fontSize:11, color:"#4a5a6a", fontFamily:"monospace" }}>{fmtNum(s.upvotes)}</span>
                            <button style={{ background:v==="dn"?"#200a0a":"none", border:`1px solid ${v==="dn"?"#6a2a2a":"#1c2330"}`, color:v==="dn"?"#c04040":"#2a3a4a", width:26, height:22, cursor:"pointer", fontSize:10, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={() => { if (!v) setVotes(p => ({ ...p, [s.id]:"dn" })); }}>▼</button>
                          </div>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ display:"flex", gap:6, flexWrap:"wrap", alignItems:"center", marginBottom:4 }}>
                              <span style={{ background:t.bg, color:t.text, padding:"1px 5px", fontSize:7, fontFamily:"monospace", letterSpacing:.4 }}>{t.label}</span>
                              <span style={{ fontSize:9, color:"#3a5a7a", fontFamily:"monospace" }}>{s.source}</span>
                              <span style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace" }}>{s.time} · {s.region}</span>
                              <VBadge verdict={verdicts[s.id] || autoVerdict(s.credible)} />
                            </div>
                            <div className="bk" style={{ fontSize:14, color:"#d8d0c4", lineHeight:1.3, marginBottom:4 }}>{s.title}</div>
                            <div style={{ fontSize:9, color:"#2a3a4a", lineHeight:1.55, marginBottom:5, fontFamily:"monospace" }}>{s.summary?.slice(0, 130)}…</div>
                            <div style={{ height:2, background:"#1c2330", marginBottom:4, maxWidth:180 }}>
                              <div style={{ height:"100%", width:`${s.credible}%`, background:"linear-gradient(90deg,#2a6a2a,#40c070)" }} />
                            </div>
                            <div style={{ display:"flex", gap:8 }}>
                              {s.tags?.map(tg => <span key={tg} style={{ fontSize:7, color:"#1c2a38", fontFamily:"monospace" }}>#{tg}</span>)}
                              <span style={{ fontSize:9, color:"#1c2a38", marginLeft:"auto", fontFamily:"monospace" }}>💬 {fmtNum(s.comments)}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}



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

          {/* ── COMMUNITY ── */}
          {view === "community" && (
            <div style={{ display:"flex", gap:0 }}>
              <Sidebar {...sidebarProps} />
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14, flexWrap:"wrap", gap:8 }}>
                  <div>
                    <div className="bb" style={{ fontSize:20, letterSpacing:2, color:"#eeeae0" }}>COMMUNITY BOARD</div>
                    <div style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace" }}>Field reports · Evidence · Analysis · Source links required</div>
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
                          <span style={{ fontSize:9, color:"#1c2a38", fontFamily:"monospace" }}>💬 {post.comments}</span>
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
            <div style={{ display:"flex", gap:0 }}>
              <Sidebar {...sidebarProps} />
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
                            <a href={post.permalink} target="_blank" rel="noopener noreferrer" style={{ fontSize:9, color:"#2a3a4a", fontFamily:"monospace" }}>💬 {post.numComments}</a>
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
            <div style={{ display:"flex", gap:0 }}>
              <Sidebar {...sidebarProps} />
              <div style={{ flex:1 }}>
                <div style={{ marginBottom:14 }}>
                  <div className="bb" style={{ fontSize:20, letterSpacing:2, color:"#eeeae0" }}>MEDIA & REFERENCE LIBRARY</div>
                  <div style={{ fontSize:8, color:"#1c2a38", marginTop:3, fontFamily:"monospace" }}>{MEDIA_LIBRARY.length} references · Books · Documentaries · Films · Articles · All link to original sources</div>
                </div>

                <div style={{ display:"flex", gap:6, marginBottom:14, flexWrap:"wrap", alignItems:"center" }}>
                  {["All","Books","Documentaries","Films","Articles"].map(t => (
                    <button key={t} onClick={() => setLibType(t)}
                      style={{ background:libType===t?"#1c2330":"transparent", border:`1px solid ${libType===t?"#3a4a5a":"#1c2330"}`, color:libType===t?"#ccc8be":"#2a3a4a", padding:"4px 12px", fontFamily:"monospace", fontSize:8, cursor:"pointer", textTransform:"uppercase", transition:"all .12s" }}>
                      {{ All:"All Types", Books:"📖 Books", Documentaries:"🎬 Docs", Films:"🎥 Films", Articles:"📰 Articles" }[t]}
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
                  const tm = { Books:"book", Documentaries:"documentary", Films:"film", Articles:"article" };
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
            <div style={{ display:"flex", gap:0 }}>
              <Sidebar {...sidebarProps} />
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
            <div style={{ display:"flex", gap:0 }}>
              <Sidebar {...sidebarProps} />
              <div style={{ flex:1 }}>
                <div style={{ marginBottom:16 }}>
                  <div className="bb" style={{ fontSize:20, letterSpacing:2, color:"#eeeae0" }}>SOURCE DIRECTORY</div>
                  <div style={{ fontSize:8, color:"#1c2a38", marginTop:3, fontFamily:"monospace" }}>
                    {SOURCES.reduce((acc, g) => acc + g.items.length, 0)} sources across {SOURCES.length} categories · All links open in new tab
                  </div>
                </div>
                {SOURCES.map(group => {
                  const t = getType(group.type);
                  return (
                    <div key={group.label} style={{ marginBottom:22 }}>
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
              </div>
            </div>
          )}

          {/* ── ADMIN ── */}
          {view === "admin" && isAdmin && (
            <div style={{ display:"flex", gap:0 }}>
              <Sidebar {...sidebarProps} />
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

        {/* ── FOOTER ── */}
        <div style={{ borderTop:"1px solid #1c2330", marginTop:32, padding:"12px 20px", background:"#07080c" }}>
          <div style={{ maxWidth:1280, margin:"0 auto", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:6, alignItems:"center" }}>
            <div style={{ display:"flex", gap:12, alignItems:"center" }}>
              <span style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace" }}>© 2025 The Nexus · thenexusapp.com</span>
              <span style={{ color:"#1c2330", fontSize:8 }}>·</span>
              <button onClick={() => setShowPrivacy(true)} style={{ background:"none", border:"none", color:"#3a4a5a", fontFamily:"monospace", fontSize:8, cursor:"pointer", textDecoration:"underline", padding:0 }}>Privacy Policy</button>
              <span style={{ color:"#1c2330", fontSize:8 }}>·</span>
              <span style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace" }}>For independent research only · Adults 18+</span>
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
      </div>
    </>
  );
}
