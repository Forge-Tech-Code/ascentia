# ascentia-education-dot-com

The website for Ascentia Education, an education centre in Supetar on the island of Brač.

A static one-page site in Croatian (`/`) and English (`/en/`), built with React, Vite, Tailwind and
`vite-react-ssg`, and deployed to GitHub Pages on every push to `main`.

## How to run this

You need Node 20 or newer (the deploy uses 26) and npm.

```bash
git clone git@github.com:Forge-Tech-Code/ascentia-education-dot-com.git
cd ascentia-education-dot-com
npm install
npm run dev
```

Open http://localhost:5173/ for the Croatian page and http://localhost:5173/en/ for the English one.
Edits to anything under `src/` reload in the browser.

### Check the real build

The dev server does not prerender. Before pushing, build the site the way GitHub Pages will serve it:

```bash
npm run build      # writes dist/index.html and dist/en/index.html
npm run preview    # serves dist/ at http://localhost:4173
```

`npm run build` is the only check there is: it fails if a component throws or if `src/i18n/hr.js` and
`src/i18n/en.js` do not have the same keys.

### Where to change things

| To change | Edit |
| --- | --- |
| Any text on the page | `src/i18n/hr.js` and `src/i18n/en.js` (same key in both) |
| Phone, email, address, site URL | `src/siteInfo.js` |
| Colours and fonts | `tailwind.config.js` |
| Section order | `src/App.jsx` |
| Photos and the logo | `public/images/` |

### Deploy

Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and publishes to
https://ascentia-education.com/.

See `CLAUDE.md` for how the two languages work, what on the site is still a draft, and the launch checklist.
