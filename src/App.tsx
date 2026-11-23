import { lazy } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { CompareProvider } from './context/CompareContext.tsx'
import { LanguageProvider } from './context/LanguageContext.tsx'
import Layout from './layouts/Layout.tsx'
import { isLang, localePath } from './lib/locale.ts'

const AboutPage = lazy(() => import('./pages/AboutPage.tsx'))
const ArticlesPage = lazy(() => import('./pages/ArticlesPage.tsx'))
const CenterDetailPage = lazy(() => import('./pages/CenterDetailPage.tsx'))
const CentersPage = lazy(() => import('./pages/CentersPage.tsx'))
const ContactPage = lazy(() => import('./pages/ContactPage.tsx'))
const GuidesPage = lazy(() => import('./pages/GuidesPage.tsx'))
const HomePage = lazy(() => import('./pages/HomePage.tsx'))
const GonePage = lazy(() => import('./pages/GonePage.tsx'))
const MissingPage = lazy(() => import('./pages/MissingPage.tsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.tsx'))
const StatementPage = lazy(() => import('./pages/StatementPage.tsx'))
const TherapistSlugPage = lazy(() => import('./pages/TherapistSlugPage.tsx'))
const TherapistsPage = lazy(() => import('./pages/TherapistsPage.tsx'))
const TopicPage = lazy(() => import('./pages/TopicPage.tsx'))

function LocaleGate() {
  const { lang } = useParams()
  const location = useLocation()
  if (!isLang(lang)) {
    const target = `${localePath(location.pathname, 'he')}${location.search}${location.hash}`
    return <Navigate to={target} replace />
  }
  return <Outlet />
}

export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to="/he/" replace />} />
      <Route path=":lang" element={<LocaleGate />}>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="centers/page/:page" element={<CentersPage />} />
        <Route path="centers" element={<CentersPage />} />
        <Route path="map" element={<CentersPage mode="map" />} />
        <Route path="therapists/page/:page" element={<TherapistsPage />} />
        <Route path="therapists" element={<TherapistsPage />} />
        <Route path="therapists/:slug/page/:page" element={<TherapistSlugPage />} />
        <Route path="therapists/:slug" element={<TherapistSlugPage />} />
        <Route path="articles" element={<ArticlesPage />} />
        <Route path="guides" element={<GuidesPage />} />
        <Route path="guides/:slug/page/:page" element={<TopicPage group="question" />} />
        <Route path="guides/:slug" element={<TopicPage group="question" />} />
        <Route path="rehab/:slug/page/:page" element={<TopicPage group="rehab" />} />
        <Route path="rehab/:city/:center" element={<CenterDetailPage />} />
        <Route path="rehab/:slug" element={<TopicPage group="rehab" />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="privacy" element={<StatementPage kind="privacy" />} />
        <Route path="accessibility" element={<StatementPage kind="accessibility" />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="404" element={<NotFoundPage />} />
        <Route path="410" element={<GonePage />} />
        <Route path="*" element={<MissingPage />} />
      </Route>
      </Route>
      <Route path="*" element={<UnprefixedRedirect />} />
    </Routes>
  )
}

function UnprefixedRedirect() {
  const location = useLocation()
  const target = `${localePath(location.pathname, 'he')}${location.search}${location.hash}`
  return <Navigate to={target} replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <CompareProvider>
          <AppRoutes />
        </CompareProvider>
      </LanguageProvider>
    </BrowserRouter>
  )
}
