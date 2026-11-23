import Breadcrumbs from '../components/Breadcrumbs.tsx'
import Seo from '../components/Seo.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'
import { breadcrumbJsonLd } from '../seo/breadcrumbs.ts'
import { metaDescription, metaTitle } from '../seo/meta.ts'

type StatementPageProps = {
  kind: 'privacy' | 'accessibility'
}

export default function StatementPage({ kind }: StatementPageProps) {
  const { lang, t } = useLanguage()
  const page = t.legal[kind]
  const path = kind === 'privacy' ? '/privacy/' : '/accessibility/'
  const crumbs = [
    { name: t.nav.home, path: '/' },
    { name: kind === 'privacy' ? t.footer.privacy : t.footer.accessibility, path },
  ]
  const titleDetail = kind === 'privacy'
    ? lang === 'he' ? 'פנייה נשמרת בדפדפן' : 'stored on this device'
    : lang === 'he' ? 'לפי ת״י 5568 ברמה AA' : 'Standard 5568'
  const support = kind === 'privacy'
    ? lang === 'he' ? 'מילוי הטופס רצוני. ההודעה יכולה לכלול מידע על בריאות.' : 'Filling it in is voluntary. A message can include health details.'
    : lang === 'he' ? 'הרשימה היא החלופה למפה. לא בוצעה בדיקה חיצונית.' : 'The list replaces the map.'

  return (
    <>
      <Seo
        title={metaTitle(page.title, lang === 'he' ? 'בישראל' : 'in Israel', titleDetail)}
        description={metaDescription(page.summary, support)}
        path={path}
        jsonLd={breadcrumbJsonLd(crumbs, lang)}
      />
      <article className="prose">
        <Breadcrumbs items={crumbs} />
        <p className="kicker">{page.kicker}</p>
        <h1>{page.title}</h1>
        <p className="hero__script">{page.script}</p>
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
        {kind === 'accessibility' ? (
          <p>
            <a href={t.legal.accessibility.standardHref}>{t.legal.accessibility.standardLabel}</a>
            {' · '}
            <a href={t.legal.accessibility.commissionHref}>{t.legal.accessibility.commissionLabel}</a>
          </p>
        ) : null}
      </article>
    </>
  )
}
