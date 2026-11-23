import type { FocusArea, Localized } from './center.ts'

/** A method named on the therapist’s own site. A method that was not published is not a page. */
export const THERAPY_METHODS = ['cbt', 'dynamic'] as const
export type TherapyMethod = (typeof THERAPY_METHODS)[number]

export type Therapist = {
  id: string
  slug: string
  name: Localized
  credential: Localized
  city: Localized
  /** Center city ids this listing published. Used only to join an existing location page. */
  cityIds: string[]
  address: Localized
  phone: string
  email: string
  website: string
  hours: Localized
  focus: Localized
  /** Addiction areas named on the therapist’s own site. */
  focusAreas: FocusArea[]
  /** Therapy methods named on the therapist’s own site. */
  methods: TherapyMethod[]
  pricing: Localized | null
  summary: Localized
  description: Localized
  source: Localized
  sourceUrl: string
}
