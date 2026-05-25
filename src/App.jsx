/**
 * THE NEXUS — React Router Integration
 * 
 * SETUP (run once in your project):
 *   npm install react-router-dom
 * 
 * Then replace your existing App.jsx with this file.
 * 
 * What this fixes:
 *  ✓ Every article gets its own URL: nexusverse.app/record/operation-paperclip
 *  ✓ Topic filters get URLs: nexusverse.app/feed?topic=Hidden+History
 *  ✓ Browser back/forward buttons work
 *  ✓ Google can index every article individually
 *  ✓ Social share links point to specific articles
 *  ✓ Sitemap can list real URLs
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
  Link,
} from 'react-router-dom';

import { CSS, VBadge, Sidebar, PrivacyModal, SubmitSourceForm } from './components.jsx';
import {
  ADMIN_USER, ADMIN_PASS, TOPICS, REGIONS, VERDICTS, MEDIA_LIBRARY,
  SEED_STORIES, SEED_POSTS, REDDIT_SUBS, SOURCES,
  autoVerdict, getType, fmtNum, OPENROUTER_KEY, AI_MODEL,
} from './data.js';

// ── helpers ──────────────────────────────────────────────────────────────────

// Turn a story title into a URL slug: "Operation Paperclip" → "operation-paperclip"
const slugify = str =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 80);

// Make sure every seed story has a stable slug
const STORIES_WITH_SLUGS = SEED_STORIES.map(s => ({
  ...s,
  slug: s.slug || slugify(s.title),
}));

// ── AI helper ─────────────────────────────────────────────────────────────────
const callAI = async (system, userMsg, history = [], maxTokens = 900) => {
  const messages = [
    ...(history.length ? history.map(m => ({ role: m.role, content: m.content })) : []),
    { role: 'user', content: userMsg },
  ];
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
      messages: [{ role: 'system', content: system }, ...messages],
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

// ═════════════════════════════════════════════════════════════════════════════
// ROOT — wraps everything in BrowserRouter
// ═════════════════════════════════════════════════════════════════════════════
export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// INNER APP — all state lives here, router hooks available
// ═════════════════════════════════════════════════════════════════════════════
function AppInner() {
  const navigate  = useNavigate();
  const location  = useLocation();

  // derive active nav tab from pathname
  const pathTab = location.pathname.split('/')[1] || 'home';
  const view = ['feed','sources','community','reddit','library','ai','admin'].includes(pathTab)
    ? pathTab : 'home';

  // ── User state ────────────────────────────────────────────────────────────
  const [user, setUser]     = useState({ plan: 'free', isAdmin: false });
  const isAdmin = user.isAdmin;

  // ── Content state ─────────────────────────────────────────────────────────
  const [stories, setStories] = useState(STORIES_WITH_SLUGS);
  const [posts,   setPosts]   = useState(SEED_POSTS);
  const [votes,   setVotes]   = useState({});
  const [verdicts,setVerdicts]= useState({});
  const [saved,   setSaved]   = useState({});
  const [loading, setLoading] = useState(false);

  // ── Filters (synced to URL search params on /feed) ────────────────────────
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
    const params = {};
    if (next.topic   !== 'All Topics')   params.topic   = next.topic;
    if (next.region  !== 'All Regions')  params.region  = next.region;
    if (next.srcType !== 'All Sources')  params.srcType = next.srcType;
    if (next.sortBy  !== 'Latest')       params.sortBy  = next.sortBy;
    if (next.search)                     params.search  = next.search;
    if (next.verdict !== 'All')          params.verdict = next.verdict;
    setSearchParams(params);
  };

  // ── Reddit ────────────────────────────────────────────────────────────────
  const [rPosts, setRPosts] = useState([]);
  const [rLoad,  setRLoad]  = useState(false);
  const [sub,    setSub]    = useState(REDDIT_SUBS[0]);
  const [rSort,  setRSort]  = useState('hot');

  // ── Community form ────────────────────────────────────────────────────────
  const [showForm, setShowForm] = useState(false);
  const [showSrc,  setShowSrc]  = useState(false);
  const [np, setNp] = useState({ title: '', body: '', topic: TOPICS[1], region: '🌍 Global', contentType: 'research', confidence: 'unverified', tags: '' });
  const [refs,    setRefs]    = useState([{ label: '', url: '' }]);
  const [uploads, setUploads] = useState([]);
  const [drag,    setDrag]    = useState(false);
  const [disc,    setDisc]    = useState(false);
  const [cSort,   setCSort]   = useState('Hot');

  // ── Library filters ───────────────────────────────────────────────────────
  const [libType,  setLibType]  = useState('All');
  const [libTopic, setLibTopic] = useState('All Topics');
  const [libQ,     setLibQ]     = useState('');

  // ── AI chat ───────────────────────────────────────────────────────────────
  const [chat,   setChat]   = useState([{ role: 'assistant', content: 'I analyze unresolved events, disputed records, and suppressed history. Ask about any topic — evidence from all sides with primary sources and relevant book/documentary recommendations.' }]);
  const [aiIn,   setAiIn]   = useState('');
  const [aiLoad, setAiLoad] = useState(false);
  const chatEnd = useRef(null);

  // ── Modals ────────────────────────────────────────────────────────────────
  const [showPrivacy, setShowPrivacy] = useState(false);

  // ── Refs ──────────────────────────────────────────────────────────────────
  const imgRef = useRef(null);
  const docRef = useRef(null);

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: 'smooth' }); }, [chat]);

  // ── Toast ─────────────────────────────────────────────────────────────────
  const [toast, setToast] = useState(null);
  const toast2 = msg => { setToast(msg); setTimeout(() => setToast(null), 2200); };

  // ── Fetch more stories ────────────────────────────────────────────────────
  const fetchMore = useCallback(async (hint = '') => {
    setLoading(true);
    try {
      const used = stories.slice(0, 6).map(s => s.title).join('; ');
      const system = `Generate 5 investigative research stories as a JSON array. No markdown, no backticks, output raw JSON only. Each object: {type:"news"|"blog"|"archive"|"research", source:"outlet name", sourceUrl:"url", topic:"one of: Government & Intelligence, Unresolved Events, Hidden History, Health & Science, Finance & Power, UAP & Anomalous, Ancient Civilizations, Forbidden Science, Lost Technology, Remote Viewing & PSI, Portals & Stargates, Animal Intelligence, Giants & Nephilim, Biblical & Religious Records", region:"flag + country", title:"specific headline", summary:"2-3 sentences with real names and document references", tags:["tag1","tag2","tag3"], credible:50-97, debunked:100-credible, upvotes:500-9000, comments:50-2000}. Use real outlets. Do not repeat: ${used}`;
      const raw = await callAI(system, hint ? `Focus on: ${hint}` : 'Generate diverse stories across all topics', [], 1200);
      const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());
      const newStories = parsed.map((s, i) => ({
        ...s,
        id: `ai-${Date.now()}-${i}`,
        slug: slugify(s.title),
        time: `${i + 1}h ago`,
      }));
      setStories(prev => [...newStories, ...prev]);
      toast2(`✓ ${newStories.length} new records loaded`);
    } catch { toast2('All records loaded — check back soon for more'); }
    finally { setLoading(false); }
  }, [stories]);

  // ── Fetch Reddit ──────────────────────────────────────────────────────────
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
        }))
        .filter(p => !p.stickied);
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
      const system = `You are an expert investigative analyst for The Nexus. Never use the word "conspiracy." Use: "disputed record," "unresolved event," "declassified program," "suppressed evidence."

Format every response:
**The Record:** [one sentence]
**Evidence Supporting It:** [3-4 bullets with real sources, names, dates]
**Official Position / Counter-Evidence:** [3-4 bullets]
**Key Primary Sources:** [2-3 named documents or researchers]
**Further Reading:** [suggest 1-2 relevant books or documentaries]

Be precise. Max 360 words.`;
      const reply = await callAI(system, msg, chat, 900);
      setChat(p => [...p, { role: 'assistant', content: reply || 'Analysis unavailable.' }]);
    } catch {
      setChat(p => [...p, { role: 'assistant', content: 'Connection error. Please check your OpenRouter API key in data.js.' }]);
    } finally { setAiLoad(false); }
  };

  // ── File uploads ──────────────────────────────────────────────────────────
  const handleFiles = files => Array.from(files).forEach(f => {
    const r = new FileReader();
    r.onload = ev => {
      const type = f.type.startsWith('image/') ? 'image' : f.type === 'application/pdf' ? 'pdf' : 'doc';
      setUploads(p => [...p, { type, name: f.name, data: ev.target.result, size: f.size }]);
    };
    r.readAsDataURL(f);
  });

  // ── Submit community post ─────────────────────────────────────────────────
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
    setNp({ title: '', body: '', topic: TOPICS[1], region: '🌍 Global', contentType: 'research', confidence: 'unverified', tags: '' });
    setRefs([{ label: '', url: '' }]);
    setUploads([]); setShowForm(false); setDisc(false);
    toast2('✓ Record submitted to community');
  };

  // ── Filtered stories ──────────────────────────────────────────────────────
  const { topic, region, srcType, sortBy, search, verdict } = filters;
  const filteredStories = stories.filter(s => {
    if (topic !== 'All Topics'   && s.topic?.trim()  !== topic.trim())   return false;
    if (region !== 'All Regions' && s.region?.trim() !== region.trim())  return false;
    if (srcType !== 'All Sources') {
      const m = { News: 'news', Blogs: 'blog', Archives: 'archive', Research: 'research', Podcasts: 'podcast', Community: 'user' };
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

  // ── Nav helper ────────────────────────────────────────────────────────────
  const goTo = (path) => navigate(path);

  const sidebarProps = {
    filters, setFilters, isAdmin,
    onFetch: fetchMore,
    visibleTopics: TOPICS,
    visibleRegions: REGIONS,
    // when a topic pill is clicked in sidebar, navigate to /feed with that filter
    onTopicClick: (t) => { navigate(`/feed?topic=${encodeURIComponent(t)}`); },
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{CSS}</style>
      <div style={{ minHeight: '100vh', background: '#07080c', color: '#ccc8be' }}>

        {/* Toast */}
        {toast && (
          <div className="fade" style={{ position: 'fixed', bottom: 20, right: 20, background: '#10131e', border: '1px solid #2a3a4a', color: '#8a9aaa', padding: '8px 14px', fontSize: 11, zIndex: 9999, fontFamily: 'monospace' }}>
            {toast}
          </div>
        )}

        {/* NAV */}
        <div style={{ background: '#07080c', borderBottom: '1px solid #1c2330', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 48 }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0 }}>
              <div style={{ width: 18, height: 18, background: '#b02020', clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)' }} />
              <span className="bb" style={{ fontSize: 16, letterSpacing: 3, color: '#eeeae0' }}>THE NEXUS</span>
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', overflowX: 'auto', gap: 0 }}>
              {[
                ['/', 'home', 'Records'],
                ['/feed', 'feed', 'Records'],
                ['/sources', 'sources', 'Sources'],
                ['/community', 'community', 'Community'],
                ['/reddit', 'reddit', 'Reddit'],
                ['/library', 'library', 'Library'],
                ['/ai', 'ai', 'Analysis'],
                ...(isAdmin ? [['/admin', 'admin', 'Admin']] : []),
              ].filter(([,tab]) => tab !== 'home').map(([path, tab, label]) => (
                <Link key={tab} to={tab === 'reddit' && !rPosts.length ? path : path}
                  onClick={() => { if (tab === 'reddit' && !rPosts.length) fetchReddit(); }}
                  style={{
                    background: 'none', border: 'none',
                    borderBottom: view === tab ? '2px solid #b02020' : '2px solid transparent',
                    color: view === tab ? '#eeeae0' : '#3a4a5a',
                    padding: '0 9px', height: 48, fontFamily: 'monospace', fontSize: 9,
                    letterSpacing: .5, textTransform: 'uppercase', cursor: 'pointer',
                    whiteSpace: 'nowrap', flexShrink: 0, display: 'flex', alignItems: 'center',
                    textDecoration: 'none',
                  }}>
                  {label}
                </Link>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
              {isAdmin && <span style={{ fontSize: 8, color: '#e0c060', background: '#1e1808', border: '1px solid #4a3a10', padding: '2px 7px', fontFamily: 'monospace' }}>ADMIN</span>}
              {isAdmin && <button onClick={() => { clearSession(); setUser({ plan: 'free', isAdmin: false }); navigate('/'); }} style={{ background: 'none', border: '1px solid #1c2330', color: '#2a3a4a', padding: '3px 8px', fontFamily: 'monospace', fontSize: 9, cursor: 'pointer' }}>Exit</button>}
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '16px 12px' }}>
          <Routes>

            {/* HOME */}
            <Route path="/" element={
              <HomeView stories={stories} setFilters={setFilters} navigate={navigate} TOPICS={TOPICS} getType={getType} />
            } />

            {/* FEED — list of records */}
            <Route path="/feed" element={
              <FeedView
                stories={filteredStories} allCount={stories.length}
                filters={filters} setFilters={setFilters}
                votes={votes} setVotes={setVotes}
                verdicts={verdicts} autoVerdict={autoVerdict}
                saved={saved} setSaved={setSaved}
                sidebarProps={sidebarProps}
                fmtNum={fmtNum} getType={getType}
                toast2={toast2}
              />
            } />

            {/* INDIVIDUAL RECORD — has its own URL */}
            <Route path="/record/:slug" element={
              <RecordView
                stories={stories}
                votes={votes} setVotes={setVotes}
                verdicts={verdicts} setVerdicts={setVerdicts}
                saved={saved} setSaved={setSaved}
                VERDICTS={VERDICTS} MEDIA_LIBRARY={MEDIA_LIBRARY}
                autoVerdict={autoVerdict} getType={getType} fmtNum={fmtNum}
                setLibTopic={setLibTopic}
                toast2={toast2}
                navigate={navigate}
              />
            } />

            {/* SOURCES */}
            <Route path="/sources" element={<SourcesView SOURCES={SOURCES} getType={getType} sidebarProps={sidebarProps} />} />

            {/* COMMUNITY */}
            <Route path="/community" element={
              <CommunityView
                posts={posts} setPosts={setPosts}
                isAdmin={isAdmin} user={user}
                showForm={showForm} setShowForm={setShowForm}
                showSrc={showSrc} setShowSrc={setShowSrc}
                np={np} setNp={setNp}
                refs={refs} setRefs={setRefs}
                uploads={uploads} setUploads={setUploads}
                drag={drag} setDrag={setDrag}
                disc={disc} setDisc={setDisc}
                cSort={cSort} setCSort={setCSort}
                imgRef={imgRef} docRef={docRef}
                handleFiles={handleFiles} submitPost={submitPost}
                sidebarProps={sidebarProps}
                TOPICS={TOPICS} REGIONS={REGIONS}
                CT_LABELS={CT_LABELS} CONF_LABELS={CONF_LABELS} CONF_COLORS={CONF_COLORS}
                fmtNum={fmtNum} toast2={toast2}
              />
            } />

            {/* REDDIT */}
            <Route path="/reddit" element={
              <RedditView
                rPosts={rPosts} rLoad={rLoad}
                sub={sub} setSub={setSub}
                rSort={rSort} setRSort={setRSort}
                fetchReddit={fetchReddit}
                REDDIT_SUBS={REDDIT_SUBS}
                sidebarProps={sidebarProps}
              />
            } />

            {/* LIBRARY */}
            <Route path="/library" element={
              <LibraryView
                MEDIA_LIBRARY={MEDIA_LIBRARY}
                libType={libType} setLibType={setLibType}
                libTopic={libTopic} setLibTopic={setLibTopic}
                libQ={libQ} setLibQ={setLibQ}
                sidebarProps={sidebarProps}
                TYPE_ICON={TYPE_ICON} TYPE_CLR={TYPE_CLR}
              />
            } />

            {/* AI */}
            <Route path="/ai" element={<AiView sidebarProps={sidebarProps} />} />

            {/* ADMIN */}
            {isAdmin && (
              <Route path="/admin" element={
                <AdminView
                  stories={stories} posts={posts} setPosts={setPosts}
                  setUser={setUser} navigate={navigate}
                  ADMIN_USER={ADMIN_USER} ADMIN_PASS={ADMIN_PASS}
                  toast2={toast2} fmtNum={fmtNum}
                  sidebarProps={sidebarProps}
                />
              } />
            )}

            {/* 404 fallback */}
            <Route path="*" element={
              <div style={{ textAlign: 'center', padding: 60 }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>◈</div>
                <div className="bb" style={{ fontSize: 20, letterSpacing: 2, color: '#eeeae0', marginBottom: 12 }}>RECORD NOT FOUND</div>
                <Link to="/feed" style={{ color: '#b02020', fontFamily: 'monospace', fontSize: 12 }}>← Return to Records</Link>
              </div>
            } />

          </Routes>
        </div>

        {/* FOOTER */}
        <div style={{ borderTop: '1px solid #1c2330', marginTop: 32, padding: '12px 20px', background: '#07080c' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 8, color: '#1c2a38', fontFamily: 'monospace' }}>© 2025 The Nexus · nexusverse.app</span>
              <button onClick={() => setShowPrivacy(true)} style={{ background: 'none', border: 'none', color: '#3a4a5a', fontFamily: 'monospace', fontSize: 8, cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>Privacy Policy</button>
              <span style={{ fontSize: 8, color: '#1c2a38', fontFamily: 'monospace' }}>For independent research only · Adults 18+</span>
            </div>
            {/* Hidden admin — double-click dot */}
            <span
              onDoubleClick={() => {
                const u = window.prompt('Admin username:');
                const p = window.prompt('Admin password:');
                if (u === ADMIN_USER && p === ADMIN_PASS) {
                  saveSession({ plan: 'admin', isAdmin: true });
                  setUser({ plan: 'admin', isAdmin: true });
                  navigate('/admin');
                  toast2('Welcome, Admin');
                } else if (u || p) { toast2('Access denied'); }
              }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#1c2330', display: 'inline-block', cursor: 'default' }}
            />
          </div>
        </div>

        {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
      </div>
    </>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// INDIVIDUAL RECORD PAGE  →  /record/:slug
// This is the most important new piece — each article now has its own URL
// ═════════════════════════════════════════════════════════════════════════════
function RecordView({ stories, votes, setVotes, verdicts, setVerdicts, saved, setSaved, VERDICTS, MEDIA_LIBRARY, autoVerdict, getType, fmtNum, setLibTopic, toast2, navigate }) {
  const { slug } = useParams();
  const story = stories.find(s => s.slug === slug);

  // Update page title + meta description for this article (SEO)
  useEffect(() => {
    if (story) {
      document.title = `${story.title} | The Nexus`;
      let desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute('content', story.summary?.slice(0, 160) || '');
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', story.title);
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', story.summary?.slice(0, 200) || '');
      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute('content', `https://nexusverse.app/record/${slug}`);
      let canon = document.querySelector('link[rel="canonical"]');
      if (canon) canon.setAttribute('href', `https://nexusverse.app/record/${slug}`);
    }
    return () => {
      document.title = 'The Nexus — Suppressed History. Independent Research.';
    };
  }, [story, slug]);

  if (!story) return (
    <div style={{ textAlign: 'center', padding: 60 }}>
      <div style={{ fontSize: 32, marginBottom: 16 }}>◈</div>
      <div className="bb" style={{ fontSize: 20, letterSpacing: 2, color: '#eeeae0', marginBottom: 12 }}>RECORD NOT FOUND</div>
      <button onClick={() => navigate('/feed')} style={{ color: '#b02020', fontFamily: 'monospace', fontSize: 12, background: 'none', border: 'none', cursor: 'pointer' }}>← Return to Records</button>
    </div>
  );

  const v = votes[story.id];
  const articleUrl = `https://nexusverse.app/record/${slug}`;

  return (
    <div className="fade">
      <button onClick={() => navigate(-1)} style={{ background: '#0b0d14', border: '1px solid #2a3a4a', color: '#8a9aaa', fontFamily: 'monospace', fontSize: 10, cursor: 'pointer', marginBottom: 14, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>← Back to Records</button>
      <div className="card" style={{ padding: 22 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ background: getType(story.type).bg, color: getType(story.type).text, padding: '1px 6px', fontFamily: 'monospace', fontSize: 8 }}>{getType(story.type).label}</span>
          {story.sourceUrl
            ? <a href={story.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, color: '#5a9ac8', fontFamily: 'monospace' }}>{story.source} ↗</a>
            : <span style={{ fontSize: 10, color: '#5a7a9a', fontFamily: 'monospace' }}>{story.source}</span>}
          <span style={{ fontSize: 8, color: '#1c2a38', fontFamily: 'monospace' }}>{story.time} · {story.region}</span>
          <VBadge verdict={verdicts[story.id] || autoVerdict(story.credible)} />
        </div>
        <div className="bk" style={{ fontSize: 22, color: '#eeeae0', lineHeight: 1.25, marginBottom: 12 }}>{story.title}</div>
        <div className="bk" style={{ fontSize: 15, fontWeight: 300, color: '#7a8a9a', lineHeight: 1.8, marginBottom: 18, fontStyle: 'italic' }}>{story.summary}</div>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 18 }}>
          {story.tags?.map(t => <span key={t} style={{ fontSize: 8, background: '#10131e', border: '1px solid #1c2330', color: '#3a4a5a', padding: '1px 7px', fontFamily: 'monospace' }}>#{t}</span>)}
        </div>

        {/* Credibility */}
        <div style={{ background: '#07080c', border: '1px solid #1c2330', padding: 14, marginBottom: 12 }}>
          <div style={{ fontSize: 8, color: '#1c2a38', letterSpacing: 1, marginBottom: 8, textTransform: 'uppercase', fontFamily: 'monospace' }}>Community Credibility</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 10, color: '#40c070', fontFamily: 'monospace' }}>Accurate {story.credible}%</span>
            <span style={{ fontSize: 10, color: '#c04040', fontFamily: 'monospace' }}>{story.debunked}% Refuted</span>
          </div>
          <div className="cbar"><div className="cfill" style={{ width: `${story.credible}%` }} /></div>
          <div style={{ display: 'flex', gap: 7, marginTop: 10 }}>
            <button onClick={() => { if (!votes[story.id]) { setVotes(p => ({ ...p, [story.id]: 'up' })); toast2('Marked accurate'); } }}
              style={{ flex: 1, background: v === 'up' ? '#0a2010' : 'transparent', border: `1px solid ${v === 'up' ? '#2a6a2a' : '#1c2330'}`, color: v === 'up' ? '#40c070' : '#3a4a5a', padding: '6px', fontFamily: 'monospace', fontSize: 9, cursor: 'pointer' }}>▲ Accurate</button>
            <button onClick={() => { if (!votes[story.id]) { setVotes(p => ({ ...p, [story.id]: 'dn' })); toast2('Marked refuted'); } }}
              style={{ flex: 1, background: v === 'dn' ? '#200a0a' : 'transparent', border: `1px solid ${v === 'dn' ? '#6a2a2a' : '#1c2330'}`, color: v === 'dn' ? '#c04040' : '#3a4a5a', padding: '6px', fontFamily: 'monospace', fontSize: 9, cursor: 'pointer' }}>▼ Refuted</button>
          </div>
          <div style={{ marginTop: 10, borderTop: '1px solid #1c2330', paddingTop: 8 }}>
            <div style={{ fontSize: 8, color: '#1c2a38', letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase', fontFamily: 'monospace' }}>Your Verdict</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
              {Object.entries(VERDICTS).map(([k, vv]) => (
                <button key={k} onClick={() => { setVerdicts(p => ({ ...p, [story.id]: k })); toast2(`Verdict: ${vv.label}`); }}
                  style={{ background: verdicts[story.id] === k ? vv.color : 'transparent', border: `1px solid ${verdicts[story.id] === k ? vv.border : '#1c2330'}`, color: verdicts[story.id] === k ? vv.text : '#2a3a4a', padding: '4px 3px', fontFamily: 'monospace', fontSize: 8, cursor: 'pointer' }}>
                  {vv.icon} {vv.short}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 16 }}>
          {story.sourceUrl && <a href={story.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ background: '#b02020', color: '#fff', padding: '7px 16px', fontFamily: 'monospace', fontSize: 9 }}>Read Source ↗</a>}
          <button onClick={() => { setSaved(p => ({ ...p, [story.id]: !p[story.id] })); toast2(saved[story.id] ? 'Removed' : 'Saved'); }} style={{ background: 'transparent', border: '1px solid #1c2330', color: saved[story.id] ? '#c08030' : '#3a4a5a', padding: '7px 12px', fontFamily: 'monospace', fontSize: 9, cursor: 'pointer' }}>{saved[story.id] ? '* Saved' : 'Save'}</button>
        </div>

        {/* Share — now shares the ACTUAL article URL */}
        <div style={{ borderTop: '1px solid #1c2330', paddingTop: 12, marginBottom: 16 }}>
          <div style={{ fontSize: 8, color: '#1c2a38', letterSpacing: 1.5, textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 8 }}>Share This Record</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(story.title)}&url=${encodeURIComponent(articleUrl)}`}
              target="_blank" rel="noopener noreferrer"
              style={{ background: '#000', color: '#fff', padding: '7px 14px', fontFamily: 'monospace', fontSize: 9, textDecoration: 'none' }}>
              X / Twitter
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
              target="_blank" rel="noopener noreferrer"
              style={{ background: '#1877f2', color: '#fff', padding: '7px 14px', fontFamily: 'monospace', fontSize: 9, textDecoration: 'none' }}>
              Facebook
            </a>
            <button onClick={() => { navigator.clipboard?.writeText(articleUrl); toast2('Article link copied — paste into Instagram story'); }}
              style={{ background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', color: '#fff', padding: '7px 14px', fontFamily: 'monospace', fontSize: 9, border: 'none', cursor: 'pointer' }}>
              Copy for Instagram
            </button>
            <button onClick={() => { navigator.clipboard?.writeText(articleUrl); toast2('Link copied'); }}
              style={{ background: 'transparent', border: '1px solid #2a3a4a', color: '#5a6a7a', padding: '7px 12px', fontFamily: 'monospace', fontSize: 9, cursor: 'pointer' }}>
              Copy Link
            </button>
          </div>
          <div style={{ fontSize: 8, color: '#2a3a4a', fontFamily: 'monospace', marginTop: 6 }}>
            Direct link: {articleUrl}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// FEED VIEW  →  /feed
// ═════════════════════════════════════════════════════════════════════════════
function FeedView({ stories, allCount, filters, setFilters, votes, setVotes, verdicts, autoVerdict, saved, setSaved, sidebarProps, fmtNum, getType, toast2 }) {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', gap: 0 }}>
      <Sidebar {...sidebarProps} />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <div className="bb" style={{ fontSize: 20, letterSpacing: 2, color: '#eeeae0' }}>OPEN RECORDS</div>
            <div style={{ fontSize: 8, color: '#1c2a38', fontFamily: 'monospace' }}>
              {stories.length} of {allCount} records
              {filters.topic !== 'All Topics' && <span style={{ color: '#b02020', marginLeft: 6 }}>· {filters.topic}</span>}
            </div>
          </div>
        </div>
        {stories.map(s => {
          const t = getType(s.type);
          const v = votes[s.id];
          return (
            <div key={s.id} className="card fade" style={{ display: 'flex', padding: '11px 13px 11px 9px', marginBottom: 3, cursor: 'pointer' }}
              onClick={() => navigate(`/record/${s.slug}`)}>
              <div style={{ width: 38, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, paddingTop: 2 }}
                onClick={e => e.stopPropagation()}>
                <button style={{ background: v === 'up' ? '#0a2010' : 'none', border: `1px solid ${v === 'up' ? '#2a6a2a' : '#1c2330'}`, color: v === 'up' ? '#40c070' : '#2a3a4a', width: 26, height: 22, cursor: 'pointer', fontSize: 10 }}
                  onClick={() => { if (!v) setVotes(p => ({ ...p, [s.id]: 'up' })); }}>▲</button>
                <span style={{ fontSize: 11, color: '#4a5a6a', fontFamily: 'monospace' }}>{fmtNum(s.upvotes)}</span>
                <button style={{ background: v === 'dn' ? '#200a0a' : 'none', border: `1px solid ${v === 'dn' ? '#6a2a2a' : '#1c2330'}`, color: v === 'dn' ? '#c04040' : '#2a3a4a', width: 26, height: 22, cursor: 'pointer', fontSize: 10 }}
                  onClick={() => { if (!v) setVotes(p => ({ ...p, [s.id]: 'dn' })); }}>▼</button>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ background: t.bg, color: t.text, padding: '1px 5px', fontSize: 7, fontFamily: 'monospace' }}>{t.label}</span>
                  <span style={{ fontSize: 9, color: '#3a5a7a', fontFamily: 'monospace' }}>{s.source}</span>
                  <span style={{ fontSize: 8, color: '#1c2a38', fontFamily: 'monospace' }}>{s.time} · {s.region}</span>
                  <VBadge verdict={verdicts[s.id] || autoVerdict(s.credible)} />
                </div>
                <div className="bk" style={{ fontSize: 14, color: '#d8d0c4', lineHeight: 1.3, marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: 9, color: '#2a3a4a', lineHeight: 1.55, marginBottom: 5, fontFamily: 'monospace' }}>{s.summary?.slice(0, 130)}…</div>
                <div style={{ height: 2, background: '#1c2330', marginBottom: 4, maxWidth: 180 }}>
                  <div style={{ height: '100%', width: `${s.credible}%`, background: 'linear-gradient(90deg,#2a6a2a,#40c070)' }} />
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {s.tags?.map(tg => <span key={tg} style={{ fontSize: 7, color: '#1c2a38', fontFamily: 'monospace' }}>#{tg}</span>)}
                  <span style={{ fontSize: 9, color: '#1c2a38', marginLeft: 'auto', fontFamily: 'monospace' }}>💬 {fmtNum(s.comments)}</span>
                </div>
              </div>
            </div>
          );
        })}
        <div style={{ padding: '18px 0', textAlign: 'center', borderTop: '1px solid #0e1018', marginTop: 8 }}>
          <div style={{ fontSize: 8, color: '#1c2a38', fontFamily: 'monospace' }}>New records added regularly · Check back soon</div>
        </div>
      </div>
    </div>
  );
}

// Stub views — copy your existing view JSX into these (they're split out for clarity)
function HomeView({ stories, setFilters, navigate, TOPICS, getType }) {
  // paste your existing home view JSX here
  return <div><div className="bb" style={{fontSize:20,color:'#eeeae0',marginBottom:12}}>HOME</div><button onClick={()=>navigate('/feed')} style={{background:'#b02020',border:'none',color:'#fff',padding:'10px 20px',fontFamily:'monospace',fontSize:10,cursor:'pointer'}}>Enter the Archive →</button></div>;
}
function SourcesView({ SOURCES, getType, sidebarProps }) {
  // paste your existing sources view JSX here
  return <div className="bb" style={{fontSize:20,color:'#eeeae0'}}>SOURCES</div>;
}
function CommunityView(props) {
  // paste your existing community view JSX here
  return <div className="bb" style={{fontSize:20,color:'#eeeae0'}}>COMMUNITY</div>;
}
function RedditView(props) {
  // paste your existing reddit view JSX here
  return <div className="bb" style={{fontSize:20,color:'#eeeae0'}}>REDDIT</div>;
}
function LibraryView(props) {
  // paste your existing library view JSX here
  return <div className="bb" style={{fontSize:20,color:'#eeeae0'}}>LIBRARY</div>;
}
function AiView(props) {
  return <div className="bb" style={{fontSize:20,color:'#eeeae0'}}>ANALYSIS ENGINE</div>;
}
function AdminView(props) {
  return <div className="bb" style={{fontSize:20,color:'#eeeae0'}}>ADMIN</div>;
}
