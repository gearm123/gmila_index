import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CenterCard from '../components/CenterCard.tsx'
import CenterFilters from '../components/CenterFilters.tsx'
import CentersMap from '../components/CentersMap.tsx'
import Seo from '../components/Seo.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'
import { centers } from '../data/centers.ts'
import {
  centersInScope,
  cityOptions,
  countryOptions,
  filterCenters,
  isCareType,
  isFocusArea,
  isSortKey,
  isViewMode,
  type ViewMode,
} from '../lib/centers.ts'
import { isAreaId } from '../lib/places.ts'
import { useViewport } from '../lib/viewport.ts'

export default function CentersPage() {
  const { lang, t } = useLanguage()
  const [params, setParams] = useSearchParams()
  const [q, setQ] = useState(params.get('q') ?? '')
  const [hoverId, setHoverId] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const isNarrow = useViewport() === 'mobile'
  const pendingMapScroll = useRef(false)

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          const trimmed = q.trim()
          if ((prev.get('q') ?? '') === trimmed) return prev
          if (trimmed) next.set('q', trimmed)
          else next.delete('q')
          return next
        },
        { replace: true },
      )
    }, 200)
    return () => window.clearTimeout(handle)
  }, [q, setParams])

  const areaParam = params.get('area')
  const areaId = isAreaId(areaParam) ? areaParam : ''
  const countryId = params.get('country') ?? ''
  const cityId = params.get('city') ?? ''
  const careParam = params.get('care')
  const focusParam = params.get('focus')
  const sortParam = params.get('sort')
  const care = isCareType(careParam) ? careParam : ''
  const focus = isFocusArea(focusParam) ? focusParam : ''
  const ratingParam = params.get('rating')
  const minRating = ratingParam === '4' || ratingParam === '4.5' ? Number(ratingParam) : 0
  const sort = isSortKey(sortParam) ? sortParam : 'rating'
  const viewParam = params.get('view')
  const requested: ViewMode = isViewMode(viewParam) ? viewParam : isNarrow ? 'list' : 'split'
  const view: ViewMode = isNarrow && requested === 'split' ? 'list' : requested

  const filtered = useMemo(
    () =>
      filterCenters(
        centers,
        {
          q: params.get('q') ?? '',
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
    [params, areaId, countryId, cityId, care, focus, minRating, sort, lang],
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

  function setParam(key: string, value: string) {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set(key, value)
        else next.delete(key)
        if (key === 'area') {
          next.delete('country')
          next.delete('city')
        }
        if (key === 'country') next.delete('city')
        return next
      },
      { replace: true },
    )
  }

  function showOnMap(id: string) {
    setSelectedId(id)
    pendingMapScroll.current = true
    if (isNarrow) setParam('view', 'map')
  }

  return (
    <div className="catalog">
      <Seo title={t.meta.centers} description={t.hero.lede} />
      <header className="page-intro">
        <p className="kicker">{t.nav.centers}</p>
        <h1>{t.hero.title}</h1>
      </header>
      <CenterFilters
        q={q}
        onQ={setQ}
        areaId={areaId}
        countryId={countryId}
        cityId={cityId}
        care={care}
        focus={focus}
        minRating={minRating ? String(minRating) : ''}
        sort={sort}
        view={view}
        countries={countryOptions(areaScope, lang)}
        cities={cityOptions(lang, scope)}
        resultCount={filtered.length}
        onChange={setParam}
        onReset={() => {
          setQ('')
          setParams({}, { replace: true })
        }}
      />

      {filtered.length === 0 ? (
        <div className="empty">
          <h2>{t.filters.emptyTitle}</h2>
          <p>{t.filters.emptyText}</p>
        </div>
      ) : null}

      <div className={`directory directory--${view}`}>
        <div className="directory__list">
          {filtered.map((center) => (
            <CenterCard
              key={center.id}
              center={center}
              selected={selectedId === center.id}
              onHover={setHoverId}
              onShowOnMap={showOnMap}
            />
          ))}
        </div>
        {view === 'list' ? null : (
          <div className="directory__map" id="directory-map">
            <CentersMap
              centers={filtered}
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
    </div>
  )
}
