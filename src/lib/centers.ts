import { centers } from '../data/centers.ts'
import {
  CARE_TYPES,
  FOCUS_AREAS,
  type AreaId,
  type CareType,
  type Center,
  type FocusArea,
} from '../types/center.ts'
import type { Lang } from '../i18n/copy.ts'
import { centerAreaId, centerCountryId, countryName } from './places.ts'

export type SortKey = 'rating' | 'name' | 'city'
export type ViewMode = 'split' | 'list' | 'map'

export type CenterQuery = {
  q: string
  areaId?: AreaId | ''
  countryId?: string
  cityId: string
  care: CareType | ''
  focus: FocusArea | ''
  minRating: number
  sort: SortKey
}

const areaBuckets = new Map<AreaId, Center[]>()
const countryBuckets = new Map<string, Center[]>()
const searchBlob = new Map<string, string>()

for (const center of centers) {
  const area = centerAreaId(center)
  const country = centerCountryId(center)
  const areaList = areaBuckets.get(area) ?? []
  areaList.push(center)
  areaBuckets.set(area, areaList)
  const countryList = countryBuckets.get(country) ?? []
  countryList.push(center)
  countryBuckets.set(country, countryList)
}

export function centersByArea(areaId: AreaId): Center[] {
  return areaBuckets.get(areaId) ?? []
}

export function centersInScope(areaId: AreaId | '', countryId: string): Center[] {
  let list: Center[] = areaId ? (areaBuckets.get(areaId) ?? []) : centers
  if (countryId) {
    list = areaId ? list.filter((center) => centerCountryId(center) === countryId) : (countryBuckets.get(countryId) ?? [])
  }
  return list
}

function searchText(center: Center): string {
  const cached = searchBlob.get(center.id)
  if (cached) return cached
  const countryId = centerCountryId(center)
  const text = [
    center.name.he,
    center.name.en,
    center.city.he,
    center.city.en,
    center.region.he,
    center.region.en,
    center.address.he,
    center.address.en,
    center.summary.he,
    center.summary.en,
    countryName(countryId, 'he'),
    countryName(countryId, 'en'),
    center.countryId ?? '',
  ]
    .join(' ')
    .toLowerCase()
  searchBlob.set(center.id, text)
  return text
}

export function isCareType(value: string | null): value is CareType {
  return !!value && (CARE_TYPES as readonly string[]).includes(value)
}

export function isFocusArea(value: string | null): value is FocusArea {
  return !!value && (FOCUS_AREAS as readonly string[]).includes(value)
}

export function isSortKey(value: string | null): value is SortKey {
  return value === 'rating' || value === 'name' || value === 'city'
}

export function isViewMode(value: string | null): value is ViewMode {
  return value === 'split' || value === 'list' || value === 'map'
}

export function getCenterBySlug(slug: string | undefined): Center | undefined {
  if (!slug) return undefined
  return centers.find((center) => center.slug === slug)
}

export function countryOptions(list: Center[], lang: Lang): { id: string; label: string }[] {
  const seen = new Map<string, string>()
  list.forEach((center) => {
    const id = centerCountryId(center)
    if (!seen.has(id)) seen.set(id, countryName(id, lang))
  })
  return [...seen.entries()]
    .map(([id, label]) => ({ id, label }))
    .sort((a, b) => a.label.localeCompare(b.label, lang))
}

export function cityOptions(lang: Lang, list: Center[] = centers): { id: string; label: string }[] {
  const seen = new Map<string, { label: string; region: string }>()
  list.forEach((center) => {
    if (!seen.has(center.cityId)) {
      seen.set(center.cityId, { label: center.city[lang], region: center.region[lang] })
    }
  })
  const rows = [...seen.entries()].map(([id, value]) => ({ id, ...value }))
  const nameCount = new Map<string, number>()
  rows.forEach((row) => nameCount.set(row.label, (nameCount.get(row.label) ?? 0) + 1))
  return rows
    .map((row) => ({
      id: row.id,
      label: (nameCount.get(row.label) ?? 0) > 1 ? `${row.label} · ${row.region}` : row.label,
    }))
    .sort((a, b) => a.label.localeCompare(b.label, lang))
}

export function filterCenters(list: Center[], query: CenterQuery, lang: Lang): Center[] {
  const needle = query.q.trim().toLowerCase()
  const areaId = query.areaId ?? ''
  const countryId = query.countryId ?? ''
  const source = list === centers ? centersInScope(areaId, countryId) : list
  return source.filter((center) => {
    if (list !== centers) {
      if (areaId && centerAreaId(center) !== areaId) return false
      if (countryId && centerCountryId(center) !== countryId) return false
    }
    if (query.cityId && center.cityId !== query.cityId) return false
    if (query.care && !center.care.includes(query.care)) return false
    if (query.focus && !center.focus.includes(query.focus)) return false
    if (query.minRating && (center.googleRating == null || center.googleRating < query.minRating)) return false
    if (!needle) return true
    return searchText(center).includes(needle)
  }).sort((a, b) => compareCenters(a, b, query.sort, lang))
}

function compareCenters(a: Center, b: Center, sort: SortKey, lang: Lang): number {
  if (sort === 'name') return a.name[lang].localeCompare(b.name[lang], lang)
  if (sort === 'city') {
    return a.city[lang].localeCompare(b.city[lang], lang) || a.name[lang].localeCompare(b.name[lang], lang)
  }
  const ratingA = a.googleRating ?? -1
  const ratingB = b.googleRating ?? -1
  const countA = a.googleReviewCount ?? 0
  const countB = b.googleReviewCount ?? 0
  return ratingB - ratingA || countB - countA
}

export function averageRating(list: Center[]): number {
  const rated = list.filter((center) => center.googleRating != null)
  if (rated.length === 0) return 0
  const sum = rated.reduce((total, center) => total + (center.googleRating ?? 0), 0)
  return Math.round((sum / rated.length) * 10) / 10
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export function whatsappHref(center: Center, text: string): string {
  return `https://wa.me/${center.whatsapp}?text=${encodeURIComponent(text)}`
}

export function googlePlaceUrl(center: Center): string {
  const query = center.sample
    ? `${center.lat},${center.lng}`
    : `${center.name.en} ${center.city.en} ${countryName(centerCountryId(center), 'en')}`
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export function googleDirectionsUrl(center: Center): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`
}

export function googleAreaUrl(list: Center[]): string {
  if (list.length === 1) return googlePlaceUrl(list[0])
  if (list.length === 0) return 'https://www.google.com/maps/@31.4,35.0,8z'
  const lat = list.reduce((sum, center) => sum + center.lat, 0) / list.length
  const lng = list.reduce((sum, center) => sum + center.lng, 0) / list.length
  return `https://www.google.com/maps/@${lat.toFixed(5)},${lng.toFixed(5)},8z`
}

export function googleMapsApiKey(): string | undefined {
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  if (typeof key !== 'string') return undefined
  const trimmed = key.trim()
  return trimmed ? trimmed : undefined
}
