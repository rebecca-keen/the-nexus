import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { SEED_STORIES, TOPICS, REGIONS, autoVerdict, getType } from '../src/data.js';
import { STORY_BODIES } from '../src/data.body.js';

function toSlug(str) {
  return (str || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
}

const STORIES = SEED_STORIES.map(s =>
  STORY_BODIES[s.id] ? { ...s, body: STORY_BODIES[s.id] } : s
);

const VERDICT_COLORS = { confirmed: '#40c070', likely: '#60c080', contested: '#c0a020', unverified: '#c07020' };
const VERDICT_LABELS = { confirmed: '✓', likely: '↑', contested: '⚖', unverified: '?' };

export default function RecordsIndex() {
  const [search, setSearch] = useState('');
  const [topic, setTopic] = useState('All Topics');
  const [sortBy, setSortBy] = useState('Latest');

  const filtered = STORIES.filter(s => {
    if (topic !== 'All Topics' && s.topic !== topic) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        s.title?.toLowerCase().includes(q) ||
        s.summary?.toLowerCase().includes(q) ||
        s.tags?.some(t => t.toLowerCase().includes(q)) ||
        s.topic?.toLowerCase().includes(q)
      );
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'Most Credible') return b.credible - a.credible;
    if (sortBy === 'Least Credible') return a.credible - b.credible;
    return 0;
  });

  return (
    <>
      <Head>
        <title>Open Records — The Nexus</title>
        <meta name="description" content={`${STORIES.length} investigative records covering UAP, declassified government programs, ancient history, surveillance, and suppressed science. Free. No sign-up.`} />
        <meta property="og:title" content="Open Records — The Nexus" />
        <meta property="og:description" content={`${STORIES.length} investigative records. Free. No sign-up.`} />
        <meta property="og:image" content="https://nexusverse.app/og-image.png" />
        <meta name="theme-color" content="#07080c" />
      </Head>

      <div style={{ minHeight: '100vh', background: '#07080c', color: '#ccc8be' }}>

        {/* NAV */}
        <div style={{ background: '#07080c', borderBottom: '1px solid #1c2330', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', gap: 16, height: 48 }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <div style={{ width: 18, height: 18, background: '#b02020', clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)' }} />
              <span style={{ fontSize: 16, letterSpacing: 3, color: '#eeeae0', fontWeight: 700, fontFamily: 'monospace' }}>THE NEXUS</span>
            </Link>
            {[['/', 'Home'], ['/records', 'Records'], ['/sources', 'Sources'], ['/community', 'Community'], ['/library', 'Library']].map(([href, label]) => (
              <Link key={href} href={href} style={{ color: href === '/records' ? '#eeeae0' : '#3a4a5a', padding: '0 4px', height: 48, display: 'flex', alignItems: 'center', fontFamily: 'monospace', fontSize: 9, letterSpacing: 0.5, textTransform: 'uppercase', textDecoration: 'none', borderBottom: href === '/records' ? '2px solid #b02020' : '2px solid transparent' }}>
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px 60px', display: 'flex', gap: 24 }}>

          {/* SIDEBAR */}
          <div style={{ width: 220, flexShrink: 0 }}>
            <div style={{ position: 'sticky', top: 64 }}>
              <div style={{ fontSize: 9, color: '#3a4a5a', letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 12 }}>Filter Records</div>

              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search records..."
                style={{ width: '100%', background: '#0b0d14', border: '1px solid #1c2330', color: '#ccc8be', padding: '8px 10px', fontFamily: 'monospace', fontSize: 10, outline: 'none', marginBottom: 10, boxSizing: 'border-box' }}
              />

              <div style={{ fontSize: 9, color: '#2a3a4a', fontFamily: 'monospace', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Topic</div>
              <select
                value={topic}
                onChange={e => setTopic(e.target.value)}
                style={{ width: '100%', background: '#0b0d14', border: '1px solid #1c2330', color: '#ccc8be', padding: '7px 8px', fontFamily: 'monospace', fontSize: 10, outline: 'none', marginBottom: 10 }}
              >
                {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>

              <div style={{ fontSize: 9, color: '#2a3a4a', fontFamily: 'monospace', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Sort</div>
              {['Latest', 'Most Credible', 'Least Credible'].map(s => (
                <button key={s} onClick={() => setSortBy(s)}
                  style={{ display: 'block', width: '100%', background: sortBy === s ? '#1c2330' : 'transparent', border: `1px solid ${sortBy === s ? '#3a4a5a' : '#1c2330'}`, color: sortBy === s ? '#ccc8be' : '#3a4a5a', padding: '6px 10px', fontFamily: 'monospace', fontSize: 9, cursor: 'pointer', textAlign: 'left', marginBottom: 4 }}>
                  {s}
                </button>
              ))}

              {(search || topic !== 'All Topics') && (
                <button onClick={() => { setSearch(''); setTopic('All Topics'); }}
                  style={{ marginTop: 8, background: 'transparent', border: '1px solid #b02020', color: '#b02020', padding: '5px 10px', fontFamily: 'monospace', fontSize: 9, cursor: 'pointer', width: '100%' }}>
                  Clear filters
                </button>
              )}

              <div style={{ marginTop: 20, fontSize: 9, color: '#2a3a4a', fontFamily: 'monospace' }}>
                {filtered.length} of {STORIES.length} records
              </div>
            </div>
          </div>

          {/* RECORD LIST */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: '#eeeae0', fontFamily: 'monospace', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Open Records</div>
              <div style={{ fontSize: 9, color: '#2a3a4a', fontFamily: 'monospace' }}>{filtered.length} records{topic !== 'All Topics' ? ` · ${topic}` : ''}</div>
            </div>

            {filtered.map(s => {
              const t = getType(s.type);
              const verdict = autoVerdict(s.credible);
              return (
                <Link key={s.id} href={`/records/${toSlug(s.title)}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#0b0d14', border: '1px solid #1a2030', marginBottom: 6, padding: '14px 16px', cursor: 'pointer', display: 'block' }}>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ background: t.bg, color: t.text, padding: '1px 6px', fontFamily: 'monospace', fontSize: 7 }}>{t.label}</span>
                      <span style={{ fontSize: 9, color: '#5a9ac8', fontFamily: 'monospace' }}>{s.source}</span>
                      <span style={{ fontSize: 8, color: '#2a3a4a', fontFamily: 'monospace' }}>{s.region}</span>
                      <span style={{ fontSize: 9, color: VERDICT_COLORS[verdict], fontFamily: 'monospace', marginLeft: 'auto' }}>{VERDICT_LABELS[verdict]}</span>
                    </div>
                    <div style={{ fontSize: 14, color: '#d0ccc4', lineHeight: 1.35, marginBottom: 6, fontWeight: 500 }}>{s.title}</div>
                    <div style={{ fontSize: 11, color: '#3a4a5a', lineHeight: 1.6, marginBottom: 8, fontFamily: 'monospace' }}>{s.summary?.slice(0, 140)}…</div>
                    <div style={{ height: 3, background: '#1c2330', borderRadius: 2, marginBottom: 8 }}>
                      <div style={{ height: '100%', width: `${s.credible}%`, background: 'linear-gradient(90deg,#1a5a1a,#40c070)', borderRadius: 2 }} />
                    </div>
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                      {s.tags?.map(tag => (
                        <span key={tag} style={{ fontSize: 8, background: '#0f1018', border: '1px solid #1c2330', color: '#2a3a4a', padding: '1px 6px', fontFamily: 'monospace' }}>#{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ borderTop: '1px solid #1c2330', padding: '16px 20px 32px', background: '#07080c' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 10, color: '#4a5a6a', fontFamily: 'monospace' }}>© 2026 The Nexus</span>
            <a href="/about.html" style={{ fontSize: 10, color: '#4a5a6a', fontFamily: 'monospace', textDecoration: 'none' }}>About</a>
            <a href="/contact.html" style={{ fontSize: 10, color: '#4a5a6a', fontFamily: 'monospace', textDecoration: 'none' }}>Contact</a>
            <a href="/privacy-policy.html" style={{ fontSize: 10, color: '#4a5a6a', fontFamily: 'monospace', textDecoration: 'none' }}>Privacy Policy</a>
          </div>
        </div>
      </div>
    </>
  );
}
