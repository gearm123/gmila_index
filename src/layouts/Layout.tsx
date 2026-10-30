import { Link, Outlet } from 'react-router-dom'
import Footer from '../components/Footer.tsx'
import Header from '../components/Header.tsx'
import ScrollToTop from '../components/ScrollToTop.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'
import { centers } from '../data/centers.ts'

export default function Layout() {
  const { lang, t } = useLanguage()
  const anySample = centers.some((center) => center.sample)
  const allSample = centers.every((center) => center.sample)

  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#content">
        {lang === 'he' ? 'דילוג לתוכן' : 'Skip to content'}
      </a>
      <Header />
      {anySample ? (
        <p className="sample-banner">
          {allSample ? t.sampleAll : t.sampleSome}{' '}
          <Link to="/about">{t.nav.about}</Link>
        </p>
      ) : null}
      <main id="content">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
