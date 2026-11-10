import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout.tsx'
import AboutPage from './pages/AboutPage.tsx'
import CenterDetailPage from './pages/CenterDetailPage.tsx'
import CentersPage from './pages/CentersPage.tsx'
import ContactPage from './pages/ContactPage.tsx'
import HomePage from './pages/HomePage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import TherapistDetailPage from './pages/TherapistDetailPage.tsx'
import TherapistsPage from './pages/TherapistsPage.tsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="centers" element={<CentersPage />} />
          <Route path="centers/:slug" element={<CenterDetailPage />} />
          <Route path="therapists" element={<TherapistsPage />} />
          <Route path="therapists/:slug" element={<TherapistDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
