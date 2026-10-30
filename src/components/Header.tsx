import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.tsx'
import LangToggle from './LangToggle.tsx'

export default function Header() {
  const { t } = useLanguage()
  const { pathname } = useLocation()
  const [params] = useSearchParams()
  const mapActive = pathname === '/centers' && params.get('view') === 'map'
  const centersActive = pathname.startsWith('/centers') && !mapActive

  const items = [
    { to: '/', label: t.nav.home, active: pathname === '/' },
    { to: '/centers', label: t.nav.centers, active: centersActive },
    { to: '/centers?view=map', label: t.nav.map, active: mapActive },
    { to: '/about', label: t.nav.about, active: pathname === '/about' },
    { to: '/contact', label: t.nav.contact, active: pathname === '/contact' },
  ]

  return (
    <header className="site-header">
      <div className="site-header__tools">
        <LangToggle />
      </div>

      <Link to="/" className="brand-title" dir="ltr">
        <span className="brand-title__main">Gmi</span>
        <span className="brand-title__accent">la</span>
      </Link>
      <p className="site-header__tagline">{t.brandTagline}</p>

      <nav className="site-nav" aria-label={t.nav.aria}>
        {items.map((item, index) => (
          <span className="site-nav__item" key={item.to}>
            {index > 0 ? <span className="site-nav__dot" aria-hidden="true" /> : null}
            <Link to={item.to} className={item.active ? 'is-active' : undefined} aria-current={item.active ? 'page' : undefined}>
              {item.label}
            </Link>
          </span>
        ))}
      </nav>
    </header>
  )
}
