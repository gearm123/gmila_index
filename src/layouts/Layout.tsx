import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import CompareBar from '../components/CompareBar.tsx'
import Link from '../components/LocaleLink.tsx'
import Footer from '../components/Footer.tsx'
import Header from '../components/Header.tsx'
import MobileHeader from '../components/MobileHeader.tsx'
import MobileNav from '../components/MobileNav.tsx'
import ScrollToTop from '../components/ScrollToTop.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'
import { allSample, anySample } from '../data/sampleState.ts'

export default function Layout() {
  const { lang, t } = useLanguage()

  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#content">
        {lang === 'he' ? 'דילוג לתוכן' : 'Skip to content'}
      </a>
      <div className="chrome chrome--desktop">
        <Header />
      </div>
      <div className="chrome chrome--mobile">
        <MobileHeader />
      </div>
      {anySample ? (
        <p className="sample-banner">
          {allSample ? t.sampleAll : t.sampleSome}{' '}
          <Link to="/about/">{t.nav.about}</Link>
        </p>
      ) : null}
      <main id="content">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <CompareBar />
      <MobileNav />

    </>
  )
}
