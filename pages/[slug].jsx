import Head from 'next/head';
import Link from 'next/link';
import { SEED_STORIES, autoVerdict, getType } from '../../src/data.js';
import { STORY_BODIES } from '../../src/data.body.js';

// Build a slug from a title — must match the slug used in links
export function toSlug(str) {
  return (str || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
}

// Merge body content into stories at build time
const STORIES = SEED_STORIES.map(s =>
  STORY_BODIES[s.id] ? { ...s, body: STORY_BODIES[s.id] } : s
);

// Next.js calls this at build time to generate one HTML file per record
export async function getStaticPaths() {
  const paths = STORIES.map(s => ({
    params: { slug: toSlug(s.title) },
  }));
  return { paths, fallback: false };
}

// Next.js calls this for each path to fetch the data for that page
export async function getStaticProps({ params }) {
  const story = STORIES.find(s => toSlug(s.title) === params.slug);
  if (!story) return { notFound: true };
  return { props: { story } };
}

// Credibility bar
function CredBar({ pct }) {
  return (
    <div style={{ margin: '16px 0' }}>
      <div style={{ height: 6, background: '#1c2330', borderRadius: 3, maxWidth: 260, marginBottom: 6 }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#1a5a1a,#40c070)', borderRadius: 3 }} />
      </div>
      <div style={{ fontSize: 11, color: '#4a5a6a', fontFamily: 'monospace' }}>
        {pct}% credibility — based on source quality and independent corroboration
      </div>
    </div>
  );
}

// Article body renderer — full content visible to Google in the HTML
function ArticleBody({ story }) {
  if (!story.body || !story.body.length) return null;
  return (
    <div style={{ borderTop: '1px solid #1c2330', marginTop: 24, paddingTop: 24 }}>
      {story.body.map((section, i) => (
        <div key={i} style={{ marginBottom: 28 }}>
          {section.heading && (
            <h2 style={{
              fontSize: 11, fontWeight: 600, color: '#8a9aaa', letterSpacing: 2,
              textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 12,
              paddingBottom: 8, borderBottom: '1px solid #1c2330',
            }}>
              {section.heading}
            </h2>
          )}
          {section.paragraphs && section.paragraphs.map((p, j) => (
            <p key={j} style={{
              fontSize: 15, color: '#9a9a96', lineHeight: 1.9, marginBottom: 16,
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}>
              {p}
            </p>
          ))}
          {section.facts && (
            <div style={{
              background: '#0b0d14', border: '1px solid #1c2330',
              borderLeft: '3px solid #b02020', padding: '14px 16px', marginBottom: 16,
            }}>
              <div style={{
                fontSize: 9, color: '#b02020', letterSpacing: 1.5,
                textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 10,
              }}>Key Facts</div>
              {section.facts.map((fact, k) => (
                <div key={k} style={{
                  display: 'flex', gap: 10, padding: '6px 0',
                  borderBottom: '1px solid #0e1018', fontSize: 12,
                  color: '#7a8a9a', fontFamily: 'monospace', lineHeight: 1.5,
                }}>
                  <span style={{ color: '#b02020', flexShrink: 0 }}>›</span>
                  <span>{fact}</span>
                </div>
              ))}
            </div>
          )}
          {section.quote && (
            <blockquote style={{
              borderLeft: '3px solid #3a4a5a', margin: '16px 0',
              padding: '12px 18px', background: '#0b0d14',
              fontStyle: 'italic', color: '#6a7a8a', fontSize: 14,
              lineHeight: 1.75, fontFamily: 'Georgia, serif',
            }}>
              {`"${section.quote}"`}
              {section.quoteSource && (
                <div style={{
                  fontSize: 10, color: '#3a4a5a', fontFamily: 'monospace',
                  marginTop: 8, fontStyle: 'normal',
                }}>
                  — {section.quoteSource}
                </div>
              )}
            </blockquote>
          )}
        </div>
      ))}
      <CredBar pct={story.credible} />
    </div>
  );
}

export default function RecordPage({ story }) {
  const t = getType(story.type);
  const verdict = autoVerdict(story.credible);
  const VERDICT_LABELS = { confirmed: '✓ Confirmed', likely: '↑ Likely', contested: '⚖ Disputed', unverified: '? Unverified' };
  const VERDICT_COLORS = { confirmed: '#40c070', likely: '#60c080', contested: '#c0a020', unverified: '#c07020' };

  // Related records — same topic
  const related = STORIES
    .filter(s => s.id !== story.id && s.topic === story.topic)
    .slice(0, 4);

  const description = story.summary ? story.summary.slice(0, 160) : story.title;
  const canonicalUrl = `https://nexusverse.app/records/${toSlug(story.title)}`;

  return (
    <>
      <Head>
        <title>{story.title} - The Nexus</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${story.title} - The Nexus`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="The Nexus" />
        <meta property="og:image" content="https://nexusverse.app/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${story.title} - The Nexus`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://nexusverse.app/og-image.png" />
        <link rel="canonical" href={canonicalUrl} />
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
            <div style={{ display: 'flex', gap: 0, marginLeft: 8 }}>
              {[['/', 'Home'], ['/records', 'Records'], ['/sources', 'Sources'], ['/community', 'Community'], ['/library', 'Library']].map(([href, label]) => (
                <Link key={href} href={href} style={{ color: '#3a4a5a', padding: '0 10px', height: 48, display: 'flex', alignItems: 'center', fontFamily: 'monospace', fontSize: 9, letterSpacing: 0.5, textTransform: 'uppercase', textDecoration: 'none', borderBottom: '2px solid transparent' }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* BACK BAR */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '12px 16px 0' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link href="/records" style={{ background: '#b02020', color: '#fff', padding: '7px 14px', fontFamily: 'monospace', fontSize: 9, letterSpacing: 1, textDecoration: 'none', display: 'inline-block' }}>
              ← Records
            </Link>
            <Link href="/" style={{ background: 'transparent', border: '1px solid #1c2330', color: '#3a4a5a', padding: '7px 14px', fontFamily: 'monospace', fontSize: 9, letterSpacing: 1, textDecoration: 'none', display: 'inline-block' }}>
              Home
            </Link>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '24px 16px 60px' }}>

          {/* Meta row */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 14 }}>
            <span style={{ background: t.bg, color: t.text, padding: '2px 8px', fontFamily: 'monospace', fontSize: 8, letterSpacing: 1 }}>
              {t.label}
            </span>
            <a href={story.sourceUrl} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 10, color: '#5a9ac8', fontFamily: 'monospace', textDecoration: 'none' }}>
              {story.source} ↗
            </a>
            <span style={{ fontSize: 9, color: '#2a3a4a', fontFamily: 'monospace' }}>{story.region}</span>
            <span style={{ fontSize: 9, color: VERDICT_COLORS[verdict], fontFamily: 'monospace', background: '#0b0d14', border: `1px solid ${VERDICT_COLORS[verdict]}33`, padding: '1px 7px' }}>
              {VERDICT_LABELS[verdict]}
            </span>
            <span style={{ fontSize: 9, color: '#2a3a4a', fontFamily: 'monospace' }}>{story.topic}</span>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: 26, color: '#eeeae0', lineHeight: 1.25, marginBottom: 16, fontWeight: 700, letterSpacing: 0.3 }}>
            {story.title}
          </h1>

          {/* Summary */}
          <p style={{ fontSize: 15, color: '#6a7a8a', lineHeight: 1.8, marginBottom: 20, fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: 'italic' }}>
            {story.summary}
          </p>

          {/* Article body — full text, visible to Google in raw HTML */}
          <ArticleBody story={story} />

          {/* Tags */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', margin: '20px 0 16px' }}>
            {story.tags?.map(tag => (
              <span key={tag} style={{ fontSize: 9, background: '#10131e', border: '1px solid #1c2330', color: '#3a4a5a', padding: '2px 8px', fontFamily: 'monospace' }}>
                #{tag}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            {story.sourceUrl && (
              <a href={story.sourceUrl} target="_blank" rel="noopener noreferrer"
                style={{ background: '#b02020', color: '#fff', padding: '10px 20px', fontFamily: 'monospace', fontSize: 10, letterSpacing: 0.5, textDecoration: 'none', display: 'inline-block' }}>
                Read Source ↗
              </a>
            )}
          </div>

          {/* Share */}
          <div style={{ borderTop: '1px solid #1c2330', paddingTop: 16, marginBottom: 24 }}>
            <div style={{ fontSize: 9, color: '#2a3a4a', letterSpacing: 1.5, textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 10 }}>
              Share This Record
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`} target="_blank" rel="noopener noreferrer"
                style={{ background: '#1877f2', color: '#fff', padding: '7px 14px', fontFamily: 'monospace', fontSize: 9, textDecoration: 'none' }}>
                f Facebook
              </a>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(story.title)}&url=${encodeURIComponent(canonicalUrl)}&hashtags=${encodeURIComponent((story.tags || []).slice(0, 3).join(','))}`} target="_blank" rel="noopener noreferrer"
                style={{ background: '#000', color: '#fff', padding: '7px 14px', fontFamily: 'monospace', fontSize: 9, textDecoration: 'none' }}>
                X / Twitter
              </a>
            </div>
          </div>

          {/* Related records */}
          {related.length > 0 && (
            <div style={{ borderTop: '1px solid #1c2330', paddingTop: 20 }}>
              <div style={{ fontSize: 9, color: '#3a4a5a', letterSpacing: 1.5, textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 12 }}>
                Related Records
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 8 }}>
                {related.map(r => {
                  const rt = getType(r.type);
                  return (
                    <Link key={r.id} href={`/records/${toSlug(r.title)}`}
                      style={{ background: '#0b0d14', border: '1px solid #1a2030', padding: '12px 14px', display: 'block', textDecoration: 'none' }}>
                      <div style={{ display: 'flex', gap: 5, marginBottom: 6 }}>
                        <span style={{ background: rt.bg, color: rt.text, padding: '1px 6px', fontFamily: 'monospace', fontSize: 7 }}>{rt.label}</span>
                        <span style={{ fontSize: 8, color: '#3a5a7a', fontFamily: 'monospace' }}>{r.topic}</span>
                      </div>
                      <div style={{ fontSize: 12, color: '#8a9aaa', fontFamily: 'monospace', lineHeight: 1.4 }}>
                        {r.title.slice(0, 90)}{r.title.length > 90 ? '...' : ''}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
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
