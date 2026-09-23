# Leyabona's Boutique: concept site

A one-page pitch site for Leyabona's Boutique, men's formal wear in Midrand. Every section
ends in a WhatsApp conversation. There is no backend: forms build a pre-filled WhatsApp message.

Built with Next.js 16 (App Router), React 19, TypeScript (strict) and Tailwind CSS 4.
Fonts come from `next/font/google`, and every picture goes through `next/image`.

- `DESIGN.md` has the design plan, the self-review and what changed after the screenshots.
- `docs/screenshots/` has the 360px and 1440px captures.
- The brief, asset manifest, build instruction and sales material are kept out of this public
  repo on purpose. Keep them in `docs/private/` locally; that folder is gitignored.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Demo mode

On by default. `NEXT_PUBLIC_DEMO` is treated as on unless it is exactly `false`.

| When demo is on | Where |
|---|---|
| "Concept preview by Sibuyane" ribbon and footer line | `components/DemoRibbon.tsx`, `components/Footer.tsx` |
| `<meta name="robots" content="noindex, nofollow">` | `app/layout.tsx` |
| `X-Robots-Tag: noindex, nofollow` header | `next.config.ts` |
| `robots.txt` disallows everything | `app/robots.ts` |
| Director poster used as the About portrait | `components/About.tsx` |

Set `NEXT_PUBLIC_DEMO=false` and redeploy to remove all of them. This is a build-time
variable, so it takes a rebuild, not just a restart.

## Clone this for a new client

1. Copy the repo and delete `docs/screenshots/` (they're of Leyabona's).
2. Replace everything in `public/images/` with the new client's pictures. Keep the folder
   layout (`brand/`, `product/`, `campaign/`, `event/`, `lifestyle/`, `team/`) and the naming
   convention `brand-category-descriptor-nn-orientation.ext`.
3. Edit **`content/site.ts`**. It's the only file with business facts in it: name, contacts,
   address, socials, every heading and line of copy, every WhatsApp message, every image path
   and its alt text. Components only read from it.
   - Anything set to `null` is hidden: `hours`, `chooseDay`, `otherPhones`, `about.portrait`,
     `occasions.moodImage`, an item's `price`.
   - `recognition.verified: false` hides awards and funding lines until you have proof.
   - Give an image a `note` (e.g. "Campaign image") when it's a render or poster, not stock.
   - Collection items are `kind: "photo"` (tall frame) or `kind: "campaign"` (small square).
   - An occasion with an `image` switches that list to alternating image rows.
   - The logo's `width` and `height` must match the real file.
4. Update the palette tokens at the top of `app/globals.css` and the fonts in `app/layout.tsx`.
5. The favicon, Apple touch icon and 1200x630 Open Graph image are generated from the logo at
   build time (`app/icon.tsx`, `app/apple-icon.tsx`, `app/opengraph-image.tsx`), so nothing to redo there.
6. `npm run build`, then check at 360px and 1440px.

## Deploy on DirectAdmin (or any Apache shared hosting)

Shared hosting has no Node.js server, so this builds plain files instead:

```bash
npm run build:static                          # demo mode -> leyabonas-site-demo.zip
NEXT_PUBLIC_DEMO=false npm run build:static   # live mode -> leyabonas-site-live.zip
```

The script pre-sizes every image to WebP (Vercel does this on the fly; Apache can't),
exports the site to `out/`, drops the full-size PNGs the page no longer needs, writes an
`.htaccess` and zips it. The `.htaccess` forces HTTPS, sends `X-Robots-Tag: noindex` in demo
mode, serves the extensionless icon and Open Graph files as PNG, turns on gzip and sets
long cache headers for the hashed files.

1. DirectAdmin > **Subdomain Management**: add `leyabonas` under sibuyane.co.za.
2. DirectAdmin > **SSL Certificates**: issue a Let's Encrypt certificate that includes
   `leyabonas.sibuyane.co.za` (the `.htaccess` redirects to HTTPS, so do this first).
3. **File Manager**: open the subdomain's folder, usually
   `domains/sibuyane.co.za/public_html/leyabonas/`. Delete any placeholder `index.html`.
4. Upload the zip there, then **Extract**. `index.html` and `.htaccess` must sit directly in
   that folder, not in a subfolder. Turn on "show hidden files" to see `.htaccess`.
5. Delete the zip and open https://leyabonas.sibuyane.co.za on a phone.

To update later, rebuild, then delete the old files (keep the folder) and extract the new zip.

Measured against the export served with gzip, the way Apache serves it: Performance 96 on
three runs, Accessibility 100, Best practices 100 (Lighthouse 12, mobile). Without gzip it
drops to about 80, so if the live site feels slow, check that `mod_deflate` is enabled.

## Deploy on Vercel (leyabonas.sibuyane.co.za)

1. `npx vercel` to link the project, then `npx vercel --prod`.
2. Vercel project > **Settings > Domains**: add `leyabonas.sibuyane.co.za`.
3. DNS for sibuyane.co.za: CNAME, host `leyabonas`, value as Vercel shows it
   (normally `cname.vercel-dns.com`).
4. **Settings > Deployment Protection**: make sure the production domain is public, or the
   owner will hit a Vercel login wall.
5. Demo mode needs no env var; it's on unless `NEXT_PUBLIC_DEMO=false`. Open the live URL on a phone.
6. After the owner signs: set `NEXT_PUBLIC_DEMO=false`, move to their domain, update `site.url`, redeploy.

Vercel's Hobby plan is for non-commercial use. Move to a paid plan once this is a paid client
project, and check Vercel's current terms.

## Measured (local production build, Lighthouse 12, mobile preset)

| | Demo on | Demo off |
|---|---|---|
| Performance | 96 to 99 over three runs (LCP 2.1 to 2.7 s, TBT 30 to 50 ms, CLS 0.001) | not re-run |
| Accessibility | 100 | 100 |
| Best practices | 100 | not re-run |
| SEO | 69, only because `noindex` is intentional in demo mode | 100 |

The first run against a cold image cache scored 89, because Next optimises each image on its
first request. Later runs used a warm cache, which is what visitors after the first get on
Vercel too. Total page weight is about 330 KB; the hero image is 21 KB (AVIF, 750px wide).
The live URL on real mobile data is still to be tested after deploy.

## Before this goes live: confirm with the owner

These are in the brief as **[verify]**. Until they're confirmed the site leaves them out or hides them.

- Are the black-and-gold three-piece, burgundy shawl-collar suit, groomsman poster and armchair
  images real photos or renders? They're labelled "Campaign image", "Campaign poster" or
  "Mood image" on the page for now.
- The address: "8 Incubation Hub, Riversand View" or "Riversands Agrihub".
- Which phone number is primary (074 207 6059 and 063 803 0383 are hidden in `otherPhones`).
- The TikTok handle `@leyabonas.boutiqu`, which looks truncated.
- Awards and funding lines (hidden, `recognition.verified: false`).
- Trading hours and whether Tuesday Choose Day is a standing promotion (both `null`).
- Written OK from @kahlees_mafia and @hotkenen for the Skemerberg photo, plus the clean
  original without carousel dots (the page crops them out in CSS for now).
- A plain portrait of Mr Scongwana. The text-heavy poster only shows in demo mode.
- Never use `_HOLD-consent-required/` (matric dance photos of likely minors) or `reference/`.
  Neither folder was copied into `public/`.
