# The Nexus

**Unresolved. Undisclosed. Unexplained.**

An independent investigative research platform aggregating declassified records, whistleblower testimony, and disputed history. For adults who ask questions the mainstream stopped asking.

🌐 **Live:** [thenexusapp.com](https://thenexusapp.com)

---

## Features

- **Records Feed** — 12 seed stories, AI-generated more on demand via Anthropic API
- **Community Board** — User submissions with required source references, file uploads, confidence ratings
- **Reddit Integration** — Live feeds from r/conspiracy, r/UFOs, r/HighStrangeness, and more (paid)
- **Media Library** — 27 books, documentaries, films, and articles with links and ratings
- **AI Analysis** — Claude-powered investigative analyst, recommends books and primary sources
- **Source Directory** — 23+ investigative outlets organized by type
- **Free vs Paid** — 8 free records, premium content gated, Reddit gated, no login required
- **Admin Panel** — Hidden admin access, community moderation, user preview mode

---

## Tech Stack

- React 18
- Anthropic Claude API (`claude-sonnet-4-20250514`)
- Reddit Public JSON API
- Stripe (payment links, no backend needed)

---

## Getting Started

```bash
npm install
npm start
```

---

## Configuration

Open `src/data.js` and update:

```js
// Admin credentials (change before publishing)
export const ADMIN_USER = "nexusadmin";
export const ADMIN_PASS = "N3xus@2025";

// Stripe Payment Links (from stripe.com/products)
export const STRIPE_MONTHLY = "https://buy.stripe.com/YOUR_MONTHLY_LINK";
export const STRIPE_ANNUAL  = "https://buy.stripe.com/YOUR_ANNUAL_LINK";
```

---

## Setting Up Stripe

1. Go to [stripe.com](https://stripe.com) and create a free account
2. Go to **Products** → **+ Add Product**
3. Create **Investigator** — $7.99/month recurring → copy the Payment Link URL
4. Create **Analyst** — $59.99/year recurring → copy the Payment Link URL
5. Paste both URLs into `src/data.js` lines 7–8
6. Redeploy

---

## Admin Access

Double-click the tiny dot in the footer → enter admin credentials.

Default: `nexusadmin` / `N3xus@2025` (change in `src/data.js`)

Admin features:
- View live stats
- Preview as any user type (Free / Investigator / Analyst)
- Pin and remove community posts
- Payment setup checklist

---

## Deployment

**GitHub Pages:**
```bash
npm install -g gh-pages
npm run build
gh-pages -d build
```

**Netlify / Vercel:** Connect your GitHub repo and it deploys automatically on push.

**Base44:** Upload `src/App.jsx` directly.

---

## Content Gating

| Feature | Free | Paid ($7.99/mo) |
|---|---|---|
| Records | 8 open | Unlimited |
| Premium records | Locked (blurred preview) | Unlocked |
| Reddit feeds | Locked | Live feeds |
| AI queries | 5 per session | Unlimited |
| Community posting | Read only | Full access |
| File uploads | — | Images, PDFs, docs |

---

## Content Policy

All content is presented for independent research and educational purposes only. The Nexus does not endorse any position as true or false. All records link to original external sources. Not affiliated with any government, intelligence agency, political organization, or media company.

---

## License

MIT
