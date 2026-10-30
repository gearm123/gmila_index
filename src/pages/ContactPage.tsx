import InquiryForm from '../components/InquiryForm.tsx'
import Seo from '../components/Seo.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'

export default function ContactPage() {
  const { t } = useLanguage()

  return (
    <>
      <Seo title={t.meta.contact} description={t.contact.lede} />
      <section className="prose prose--contact">
        <p className="kicker">{t.contact.kicker}</p>
        <h1>{t.contact.title}</h1>
        <p className="lede">{t.contact.lede}</p>
        <InquiryForm />
        <p className="site-footer__emergency">{t.footer.emergency}</p>
      </section>
    </>
  )
}
