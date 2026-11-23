import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.tsx'
import { LANGS, contentPath, localePath } from '../lib/locale.ts'
import { isPrivateFacetSearch } from '../seo/facets.ts'
import { siteGraph } from '../seo/organization.ts'
import { absoluteUrl, clipText } from '../seo/site.ts'

type SeoProps = {
  title: string
  description?: string
  /** Path that should be the canonical URL, starting with /. */
  path: string
  /** Missing pages stay out of the index. A price, insurance, type, or sort query does too. */
  index?: boolean
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export default function Seo({ title, description, path, index = true, jsonLd }: SeoProps) {
  const { lang } = useLanguage()
  const location = useLocation()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  const summary = description ? clipText(description) : ''
  const localized = localePath(contentPath(path), lang)
  const url = absoluteUrl(localized)
  // The prerendered file has no query, so the first render must match it.
  // After mount, a price, insurance, type, or sort query is noindex.
  const allowIndex = index && !(mounted && isPrivateFacetSearch(location.search))
  const pageNodes = jsonLd == null ? [] : Array.isArray(jsonLd) ? jsonLd : [jsonLd]
  const structured = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [...siteGraph(lang), ...pageNodes.map((node) => {
      const rest = { ...node }
      delete rest['@context']
      return rest
    })],
  }).replace(/</g, '\\u003c')

  return (
    <>
      <title>{title}</title>
      {summary ? <meta name="description" content={summary} /> : null}
      <meta name="robots" content={allowIndex ? 'index,follow' : 'noindex,follow'} />
      <link rel="canonical" href={url} />
      {LANGS.map((code) => (
        <link key={code} rel="alternate" href={absoluteUrl(localePath(contentPath(path), code))} {...{ hreflang: code }} />
      ))}
      <link rel="alternate" href={absoluteUrl(localePath(contentPath(path), 'he'))} {...{ hreflang: 'x-default' }} />
      <meta property="og:site_name" content="GMILA" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={lang === 'he' ? 'he_IL' : 'en_US'} />
      <meta property="og:locale:alternate" content={lang === 'he' ? 'en_US' : 'he_IL'} />
      {summary ? <meta property="og:description" content={summary} /> : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structured }} />
    </>
  )
}
