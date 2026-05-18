// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────
import { VERDICTS, TOPICS, REGIONS, STRIPE_MONTHLY, STRIPE_ANNUAL, PRIVACY_POLICY, FREE_LIMIT, getType } from './data.js';

export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;500&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #07080c; color: #ccc8be; font-family: 'IBM Plex Mono', monospace; }
a { text-decoration: none; color: inherit; }
.bb { font-family: 'Bebas Neue', impact, sans-serif !important; }
.bk { font-family: 'Cormorant Garamond', Georgia, serif !important; }
.card { background: #0b0d14; border: 1px solid #1c2330; transition: border-color .12s; }
.card:hover { border-color: #2a3a4a; }
.nb { background: none; border: none; cursor: pointer; font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: #2a3a4a; padding: 0 12px; height: 100%; letter-spacing: .5px; border-bottom: 2px solid transparent; transition: all .15s; }
.nb:hover { color: #8a9aaa; }
.nb.on { color: #ccc8be; border-bottom-color: #b02020; }
.fsel { width: 100%; background: #0b0d14; border: 1px solid #1c2330; color: #7a8a9a; padding: 6px 8px; font-family: 'IBM Plex Mono', monospace; font-size: 10px; outline: none; margin-bottom: 5px; cursor: pointer; }
.inp { width: 100%; background: #07080c; border: 1px solid #1c2330; color: #ccc8be; padding: 9px 11px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; outline: none; }
.inp:focus { border-color: #5a7a9a; }
.cbar { height: 2px; background: #1c2330; }
.cfill { height: 100%; background: linear-gradient(90deg, #2a6a2a, #40c070); }
.sc::-webkit-scrollbar { width: 3px; }
.sc::-webkit-scrollbar-thumb { background: #1c2330; }
@keyframes fi { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
.fade { animation: fi .2s ease; }
input::placeholder, textarea::placeholder { color: #1c2a38; }
select option { background: #0b0d14; }
`;

// ─── VERDICT BADGE ────────────────────────────────────────────────────────────
export function VBadge({ verdict }) {
  const v = VERDICTS[verdict];
  if (!v) return null;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:3, background:v.color, color:v.text, border:`1px solid ${v.border}`, padding:"1px 6px", fontFamily:"monospace", fontSize:9, fontWeight:700, letterSpacing:.6, textTransform:"uppercase" }}>
      {v.icon} {v.short}
    </span>
  );
}

// ─── FILTER SIDEBAR ───────────────────────────────────────────────────────────
export function Sidebar({ filters, setFilters, isPaid, isAdmin, onFetch, onUpgrade }) {
  const { topic, region, srcType, sortBy, search, verdict } = filters;
  const set = (key, val) => setFilters(f => ({ ...f, [key]: val }));
  const clear = () => setFilters({ topic:"All Topics", region:"All Regions", srcType:"All Sources", sortBy:"Latest", search:"", verdict:"All" });

  return (
    <div style={{ width:200, flexShrink:0, paddingRight:14 }}>
      <div style={{ fontSize:8, color:"#1c2a38", letterSpacing:1, textTransform:"uppercase", marginBottom:8, fontFamily:"monospace" }}>Filter Records</div>

      <input value={search} onChange={e => set("search", e.target.value)} placeholder="Search..."
        style={{ width:"100%", background:"#0b0d14", border:"1px solid #1c2330", color:"#8a9aaa", padding:"6px 8px", fontFamily:"monospace", fontSize:10, outline:"none", marginBottom:5 }} />

      {[
        { label:"Topic",   key:"topic",   opts:TOPICS },
        { label:"Region",  key:"region",  opts:REGIONS },
        { label:"Source",  key:"srcType", opts:["All Sources","News","Blogs","Archives","Research","Podcasts","Community"] },
        { label:"Sort",    key:"sortBy",  opts:["Latest","Most Upvoted","Most Discussed","Most Credible"] },
        { label:"Verdict", key:"verdict", opts:["All","Confirmed","Likely","Contested","Unverified","Refuted"] },
      ].map(({ label, key, opts }) => (
        <div key={key}>
          <div style={{ fontSize:7, color:"#1c2a38", letterSpacing:1.5, textTransform:"uppercase", marginBottom:3, marginTop:8, fontFamily:"monospace" }}>{label}</div>
          <select className="fsel" value={filters[key]} onChange={e => set(key, e.target.value)}>
            {opts.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
      ))}

      <button onClick={clear} style={{ width:"100%", marginTop:7, padding:"5px", background:"transparent", border:"1px dashed #1c2330", color:"#1c2a38", fontFamily:"monospace", fontSize:8, letterSpacing:1, cursor:"pointer", textTransform:"uppercase" }}>
        Clear All
      </button>

      <div style={{ marginTop:14 }}>
        <div style={{ fontSize:7, color:"#1c2a38", letterSpacing:1.5, textTransform:"uppercase", marginBottom:6, fontFamily:"monospace" }}>Quick Fetch</div>
        {["JFK files","Epstein network","UAP disclosure","CIA programs","Ancient civilizations","Ocean anomalies","Financial control"].map(t => (
          <button key={t} onClick={() => onFetch(t)}
            style={{ width:"100%", textAlign:"left", background:"none", border:"1px solid #1c2330", color:"#2a3a4a", padding:"5px 7px", marginBottom:3, fontFamily:"monospace", fontSize:9, cursor:"pointer", transition:"all .12s" }}
            onMouseEnter={e => { e.target.style.borderColor="#b02020"; e.target.style.color="#7a8a9a"; }}
            onMouseLeave={e => { e.target.style.borderColor="#1c2330"; e.target.style.color="#2a3a4a"; }}>
            → {t}
          </button>
        ))}
      </div>

      <div style={{ marginTop:14, background:"#0b0d14", border:"1px solid #1c2330", padding:10 }}>
        <div style={{ fontSize:8, color:isAdmin?"#e0c060":isPaid?"#40c070":"#3a4a5a", letterSpacing:1, marginBottom:3, fontFamily:"monospace" }}>
          {isAdmin ? "⚙ ADMIN" : isPaid ? "✓ FULL ACCESS" : "FREE ACCESS"}
        </div>
        <div style={{ fontSize:8, color:"#1c2a38", lineHeight:1.7, fontFamily:"monospace" }}>
          {isPaid ? "Unlimited records & AI" : `${FREE_LIMIT} records · 5 AI queries`}
        </div>
        {!isPaid && (
          <button onClick={onUpgrade} style={{ width:"100%", marginTop:6, background:"#b02020", border:"none", color:"#fff", padding:"5px", fontFamily:"monospace", fontSize:8, letterSpacing:1, cursor:"pointer", textTransform:"uppercase" }}>
            Unlock Full Access →
          </button>
        )}
      </div>
    </div>
  );
}

// ─── UPGRADE MODAL ────────────────────────────────────────────────────────────
export function UpgradeModal({ onClose }) {
  const plans = [
    {
      name:"Investigator", price:"$7.99", cadence:"/month", accent:"#40c070", badge:"Most Popular",
      note:"", link:STRIPE_MONTHLY,
      features:["Unlimited investigative records","Full live Reddit communities","Unlimited AI analysis","Post findings & upload evidence","Save & organize records","Verified Investigator badge"],
    },
    {
      name:"Analyst", price:"$59.99", cadence:"/year", accent:"#a070d0", badge:"Best Value",
      note:"= $5/mo · Save 37%", link:STRIPE_ANNUAL,
      features:["Everything in Investigator","Priority AI analysis","Senior Analyst badge","Ad-free experience","Founding member status","Priority support"],
    },
  ];

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.92)", zIndex:9900, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background:"#0b0d14", border:"1px solid #252d3d", width:"100%", maxWidth:700, maxHeight:"90vh", overflowY:"auto" }} className="sc">
        <div style={{ padding:"22px 26px 18px", borderBottom:"1px solid #1c2330", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div className="bb" style={{ fontSize:22, letterSpacing:2, color:"#eeeae0" }}>UNLOCK FULL ACCESS</div>
            <div style={{ fontSize:9, color:"#2a3a4a", fontFamily:"monospace", marginTop:3 }}>Unlimited records · Reddit feeds · AI analysis · Community posting</div>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:"#4a5a6a", cursor:"pointer", fontSize:20, lineHeight:1 }}>✕</button>
        </div>
        <div style={{ padding:"22px 26px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:18 }}>
            {plans.map(pl => (
              <div key={pl.name} style={{ background:"#07080c", border:`1px solid ${pl.accent}33`, padding:"22px 20px", position:"relative" }}>
                <div style={{ position:"absolute", top:-1, right:20, background:pl.accent, color:"#07080c", padding:"2px 10px", fontFamily:"monospace", fontSize:8, fontWeight:700, letterSpacing:1, textTransform:"uppercase" }}>{pl.badge}</div>
                <div style={{ fontSize:9, color:pl.accent, letterSpacing:.5, fontFamily:"monospace", marginBottom:4 }}>{pl.name}</div>
                <div className="bb" style={{ fontSize:34, color:"#eeeae0", letterSpacing:1, lineHeight:1 }}>
                  {pl.price}<span style={{ fontSize:15, color:"#3a4a5a" }}>{pl.cadence}</span>
                </div>
                {pl.note && <div style={{ fontSize:9, color:pl.accent, fontFamily:"monospace", marginTop:2, marginBottom:12 }}>{pl.note}</div>}
                <div style={{ height:1, background:"#1c2330", margin:"14px 0" }} />
                {pl.features.map(f => (
                  <div key={f} style={{ display:"flex", gap:8, alignItems:"flex-start", marginBottom:7 }}>
                    <span style={{ color:pl.accent, flexShrink:0, fontSize:11, marginTop:1 }}>✓</span>
                    <span style={{ fontSize:11, color:"#8a9aaa", fontFamily:"monospace", lineHeight:1.4 }}>{f}</span>
                  </div>
                ))}
                <a href={pl.link} target="_blank" rel="noopener noreferrer"
                  style={{ display:"block", width:"100%", marginTop:18, padding:"12px", background:pl.accent, color:"#07080c", fontFamily:"monospace", fontSize:11, letterSpacing:1, textAlign:"center", fontWeight:700, textTransform:"uppercase", boxSizing:"border-box" }}>
                  Subscribe with Stripe →
                </a>
              </div>
            ))}
          </div>
          <div style={{ background:"#07080c", border:"1px solid #1c2330", padding:"11px 14px", marginBottom:12 }}>
            <div style={{ fontSize:9, color:"#3a4a5a", fontFamily:"monospace", lineHeight:1.8 }}>
              🔒 <strong style={{ color:"#4a5a6a" }}>Payments handled entirely by Stripe.</strong> We never see your card details. Cancel anytime from your Stripe customer portal.
            </div>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ fontSize:9, color:"#1c2a38", fontFamily:"monospace" }}>7-day free trial · No sign-up required · No data sold</div>
            <button onClick={onClose} style={{ background:"transparent", border:"1px solid #1c2330", color:"#3a4a5a", padding:"7px 16px", fontFamily:"monospace", fontSize:9, cursor:"pointer" }}>Maybe Later</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PRIVACY MODAL ────────────────────────────────────────────────────────────
export function PrivacyModal({ onClose }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.88)", zIndex:9900, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background:"#0b0d14", border:"1px solid #252d3d", width:"100%", maxWidth:600, maxHeight:"85vh", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"18px 22px 14px", borderBottom:"1px solid #1c2330", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
          <div className="bb" style={{ fontSize:20, letterSpacing:2, color:"#eeeae0" }}>PRIVACY POLICY</div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:"#4a5a6a", cursor:"pointer", fontSize:20, lineHeight:1 }}>✕</button>
        </div>
        <div style={{ overflowY:"auto", padding:"18px 22px", flex:1 }} className="sc">
          <pre style={{ fontSize:11, color:"#7a8a9a", lineHeight:1.85, whiteSpace:"pre-wrap", fontFamily:"monospace" }}>{PRIVACY_POLICY}</pre>
        </div>
        <div style={{ padding:"14px 22px", borderTop:"1px solid #1c2330", flexShrink:0, textAlign:"right" }}>
          <button onClick={onClose} style={{ background:"#b02020", border:"none", color:"#fff", padding:"8px 22px", fontFamily:"monospace", fontSize:10, letterSpacing:1, cursor:"pointer", textTransform:"uppercase" }}>Close</button>
        </div>
      </div>
    </div>
  );
}
