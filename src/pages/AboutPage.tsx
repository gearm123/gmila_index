import Breadcrumbs from '../components/Breadcrumbs.tsx'
import Seo from '../components/Seo.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'
import { breadcrumbJsonLd } from '../seo/breadcrumbs.ts'
import { metaDescription, metaTitle } from '../seo/meta.ts'

export default function AboutPage() {
  const { lang, t } = useLanguage()
  const crumbs = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.about, path: '/about/' },
  ]

  return (
    <>
      <Seo
        title={metaTitle(t.about.title, lang === 'he' ? 'בישראל' : 'in Israel', lang === 'he' ? 'מי מפרסם ואיך נבחרת' : 'who runs the site')}
        description={metaDescription(
          t.about.summary,
          lang === 'he' ? 'שדה שלא פורסם נשאר ריק. האתר אינו ייעוץ רפואי.' : 'An unpublished field stays empty. The site is not medical advice.',
        )}
        path="/about/"
        jsonLd={breadcrumbJsonLd(crumbs, lang)}
      />
      <article className="prose">
        <Breadcrumbs items={crumbs} />
        <p className="kicker">{t.about.kicker}</p>
        <h1>{t.about.title}</h1>
        <p className="hero__script">{t.about.script}</p>
        {t.about.sections.map((section) => (
          <section key={section.heading} id={section.id}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
        <p className="site-footer__emergency">{t.footer.emergency}</p>
      </article>
    </>
  )
}
