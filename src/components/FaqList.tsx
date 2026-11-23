import Link from './LocaleLink.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'
import type { FaqEntry } from '../seo/faqs.ts'

export default function FaqList({ items }: { items: readonly FaqEntry[] }) {
  const { lang } = useLanguage()
  if (items.length === 0) return null
  return (
    <section className="band" aria-labelledby="page-faq">
      <div className="section-head">
        <h2 id="page-faq">{lang === 'he' ? 'שאלות על העמוד הזה' : 'Questions about this page'}</h2>
      </div>
      <div className="faq">
        {items.map((item) => (
          <div key={item.question.he}>
            <h3>{item.question[lang]}</h3>
            <p>
              {item.answer[lang]}
              {item.link ? (
                <>
                  {' '}
                  <Link to={item.link.path}>{item.link.label[lang]}</Link>.
                </>
              ) : null}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
