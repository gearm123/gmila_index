import { useLocation } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs.tsx'
import Link from '../components/LocaleLink.tsx'
import DirectorySearch from '../components/DirectorySearch.tsx'
import Seo from '../components/Seo.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'
import { contentPath } from '../lib/locale.ts'
import { nearbyLabel } from '../lib/retired.ts'
import { breadcrumbJsonLd } from '../seo/breadcrumbs.ts'

export default function NotFoundPage() {
  const { lang, t } = useLanguage()
  const { pathname } = useLocation()
  const hint = nearbyLabel(pathname, lang)
  const crumbs = [
    { name: t.nav.home, path: '/' },
    { name: t.notFound.title, path: contentPath(pathname) },
  ]

  return (
    <section className="page-intro">
      <Seo
        title={t.meta.notFound}
        description={t.notFound.text}
        path={pathname}
        index={false}
        jsonLd={breadcrumbJsonLd(crumbs, lang)}
      />
      <Breadcrumbs items={crumbs} />
      <h1>{t.notFound.title}</h1>
      <p className="lede">{t.notFound.text}</p>
      {hint ? (
        <p>
          <Link className="site-cta" to={hint.href}>
            {hint.label}
          </Link>
        </p>
      ) : null}
      <DirectorySearch />
    </section>
  )
}
