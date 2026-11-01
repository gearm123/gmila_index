import { AREA_IDS, CARE_TYPES, FOCUS_AREAS, type AreaId } from '../types/center.ts'
import { useLanguage } from '../context/LanguageContext.tsx'
import type { ViewMode } from '../lib/centers.ts'
import { areaName } from '../lib/places.ts'
import { useViewport } from '../lib/viewport.ts'

type CenterFiltersProps = {
  q: string
  onQ: (value: string) => void
  areaId: AreaId | ''
  countryId: string
  cityId: string
  care: string
  focus: string
  minRating: string
  sort: string
  view: ViewMode
  countries: { id: string; label: string }[]
  cities: { id: string; label: string }[]
  resultCount: number
  onChange: (key: string, value: string) => void
  onReset: () => void
}

export default function CenterFilters({
  q,
  onQ,
  areaId,
  countryId,
  cityId,
  care,
  focus,
  minRating,
  sort,
  view,
  countries,
  cities,
  resultCount,
  onChange,
  onReset,
}: CenterFiltersProps) {
  const { lang, t } = useLanguage()
  const mobile = useViewport() === 'mobile'
  const views: { id: ViewMode; label: string }[] = [
    { id: 'split', label: t.filters.viewSplit },
    { id: 'list', label: t.filters.viewList },
    { id: 'map', label: t.filters.viewMap },
  ].filter((item): item is { id: ViewMode; label: string } => (mobile ? item.id !== 'split' : true))

  return (
    <section className="filters" aria-label={t.filters.search}>
      <div className="area-chips" role="group" aria-label={t.areasTitle}>
        <button type="button" aria-pressed={areaId === ''} onClick={() => onChange('area', '')}>
          {t.areasAll}
        </button>
        {AREA_IDS.map((id) => (
          <button key={id} type="button" aria-pressed={areaId === id} onClick={() => onChange('area', areaId === id ? '' : id)}>
            {areaName(id, lang)}
          </button>
        ))}
      </div>

      <label className="field field--search">
        <span>{t.filters.search}</span>
        <input value={q} onChange={(event) => onQ(event.target.value)} placeholder={t.hero.search} />
      </label>

      <div className="filters__row">
        <label className="field">
          <span>{t.filters.country}</span>
          <select value={countryId} onChange={(event) => onChange('country', event.target.value)}>
            <option value="">{t.filters.allCountries}</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.label}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>{t.filters.city}</span>
          <select value={cityId} onChange={(event) => onChange('city', event.target.value)}>
            <option value="">{t.filters.allCities}</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.label}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>{t.filters.focus}</span>
          <select value={focus} onChange={(event) => onChange('focus', event.target.value)}>
            <option value="">{t.filters.allFocus}</option>
            {FOCUS_AREAS.map((item) => (
              <option key={item} value={item}>
                {t.focus[item]}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>{t.filters.rating}</span>
          <select value={minRating} onChange={(event) => onChange('rating', event.target.value)}>
            <option value="">{t.filters.anyRating}</option>
            <option value="4">{t.filters.rating4}</option>
            <option value="4.5">{t.filters.rating45}</option>
          </select>
        </label>
        <label className="field">
          <span>{t.filters.sort}</span>
          <select value={sort} onChange={(event) => onChange('sort', event.target.value)}>
            <option value="rating">{t.filters.sortRating}</option>
            <option value="name">{t.filters.sortName}</option>
            <option value="city">{t.filters.sortCity}</option>
          </select>
        </label>
      </div>

      <div className="care-chips" role="group" aria-label={t.filters.care}>
        <button type="button" aria-pressed={care === ''} onClick={() => onChange('care', '')}>
          {t.filters.allCare}
        </button>
        {CARE_TYPES.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={care === item}
            onClick={() => onChange('care', care === item ? '' : item)}
          >
            {t.care[item]}
          </button>
        ))}
      </div>

      <div className="filters__meta">
        <p>{resultCount === 1 ? t.filters.resultOne : `${resultCount} ${t.filters.results}`}</p>
        <div className="view-toggle" role="group" aria-label={t.filters.viewList}>
          {views.map((item) => (
            <button key={item.id} type="button" aria-pressed={view === item.id} onClick={() => onChange('view', item.id)}>
              {item.label}
            </button>
          ))}
        </div>
        <button type="button" className="text-button" onClick={onReset}>
          {t.filters.reset}
        </button>
      </div>
    </section>
  )
}
