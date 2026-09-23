# Design plan: Leyabona's Boutique concept site

## Draft 1

**Palette.** Black `#010101` base, gold `#DBB44C` accent, cream `#E8DECA` light surface,
ink `#1A1714` body text on cream, gold-deep `#B08E40` rules on cream, burgundy `#4E1421`
used once (the hover state of the collection's "Ask about this item" links).

**Type.** Cormorant Garamond 500/600 for headings, Montserrat 400/500 for body,
Yellowtail once for "Royal Family".

**Layout concept.** A tailor's seam. Sections are joined by a thin gold stitched line
instead of hard colour breaks. The hero seam draws itself once on load.

**Principles.**
1. Every section ends in a WhatsApp action. There is no other conversion path.
2. Photos do the selling. Copy stays short and plain.
3. One moment of motion (the seam). Everything else only moves when you click it.
4. Facts come only from `content/site.ts`. Missing data hides the section.

```
MOBILE (360)                     DESKTOP (1440)
+-------------------------+      +--------------------------------------------------------+
| [logo]   [Menu][WhatsApp]|     | [logo]  Occasions Groomsmen Collection Details Visit [WA]|
+-------------------------+      +--------------------------------------------------------+
| Look good.              |      | Look good.                  |  +-------------------+    |
| Feel good.              |      | Feel good.                  |  | navy blazer photo |    |
| Be you.                 |      | Be you.                     |  | 4:5, gold stitch  |    |
| sub line                |      | sub line                    |  | inset border      |    |
| [WhatsApp us]           |      | [WhatsApp us] [Collection]  |  +-------------------+    |
| [See the collection]    |      |   Royal Family (script)     |                           |
|     Royal Family        |      +---- ~ ~ ~ seam draws ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ------+
| [navy blazer photo]     |      | CREAM  Dressed for the day.                            |
| ~ ~ ~ seam ~ ~ ~        |      |  [img] Weddings / line      |                          |
| CREAM Occasions list    |      |        Groomsmen / line     | [img]                    |
| BLACK Groomsmen + form  |      |  ... five rows, image side alternates where one exists |
| CREAM Collection        |      | BLACK Groomsmen: list + photo + 3-field quote builder  |
| BLACK Details           |      | CREAM Collection: 3 tall blazers, 2 wide campaign      |
| CREAM Runway            |      | BLACK Details / CREAM Runway / BLACK About             |
| BLACK About             |      | CREAM Visit / BLACK Footer                             |
| CREAM Visit             |      +--------------------------------------------------------+
| BLACK Footer            |
| [== sticky WhatsApp ==] |
+-------------------------+
```

## Review against the brief

Reading draft 1 back as if it were any tailoring site:

- **The gold border around the hero image** was a default "luxury frame". Replaced with a
  stitched inset: the same dashed SVG seam used between sections, running down the left
  edge of the photo only, so the photo feels sewn onto the page instead of framed.
- **Occasions as five equal rows each with an image** repeats the "alternating zig-zag"
  template, and the manifest only offers one image that fits here without repeating
  another section: the beige three-piece armchair scene, which is flagged as a probable
  render. Matric dance photos are on hold (minors). Revised: the five occasions are a plain
  typographic list, like a tailor's menu card, with the mood image beside it on desktop
  and below it on mobile, captioned as a mood image. `image` stays an optional field per
  occasion, so once real photos arrive the rows alternate automatically.
- **Collection as a uniform grid** is exactly what the brief warns against. Revised: the three
  photographed blazers sit in a row of tall 3:4 images (their native ratio) with no card
  chrome; the two campaign images sit below a rule as smaller square thumbnails with the text
  beside them, each marked "Campaign image" on the page and in the lightbox, so nobody reads
  them as stock.
- **Burgundy** was going to be a hover colour. On cream it's fine, but a hover is invisible on
  touch devices, which is most of this traffic. Revised: burgundy is used as the underline
  colour for the "Ask about this item" links, always visible, and nowhere else.
- **Seam between every section** risked becoming wallpaper. Revised: the seam only appears
  where two surfaces of the same colour meet or where the page needs a pause (below the hero,
  above the collection, above the visit block). Surface changes do the rest.
- **Headings.** Checked none of the "tells" list: no eyebrow labels, no arrows on buttons,
  no 01/02/03, no single gold word, no card shadows, no gradients.
- **Image honesty (from the manifest).** The three mannequin blazers are the only real
  product photography, so the hero and the tall collection row use those. Everything
  flagged "looks AI-generated" (black-gold three-piece, burgundy details, groomsman poster,
  armchair) gets a visible "Campaign image" or "Mood image" note and never the word
  "available" or "in stock".

## Contrast checks (WCAG 2.1)

| Pair | Ratio | Use |
|---|---|---|
| gold `#DBB44C` on black `#010101` | 10.6:1 | headings, links on black |
| cream `#E8DECA` on black | 15.6:1 | body on black |
| ink `#1A1714` on cream | 13.4:1 | body on cream |
| black on gold (button) | 10.6:1 | filled WhatsApp button |
| burgundy `#4E1421` on cream | 10.9:1 | underline only |
| gold-light `#ECC35E` on black | 12.5:1 | hover on black |
| gold-deep `#B08E40` on cream | 2.3:1 | decorative rules only, never text |

Ratios computed with the WCAG relative-luminance formula, not estimated.

## After the first screenshots (360px and 1440px)

- **Removed: the vertical stitch beside the hero photo.** With the animated seam directly
  below it, the hero carried two seams, which weakened the one idea the page is built on.
  On a 360px screen it also cost the photo 24px of width. The seam now appears three times
  on the page: under the hero (drawn once on load), above the collection, and above the visit block.
- Groomsmen: on mobile the poster (which has "Let us dress your groomsman" baked into it)
  came before the H2 of the same words. The heading and list now lead; the poster follows.
- Runway: text is centred against the photo instead of pinned to its bottom edge.
