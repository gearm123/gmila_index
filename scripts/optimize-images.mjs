import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import sharp from 'sharp'

const root = resolve(import.meta.dirname, '..')
const source = readFileSync(resolve(root, 'src/data/centers.ts'), 'utf8')
const urls = [...new Set([...source.matchAll(/https:\/\/[^'")\s]+/g)].map((match) => match[0]))]
  .filter((url) => /\.(png|jpe?g|webp|avif)(\?|$)/i.test(url))

const outDir = resolve(root, 'public/images/opt')
mkdirSync(outDir, { recursive: true })

const record = {}

for (const url of urls) {
  const id = createHash('sha1').update(url).digest('hex').slice(0, 12)
  try {
    const response = await fetch(url, {
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; GMILA image build)' },
      signal: AbortSignal.timeout(20000),
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const input = Buffer.from(await response.arrayBuffer())
    const fitted = sharp(input, { failOn: 'none' }).rotate().resize({
      width: 960,
      height: 960,
      fit: 'inside',
      withoutEnlargement: true,
    })
    const meta = await fitted.clone().metadata()
    const webpName = `${id}.webp`
    const avifName = `${id}.avif`
    await fitted.clone().webp({ quality: 68, effort: 4 }).toFile(resolve(outDir, webpName))
    await fitted.clone().avif({ quality: 45, effort: 4 }).toFile(resolve(outDir, avifName))
    record[url] = {
      avif: `/images/opt/${avifName}`,
      webp: `/images/opt/${webpName}`,
      width: meta.width ?? 960,
      height: meta.height ?? 600,
    }
    console.log(`ok ${id} ${meta.width}x${meta.height} ${url}`)
  } catch (error) {
    console.log(`skip ${url} (${error instanceof Error ? error.message : error})`)
  }
}

const lines = Object.entries(record)
  .map(([url, image]) => `  ${JSON.stringify(url)}: ${JSON.stringify(image)},`)
  .join('\n')

writeFileSync(
  resolve(root, 'src/lib/optimizedImages.ts'),
  `export type OptimizedImage = {
  avif: string
  webp: string
  width: number
  height: number
}

export const optimizedImages: Record<string, OptimizedImage> = {
${lines}
}
`,
)

console.log(`Wrote ${Object.keys(record).length} of ${urls.length} images`)
