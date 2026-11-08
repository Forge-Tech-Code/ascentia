// LANGUAGE-INDEPENDENT FACTS ONLY. Anything that reads differently in
// Croatian and English lives in src/i18n/hr.js and en.js.
//
// The phone, email and address are copied from the client's own posters and
// have NOT been confirmed with her for the website yet — see CLAUDE.md →
// "What's real, what's a draft". Empty fields are simply not rendered.
export const site = {
  name: 'Ascentia Education',

  phone: '+385 98 182 1274',
  phoneHref: 'tel:+385981821274',
  email: 'edu.ascentia@gmail.com',
  emailHref: 'mailto:edu.ascentia@gmail.com',
  street: 'Mirka Kustića 2',
  town: 'Supetar',
  country: 'HR',

  instagram: '',
  facebook: '',

  // The canonical origin. Seo.jsx derives the canonical, og:url, hreflang and
  // JSON-LD from this. public/sitemap.xml, robots.txt and 404.html are static
  // files that carry their own copy — change them together.
  url: 'https://ascentia-education.com/',
}
