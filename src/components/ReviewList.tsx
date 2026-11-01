import type { Center, CenterQuote } from '../types/center.ts'
import { useLanguage } from '../context/LanguageContext.tsx'

function publishedNote(center: Center): CenterQuote {
  return {
    quote: center.summary,
    by: {
      he: 'תיאור שפורסם במקור הכרטיס. זו אינה ביקורת של מטופל.',
      en: 'The description published for this card. This is not a patient review.',
    },
    detail: {
      he: `${center.description.he} פיקוח: ${center.supervision.he} ${center.source.he}`,
      en: `${center.description.en} Supervision: ${center.supervision.en} ${center.source.en}`,
    },
    sourceUrl: center.sourceUrl,
  }
}

export default function ReviewList({ center }: { center: Center }) {
  const { lang, t } = useLanguage()
  const items = [...center.quotes, publishedNote(center)]

  return (
    <>
      <h2>{t.detail.quotes}</h2>
      <ul className="quotes">
        {items.map((item, index) => {
          const detail = item.detail?.[lang] ?? (lang === 'he'
            ? `השורה למעלה היא הנוסח שפורסם. ${item.by.he} ${center.source.he}`
            : `The line above is the published wording. ${item.by.en} ${center.source.en}`)
          const href = item.sourceUrl || center.sourceUrl
          return (
            <li key={`${item.by.en}-${index}`}>
              <details className="quote">
                <summary>
                  <blockquote>
                    <p>{item.quote[lang]}</p>
                    <footer>{item.by[lang]}</footer>
                  </blockquote>
                  <span className="quote__more quote__more--open">{t.detail.reviewOpen}</span>
                  <span className="quote__more quote__more--close">{t.detail.reviewClose}</span>
                </summary>
                <div className="quote__detail">
                  <p>{detail}</p>
                  {href ? (
                    <a href={href} target="_blank" rel="noreferrer">
                      {t.detail.source}
                    </a>
                  ) : null}
                </div>
              </details>
            </li>
          )
        })}
      </ul>
    </>
  )
}
