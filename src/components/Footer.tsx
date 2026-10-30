import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.tsx'

const copyrightYear = new Date().getFullYear()

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <Link to="/" className="brand-title brand-title--small" dir="ltr">
          <span className="brand-title__main">Gmi</span>
          <span className="brand-title__accent">la</span>
        </Link>
        <p className="site-footer__blurb">{t.footer.blurb}</p>
        <nav className="site-footer__links" aria-label={t.nav.aria}>
          <Link to="/centers">{t.nav.centers}</Link>
          <Link to="/centers?view=map">{t.nav.map}</Link>
          <Link to="/about">{t.nav.about}</Link>
          <Link to="/contact">{t.nav.contact}</Link>
        </nav>
        <p className="site-footer__emergency">{t.footer.emergency}</p>
      </div>
      <p className="site-footer__copy">
        © {copyrightYear} GMILA. {t.footer.rights}
      </p>
    </footer>
  )
}
