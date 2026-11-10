import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'
import { therapists } from '../data/therapists.ts'
import { telHref } from '../lib/centers.ts'

export default function TherapistsPage() {
  const { lang, t } = useLanguage()
  const [q, setQ] = useState('')
  const query = q.trim().toLowerCase()
  const list = useMemo(
    () =>
      therapists.filter((person) => {
        if (!query) return true
        const blob = [person.name.he, person.name.en, person.city.he, person.city.en, person.focus.he, person.focus.en]
          .join(' ')
          .toLowerCase()
        return blob.includes(query)
      }),
    [query],
  )

  return (
    <>
      <Seo title={t.meta.therapists} description={t.therapists.lede} />
      <section className="page-intro">
        <p className="kicker">{t.therapists.kicker}</p>
        <h1>{t.therapists.title}</h1>
        <p className="lede">{t.therapists.lede}</p>
        <label className="field field--search">
          <span>{t.filters.search}</span>
          <input value={q} onChange={(event) => setQ(event.target.value)} placeholder={t.therapists.search} />
        </label>
        <p className="filters__count">
          {list.length === 1 ? t.therapists.countOne : `${list.length} ${t.therapists.count}`}
        </p>
      </section>
      <div className="feature-list">
        {list.map((person) => (
          <article key={person.id} className="center-card">
            <div className="center-card__body">
              <p className="kicker">{person.city[lang]}</p>
              <h2>
                <Link to={`/therapists/${person.slug}`}>{person.name[lang]}</Link>
              </h2>
              <p className="center-card__summary">{person.credential[lang]}</p>
              <p>{person.summary[lang]}</p>
              <p className="center-card__quote">
                {person.pricing ? person.pricing[lang] : t.therapists.noPrice}
              </p>
              <p className="center-card__rating-note">{person.focus[lang]}</p>
              <div className="center-card__actions">
                {person.phone ? (
                  <a className="site-cta site-cta--solid" href={telHref(person.phone)}>
                    {t.card.call}
                  </a>
                ) : null}
                <Link className="site-cta" to={`/therapists/${person.slug}`}>
                  {t.card.details}
                </Link>
                {person.website ? (
                  <a className="site-cta" href={person.website} target="_blank" rel="noreferrer">
                    {t.card.website}
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
      {list.length === 0 ? (
        <section className="empty">
          <h2>{t.filters.emptyTitle}</h2>
          <p>{t.filters.emptyText}</p>
        </section>
      ) : null}
    </>
  )
}
