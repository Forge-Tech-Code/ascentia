# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A one-page static site for **Ascentia Education**, an education centre in Supetar on the island of Brač,
Croatia. It is built **twice, once per language** — `/` in Croatian and `/en/` in English — from one set of
components and two dictionaries.

**The client approved this draft and it launched on 2026-11-08**, but the copy, the sections and the look
can still change. Read "What's real, what's a draft" before writing any content.

It is a sibling of `word-and-rijec-dot-com`, `guy-catz-dot-com` and `veli-bol-home` (all under
`~/repositories/f0rg3t3ch@github.com/`) and was ported from the first of those. When something here is
unclear, `word-and-rijec-dot-com` and its `CLAUDE.md` are the reference.

## Commands

```bash
source ~/.nvm/nvm.sh   # a non-interactive shell otherwise finds apt's Node 18
npm install
npm run dev      # Vite dev server, http://localhost:5173
npm run build    # prerender both pages to dist/ via vite-react-ssg
npm run preview  # serve the built dist/
```

No tests, linter or typechecker. `npm run build` is the only gate: it prerenders both pages, so a runtime
error or a mismatch between the two dictionaries fails the build.

## Stack and layout

React 18, Vite 5 (`base: './'`), `vite-react-ssg`, Tailwind 3, react-router-dom (as a build-time page list
only). No backend, no analytics, no form.

```
index.html              <head>: only what is identical in both languages (charset, viewport, icons, fonts)
src/
  main.jsx              vite-react-ssg entry + runtime basename detection
  routes.jsx            one route per language
  App.jsx               the page: Hero, Programmes, Learning, Contact, Footer
  siteInfo.js           language-independent facts: name, phone, email, address, canonical origin
  i18n/locales.js       locale table and the relative-path maths
  i18n/hr.js  en.js     every user-visible string
  i18n/index.jsx        <LangProvider>, useLang(), the same-shape assertion
  images.js             asset() / responsivePhoto() — use the bound copies off useLang()
  components/           Navbar, Footer, LangSwitch, Wordmark, PuzzlePiece, Photo, Reveal, Seo
  sections/             Hero, Programmes, Learning, Contact
public/                 fonts, images, icons, og.jpg, robots, sitemap, 404
```

## Two languages

| URL | file | `<html lang>` | dictionary |
| --- | --- | --- | --- |
| `/` | `dist/index.html` | `hr` | `src/i18n/hr.js` |
| `/en/` | `dist/en/index.html` | `en` | `src/i18n/en.js` |

Croatian is the root and `x-default`: the centre serves local families first.

- **The language comes from the route, never from state.** No toggle state, no `localStorage`.
- **No user-visible text in a component.** Put it in both dictionaries under the same key and read it with
  `const { t } = useLang()`. `src/i18n/index.jsx` asserts the two have identical shapes and throws during
  the build, naming the key. The one exception is `hero.slogan` (listed in `FREE_LENGTH`), which is split
  into colour chunks and has five in Croatian to six in English.
- **`<LangSwitch>`** shows both languages, `HR | EN`, with the current one filled. It is in the navbar at
  every width and again in the footer. Its links are plain `<a>`s: changing language loads the other
  document.

### Relative paths — the two traps

`base: './'` lets one build run at a domain root and under `forge-tech-code.github.io/ascentia-education-dot-com/`. It has two
consequences:

1. **Assets from a page one directory down.** `./assets/x` inside `/en/index.html` resolves to
   `/en/assets/x`. The `onPageRendered` hook in `vite.config.js` rewrites what Vite emits; our own
   references go through `asset()` / `responsivePhoto()` **taken off `useLang()`**, and the switcher uses
   `localeHref()`. Never write a root-relative `/en/` or `/images/…`.
2. **The router under a sub-path.** react-router matches the full pathname, and `/ascentia-education-dot-com/` is not a
   route, so without help the prerendered page is replaced by "404 Not Found" on hydration.
   `detectBasename()` in `src/main.jsx` works the mount point out from the address bar. `npm run preview`
   serves at `/` and will not show this bug — to test it, serve `dist/` from a directory named `ascentia-education-dot-com`
   one level up (`python3 -m http.server`) and open `/ascentia-education-dot-com/` and `/ascentia-education-dot-com/en/`.

## Brand

Everything comes from the client's own social-media posters (peach ground, teal brush wordmark, puzzle
pieces, a word-per-colour slogan). The hex values were sampled from those images.

| token | hex | use |
| --- | --- | --- |
| `peach` | `#F7D2BF` | the main ground |
| `sage` | `#A9C9A2` | the alternate ground |
| `teal` / `teal-deep` | `#1C84A4` / `#0F5F78` | the wordmark colour / headings, buttons, links |
| `mauve`, `sun` | `#B88CA0`, `#F4C442` | puzzle pieces, badges, accents — fills only |
| `berry` | `#B85884` | currently unused (was the "Learn Croatian and English!" headline; large type only) |
| `sage-deep`, `mauve-deep`, `sun-deep` | see `tailwind.config.js` | the slogan words; the poster tones are too pale to read as type on peach |
| `cream` | `#FFF8F2` | cards and the navbar pill |
| `ink` / `ink-soft` | `#23343B` / `#3F5058` | body type |

`teal` is only about 3:1 on peach, and `teal-deep` about 4:1 on sage: both are for large type. Body text is
`ink`. The posters set white text on peach; the site does not, because it cannot be read. These ratios
were worked out by hand, not with a tool — re-check them before adding a colour for type.

