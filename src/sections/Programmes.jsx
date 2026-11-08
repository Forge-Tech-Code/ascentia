import { useLang } from '../i18n'
import PuzzlePiece from '../components/PuzzlePiece'
import Reveal from '../components/Reveal'

// Decorative fills for the service cards, in turn.
const ACCENTS = ['text-mauve', 'text-sun', 'text-teal']

export default function Programmes() {
  const { t } = useLang()
  const { early, services } = t.programmes

  return (
    <section id="programmes" className="bg-sage py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <h2 className="section-heading">{t.programmes.heading}</h2>
        <p className="lede mt-3 text-ink">{t.programmes.sub}</p>

        {/* Ages 4–6 — the "Enrolling now!" poster */}
        <Reveal className="mt-10">
          <div className="card relative overflow-hidden sm:flex sm:items-center sm:gap-10">
            <div className="relative shrink-0 w-40 h-28 mx-auto sm:mx-0 mb-6 sm:mb-0">
              <PuzzlePiece className="absolute left-0 top-2 w-24 h-24 text-mauve -rotate-12" />
              <PuzzlePiece className="absolute right-0 top-0 w-24 h-24 text-sun rotate-[14deg]" />
            </div>
            <div>
              <p className="inline-block rounded-full bg-sun px-4 py-1.5 font-sans text-[13px] font-semibold text-ink">
                {early.badge}
              </p>
              <h3 className="mt-3 font-display font-semibold text-3xl sm:text-4xl text-teal-deep">{early.title}</h3>
              <p className="mt-2 font-sans text-base sm:text-lg text-ink">{early.body}</p>
            </div>
          </div>
        </Reveal>

        {/* The four services from the client's feedback */}
        <Reveal className="mt-8">
          <div className="grid sm:grid-cols-2 gap-5">
            {services.map((service, i) => (
              <div key={service.title} className="card flex gap-5 items-start">
                <PuzzlePiece
                  className={`shrink-0 w-12 h-12 ${ACCENTS[i % ACCENTS.length]} ${i % 2 ? 'rotate-12' : '-rotate-12'}`}
                />
                <div>
                  <h3 className="font-display font-semibold text-2xl text-teal-deep">{service.title}</h3>
                  <p className="mt-1.5 font-sans text-base text-ink">{service.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
