import Seo from '../components/Seo.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <>
      <Seo title={t.meta.about} description={t.about.paragraphs[0]} />
      <article className="prose">
        <p className="kicker">{t.about.kicker}</p>
        <h1>{t.about.title}</h1>
        <p className="hero__script">{t.about.script}</p>
        {t.about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p className="site-footer__emergency">{t.footer.emergency}</p>
      </article>
    </>
  )
}
