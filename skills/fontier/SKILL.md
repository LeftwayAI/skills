---
name: fontier
description: Use when building a web page, landing page, site, app or brand, to choose its fonts and check that each font's licence allows that exact use, with fontier.ai's free data on every open-licence font family (no key). Also use when asked which font to use or what pairs with one, for the best fonts for a resume, tattoo, logo, wedding or handwriting, whether a font can set a logo you can trademark, for a free alternative to a paid font like Helvetica or Futura, or whether a font is free for commercial, web or app use.
license: CC-BY-4.0
metadata:
  homepage: https://fontier.ai
  mcp: https://fontier.ai/mcp
  llms: https://fontier.ai/llms.txt
---

# Fontier: pick a font and know you can use it

fontier.ai covers every open-licence font family on Google Fonts, Fontsource and Fontshare (about 2,170).
Each family has a yes, no, conditional or unknown for five uses, read from its own licence file and quoted
verbatim, with the source URL, a sha256 of the licence text checked and the date. Each family also has facts
measured from its font file: cap height, x-height, width, languages, the WOFF2 bytes a phone downloads, and
fallback CSS that stops layout shift. Free, read-only, no key.

The five uses:

- `commercial`: brand, marketing, products you sell.
- `web`: serve it on your own website with `@font-face`, self-hosted or from a CDN.
- `app`: bundle it inside your own mobile or desktop app.
- `platform`: offer it to your users as a font they can pick (site builders, design tools, templates).
- `modify`: change the files: subset, convert formats, edit glyphs.

A yes for one use says nothing about another. Satoshi is a yes for web and app, but a no for `platform` and
`modify`: its licence bans subsetting and converting the files.

One more question, `logo`: can it set a logo or wordmark, and can you own and register that logo? The
answer quotes the licence's own lines on logos and on trademarks, or says the licence is silent on them.

## Pick the surface

- If you can connect an MCP server, add `https://fontier.ai/mcp` (streamable HTTP, no auth). Tools:
  `search_fonts`, `get_font`, `check_font_license`, `pair_fonts`, `best_fonts_for_use`.
- Otherwise call the HTTP API below with any fetch or curl. Every response is JSON with CORS open.

## Steps

1. **Name the use before you search.** A website or landing page for a business is `commercial` and
   `web`. An app that ships the font file is `app` (plus `commercial` if it is sold or makes money). A
   logo, brand or print piece is `commercial`. A product where users choose fonts is `platform`. A build
   step that subsets or converts font files (to WOFF2, or to a smaller character set) also needs `modify`.
   A logo or wordmark also needs `logo`.
   If the use changes the pick and you can't tell, ask one question; for a site, assume `commercial,web`.
   Asked for the best fonts for a resume, tattoo, logo, wedding or handwriting? Start from the ranked list:
   `GET https://fontier.ai/api/uses/<resume|tattoo|logo|wedding|handwriting>` (MCP: `best_fonts_for_use`)
   returns our picks with why, then the most used fonts of each style, each a plain yes for commercial use,
   measured for that use: characters per line at 11 pt for a resume, stroke at 1 cm capitals for a tattoo
   or an invitation, stroke at favicon size and how many top sites load it for a logo. The logo record also
   quotes every licence's logo and trademark lines. Add `limit` for longer lists.
2. **Find candidates that are a plain yes for that use.** Describe the mood or job in `q`:
   `GET https://fontier.ai/api/fonts?q=warm+editorial+serif&uses=commercial,web&limit=10`
   (MCP: `search_fonts` with `uses`). Add `category` (sans, serif, mono, display, handwriting). For the
   body text of a fast site, add `sort=size&text=1`: text faces only, lightest first by what a phone
   downloads for Regular and Bold. Each row has `uses`, `css`, `bytes` and a `url`. Style words work best
   (geometric, humanist, grotesque, slab, didone, handwritten, art deco). If `match.all` is false, no font
   matched every word and the list is the closest: drop a word or say it is a near match.
