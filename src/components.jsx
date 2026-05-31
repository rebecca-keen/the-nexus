import { useState } from 'react';
import { TOPICS, REGIONS, PRIVACY_POLICY } from './data.js';

export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;500&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #07080c; color: #ccc8be; font-family: 'IBM Plex Mono', monospace; }
a { text-decoration: none; color: inherit; }
.bb { font-family: 'Bebas Neue', impact, sans-serif !important; }
.bk { font-family: 'Cormorant Garamond', Georgia, serif !important; }
.nb { background: none; border: none; cursor: pointer; font-family: 'IBM Plex Mono', monospace; font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; padding: 8px 14px; color: #2a3a4a; transition: color .15s; }
.nb:hover, .nb.on { color: #ccc8be; }
.nb.on { border-bottom: 1px solid #b02020 !important; }
.inp { width: 100%; background: #07080c; border: 1px solid #1c2330; color: #ccc8be; padding: 8px 10px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; outline: none; }
.inp:focus { border-color: #2a3a4a; }
.sc::-webkit-scrollbar { width: 3px; } .sc::-webkit-scrollbar-track { background: #07080c; } .sc::-webkit-scrollbar-thumb { background: #1c2330; }
.fade { animation: fadeIn .25s ease; }
.card { background: #0b0d14; border: 1px solid #1c2330; transition: border-color .15s; }
.card:hover { border-color: #2a3a4a; }
@keyframes fadeIn { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:translateY(0); } }

/* Mobile responsive */
@media (max-width: 768px) {
  .sidebar-hide { display: none !important; }
  .grid-2 { grid-template-columns: 1fr !important; }
  .grid-4 { grid-template-columns: 1fr 1fr !important; }
  .feed-layout { flex-direction: column !important; }
  .desktop-nav { display: none !important; }
  .mobile-hamburger { display: flex !important; }
}
@media (min-width: 769px) {
  .mobile-hamburger { display: none !important; }
}
/* Focus mode */
body.focus-mode .sidebar { display: none !important; }

/* ── GLOBAL RESPONSIVE RESET ───────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; }
html { font-size: 16px; }
body { -webkit-font-smoothing: antialiased; }

/* ── LAYOUT ─────────────────────────────────────────────────────────── */
.nexus-shell { max-width: 1200px; margin: 0 auto; padding: 0 16px; }
.nexus-nav   { position: sticky; top: 0; z-index: 200; backdrop-filter: blur(12px); background: rgba(7,8,12,.92); border-bottom: 1px solid #1c2330; }

/* ── FEED LAYOUT ────────────────────────────────────────────────────── */
.feed-wrap   { display: flex; gap: 0; align-items: flex-start; }
.feed-main   { flex: 1; min-width: 0; padding: 20px 0 40px 20px; }
.feed-main-full { flex: 1; min-width: 0; padding: 20px 0 40px 0; }

/* ── RECORD CARD ────────────────────────────────────────────────────── */
.rec-card {
  display: flex;
  gap: 0;
  background: #0b0d14;
  border: 1px solid #1a2030;
  border-radius: 4px;
  margin-bottom: 6px;
  cursor: pointer;
  transition: border-color .15s, background .15s;
}
.rec-card:hover { border-color: #2a3a5a; background: #0d101a; }

.rec-votes {
  width: 48px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 3px;
  padding: 14px 0 14px;
  border-right: 1px solid #1a2030;
}
.rec-vote-btn {
  width: 28px; height: 24px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 3px;
  font-size: 11px;
  cursor: pointer;
  transition: all .12s;
}
.rec-vote-count { font-family: monospace; font-size: 12px; color: #4a5a6a; }

.rec-body { flex: 1; min-width: 0; padding: 12px 14px; }
.rec-meta { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; margin-bottom: 6px; }
.rec-type { padding: 2px 7px; font-family: monospace; font-size: 8px; letter-spacing: .5px; border-radius: 2px; }
.rec-source { font-size: 10px; color: #4a7aaa; font-family: monospace; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px; }
.rec-date { font-size: 9px; color: #2a3a4a; font-family: monospace; }
.rec-title { font-size: 15px; color: #ddd8cc; line-height: 1.35; margin-bottom: 6px; font-weight: 500; }
.rec-summary { font-size: 11px; color: #2e3e50; line-height: 1.6; margin-bottom: 6px; font-family: monospace; }
.rec-credbar { height: 2px; background: #1c2330; margin-bottom: 6px; border-radius: 2px; max-width: 160px; }
.rec-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.rec-tag { font-size: 8px; color: #1c2a3a; font-family: monospace; cursor: pointer; }
.rec-tag:hover { color: #4a7aaa; }

/* ── RECORD DETAIL ──────────────────────────────────────────────────── */
.rec-detail { background: #0b0d14; border: 1px solid #1a2030; border-radius: 6px; padding: 28px; }
.rec-detail-title { font-size: 26px; color: #eeeae0; line-height: 1.25; margin: 10px 0 16px; font-weight: 600; }
.rec-detail-summary { font-size: 16px; color: #6a7a8a; line-height: 1.9; margin-bottom: 20px; font-style: italic; }
.rec-detail-meta { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 14px; }

/* ── BACK BAR ───────────────────────────────────────────────────────── */
.back-bar { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #1c2330; }
.back-btn { font-family: monospace; font-size: 11px; cursor: pointer; padding: 7px 16px; border-radius: 3px; transition: all .12s; white-space: nowrap; }
.back-btn-primary { background: #0f1218; border: 1px solid #2a3a4a; color: #8a9aaa; }
.back-btn-primary:hover { border-color: #4a6a8a; color: #ccc8be; }
.back-btn-ghost { background: transparent; border: 1px solid #1c2330; color: #3a4a5a; }
.back-btn-ghost:hover { border-color: #2a3a4a; color: #6a7a8a; }

/* ── CREDIBILITY PANEL ──────────────────────────────────────────────── */
.cred-panel { border: 1px solid #1c2330; border-radius: 4px; padding: 16px; margin-bottom: 18px; }
.cred-bar-wrap { height: 6px; background: #1c2330; border-radius: 3px; overflow: hidden; margin: 8px 0 12px; }
.cred-bar-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, #2a6a2a, #40c070); }
.cred-btn { flex: 1; padding: 10px; font-family: monospace; font-size: 11px; cursor: pointer; border-radius: 3px; transition: all .15s; }

/* ── SIDEBAR ─────────────────────────────────────────────────────────── */
.nexus-sidebar { width: 220px; flex-shrink: 0; padding: 20px 0; position: sticky; top: 56px; max-height: calc(100vh - 56px); overflow-y: auto; }

/* ── SECTION HEADER ─────────────────────────────────────────────────── */
.sec-head { font-size: 20px; letter-spacing: 3px; color: #eeeae0; font-weight: 700; margin-bottom: 4px; }
.sec-sub  { font-size: 9px; color: #1c2a38; font-family: monospace; }

/* ── MOBILE ──────────────────────────────────────────────────────────── */
/* ── TABLET (768px) ── */
@media (max-width: 1024px) {
  .home-grid { grid-template-columns: 1fr 280px !important; }
}

/* ── MOBILE (768px and below) ── */
@media (max-width: 768px) {
  /* Layout */
  .nexus-shell      { padding: 0 14px; }
  .nexus-sidebar    { display: none; }
  .feed-main        { padding: 12px 0 40px 0; }
  .feed-main-full   { padding: 12px 0 40px 0; }
  .feed-wrap        { gap: 0; }

  /* Home page */
  .home-grid        { grid-template-columns: 1fr !important; }

  /* Record cards */
  .rec-card         { margin-bottom: 8px; }
  .rec-body         { padding: 10px 12px; }
  .rec-title        { font-size: 14px; line-height: 1.35; }
  .rec-summary      { font-size: 11px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .rec-source       { max-width: 160px; font-size: 9px; }
  .rec-date         { font-size: 8px; }
  .rec-meta         { gap: 5px; }

  /* Record detail */
  .rec-detail       { padding: 16px 14px; border-radius: 0; border-left: none; border-right: none; }
  .rec-detail-title { font-size: 20px; line-height: 1.25; }
  .rec-detail-summary { font-size: 15px; line-height: 1.8; }

  /* Navigation */
  .desktop-nav      { display: none !important; }
  .mobile-hamburger { display: flex !important; }

  /* Back bar */
  .back-bar         { gap: 6px; padding: 8px 0; }
  .back-btn         { padding: 7px 10px; font-size: 10px; }

  /* Section headers */
  .sec-head         { font-size: 16px; letter-spacing: 2px; }

  /* Credibility */
  .cred-panel       { padding: 12px; }
  .cred-btn         { font-size: 10px; padding: 8px 6px; }

  /* Floating coffee button — move up so it clears mobile browser chrome */
  .float-coffee     { bottom: 72px !important; right: 14px !important; padding: 9px 14px !important; font-size: 10px !important; }
}

/* ── SMALL PHONES (480px) ── */
@media (max-width: 480px) {
  .nexus-shell      { padding: 0 10px; }
  .rec-detail-title { font-size: 17px; }
  .rec-detail-summary { font-size: 14px; }
  .back-btn         { padding: 6px 8px; font-size: 9px; }
  .rec-body         { padding: 10px; }
  .hero-title       { font-size: 32px !important; }
  .hero-sub         { font-size: 32px !important; }
  .hero-desc        { font-size: 13px !important; }
  .hero-stats       { gap: 16px !important; }
}

/* ── HERO ── */
.hero-title { font-size: clamp(28px, 6vw, 52px); }
.hero-sub   { font-size: clamp(28px, 6vw, 52px); }
.hero-desc  { font-size: 15px; }
.hero-stats { display: flex; gap: 24px; flex-wrap: wrap; }
.hero-stat-n { font-size: 26px; }

/* ── DESKTOP only ── */
@media (min-width: 769px) {
  .mobile-hamburger { display: none !important; }
}
`;

export function VBadge({ verdict }) {
  const cfg = {
    confirmed:  { bg:"#0a1a0a", c:"#40c070", b:"#1a4a1a", label:"CONFIRMED" },
    likely:     { bg:"#0a1408", c:"#80c040", b:"#1a3a10", label:"LIKELY" },
    contested:  { bg:"#1a1404", c:"#c0a020", b:"#3a3010", label:"DISPUTED" },
    unverified: { bg:"#100c04", c:"#c07020", b:"#3a2010", label:"UNVERIFIED" },
    refuted:    { bg:"#1a0808", c:"#c03030", b:"#4a1010", label:"REFUTED" },
  }[verdict] || { bg:"#100c04", c:"#c07020", b:"#3a2010", label:"UNVERIFIED" };
  return (
    <span style={{ background:cfg.bg, color:cfg.c, border:`1px solid ${cfg.b}`, padding:"2px 7px", fontSize:7, fontFamily:"monospace", letterSpacing:1.5, textTransform:"uppercase" }}>
      {cfg.label}
    </span>
  );
}

export function Sidebar({ filters, setFilters, isAdmin, onFetch, visibleTopics, visibleRegions }) {
  const { topic, region, srcType, verdict, sortBy, search } = filters;
  const set = (k, v) => setFilters(p => ({ ...p, [k]: v }));
  const sel = { background:"#0b0d14", border:"1px solid #1c2330", color:"#5a6a7a", padding:"5px 8px", fontFamily:"monospace", fontSize:9, outline:"none", width:"100%", marginBottom:6 };
  const topics  = visibleTopics  || TOPICS;
  const regions = visibleRegions || REGIONS;
  return (
    <div style={{ width:160, flexShrink:0, paddingRight:12, borderRight:"1px solid #0e1018" }}>
      <div style={{ fontSize:7, color:"#1c2a38", letterSpacing:1.5, textTransform:"uppercase", marginBottom:8, fontFamily:"monospace" }}>Filter & Sort</div>
      <input value={search} onChange={e => set("search", e.target.value)} placeholder="Search records..." className="inp" style={{ marginBottom:6, fontSize:9 }} />
      <select value={topic} onChange={e => set("topic", e.target.value)} style={sel}>
        {topics.map(t => <option key={t}>{t}</option>)}
      </select>
      <select value={region} onChange={e => set("region", e.target.value)} style={sel}>
        {regions.map(r => <option key={r}>{r}</option>)}
      </select>
      <div style={{ fontSize:7, color:"#2a3a4a", fontFamily:"monospace", marginBottom:2, marginTop:2 }}>Record Format</div>
      <select value={srcType} onChange={e => set("srcType", e.target.value)} style={sel}>
        {["All Types","News","Research","Archive"].map(s => <option key={s}>{s}</option>)}
      </select>
      <div style={{ fontSize:7, color:"#2a3a4a", fontFamily:"monospace", marginBottom:2, marginTop:2 }}>Verdict</div>
      <select value={verdict} onChange={e => set("verdict", e.target.value)} style={sel}>
        {["All","Confirmed","Likely","Contested","Unverified","Refuted"].map(v => <option key={v}>{v}</option>)}
      </select>
      <select value={sortBy} onChange={e => set("sortBy", e.target.value)} style={sel}>
        {["Latest","Most Upvoted","Most Discussed","Most Credible"].map(s => <option key={s}>{s}</option>)}
      </select>
      {isAdmin && (
        <button onClick={() => onFetch(topic !== "All Topics" ? topic : "")}
          style={{ width:"100%", background:"#0b0d14", border:"1px solid #1c2330", color:"#3a4a5a", padding:"7px 0", fontFamily:"monospace", fontSize:8, letterSpacing:1, cursor:"pointer", textTransform:"uppercase", marginTop:4 }}>
          + Load Records
        </button>
      )}
    </div>
  );
}

export function PrivacyModal({ onClose }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.88)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:999, padding:16 }}>
      <div style={{ background:"#07080c", border:"1px solid #1c2330", maxWidth:640, width:"100%", maxHeight:"80vh", overflow:"hidden", display:"flex", flexDirection:"column" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 20px", borderBottom:"1px solid #1c2330" }}>
          <div className="bb" style={{ fontSize:18, letterSpacing:2, color:"#eeeae0" }}>PRIVACY POLICY & TERMS</div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:"#3a4a5a", cursor:"pointer", fontSize:18 }}>x</button>
        </div>
        <div className="sc" style={{ overflowY:"auto", padding:20 }}>
          <pre style={{ fontSize:9, color:"#3a4a5a", fontFamily:"monospace", lineHeight:1.8, whiteSpace:"pre-wrap" }}>{PRIVACY_POLICY}</pre>
        </div>
      </div>
    </div>
  );
}

export function SubmitSourceForm({ onClose, toast2 }) {
  const [name, setName]           = useState("");
  const [url, setUrl]             = useState("");
  const [cat, setCat]             = useState("Blogs & Independent Research");
  const [desc, setDesc]           = useState("");
  const [why, setWhy]             = useState("");
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    "News & Investigative Journalism","Key Researchers & Authors",
    "Blogs & Independent Research","YouTube Research Channels",
    "Archives & Primary Documents","Science & Forbidden Research",
    "Podcasts & Audio","Other",
  ];

  const submit = () => {
    if (!name.trim()) { toast2("Source name required"); return; }
    if (!url.trim() || !url.startsWith("http")) { toast2("Valid URL required"); return; }
    if (!desc.trim()) { toast2("Brief description required"); return; }
    console.log("SOURCE SUBMISSION:", { name, url, cat, desc, why, ts: new Date().toISOString() });
    setSubmitted(true);
    toast2("Source submitted for review - thank you!");
  };

  if (submitted) return (
    <div style={{ textAlign:"center", padding:"20px 0" }}>
      <div style={{ fontSize:20, marginBottom:10 }}>+</div>
      <div style={{ fontSize:11, color:"#40c070", fontFamily:"monospace", marginBottom:8 }}>Submitted for admin review</div>
      <button onClick={onClose} style={{ marginTop:14, background:"transparent", border:"1px solid #1c2330", color:"#3a4a5a", padding:"7px 18px", fontFamily:"monospace", fontSize:9, cursor:"pointer" }}>Close</button>
    </div>
  );

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:8 }}>
        <div>
          <div style={{ fontSize:7, color:"#5a9ac8", letterSpacing:1, textTransform:"uppercase", marginBottom:3, fontFamily:"monospace" }}>Source Name *</div>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Wes Penre Papers" className="inp" />
        </div>
        <div>
          <div style={{ fontSize:7, color:"#5a9ac8", letterSpacing:1, textTransform:"uppercase", marginBottom:3, fontFamily:"monospace" }}>URL *</div>
          <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." className="inp" />
        </div>
      </div>
      <div style={{ marginBottom:8 }}>
        <div style={{ fontSize:7, color:"#5a9ac8", letterSpacing:1, textTransform:"uppercase", marginBottom:3, fontFamily:"monospace" }}>Category</div>
        <select value={cat} onChange={e => setCat(e.target.value)} style={{ width:"100%", background:"#07080c", border:"1px solid #1c2330", color:"#5a6a7a", padding:"7px 9px", fontFamily:"monospace", fontSize:10, outline:"none" }}>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div style={{ marginBottom:8 }}>
        <div style={{ fontSize:7, color:"#5a9ac8", letterSpacing:1, textTransform:"uppercase", marginBottom:3, fontFamily:"monospace" }}>Brief Description *</div>
        <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2} placeholder="What does this source cover?" style={{ width:"100%", background:"#07080c", border:"1px solid #1c2330", color:"#ccc8be", padding:"8px 10px", fontFamily:"monospace", fontSize:11, outline:"none", resize:"vertical" }} />
      </div>
      <div style={{ marginBottom:12 }}>
        <div style={{ fontSize:7, color:"#5a9ac8", letterSpacing:1, textTransform:"uppercase", marginBottom:3, fontFamily:"monospace" }}>Why Should It Be Added? (optional)</div>
        <textarea value={why} onChange={e => setWhy(e.target.value)} rows={2} placeholder="Why is this valuable for researchers?" style={{ width:"100%", background:"#07080c", border:"1px solid #1c2330", color:"#ccc8be", padding:"8px 10px", fontFamily:"monospace", fontSize:11, outline:"none", resize:"vertical" }} />
      </div>
      <div style={{ display:"flex", gap:7 }}>
        <button onClick={submit} style={{ background:"#1a2a3a", border:"1px solid #5a9ac8", color:"#5a9ac8", padding:"9px 20px", fontFamily:"monospace", fontSize:9, letterSpacing:1.5, cursor:"pointer", textTransform:"uppercase" }}>Submit Source</button>
        <button onClick={onClose} style={{ background:"transparent", border:"1px solid #1c2330", color:"#3a4a5a", padding:"9px 14px", fontFamily:"monospace", fontSize:9, cursor:"pointer" }}>Cancel</button>
      </div>
    </div>
  );
}
