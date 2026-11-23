import Link from './LocaleLink.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'
import { cityFacts } from '../seo/cityFacts.ts'
import { topicBySlug, topicPath } from '../seo/topics.ts'
import type { Center } from '../types/center.ts'
import type { Lang } from '../i18n/copy.ts'

function cards(count: number, lang: Lang): string {
  if (lang === 'en') return count === 1 ? '1 card' : `${count} cards`
  return count === 1 ? 'כרטיס אחד' : `${count} כרטיסים`
}

function inCards(count: number, lang: Lang): string {
  if (lang === 'en') return count === 1 ? 'on 1 card' : `on ${count} cards`
  return count === 1 ? 'בכרטיס אחד' : `ב-${count} כרטיסים`
}

export default function CityBrief({ place, centers }: { place: string; centers: readonly Center[] }) {
  const { lang, t } = useLanguage()
  const facts = cityFacts(centers)
  const guide = topicBySlug('how-to-choose', 'question')
  const publicLine =
    facts.publicCount === 0
      ? lang === 'he'
        ? 'אף כרטיס לא מסומן כמימון ציבורי.'
        : 'No card is marked as publicly funded.'
      : lang === 'he'
        ? `${cards(facts.publicCount, lang)} ${facts.publicCount === 1 ? 'מסומן' : 'מסומנים'} כמימון ציבורי.`
        : `${cards(facts.publicCount, lang)} ${facts.publicCount === 1 ? 'is' : 'are'} marked as publicly funded.`
  const pricedCount = facts.count - facts.unpriced
  const priceLine =
    facts.priced.length === 0
      ? lang === 'he'
        ? 'אף כרטיס לא מפרסם מחיר. השדה נשאר ריק.'
        : 'No card publishes a price. The field stays empty.'
      : lang === 'he'
        ? `מחיר פורסם ${inCards(pricedCount, lang)}.${facts.unpriced === 0 ? '' : ` השדה ריק ${inCards(facts.unpriced, lang)}.`}`
        : `A price is published ${inCards(pricedCount, lang)}.${facts.unpriced === 0 ? '' : ` The field is empty ${inCards(facts.unpriced, lang)}.`}`

  return (
    <div className="city-brief">
      <h2>{lang === 'he' ? 'כמה מסגרות יש' : 'How many programs'}</h2>
      <p>
        {lang === 'he'
          ? `ב${place} המדריך מפרסם ${facts.count} מסגרות, מכרטיסים שציינו את העיר.`
          : `The directory publishes ${facts.count} programs in ${place}, from cards that named the city.`}
      </p>
      <h2>{lang === 'he' ? 'אילו סוגים יש' : 'What types are here'}</h2>
      <ul>
        {facts.types.map((row) => {
          const topic = topicBySlug(row.group, 'program')
          const label = `${t.program[row.group].title} (${row.count})`
          return <li key={row.group}>{topic ? <Link to={topicPath(topic)}>{label}</Link> : label}</li>
        })}
      </ul>
      {facts.focuses.length > 0 ? (
        <p>
          {lang === 'he' ? 'תחומים שסומנו בכרטיס: ' : 'Focus areas marked on a card: '}
          {facts.focuses.map((focus, index) => {
            const topic = topicBySlug(focus, 'focus')
            const label = t.focus[focus]
            return (
              <span key={focus}>
                {index > 0 ? (lang === 'he' ? ', ' : ', ') : null}
                {topic ? <Link to={topicPath(topic)}>{label}</Link> : label}
              </span>
            )
          })}
          .
        </p>
      ) : null}
      <h2>{lang === 'he' ? 'מחיר ומימון ציבורי' : 'Price and public funding'}</h2>
      <p>{publicLine}</p>
      <p>{priceLine}</p>
      {facts.priced.length > 0 ? (
        <ul>
          {facts.priced.map((row) => (
            <li key={row.text.he}>
              {cards(row.count, lang)}: {row.text[lang]}
            </li>
          ))}
        </ul>
      ) : null}
      <h2>{lang === 'he' ? 'איך לבחור כאן' : 'How to choose here'}</h2>
      <p>
        {lang === 'he'
          ? `הבחירה מתחילה בסוג שקיים ב${place}, אחר כך במימון הציבורי אם הכרטיס מסומן כך, ואז במחיר שפורסם בכרטיס. זו אינה המלצה רפואית.`
          : `Start with a type that exists in ${place}, then public funding if the card is marked that way, then the price the card published. This is not a medical recommendation.`}
      </p>
      {guide ? (
        <p>
          <Link to={topicPath(guide)}>{guide.h1[lang]}</Link>
        </p>
      ) : null}
    </div>
  )
}
