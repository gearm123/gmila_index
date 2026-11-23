import Link from './LocaleLink.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'
import { articleCopy } from '../seo/articleCopy.ts'
import { guideCopy } from '../seo/guideCopy.ts'

const copyrightYear = new Date().getFullYear()

export default function Footer({ compact = false }: { compact?: boolean }) {
  const { lang, t } = useLanguage()

  if (compact) {
    return (
      <footer className="site-footer site-footer--compact">
        <div className="site-footer__inner">
          <p className="site-footer__blurb">{t.footer.blurb}</p>
          <p className="site-footer__emergency">{t.footer.emergency}</p>
          <nav className="site-footer__legal" aria-label={t.footer.legalLabel}>
            <Link to="/privacy/">{t.footer.privacy}</Link>
            <Link to="/accessibility/">{t.footer.accessibility}</Link>
          </nav>
        </div>
        <p className="site-footer__copy">
          © {copyrightYear} GMILA. {t.footer.rights}
        </p>
      </footer>
    )
  }

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <Link to="/" className="brand-title brand-title--small" dir="ltr">
          <span className="brand-title__main">Gmi</span>
          <span className="brand-title__accent">la</span>
        </Link>
        <p className="site-footer__blurb">{t.footer.blurb}</p>
        <nav className="site-footer__links" aria-label={t.nav.aria}>
          <Link to="/centers/">{t.nav.centers}</Link>
          <Link to="/therapists/">{t.nav.therapists}</Link>
          <Link to="/guides/">{guideCopy[lang].nav}</Link>
          <Link to="/articles/">{articleCopy[lang].nav}</Link>
          <Link to="/map/">{t.nav.map}</Link>
          <Link to="/about/">{t.nav.about}</Link>
          <Link to="/contact/">{t.nav.contact}</Link>
        </nav>
        <p className="site-footer__emergency">{t.footer.emergency}</p>
        <nav className="site-footer__legal" aria-label={t.footer.legalLabel}>
          <Link to="/privacy/">{t.footer.privacy}</Link>
          <Link to="/accessibility/">{t.footer.accessibility}</Link>
        </nav>
      </div>
      <p className="site-footer__copy">
        © {copyrightYear} GMILA. {t.footer.rights}
      </p>
    </footer>
  )
}
