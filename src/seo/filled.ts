import type { Center } from '../types/center.ts'
import type { Therapist } from '../types/therapist.ts'
import { cityFacts } from './cityFacts.ts'

const REGISTER_DESCRIPTION = /^הכתובת במאגר:/

/**
 * A listing is filled when the description is the program's own text, not the
 * register address line, and the card also publishes a site, a price, a photo,
 * a quote, or a branch. Replacing the register line is what makes it indexable.
 */
export function centerIsFilled(center: Center): boolean {
  if (REGISTER_DESCRIPTION.test(center.description.he.trim())) return false
  if (center.description.he.trim().length < 80) return false
  const ownSite = center.website.length > 0 && !center.website.includes('data.gov.il')
  const ownPhoto = center.images.some((src) => !src.startsWith('/images/place-'))
  return ownSite || center.pricing != null || ownPhoto || center.quotes.length > 0 || center.branches.length > 0
}

/** A therapist page is filled when their own site is listed and the card's published text is more than a stub. */
export function therapistIsFilled(person: Therapist): boolean {
  const prose = [person.credential.he, person.focus.he, person.summary.he, person.description.he].join(' ').replace(/\s+/g, ' ').trim()
  return person.website.length > 0 && prose.length >= 180
}

/** A city page is filled when at least four listings support the count, types, and price notes. */
export function locationIsFilled(list: readonly Center[]): boolean {
  const facts = cityFacts(list)
  return facts.count >= 4 && facts.types.length > 0
}
