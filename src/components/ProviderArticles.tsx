import { centers } from '../data/centers.ts'
import { articlesFor, type ProviderArticle } from '../data/providerArticles.ts'
import { therapists } from '../data/therapists.ts'
import { useLanguage } from '../context/LanguageContext.tsx'
import { centerPath, therapistPath } from '../lib/paths.ts'
import { articleCopy, publishedDateLabel } from '../seo/articleCopy.ts'
import { centerSchemaType, providerPageUrl, therapistSchemaType } from '../seo/provider.ts'
import Link from './LocaleLink.tsx'

type ProviderRef = { kind: 'center' | 'therapist'; id: string; name: string; path: string; type: string }

function providerOf(article: ProviderArticle, lang: 'he' | 'en'): ProviderRef | null {
  if (article.provider.kind === 'center') {
    const center = centers.find((item) => item.id === article.provider.id)
    if (!center) return null
    const path = centerPath(center)
    return { kind: 'center', id: center.id, name: center.name[lang], path, type: centerSchemaType(center) }
  }
  const person = therapists.find((item) => item.id === article.provider.id)
  if (!person) return null
  const path = therapistPath(person.slug)
  return { kind: 'therapist', id: person.id, name: person.name[lang], path, type: therapistSchemaType(person) }
}

export function providerArticleJsonLd(article: ProviderArticle, lang: 'he' | 'en'): Record<string, unknown> | null {
  const provider = providerOf(article, lang)
  if (!provider) return null
  const publisher = {
    '@type': provider.type,
    name: provider.name,
    url: providerPageUrl(provider.path, lang),
  }
  return {
    '@type': 'Article',
    headline: article.title[lang],
    description: article.note[lang],
    inLanguage: 'he-IL',
    url: article.url,
    mainEntityOfPage: article.url,
    ...(article.published ? { datePublished: article.published } : {}),
    ...(article.modified ? { dateModified: article.modified } : {}),
    author: article.byline ? { '@type': 'Person', name: article.byline } : publisher,
    publisher,
  }
}

export function ProviderArticleList({ articles, heading }: { articles: ProviderArticle[]; heading: 'h2' | 'h3' }) {
  const { lang } = useLanguage()
  const copy = articleCopy[lang]
  const Title = heading
  return (
    <>
      {articles.map((article) => {
        const provider = providerOf(article, lang)
        if (!provider) return null
        return (
          <article key={article.id} className="center-card">
            <div className="center-card__body">
              <p className="kicker">
                <Link to={provider.path}>{provider.name}</Link>
              </p>
              <Title>
                <a href={article.url} target="_blank" rel="noreferrer">
                  {article.title[lang]}
                </a>
              </Title>
              <p>{article.note[lang]}</p>
              {article.byline ? (
                <p>
                  {copy.byline}: {article.byline}
                </p>
              ) : null}
              {article.published ? (
                <p>
                  {copy.published} {publishedDateLabel(article.published, lang)}
                  {article.modified ? `. ${copy.updated} ${publishedDateLabel(article.modified, lang)}` : ''}
                </p>
              ) : null}
              <p>
                <a href={article.url} target="_blank" rel="noreferrer">
                  {copy.onSite}
                </a>
              </p>
            </div>
          </article>
        )
      })}
    </>
  )
}

export function ProviderArticleSection({ kind, id }: { kind: 'center' | 'therapist'; id: string }) {
  const { lang } = useLanguage()
  const articles = articlesFor(kind, id)
  if (articles.length === 0) return null
  return (
    <section className="band" aria-label={articleCopy[lang].title}>
      <h2>{articleCopy[lang].title}</h2>
      <div className="feature-list">
        <ProviderArticleList articles={articles} heading="h3" />
      </div>
    </section>
  )
}
