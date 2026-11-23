import { lazy, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs.tsx'
import Link from '../components/LocaleLink.tsx'
import { breadcrumbJsonLd, pagedCrumbs } from '../seo/breadcrumbs.ts'
import { providerItemList, providerPageUrl, therapistSchemaType } from '../seo/provider.ts'
import { metaDescription, metaTitle } from '../seo/meta.ts'
import { localePath } from '../lib/locale.ts'
import ListingActions from '../components/ListingActions.tsx'
import ListingPages from '../components/ListingPages.tsx'
import Seo from '../components/Seo.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'
import { therapists } from '../data/therapists.ts'
import { therapistCompareEntry } from '../lib/compareEntry.ts'
import { LISTING_PAGE_SIZE, listingPagePath, pageCount, pagedTitle, parseListingPage, slicePage } from '../lib/pagination.ts'
import { therapistPath } from '../lib/paths.ts'
const MissingPage = lazy(() => import('./MissingPage.tsx'))

export default function TherapistsPage() {
  const { lang, t } = useLanguage()
  const navigate = useNavigate()
  const { page: pageParam } = useParams()
  const requested = parseListingPage(pageParam)
  const [q, setQ] = useState('')
  const query = q.trim().toLowerCase()
  const pages = pageCount(therapists.length)
  const page = requested ?? 1
  const narrowed = query.length > 0
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
  useEffect(() => {
    if (pageParam === '1') navigate(localePath('/therapists/', lang), { replace: true })
  }, [pageParam, navigate, lang])
  if (requested == null || (!narrowed && requested > pages)) return <MissingPage />
  const visible = narrowed ? list : slicePage(therapists, page)
  const path = listingPagePath('/therapists/', narrowed ? 1 : page)
  const crumbs = pagedCrumbs(
    [
      { name: t.nav.home, path: '/' },
      { name: t.nav.therapists, path: '/therapists/' },
    ],
    narrowed ? 1 : page,
    t.pager.page,
    path,
  )

  return (
    <>
      <Seo
        title={pagedTitle(
          metaTitle(t.therapists.title, lang === 'he' ? 'בישראל' : 'in Israel', lang === 'he' ? 'לפי האתר של המטפל עצמו' : 'from their own site'),
          narrowed ? 1 : page,
          t.pager.page,
        )}
        description={metaDescription(
          t.therapists.lede,
          lang === 'he' ? 'זו אינה רשימת המרכזים, ואינה המלצה רפואית.' : 'This is not the list of centers, and it is not a medical recommendation.',
        )}
        path={path}
        index={query.length === 0}
        jsonLd={[
          breadcrumbJsonLd(crumbs, lang),
          narrowed
            ? null
            : providerItemList(
                t.therapists.title,
                visible.map((person) => ({
                  type: therapistSchemaType(person),
                  name: person.name[lang],
                  url: providerPageUrl(therapistPath(person.slug), lang),
                })),
                (page - 1) * LISTING_PAGE_SIZE + 1,
              ),
        ].filter((node) => node != null)}
      />
      <Breadcrumbs items={crumbs} />
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
      <ListingPages
        base="/therapists/"
        page={page}
        pages={narrowed ? 1 : pages}
        label={t.pager.nav}
        prev={t.pager.prev}
        next={t.pager.next}
      />
      <div className="feature-list">
        {visible.map((person) => (
          <article key={person.id} className="center-card">
            <div className="center-card__body">
              <p className="kicker">{person.city[lang]}</p>
              <h2>
                <Link to={therapistPath(person.slug)}>{person.name[lang]}</Link>
              </h2>
              <p className="center-card__summary">{person.credential[lang]}</p>
              <p>{person.summary[lang]}</p>
              <p className="center-card__quote">
                {person.pricing ? person.pricing[lang] : t.therapists.noPrice}
              </p>
              <p className="center-card__rating-note">{person.focus[lang]}</p>
              <div className="center-card__actions">
                <ListingActions
                  entry={therapistCompareEntry(person)}
                  contactTo={person.email ? `mailto:${person.email}` : `${therapistPath(person.slug)}#contact`}
                />
                <Link className="site-cta" to={therapistPath(person.slug)}>
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
