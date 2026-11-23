import type { Localized } from '../types/center.ts'
import { centers } from './centers.ts'
import { therapists } from './therapists.ts'

export type ProviderArticle = {
  id: string
  provider: { kind: 'center' | 'therapist'; id: string }
  title: Localized
  /** The article’s own address on the provider’s site. */
  url: string
  /** ISO date, only when the page printed a year. */
  published?: string
  modified?: string
  /** The name printed on the article. Absent when the page has no byline. */
  byline?: string
  /** What the page is, in our words. Not the article text. */
  note: Localized
}

/**
 * Articles found on a listed center’s or therapist’s own site.
 * A provider with no public article is not in this list.
 */
export const providerArticles: ProviderArticle[] = [
  {
    id: 'retorno-dry-or-sober',
    provider: { kind: 'center', id: 'retorno' },
    title: {
      he: 'להיות יבש או להיות מפוכח: מה באמת קורה בתהליך הגמילה – חלק 1',
      en: 'Staying dry or staying sober: what happens in rehab, part 1',
    },
    url: 'https://retorno.org.il/%d7%9c%d7%94%d7%99%d7%95%d7%aa-%d7%99%d7%91%d7%a9-%d7%90%d7%95-%d7%9c%d7%94%d7%99%d7%95%d7%aa-%d7%9e%d7%a4%d7%95%d7%9b%d7%97-%d7%9e%d7%94-%d7%91%d7%90%d7%9e%d7%aa-%d7%a7%d7%95%d7%a8%d7%94-2/',
    published: '2026-06-18',
    byline: 'צביקה קליגר',
    note: {
      he: 'מאמר באתר רטורנו מ־18 ביוני 2026. החתימה בעמוד היא צביקה קליגר.',
      en: 'An article on Retorno’s site, dated 18 June 2026. The page is signed צביקה קליגר.',
    },
  },
  {
    id: 'ran-sapir-cannabis',
    provider: { kind: 'therapist', id: 'ran-sapir' },
    title: { he: 'התמכרות לגראס (Weed)', en: 'Cannabis addiction (weed)' },
    url: 'https://www.ransapir.com/post/%D7%94%D7%AA%D7%9E%D7%9B%D7%A8%D7%95%D7%AA-%D7%9C%D7%92%D7%A8%D7%90%D7%A1-weed',
    published: '2023-01-24',
    modified: '2023-07-16',
    note: {
      he: 'מאמר באתר של ד״ר רן ספיר. העמוד מציין פרסום ב־24 בינואר 2023 ועדכון ב־16 ביולי 2023.',
      en: 'An article on Dr. Ran Sapir’s site. The page says it was published on 24 January 2023 and updated on 16 July 2023.',
    },
  },
  {
    id: 'ilan-zomer-cannabis',
    provider: { kind: 'therapist', id: 'ilan-zomer' },
    title: { he: 'איך מגדירים מכור לגראס?', en: 'How is cannabis addiction defined?' },
    url: 'https://www.ilanzomer.co.il/post/%D7%90%D7%99%D7%9A-%D7%9E%D7%92%D7%93%D7%99%D7%A8%D7%99%D7%9D-%D7%9E%D7%9B%D7%95%D7%A8-%D7%9C%D7%92%D7%A8%D7%90%D7%A1',
    published: '2020-02-23',
    note: {
      he: 'מאמר באתר של אילן זומר. העמוד מציין 23 בפברואר 2020.',
      en: 'An article on Ilan Zomer’s site. The page is dated 23 February 2020.',
    },
  },
  {
    id: 'eldar-belonging',
    provider: { kind: 'center', id: 'eldar' },
    title: {
      he: 'התמכרות לסמים ואלכוהול כחיפוש אחר שייכות: איך גיל יצא מהמעגל',
      en: 'Drug and alcohol addiction as a search for belonging',
    },
    url: 'https://www.ofireldar.co.il/post/%D7%94%D7%AA%D7%9E%D7%9B%D7%A8%D7%95%D7%AA-%D7%9C%D7%A1%D7%9E%D7%99%D7%9D-%D7%95%D7%90%D7%9C%D7%9B%D7%95%D7%94%D7%95%D7%9C',
    byline: 'אורית אופיר אלדר',
    note: {
      he: 'מאמר באתר אלדר, בחתימת אורית אופיר אלדר. העמוד מציין 12 בנובמבר בלי שנה.',
      en: 'An article on Eldar’s site, signed אורית אופיר אלדר. The page says 12 November and does not print a year.',
    },
  },
  {
    id: 'tamir-physical-mental',
    provider: { kind: 'therapist', id: 'tamir-institute' },
    title: { he: 'מהי התמכרות נפשית / פסיכולוגית / מנטלית?', en: 'What is psychological addiction?' },
    url: 'https://www.tipulpsychology.co.il/addiction/physical-vs-mental.html',
    note: {
      he: 'עמוד באתר מכון טמיר על ההבדל בין התמכרות גופנית לנפשית. העמוד אינו מציין תאריך.',
      en: 'A page on the Tamir Institute site about physical and psychological addiction. The page does not print a date.',
    },
  },
  {
    id: 'tamir-behavioral',
    provider: { kind: 'therapist', id: 'tamir-institute' },
    title: { he: 'התמכרויות התנהגותיות', en: 'Behavioral addictions' },
    url: 'https://www.tipulpsychology.co.il/addiction/behavioral-addictions.html',
    note: {
      he: 'עמוד באתר מכון טמיר על התמכרויות התנהגותיות. העמוד אינו מציין תאריך.',
      en: 'A page on the Tamir Institute site about behavioral addictions. The page does not print a date.',
    },
  },
  {
    id: 'tamir-methods',
    provider: { kind: 'therapist', id: 'tamir-institute' },
    title: { he: '6 שיטות טיפול מומלצות בהתמכרויות', en: 'Six treatment approaches for addiction' },
    url: 'https://www.tipulpsychology.co.il/addiction/3-theories.html',
    note: {
      he: 'עמוד באתר מכון טמיר על שיטות טיפול. העמוד אינו מציין תאריך.',
      en: 'A page on the Tamir Institute site about treatment approaches. The page does not print a date.',
    },
  },
  {
    id: 'tamir-shopping',
    provider: { kind: 'therapist', id: 'tamir-institute' },
    title: { he: 'התמכרות לקניות', en: 'Shopping addiction' },
    url: 'https://www.tipulpsychology.co.il/addiction/shopping.html',
    note: {
      he: 'עמוד באתר מכון טמיר על התמכרות לקניות. העמוד אינו מציין תאריך.',
      en: 'A page on the Tamir Institute site about shopping addiction. The page does not print a date.',
    },
  },
]

for (const article of providerArticles) {
  const known =
    article.provider.kind === 'center'
      ? centers.some((center) => center.id === article.provider.id)
      : therapists.some((person) => person.id === article.provider.id)
  if (!known) throw new Error(`Article ${article.id} names a provider that is not listed`)
}

export function articlesFor(kind: 'center' | 'therapist', id: string): ProviderArticle[] {
  return providerArticles.filter((article) => article.provider.kind === kind && article.provider.id === id)
}
