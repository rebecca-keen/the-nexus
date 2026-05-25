import { useState, useRef, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, useLocation, Link, useSearchParams } from 'react-router-dom';
import { CSS, VBadge, Sidebar, PrivacyModal, SubmitSourceForm } from './components.jsx';
import {
  ADMIN_USER, ADMIN_PASS, TOPICS, REGIONS, VERDICTS, MEDIA_LIBRARY,
  SEED_STORIES, SEED_POSTS, REDDIT_SUBS, SOURCES,
  autoVerdict, getType, fmtNum, OPENROUTER_KEY, AI_MODEL,
} from './data.js';

// ── helpers ──────────────────────────────────────────────────────────────────
const slugify = str =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 80);

const ensureSlug = s => ({ ...s, slug: s.slug || slugify(s.title) });
const STORIES_INIT = SEED_STORIES.map(ensureSlug);

// ── AI helper ─────────────────────────────────────────────────────────────────
const callAI = async (system, userMsg, history = [], maxTokens = 900) => {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENROUTER_KEY}`,
      'HTTP-Referer': 'https://nexusverse.app',
      'X-Title': 'The Nexus',
    },
    body: JSON.stringify({
      model: AI_MODEL,
      max_tokens: maxTokens,
      messages: [
        { role: 'system', content: system },
        ...history.map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: userMsg },
      ],
    }),
  });
  if (!res.ok) throw new Error(`AI error ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
};

let _session = null;
const saveSession = u => { _session = u; };
const clearSession = () => { _session = null; };

const TYPE_ICON = { book: '📖', documentary: '🎬', film: '🎥', article: '📰' };
const TYPE_CLR  = { book: '#5a9ac8', documentary: '#a060d0', film: '#4a9a5a', article: '#c0a020' };
const CONF_LABELS = { confirmed: '✓ Confirmed', likely: '↑ Likely', contested: '⚖ Disputed', unverified: '? Unverified' };
const CONF_COLORS = {
  confirmed:  { bg: '#0d2010', c: '#40c070', b: '#1a4a1a' },
  likely:     { bg: '#0d1a10', c: '#60c080', b: '#1a3a1a' },
  contested:  { bg: '#1e1808', c: '#c0a020', b: '#3a3010' },
  unverified: { bg: '#1a1008', c: '#c07020', b: '#3a2010' },
};
const CT_LABELS = { research: '🔬 Research', document: '📄 Document', sighting: '👁 Sighting', tip: '💡 Tip', rebuttal: '⚖ Counter', media: '📷 Media' };

// ── Update page meta for each article (SEO) ───────────────────────────────────
function updateMeta(title, description, url) {
  document.title = title;
  const set = (sel, attr, val) => { const el = document.querySelector(sel); if (el) el.setAttribute(attr, val); };
  set('meta[name="description"]', 'content', description);
  set('meta[property="og:title"]', 'content', title);
  set('meta[property="og:description"]', 'content', description);
  set('meta[property="og:url"]', 'content', url);
  set('link[rel="canonical"]', 'href', url);
  set('meta[name="twitter:title"]', 'content', title);
  set('meta[name="twitter:description"]', 'content', description);
}

