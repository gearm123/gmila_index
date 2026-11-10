import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'
import { therapists } from '../data/therapists.ts'
import { telHref } from '../lib/centers.ts'

export default function TherapistDetailPage() {
  const { slug } = useParams()
  const { lang, t } = useLanguage()
  const person = therapists.find((item) => item.slug === slug)

  if (!person) {
    return (
      <article className="prose">
        <h1>{t.notFound.title}</h1>
        <p>{t.notFound.text}</p>
        <Link to="/therapists">{t.therapists.back}</Link>
      </article>
    )
  }

  return (
    <>
      <Seo title={`${person.name[lang]} | GMILA`} description={person.summary[lang]} />
      <article className="prose">
        <p className="kicker">{person.city[lang]}</p>
        <h1>{person.name[lang]}</h1>
        <p>{person.credential[lang]}</p>
        <p className="lede">{person.summary[lang]}</p>
        <p>{person.description[lang]}</p>
        <h2>{t.therapists.focus}</h2>
        <p>{person.focus[lang]}</p>
        <h2>{t.detail.pricing}</h2>
        <p>{person.pricing ? person.pricing[lang] : t.therapists.noPrice}</p>
        <h2>{t.detail.hours}</h2>
        <p>{person.hours[lang]}</p>
        <h2>{t.detail.address}</h2>
        <p>{person.address[lang]}</p>
        <p>
          {person.phone ? <a href={telHref(person.phone)}>{person.phone}</a> : null}
          {person.email ? (
            <>
              {' '}
              <a href={`mailto:${person.email}`}>{person.email}</a>
            </>
          ) : null}
        </p>
        {person.website ? (
          <p>
            <a href={person.website} target="_blank" rel="noreferrer">
              {t.card.website}
            </a>
          </p>
        ) : null}
        <p>
          <span>{t.detail.source}: </span>
          <a href={person.sourceUrl} target="_blank" rel="noreferrer">
            {person.source[lang]}
          </a>
        </p>
        <p>
          <Link to="/therapists">{t.therapists.back}</Link>
        </p>
      </article>
    </>
  )
}
