export type Localized = {
  he: string
  en: string
}

export const CARE_TYPES = ['detox', 'residential', 'day', 'outpatient', 'aftercare'] as const
export type CareType = (typeof CARE_TYPES)[number]

export const FOCUS_AREAS = [
  'drugs',
  'alcohol',
  'gambling',
  'dual',
  'youth',
  'women',
  'men',
  'religious',
  'family',
] as const
export type FocusArea = (typeof FOCUS_AREAS)[number]

export const SOCIAL_NETWORKS = ['facebook', 'instagram', 'youtube', 'linkedin'] as const
export type SocialNetwork = (typeof SOCIAL_NETWORKS)[number]

export const AREA_IDS = ['israel', 'new-york', 'cyprus', 'europe', 'thailand'] as const
export type AreaId = (typeof AREA_IDS)[number]

export type SocialLink = {
  network: SocialNetwork
  url: string
}

export type CenterQuote = {
  quote: Localized
  by: Localized
  /** Longer sourced explanation, shown when the line is opened. */
  detail?: Localized
  sourceUrl?: string
}

export type CenterBranch = {
  name: Localized
  detail: Localized
  phone: string
}

export type Center = {
  id: string
  slug: string
  /** True until a scraped record replaces this sample. */
  sample: boolean
  /** Missing means Israel. */
  countryId?: string
  /** Missing means the Israel area. */
  areaId?: AreaId
  cityId: string
  name: Localized
  city: Localized
  region: Localized
  address: Localized
  lat: number
  lng: number
  phone: string
  /** Digits only, country code, no plus. Example: 972501234567 */
  whatsapp: string
  email: string
  website: string
  /** Null when the center site does not publish a Google score. */
  googleRating: number | null
  googleReviewCount: number | null
  images: string[]
  care: CareType[]
  focus: FocusArea[]
  languages: Localized
  hours: Localized
  ages: Localized
  supervision: Localized
  summary: Localized
  description: Localized
  /** Published price or copay. Null when the site does not state one. */
  pricing: Localized | null
  social: SocialLink[]
  quotes: CenterQuote[]
  branches: CenterBranch[]
  /** Where the public facts on this card came from. */
  source: Localized
  sourceUrl: string
  publicFunding: boolean
}
