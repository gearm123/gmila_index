import { Link } from 'react-router-dom'
import Seo from '../components/Seo.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'

export default function NotFoundPage() {
  const { t } = useLanguage()

  return (
    <section className="page-intro">
      <Seo title={t.meta.notFound} />
      <h1>{t.notFound.title}</h1>
      <p className="lede">{t.notFound.text}</p>
      <Link className="site-cta" to="/">
        {t.notFound.home}
      </Link>
    </section>
  )
}
