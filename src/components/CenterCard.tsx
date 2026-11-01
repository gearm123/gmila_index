import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.tsx'
import { googlePlaceUrl, telHref, whatsappHref } from '../lib/centers.ts'
import { centerCountryId, countryName } from '../lib/places.ts'
import type { Center } from '../types/center.ts'
import RatingStars from './RatingStars.tsx'
import SafeImage from './SafeImage.tsx'

type CenterCardProps = {
  center: Center
  selected: boolean
  onHover: (id: string | null) => void
  onShowOnMap: (id: string) => void
}

export default function CenterCard({ center, selected, onHover, onShowOnMap }: CenterCardProps) {
  const { lang, t } = useLanguage()
  const name = center.name[lang]
  const message = `${t.whatsappText} ${name}`

  return (
    <article
      id={`center-${center.id}`}
      className={selected ? 'center-card is-selected' : 'center-card'}
      onMouseEnter={() => onHover(center.id)}
      onMouseLeave={() => onHover(null)}
    >
      <Link to={`/centers/${center.slug}`} className="center-card__media">
        <span className="frame">
          <SafeImage src={center.images[0]} alt={name} />
        </span>
        <span className="center-card__badges">
          {center.sample ? <span className="badge badge--sample">{t.card.sample}</span> : null}
          {center.publicFunding ? <span className="badge">{t.card.funded}</span> : null}
        </span>
      </Link>

      <div className="center-card__body">
        <p className="kicker">
          {center.city[lang]} · {countryName(centerCountryId(center), lang)} · {t.care[center.care[0]]}
        </p>
        <h2>
          <Link to={`/centers/${center.slug}`}>{name}</Link>
        </h2>
        {center.googleRating != null ? (
          <RatingStars
            rating={center.googleRating}
            count={center.googleReviewCount ?? undefined}
            label={t.detail.rating}
          />
        ) : null}
        <p className="center-card__summary">{center.summary[lang]}</p>
        <ul className="tags">
          {center.focus.slice(0, 3).map((focus) => (
            <li key={focus}>{t.focus[focus]}</li>
          ))}
        </ul>
        <div className="center-card__actions">
          <Link className="site-cta site-cta--solid" to={`/centers/${center.slug}#tour`}>
            {t.card.bookTour}
          </Link>
          {center.phone ? (
            <a className="site-cta" href={telHref(center.phone)}>
              {t.card.call}
            </a>
          ) : null}
          {center.whatsapp ? (
            <a className="site-cta" href={whatsappHref(center, message)} target="_blank" rel="noreferrer">
              {t.card.whatsapp}
            </a>
          ) : null}
          <a className="site-cta" href={googlePlaceUrl(center)} target="_blank" rel="noreferrer">
            {t.detail.google}
          </a>
          <button type="button" className="text-button" onClick={() => onShowOnMap(center.id)}>
            {t.card.onMap}
          </button>
        </div>
      </div>
    </article>
  )
}
