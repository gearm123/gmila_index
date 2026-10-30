import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.tsx'

export default function MobileNav() {
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
    <nav className="mobile-tabbar" aria-label={t.nav.aria}>
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={item.active ? 'is-active' : undefined}
          aria-current={item.active ? 'page' : undefined}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