**Type.** Fredoka (variable, 300–700) for headings, Poppins for body — **only Poppins 400 and 600 are
shipped**, so use `font-normal` or `font-semibold` and nothing else on body type. Each face is two files,
`-latin` and `-latin-ext`; the latin-ext half carries č ć š ž đ and must never be dropped.

### The logo

No vector logo exists yet. `public/images/ascentia-wordmark.webp` is the brush wordmark **keyed out of a
poster JPEG** (800px wide, transparent), and `<Wordmark lockup>` sets the "— EDUCATION —" line under it in
HTML. `public/og.jpg` is a crop of the full logo poster. `public/favicon.svg` and `<PuzzlePiece>` share one
hand-drawn path, and the PNG icons were rendered from that SVG. **Ask the client for the real logo files**
and replace all of these.

## Deployment

Push to `main` → `.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages. The repo lives
in the **forge-tech-code** org. The site is served at **https://ascentia-education.com/** (domain registered
at Namecheap). `https://forge-tech-code.github.io/ascentia-education-dot-com/` is the fallback and redirects to the domain.

The custom domain is attached in the repo's **Settings → Pages → Custom domain**. With an Actions workflow
that setting is what counts; `public/CNAME` is kept to match the sibling sites and to record the domain.

The origin is typed out in five places that have to change together: `src/siteInfo.js` (`site.url`),
`public/sitemap.xml`, `public/robots.txt`, `public/404.html` and `public/CNAME` (bare domain only).

### DNS (Namecheap → Advanced DNS)

```
A      @    185.199.108.153
A      @    185.199.109.153
A      @    185.199.110.153
A      @    185.199.111.153
AAAA   @    2606:50c0:8000::153
AAAA   @    2606:50c0:8001::153
AAAA   @    2606:50c0:8002::153
AAAA   @    2606:50c0:8003::153
CNAME  www  forge-tech-code.github.io.
```

GitHub redirects `www` to the apex. Tick **Enforce HTTPS** in Settings → Pages once the certificate is
issued. The Search Console Domain property is verified by a `google-site-verification` TXT on `@`; leave
it in place.

### Indexing and Google Search Console

**The site has been open to search since its launch on 2026-11-08.** `index.html` has no `robots` meta tag
(`public/404.html` keeps its own `noindex` on purpose), and `public/robots.txt` is `Allow: /` and names the
sitemap.

- **Search Console is a Domain property verified by a DNS TXT record on `@` at Namecheap.** There is no
  verification tag or file in the repo, and none is needed. Deleting that TXT record loses the property.
- The sitemap (`https://ascentia-education.com/sitemap.xml`) is submitted there. **Bump both `<lastmod>`
  values** in `public/sitemap.xml` whenever the page content changes; Google ignores `changefreq` and
  `priority`.
- To hide a page again, use a `noindex` meta tag **with robots.txt still allowing crawling**. A `Disallow`
  stops Google fetching the page, so it never sees the noindex.
- The JSON-LD in `src/components/Seo.jsx` is a `WebSite` node (Google's source for the site name shown in
  results) and an `EducationalOrganization`, joined by `@id`. Both pages emit the same root `url`, so they
  describe one entity. Check it with the Rich Results Test or Search Console → Enhancements. Its `logo` is
  the hand-drawn puzzle icon (`icon-512.png`) until the client sends the real logo.

## What's real, what's a draft

**From the client's posters, verbatim:**

- The name, the slogan "Small steps also reach big goals", "Learning through play, creativity, and
  exploration", "Join us – let's grow, learn, and play together!", "Enrolling now!", "Ages 4–6".
- The four `programmes.services` (Croatian lessons, English lessons, tutoring 1st–8th grade, one-on-one
  support with mind games) — from her feedback of 2026-11-08, lightly edited English. They replaced the
  "Learn Croatian and English!" poster block. **Their Croatian is drafted here; she must review it.**
- `learning.items` (Emotional literacy; Empathy and belonging) — **in both languages**. This is the only
  Croatian on the site that is her own.
- The hero photo, the palette and the wordmark.

**From her posters but not yet confirmed for the website:**

- Phone `+385 98 182 1274`, email `edu.ascentia@gmail.com`, address `Mirka Kustića 2, Supetar`. The two
  posters group the phone digits differently; the digits are the same.
- "Enrolling now!" is time-sensitive — ask whether it still holds.

**Drafted here, not hers — she must review all of it:**

- **Every Croatian string except `learning.items`**: the slogan (`I mali koraci vode do velikih ciljeva`),
  the hero lead, everything under `programmes`, `contact.heading`/`sub`, the meta description. These are
  translations of her English poster text.
- UI chrome in both languages: nav labels, the section headings "Programmes" and "What children learn",
  button text, alt text, the meta descriptions.

**Not on the site because nobody has supplied it:** prices, schedules, opening hours, staff names or bios,
testimonials, social links, a contact form, a map.

`public/images/portrait-{400,700,1100}.webp` is a portrait the client sent. It is **not used on the page**
— who it shows has not been confirmed, and an About section needs a name and a bio from her — but anything
in `public/` is published, so it is reachable by URL once the site is deployed.

### Don't invent

Use only what the client sends. If a section has no real content, leave it out rather than writing
plausible filler — a page that says less is recoverable, one that says something untrue about her business
is not. When she supplies Croatian wording, use hers and do not polish it.
