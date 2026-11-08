// CROATIAN. Only `learning.items` is the client's own Croatian, copied from
// her posters. EVERYTHING ELSE HERE IS A DRAFT TRANSLATION of her English
// poster text, written for the first review and not yet approved by her —
// see CLAUDE.md → "What's real, what's a draft". Replace it with her wording
// as she sends it; do not polish it on her behalf.
// Same shape as en.js — the build fails if they drift (see ./index.jsx).
export default {
  meta: {
    title: 'Ascentia Education — Supetar, Brač',
    description:
      'Ascentia Education u Supetru na Braču: učenje kroz igru, kreativnost i istraživanje za djecu od 4 do 6 godina te hrvatski i engleski za djecu i odrasle.',
    ogDescription: 'I mali koraci vode do velikih ciljeva. Učenje kroz igru za djecu od 4 do 6 godina te hrvatski i engleski za djecu i odrasle, u Supetru na Braču.',
  },
  site: {
    tagline: 'I mali koraci vode do velikih ciljeva',
    location: 'Supetar, otok Brač',
  },
  nav: {
    programmes: 'Programi',
    learning: 'Što djeca uče',
    contact: 'Kontakt',
  },
  switcher: {
    aria: 'Jezik',
  },
  hero: {
    // One chunk per colour. Five chunks to the English six — allowed, see
    // FREE_LENGTH in ./index.jsx.
    slogan: ['I mali', 'koraci', 'vode', 'do velikih', 'ciljeva'],
    lead: 'Učenje kroz igru, kreativnost i istraživanje.',
    cta: 'Javite nam se',
    secondary: 'Naši programi',
    photoAlt: 'Dijete i odrasla osoba zajedno slažu podnu slagalicu',
  },
  programmes: {
    heading: 'Programi',
    sub: 'Pridružite nam se – rastimo, učimo i igrajmo se zajedno!',
    early: {
      badge: 'Upisi u tijeku!',
      title: 'Od 4 do 6 godina',
      body: 'Učenje kroz igru, kreativnost i istraživanje.',
    },
    // Drafted from the client's English feedback (2026-11-08) — she must review it.
    services: [
      { title: 'Hrvatski jezik', body: 'Za one kojima hrvatski nije materinski — odrasle i djecu' },
      { title: 'Engleski jezik', body: 'Za djecu i odrasle' },
      { title: 'Instrukcije', body: 'Za učenike od 1. do 8. razreda' },
      {
        title: 'Individualni rad',
        body: 'Rad jedan na jedan s djecom koja imaju poteškoća u učenju, uz misaone igre',
      },
    ],
  },
  learning: {
    heading: 'Što djeca uče',
    // The client's own Croatian, verbatim from her posters.
    items: {
      literacy: {
        title: 'Emocionalna pismenost',
        intro: 'Dijete uči:',
        points: [
          'Prepoznati i imenovati sreću, tugu, ljutnju i strah',
          'Smiriti se i kontrolirati impulse u teškim trenucima',
          'Izraziti emocije bez burnih reakcija',
        ],
      },
      empathy: {
        title: 'Empatija i pripadnost',
        intro: 'Dijete razvija sposobnost da:',
        points: [
          'Razumije kako se drugi osjećaju u određenoj situaciji',
          'Utješi prijatelja i pomogne mlađima od sebe',
          'Osjeti sigurnost i pripadnost u svojoj skupini',
        ],
      },
    },
  },
  contact: {
    heading: 'Napravite prvi korak već danas!',
    sub: 'Prijavite se!',
    phone: 'Telefon',
    email: 'E-pošta',
    address: 'Adresa',
  },
  footer: {
    backToTop: 'Natrag na vrh',
  },
}
