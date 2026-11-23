import { PRIVATE_FACET_NAMES } from './facets.ts'

/**
 * Crawl rules for the public directory.
 * Numbered lists stay at /centers/page/2/. A city stays at /rehab/haifa/.
 * Admin, internal search, and filter queries are blocked.
 */
export function robotsTxt(origin: string): string {
  const filters = PRIVATE_FACET_NAMES.filter((name) => name !== 'q')
  const lines = [
    'User-agent: *',
    'Allow: /',
    '',
    'Disallow: /admin',
    '',
    'Disallow: /search',
    'Disallow: /*?q=',
    'Disallow: /*&q=',
    '',
  ]

  for (const name of filters) {
    lines.push(`Disallow: /*?${name}=`)
    lines.push(`Disallow: /*&${name}=`)
  }

  lines.push('')
  const host = origin.trim().replace(/\/$/, '')
  if (host) lines.push(`Sitemap: ${host}/sitemap.xml`, '')

  return `${lines.join('\n')}\n`
}
