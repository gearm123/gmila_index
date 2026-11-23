import type { Lang } from '../i18n/copy.ts'
import { programGroup } from '../lib/centers.ts'
import { localePath } from '../lib/locale.ts'
import type { Center } from '../types/center.ts'
import type { Therapist } from '../types/therapist.ts'
import { absoluteUrl } from './site.ts'

const UNPUBLISHED_HOURS =
  /לא פורסם|לא פורסמו|אינו מפרסם|אינה מפרסמת|בלי שעות|does not publish|are not published|are not on the|without exact times/i

/** The published hours sentence, or nothing when the card says hours were not published. */
export function publishedHours(text: string): string | undefined {
  const value = text.trim()
  if (!value) return undefined
  if (!UNPUBLISHED_HOURS.test(value)) return value
  if (/\d|24\/7|24 שעות|24 hours/.test(value)) return value
  return undefined
}

function postalAddress(street: string, city: string): Record<string, unknown> {
  return {
    '@type': 'PostalAddress',
    ...(street.trim() ? { streetAddress: street.trim() } : {}),
    ...(city.trim() ? { addressLocality: city.trim() } : {}),
    addressCountry: 'IL',
  }
}

export function centerSchemaType(center: Center): 'MedicalClinic' | 'MedicalBusiness' {
  return programGroup(center) === 'clinic' ? 'MedicalClinic' : 'MedicalBusiness'
}

export function therapistSchemaType(person: Therapist): 'Person' | 'MedicalClinic' {
  return person.id === 'tamir-institute' ? 'MedicalClinic' : 'Person'
}

export function providerPageUrl(path: string, lang: Lang): string {
  return absoluteUrl(localePath(path, lang))
}

/** Same id on the listing page and in an ItemList, so both describe one provider. */
export function providerId(pageUrl: string): string {
  return `${pageUrl}#provider`
}

export function providerItemList(
  name: string,
  entries: { type: string; name: string; url: string }[],
  start = 1,
): Record<string, unknown> | null {
  if (entries.length === 0) return null
  return {
    '@type': 'ItemList',
    name,
    numberOfItems: entries.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: entries.map((entry, index) => ({
      '@type': 'ListItem',
      position: start + index,
      item: {
        '@type': entry.type,
        '@id': providerId(entry.url),
        name: entry.name,
        url: entry.url,
      },
    })),
  }
}

function links(values: string[]): string | string[] | undefined {
  const unique = [...new Set(values.map((value) => value.trim()).filter(Boolean))]
  if (unique.length === 0) return undefined
  return unique.length === 1 ? unique[0] : unique
}

/**
 * A clinic is a MedicalClinic. Every other program is a MedicalBusiness.
 * Both are LocalBusiness types. A field the card left empty is left out.
 */
export function centerProviderJsonLd(center: Center, lang: Lang, path: string): Record<string, unknown> {
  const hours = publishedHours(center.hours[lang])
  const sameAs = links([center.website, ...center.social.map((link) => link.url)])
  const url = providerPageUrl(path, lang)
  return {
    '@type': centerSchemaType(center),
    '@id': providerId(url),
    name: center.name[lang],
    description: center.summary[lang],
    url,
    ...(center.phone.trim() ? { telephone: center.phone.trim() } : {}),
    ...(sameAs ? { sameAs } : {}),
    address: postalAddress(center.address[lang], center.city[lang]),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: center.lat,
      longitude: center.lng,
    },
    ...(hours ? { openingHours: hours } : {}),
    ...(center.googleRating != null && center.googleReviewCount != null
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: center.googleRating,
            reviewCount: center.googleReviewCount,
          },
        }
      : {}),
  }
}

/** A named clinician is a Person. An institute listed with the therapists is a clinic. */
export function therapistProviderJsonLd(person: Therapist, lang: Lang, path: string): Record<string, unknown> {
  const hours = publishedHours(person.hours[lang])
  const sameAs = links([person.website])
  const url = providerPageUrl(path, lang)
  const shared = {
    '@id': providerId(url),
    name: person.name[lang],
    description: person.summary[lang],
    url,
    ...(person.phone.trim() ? { telephone: person.phone.trim() } : {}),
    ...(person.email.trim() ? { email: person.email.trim() } : {}),
    ...(sameAs ? { sameAs } : {}),
    address: postalAddress(person.address[lang], person.city[lang]),
  }
  if (person.id === 'tamir-institute') {
    return {
      '@type': 'MedicalClinic',
      ...shared,
      ...(hours ? { openingHours: hours } : {}),
    }
  }
  return {
    '@type': 'Person',
    ...shared,
    ...(person.credential[lang].trim() ? { jobTitle: person.credential[lang].trim() } : {}),
    ...(hours
      ? { hoursAvailable: { '@type': 'OpeningHoursSpecification', description: hours } }
      : {}),
  }
}
