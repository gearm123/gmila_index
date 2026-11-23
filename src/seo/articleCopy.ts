import type { Lang } from '../i18n/copy.ts'

/** The day the guide text was published in this directory. Change the modified date when a guide is revised. */
export const GUIDE_PUBLISHED = '2026-11-23'
export const GUIDE_MODIFIED = '2026-11-23'

export function publishedDateLabel(iso: string, lang: Lang): string {
  const [year, month, day] = iso.split('-').map(Number)
  return new Intl.DateTimeFormat(lang === 'he' ? 'he-IL' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)))
}

export const articleCopy: Record<
  Lang,
  {
    nav: string
    kicker: string
    title: string
    lede: string
    empty: string
    onSite: string
    published: string
    updated: string
    byline: string
    guideBy: string
    guidePublished: string
    guideUpdated: string
  }
> = {
  he: {
    nav: 'מאמרים',
    kicker: 'מהאתר שלהם',
    title: 'מאמרים שפורסמו',
    lede: 'מאמרים שעמוד של מרכז או של מטפל פרסם באתר שלו. הטקסט נשאר שם. מסגרת בלי מאמר פומבי לא מופיעה כאן.',
    empty: 'לכרטיס הזה אין מאמר פומבי ברשימה.',
    onSite: 'למאמר באתר שלהם',
    published: 'פורסם',
    updated: 'עודכן',
    byline: 'חתימה בעמוד',
    guideBy: 'מאת GMILA.',
    guidePublished: 'פורסם',
    guideUpdated: 'עודכן',
  },
  en: {
    nav: 'Articles',
    kicker: 'From their own site',
    title: 'Articles they published',
    lede: 'Articles a center or a therapist published on their own site. The text stays there. A provider with no public article is not listed.',
    empty: 'This card has no public article in the list.',
    onSite: 'Read it on their site',
    published: 'Published',
    updated: 'Updated',
    byline: 'Signed on the page',
    guideBy: 'By GMILA.',
    guidePublished: 'Published',
    guideUpdated: 'Updated',
  },
}
