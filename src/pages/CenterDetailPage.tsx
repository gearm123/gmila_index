import { lazy, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs.tsx'
import Link from '../components/LocaleLink.tsx'
import { breadcrumbJsonLd, type Crumb } from '../seo/breadcrumbs.ts'
import CentersMap from '../components/CentersMap.tsx'
import { ProviderArticleSection } from '../components/ProviderArticles.tsx'
import ReviewList from '../components/ReviewList.tsx'
import InquiryForm from '../components/InquiryForm.tsx'
import TourForm from '../components/TourForm.tsx'
const MissingPage = lazy(() => import('./MissingPage.tsx'))
import RatingStars from '../components/RatingStars.tsx'
import ListingActions from '../components/ListingActions.tsx'
import SafeImage from '../components/SafeImage.tsx'
import Seo from '../components/Seo.tsx'
import { centerCompareEntry } from '../lib/compareEntry.ts'
import { trackConversion } from '../lib/conversions.ts'
import { useLanguage } from '../context/LanguageContext.tsx'
import {
  getCenterByPath,
  googleDirectionsUrl,
  googlePlaceUrl,
  telHref,
  whatsappHref,
} from '../lib/centers.ts'
import { centerCountryId, countryName } from '../lib/places.ts'
import { cityTopic, topicPath } from '../seo/topics.ts'
import { centerPath, cityPathSlug } from '../lib/paths.ts'
import { metaDescription, metaTitle } from '../seo/meta.ts'
import { centerIsFilled } from '../seo/filled.ts'
import { centerProviderJsonLd } from '../seo/provider.ts'
import { relatedCenters } from '../seo/links.ts'
import type { Center } from '../types/center.ts'

export default function CenterDetailPage() {
  const { city, center: centerSlug } = useParams()
  const center = getCenterByPath(city, centerSlug)
  if (!center) return <MissingPage />
  return <CenterProfile key={center.id} center={center} />
}

function CenterProfile({ center }: { center: Center }) {
  const { lang, t } = useLanguage()
  const [photo, setPhoto] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  useEffect(() => {
    if (!lightbox) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightbox(false)
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox])

  const name = center.name[lang]
  const path = centerPath(center)
  const city = cityTopic(cityPathSlug(center.cityId))
  const related = relatedCenters(center)
  const crumbs: Crumb[] = [
    { name: t.nav.home, path: '/' },
    { name: t.crumbs.rehab, path: '/centers/' },
  ]
  if (city?.place) crumbs.push({ name: city.place[lang], path: topicPath(city) })
  crumbs.push({ name, path })
  const message = `${t.whatsappText} ${name}`
  const facts = [
    [t.detail.address, center.address[lang]],
    [t.detail.hours, center.hours[lang]],
    [t.detail.languages, center.languages[lang]],
    [t.detail.ages, center.ages[lang]],
    [t.detail.supervision, center.supervision[lang]],
    [t.detail.care, center.care.map((item) => t.care[item]).join(', ')],
    [t.detail.focus, center.focus.map((item) => t.focus[item]).join(', ')],
  ]

  function step(delta: number) {
    setPhoto((current) => (current + delta + center.images.length) % center.images.length)
  }

  return (
    <article className="detail">
      <Seo
        title={metaTitle(name, lang === 'he' ? `ב${center.city[lang]}` : `in ${center.city[lang]}`, lang === 'he' ? 'גמילה, כתובת, טלפון, פרטים ומקור פתוח' : 'rehab, address, phone, info')}
        description={metaDescription(
          `${name} ${lang === 'he' ? 'ב' : 'in '}${center.city[lang]}. ${center.summary[lang]}`,
          lang === 'he'
            ? 'הכתובת והטלפון בכרטיס הם אלה שפורסמו, ושדה ריק נשאר ריק. זו אינה המלצה רפואית.'
            : 'The address and phone on the card are the ones that were published, and an empty field stays empty. This is not a medical recommendation or a ranking.',
        )}
        path={path}
        index={centerIsFilled(center)}
        jsonLd={[centerProviderJsonLd(center, lang, path), breadcrumbJsonLd(crumbs, lang)]}
      />
      <Breadcrumbs items={crumbs} />
      <header className="page-intro">
        <p className="kicker">
          {center.city[lang]} · {countryName(centerCountryId(center), lang)} · {center.region[lang]}
        </p>
        <h1>{name}</h1>
        {center.googleRating != null ? (
          <RatingStars
            rating={center.googleRating}
            count={center.googleReviewCount ?? undefined}
            label={t.detail.rating}
            reviewsLabel={t.detail.reviews}
          />
        ) : (
          <p className="source-note">{t.detail.noRating}</p>
        )}
        {center.sample ? <p className="inquiry__note">{t.detail.sampleNote}</p> : null}
      </header>

      <div className="detail__gallery">
        <button type="button" className="frame detail__photo" onClick={() => setLightbox(true)}>
          <SafeImage src={center.images[photo]} alt={`${name} ${photo + 1}`} priority />
        </button>
        <div className="detail__thumbs" aria-label={t.detail.gallery}>
          {center.images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              className={index === photo ? 'is-selected' : undefined}
              onClick={() => setPhoto(index)}
            >
              <SafeImage src={image} alt="" />
            </button>
          ))}
        </div>
      </div>

      <div className="detail__grid">
        <div>
          <h2>{t.detail.about}</h2>
          <p className="lede">{center.summary[lang]}</p>
          <p>{center.description[lang]}</p>
          {center.pricing ? (
            <>
              <h2>{t.detail.pricing}</h2>
              <p>{center.pricing[lang]}</p>
            </>
          ) : null}
          {center.branches.length > 0 ? (
            <>
              <h2>{t.detail.branches}</h2>
              <ul className="branch-list">
                {center.branches.map((branch) => (
                  <li key={`${branch.name.en}-${branch.phone}`}>
                    <h3>{branch.name[lang]}</h3>
                    <p>{branch.detail[lang]}</p>
                    {branch.phone ? (
                      <a
                        href={telHref(branch.phone)}
                        onClick={() => trackConversion('call', { id: center.id, type: 'center', name })}
                      >
                        {branch.phone}
                      </a>
                    ) : null}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          <ReviewList center={center} />
          <ProviderArticleSection kind="center" id={center.id} />
          <dl className="facts">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <p className="source-note">
            {t.detail.source}:{' '}
            {center.sourceUrl ? (
              <a href={center.sourceUrl} target="_blank" rel="noreferrer">
                {center.source[lang]}
              </a>
            ) : (
              center.source[lang]
            )}
          </p>
        </div>
        <aside className="detail__contact">
          {center.phone ? (
            <p className="detail__phone">
              <a
                href={telHref(center.phone)}
                onClick={() => trackConversion('call', { id: center.id, type: 'center', name })}
              >
                {center.phone}
              </a>
            </p>
          ) : null}
          <div className="detail__actions">
            <ListingActions entry={centerCompareEntry(center)} contactTo="#inquiry" />
            <a className="site-cta" href="#tour">
              {t.card.bookTour}
            </a>
            {center.whatsapp ? (
              <a className="site-cta" href={whatsappHref(center, message)} target="_blank" rel="noreferrer">
                {t.card.whatsapp}
              </a>
            ) : null}
            {center.email ? (
              <a className="site-cta" href={`mailto:${center.email}`}>
                {t.card.email}
              </a>
            ) : null}
            {center.website ? (
              <a className="site-cta" href={center.website} target="_blank" rel="noreferrer">
                {t.card.website}
              </a>
            ) : null}
            <a className="site-cta" href={googlePlaceUrl(center)} target="_blank" rel="noreferrer">
              {t.detail.google}
            </a>
            <a className="site-cta" href={googleDirectionsUrl(center)} target="_blank" rel="noreferrer">
              {t.detail.directions}
            </a>
          </div>
          {center.social.length > 0 ? (
            <div className="social-row">
              {center.social.map((link) => (
                <a key={link.url} className="site-cta" href={link.url} target="_blank" rel="noreferrer">
                  {t.social[link.network]}
                </a>
              ))}
            </div>
          ) : null}
          <InquiryForm center={center} />
          <TourForm center={center} />
        </aside>
      </div>

      <CentersMap
        centers={[center]}
        highlightedId={center.id}
        selectedId={null}
        onSelect={() => undefined}
        onClear={() => undefined}
      />

      {related.length > 0 || city?.place ? (
        <section className="band">
          <div className="section-head">
            <h2>{t.detail.related}</h2>
            <p>{t.detail.relatedNote}</p>
          </div>
          <div className="area-grid">
            {related.map((item) => (
              <Link key={item.id} className="area-card" to={centerPath(item)}>
                <h3>{item.name[lang]}</h3>
                <span>{item.city[lang]}</span>
              </Link>
            ))}
            {city?.place ? (
              <Link className="area-card" to={topicPath(city)}>
                <h3>{city.h1[lang]}</h3>
              </Link>
            ) : null}
          </div>
        </section>
      ) : null}

      <div className="mobile-actions">
        <ListingActions entry={centerCompareEntry(center)} contactTo="#inquiry" />
        <a className="site-cta" href="#tour">
          {t.card.bookTour}
        </a>
        {center.whatsapp ? (
          <a className="site-cta" href={whatsappHref(center, message)} target="_blank" rel="noreferrer">
            {t.card.whatsapp}
          </a>
        ) : null}
        <a className="site-cta" href={googleDirectionsUrl(center)} target="_blank" rel="noreferrer">
          {t.detail.directions}
        </a>
      </div>

      {lightbox ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={t.detail.gallery}>
          <button type="button" className="lightbox__close" onClick={() => setLightbox(false)}>
            {t.map.close}
          </button>
          <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => step(-1)} aria-label="previous">
            ‹
          </button>
          <SafeImage src={center.images[photo]} alt={`${name} ${photo + 1}`} />
          <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => step(1)} aria-label="next">
            ›
          </button>
        </div>
      ) : null}
    </article>
  )
}