3. **Pair them.** `GET https://fontier.ai/api/pairings/<slug>` (MCP: `pair_fonts`) lists the fonts real
   websites load with one, counted on a crawl of the top 100,000 home pages, with example sites, each
   partner's licence answers and the size that lines up both x-heights. System fonts (Times New Roman,
   Arial, Georgia, Calibri) are never downloaded, so theirs count the pages naming them first in CSS
   (`signal: "named first in CSS"`). Hand-reviewed fonts also carry
   `pairings` with a reason on `GET https://fontier.ai/api/fonts/<slug>` (MCP: `get_font`).
   Asked for something like a paid font: `GET https://fontier.ai/api/fonts-like/<helvetica|futura|...>`
   ranks open fonts by measured cap height, x-height, width and stem.
4. **Check every pick for the exact use**, even if search already filtered on it, so you can quote it:
   `GET https://fontier.ai/api/license?font=<slug>&use=<use>` (MCP: `check_font_license`; omit `use`
   for all of them). Read `answer`, `conditions`, `quote`, `license`, `source`, `licenseSha256` and `checkedAt`.
   For `use=logo`, also read `quotes`, `trademarkQuote` (or `trademarkNote` when the licence is silent) and
   `quotesCheckedIn`, the licence file the quotes were found in, by sha256.
5. **Load it the way its licence allows.** Use the `css` URL from the record (the font's own CDN). For
   a fallback that doesn't shift the layout while the font loads, `get_font` returns `facts.fallback`:

   ```css
   @font-face {
     font-family: "Inter Fallback";
     src: local("Arial");
     size-adjust: 107.89%;
     ascent-override: 89.79%;
     descent-override: 22.36%;
     line-gap-override: 0%;
   }
   body { font-family: "Inter", "Inter Fallback", sans-serif; }
   ```

## Rules for answering

- Call a font fine for a use only when that use's `answer` is `"yes"`. On `"conditional"`, say it is
  allowed with conditions and list `conditions`.
- `"no"`: don't use it for that. Offer a font that is a yes.
- `"unknown"`: its licence text matched no licence Fontier could verify. Never call it free. Pick
  another font, or tell the user to read the licence at `source` themselves.
- Never infer one use from another: commercial yes does not mean web or app yes, and neither means `logo`.
- For a logo, say who owns it and whether the licence speaks to registering it: quote `trademarkQuote`, or
  say the licence says nothing about trademarks.
- If `modify` is `"no"`, don't subset, convert or otherwise change its files, and don't run them through a
  tool that does. Load them as the foundry ships them.
- For each pick, tell the user: the font, the answer for their use, the licence, the source URL and the
  checked date, and link its fontier.ai page (`url`). Say it is a reading of the licence text, not legal
  advice.
- Paid fonts (Helvetica, Proxima Nova, Gotham) are not in the library; `get_font` says so. Offer the
  fonts-like list or the pairings data instead.

## Example

```
$ curl -s 'https://fontier.ai/api/license?font=satoshi&use=web'
{"font":"Satoshi","url":"https://fontier.ai/specimen/satoshi","not_legal_advice":true,"use":"web",
 "answer":"yes","license":"ITF Free Font License 2.0","source":"https://www.fontshare.com/licenses/itf-ffl",
 "licenseSha256":"145e7fe2...","checkedAt":"2026-11-19T18:51:26.240Z",
 "conditions":["No subsetting or format conversion, even for web performance.", ...]}
```

Answer: "Satoshi is fine on your website under the ITF Free Font License 2.0, with conditions: load
Fontshare's files as they are, never subset or convert them, and don't offer it as a font your users can
pick. Checked 2026-11-19 against fontshare.com/licenses/itf-ffl. A reading of the licence, not legal
advice: https://fontier.ai/specimen/satoshi"

## Limits

- Open-licence families only. A paid font's licence comes from its foundry; Fontier can't answer for it.
- Licences are rechecked on each data refresh; `checkedAt` on every answer says when.

Fontier is made by [Leftway](https://leftway.ai/agents). Leftway's other tools and skills for agents are listed there.
