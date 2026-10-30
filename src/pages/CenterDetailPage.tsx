import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CentersMap from '../components/CentersMap.tsx'
import InquiryForm from '../components/InquiryForm.tsx'
import NotFoundPage from './NotFoundPage.tsx'
import RatingStars from '../components/RatingStars.tsx'
import SafeImage from '../components/SafeImage.tsx'
import Seo from '../components/Seo.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'
import {
  getCenterBySlug,
  googleDirectionsUrl,
  googlePlaceUrl,
  telHref,
  whatsappHref,
} from '../lib/centers.ts'
import { useViewport } from '../lib/viewport.ts'
import type { Center } from '../types/center.ts'

export default function CenterDetailPage() {
  const { slug } = useParams()
  const center = getCenterBySlug(slug)
  if (!center) return <NotFoundPage />
  return <CenterProfile key={center.id} center={center} />
}

function CenterProfile({ center }: { center: Center }) {
  const { lang, t } = useLanguage()
  const mobile = useViewport() === 'mobile'
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
      <Seo title={`${name} | GMILA`} description={center.summary[lang]} />
      <p className="detail__back">
        <Link to="/centers">{t.detail.back}</Link>
      </p>
      <header className="page-intro">
        <p className="kicker">
          {center.city[lang]} · {center.region[lang]}
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
          <SafeImage src={center.images[photo]} alt={`${name} ${photo + 1}`} />
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
                    <strong>{branch.name[lang]}</strong>
                    <p>{branch.detail[lang]}</p>
                    {branch.phone ? <a href={telHref(branch.phone)}>{branch.phone}</a> : null}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {center.quotes.length > 0 ? (
            <>
              <h2>{t.detail.quotes}</h2>
              <ul className="quotes">
                {center.quotes.map((item) => (
                  <li key={item.quote.en}>
                    <blockquote>
                      <p>{item.quote[lang]}</p>
                      <footer>{item.by[lang]}</footer>
                    </blockquote>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
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
              <a href={telHref(center.phone)}>{center.phone}</a>
            </p>
          ) : null}
          <div className="detail__actions">
            {center.phone ? (
              <a className="site-cta site-cta--solid" href={telHref(center.phone)}>
                {t.card.call}
              </a>
            ) : null}
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
        </aside>
      </div>

      <CentersMap
        centers={[center]}
        highlightedId={center.id}
        selectedId={null}
        onSelect={() => undefined}
        onClear={() => undefined}
      />

      {mobile ? (
        <div className="mobile-actions">
          {center.phone ? (
            <a className="site-cta site-cta--solid" href={telHref(center.phone)}>
              {t.card.call}
            </a>
          ) : null}
          {center.whatsapp ? (
            <a className="site-cta" href={whatsappHref(center, message)} target="_blank" rel="noreferrer">
              {t.card.whatsapp}
            </a>
          ) : null}
          <a className="site-cta" href={googleDirectionsUrl(center)} target="_blank" rel="noreferrer">
            {t.detail.directions}
          </a>
        </div>
      ) : null}

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
