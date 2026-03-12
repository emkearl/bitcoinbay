# Bitcoin Bay — Landing Page v2.0

Premium one-page sports entertainment platform.  
Dark sports-tech aesthetic · Mobile-first · Community & Discord conversion funnel.

---

## File Structure

```
bitcoinbay/
├── index.html              ← Full one-page site
├── style.css               ← All styles (CSS variables, animations, responsive)
├── script.js               ← Interactions (modals, animations, validation)
├── README.md               ← This file
└── assets/
    └── images/
        ├── btb_favicon.jpg       ← Favicon (circular logo mark)
        └── bitcoinbay_logo.png   ← Full horizontal logo (reference)
```

---

## Quick Deploy

### 1. Put files in a folder on your desktop

Drag the entire `bitcoinbay/` folder to your Desktop (or anywhere you prefer).

### 2. Push to GitHub

Open Terminal (Mac) or Command Prompt (Windows), then:

```bash
# Navigate to folder
cd ~/Desktop/bitcoinbay

# Initialize git
git init
git add .
git commit -m "Initial Bitcoin Bay site"

# Create repo on github.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/bitcoinbay.git
git branch -M main
git push -u origin main
```

### 3. Deploy on Vercel

1. Go to **vercel.com** → Sign in → **Add New Project**
2. Click **Import Git Repository** → select `bitcoinbay`
3. Framework Preset: **Other** (static HTML)
4. Root Directory: `/` (leave as default)
5. Click **Deploy**

Vercel auto-deploys on every push to `main`. Your site goes live in ~30 seconds.

### 4. Custom Domain (optional)

Vercel Project → **Settings → Domains** → add `bitcoinbay.ag`  
Update your DNS A record and CNAME as shown by Vercel.

---

## Sections

| Section | Nav Anchor |
|---|---|
| Hero | `#hero` |
| Discord Band | — |
| Community | `#community` |
| How It Works | `#how-it-works` |
| Ways to Engage | `#engage` |
| Crypto Payments | `#crypto` |
| Referral Program | `#referral` |
| Account Access | `#account-access` |
| FAQ | `#faq` |
| Footer | — |

---

## Forms

Both modals (Login + Signup) match the field structure from `bitcoinbay.ag`.

**Login:** Login ID, Password  
**Signup:** First Name, Last Name, Email, Confirm Email, Password (4–10 chars, no specials), Confirm Password, Phone Number, Referred By (optional), Terms checkbox, reCAPTCHA

On valid submission both forms redirect to `https://www.bitcoinbay.ag/` where the live backend handles auth.

**To connect a real API endpoint**, replace the `window.location.href = 'https://www.bitcoinbay.ag/'` lines in `script.js` with a `fetch()` POST call to your endpoint.

---

## External Dependencies (CDN — no install needed)

| Library | Purpose |
|---|---|
| Google Fonts — Barlow Condensed + Barlow | Typography |
| Google reCAPTCHA v2 | Signup bot protection |
| Google Tag Manager GTM-WZ87K5R2 | Analytics / tracking |

---

## Referral Commission Chart

| Total Referral Activity | Commission |
|---|---|
| $0 – $5,000 | 20% |
| $5,001 – $10,000 | 25% |
| $10,001 – $15,000 | 30% |
| $15,001 – $20,000 | 35% |
| $20,001 – $25,000 | 40% |

*All commissions based on Net Gross Revenue (NGR)

---

## Interactions Included

- Sticky header with scroll-triggered background
- Animated hero particles (GPU-accelerated)
- Count-up stat numbers on scroll into view
- Reveal-on-scroll for all sections (IntersectionObserver)
- Smooth scroll to anchors with header offset
- Hero floating crypto badges with staggered float animation
- Ambient hero glow orbs with pulse animation
- Card hover: border glow + translateY lift + subtle 3D tilt (desktop only)
- FAQ accordion with max-height transitions
- Login / Signup modals with scale+fade entry
- Hamburger → X mobile nav animation
- reCAPTCHA on signup form

---

## Performance

- Zero JavaScript frameworks — pure vanilla JS (~6KB)
- All SVG icons inline — no image requests
- Fonts loaded with `display=swap` — no layout shift
- Animations use only `transform` and `opacity` — GPU-accelerated
- IntersectionObserver replaces scroll event listeners

---

## SEO Schema

JSON-LD structured data in `<head>` covers:
- `Organization`
- `WebSite`
- `WebPage`
- `FAQPage`

---

## Support

SMS: [787-531-3642](sms:+17875313642)  
Discord: [discord.gg/hsXQUJp9DD](https://discord.gg/hsXQUJp9DD)  
Instagram: [@bitcoin_bay](https://www.instagram.com/bitcoin_bay/)  
Twitter/X: [@BitcoinBay_com](https://x.com/BitcoinBay_com)
