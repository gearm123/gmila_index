import { canonicalPath } from './facets.ts'
import { metaDescription } from './meta.ts'

/**
 * Launch origin for canonical URLs and the sitemap, with no trailing slash.
 * Set VITE_SITE_URL when the .co.il host is chosen. Until then, canonicals
 * stay on the path so a preview host is not named as the main address.
 */
export function siteOrigin(): string {
  const configured = import.meta.env.VITE_SITE_URL
  if (typeof configured === 'string' && configured.trim()) return configured.trim().replace(/\/$/, '')
  return ''
}

export function absoluteUrl(path: string): string {
  const normalized = canonicalPath(path)
  const origin = siteOrigin()
  return origin ? `${origin}${normalized}` : normalized
}

/** A file address. Unlike a page, it keeps its extension and has no trailing slash. */
export function assetUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  const origin = siteOrigin()
  return origin ? `${origin}${normalized}` : normalized
}

export function clipText(text: string): string {
  return metaDescription(text)
}
