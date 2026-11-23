import { execFileSync } from 'node:child_process'
import { statSync } from 'node:fs'
import { resolve } from 'node:path'
import { LANGS, localePath } from '../src/lib/locale.ts'
import { sitemapPaths, type SitemapKind } from '../src/seo/topics.ts'

const CATALOG = ['src/data/centers.ts', 'src/data/ministryCenters.ts']
const THERAPISTS = ['src/data/therapists.ts']
const TOPIC_COPY = ['src/seo/topics.ts', 'src/seo/guideCopy.ts']
const SITE_COPY = ['src/i18n/copy.ts']

export type SitemapUrl = {
  path: string
  kind: SitemapKind
  lastmod: string
  alternates: { hreflang: string; path: string }[]
}

function dayStamp(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

function newer(left: string, right: string): string {
  return left > right ? left : right
}

/** Commit day of a content file, or the save day when the file has uncommitted edits. */
export function contentLastmod(root: string, files: readonly string[]): string {
  let latest = '1970-01-01'
  for (const file of files) {
    const saved = dayStamp(statSync(resolve(root, file)).mtime)
    let committed = ''
    let dirty = false
    try {
      committed = execFileSync('git', ['log', '-1', '--format=%cs', '--', file], {
        cwd: root,
        encoding: 'utf8',
      }).trim()
      dirty = execFileSync('git', ['status', '--porcelain', '--', file], {
        cwd: root,
        encoding: 'utf8',
      }).trim().length > 0
    } catch {
      committed = ''
    }
    const stamp = !committed || (dirty && saved > committed) ? saved : committed
    latest = newer(latest, stamp)
  }
  return latest
}

function sourcesFor(path: string): string[] {
  if (path === '/') return [...CATALOG, ...THERAPISTS, ...TOPIC_COPY, ...SITE_COPY, 'src/pages/HomePage.tsx']
  if (path === '/about/') return [...SITE_COPY, 'src/pages/AboutPage.tsx']
  if (path === '/contact/') return [...SITE_COPY, 'src/pages/ContactPage.tsx']
  if (path === '/guides/') return [...TOPIC_COPY, ...CATALOG]
  if (path.startsWith('/guides/')) return [...TOPIC_COPY]
  if (path.startsWith('/therapists/')) return [...THERAPISTS]
  if (path.startsWith('/centers/')) return [...CATALOG]
  const parts = path.split('/').filter(Boolean)
  if (parts[0] === 'rehab' && parts.length === 3 && parts[2] !== 'page') return [...CATALOG]
  return [...CATALOG, ...TOPIC_COPY]
}

export function sitemapUrls(root: string): SitemapUrl[] {
  const cache = new Map<string, string>()
  return sitemapPaths().flatMap((row) => {
    const files = sourcesFor(row.path)
    const key = files.join('|')
    let lastmod = cache.get(key)
    if (!lastmod) {
      lastmod = contentLastmod(root, files)
      cache.set(key, lastmod)
    }
    const alternates = [
      ...LANGS.map((code) => ({ hreflang: code, path: localePath(row.path, code) })),
      { hreflang: 'x-default', path: localePath(row.path, 'he') },
    ]
    return LANGS.map((code) => ({
      path: localePath(row.path, code),
      kind: row.kind,
      lastmod,
      alternates,
    }))
  })
}

function escapeXml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function urlSetXml(origin: string, urls: SitemapUrl[]): string {
  const host = origin.replace(/\/$/, '')
  const body = urls
    .map((url) => {
      const links = url.alternates
        .map(
          (alt) =>
            `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${escapeXml(`${host}${alt.path}`)}"/>`,
        )
        .join('\n')
      return `  <url><loc>${escapeXml(`${host}${url.path}`)}</loc><lastmod>${url.lastmod}</lastmod>\n${links}\n  </url>`
    })
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`
}

export function sitemapIndexXml(
  origin: string,
  parts: { file: string; lastmod: string }[],
): string {
  const host = origin.replace(/\/$/, '')
  const body = parts
    .map(
      (part) =>
        `  <sitemap><loc>${escapeXml(`${host}/${part.file}`)}</loc><lastmod>${part.lastmod}</lastmod></sitemap>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>\n`
}
