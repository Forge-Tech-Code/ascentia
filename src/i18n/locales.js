/**
 * The locale table. Plain JS with no JSX and no imports.
 *
 * Croatian is the ROOT locale — the centre is in Supetar and local families
 * come first — and English lives one directory down at /en/. That asymmetry
 * is what makes the relative `base` awkward; see `assetPrefix`.
 */
export const DEFAULT_LANG = 'hr'

/** Every language the site is built in, in the order the switcher shows them. */
export const LANGS = ['hr', 'en']

/** The URL each locale answers on. Trailing slash: these are directories. */
export const localePath = {
  hr: '/',
  en: '/en/',
}

/** What the switcher calls each language. */
export const localeLabel = {
  hr: 'HR',
  en: 'EN',
}

/** The language's own name, for the switcher's accessible label. */
export const localeName = {
  hr: 'Hrvatski',
  en: 'English',
}

/** The `lang` attribute and the Open Graph locale for each. */
export const localeTag = {
  hr: 'hr',
  en: 'en',
}

export const localeOgTag = {
  hr: 'hr_HR',
  en: 'en_GB',
}

/** How many directories deep a locale's index.html sits: 0 at the root, 1 for /en/. */
export function localeDepth(lang) {
  return localePath[lang].split('/').filter(Boolean).length
}

/**
 * The document-relative prefix that reaches dist/ from inside a locale's
 * page: './' from the root, '../' from /en/.
 *
 * vite.config.js sets `base: './'`, so everything is document-relative, and a
 * './images/x' inside /en/index.html resolves to /en/images/x, which does not
 * exist. Asset refs Vite writes are corrected by the `onPageRendered` hook in
 * vite.config.js; the ones OUR code writes (via src/images.js) use this.
 */
export function assetPrefix(lang) {
  const depth = localeDepth(lang)
  return depth === 0 ? './' : '../'.repeat(depth)
}

/**
 * A DOCUMENT-RELATIVE href from one locale's page to another's. Never a
 * root-relative '/en/': under forge-tech-code.github.io/ascentia-education-dot-com/ a leading slash
 * escapes the sub-path.
 *
 *   hr → en   './en/'      en → hr   '../'      hr → hr   './'
 */
export function localeHref(from, to) {
  const up = '../'.repeat(localeDepth(from)) || './'
  const down = localePath[to].replace(/^\//, '')
  return `${up}${down}`
}
