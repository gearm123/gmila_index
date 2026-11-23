import { centers } from '../data/centers.ts'
import { therapists } from '../data/therapists.ts'
import type { Lang } from '../i18n/copy.ts'
import { filterCenters } from './centers.ts'
import { centerPath, therapistPath } from './paths.ts'

export type DirectoryHit = {
  href: string
  title: string
  note: string
}

export function directoryHits(query: string, lang: Lang, limit = 8): DirectoryHit[] {
  const needle = query.trim().toLowerCase()
  if (needle.length < 2) return []
  const centerHits: DirectoryHit[] = filterCenters(
    centers,
    { q: needle, cityId: '', care: '', focus: '', minRating: 0, sort: 'name' },
    lang,
  )
    .slice(0, limit)
    .map((center) => ({
      href: centerPath(center),
      title: center.name[lang],
      note: center.city[lang],
    }))
  const room = limit - centerHits.length
  if (room <= 0) return centerHits
  const therapistHits: DirectoryHit[] = therapists
    .filter((person) =>
      [person.name.he, person.name.en, person.city.he, person.city.en, person.focus.he, person.focus.en]
        .join(' ')
        .toLowerCase()
        .includes(needle),
    )
    .slice(0, room)
    .map((person) => ({
      href: therapistPath(person.slug),
      title: person.name[lang],
      note: person.city[lang],
    }))
  return [...centerHits, ...therapistHits]
}