// ═════════════════════════════════════════════════════════════════════════════
// ROOT
// ═════════════════════════════════════════════════════════════════════════════
export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// INNER — all shared state lives here
// ═════════════════════════════════════════════════════════════════════════════
function AppInner() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const activeTab = location.pathname.split('/')[1] || 'home';

  // ── shared state ─────────────────────────────────────────────────────────
  const [user, setUser]       = useState({ plan: 'free', isAdmin: false });
  const isAdmin = user.isAdmin;

  const [stories, setStories] = useState(STORIES_INIT);
  const [posts,   setPosts]   = useState(SEED_POSTS);
  const [votes,   setVotes]   = useState({});
  const [verdicts,setVerdicts]= useState({});
  const [saved,   setSaved]   = useState({});
  const [loading, setLoading] = useState(false);

  const [rPosts, setRPosts]   = useState([]);
  const [rLoad,  setRLoad]    = useState(false);
  const [sub,    setSub]      = useState(REDDIT_SUBS[0]);
  const [rSort,  setRSort]    = useState('hot');

  const [libType,  setLibType]  = useState('All');
  const [libTopic, setLibTopic] = useState('All Topics');
  const [libQ,     setLibQ]     = useState('');

  const [cSort, setCSort] = useState('Hot');
  const [showForm, setShowForm] = useState(false);
  const [showSrc,  setShowSrc]  = useState(false);
  const [np, setNp] = useState({ title:'', body:'', topic:TOPICS[1], region:'🌍 Global', contentType:'research', confidence:'unverified', tags:'' });
  const [refs,    setRefs]    = useState([{ label:'', url:'' }]);
  const [uploads, setUploads] = useState([]);
  const [drag,    setDrag]    = useState(false);
  const [disc,    setDisc]    = useState(false);
  const imgRef = useRef(null);
  const docRef = useRef(null);

  const [chat,   setChat]   = useState([{ role:'assistant', content:'I analyze unresolved events, disputed records, and suppressed history. Ask about any topic.' }]);
  const [aiIn,   setAiIn]   = useState('');
  const [aiLoad, setAiLoad] = useState(false);
  const chatEnd = useRef(null);
  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior:'smooth' }); }, [chat]);

  const [showPrivacy, setShowPrivacy] = useState(false);
  const [toast, setToast] = useState(null);
  const toast2 = msg => { setToast(msg); setTimeout(() => setToast(null), 2200); };

  // ── URL-synced filters ────────────────────────────────────────────────────
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = {
    topic:   searchParams.get('topic')   || 'All Topics',
    region:  searchParams.get('region')  || 'All Regions',
    srcType: searchParams.get('srcType') || 'All Sources',
    sortBy:  searchParams.get('sortBy')  || 'Latest',
    search:  searchParams.get('search')  || '',
    verdict: searchParams.get('verdict') || 'All',
  };
  const setFilters = updater => {
    const next = typeof updater === 'function' ? updater(filters) : updater;
    const p = {};
    if (next.topic   !== 'All Topics')   p.topic   = next.topic;
    if (next.region  !== 'All Regions')  p.region  = next.region;
    if (next.srcType !== 'All Sources')  p.srcType = next.srcType;
    if (next.sortBy  !== 'Latest')       p.sortBy  = next.sortBy;
    if (next.search)                     p.search  = next.search;
    if (next.verdict !== 'All')          p.verdict = next.verdict;
    setSearchParams(p);
  };

  // ── filtered stories ──────────────────────────────────────────────────────
  const { topic, region, srcType, sortBy, search, verdict } = filters;
  const filteredStories = stories.filter(s => {
    if (topic   !== 'All Topics'   && s.topic?.trim()  !== topic.trim())   return false;
    if (region  !== 'All Regions'  && s.region?.trim() !== region.trim())  return false;
    if (srcType !== 'All Sources') {
      const m = { News:'news', Blogs:'blog', Archives:'archive', Research:'research', Podcasts:'podcast', Community:'user' };
      if (m[srcType] && s.type !== m[srcType]) return false;
    }
    if (verdict !== 'All') {
      const ev = verdicts[s.id] || autoVerdict(s.credible);
      if (ev !== verdict.toLowerCase()) return false;
    }
    if (search) {
      const q = search.toLowerCase();
      if (!s.title.toLowerCase().includes(q) && !s.summary.toLowerCase().includes(q) && !s.tags?.some(t => t.toLowerCase().includes(q))) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'Most Upvoted')   return b.upvotes  - a.upvotes;
    if (sortBy === 'Most Discussed') return b.comments - a.comments;
    if (sortBy === 'Most Credible')  return b.credible - a.credible;
    return 0;
  });

  // ── fetch more AI stories ─────────────────────────────────────────────────
  const fetchMore = useCallback(async (hint = '') => {
    setLoading(true);
    try {
      const used = stories.slice(0, 6).map(s => s.title).join('; ');
      const system = `Generate 5 investigative research stories as a JSON array. No markdown, no backticks, output raw JSON only. Each object: {type:"news"|"blog"|"archive"|"research", source:"outlet name", sourceUrl:"url", topic:"one of the topics from the site", region:"flag + country", title:"specific headline", summary:"2-3 sentences", tags:["tag1","tag2"], credible:50-97, debunked:100-credible, upvotes:500-9000, comments:50-2000}. Do not repeat: ${used}`;
      const raw = await callAI(system, hint ? `Focus on: ${hint}` : 'Generate diverse stories', [], 1200);
      const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());
      const newStories = parsed.map((s, i) => ({
        ...s, id: `ai-${Date.now()}-${i}`, slug: slugify(s.title), time: `${i + 1}h ago`,
      }));
      setStories(prev => [...newStories, ...prev]);
      toast2(`✓ ${newStories.length} new records loaded`);
    } catch { toast2('All records loaded — check back soon'); }
    finally { setLoading(false); }
  }, [stories]);

  // ── fetch Reddit ──────────────────────────────────────────────────────────
  const fetchReddit = useCallback(async (s = sub, srt = rSort) => {
    setRLoad(true); setRPosts([]);
    const name = s.name.replace('r/', '');
    try {
      let data;
      try {
        const r = await fetch(`https://www.reddit.com/r/${name}/${srt}.json?limit=20&raw_json=1`, { headers: { Accept: 'application/json' } });
        data = await r.json();
      } catch {
        const r = await fetch(`https://corsproxy.io/?https://www.reddit.com/r/${name}/${srt}.json?limit=20&raw_json=1`);
        data = await r.json();
      }
      const ps = (data?.data?.children || [])
        .map(({ data: p }) => ({
          id: p.id, title: p.title, author: p.author, score: p.score,
          numComments: p.num_comments, permalink: `https://www.reddit.com${p.permalink}`,
          selftext: p.selftext?.slice(0, 240) || '', isSelf: p.is_self, url: p.url,
          preview: p.preview?.images?.[0]?.source?.url?.replace(/&amp;/g, '&') || null,
          flair: p.link_flair_text || null, created: p.created_utc,
          subreddit: p.subreddit, upvoteRatio: p.upvote_ratio, stickied: p.stickied,
        })).filter(p => !p.stickied);
      setRPosts(ps);
      toast2(`✓ ${ps.length} posts from ${s.name}`);
    } catch { toast2('Reddit unavailable — try the direct link'); }
    finally { setRLoad(false); }
  }, [sub, rSort]);

  // ── AI chat ───────────────────────────────────────────────────────────────
  const sendAi = async () => {
    if (!aiIn.trim() || aiLoad) return;
    const msg = aiIn.trim(); setAiIn('');
    setChat(p => [...p, { role: 'user', content: msg }]);
    setAiLoad(true);
    try {
      const system = `You are an expert investigative analyst for The Nexus. Never use the word "conspiracy." Use: "disputed record," "unresolved event," "declassified program," "suppressed evidence." Format: **The Record:** / **Evidence:** / **Official Position:** / **Primary Sources:** / **Further Reading:** Max 360 words.`;
      const reply = await callAI(system, msg, chat, 900);
      setChat(p => [...p, { role: 'assistant', content: reply || 'Analysis unavailable.' }]);
    } catch {
      setChat(p => [...p, { role: 'assistant', content: 'Connection error. Check your OpenRouter API key.' }]);
    } finally { setAiLoad(false); }
  };

  // ── file uploads ──────────────────────────────────────────────────────────
  const handleFiles = files => Array.from(files).forEach(f => {
    const r = new FileReader();
    r.onload = ev => {
      const type = f.type.startsWith('image/') ? 'image' : f.type === 'application/pdf' ? 'pdf' : 'doc';
      setUploads(p => [...p, { type, name: f.name, data: ev.target.result }]);
    };
    r.readAsDataURL(f);
  });

  // ── submit community post ─────────────────────────────────────────────────
  const submitPost = () => {
    if (!np.title.trim()) { toast2('Title required'); return; }
    if (!np.body.trim())  { toast2('Description required'); return; }
    const vRefs = refs.filter(r => r.url.trim().startsWith('http'));
    if (!vRefs.length)    { toast2('At least one source URL required'); return; }
    if (!disc)            { toast2('Please confirm the disclaimer'); return; }
    const badge = isAdmin ? 'Admin' : user.plan === 'annual' ? 'Analyst' : user.plan === 'monthly' ? 'Investigator' : 'Observer';
    const tags  = (np.tags || '').split(',').map(t => t.trim()).filter(Boolean);
    const post  = {
      id: `c${Date.now()}`, user: 'You', badge, time: 'just now',
      topic: np.topic, region: np.region, title: np.title, body: np.body,
      refs: vRefs, tags, contentType: np.contentType, confidence: np.confidence,
      upvotes: 1, comments: 0, image: uploads.find(u => u.type === 'image')?.data || null,
      uploads: uploads.filter(u => u.type !== 'image'), pinned: false,
    };
    setPosts(p => [post, ...p]);
    setNp({ title:'', body:'', topic:TOPICS[1], region:'🌍 Global', contentType:'research', confidence:'unverified', tags:'' });
    setRefs([{ label:'', url:'' }]);
    setUploads([]); setShowForm(false); setDisc(false);
    toast2('✓ Record submitted');
  };

  const sidebarProps = {
    filters, setFilters, isAdmin, onFetch: fetchMore,
    visibleTopics: TOPICS, visibleRegions: REGIONS,
  };

  // ── shared props passed down ──────────────────────────────────────────────
  const shared = {
    stories, setStories, filteredStories, allCount: stories.length,
    posts, setPosts, votes, setVotes, verdicts, setVerdicts, saved, setSaved,
    filters, setFilters, sidebarProps, toast2, isAdmin, user, setUser,
    rPosts, setRPosts, rLoad, setRLoad, sub, setSub, rSort, setRSort, fetchReddit,
    libType, setLibType, libTopic, setLibTopic, libQ, setLibQ,
    cSort, setCSort, showForm, setShowForm, showSrc, setShowSrc,
    np, setNp, refs, setRefs, uploads, setUploads, drag, setDrag,
    disc, setDisc, imgRef, docRef, handleFiles, submitPost,
    chat, setChat, aiIn, setAiIn, aiLoad, sendAi, chatEnd,
    fetchMore, loading, navigate,
    TOPICS, REGIONS, VERDICTS, MEDIA_LIBRARY, SOURCES, REDDIT_SUBS,
    CT_LABELS, CONF_LABELS, CONF_COLORS, TYPE_ICON, TYPE_CLR,
    fmtNum, getType, autoVerdict,
  };

  return (
    <>
      <style>{CSS}</style>
      <div style={{ minHeight:'100vh', background:'#07080c', color:'#ccc8be' }}>
        {/* Toast */}
        {toast && (
          <div className="fade" style={{ position:'fixed', bottom:20, right:20, background:'#10131e', border:'1px solid #2a3a4a', color:'#8a9aaa', padding:'8px 14px', fontSize:11, zIndex:9999, fontFamily:'monospace' }}>
            {toast}
          </div>
        )}

        {/* NAV */}
        <Nav activeTab={activeTab} isAdmin={isAdmin} rPosts={rPosts} fetchReddit={fetchReddit}
          onExit={() => { clearSession(); setUser({ plan:'free', isAdmin:false }); navigate('/'); }}
          onAdminLogin={(u, p) => {
            if (u === ADMIN_USER && p === ADMIN_PASS) {
              saveSession({ plan:'admin', isAdmin:true });
              setUser({ plan:'admin', isAdmin:true });
              navigate('/admin');
              toast2('Welcome, Admin');
            } else { toast2('Access denied'); }
          }}
        />

        <div style={{ maxWidth:1100, margin:'0 auto', padding:'16px 12px' }}>
          <Routes>
            <Route path="/"          element={<HomeView    {...shared} />} />
            <Route path="/feed"      element={<FeedView    {...shared} />} />
            <Route path="/record/:slug" element={<RecordView {...shared} />} />
            <Route path="/sources"   element={<SourcesView  {...shared} />} />
            <Route path="/community" element={<CommunityView {...shared} />} />
            <Route path="/reddit"    element={<RedditView   {...shared} />} />
            <Route path="/library"   element={<LibraryView  {...shared} />} />
            <Route path="/ai"        element={<AiView       {...shared} />} />
            {isAdmin && <Route path="/admin" element={<AdminView {...shared} />} />}
            <Route path="*" element={
              <div style={{ textAlign:'center', padding:60 }}>
                <div style={{ fontSize:32, marginBottom:16 }}>◈</div>
                <div className="bb" style={{ fontSize:20, letterSpacing:2, color:'#eeeae0', marginBottom:12 }}>RECORD NOT FOUND</div>
                <Link to="/feed" style={{ color:'#b02020', fontFamily:'monospace', fontSize:12 }}>← Return to Records</Link>
              </div>
            } />
          </Routes>
        </div>

        {/* Footer */}
        <div style={{ borderTop:'1px solid #1c2330', marginTop:32, padding:'12px 20px', background:'#07080c' }}>
          <div style={{ maxWidth:1280, margin:'0 auto', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:6, alignItems:'center' }}>
            <div style={{ display:'flex', gap:12, alignItems:'center' }}>
              <span style={{ fontSize:8, color:'#1c2a38', fontFamily:'monospace' }}>© 2025 The Nexus · nexusverse.app</span>
              <button onClick={() => setShowPrivacy(true)} style={{ background:'none', border:'none', color:'#3a4a5a', fontFamily:'monospace', fontSize:8, cursor:'pointer', textDecoration:'underline', padding:0 }}>Privacy Policy</button>
              <span style={{ fontSize:8, color:'#1c2a38', fontFamily:'monospace' }}>For independent research only · Adults 18+</span>
            </div>
            <span
              onDoubleClick={() => {
                const u = window.prompt('Admin username:');
                const p = window.prompt('Admin password:');
                if (u === ADMIN_USER && p === ADMIN_PASS) {
                  saveSession({ plan:'admin', isAdmin:true });
                  setUser({ plan:'admin', isAdmin:true });
                  navigate('/admin');
                  toast2('Welcome, Admin');
                } else if (u || p) { toast2('Access denied'); }
              }}
              style={{ width:6, height:6, borderRadius:'50%', background:'#1c2330', display:'inline-block', cursor:'default' }}
            />
          </div>
        </div>

        {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
      </div>
    </>
  );
}

