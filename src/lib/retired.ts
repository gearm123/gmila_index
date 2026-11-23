import { retiredListings, type RetiredListing } from '../data/retired.ts'
import type { Lang } from '../i18n/copy.ts'
import { allTopics, aliasPaths, indexablePaths, topicPath, unfilledPaths } from '../seo/topics.ts'
import { contentPath, langFromPath, localePath } from './locale.ts'
import { cityPathSlug } from './paths.ts'

export function normalizePublicPath(pathname: string): string {
  const bare = (pathname.split('?')[0] ?? '/').split('#')[0] || '/'
  if (bare === '/') return '/'
  const slashed = bare.startsWith('/') ? bare : `/${bare}`
  return slashed.endsWith('/') ? slashed : `${slashed}/`
}

export function locationPath(citySlug: string): string | null {
  const topic = allTopics().find((item) => item.group === 'city' && item.slug === citySlug)
  return topic ? topicPath(topic) : null
}

export type Retirement = { status: 301; to: string } | { status: 410 }

/** 301 to the city page when that page exists. 410 when it does not. */
export function retirementOf(listing: RetiredListing): Retirement {
  const path = normalizePublicPath(listing.path)
  const parts = path.split('/').filter(Boolean)
  if (parts[0] === 'rehab' && listing.city) {
    const to = locationPath(listing.city)
    if (to && to !== path) return { status: 301, to }
  }
  return { status: 410 }
}

export function retirementFor(pathname: string): Retirement | null {
  const lang = langFromPath(pathname) ?? 'he'
  const path = contentPath(pathname)
  const listing = retiredListings.find((item) => contentPath(normalizePublicPath(item.path)) === path)
  if (!listing) return null
  const result = retirementOf(listing)
  if (result.status === 301) return { status: 301, to: localePath(result.to, lang) }
  return { status: 410 }
}

function nearbyLocation(pathname: string): { href: string; label: { he: string; en: string } } | null {
  const parts = contentPath(pathname).split('/').filter(Boolean)
  if (parts[0] !== 'rehab' || !parts[1]) return null
  const topic = allTopics().find((item) => item.group === 'city' && item.slug === parts[1])
  if (!topic) return null
  const href = topicPath(topic)
  if (href === contentPath(pathname)) return null
  return { href, label: topic.h1 }
}

export function nearbyLabel(pathname: string, lang: Lang): { href: string; label: string } | null {
  const hint = nearbyLocation(pathname)
  return hint ? { href: hint.href, label: hint.label[lang] } : null
}

export function redirectsFile(): string {
  const lines = ['# Unprefixed addresses go to Hebrew. Removed listings redirect in each language.']
  const seen = new Set<string>()
  function add(from: string, to: string, status: 301 | 410) {
    const key = `${from} ${to} ${status}`
    if (seen.has(key) || from === to) return
    seen.add(key)
    lines.push(`${from} ${to} ${status}`)
  }
  for (const listing of retiredListings) {
    const path = contentPath(normalizePublicPath(listing.path))
    const result = retirementOf(listing)
    for (const lang of ['he', 'en'] as const) {
      const from = localePath(path, lang)
      const target = result.status === 301 ? localePath(result.to, lang) : localePath('/410/', lang)
      add(from.slice(0, -1), target, result.status)
      add(from, target, result.status)
    }
    const hebrew = result.status === 301 ? localePath(result.to, 'he') : localePath('/410/', 'he')
    add(path.slice(0, -1), hebrew, result.status)
    add(path, hebrew, result.status)
  }
  for (const path of [...indexablePaths(), ...unfilledPaths(), '/map/', ...aliasPaths()]) {
    const target = localePath(path, 'he')
    if (path === '/') {
      add('/', target, 301)
      continue
    }
    add(path.slice(0, -1), target, 301)
    add(path, target, 301)
  }
  return `${lines.join('\n')}\n`
}

function isListingPath(path: string): boolean {
  const parts = path.split('/').filter(Boolean)
  return (parts[0] === 'rehab' && parts.length === 3) || (parts[0] === 'therapists' && parts.length === 2)
}

/** Fail the build if a removed URL is still published or would not resolve. */
export function assertRetirementRule(): void {
  const live = new Set(indexablePaths())
  const seen = new Set<string>()
  for (const listing of retiredListings) {
    const path = normalizePublicPath(listing.path)
    if (!isListingPath(path)) throw new Error(`Retired path must be one listing: ${listing.path}`)
    if (seen.has(path)) throw new Error(`Retired path is listed twice: ${path}`)
    seen.add(path)
    if (live.has(path)) throw new Error(`Retired path is still published: ${path}`)
    const parts = path.split('/').filter(Boolean)
    if (parts[0] === 'rehab') {
      if (!listing.city) throw new Error(`Retired center needs its city slug: ${path}`)
      if (!/^[a-z0-9-]+$/.test(listing.city) || listing.city !== cityPathSlug(listing.city)) {
        throw new Error(`Retired city slug must be the public slug: ${listing.city}`)
      }
    }
    const result = retirementOf(listing)
    if (result.status === 301 && !live.has(result.to)) {
      throw new Error(`Retired listing 301s to a page that is not published: ${result.to}`)
    }
  }

  const city = allTopics().find((item) => item.group === 'city')
  if (!city) throw new Error('Expected a location page')
  const moved = retirementOf({ path: `/rehab/${city.slug}/__removed__/`, city: city.slug })
  if (moved.status !== 301 || moved.to !== topicPath(city)) {
    throw new Error('A removed listing must 301 to its location page')
  }
  const gone = retirementOf({ path: '/rehab/__none__/__removed__/', city: '__none__' })
  if (gone.status !== 410) throw new Error('A removed listing without a location page must be 410')
}
