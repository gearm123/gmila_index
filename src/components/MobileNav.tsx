import { useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.tsx'
import { contentPath } from '../lib/locale.ts'
import Link from './LocaleLink.tsx'

function bare(pathname: string): string {
  const content = contentPath(pathname)
  return content.length > 1 && content.endsWith('/') ? content.slice(0, -1) : content
}

export default function MobileNav() {
  const { t } = useLanguage()
  const path = bare(useLocation().pathname)

  const items = [
    { to: '/', label: t.nav.home, active: path === '/' },
    { to: '/centers/', label: t.nav.centers, active: path === '/centers' || path.startsWith('/centers/page/'), current: path === '/centers' },
    { to: '/therapists/', label: t.nav.therapists, active: path.startsWith('/therapists') },
    { to: '/map/', label: t.nav.map, active: path === '/map' },
    { to: '/about/', label: t.nav.about, active: path === '/about' },
    { to: '/contact/', label: t.nav.contact, active: path === '/contact' },
  ]

  return (
    <nav className="mobile-tabbar" aria-label={t.nav.aria}>
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={item.active ? 'is-active' : undefined}
          aria-current={(item.current ?? item.active) ? 'page' : undefined}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
