import Breadcrumbs from '../components/Breadcrumbs.tsx'
import Link from '../components/LocaleLink.tsx'
import { breadcrumbJsonLd } from '../seo/breadcrumbs.ts'
import { localePath } from '../lib/locale.ts'
import Seo from '../components/Seo.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'
import { websiteId } from '../seo/organization.ts'
import { absoluteUrl } from '../seo/site.ts'
import { metaDescription, metaTitle } from '../seo/meta.ts'
import { articleCopy } from '../seo/articleCopy.ts'
import { guideCopy, guideGroups, shapeLabel, topicPath, topicShape, topicsInGroup } from '../seo/topics.ts'

export default function GuidesPage() {
  const { lang, t } = useLanguage()
  const copy = guideCopy[lang]
  const crumbs = [
    { name: t.nav.home, path: '/' },
    { name: copy.nav, path: '/guides/' },
  ]

  return (
    <>
      <Seo
        title={metaTitle(copy.title, lang === 'he' ? 'בישראל' : 'in Israel', lang === 'he' ? 'גמילה, עיר ושאלה' : 'rehab, a city, and a question')}
        description={metaDescription(
          copy.lede,
          lang === 'he' ? 'כל רשימה מקשרת לכרטיסים שפורסמו. זו אינה המלצה רפואית.' : 'Each list links to the cards that were published. This is not a medical recommendation.',
        )}
        path="/guides/"
        jsonLd={[
          {
            '@type': 'CollectionPage',
            name: copy.title,
            description: copy.lede,
            url: absoluteUrl(localePath('/guides/', lang)),
            inLanguage: lang === 'he' ? 'he' : 'en',
            isPartOf: { '@id': websiteId() },
          },
          breadcrumbJsonLd(crumbs, lang),
        ]}
      />
      <article className="prose">
        <Breadcrumbs items={crumbs} />
        <p className="kicker">{copy.kicker}</p>
        <h1>{copy.title}</h1>
        <p className="lede">{copy.lede}</p>
        <p>
          <Link to="/articles/">{articleCopy[lang].title}</Link>
          {' — '}
          {articleCopy[lang].lede}
        </p>
        <p className="site-footer__emergency">{t.footer.emergency}</p>
      </article>
      {guideGroups.map((group) => {
        const topics = topicsInGroup(group.id)
        if (topics.length === 0) return null
        return (
          <section key={group.id} className="band" aria-labelledby={`guide-${group.id}`}>
            <div className="section-head">
              <h2 id={`guide-${group.id}`}>{group.label[lang]}</h2>
              <p>{group.note[lang]}</p>
            </div>
            <div className="area-grid">
              {topics.map((topic) => (
                <Link key={topic.slug} className="area-card" to={topicPath(topic)}>
                  <h3>{topic.h1[lang]}</h3>
                  <span>{shapeLabel[topicShape(topic)][lang]}</span>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </>
  )
}
