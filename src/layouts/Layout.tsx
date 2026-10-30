import { Link, Outlet } from 'react-router-dom'
import Footer from '../components/Footer.tsx'
import Header from '../components/Header.tsx'
import MobileHeader from '../components/MobileHeader.tsx'
import MobileNav from '../components/MobileNav.tsx'
import ScrollToTop from '../components/ScrollToTop.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'
import { centers } from '../data/centers.ts'
import { useViewport } from '../lib/viewport.ts'

export default function Layout() {
  const { lang, t } = useLanguage()
  const ui = useViewport()
  const mobile = ui === 'mobile'
  const anySample = centers.some((center) => center.sample)
  const allSample = centers.every((center) => center.sample)

  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#content">
        {lang === 'he' ? 'דילוג לתוכן' : 'Skip to content'}
      </a>
      {mobile ? <MobileHeader /> : <Header />}
      {anySample ? (
        <p className="sample-banner">
          {allSample ? t.sampleAll : t.sampleSome}{' '}
          <Link to="/about">{t.nav.about}</Link>
        </p>
      ) : null}
      <main id="content">
        <Outlet />
      </main>
      <Footer compact={mobile} />
      {mobile ? <MobileNav /> : null}
    </>
  )
}
