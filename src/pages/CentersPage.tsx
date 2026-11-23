import { lazy, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { localePath } from '../lib/locale.ts'
import Breadcrumbs from '../components/Breadcrumbs.tsx'
import CenterCard from '../components/CenterCard.tsx'
import { breadcrumbJsonLd, pagedCrumbs } from '../seo/breadcrumbs.ts'
import { centerSchemaType, providerItemList, providerPageUrl } from '../seo/provider.ts'
import { metaDescription, metaTitle } from '../seo/meta.ts'
import CenterFilters from '../components/CenterFilters.tsx'
import CentersMap from '../components/CentersMap.tsx'
import ListingPages from '../components/ListingPages.tsx'
import Seo from '../components/Seo.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'
import { centers } from '../data/centers.ts'
import {
  centersInScope,
  cityOptions,
  countryOptions,
  directoryOrder,
  filterCenters,
  isCareType,
  isFocusArea,
  isProgramGroup,
  isSortKey,
  isViewMode,
  programGroup,
  type ViewMode,
} from '../lib/centers.ts'
import { LISTING_PAGE_SIZE, listingPagePath, pageCount, pagedTitle, parseListingPage, slicePage } from '../lib/pagination.ts'
import { centerPath } from '../lib/paths.ts'
import { PROGRAM_GROUPS } from '../types/center.ts'
import { isAreaId } from '../lib/places.ts'
import { useViewport } from '../lib/viewport.ts'
const MissingPage = lazy(() => import('./MissingPage.tsx'))

export default function CentersPage({ mode = 'catalog' }: { mode?: 'catalog' | 'map' }) {
  const { lang, t } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()
  const { page: pageParam } = useParams()
  const pageNumber = parseListingPage(pageParam)
  const sequence = useMemo(() => directoryOrder(centers), [])
  const pages = pageCount(sequence.length)
  const seeded =
    location.state && typeof location.state === 'object' && 'q' in location.state
      ? String((location.state as { q?: string }).q ?? '')
      : ''
  const [q, setQ] = useState(seeded)
  const [hoverId, setHoverId] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const isNarrow = useViewport() === 'mobile'
  const pendingMapScroll = useRef(false)
  const [filters, setFilters] = useState({
    areaId: '',
    countryId: '',
    cityId: '',
    care: '',
    kind: '',
    focus: '',
    minRating: '',
    sort: 'rating',
    view: (mode === 'map' ? 'map' : 'split') as ViewMode,
  })
  const areaId = isAreaId(filters.areaId) ? filters.areaId : ''
  const countryId = filters.countryId
  const cityId = filters.cityId
  const care = isCareType(filters.care) ? filters.care : ''
  const kind = isProgramGroup(filters.kind) ? filters.kind : ''
  const focus = isFocusArea(filters.focus) ? filters.focus : ''
  const minRating = filters.minRating === '4' || filters.minRating === '4.5' ? Number(filters.minRating) : 0
  const sort = isSortKey(filters.sort) ? filters.sort : 'rating'
  const requested: ViewMode = mode === 'map' ? 'map' : filters.view
  const view: ViewMode = isNarrow && requested === 'split' ? 'list' : requested

  const filtered = useMemo(
    () =>
      filterCenters(
        centers,
        {
          q,
          areaId,
          countryId,
          cityId,
          care,
          focus,
          minRating,
          sort,
        },
        lang,
      ),
    [q, areaId, countryId, cityId, care, focus, minRating, sort, lang],
  )
  const listed = useMemo(
    () => (kind ? filtered.filter((center) => programGroup(center) === kind) : filtered),
    [filtered, kind],
  )

  useEffect(() => {
    if (view !== 'map') return
    const frame = window.requestAnimationFrame(() => {
      document.getElementById('directory-map')?.scrollIntoView({ block: 'start' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [view])

  useEffect(() => {
    if (!pendingMapScroll.current || view === 'list') return
    pendingMapScroll.current = false
    document.getElementById('directory-map')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [selectedId, view])

  const areaScope = useMemo(() => centersInScope(areaId, ''), [areaId])
  const scope = useMemo(() => centersInScope(areaId, countryId), [areaId, countryId])
  const narrowed = Boolean(q || areaId || countryId || cityId || care || kind || focus || minRating || sort !== 'rating')
  const paging = mode === 'catalog' && !narrowed
  const page = pageNumber ?? 1
  const visible = paging ? slicePage(sequence, page) : listed

  useEffect(() => {
    if (mode === 'catalog' && pageParam === '1') navigate(localePath('/centers/', lang), { replace: true })
  }, [mode, pageParam, navigate, lang])

  if (mode === 'catalog' && (pageNumber == null || (!narrowed && pageNumber > pages))) return <MissingPage />

  const catalogPath = listingPagePath('/centers/', paging ? page : 1)
  const crumbs =
    mode === 'map'
      ? [
          { name: t.nav.home, path: '/' },
          { name: t.nav.map, path: '/map/' },
        ]
      : pagedCrumbs(
          [
            { name: t.nav.home, path: '/' },
            { name: t.crumbs.rehab, path: '/centers/' },
          ],
          paging ? page : 1,
          t.pager.page,
          catalogPath,
        )
  const pager = (
    <ListingPages
      base="/centers/"
      page={page}
      pages={paging ? pages : 1}
      label={t.pager.nav}
      prev={t.pager.prev}
      next={t.pager.next}
    />
  )

  // Filters stay in memory. Writing them into the address would publish a new URL per combination.
  function setFilter(key: string, value: string) {
    setFilters((prev) => {
      if (key === 'area') return { ...prev, areaId: value, countryId: '', cityId: '' }
      if (key === 'country') return { ...prev, countryId: value, cityId: '' }
      if (key === 'city') return { ...prev, cityId: value }
      if (key === 'care') return { ...prev, care: value }
      if (key === 'kind') return { ...prev, kind: value }
      if (key === 'focus') return { ...prev, focus: value }
      if (key === 'rating') return { ...prev, minRating: value }
      if (key === 'sort') return { ...prev, sort: value }
      if (key === 'view' && isViewMode(value)) return { ...prev, view: value }
      return prev
    })
  }

  function showOnMap(id: string) {
    setSelectedId(id)
    pendingMapScroll.current = true
    if (isNarrow) setFilter('view', 'map')
  }

  return (
    <div className="catalog">
      <Seo
        title={
          mode === 'map'
            ? metaTitle(lang === 'he' ? 'מפת המרכזים' : 'Map of the centers', lang === 'he' ? 'בישראל' : 'in Israel', lang === 'he' ? 'לפי הכרטיסים שפורסמו במדריך' : 'from published cards')
            : pagedTitle(
                metaTitle(t.meta.centersH1, lang === 'he' ? 'בישראל' : 'in Israel', lang === 'he' ? 'כל הכרטיסים שבמדריך הפתוח' : 'every card on one list'),
                paging ? page : 1,
                t.pager.page,
              )
        }
        description={metaDescription(
          mode === 'map' ? (lang === 'he' ? 'מפת המרכזים בישראל לפי הכרטיסים שפורסמו.' : 'A map of centers in Israel from the cards that were published.') : t.meta.centersLede,
          lang === 'he' ? 'לכל עיר ולכל סוג יש עמוד משלו. זו אינה המלצה רפואית.' : 'Each city and each type has its own page. This is not a medical recommendation.',
        )}
        path={mode === 'map' ? '/map/' : catalogPath}
        index={mode === 'catalog' && q.trim().length === 0}
        jsonLd={[
          breadcrumbJsonLd(crumbs, lang),
          mode === 'catalog' && paging
            ? providerItemList(
                t.meta.centersH1,
                visible.map((center) => ({
                  type: centerSchemaType(center),
                  name: center.name[lang],
                  url: providerPageUrl(centerPath(center), lang),
                })),
                (page - 1) * LISTING_PAGE_SIZE + 1,
              )
            : null,
        ].filter((node) => node != null)}
      />
      <Breadcrumbs items={crumbs} />
      <header className="page-intro">
        <p className="kicker">{t.nav.centers}</p>
        <h1>{mode === 'map' ? (lang === 'he' ? 'מפת המרכזים בישראל' : 'Map of the centers in Israel') : t.meta.centersH1}</h1>
        <p className="lede">
          {mode === 'map'
            ? lang === 'he'
              ? 'מפת המרכזים בישראל לפי הכרטיסים שפורסמו.'
              : 'A map of centers in Israel from the cards that were published.'
            : t.meta.centersLede}
        </p>
      </header>
      <CenterFilters
        q={q}
        onQ={setQ}
        areaId={areaId}
        countryId={countryId}
        cityId={cityId}
        kind={kind}
        focus={focus}
        minRating={minRating ? String(minRating) : ''}
        sort={sort}
        view={view}
        countries={countryOptions(areaScope, lang)}
        cities={cityOptions(lang, scope)}
        resultCount={listed.length}
        onChange={setFilter}
        onReset={() => {
          setQ('')
          setFilters({
            areaId: '',
            countryId: '',
            cityId: '',
            care: '',
            kind: '',
            focus: '',
            minRating: '',
            sort: 'rating',
            view: mode === 'map' ? 'map' : 'split',
          })
        }}
      />

      {visible.length === 0 ? (
        <div className="empty">
          <h2>{t.filters.emptyTitle}</h2>
          <p>{t.filters.emptyText}</p>
        </div>
      ) : null}

      {pager}
      <div className={`directory directory--${view}`}>
        <div className="directory__list">
          {PROGRAM_GROUPS.filter((group) => !kind || group === kind).map((group) => {
            const items = visible.filter((center) => programGroup(center) === group)
            if (items.length === 0) return null
            return (
              <section key={group} className="program-group" aria-labelledby={`program-${group}`}>
                <header className="program-group__head">
                  <h2 id={`program-${group}`}>
                    {t.program[group].title}
                    <span>{items.length}</span>
                  </h2>
                  <p>{t.program[group].text}</p>
                </header>
                {items.map((center) => (
                  <CenterCard
                    key={center.id}
                    heading="h3"
                    center={center}
                    selected={selectedId === center.id}
                    onHover={setHoverId}
                    onShowOnMap={showOnMap}
                  />
                ))}
              </section>
            )
          })}
        </div>
        {view === 'list' ? null : (
          <div className="directory__map" id="directory-map">
            <CentersMap
              centers={visible}
              highlightedId={hoverId ?? selectedId}
              selectedId={selectedId}
              onSelect={(id) => {
                setSelectedId((current) => (current === id ? null : id))
                document.getElementById(`center-${id}`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
              }}
              onClear={() => setSelectedId(null)}
            />
          </div>
        )}
      </div>
      {pager}
    </div>
  )
}
