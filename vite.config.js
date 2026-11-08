import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative base. The site is served at ascentia-education.com, but the
  // project-pages sub-path (forge-tech-code.github.io/ascentia-education-dot-com/) is still the
  // fallback, and an absolute '/asset' path 404s there. One relative build
  // serves both, so do not "tidy" it to '/'. See CLAUDE.md → Deployment.
  base: './',

  ssgOptions: {
    // 'nested' writes dist/en/index.html rather than dist/en.html, so the
    // English page answers on the directory URL /en/ with a trailing slash.
    dirStyle: 'nested',

    /**
     * REPAIR THE RELATIVE ASSET PATHS ON ANY PAGE BELOW THE ROOT.
     *
     * `base: './'` makes Vite emit document-relative URLs — './assets/app.js',
     * './fonts/…', './favicon.svg'. That is correct for dist/index.html and
     * wrong for dist/en/index.html, where './assets/app.js' resolves to
     * /en/assets/app.js and 404s. vite-react-ssg writes the same template to
     * both depths and does not rewrite them.
     *
     * So: for every page one or more directories down, walk the prefix back
     * up. Only href/src attribute values that literally start './' are
     * touched. The mirror of this for assets OUR code references out of
     * public/ is assetPrefix() in src/i18n/locales.js.
     */
    onPageRendered(route, html) {
      const depth = route.split('/').filter(Boolean).length
      if (depth === 0) return html
      const prefix = '../'.repeat(depth)
      return html.replace(/(\s(?:href|src)=")\.\//g, `$1${prefix}`)
    },
  },
})
