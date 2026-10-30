import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.tsx'
import LangToggle from './LangToggle.tsx'

export default function MobileHeader() {
  const { t } = useLanguage()

  return (
    <header className="site-header site-header--mobile">
      <Link to="/" className="brand-title brand-title--small" dir="ltr">
        <span className="brand-title__main">Gmi</span>
        <span className="brand-title__accent">la</span>
      </Link>
      <p className="site-header__tagline">{t.brandTagline}</p>
      <LangToggle />
    </header>
  )
}
