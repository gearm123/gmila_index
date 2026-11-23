import type { CompareEntry } from '../context/CompareContext.tsx'
import { copy } from '../i18n/copy.ts'
import type { Center } from '../types/center.ts'
import type { Therapist } from '../types/therapist.ts'
import { programGroup } from './centers.ts'
import { centerPath, therapistPath } from './paths.ts'

const empty = { he: '', en: '' }

export function centerCompareEntry(center: Center): CompareEntry {
  const group = programGroup(center)
  return {
    kind: 'center',
    id: center.id,
    name: center.name,
    city: center.city,
    kindLabel: { he: copy.he.program[group].title, en: copy.en.program[group].title },
    phone: center.phone,
    price: center.pricing ?? empty,
    funded: center.publicFunding,
    path: centerPath(center),
  }
}

export function therapistCompareEntry(person: Therapist): CompareEntry {
  return {
    kind: 'therapist',
    id: person.id,
    name: person.name,
    city: person.city,
    kindLabel: { he: copy.he.nav.therapists, en: copy.en.nav.therapists },
    phone: person.phone,
    price: person.pricing ?? empty,
    funded: null,
    path: therapistPath(person.slug),
  }
}
