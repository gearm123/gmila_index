import type { Localized } from './center.ts'

export type Therapist = {
  id: string
  slug: string
  name: Localized
  credential: Localized
  city: Localized
  address: Localized
  phone: string
  email: string
  website: string
  hours: Localized
  focus: Localized
  pricing: Localized | null
  summary: Localized
  description: Localized
  source: Localized
  sourceUrl: string
}
