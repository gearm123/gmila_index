import Link from './LocaleLink.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'

export default function InquiryNotice() {
  const { t } = useLanguage()
  return (
    <p className="inquiry__note">
      {t.form.privacyNote} <Link to="/privacy/">{t.footer.privacy}</Link>
    </p>
  )
}
