import Link from './LocaleLink.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'
import { centers } from '../data/centers.ts'
import { therapists } from '../data/therapists.ts'
import { cityFacts } from '../seo/cityFacts.ts'
import { therapistPath } from '../lib/paths.ts'
import type { Lang } from '../i18n/copy.ts'

function cards(count: number, lang: Lang): string {
  if (lang === 'en') return count === 1 ? '1 card' : `${count} cards`
  return count === 1 ? 'כרטיס אחד' : `${count} כרטיסים`
}

function inCards(count: number, lang: Lang): string {
  if (lang === 'en') return count === 1 ? 'on 1 card' : `on ${count} cards`
  return count === 1 ? 'בכרטיס אחד' : `ב-${count} כרטיסים`
}

/** Prices the cards actually published. No range is calculated. */
export default function PublishedPrices() {
  const { lang } = useLanguage()
  const facts = cityFacts(centers)
  const pricedCount = facts.count - facts.unpriced
  const pricedPeople = therapists.filter((person) => person.pricing != null)
  const unpricedPeople = therapists.length - pricedPeople.length
  const publicLine =
    facts.publicCount === 0
      ? lang === 'he'
        ? 'אף כרטיס לא מסומן כמימון ציבורי.'
        : 'No card is marked as publicly funded.'
      : lang === 'he'
        ? `${cards(facts.publicCount, lang)} ${facts.publicCount === 1 ? 'מסומן' : 'מסומנים'} כמימון ציבורי.`
        : `${cards(facts.publicCount, lang)} ${facts.publicCount === 1 ? 'is' : 'are'} marked as publicly funded.`
  const priceLine =
    lang === 'he'
      ? `מחיר פורסם ${inCards(pricedCount, lang)}. השדה ריק ${inCards(facts.unpriced, lang)}.`
      : `A price is published ${inCards(pricedCount, lang)}. The field is empty ${inCards(facts.unpriced, lang)}.`

  return (
    <div className="city-brief">
      <h2>{lang === 'he' ? 'מה שפורסם בכרטיסים' : 'What the cards published'}</h2>
      <p>
        {lang === 'he'
          ? `במדריך ${cards(facts.count, lang)}. ${publicLine} ${priceLine} המשפטים להלן מועתקים כפי שנכתבו. אין כאן מחיר ממוצע.`
          : `The directory has ${cards(facts.count, lang)}. ${publicLine} ${priceLine} The sentences below are copied as written. There is no average price here.`}
      </p>
      {facts.priced.length > 0 ? (
        <ul>
          {facts.priced.map((row) => (
            <li key={row.text.he}>
              {cards(row.count, lang)}: {row.text[lang]}
            </li>
          ))}
        </ul>
      ) : null}
      <h3>{lang === 'he' ? 'מחיר מפגש אצל מטפל' : 'A therapist’s session price'}</h3>
      <p>
        {lang === 'he'
          ? `מחיר מפגש פורסם ${inCards(pricedPeople.length, lang)}. השדה ריק ${inCards(unpricedPeople, lang)}. זה אינו מחיר של מסגרת גמילה.`
          : `A session price is published ${inCards(pricedPeople.length, lang)}. The field is empty ${inCards(unpricedPeople, lang)}. This is not the price of a rehab program.`}
      </p>
      {pricedPeople.length > 0 ? (
        <ul>
          {pricedPeople.map((person) => (
            <li key={person.id}>
              <Link to={therapistPath(person.slug)}>{person.name[lang]}</Link>
              {': '}
              {person.pricing?.[lang]}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
