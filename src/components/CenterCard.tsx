import Link from './LocaleLink.tsx'
import ListingActions from './ListingActions.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'
import { centerCompareEntry } from '../lib/compareEntry.ts'
import { googlePlaceUrl, programGroup, whatsappHref } from '../lib/centers.ts'
import { centerPath } from '../lib/paths.ts'
import { centerCountryId, countryName } from '../lib/places.ts'
import type { Center } from '../types/center.ts'
import RatingStars from './RatingStars.tsx'
import SafeImage from './SafeImage.tsx'

type CenterCardProps = {
  center: Center
  selected: boolean
  onHover: (id: string | null) => void
  onShowOnMap: (id: string) => void
  /** h3 when the card sits under a section heading. h2 when the card is the section. */
  heading?: 'h2' | 'h3'
}

export default function CenterCard({ center, selected, onHover, onShowOnMap, heading = 'h2' }: CenterCardProps) {
  const { lang, t } = useLanguage()
  const name = center.name[lang]
  const message = `${t.whatsappText} ${name}`
  const Title = heading

  return (
    <article
      id={`center-${center.id}`}
      className={selected ? 'center-card is-selected' : 'center-card'}
      onMouseEnter={() => onHover(center.id)}
      onMouseLeave={() => onHover(null)}
    >
      <Link to={centerPath(center)} className="center-card__media">
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
          {center.city[lang]} · {countryName(centerCountryId(center), lang)} · {t.program[programGroup(center)].title}
        </p>
        <Title>
          <Link to={centerPath(center)}>{name}</Link>
        </Title>
        {center.googleRating != null ? (
          <RatingStars
            rating={center.googleRating}
            count={center.googleReviewCount ?? undefined}
            label={t.detail.rating}
            reviewsLabel={t.detail.reviews}
          />
        ) : (
          <p className="center-card__rating-note">{t.detail.noRating}</p>
        )}
        {center.quotes[0] ? (
          <p className="center-card__quote">
            “{center.quotes[0].quote[lang]}”
            <span>{center.quotes[0].by[lang]}</span>
          </p>
        ) : null}
        <p className="center-card__summary">{center.summary[lang]}</p>
        <ul className="tags">
          {center.focus.slice(0, 3).map((focus) => (
            <li key={focus}>{t.focus[focus]}</li>
          ))}
        </ul>
        <div className="center-card__actions">
          <ListingActions entry={centerCompareEntry(center)} contactTo={`${centerPath(center)}#inquiry`} />
          <Link className="site-cta" to={`${centerPath(center)}#tour`}>
            {t.card.bookTour}
          </Link>
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
