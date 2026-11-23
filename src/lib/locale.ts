import type { Lang } from '../i18n/copy.ts'
import { canonicalPath } from '../seo/facets.ts'

export const LANGS = ['he', 'en'] as const

export function isLang(value: string | undefined): value is Lang {
  return value === 'he' || value === 'en'
}

/** The page without /he/ or /en/. */
export function contentPath(pathname: string): string {
  const canonical = canonicalPath(pathname)
  const parts = canonical.split('/').filter(Boolean)
  if (!isLang(parts[0])) return canonical
  const rest = parts.slice(1).join('/')
  return rest ? `/${rest}/` : '/'
}

export function langFromPath(pathname: string): Lang | null {
  const first = canonicalPath(pathname).split('/').filter(Boolean)[0]
  return isLang(first) ? first : null
}

/** /centers/ in English is /en/centers/. A hash or query is kept. */
export function localePath(path: string, lang: Lang): string {
  const hashAt = path.indexOf('#')
  const hash = hashAt === -1 ? '' : path.slice(hashAt)
  const beforeHash = hashAt === -1 ? path : path.slice(0, hashAt)
  const queryAt = beforeHash.indexOf('?')
  const query = queryAt === -1 ? '' : beforeHash.slice(queryAt)
  const bare = queryAt === -1 ? beforeHash : beforeHash.slice(0, queryAt)
  const content = contentPath(bare || '/')
  const localized = content === '/' ? `/${lang}/` : `/${lang}${content}`
  return `${localized}${query}${hash}`
}
