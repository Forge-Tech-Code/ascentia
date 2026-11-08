import { Head } from 'vite-react-ssg'
import { site } from '../siteInfo'
import { useLang } from '../i18n'
import { DEFAULT_LANG, LANGS, localePath, localeTag, localeOgTag } from '../i18n/locales'

/** Absolute URL of a locale's page, e.g. https://ascentia-education.com/en/ */
export function localeUrl(lang) {
  return `${site.url.replace(/\/$/, '')}${localePath[lang]}`
}

/**
 * Everything in <head> that differs between the two languages. index.html
 * keeps only what is identical on both (charset, viewport, icons, font
 * preloads).
 *
 * The JSON-LD claims ONLY what the client's posters state: the name, the
 * phone, the email, the street address and the two languages. No person,
 * price, opening hours, rating or review — none of it is known. Add to it as
 * real details arrive, never to pad it out.
 */
export default function Seo() {
  const { lang, t } = useLang()
  const url = localeUrl(lang)
  const origin = site.url.replace(/\/$/, '')
  const ogImage = `${origin}/og.jpg`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${site.url}#organization`,
    name: site.name,
    url: site.url,
    logo: `${origin}/icon-512.png`,
    image: ogImage,
    description: t.meta.description,
    email: site.email,
    telephone: site.phone.replace(/\s/g, ''),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.street,
      addressLocality: site.town,
      addressCountry: site.country,
    },
    knowsLanguage: LANGS.map((l) => localeTag[l]),
  }

  return (
    <Head>
      <html lang={localeTag[lang]} />

      <title>{t.meta.title}</title>
      <meta name="description" content={t.meta.description} />
      <link rel="canonical" href={url} />

      {/* Reciprocal hreflang: every page lists every language INCLUDING
          itself, plus x-default on the root locale. */}
      {LANGS.map((l) => (
        <link key={l} rel="alternate" hrefLang={localeTag[l]} href={localeUrl(l)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={localeUrl(DEFAULT_LANG)} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={t.meta.title} />
      <meta property="og:description" content={t.meta.ogDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={localeOgTag[lang]} />
      {LANGS.filter((l) => l !== lang).map((l) => (
        <meta key={l} property="og:locale:alternate" content={localeOgTag[l]} />
      ))}

      <meta property="og:image" content={ogImage} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={site.name} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t.meta.title} />
      <meta name="twitter:description" content={t.meta.ogDescription} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Head>
  )
}
