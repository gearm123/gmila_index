import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

process.env.NODE_ENV ??= 'production'

const dist = resolve(import.meta.dirname, '../dist')
const template = readFileSync(resolve(dist, 'index.html'), 'utf8')
const server = await import(pathToFileURL(resolve(dist, 'server/entry-server.js')).href)

function splitDocument(rendered) {
  let rest = rendered
  let head = ''
  const headTag = /^<(title|meta|link)\b[^>]*?(?:\/>|>[\s\S]*?<\/\1>)/
  while (headTag.test(rest)) {
    const match = rest.match(headTag)
    head += match[0]
    rest = rest.slice(match[0].length)
  }
  return { head, body: rest }
}

function pageHtml(rendered, path) {
  const { head, body } = splitDocument(rendered)
  const lang = path.startsWith('/en/') ? 'en' : 'he'
  const dir = lang === 'he' ? 'rtl' : 'ltr'
  return template
    .replace('<html lang="he" dir="rtl">', `<html lang="${lang}" dir="${dir}">`)
    .replace(/<title>[\s\S]*?<\/title>\s*/, '')
    .replace(/<meta\s+name="description"[\s\S]*?>\s*/i, '')
    .replace(/<meta\s+property="og:[^"]+"[\s\S]*?>\s*/gi, '')
    .replace('</head>', `${head}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
}

const facetLink = /href="\/[^"]*\?(?:price|insurance|type|sort|q|care|kind|focus|rating|view|city|area|country)=/i

function writePage(path, html) {
  if (facetLink.test(html)) {
    throw new Error(`A filter was written into a public link on ${path}`)
  }
  const stray = [...html.matchAll(/href="(\/[^"#?]*)/g)]
    .map((match) => match[1])
    .filter((href) => !/\.[a-z0-9]+$/i.test(href) && !href.startsWith('/he/') && !href.startsWith('/en/'))
  if (stray.length > 0) {
    throw new Error(`${path} has an unprefixed link: ${stray.slice(0, 5).join(', ')}`)
  }
  for (const code of ['he', 'en', 'x-default']) {
    const href = code === 'x-default' ? sibling(path, 'he') : sibling(path, code)
    if (!html.includes(`hreflang="${code}"`) || !html.includes(`href="${href}"`)) {
      throw new Error(`${path} is missing hreflang ${code} -> ${href}`)
    }
  }
  const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]*)"/g)].map((match) => match[1])
  const expected = server.absoluteUrl(path)
  if (canonicals.length !== 1 || canonicals[0] !== expected) {
    throw new Error(`${path} canonical is ${canonicals.join(', ') || 'missing'}, expected ${expected}`)
  }
  const ogUrl = html.match(/property="og:url" content="([^"]*)"/)
  if (!ogUrl || ogUrl[1] !== expected) {
    throw new Error(`${path} og:url does not match its canonical`)
  }
  const clean = path === '/' ? '/' : path.replace(/\/+$/, '')
  if (clean === '/') {
    writeFileSync(resolve(dist, 'index.html'), html)
    return
  }
  const relative = clean.slice(1)
  const nested = resolve(dist, relative, 'index.html')
  mkdirSync(dirname(nested), { recursive: true })
  writeFileSync(nested, html)
  writeFileSync(resolve(dist, `${relative}.html`), html)
}

function sibling(path, lang) {
  const content = path.replace(/^\/(?:he|en)(?=\/)/, '') || '/'
  const localized = content === '/' ? `/${lang}/` : `/${lang}${content}`
  return server.absoluteUrl(localized)
}

for (const path of server.prerenderPaths()) {
  const html = pageHtml(await server.render(path), path)
  if ((path.includes('/404/') || path.includes('/410/')) && !html.includes('name="robots" content="noindex,follow"')) {
    throw new Error(`${path} must stay out of the index`)
  }
  writePage(path, html)
}

console.log(`Prerendered ${server.prerenderPaths().length} pages into dist/`)
