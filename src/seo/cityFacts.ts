import { programGroup } from '../lib/centers.ts'
import { FOCUS_AREAS, PROGRAM_GROUPS, type Center, type FocusArea, type Localized, type ProgramGroup } from '../types/center.ts'

export type CityFacts = {
  count: number
  types: { group: ProgramGroup; count: number }[]
  focuses: FocusArea[]
  publicCount: number
  priced: { text: Localized; count: number }[]
  unpriced: number
}

/** Counts and published prices for one city. Nothing here is inferred. */
export function cityFacts(list: readonly Center[]): CityFacts {
  const types = PROGRAM_GROUPS.map((group) => ({
    group,
    count: list.filter((center) => programGroup(center) === group).length,
  })).filter((row) => row.count > 0)
  const focuses = FOCUS_AREAS.filter((focus) => list.some((center) => center.focus.includes(focus)))
  const priceMap = new Map<string, { text: Localized; count: number }>()
  let publicCount = 0
  let unpriced = 0
  for (const center of list) {
    if (center.publicFunding) publicCount += 1
    if (!center.pricing) {
      unpriced += 1
      continue
    }
    const row = priceMap.get(center.pricing.he)
    if (row) row.count += 1
    else priceMap.set(center.pricing.he, { text: center.pricing, count: 1 })
  }
  const priced = [...priceMap.values()].sort((a, b) => b.count - a.count || a.text.he.localeCompare(b.text.he, 'he'))
  return { count: list.length, types, focuses, publicCount, priced, unpriced }
}
