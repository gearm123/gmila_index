import { Navigate, useLocation } from 'react-router-dom'
import { retirementFor } from '../lib/retired.ts'
import GonePage from './GonePage.tsx'
import NotFoundPage from './NotFoundPage.tsx'

export default function MissingPage() {
  const { pathname } = useLocation()
  const result = retirementFor(pathname)
  if (result?.status === 301) return <Navigate to={result.to} replace />
  if (result?.status === 410) return <GonePage />
  return <NotFoundPage />
}
