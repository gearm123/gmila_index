import { lazy, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs.tsx'
import Link from '../components/LocaleLink.tsx'
import { breadcrumbJsonLd, pagedCrumbs, type Crumb } from '../seo/breadcrumbs.ts'
import { localePath } from '../lib/locale.ts'
import CenterCard from '../components/CenterCard.tsx'
import CityBrief from '../components/CityBrief.tsx'
import FaqList from '../components/FaqList.tsx'
import PublishedPrices from '../components/PublishedPrices.tsx'
import CentersMap from '../components/CentersMap.tsx'
import ListingActions from '../components/ListingActions.tsx'
import ListingPages from '../components/ListingPages.tsx'
import Seo from '../components/Seo.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'
import { hebrewNameOrder } from '../lib/centers.ts'
import { LISTING_PAGE_SIZE, listingPagePath, pageCount, pagedTitle, parseListingPage, slicePage } from '../lib/pagination.ts'
import { therapistCompareEntry } from '../lib/compareEntry.ts'
import { centerPath, therapistPath } from '../lib/paths.ts'
import { hubsForTopic, nearbyCities } from '../seo/links.ts'
import { faqJsonLd, faqsForTopic } from '../seo/faqs.ts'
import { locationIsFilled } from '../seo/filled.ts'
import { GUIDE_MODIFIED, GUIDE_PUBLISHED, articleCopy as guideMeta, publishedDateLabel } from '../seo/articleCopy.ts'
import { organizationId } from '../seo/organization.ts'
import { centerSchemaType, providerItemList, providerPageUrl, therapistSchemaType } from '../seo/provider.ts'
import { absoluteUrl } from '../seo/site.ts'
import {
  articleCopy,
  centersForTopic,
  guideCopy,
  therapistsForTopic,
  topicBySlug,
  topicPath,
  topicShape,
  topicsInGroup,
  type TopicGroup,
} from '../seo/topics.ts'
const MissingPage = lazy(() => import('./MissingPage.tsx'))

export default function TopicPage({ group }: { group: TopicGroup | 'rehab' }) {
  const { slug, page } = useParams()
  const topic = topicBySlug(slug, group)
  if (!topic) return <MissingPage />
  return <TopicProfile key={`${topic.slug}-${page ?? '1'}`} topic={topic} />
}

function TopicProfile({ topic }: { topic: NonNullable<ReturnType<typeof topicBySlug>> }) {
  const { lang, t } = useLanguage()
  const navigate = useNavigate()
  const { page: pageParam } = useParams()
  const requested = parseListingPage(pageParam)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const ordered = useMemo(() => hebrewNameOrder(centersForTopic(topic)), [topic])
  const pages = pageCount(ordered.length)
  const page = requested ?? 1
  const pageItems = useMemo(() => slicePage(ordered, page), [ordered, page])
  const matches = useMemo(
    () => pageItems.slice().sort((a, b) => a.name[lang].localeCompare(b.name[lang], lang) || a.id.localeCompare(b.id)),
    [pageItems, lang],
  )
  const people = useMemo(() => (page === 1 ? therapistsForTopic(topic) : []), [topic, page])
  const faqItems = useMemo(
    () => (page === 1 ? faqsForTopic(topic, ordered, therapistsForTopic(topic)) : []),
    [page, topic, ordered],
  )
  const related =
    topic.group === 'city' ? [] : topicsInGroup(topic.group).filter((item) => item.slug !== topic.slug).slice(0, 8)
  const nearby = page === 1 ? nearbyCities(topic) : []
  const hubs = page === 1 ? hubsForTopic(topic) : []
  const base = topicPath(topic)
  const path = listingPagePath(base, page)
  useEffect(() => {
    if (pageParam === '1') navigate(localePath(base, lang), { replace: true })
  }, [pageParam, base, navigate, lang])
  if (requested == null || requested > pages) return <MissingPage />
  const url = absoluteUrl(localePath(path, lang))
  const shape = topicShape(topic)
  const copy = articleCopy[lang]
  const home: Crumb = { name: t.nav.home, path: '/' }
  const trail: Crumb[] =
    topic.group === 'question'
      ? [home, { name: guideCopy[lang].nav, path: '/guides/' }, { name: topic.h1[lang], path: base }]
      : topic.group === 'therapy'
        ? [home, { name: t.nav.therapists, path: '/therapists/' }, { name: topic.h1[lang], path: base }]
        : [
            home,
            { name: t.crumbs.rehab, path: '/centers/' },
            { name: topic.place ? topic.place[lang] : topic.h1[lang], path: base },
          ]
  const crumbs = pagedCrumbs(trail, page, t.pager.page, path)
  const listing = providerItemList(
    topic.h1[lang],
    matches.map((center) => ({
      type: centerSchemaType(center),
      name: center.name[lang],
      url: providerPageUrl(centerPath(center), lang),
    })),
    (page - 1) * LISTING_PAGE_SIZE + 1,
  )
  const article =
    shape === 'article'
      ? {
          '@type': 'Article',
          headline: topic.h1[lang],
          description: topic.description[lang],
          inLanguage: lang === 'he' ? 'he' : 'en',
          mainEntityOfPage: url,
          author: { '@id': organizationId() },
          publisher: { '@id': organizationId() },
          ...(topic.group === 'question'
            ? { datePublished: GUIDE_PUBLISHED, dateModified: GUIDE_MODIFIED }
            : {}),
        }
      : null
  const peopleListing = providerItemList(
    topic.group === 'therapy' ? topic.h1[lang] : copy.peopleHeading,
    people.map((person) => ({
      type: therapistSchemaType(person),
      name: person.name[lang],
      url: providerPageUrl(therapistPath(person.slug), lang),
    })),
  )
  const structured = [article, breadcrumbJsonLd(crumbs, lang), listing, peopleListing, faqItems.length > 0 ? faqJsonLd(faqItems, lang) : null].filter(
    (item) => item != null,
  )

  const list = matches.length > 0 ? (
    <section className="band" aria-label={shape === 'article' ? copy.listHeading : topic.h1[lang]}>
      {shape === 'article' || topic.group === 'city' ? <h2 className="list-heading">{copy.listHeading}</h2> : null}
      <CentersMap
        centers={matches}
        highlightedId={selectedId}
        selectedId={selectedId}
        onSelect={(id) => setSelectedId((current) => (current === id ? null : id))}
        onClear={() => setSelectedId(null)}
      />
      <ListingPages base={base} page={page} pages={pages} label={t.pager.nav} prev={t.pager.prev} next={t.pager.next} />
      <div className="feature-list">
        {matches.map((center) => (
          <CenterCard
            key={center.id}
            heading={shape === 'article' || topic.group === 'city' ? 'h3' : 'h2'}
            center={center}
            selected={selectedId === center.id}
            onHover={() => undefined}
            onShowOnMap={setSelectedId}
          />
        ))}
      </div>
      <ListingPages base={base} page={page} pages={pages} label={t.pager.nav} prev={t.pager.prev} next={t.pager.next} />
    </section>
  ) : null

  return (
    <>
      <Seo
        title={pagedTitle(topic.title[lang], page, t.pager.page)}
        description={topic.description[lang]}
        path={path}
        index={topic.group !== 'city' || locationIsFilled(ordered)}
        jsonLd={structured}
      />
      <article className="prose">
        <Breadcrumbs items={crumbs} />
        <h1>{topic.h1[lang]}</h1>
        {topic.group === 'question' ? (
          <p>
            {guideMeta[lang].guideBy} {guideMeta[lang].guidePublished} {publishedDateLabel(GUIDE_PUBLISHED, lang)}
            {GUIDE_MODIFIED === GUIDE_PUBLISHED
              ? '.'
              : `. ${guideMeta[lang].guideUpdated} ${publishedDateLabel(GUIDE_MODIFIED, lang)}.`}
          </p>
        ) : null}
        {topic.intro.map((paragraph) => (
          <p key={paragraph[lang]}>{paragraph[lang]}</p>
        ))}
        {topic.sections?.map((section) => (
          <section key={section.heading.he}>
            <h2>{section.heading[lang]}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.he}>{paragraph[lang]}</p>
            ))}
            {section.sources?.map((source) => (
              <p key={source.href}>
                {lang === 'he' ? 'לפי העמוד:' : 'According to the page:'}{' '}
                <a href={source.href} target="_blank" rel="noreferrer">
                  {source[lang]}
                </a>
              </p>
            ))}
          </section>
        ))}
        {topic.slug === 'rehab-costs' ? <PublishedPrices /> : null}
        {topic.group === 'city' && page === 1 && topic.place ? (
          <CityBrief place={topic.place[lang]} centers={ordered} />
        ) : null}
        {shape === 'article' && topic.group === 'focus' ? (
          <>
            <p>{copy.lead}</p>
            <p>{copy.readCard}</p>
            {topic.official ? (
              <p>
                {copy.official}{' '}
                <a href={topic.official.href} target="_blank" rel="noreferrer">
                  {topic.official[lang]}
                </a>
              </p>
            ) : null}
          </>
        ) : null}
        <p className="site-footer__emergency">{t.footer.emergency}</p>
      </article>
      {hubs.length > 0 ? (
        <section className="band">
          <div className="section-head">
            <h2>{copy.hubsHeading}</h2>
          </div>
          <div className="area-grid">
            {hubs.map((item) => (
              <Link key={item.slug} className="area-card" to={topicPath(item)}>
                <strong>{item.h1[lang]}</strong>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
      {list}
      {people.length > 0 ? (
        <section className="band" aria-label={copy.peopleHeading}>
          {topic.group === 'therapy' ? null : (
            <div className="section-head">
              <h2>{copy.peopleHeading}</h2>
            </div>
          )}
          <div className="feature-list">
            {people.map((person) => (
              <article key={person.id} className="center-card">
                <div className="center-card__body">
                  <p className="kicker">{person.city[lang]}</p>
                  {topic.group === 'therapy' ? (
                    <h2>
                      <Link to={therapistPath(person.slug)}>{person.name[lang]}</Link>
                    </h2>
                  ) : (
                    <h3>
                      <Link to={therapistPath(person.slug)}>{person.name[lang]}</Link>
                    </h3>
                  )}
                  <p>{person.summary[lang]}</p>
                  <div className="center-card__actions">
                    <ListingActions
                      entry={therapistCompareEntry(person)}
                      contactTo={person.email ? `mailto:${person.email}` : `${therapistPath(person.slug)}#contact`}
                    />
                    <Link className="site-cta" to={therapistPath(person.slug)}>
                      {t.card.details}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
      <FaqList items={faqItems} />
      {nearby.length > 0 ? (
        <section className="band">
          <div className="section-head">
            <h2>{copy.nearbyHeading}</h2>
            <p>{copy.nearbyNote}</p>
          </div>
          <div className="area-grid">
            {nearby.map((item) => (
              <Link key={item.slug} className="area-card" to={topicPath(item)}>
                <strong>{item.place ? item.place[lang] : item.h1[lang]}</strong>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
      {related.length > 0 ? (
        <section className="band">
          <div className="section-head">
            <h2>{lang === 'he' ? 'עמודים קרובים' : 'Related pages'}</h2>
          </div>
          <div className="area-grid">
            {related.map((item) => (
              <Link key={item.slug} className="area-card" to={topicPath(item)}>
                <strong>{item.h1[lang]}</strong>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </>
  )
}
