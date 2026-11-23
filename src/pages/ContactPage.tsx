import Breadcrumbs from '../components/Breadcrumbs.tsx'
import InquiryForm from '../components/InquiryForm.tsx'
import Seo from '../components/Seo.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'
import { breadcrumbJsonLd } from '../seo/breadcrumbs.ts'
import { metaDescription, metaTitle } from '../seo/meta.ts'

export default function ContactPage() {
  const { lang, t } = useLanguage()
  const crumbs = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.contact, path: '/contact/' },
  ]

  return (
    <>
      <Seo
        title={metaTitle(t.contact.title, lang === 'he' ? 'בישראל' : 'in Israel', lang === 'he' ? 'שאלה על המדריך עצמו, לא על מסגרת' : 'a question about this guide')}
        description={metaDescription(
          t.contact.lede,
          lang === 'he' ? 'זה אינו קו חירום. האתר אינו ייעוץ רפואי, והוא מכסה רק מסגרות בישראל.' : 'This is not an emergency line. The site is not medical advice, and it covers programs in Israel only.',
        )}
        path="/contact/"
        jsonLd={breadcrumbJsonLd(crumbs, lang)}
      />
      <section className="prose prose--contact">
        <Breadcrumbs items={crumbs} />
        <p className="kicker">{t.contact.kicker}</p>
        <h1>{t.contact.title}</h1>
        <p className="lede">{t.contact.lede}</p>
        <InquiryForm />
        <p className="site-footer__emergency">{t.footer.emergency}</p>
      </section>
    </>
  )
}
