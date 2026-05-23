import { useState } from 'react';
import { VERDICTS, TOPICS, REGIONS, STRIPE_MONTHLY, STRIPE_ANNUAL, PRIVACY_POLICY, FREE_LIMIT, getType } from './data.js';

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
@keyframes fadeIn { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:translateY(0); } }
`;

export function VBadge({ verdict }) {
  const cfg = {
    confirmed: { bg:"#0a1a0a", c:"#40c070", b:"#1a4a1a", label:"CONFIRMED" },
    likely:    { bg:"#0a1408", c:"#80c040", b:"#1a3a10", label:"LIKELY" },
    contested: { bg:"#1a1404", c:"#c0a020", b:"#3a3010", label:"DISPUTED" },
    unverified:{ bg:"#100c04", c:"#c07020", b:"#3a2010", label:"UNVERIFIED" },
    refuted:   { bg:"#1a0808", c:"#c03030", b:"#4a1010", label:"REFUTED" },
  }[verdict] || { bg:"#100c04", c:"#c07020", b:"#3a2010", label:"UNVERIFIED" };
  return (
    <span style={{ background:cfg.bg, color:cfg.c, border:`1px solid ${cfg.b}`, padding:"2px 7px", fontSize:7, fontFamily:"monospace", letterSpacing:1.5, textTransform:"uppercase" }}>
      {cfg.label}
    </span>
  );
}

export function Sidebar({ filters, setFilters, isPaid, isAdmin, onFetch, onUpgrade }) {
  const { topic, region, srcType, verdict, sortBy, search } = filters;
  const set = (k, v) => setFilters(p => ({ ...p, [k]: v }));
  const sel = { background:"#0b0d14", border:"1px solid #1c2330", color:"#5a6a7a", padding:"5px 8px", fontFamily:"monospace", fontSize:9, outline:"none", width:"100%", marginBottom:6 };
  return (
    <div style={{ width:160, flexShrink:0, paddingRight:12, borderRight:"1px solid #0e1018" }}>
      <div style={{ fontSize:7, color:"#1c2a38", letterSpacing:1.5, textTransform:"uppercase", marginBottom:8, fontFamily:"monospace" }}>Filter & Sort</div>
      <input value={search} onChange={e => set("search", e.target.value)} placeholder="Search records..." className="inp" style={{ marginBottom:6, fontSize:9 }} />
      <select value={topic} onChange={e => set("topic", e.target.value)} style={sel}>
        {TOPICS.map(t => <option key={t}>{t}</option>)}
      </select>
      <select value={region} onChange={e => set("region", e.target.value)} style={sel}>
        {REGIONS.map(r => <option key={r}>{r}</option>)}
      </select>
      <select value={srcType} onChange={e => set("srcType", e.target.value)} style={sel}>
        {["All Sources","News","Blogs","Archives","Research","Podcasts","Community"].map(s => <option key={s}>{s}</option>)}
      </select>
      <select value={verdict} onChange={e => set("verdict", e.target.value)} style={sel}>
        {["All","Confirmed","Likely","Contested","Unverified","Refuted"].map(v => <option key={v}>{v}</option>)}
      </select>
      <select value={sortBy} onChange={e => set("sortBy", e.target.value)} style={sel}>
        {["Latest","Most Upvoted","Most Discussed","Most Credible"].map(s => <option key={s}>{s}</option>)}
      </select>
      {(isAdmin || isPaid) && (
        <button onClick={() => onFetch(topic !== "All Topics" ? topic : "")}
          style={{ width:"100%", background:"#0b0d14", border:"1px solid #1c2330", color:"#3a4a5a", padding:"7px 0", fontFamily:"monospace", fontSize:8, letterSpacing:1, cursor:"pointer", textTransform:"uppercase", marginTop:4 }}>
          + Load Records
        </button>
      )}
      {!isPaid && !isAdmin && (
        <button onClick={onUpgrade}
          style={{ width:"100%", background:"#b02020", border:"none", color:"#fff", padding:"7px 0", fontFamily:"monospace", fontSize:8, letterSpacing:1, cursor:"pointer", textTransform:"uppercase", marginTop:4 }}>
          Upgrade
        </button>
      )}
    </div>
  );
}

export function UpgradeModal({ onClose }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.88)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:999, padding:16 }}>
      <div style={{ background:"#07080c", border:"1px solid #b02020", maxWidth:560, width:"100%", padding:32 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
          <div>
            <div className="bb" style={{ fontSize:28, letterSpacing:3, color:"#eeeae0" }}>UNLOCK FULL ACCESS</div>
            <div style={{ fontSize:9, color:"#3a4a5a", fontFamily:"monospace", marginTop:2 }}>The Nexus Investigative Research Platform</div>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:"#3a4a5a", cursor:"pointer", fontSize:18, padding:0 }}>x</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
          <div style={{ background:"#0b0d14", border:"1px solid #1c2330", padding:18 }}>
            <div className="bb" style={{ fontSize:16, letterSpacing:2, color:"#eeeae0", marginBottom:4 }}>INVESTIGATOR</div>
            <div style={{ fontSize:22, color:"#b02020", fontFamily:"monospace", marginBottom:10 }}>$7.99<span style={{ fontSize:10, color:"#3a4a5a" }}>/mo</span></div>
            {["Unlimited records","Full AI analysis","Live Reddit feeds","Community posting","Save & organize"].map(f => (
              <div key={f} style={{ fontSize:8, color:"#5a6a7a", fontFamily:"monospace", marginBottom:4 }}>+ {f}</div>
            ))}
            <a href={STRIPE_MONTHLY} target="_blank" rel="noopener noreferrer"
              style={{ display:"block", background:"#b02020", color:"#fff", padding:"9px 0", textAlign:"center", fontFamily:"monospace", fontSize:9, letterSpacing:1.5, textTransform:"uppercase", marginTop:12, cursor:"pointer" }}>
              Subscribe Monthly
            </a>
          </div>
          <div style={{ background:"#0b0d14", border:"1px solid #5a9ac8", padding:18, position:"relative" }}>
            <div style={{ position:"absolute", top:-1, right:10, background:"#5a9ac8", color:"#07080c", fontSize:7, fontFamily:"monospace", padding:"2px 8px", letterSpacing:1 }}>BEST VALUE</div>
            <div className="bb" style={{ fontSize:16, letterSpacing:2, color:"#eeeae0", marginBottom:4 }}>ANALYST</div>
            <div style={{ fontSize:22, color:"#5a9ac8", fontFamily:"monospace", marginBottom:10 }}>$59.99<span style={{ fontSize:10, color:"#3a4a5a" }}>/yr</span></div>
            {["Everything in Investigator","37% savings vs monthly","Priority support","Early feature access","Analyst badge"].map(f => (
              <div key={f} style={{ fontSize:8, color:"#5a6a7a", fontFamily:"monospace", marginBottom:4 }}>+ {f}</div>
            ))}
            <a href={STRIPE_ANNUAL} target="_blank" rel="noopener noreferrer"
              style={{ display:"block", background:"#1a3a5a", border:"1px solid #5a9ac8", color:"#5a9ac8", padding:"9px 0", textAlign:"center", fontFamily:"monospace", fontSize:9, letterSpacing:1.5, textTransform:"uppercase", marginTop:12, cursor:"pointer" }}>
              Subscribe Annual
            </a>
          </div>
        </div>
        <div style={{ fontSize:8, color:"#1c2a38", fontFamily:"monospace", textAlign:"center" }}>Powered by Stripe. Cancel anytime. No contracts.</div>
      </div>
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
  const [name, setName]         = useState("");
  const [url, setUrl]           = useState("");
  const [cat, setCat]           = useState("Blogs & Independent Research");
  const [desc, setDesc]         = useState("");
  const [why, setWhy]           = useState("");
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    "News & Investigative Journalism",
    "Key Researchers & Authors",
    "Blogs & Independent Research",
    "YouTube Research Channels",
    "Archives & Primary Documents",
    "Biblical & Religious Research",
    "Science & Forbidden Research",
    "Podcasts & Audio",
    "Other",
  ];

  const submit = () => {
    if (!name.trim()) { toast2("Source name required"); return; }
    if (!url.trim() || !url.startsWith("http")) { toast2("Valid URL required (must start with https://)"); return; }
    if (!desc.trim()) { toast2("Brief description required"); return; }
    console.log("SOURCE SUBMISSION:", { name, url, cat, desc, why, ts: new Date().toISOString() });
    setSubmitted(true);
    toast2("Source submitted for review - thank you!");
  };

  if (submitted) return (
    <div style={{ textAlign:"center", padding:"20px 0" }}>
      <div style={{ fontSize:20, marginBottom:10 }}>+</div>
      <div style={{ fontSize:11, color:"#40c070", fontFamily:"monospace", marginBottom:8 }}>Source submitted for admin review</div>
      <div style={{ fontSize:9, color:"#3a4a5a", fontFamily:"monospace", lineHeight:1.7 }}>If approved, it will appear in the Source Directory within 48 hours.</div>
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
        <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2} placeholder="What does this source cover? Why is it valuable?" style={{ width:"100%", background:"#07080c", border:"1px solid #1c2330", color:"#ccc8be", padding:"8px 10px", fontFamily:"monospace", fontSize:11, outline:"none", resize:"vertical" }} />
      </div>
      <div style={{ marginBottom:12 }}>
        <div style={{ fontSize:7, color:"#5a9ac8", letterSpacing:1, textTransform:"uppercase", marginBottom:3, fontFamily:"monospace" }}>Why Should It Be Added? (optional)</div>
        <textarea value={why} onChange={e => setWhy(e.target.value)} rows={2} placeholder="e.g. Long-running independent researcher with 20+ years of documented work." style={{ width:"100%", background:"#07080c", border:"1px solid #1c2330", color:"#ccc8be", padding:"8px 10px", fontFamily:"monospace", fontSize:11, outline:"none", resize:"vertical" }} />
      </div>
      <div style={{ background:"#07080c", border:"1px solid #1c2330", padding:"9px 12px", marginBottom:12 }}>
        <div style={{ fontSize:9, color:"#3a4a5a", fontFamily:"monospace", lineHeight:1.8 }}>
          All submissions are reviewed before being added. Sources must be directly accessible at the URL provided.
        </div>
      </div>
      <div style={{ display:"flex", gap:7 }}>
        <button onClick={submit} style={{ background:"#1a2a3a", border:"1px solid #5a9ac8", color:"#5a9ac8", padding:"9px 20px", fontFamily:"monospace", fontSize:9, letterSpacing:1.5, cursor:"pointer", textTransform:"uppercase" }}>Submit Source</button>
        <button onClick={onClose} style={{ background:"transparent", border:"1px solid #1c2330", color:"#3a4a5a", padding:"9px 14px", fontFamily:"monospace", fontSize:9, cursor:"pointer" }}>Cancel</button>
      </div>
    </div>
  );
}
