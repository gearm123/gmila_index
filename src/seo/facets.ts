/**
 * Price, insurance, type, and sort never get their own address.
 * A numbered listing is /page/2/, not ?page=2.
 * A city, an addiction, or a program length is a page only when that single
 * dimension already has a guide. Cross-filters stay on the page.
 */
export const PRIVATE_FACET_NAMES = [
  'price',
  'insurance',
  'type',
  'sort',
  'q',
  'care',
  'kind',
  'focus',
  'rating',
  'view',
  'city',
  'area',
  'country',
  'page',
] as const

const PRIVATE_FACETS = new Set<string>(PRIVATE_FACET_NAMES)

/** The one address a document should claim. Copies fold into it. */
export function canonicalPath(path: string): string {
  let bare = (path.split('#')[0] ?? '').split('?')[0] || '/'
  try {
    bare = decodeURI(bare)
  } catch {
    // Keep the raw path when the encoding is not valid.
  }
  bare = bare.replace(/\/index\.html$/i, '/').replace(/\.html$/i, '')
  bare = bare.toLowerCase()
  if (!bare.startsWith('/')) bare = `/${bare}`
  bare = bare.replace(/\/{2,}/g, '/')
  if (bare !== '/' && !bare.endsWith('/')) bare = `${bare}/`
  bare = bare.replace(/\/page\/1\/$/, '/')
  return bare || '/'
}

export function isPrivateFacetSearch(search: string): boolean {
  const query = search.startsWith('?') ? search.slice(1) : search
  if (!query) return false
  const params = new URLSearchParams(query)
  for (const key of params.keys()) {
    if (PRIVATE_FACETS.has(key.toLowerCase())) return true
  }
  return false
}
