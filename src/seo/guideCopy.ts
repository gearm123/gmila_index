import type { Lang } from '../i18n/copy.ts'

export const guideCopy: Record<Lang, { kicker: string; title: string; lede: string; nav: string }> = {
  he: {
    kicker: 'לפי מה שמחפשים',
    title: 'סוגי טיפול, ערים ושאלות',
    lede: 'עמודים לישראל בעברית: גמילה מאלכוהול, מסמים ומהימורים, גמילה רפואית, מרפאה, ועיר. האנגלית של כל עמוד נמצאת תחת /en/.',
    nav: 'מדריכים',
  },
  en: {
    kicker: 'By the search',
    title: 'Treatment types, cities, and questions',
    lede: 'Pages for Israel in Hebrew: alcohol, drug, and gambling rehab, medical detox, clinics, and a city. The English version of each page is under /en/.',
    nav: 'Guides',
  },
}
