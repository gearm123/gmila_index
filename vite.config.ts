import { readFileSync, writeFileSync } from 'node:fs'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { loadEnv, defineConfig, type Plugin } from 'vite'
import { langFromPath, localePath } from './src/lib/locale.ts'
import { assertRetirementRule, redirectsFile, retirementFor } from './src/lib/retired.ts'
import { robotsTxt } from './src/seo/robots.ts'
import { sitemapIndexXml, sitemapUrls, urlSetXml } from './scripts/sitemapBuild.ts'
import type { SitemapKind } from './src/seo/topics.ts'

declare global {
  interface ImportMetaEnv {
    readonly VITE_GOOGLE_MAPS_API_KEY?: string
    readonly VITE_SITE_URL?: string
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

const SITEMAP_FILES: Record<SitemapKind, string> = {
  listings: 'sitemap-listings.xml',
  locations: 'sitemap-locations.xml',
  articles: 'sitemap-articles.xml',
}

function sitemapPlugin(origin: string): Plugin {
  let outDir = ''
  let root = ''
  return {
    name: 'gmila-sitemap',
    apply: 'build',
    configResolved(config) {
      root = config.root
      outDir = resolve(config.root, config.build.outDir)
    },
    generateBundle() {
      if (this.environment.name !== 'client') return
      const urls = sitemapUrls(root)
      const kinds: SitemapKind[] = ['listings', 'locations', 'articles']
      const parts = kinds.map((kind) => {
        const group = urls.filter((url) => url.kind === kind)
        const lastmod = group.reduce((latest, url) => (url.lastmod > latest ? url.lastmod : latest), '1970-01-01')
        return { kind, file: SITEMAP_FILES[kind], urls: group, lastmod }
      })
      const summary = parts.map((part) => `${part.urls.length} ${part.kind} (${part.lastmod})`).join(', ')
      if (!origin) {
        console.log(`Sitemap ready: ${summary}. No host is set, so the files were not written.`)
        return
      }
      for (const part of parts) {
        this.emitFile({
          type: 'asset',
          fileName: part.file,
          source: urlSetXml(origin, part.urls),
        })
      }
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: sitemapIndexXml(
          origin,
          parts.map((part) => ({ file: part.file, lastmod: part.lastmod })),
        ),
      })
      console.log(`Sitemap: ${summary}`)
    },
    writeBundle() {
      if (this.environment.name !== 'client') return
      writeFileSync(resolve(outDir, 'robots.txt'), robotsTxt(origin))
      writeFileSync(resolve(outDir, '_redirects'), redirectsFile())
    },
  }
}

function requestPath(url: string | undefined): string {
  const raw = (url ?? '/').split('?')[0] || '/'
  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}

function skipRetirement(path: string): boolean {
  if (
    path.startsWith('/@') ||
    path.startsWith('/src/') ||
    path.startsWith('/node_modules/') ||
    path.startsWith('/assets/')
  ) {
    return true
  }
  return /\.[a-z0-9]+$/i.test(path)
}

function retirementMiddleware(goneHtml: (lang: 'he' | 'en') => string | null) {
  return (req: IncomingMessage, res: ServerResponse, next: (error?: unknown) => void) => {
    const path = requestPath(req.url)
    if (skipRetirement(path)) {
      next()
      return
    }
    const search = req.url?.includes('?') ? req.url.slice(req.url.indexOf('?')) : ''
    const result = retirementFor(path)
    if (result?.status === 301) {
      res.statusCode = 301
      res.setHeader('Location', `${result.to}${search}`)
      res.end()
      return
    }
    if (result?.status === 410) {
      const body = goneHtml(langFromPath(path) ?? 'he')
      if (!body) {
        next()
        return
      }
      res.statusCode = 410
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end(body)
      return
    }
    if (!langFromPath(path)) {
      res.statusCode = 301
      res.setHeader('Location', `${localePath(path, 'he')}${search}`)
      res.end()
      return
    }
    next()
  }
}

function retirementPlugin(): Plugin {
  return {
    name: 'gmila-retired',
    configResolved() {
      assertRetirementRule()
    },
    configureServer(server) {
      server.middlewares.use(
        retirementMiddleware(() => readFileSync(resolve(server.config.root, 'index.html'), 'utf8')),
      )
    },
    configurePreviewServer(server) {
      server.middlewares.use(
        retirementMiddleware((lang) => {
          try {
            return readFileSync(resolve(server.config.root, `dist/${lang}/410/index.html`), 'utf8')
          } catch {
            return null
          }
        }),
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const origin = (env.VITE_SITE_URL || '').trim().replace(/\/$/, '')
  return {
    plugins: [react(), retirementPlugin(), sitemapPlugin(origin)],
    server: {
      watch: {
        ignored: ['**/*.mp4', '**/*.webm', '**/*.mov'],
      },
    },
  }
})
