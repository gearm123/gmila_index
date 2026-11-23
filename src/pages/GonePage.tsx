import { useLocation } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs.tsx'
import DirectorySearch from '../components/DirectorySearch.tsx'
import Seo from '../components/Seo.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'
import { contentPath } from '../lib/locale.ts'
import { breadcrumbJsonLd } from '../seo/breadcrumbs.ts'

export default function GonePage() {
  const { lang, t } = useLanguage()
  const { pathname } = useLocation()
  const crumbs = [
    { name: t.nav.home, path: '/' },
    { name: t.notFound.goneTitle, path: contentPath(pathname) },
  ]

  return (
    <section className="page-intro">
      <Seo
        title={t.meta.gone}
        description={t.notFound.goneText}
        path={pathname}
        index={false}
        jsonLd={breadcrumbJsonLd(crumbs, lang)}
      />
      <Breadcrumbs items={crumbs} />
      <h1>{t.notFound.goneTitle}</h1>
      <p className="lede">{t.notFound.goneText}</p>
      <DirectorySearch />
    </section>
  )
}
