import { lazy } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs.tsx'
import { ProviderArticleSection } from '../components/ProviderArticles.tsx'
import ListingActions from '../components/ListingActions.tsx'
import Seo from '../components/Seo.tsx'
import { therapistCompareEntry } from '../lib/compareEntry.ts'
import { trackConversion } from '../lib/conversions.ts'
import { breadcrumbJsonLd } from '../seo/breadcrumbs.ts'
import { useLanguage } from '../context/LanguageContext.tsx'
import { therapists } from '../data/therapists.ts'
import { telHref } from '../lib/centers.ts'
import { therapistPath } from '../lib/paths.ts'
import { metaDescription, metaTitle } from '../seo/meta.ts'
import { therapistIsFilled } from '../seo/filled.ts'
import { therapistProviderJsonLd } from '../seo/provider.ts'

const MissingPage = lazy(() => import('./MissingPage.tsx'))

export default function TherapistDetailPage() {
  const { slug } = useParams()
  const { lang, t } = useLanguage()
  const person = therapists.find((item) => item.slug === slug)

  if (!person) return <MissingPage />
  const crumbs = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.therapists, path: '/therapists/' },
    { name: person.name[lang], path: therapistPath(person.slug) },
  ]

  return (
    <>
      <Seo
        title={metaTitle(
          person.name[lang],
          lang === 'he' ? `ב${person.city[lang]}` : `in ${person.city[lang]}`,
          lang === 'he' ? 'מטפל בהתמכרויות, טלפון ומידע' : 'addiction therapist, info',
        )}
        description={metaDescription(
          `${person.name[lang]} ${lang === 'he' ? 'ב' : 'in '}${person.city[lang]}. ${person.summary[lang]}`,
          lang === 'he'
            ? 'הטלפון והמחיר מופיעים רק אם האתר של המטפל פרסם אותם. שדה ריק נשאר ריק. זו אינה המלצה.'
            : 'The phone and price appear only when the therapist’s site published them. An empty field stays empty. This is not a recommendation.',
        )}
        path={therapistPath(person.slug)}
        index={therapistIsFilled(person)}
        jsonLd={[therapistProviderJsonLd(person, lang, therapistPath(person.slug)), breadcrumbJsonLd(crumbs, lang)]}
      />
      <article className="prose">
        <Breadcrumbs items={crumbs} />
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
        <ProviderArticleSection kind="therapist" id={person.id} />
        <div className="center-card__actions" id="contact">
          <ListingActions
            entry={therapistCompareEntry(person)}
            contactTo={person.email ? `mailto:${person.email}` : '#contact'}
          />
        </div>
        <p>
          {person.phone ? (
            <a
              href={telHref(person.phone)}
              onClick={() => trackConversion('call', { id: person.id, type: 'therapist', name: person.name[lang] })}
            >
              {person.phone}
            </a>
          ) : null}
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
      </article>
    </>
  )
}
