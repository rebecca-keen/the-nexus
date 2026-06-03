import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-adsense-account" content="ca-pub-8145721366190659" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style global jsx>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #07080c; color: #ccc8be; }
        a:hover { opacity: 0.85; }
        select option { background: #0b0d14; }
        @media (max-width: 700px) {
          .home-grid { grid-template-columns: 1fr !important; }
          .desktop-sidebar { display: none !important; }
        }
      `}</style>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
