import { AREA_IDS, type AreaId, type Center, type Localized } from '../types/center.ts'
import type { Lang } from '../i18n/copy.ts'

export const AREA_LABELS: Record<AreaId, Localized> = {
  israel: { he: 'ישראל', en: 'Israel' },
  'new-york': { he: 'ניו יורק', en: 'New York' },
  cyprus: { he: 'קפריסין', en: 'Cyprus' },
  europe: { he: 'אירופה', en: 'Europe' },
  thailand: { he: 'תאילנד', en: 'Thailand' },
}

export const COUNTRY_LABELS: Record<string, Localized> = {
  il: { he: 'ישראל', en: 'Israel' },
  us: { he: 'ארצות הברית', en: 'United States' },
  cy: { he: 'קפריסין', en: 'Cyprus' },
  th: { he: 'תאילנד', en: 'Thailand' },
  gb: { he: 'בריטניה', en: 'United Kingdom' },
  es: { he: 'ספרד', en: 'Spain' },
  ch: { he: 'שווייץ', en: 'Switzerland' },
  nl: { he: 'הולנד', en: 'Netherlands' },
  pt: { he: 'פורטוגל', en: 'Portugal' },
  cz: { he: "צ'כיה", en: 'Czechia' },
  ie: { he: 'אירלנד', en: 'Ireland' },
}

export function isAreaId(value: string | null): value is AreaId {
  return !!value && (AREA_IDS as readonly string[]).includes(value)
}

export function centerCountryId(center: Center): string {
  return center.countryId ?? 'il'
}

export function centerAreaId(center: Center): AreaId {
  return center.areaId ?? 'israel'
}

export function countryName(countryId: string, lang: Lang): string {
  return COUNTRY_LABELS[countryId]?.[lang] ?? countryId
}

export function areaName(areaId: AreaId, lang: Lang): string {
  return AREA_LABELS[areaId][lang]
}
