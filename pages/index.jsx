import Head from 'next/head';
import Link from 'next/link';
import { SEED_STORIES, TOPICS, SOURCES } from '../src/data.js';

function toSlug(str) {
  return (str || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
}

const HOT_TOPICS = [
  'UAP & Anomalous', 'Government & Intelligence', 'Ancient Civilizations',
  'Surveillance', 'Finance & Power', 'Hidden History',
];

export default function Home() {
  const latest = [...SEED_STORIES].slice(-6).reverse();
  const totalSources = SOURCES.reduce((a, g) => a + g.items.length, 0);

  return (
    <>
      <Head>
        <title>The Nexus — Some Questions Never Get Answered</title>
        <meta name="description" content={`Investigative journalism, declassified records, whistleblower testimony, and disputed history. ${SEED_STORIES.length}+ records across UAP, ancient civilizations, government secrets, and more. Free.`} />
        <meta property="og:title" content="The Nexus — Some Questions Never Get Answered" />
        <meta property="og:description" content={`${SEED_STORIES.length}+ records. Free. No sign-up.`} />
        <meta property="og:url" content="https://nexusverse.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://nexusverse.app/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Nexus — Some Questions Never Get Answered" />
        <meta name="twitter:description" content="Declassified records, whistleblower testimony, UAP disclosure, ancient history. Free." />
        <meta name="twitter:image" content="https://nexusverse.app/og-image.png" />
        <meta name="theme-color" content="#07080c" />
        <link rel="canonical" href="https://nexusverse.app/" />
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
              <Link key={href} href={href} style={{ color: href === '/' ? '#eeeae0' : '#3a4a5a', padding: '0 6px', height: 48, display: 'flex', alignItems: 'center', fontFamily: 'monospace', fontSize: 9, letterSpacing: 0.5, textTransform: 'uppercase', textDecoration: 'none', borderBottom: href === '/' ? '2px solid #b02020' : '2px solid transparent' }}>
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* HERO */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '52px 16px 44px', borderBottom: '1px solid #1c2330' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 18 }}>
            <div style={{ width: 3, height: 60, background: 'linear-gradient(180deg,#b02020,transparent)', flexShrink: 0, marginTop: 4 }} />
            <div>
              <div style={{ fontSize: 10, color: '#b02020', letterSpacing: 3, fontFamily: 'monospace', textTransform: 'uppercase', marginBottom: 10 }}>
                — Independent Research Platform
              </div>
              <h1 style={{ fontSize: 42, color: '#eeeae0', lineHeight: 1.1, marginBottom: 4, fontWeight: 700, letterSpacing: 1 }}>
                SOME QUESTIONS
              </h1>
              <div style={{ fontSize: 42, color: '#b02020', lineHeight: 1.1, marginBottom: 20, fontWeight: 700, letterSpacing: 1 }}>
                NEVER GET ANSWERED.
              </div>
              <p style={{ color: '#5a6a7a', lineHeight: 1.8, maxWidth: 580, fontFamily: "Georgia, serif", fontStyle: 'italic', marginBottom: 28, fontSize: 15 }}>
                The Nexus aggregates investigative journalism, declassified records, whistleblower testimony,
                and disputed history — for adults who ask questions the mainstream stopped asking.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link href="/records" style={{ background: '#b02020', color: '#fff', padding: '12px 28px', fontFamily: 'monospace', fontSize: 10, letterSpacing: 2, textDecoration: 'none', fontWeight: 700 }}>
                  ENTER THE ARCHIVE →
                </Link>
                <Link href="/sources" style={{ background: 'transparent', border: '1px solid #2a3a4a', color: '#5a6a7a', padding: '12px 20px', fontFamily: 'monospace', fontSize: 10, letterSpacing: 1, textDecoration: 'none' }}>
                  Browse Sources
                </Link>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 32, marginTop: 32, paddingLeft: 19, flexWrap: 'wrap' }}>
            {[
              { n: `${SEED_STORIES.length}+`, l: 'Records' },
              { n: String(TOPICS.length - 1), l: 'Topics' },
              { n: `${totalSources}+`, l: 'Sources' },
              { n: '25', l: 'Researchers' },
            ].map(s => (
              <div key={s.l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, color: '#eeeae0', fontWeight: 700, fontFamily: 'monospace' }}>{s.n}</div>
                <div style={{ fontSize: 9, color: '#3a4a5a', fontFamily: 'monospace', letterSpacing: 1 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 16px 60px', display: 'grid', gridTemplateColumns: '1fr 300px', gap: 32 }}>

          {/* LATEST */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 3, height: 18, background: '#b02020' }} />
              <div style={{ fontSize: 11, letterSpacing: 3, color: '#eeeae0', fontFamily: 'monospace', textTransform: 'uppercase', fontWeight: 700 }}>Latest Disclosures</div>
              <div style={{ flex: 1, height: 1, background: '#1c2330' }} />
              <Link href="/records" style={{ fontSize: 9, color: '#b02020', fontFamily: 'monospace', textDecoration: 'none', letterSpacing: 0.5 }}>View All →</Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {latest.map(s => (
                <Link key={s.id} href={`/records/${toSlug(s.title)}`} style={{ textDecoration: 'none' }}>
                  <div style={{ display: 'flex', gap: 12, padding: '14px 16px', background: '#0b0d14', border: '1px solid #1a2030', alignItems: 'flex-start' }}>
                    <div style={{ background: '#b02020', color: '#fff', fontSize: 7, padding: '2px 7px', fontFamily: 'monospace', letterSpacing: 1, flexShrink: 0, marginTop: 3 }}>NEW</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 9, color: '#3a5a7a', fontFamily: 'monospace', marginBottom: 4 }}>{s.topic}</div>
                      <div style={{ fontSize: 14, color: '#d0ccc4', lineHeight: 1.35, fontWeight: 500 }}>{s.title.slice(0, 120)}{s.title.length > 120 ? '...' : ''}</div>
                      <div style={{ fontSize: 10, color: '#3a4a5a', fontFamily: 'monospace', marginTop: 4 }}>{s.source}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* ALL TOPICS GRID */}
            <div style={{ marginTop: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 3, height: 18, background: '#3a4a5a' }} />
                <div style={{ fontSize: 11, letterSpacing: 3, color: '#eeeae0', fontFamily: 'monospace', textTransform: 'uppercase', fontWeight: 700 }}>All Topics</div>
                <div style={{ flex: 1, height: 1, background: '#1c2330' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 6 }}>
                {TOPICS.filter(t => t !== 'All Topics').map(t => {
                  const count = SEED_STORIES.filter(s => s.topic === t).length;
                  if (!count) return null;
                  return (
                    <Link key={t} href={`/records?topic=${encodeURIComponent(t)}`} style={{ textDecoration: 'none' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0b0d14', border: '1px solid #1a2030', color: '#7a8a9a', padding: '13px 14px', fontFamily: 'monospace', fontSize: 10 }}>
                        <span>{t}</span>
                        <span style={{ fontSize: 9, color: '#2a3a4a', background: '#0f1018', padding: '1px 7px', borderRadius: 10 }}>{count}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Support */}
            <div style={{ background: 'linear-gradient(160deg,#110e08,#1a1410)', border: '1px solid #4a3a1a', borderRadius: 6, padding: '20px 18px', textAlign: 'center' }}>
              <div style={{ fontSize: 20, marginBottom: 8 }}>☕</div>
              <div style={{ fontSize: 13, color: '#c0a060', fontWeight: 700, marginBottom: 6 }}>Support The Nexus</div>
              <div style={{ fontSize: 11, color: '#6a5a3a', lineHeight: 1.7, marginBottom: 14 }}>
                Free forever. No ads. No paywall. If it has been useful, a coffee helps keep it running.
              </div>
              <a href="https://buymeacoffee.com/thenexus" target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', background: '#FFDD00', color: '#000', padding: '10px 0', fontFamily: 'monospace', fontSize: 11, fontWeight: 700, textDecoration: 'none', borderRadius: 4, letterSpacing: 1 }}>
                BUY ME A COFFEE →
              </a>
            </div>

            {/* Stats */}
            <div style={{ background: '#0b0d14', border: '1px solid #1c2330', borderRadius: 6, padding: '16px 18px' }}>
              <div style={{ fontSize: 9, color: '#3a4a5a', letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 12 }}>Archive Stats</div>
              {[
                { label: 'Records', value: SEED_STORIES.length },
                { label: 'Topics', value: TOPICS.length - 1 },
                { label: 'Sources', value: totalSources },
                { label: 'Researchers', value: 25 },
              ].map(stat => (
                <div key={stat.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid #0e1018' }}>
                  <span style={{ fontSize: 10, color: '#4a5a6a', fontFamily: 'monospace' }}>{stat.label}</span>
                  <span style={{ fontSize: 18, color: '#eeeae0', fontFamily: 'monospace', fontWeight: 700 }}>{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Hot Topics */}
            <div style={{ background: '#0b0d14', border: '1px solid #1c2330', borderRadius: 6, padding: '16px 18px' }}>
              <div style={{ fontSize: 9, color: '#3a4a5a', letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 12 }}>Hot Topics</div>
              {HOT_TOPICS.map(t => {
                const count = SEED_STORIES.filter(s => s.topic === t).length;
                return (
                  <Link key={t} href={`/records?topic=${encodeURIComponent(t)}`} style={{ textDecoration: 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#6a7a8a', padding: '7px 0', fontFamily: 'monospace', fontSize: 10, borderBottom: '1px solid #0e1018' }}>
                      <span>{t}</span>
                      <span style={{ fontSize: 9, color: '#2a3a4a' }}>{count} →</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ borderTop: '1px solid #1c2330', padding: '16px 20px 32px', background: '#07080c' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 12 }}>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {[['/', 'Home'], ['/records', 'Records'], ['/sources', 'Sources'], ['/community', 'Community'], ['/library', 'Library']].map(([href, label]) => (
                  <Link key={href} href={href} style={{ color: '#4a5a6a', fontFamily: 'monospace', fontSize: 10, textDecoration: 'none' }}>{label}</Link>
                ))}
              </div>
              <a href="https://buymeacoffee.com/thenexus" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#FFDD00', color: '#000', padding: '7px 16px', fontFamily: 'monospace', fontSize: 10, fontWeight: 700, textDecoration: 'none', borderRadius: 3 }}>
                ☕ Buy Me a Coffee
              </a>
            </div>
            <div style={{ borderTop: '1px solid #1c2330', paddingTop: 12, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: 10, color: '#4a5a6a', fontFamily: 'monospace' }}>© 2026 The Nexus · nexusverse.app</span>
              <a href="/about.html" style={{ fontSize: 10, color: '#4a5a6a', fontFamily: 'monospace', textDecoration: 'none' }}>About</a>
              <a href="/contact.html" style={{ fontSize: 10, color: '#4a5a6a', fontFamily: 'monospace', textDecoration: 'none' }}>Contact</a>
              <a href="/privacy-policy.html" style={{ fontSize: 10, color: '#4a5a6a', fontFamily: 'monospace', textDecoration: 'none' }}>Privacy Policy</a>
              <span style={{ fontSize: 10, color: '#3a4a5a', fontFamily: 'monospace' }}>Independent research · Adults 18+</span>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