// ── NAV ───────────────────────────────────────────────────────────────────────
function Nav({ activeTab, isAdmin, rPosts, fetchReddit, onExit, onAdminLogin }) {
  return (
    <div style={{ background:'#07080c', borderBottom:'1px solid #1c2330', position:'sticky', top:0, zIndex:100 }}>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 12px', display:'flex', alignItems:'center', justifyContent:'space-between', height:48 }}>
        <Link to="/" style={{ display:'flex', alignItems:'center', gap:8, textDecoration:'none', flexShrink:0 }}>
          <div style={{ width:18, height:18, background:'#b02020', clipPath:'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)' }} />
          <span className="bb" style={{ fontSize:16, letterSpacing:3, color:'#eeeae0' }}>THE NEXUS</span>
        </Link>
        <div style={{ display:'flex', alignItems:'center', overflowX:'auto', gap:0 }}>
          {[
            ['/feed',      'feed',      'Records'],
            ['/sources',   'sources',   'Sources'],
            ['/community', 'community', 'Community'],
            ['/reddit',    'reddit',    'Reddit'],
            ['/library',   'library',   'Library'],
            ['/ai',        'ai',        'Analysis'],
            ...(isAdmin ? [['/admin', 'admin', 'Admin']] : []),
          ].map(([path, tab, label]) => (
            <Link key={tab} to={path}
              onClick={() => { if (tab === 'reddit' && !rPosts.length) fetchReddit(); }}
              style={{
                borderBottom: activeTab === tab ? '2px solid #b02020' : '2px solid transparent',
                color: activeTab === tab ? '#eeeae0' : '#3a4a5a',
                padding:'0 9px', height:48, fontFamily:'monospace', fontSize:9,
                letterSpacing:.5, textTransform:'uppercase', cursor:'pointer',
                whiteSpace:'nowrap', flexShrink:0, display:'flex', alignItems:'center',
                textDecoration:'none',
              }}>
              {label}
            </Link>
          ))}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6, flexShrink:0 }}>
          {isAdmin && <span style={{ fontSize:8, color:'#e0c060', background:'#1e1808', border:'1px solid #4a3a10', padding:'2px 7px', fontFamily:'monospace' }}>ADMIN</span>}
          {isAdmin && <button onClick={onExit} style={{ background:'none', border:'1px solid #1c2330', color:'#2a3a4a', padding:'3px 8px', fontFamily:'monospace', fontSize:9, cursor:'pointer' }}>Exit</button>}
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// RECORD VIEW — /record/:slug — gives every article its own URL
// ═════════════════════════════════════════════════════════════════════════════
function RecordView({ stories, votes, setVotes, verdicts, setVerdicts, saved, setSaved,
  VERDICTS, MEDIA_LIBRARY, autoVerdict, getType, fmtNum, setLibTopic, toast2, navigate,
  TYPE_ICON, TYPE_CLR }) {
  const { slug } = useParams();
  const story = stories.find(s => s.slug === slug);

  useEffect(() => {
    if (story) {
      const url = `https://nexusverse.app/record/${slug}`;
      updateMeta(
        `${story.title} | The Nexus`,
        story.summary?.slice(0, 160) || '',
        url
      );
    }
    return () => updateMeta(
      'The Nexus — Suppressed History. Independent Research.',
      'Unresolved events, disputed records, and suppressed history. Independent research platform.',
      'https://nexusverse.app/'
    );
  }, [story, slug]);

  if (!story) return (
    <div style={{ textAlign:'center', padding:60 }}>
      <div style={{ fontSize:32, marginBottom:16 }}>◈</div>
      <div className="bb" style={{ fontSize:20, letterSpacing:2, color:'#eeeae0', marginBottom:12 }}>RECORD NOT FOUND</div>
      <button onClick={() => navigate('/feed')} style={{ color:'#b02020', fontFamily:'monospace', fontSize:12, background:'none', border:'none', cursor:'pointer' }}>← Return to Records</button>
    </div>
  );

  const v = votes[story.id];
  const articleUrl = `https://nexusverse.app/record/${slug}`;

  return (
    <div className="fade">
      <button onClick={() => navigate(-1)} style={{ background:'#0b0d14', border:'1px solid #2a3a4a', color:'#8a9aaa', fontFamily:'monospace', fontSize:10, cursor:'pointer', marginBottom:14, padding:'6px 14px', display:'flex', alignItems:'center', gap:6 }}>← Back</button>
      <div className="card" style={{ padding:22 }}>
        <div style={{ display:'flex', gap:6, flexWrap:'wrap', alignItems:'center', marginBottom:10 }}>
          <span style={{ background:getType(story.type).bg, color:getType(story.type).text, padding:'1px 6px', fontFamily:'monospace', fontSize:8 }}>{getType(story.type).label}</span>
          {story.sourceUrl
            ? <a href={story.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize:10, color:'#5a9ac8', fontFamily:'monospace' }}>{story.source} ↗</a>
            : <span style={{ fontSize:10, color:'#5a7a9a', fontFamily:'monospace' }}>{story.source}</span>}
          <span style={{ fontSize:8, color:'#1c2a38', fontFamily:'monospace' }}>{story.time} · {story.region}</span>
          <VBadge verdict={verdicts[story.id] || autoVerdict(story.credible)} />
        </div>
        <div className="bk" style={{ fontSize:22, color:'#eeeae0', lineHeight:1.25, marginBottom:12 }}>{story.title}</div>
        <div className="bk" style={{ fontSize:15, fontWeight:300, color:'#7a8a9a', lineHeight:1.8, marginBottom:18, fontStyle:'italic' }}>{story.summary}</div>
        <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:18 }}>
          {story.tags?.map(t => <span key={t} style={{ fontSize:8, background:'#10131e', border:'1px solid #1c2330', color:'#3a4a5a', padding:'1px 7px', fontFamily:'monospace' }}>#{t}</span>)}
        </div>

        {/* Credibility */}
        <div style={{ background:'#07080c', border:'1px solid #1c2330', padding:14, marginBottom:12 }}>
          <div style={{ fontSize:8, color:'#1c2a38', letterSpacing:1, marginBottom:8, textTransform:'uppercase', fontFamily:'monospace' }}>Community Credibility</div>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
            <span style={{ fontSize:10, color:'#40c070', fontFamily:'monospace' }}>Accurate {story.credible}%</span>
            <span style={{ fontSize:10, color:'#c04040', fontFamily:'monospace' }}>{story.debunked}% Refuted</span>
          </div>
          <div className="cbar"><div className="cfill" style={{ width:`${story.credible}%` }} /></div>
          <div style={{ display:'flex', gap:7, marginTop:10 }}>
            <button onClick={() => { if (!v) { setVotes(p => ({ ...p, [story.id]:'up' })); toast2('Marked accurate'); } }}
              style={{ flex:1, background:v==='up'?'#0a2010':'transparent', border:`1px solid ${v==='up'?'#2a6a2a':'#1c2330'}`, color:v==='up'?'#40c070':'#3a4a5a', padding:'6px', fontFamily:'monospace', fontSize:9, cursor:'pointer' }}>▲ Accurate</button>
            <button onClick={() => { if (!v) { setVotes(p => ({ ...p, [story.id]:'dn' })); toast2('Marked refuted'); } }}
              style={{ flex:1, background:v==='dn'?'#200a0a':'transparent', border:`1px solid ${v==='dn'?'#6a2a2a':'#1c2330'}`, color:v==='dn'?'#c04040':'#3a4a5a', padding:'6px', fontFamily:'monospace', fontSize:9, cursor:'pointer' }}>▼ Refuted</button>
          </div>
          <div style={{ marginTop:10, borderTop:'1px solid #1c2330', paddingTop:8 }}>
            <div style={{ fontSize:8, color:'#1c2a38', letterSpacing:1, marginBottom:6, textTransform:'uppercase', fontFamily:'monospace' }}>Your Verdict</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:4 }}>
              {Object.entries(VERDICTS).map(([k, vv]) => (
                <button key={k} onClick={() => { setVerdicts(p => ({ ...p, [story.id]:k })); toast2(`Verdict: ${vv.label}`); }}
                  style={{ background:verdicts[story.id]===k?vv.color:'transparent', border:`1px solid ${verdicts[story.id]===k?vv.border:'#1c2330'}`, color:verdicts[story.id]===k?vv.text:'#2a3a4a', padding:'4px 3px', fontFamily:'monospace', fontSize:8, cursor:'pointer' }}>
                  {vv.icon} {vv.short}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display:'flex', gap:7, flexWrap:'wrap', marginBottom:16 }}>
          {story.sourceUrl && <a href={story.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ background:'#b02020', color:'#fff', padding:'7px 16px', fontFamily:'monospace', fontSize:9, textDecoration:'none' }}>Read Source ↗</a>}
          <button onClick={() => { setSaved(p => ({ ...p, [story.id]:!p[story.id] })); toast2(saved[story.id]?'Removed':'Saved'); }} style={{ background:'transparent', border:'1px solid #1c2330', color:saved[story.id]?'#c08030':'#3a4a5a', padding:'7px 12px', fontFamily:'monospace', fontSize:9, cursor:'pointer' }}>{saved[story.id]?'* Saved':'Save'}</button>
        </div>

        {/* Share — uses real article URL */}
        <div style={{ borderTop:'1px solid #1c2330', paddingTop:12, marginBottom:16 }}>
          <div style={{ fontSize:8, color:'#1c2a38', letterSpacing:1.5, textTransform:'uppercase', fontFamily:'monospace', marginBottom:8 }}>Share This Record</div>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(story.title)}&url=${encodeURIComponent(articleUrl)}&hashtags=${encodeURIComponent((story.tags||[]).slice(0,3).join(','))}`}
              target="_blank" rel="noopener noreferrer"
              style={{ background:'#000', color:'#fff', padding:'7px 14px', fontFamily:'monospace', fontSize:9, textDecoration:'none' }}>X / Twitter</a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
              target="_blank" rel="noopener noreferrer"
              style={{ background:'#1877f2', color:'#fff', padding:'7px 14px', fontFamily:'monospace', fontSize:9, textDecoration:'none' }}>Facebook</a>
            <button onClick={() => { navigator.clipboard?.writeText(articleUrl); toast2('Article link copied — paste into Instagram story'); }}
              style={{ background:'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', color:'#fff', padding:'7px 14px', fontFamily:'monospace', fontSize:9, border:'none', cursor:'pointer' }}>Copy for Instagram</button>
            <button onClick={() => { navigator.clipboard?.writeText(articleUrl); toast2('Link copied'); }}
              style={{ background:'transparent', border:'1px solid #2a3a4a', color:'#5a6a7a', padding:'7px 12px', fontFamily:'monospace', fontSize:9, cursor:'pointer' }}>Copy Link</button>
          </div>
          <div style={{ fontSize:8, color:'#2a3a4a', fontFamily:'monospace', marginTop:6 }}>{articleUrl}</div>
        </div>

        {/* Related media */}
        {(() => {
          const rel = MEDIA_LIBRARY.filter(m => m.topic === story.topic || story.tags?.some(t => m.tags?.includes(t))).slice(0, 4);
          if (!rel.length) return null;
          return (
            <div style={{ background:'#07080c', border:'1px solid #1c2a1a', padding:'12px 14px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                <div style={{ fontSize:8, color:'#2a4a2a', letterSpacing:1, textTransform:'uppercase', fontFamily:'monospace' }}>📚 Related Books, Docs & Films</div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
                {rel.map(m => (
                  <a key={m.id} href={m.url} target="_blank" rel="noopener noreferrer"
                    style={{ background:'#0b0d14', border:'1px solid #1c2330', padding:'8px 10px', display:'block', textDecoration:'none' }}>
                    <div style={{ display:'flex', gap:7, alignItems:'flex-start' }}>
                      <span style={{ fontSize:16, flexShrink:0 }}>{TYPE_ICON[m.type] || '📄'}</span>
                      <div>
                        <div style={{ fontSize:7, color:'#2a3a4a', textTransform:'uppercase', marginBottom:2, fontFamily:'monospace' }}>{m.type} · {m.year}</div>
                        <div className="bk" style={{ fontSize:12, color:'#ccc8be', lineHeight:1.3 }}>{m.title}</div>
                        <div style={{ fontSize:8, color:'#3a4a5a', fontFamily:'monospace' }}>{m.author}</div>
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
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// FEED VIEW — /feed — story list with filters in URL
// ═════════════════════════════════════════════════════════════════════════════
function FeedView({ filteredStories, allCount, filters, sidebarProps, votes, setVotes, verdicts, autoVerdict, fmtNum, getType, navigate, fetchMore, loading }) {
  return (
    <div style={{ display:'flex', gap:0 }}>
      <Sidebar {...sidebarProps} />
      <div style={{ flex:1 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
          <div>
            <div className="bb" style={{ fontSize:20, letterSpacing:2, color:'#eeeae0' }}>OPEN RECORDS</div>
            <div style={{ fontSize:8, color:'#1c2a38', fontFamily:'monospace' }}>
              {filteredStories.length} of {allCount} records
              {filters.topic !== 'All Topics' && <span style={{ color:'#b02020', marginLeft:6 }}>· {filters.topic}</span>}
            </div>
          </div>
          <button onClick={() => fetchMore()} disabled={loading}
            style={{ background:loading?'#1c2330':'#b02020', border:'none', color:'#fff', padding:'6px 14px', fontFamily:'monospace', fontSize:8, cursor:'pointer', letterSpacing:1 }}>
            {loading ? 'Loading…' : '+ Load More'}
          </button>
        </div>
        {filteredStories.map(s => {
          const t = getType(s.type);
          const v = votes[s.id];
          return (
            <div key={s.id} className="card fade" style={{ display:'flex', padding:'11px 13px 11px 9px', marginBottom:3, cursor:'pointer' }}
              onClick={() => navigate(`/record/${s.slug}`)}>
              <div style={{ width:38, flexShrink:0, display:'flex', flexDirection:'column', alignItems:'center', gap:3, paddingTop:2 }}
                onClick={e => e.stopPropagation()}>
                <button style={{ background:v==='up'?'#0a2010':'none', border:`1px solid ${v==='up'?'#2a6a2a':'#1c2330'}`, color:v==='up'?'#40c070':'#2a3a4a', width:26, height:22, cursor:'pointer', fontSize:10 }}
                  onClick={() => { if (!v) setVotes(p => ({ ...p, [s.id]:'up' })); }}>▲</button>
                <span style={{ fontSize:11, color:'#4a5a6a', fontFamily:'monospace' }}>{fmtNum(s.upvotes)}</span>
                <button style={{ background:v==='dn'?'#200a0a':'none', border:`1px solid ${v==='dn'?'#6a2a2a':'#1c2330'}`, color:v==='dn'?'#c04040':'#2a3a4a', width:26, height:22, cursor:'pointer', fontSize:10 }}
                  onClick={() => { if (!v) setVotes(p => ({ ...p, [s.id]:'dn' })); }}>▼</button>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap', alignItems:'center', marginBottom:4 }}>
                  <span style={{ background:t.bg, color:t.text, padding:'1px 5px', fontSize:7, fontFamily:'monospace' }}>{t.label}</span>
                  <span style={{ fontSize:9, color:'#3a5a7a', fontFamily:'monospace' }}>{s.source}</span>
                  <span style={{ fontSize:8, color:'#1c2a38', fontFamily:'monospace' }}>{s.time} · {s.region}</span>
                  <VBadge verdict={verdicts[s.id] || autoVerdict(s.credible)} />
                </div>
                <div className="bk" style={{ fontSize:14, color:'#d8d0c4', lineHeight:1.3, marginBottom:4 }}>{s.title}</div>
                <div style={{ fontSize:9, color:'#2a3a4a', lineHeight:1.55, marginBottom:5, fontFamily:'monospace' }}>{s.summary?.slice(0, 130)}…</div>
                <div style={{ height:2, background:'#1c2330', marginBottom:4, maxWidth:180 }}>
                  <div style={{ height:'100%', width:`${s.credible}%`, background:'linear-gradient(90deg,#2a6a2a,#40c070)' }} />
                </div>
                <div style={{ display:'flex', gap:8 }}>
                  {s.tags?.map(tg => <span key={tg} style={{ fontSize:7, color:'#1c2a38', fontFamily:'monospace' }}>#{tg}</span>)}
                  <span style={{ fontSize:9, color:'#1c2a38', marginLeft:'auto', fontFamily:'monospace' }}>💬 {fmtNum(s.comments)}</span>
                </div>
              </div>
            </div>
          );
        })}
        <div style={{ padding:'18px 0', textAlign:'center', borderTop:'1px solid #0e1018', marginTop:8 }}>
          <div style={{ fontSize:8, color:'#1c2a38', fontFamily:'monospace' }}>New records added regularly · Check back soon</div>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// HOME VIEW — /
// ═════════════════════════════════════════════════════════════════════════════
function HomeView({ stories, setFilters, navigate, TOPICS, getType }) {
  useEffect(() => {
    updateMeta(
      'The Nexus — Suppressed History. Independent Research.',
      'Unresolved events, disputed records, and suppressed history. Independent research platform. All sources cited. No paywalls.',
      'https://nexusverse.app/'
    );
  }, []);

  return (
    <div className="fade">
      {/* Hero */}
      <div style={{ background:'linear-gradient(180deg,#0f1520,#07080c)', border:'1px solid #1c2330', padding:'clamp(28px,5vw,52px) clamp(20px,4vw,44px)', marginBottom:12, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg,#b02020,#5a2a6a,#1a3a6a)' }} />
        <div style={{ fontSize:8, color:'#b02020', fontFamily:'monospace', letterSpacing:3, textTransform:'uppercase', marginBottom:14, display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ width:18, height:1, background:'#b02020', display:'inline-block' }} />
          Independent Research Platform
        </div>
        <div className="bb" style={{ fontSize:'clamp(32px,6vw,68px)', letterSpacing:2, color:'#eeeae0', lineHeight:.95, marginBottom:18 }}>
          SOME QUESTIONS<br />
          <span style={{ color:'#b02020' }}>NEVER GET</span><br />
          ANSWERED
        </div>
        <div className="bk" style={{ fontSize:'clamp(14px,2.5vw,18px)', fontWeight:300, color:'#7a8a9a', lineHeight:1.7, maxWidth:520, marginBottom:24, fontStyle:'italic' }}>
          The Nexus aggregates investigative journalism, declassified records, whistleblower testimony, and disputed history — for adults who ask questions the mainstream stopped asking.
        </div>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          <button onClick={() => navigate('/feed')} style={{ background:'#b02020', border:'none', color:'#fff', padding:'12px 26px', fontFamily:'monospace', fontSize:10, letterSpacing:1.5, cursor:'pointer', textTransform:'uppercase' }}>Enter the Archive →</button>
          <button onClick={() => navigate('/sources')} style={{ background:'transparent', border:'1px solid #3a4a5a', color:'#8a9aaa', padding:'11px 18px', fontFamily:'monospace', fontSize:10, letterSpacing:1, cursor:'pointer' }}>Browse Sources</button>
        </div>
        <div style={{ marginTop:16, fontSize:8, color:'#2a3a4a', fontFamily:'monospace' }}>
          For independent research & education · Adults 18+ · All sources linked · No editorial position taken
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginBottom:12 }}>
        {[
          { n:'86+',  l:'Records',    s:'& growing daily' },
          { n:'616+', l:'Sources',    s:'Books · Blogs · YouTube' },
          { n:'200+', l:'Communities', s:'Reddit & forums' },
          { n:'Free', l:'No Paywall', s:'No sign-up needed' },
        ].map(s => (
          <div key={s.l} style={{ background:'#0b0d14', border:'1px solid #1c2330', padding:'14px 10px', textAlign:'center' }}>
            <div className="bb" style={{ fontSize:'clamp(18px,3vw,26px)', letterSpacing:1, color:'#b02020', lineHeight:1 }}>{s.n}</div>
            <div style={{ fontSize:9, color:'#ccc8be', fontFamily:'monospace', marginTop:4 }}>{s.l}</div>
            <div style={{ fontSize:8, color:'#2a3a4a', fontFamily:'monospace' }}>{s.s}</div>
          </div>
        ))}
      </div>

      {/* Topics */}
      <div style={{ background:'#0b0d14', border:'1px solid #1c2330', padding:'16px', marginBottom:12 }}>
        <div style={{ fontSize:8, color:'#3a4a5a', letterSpacing:1.5, textTransform:'uppercase', fontFamily:'monospace', marginBottom:10 }}>What We Cover</div>
        <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
          {TOPICS.filter(t => t !== 'All Topics').map(t => (
            <button key={t} onClick={() => { setFilters(f => ({ ...f, topic:t })); navigate('/feed'); }}
              style={{ background:'#07080c', border:'1px solid #1c2330', color:'#4a5a6a', padding:'5px 10px', fontFamily:'monospace', fontSize:8, cursor:'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='#b02020'; e.currentTarget.style.color='#ccc8be'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='#1c2330'; e.currentTarget.style.color='#4a5a6a'; }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Latest records */}
      <div style={{ marginBottom:12 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
          <div style={{ fontSize:8, color:'#3a4a5a', letterSpacing:1.5, textTransform:'uppercase', fontFamily:'monospace' }}>Latest Records</div>
          <button onClick={() => navigate('/feed')} style={{ background:'none', border:'none', color:'#b02020', fontFamily:'monospace', fontSize:8, cursor:'pointer', letterSpacing:1 }}>View All →</button>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:6 }}>
          {stories.slice(0, 4).map(s => (
            <div key={s.id} onClick={() => navigate(`/record/${s.slug}`)} className="card"
              style={{ padding:'12px 14px', cursor:'pointer' }}>
              <div style={{ display:'flex', gap:6, marginBottom:5, flexWrap:'wrap' }}>
                <span style={{ background:getType(s.type).bg, color:getType(s.type).text, padding:'1px 5px', fontSize:7, fontFamily:'monospace' }}>{getType(s.type).label}</span>
                <span style={{ fontSize:8, color:'#2a3a4a', fontFamily:'monospace' }}>{s.topic}</span>
              </div>
              <div style={{ fontSize:12, color:'#ccc8be', lineHeight:1.4, fontFamily:'monospace' }}>{s.title.slice(0, 90)}{s.title.length > 90 ? '...' : ''}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize:8, color:'#1c2a38', fontFamily:'monospace', textAlign:'center', lineHeight:1.8 }}>
        All content presented for independent research & educational purposes only. The Nexus does not endorse any position.
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SOURCES VIEW — /sources
// ═════════════════════════════════════════════════════════════════════════════
function SourcesView({ SOURCES, getType, sidebarProps }) {
  useEffect(() => {
    updateMeta('Source Directory | The Nexus', 'Browse 600+ sources across research, archives, news, and community.', 'https://nexusverse.app/sources');
  }, []);
  return (
    <div style={{ display:'flex', gap:0 }}>
      <Sidebar {...sidebarProps} />
      <div style={{ flex:1 }}>
        <div style={{ marginBottom:16 }}>
          <div className="bb" style={{ fontSize:20, letterSpacing:2, color:'#eeeae0' }}>SOURCE DIRECTORY</div>
          <div style={{ fontSize:8, color:'#1c2a38', marginTop:3, fontFamily:'monospace' }}>
            {SOURCES.reduce((acc, g) => acc + g.items.length, 0)} sources across {SOURCES.length} categories
          </div>
        </div>
        {SOURCES.map(group => {
          const t = getType(group.type);
          return (
            <div key={group.label} style={{ marginBottom:22 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8, paddingBottom:6, borderBottom:'1px solid #1c2330' }}>
                <span style={{ background:t.bg, color:t.text, padding:'1px 6px', fontFamily:'monospace', fontSize:7, letterSpacing:.5 }}>{t.label}</span>
                <span style={{ fontSize:9, color:'#2a3a4a', fontFamily:'monospace' }}>{group.label}</span>
                <span style={{ fontSize:8, color:'#1c2a38', fontFamily:'monospace' }}>({group.items.length})</span>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:5 }}>
                {group.items.map(item => (
                  <a key={item.n} href={item.u} target="_blank" rel="noopener noreferrer"
                    style={{ background:'#0b0d14', border:'1px solid #1c2330', padding:'9px 12px', display:'flex', alignItems:'center', justifyContent:'space-between', transition:'border-color .12s', textDecoration:'none' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = t.text + '44'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = '#1c2330'}>
                    <span style={{ fontSize:10, color:'#7a8a9a', fontFamily:'monospace' }}>{item.n}</span>
                    <span style={{ color:'#2a3a4a', fontSize:10 }}>↗</span>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// COMMUNITY VIEW — /community
// ═════════════════════════════════════════════════════════════════════════════
function CommunityView({ posts, setPosts, isAdmin, sidebarProps, showForm, setShowForm, showSrc, setShowSrc,
  np, setNp, refs, setRefs, uploads, setUploads, drag, setDrag, disc, setDisc, cSort, setCSort,
  imgRef, docRef, handleFiles, submitPost, TOPICS, REGIONS, CT_LABELS, CONF_LABELS, CONF_COLORS, fmtNum, toast2 }) {
  useEffect(() => { updateMeta('Community Board | The Nexus', 'Submit and discuss independent research records.', 'https://nexusverse.app/community'); }, []);
  let ps = [...posts];
  if (cSort === 'Hot')  ps.sort((a, b) => (b.upvotes + b.comments * 2) - (a.upvotes + a.comments * 2));
  if (cSort === 'Top')  ps.sort((a, b) => b.upvotes - a.upvotes);
  ps = [...ps.filter(p => p.pinned), ...ps.filter(p => !p.pinned)];

  return (
    <div style={{ display:'flex', gap:0 }}>
      <Sidebar {...sidebarProps} />
      <div style={{ flex:1 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14, flexWrap:'wrap', gap:8 }}>
          <div>
            <div className="bb" style={{ fontSize:20, letterSpacing:2, color:'#eeeae0' }}>COMMUNITY BOARD</div>
            <div style={{ fontSize:8, color:'#1c2a38', fontFamily:'monospace' }}>Field reports · Evidence · Analysis · Source links required</div>
          </div>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            {['Hot','New','Top'].map(s => (
              <button key={s} onClick={() => setCSort(s)} style={{ background:cSort===s?'#1c2330':'transparent', border:`1px solid ${cSort===s?'#3a4a5a':'#1c2330'}`, color:cSort===s?'#ccc8be':'#2a3a4a', padding:'4px 10px', fontFamily:'monospace', fontSize:8, cursor:'pointer' }}>{s}</button>
            ))}
            <button onClick={() => setShowForm(p => !p)} style={{ background:'#b02020', border:'none', color:'#fff', padding:'6px 14px', fontFamily:'monospace', fontSize:8, letterSpacing:1, cursor:'pointer' }}>+ Submit Record</button>
          </div>
        </div>
        {ps.map(post => (
          <div key={post.id} className="card fade" style={{ display:'flex', gap:10, padding:'12px 14px', marginBottom:3 }}>
            <div style={{ width:38, flexShrink:0, display:'flex', flexDirection:'column', alignItems:'center', gap:3, paddingTop:2 }}>
              <button onClick={() => setPosts(p => p.map(pp => pp.id===post.id?{...pp,upvotes:pp.upvotes+1}:pp))}
                style={{ background:'none', border:'1px solid #1c2330', color:'#2a3a4a', width:26, height:22, cursor:'pointer', fontSize:10 }}>▲</button>
              <span style={{ fontSize:11, color:'#4a5a6a', fontFamily:'monospace' }}>{fmtNum(post.upvotes)}</span>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'flex', gap:6, alignItems:'center', marginBottom:5, flexWrap:'wrap' }}>
                {post.pinned && <span style={{ fontSize:7, color:'#c08020', background:'#1e1808', border:'1px solid #3a2a10', padding:'1px 5px', fontFamily:'monospace' }}>📌 PINNED</span>}
                <span style={{ fontSize:9, color:'#b02020', fontFamily:'monospace' }}>u/{post.user}</span>
                <span style={{ fontSize:8, color:'#eeeae0', background:'#1c2330', padding:'1px 6px', fontFamily:'monospace' }}>{post.badge}</span>
                <span style={{ fontSize:8, color:'#1c2a38', fontFamily:'monospace' }}>{post.time} · {post.region}</span>
              </div>
              <div className="bk" style={{ fontSize:15, color:'#d8d0c4', lineHeight:1.3, marginBottom:6 }}>{post.title}</div>
              {post.body && <div style={{ fontSize:10, color:'#3a4a5a', lineHeight:1.65, marginBottom:7, fontFamily:'monospace' }}>{post.body}</div>}
              {post.refs?.length > 0 && (
                <div style={{ background:'#07080c', border:'1px solid #1c2a1a', padding:'8px 10px', marginBottom:7 }}>
                  <div style={{ fontSize:7, color:'#2a4a2a', letterSpacing:1, textTransform:'uppercase', marginBottom:5, fontFamily:'monospace' }}>📚 Sources ({post.refs.length})</div>
                  {post.refs.map((ref, i) => (
                    <a key={i} href={ref.url} target="_blank" rel="noopener noreferrer"
                      style={{ display:'flex', alignItems:'center', gap:6, padding:'4px 7px', background:'#0b0d14', border:'1px solid #1c2330', marginBottom:3, textDecoration:'none' }}>
                      <span style={{ fontSize:9, color:'#5a9ac8', flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', fontFamily:'monospace' }}>{ref.label || ref.url}</span>
                      <span style={{ color:'#2a3a4a', fontSize:9 }}>↗</span>
                    </a>
                  ))}
                </div>
              )}
              <div style={{ display:'flex', gap:12 }}>
                <span style={{ fontSize:9, color:'#1c2a38', fontFamily:'monospace' }}>💬 {post.comments}</span>
                {isAdmin && (
                  <>
                    <button onClick={() => setPosts(p => p.map(pp => pp.id===post.id?{...pp,pinned:!pp.pinned}:pp))}
                      style={{ background:'none', border:'1px solid #1c2330', color:'#3a4a5a', fontSize:7, cursor:'pointer', padding:'2px 6px', fontFamily:'monospace' }}>{post.pinned?'Unpin':'Pin'}</button>
                    <button onClick={() => { setPosts(p => p.filter(pp => pp.id!==post.id)); toast2('Removed'); }}
                      style={{ background:'#200a0a', border:'1px solid #4a1a1a', color:'#c04040', fontSize:7, cursor:'pointer', padding:'2px 6px', fontFamily:'monospace' }}>Remove</button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// REDDIT VIEW — /reddit
// ═════════════════════════════════════════════════════════════════════════════
function RedditView({ rPosts, rLoad, sub, setSub, rSort, setRSort, fetchReddit, REDDIT_SUBS, sidebarProps }) {
  useEffect(() => { updateMeta('Reddit Feed | The Nexus', 'Live posts from 24+ research subreddits.', 'https://nexusverse.app/reddit'); }, []);
  return (
    <div style={{ display:'flex', gap:0 }}>
      <Sidebar {...sidebarProps} />
      <div style={{ flex:1 }}>
        <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:14 }}>
          {REDDIT_SUBS.map(s => (
            <button key={s.name} onClick={() => { setSub(s); fetchReddit(s, rSort); }}
              style={{ background:sub.name===s.name?'#0b0d14':'transparent', border:`1px solid ${sub.name===s.name?s.color:'#1c2330'}`, color:sub.name===s.name?s.color:'#2a3a4a', padding:'4px 11px', fontFamily:'monospace', fontSize:9, cursor:'pointer' }}>
              {s.name}
            </button>
          ))}
          <div style={{ marginLeft:'auto', display:'flex', gap:4 }}>
            {['hot','new','top','rising'].map(s => (
              <button key={s} onClick={() => { setRSort(s); fetchReddit(sub, s); }}
                style={{ background:rSort===s?'#1c2330':'transparent', border:`1px solid ${rSort===s?'#3a4a5a':'#1c2330'}`, color:rSort===s?'#8a9aaa':'#2a3a4a', padding:'4px 9px', fontFamily:'monospace', fontSize:8, cursor:'pointer' }}>{s}</button>
            ))}
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
          <div className="bb" style={{ fontSize:18, letterSpacing:2, color:sub.color }}>{sub.name}</div>
          <span style={{ fontSize:8, color:'#1c2a38', fontFamily:'monospace' }}>{sub.desc}</span>
          <a href={sub.url} target="_blank" rel="noopener noreferrer" style={{ marginLeft:'auto', background:'#b02020', color:'#fff', padding:'4px 12px', fontFamily:'monospace', fontSize:8, textDecoration:'none' }}>Open on Reddit ↗</a>
        </div>
        {rLoad && <div style={{ fontSize:10, color:'#2a3a4a', textAlign:'center', padding:32, fontFamily:'monospace' }}>Loading {sub.name}…</div>}
        {!rLoad && !rPosts.length && <div style={{ fontSize:10, color:'#1c2a38', textAlign:'center', padding:32, fontFamily:'monospace' }}>Select a subreddit above to load live posts</div>}
        {rPosts.map(post => (
          <div key={post.id} className="card fade" style={{ display:'flex', gap:10, padding:'11px 13px', marginBottom:3 }}>
            <div style={{ width:42, flexShrink:0, textAlign:'center', paddingTop:2 }}>
              <span style={{ color:'#ff6030', fontSize:13 }}>▲</span>
              <div style={{ fontSize:10, color:post.score>1000?'#ff6030':'#4a5a6a', fontFamily:'monospace' }}>{post.score>=1000?(post.score/1000).toFixed(1)+'k':post.score}</div>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'flex', gap:6, alignItems:'center', marginBottom:4, flexWrap:'wrap' }}>
                <span style={{ background:'#1a0a04', color:'#e06030', padding:'1px 5px', fontSize:7, fontFamily:'monospace' }}>REDDIT</span>
                <span style={{ fontSize:8, color:'#e06030', fontFamily:'monospace' }}>r/{post.subreddit}</span>
                <span style={{ fontSize:8, color:'#1c2a38', fontFamily:'monospace' }}>u/{post.author}</span>
              </div>
              <a href={post.permalink} target="_blank" rel="noopener noreferrer" className="bk"
                style={{ fontSize:14, color:'#d8d0c4', display:'block', marginBottom:4, lineHeight:1.3, textDecoration:'none' }}>
                {post.title}
              </a>
              {post.selftext && <div style={{ fontSize:9, color:'#2a3a4a', lineHeight:1.55, marginBottom:5, fontFamily:'monospace' }}>{post.selftext}…</div>}
              <div style={{ display:'flex', gap:12 }}>
                <a href={post.permalink} target="_blank" rel="noopener noreferrer" style={{ fontSize:9, color:'#2a3a4a', fontFamily:'monospace' }}>💬 {post.numComments}</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// LIBRARY VIEW — /library
// ═════════════════════════════════════════════════════════════════════════════
function LibraryView({ MEDIA_LIBRARY, libType, setLibType, libTopic, setLibTopic, libQ, setLibQ, sidebarProps, TYPE_ICON, TYPE_CLR }) {
  useEffect(() => { updateMeta('Media Library | The Nexus', 'Books, documentaries, films, and articles on suppressed history and independent research.', 'https://nexusverse.app/library'); }, []);
  const tm = { Books:'book', Documentaries:'documentary', Films:'film', Articles:'article' };
  const filt = MEDIA_LIBRARY.filter(m => {
    if (libType !== 'All' && m.type !== tm[libType]) return false;
    if (libTopic !== 'All Topics' && m.topic !== libTopic) return false;
    if (libQ) {
      const q = libQ.toLowerCase();
      return m.title.toLowerCase().includes(q) || m.author?.toLowerCase().includes(q) || m.tags?.some(t => t.toLowerCase().includes(q));
    }
    return true;
  });
  const groups = ['book','documentary','film','article'].map(type => ({ type, items: filt.filter(m => m.type === type) })).filter(g => g.items.length > 0);
  const tLabel = { book:'BOOKS', documentary:'DOCUMENTARIES', film:'FILMS', article:'ARTICLES' };

  return (
    <div style={{ display:'flex', gap:0 }}>
      <Sidebar {...sidebarProps} />
      <div style={{ flex:1 }}>
        <div style={{ marginBottom:14 }}>
          <div className="bb" style={{ fontSize:20, letterSpacing:2, color:'#eeeae0' }}>MEDIA & REFERENCE LIBRARY</div>
          <div style={{ fontSize:8, color:'#1c2a38', marginTop:3, fontFamily:'monospace' }}>{MEDIA_LIBRARY.length} references</div>
        </div>
        <div style={{ display:'flex', gap:6, marginBottom:14, flexWrap:'wrap', alignItems:'center' }}>
          {['All','Books','Documentaries','Films','Articles'].map(t => (
            <button key={t} onClick={() => setLibType(t)}
              style={{ background:libType===t?'#1c2330':'transparent', border:`1px solid ${libType===t?'#3a4a5a':'#1c2330'}`, color:libType===t?'#ccc8be':'#2a3a4a', padding:'4px 12px', fontFamily:'monospace', fontSize:8, cursor:'pointer' }}>
              {t}
            </button>
          ))}
          <select value={libTopic} onChange={e => setLibTopic(e.target.value)} style={{ background:'#0b0d14', border:'1px solid #1c2330', color:'#4a5a6a', padding:'4px 8px', fontFamily:'monospace', fontSize:8, outline:'none' }}>
            <option>All Topics</option>
            {[...new Set(MEDIA_LIBRARY.map(m => m.topic))].map(t => <option key={t}>{t}</option>)}
          </select>
          <input value={libQ} onChange={e => setLibQ(e.target.value)} placeholder="Search library..." style={{ flex:1, minWidth:140, background:'#0b0d14', border:'1px solid #1c2330', color:'#ccc8be', padding:'4px 9px', fontFamily:'monospace', fontSize:10, outline:'none' }} />
        </div>
        {groups.length === 0 && <div style={{ fontSize:10, color:'#1c2a38', textAlign:'center', padding:32, fontFamily:'monospace' }}>No results. Try clearing filters.</div>}
        {groups.map(group => (
          <div key={group.type} style={{ marginBottom:26 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10, paddingBottom:6, borderBottom:'1px solid #1c2330' }}>
              <span style={{ fontSize:18 }}>{TYPE_ICON[group.type] || '📄'}</span>
              <span className="bb" style={{ fontSize:16, letterSpacing:2, color:TYPE_CLR[group.type] || '#ccc8be' }}>{tLabel[group.type]}</span>
              <span style={{ fontSize:8, color:'#1c2a38', fontFamily:'monospace' }}>{group.items.length} titles</span>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(275px,1fr))', gap:7 }}>
              {group.items.map(m => (
                <a key={m.id + m.title} href={m.url} target="_blank" rel="noopener noreferrer"
                  style={{ background:'#0b0d14', border:'1px solid #1c2330', padding:'14px', display:'block', textDecoration:'none' }}>
                  <div style={{ display:'flex', gap:9, marginBottom:8 }}>
                    <div style={{ width:36, height:36, background:'#1a1a2a', border:'1px solid #2a2a3a', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>{TYPE_ICON[m.type] || '📄'}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:7, color:TYPE_CLR[m.type]||'#ccc8be', letterSpacing:.5, textTransform:'uppercase', marginBottom:2, fontFamily:'monospace' }}>{m.type?.toUpperCase()} · {m.year}</div>
                      <div className="bk" style={{ fontSize:13, color:'#d8d0c4', lineHeight:1.25 }}>{m.title}</div>
                      <div style={{ fontSize:8, color:'#3a4a5a', marginTop:2, fontFamily:'monospace' }}>{m.author}</div>
                    </div>
                    <div style={{ flexShrink:0, textAlign:'right' }}>
                      <div style={{ fontSize:8, color:'#c08030' }}>{'★'.repeat(Math.floor(m.rating||0))}</div>
                      <div style={{ fontSize:7, color:'#2a3a4a', fontFamily:'monospace' }}>{m.rating}/5</div>
                    </div>
                  </div>
                  <div style={{ fontSize:9, color:'#3a4a5a', lineHeight:1.6, marginBottom:8, fontFamily:'monospace' }}>{m.desc}</div>
                  <div style={{ fontSize:8, color:TYPE_CLR[m.type]||'#ccc8be', fontFamily:'monospace' }}>{m.type === 'book' ? 'Read / Buy ↗' : 'Watch ↗'}</div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// AI VIEW — /ai
// ═════════════════════════════════════════════════════════════════════════════
function AiView({ sidebarProps }) {
  useEffect(() => { updateMeta('Analysis Engine | The Nexus', 'AI-powered investigative analysis of unresolved events and suppressed history.', 'https://nexusverse.app/ai'); }, []);
  return (
    <div style={{ display:'flex', gap:0 }}>
      <Sidebar {...sidebarProps} />
      <div style={{ flex:1 }}>
        <div style={{ marginBottom:12 }}>
          <div className="bb" style={{ fontSize:20, letterSpacing:2, color:'#eeeae0' }}>ANALYSIS ENGINE</div>
        </div>
        <div style={{ background:'#07080c', border:'1px solid #1c2330', padding:48, textAlign:'center' }}>
          <div style={{ fontSize:32, marginBottom:16 }}>🔬</div>
          <div className="bb" style={{ fontSize:18, letterSpacing:2, color:'#eeeae0', marginBottom:10 }}>COMING SOON</div>
          <div style={{ fontSize:10, color:'#3a4a5a', fontFamily:'monospace', lineHeight:1.8, maxWidth:420, margin:'0 auto 24px' }}>
            AI-powered analysis of unresolved events, classified programs, and suppressed history is being configured. Add your OpenRouter API key to data.js to activate.
          </div>
          <div style={{ background:'#0b0d14', border:'1px solid #1a3a1a', padding:'12px 20px', display:'inline-block' }}>
            <span style={{ fontSize:9, color:'#40c070', fontFamily:'monospace', letterSpacing:1 }}>✓ COMING IN NEXT UPDATE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ADMIN VIEW — /admin
// ═════════════════════════════════════════════════════════════════════════════
function AdminView({ stories, posts, setPosts, setUser, navigate, ADMIN_USER, ADMIN_PASS, toast2, fmtNum, sidebarProps }) {
  return (
    <div style={{ display:'flex', gap:0 }}>
      <Sidebar {...sidebarProps} />
      <div style={{ flex:1 }}>
        <div style={{ background:'#1e1808', border:'1px solid #4a3a10', padding:'12px 16px', marginBottom:16, display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontSize:18 }}>⚙️</span>
          <div>
            <div className="bb" style={{ fontSize:18, letterSpacing:2, color:'#e0c060' }}>ADMIN CONTROL CENTER</div>
            <div style={{ fontSize:8, color:'#5a4a20', fontFamily:'monospace' }}>Master admin · Login: {ADMIN_USER}</div>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginBottom:16 }}>
          {[{ l:'Total Stories', v:stories.length, c:'#5a9ac8' }, { l:'Community Posts', v:posts.length, c:'#40c070' }].map(s => (
            <div key={s.l} style={{ background:'#0b0d14', border:'1px solid #1c2330', padding:'12px 14px' }}>
              <div style={{ fontSize:8, color:'#2a3a4a', marginBottom:4, fontFamily:'monospace' }}>{s.l}</div>
              <div className="bb" style={{ fontSize:22, letterSpacing:1, color:s.c }}>{s.v}</div>
            </div>
          ))}
        </div>
        <div style={{ background:'#0b0d14', border:'1px solid #1c2330', padding:'14px 16px' }}>
          <div style={{ fontSize:9, color:'#4a3a10', letterSpacing:1, marginBottom:10, textTransform:'uppercase', fontFamily:'monospace' }}>Community Moderation</div>
          {posts.map(post => (
            <div key={post.id} style={{ display:'flex', alignItems:'flex-start', gap:8, padding:'8px 0', borderBottom:'1px solid #1c2330' }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:9, color:'#7a8a9a', marginBottom:2, fontFamily:'monospace' }}>u/{post.user} · {post.time}</div>
                <div className="bk" style={{ fontSize:12, color:'#ccc8be', lineHeight:1.3 }}>{post.title}</div>
              </div>
              <div style={{ display:'flex', gap:4, flexShrink:0 }}>
                <button onClick={() => { setPosts(p => p.map(pp => pp.id===post.id?{...pp,pinned:!pp.pinned}:pp)); toast2(post.pinned?'Unpinned':'Pinned'); }}
                  style={{ background:'transparent', border:'1px solid #1c2330', color:'#3a4a5a', padding:'3px 7px', fontSize:7, cursor:'pointer', fontFamily:'monospace' }}>{post.pinned?'Unpin':'Pin'}</button>
                <button onClick={() => { setPosts(p => p.filter(pp => pp.id!==post.id)); toast2('Removed'); }}
                  style={{ background:'#200a0a', border:'1px solid #4a1a1a', color:'#c04040', padding:'3px 7px', fontSize:7, cursor:'pointer', fontFamily:'monospace' }}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
