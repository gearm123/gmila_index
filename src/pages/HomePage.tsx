import { useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CenterCard from '../components/CenterCard.tsx'
import CentersMap from '../components/CentersMap.tsx'
import Seo from '../components/Seo.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'
import { centers } from '../data/centers.ts'
import { averageRating, centersByArea, filterCenters } from '../lib/centers.ts'
import { AREA_IDS, type AreaId } from '../types/center.ts'
import { areaName, centerAreaId, centerCountryId } from '../lib/places.ts'

export default function HomePage() {
  const { lang, t } = useLanguage()
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [mapArea, setMapArea] = useState<AreaId>('israel')
  const featured = useMemo(
    () => filterCenters(centers, { q: '', cityId: '', care: '', focus: '', minRating: 0, sort: 'rating' }, lang).slice(0, 3),
    [lang],
  )
  const cityCount = new Set(centers.map((center) => center.cityId)).size
  const countryCount = new Set(centers.map((center) => centerCountryId(center))).size
  const mapCenters = centersByArea(mapArea)
  const ratedCount = centers.filter((center) => center.googleRating != null).length

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = String(new FormData(event.currentTarget).get('q') ?? '').trim()
    navigate(value ? `/centers?q=${encodeURIComponent(value)}` : '/centers')
  }

  return (
    <>
      <Seo title={t.meta.home} description={t.hero.lede} />
      <section className="hero">
        <p className="kicker">{t.hero.kicker}</p>
        <h1>{t.hero.title}</h1>
        <p className="hero__script">{t.hero.script}</p>
        <p className="lede">{t.hero.lede}</p>
        <form className="hero__search" onSubmit={onSearch}>
          <label className="visually-hidden" htmlFor="home-search">
            {t.hero.search}
          </label>
          <input id="home-search" name="q" placeholder={t.hero.search} />
          <button className="site-cta site-cta--solid" type="submit">
            {t.hero.searchButton}
          </button>
        </form>
        <div className="hero__actions">
          <Link className="site-cta site-cta--solid" to="/centers">
            {t.hero.all}
          </Link>
          <Link className="site-cta" to="/centers?view=map">
            {t.hero.map}
          </Link>
        </div>
      </section>

      <section className="stats" aria-label={t.stats.centers}>
        <div>
          <strong>{centers.length}</strong>
          <span>{t.stats.centers}</span>
        </div>
        <div>
          <strong>{cityCount}</strong>
          <span>{t.stats.cities}</span>
        </div>
        <div>
          <strong>{countryCount}</strong>
          <span>{t.stats.countries}</span>
        </div>
        <div>
          <strong>{ratedCount ? averageRating(centers).toFixed(1) : '—'}</strong>
          <span>{t.stats.rating}</span>
        </div>
      </section>

      <section className="band">
        <div className="section-head">
          <p className="kicker">{t.areasKicker}</p>
          <h2>{t.areasTitle}</h2>
        </div>
        <div className="area-grid">
          {AREA_IDS.map((areaId) => (
            <Link key={areaId} className="area-card" to={`/centers?area=${areaId}`}>
              <strong>{areaName(areaId, lang)}</strong>
              <span>{centersByArea(areaId).length}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="band">
        <div className="section-head">
          <p className="kicker">{t.featured.kicker}</p>
          <h2>{t.featured.title}</h2>
        </div>
        <div className="feature-list">
          {featured.map((center) => (
            <CenterCard
              key={center.id}
              center={center}
              selected={selectedId === center.id}
              onHover={() => undefined}
              onShowOnMap={(id) => {
                const match = centers.find((center) => center.id === id)
                if (match) setMapArea(centerAreaId(match))
                setSelectedId(id)
                document.getElementById('home-map')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
            />
          ))}
        </div>
      </section>

      <section className="band" id="home-map">
        <div className="section-head">
          <p className="kicker">{t.mapBand.kicker}</p>
          <h2>{t.mapBand.title}</h2>
          <p className="lede">{t.mapBand.lede}</p>
        </div>
        <div className="area-chips" role="group" aria-label={t.areasTitle}>
          {AREA_IDS.map((areaId) => (
            <button key={areaId} type="button" aria-pressed={mapArea === areaId} onClick={() => setMapArea(areaId)}>
              {areaName(areaId, lang)}
            </button>
          ))}
        </div>
        <CentersMap
          centers={mapCenters}
          highlightedId={selectedId}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId((current) => (current === id ? null : id))}
          onClear={() => setSelectedId(null)}
        />
        <Link className="site-cta" to={`/centers?area=${mapArea}&view=map`}>
          {t.mapBand.open}
        </Link>
      </section>

      <section className="points">
        {t.points.map((point) => (
          <article key={point.title}>
            <h2>{point.title}</h2>
            <p>{point.text}</p>
          </article>
        ))}
      </section>
    </>
  )
}
