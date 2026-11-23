import Breadcrumbs from '../components/Breadcrumbs.tsx'
import { ProviderArticleList, providerArticleJsonLd } from '../components/ProviderArticles.tsx'
import Seo from '../components/Seo.tsx'
import { providerArticles } from '../data/providerArticles.ts'
import { useLanguage } from '../context/LanguageContext.tsx'
import { breadcrumbJsonLd } from '../seo/breadcrumbs.ts'
import { articleCopy } from '../seo/articleCopy.ts'
import { metaDescription, metaTitle } from '../seo/meta.ts'

export default function ArticlesPage() {
  const { lang, t } = useLanguage()
  const copy = articleCopy[lang]
  const crumbs = [
    { name: t.nav.home, path: '/' },
    { name: copy.nav, path: '/articles/' },
  ]
  const nodes = providerArticles
    .map((article) => providerArticleJsonLd(article, lang))
    .filter((node) => node != null)

  return (
    <>
      <Seo
        title={metaTitle(copy.title, lang === 'he' ? 'בישראל' : 'in Israel', lang === 'he' ? 'מהאתר של המרכז או המטפל' : 'from their own site')}
        description={metaDescription(
          copy.lede,
          lang === 'he' ? 'זו אינה המלצה רפואית, והטקסט המלא נשאר באתר שפרסם אותו.' : 'This is not a medical recommendation, and the full text stays on the site that published it.',
        )}
        path="/articles/"
        jsonLd={[
          {
            '@type': 'CollectionPage',
            name: copy.title,
            description: copy.lede,
            mainEntity: {
              '@type': 'ItemList',
              name: copy.title,
              numberOfItems: nodes.length,
              itemListElement: nodes.map((node, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: node,
              })),
            },
          },
          breadcrumbJsonLd(crumbs, lang),
        ]}
      />
      <article className="prose">
        <Breadcrumbs items={crumbs} />
        <p className="kicker">{copy.kicker}</p>
        <h1>{copy.title}</h1>
        <p className="lede">{copy.lede}</p>
        <p className="site-footer__emergency">{t.footer.emergency}</p>
      </article>
      <section className="band">
        <div className="feature-list">
          <ProviderArticleList articles={providerArticles} heading="h2" />
        </div>
      </section>
    </>
  )
}
