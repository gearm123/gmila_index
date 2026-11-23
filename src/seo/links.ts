import { centers } from '../data/centers.ts'
import { programGroup } from '../lib/centers.ts'
import { cityPathSlug } from '../lib/paths.ts'
import type { Center } from '../types/center.ts'
import { centersForTopic, topicsInGroup, type Topic } from './topics.ts'

const NEARBY_KM = 80
const NEARBY_LIMIT = 4
const RELATED_LIMIT = 6

function centroid(topic: Topic): { lat: number; lng: number } | null {
  const rows = centersForTopic(topic).filter((center) => Number.isFinite(center.lat) && Number.isFinite(center.lng))
  if (rows.length === 0) return null
  return {
    lat: rows.reduce((sum, center) => sum + center.lat, 0) / rows.length,
    lng: rows.reduce((sum, center) => sum + center.lng, 0) / rows.length,
  }
}

function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const toRad = (value: number) => (value * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 6371 * 2 * Math.asin(Math.min(1, Math.sqrt(h)))
}

/** Other published city pages within 80 km of this city's published pins. */
export function nearbyCities(topic: Topic): Topic[] {
  if (topic.group !== 'city') return []
  const here = centroid(topic)
  if (!here) return []
  return topicsInGroup('city')
    .flatMap((other) => {
      if (other.slug === topic.slug) return []
      const point = centroid(other)
      if (!point) return []
      const km = distanceKm(here, point)
      return km <= NEARBY_KM ? [{ other, km }] : []
    })
    .sort((a, b) => a.km - b.km || (a.other.place?.he ?? '').localeCompare(b.other.place?.he ?? '', 'he'))
    .slice(0, NEARBY_LIMIT)
    .map((row) => row.other)
}

/** Same city first, then programs that published the same focus. Not a ranking. */
export function relatedCenters(center: Center): Center[] {
  const slug = cityPathSlug(center.cityId)
  const byName = (a: Center, b: Center) => a.name.he.localeCompare(b.name.he, 'he') || a.id.localeCompare(b.id)
  const others = centers.filter((item) => item.id !== center.id)
  const sameCity = others.filter((item) => cityPathSlug(item.cityId) === slug).sort(byName)
  const sameFocus = others
    .filter((item) => cityPathSlug(item.cityId) !== slug && item.focus.some((area) => center.focus.includes(area)))
    .sort(byName)
  return [...sameCity, ...sameFocus].slice(0, RELATED_LIMIT)
}

/** Hubs an article names, or the program and city lists that share its centers. */
export function hubsForTopic(topic: Topic): Topic[] {
  if (topic.group === 'focus') {
    const rows = centersForTopic(topic)
    const kinds = new Set(rows.map((center) => programGroup(center)))
    const programs = topicsInGroup('program').filter((item) => item.kind != null && kinds.has(item.kind))
    const places = new Set(rows.map((center) => cityPathSlug(center.cityId)))
    const cities = topicsInGroup('city').filter((item) => item.cityIds?.some((id) => places.has(cityPathSlug(id))))
    return [...programs, ...cities]
  }
  if (topic.group !== 'question') return []
  if (topic.slug === 'inpatient-vs-outpatient' || topic.slug === 'what-detox-involves' || topic.slug === 'rehab-costs') {
    return topicsInGroup('program')
  }
  if (topic.slug === 'how-to-choose') return [...topicsInGroup('program'), ...topicsInGroup('focus')]
  if (topic.slug === 'help-a-family-member') return topicsInGroup('focus').filter((item) => item.focus === 'family')
  if (topic.slug === 'therapy-types') return topicsInGroup('therapy')
  if (topic.slug === 'what-we-cover') {
    return [...topicsInGroup('focus'), ...topicsInGroup('program'), ...topicsInGroup('therapy'), ...topicsInGroup('city')]
  }
  return []
}
