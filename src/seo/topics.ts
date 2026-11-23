import { centerIsFilled, locationIsFilled, therapistIsFilled } from './filled.ts'
import { metaDescription, metaTitle } from './meta.ts'
import { centers } from '../data/centers.ts'
import { therapists } from '../data/therapists.ts'
import { programGroup } from '../lib/centers.ts'
import { pagedPaths } from '../lib/pagination.ts'
import { localePath } from '../lib/locale.ts'
import { centerPath, therapistPath } from '../lib/paths.ts'
import type { Center, FocusArea, Localized, ProgramGroup } from '../types/center.ts'
import type { Therapist, TherapyMethod } from '../types/therapist.ts'
import type { Lang } from '../i18n/copy.ts'

export type TopicGroup = 'focus' | 'program' | 'city' | 'therapy' | 'question'

/** The page type those searches already rank: an article, a map of places, or a directory list. */
export type TopicShape = 'article' | 'map' | 'directory'

export type Topic = {
  slug: string
  group: TopicGroup
  title: Localized
  description: Localized
  h1: Localized
  intro: Localized[]
  /** H2 answers under the question H1. List pages leave this empty. */
  sections?: {
    heading: Localized
    paragraphs: Localized[]
    sources?: { href: string; he: string; en: string }[]
  }[]
  cityIds?: string[]
  /** Short place name for a city page, used in the breadcrumb. */
  place?: Localized
  focus?: FocusArea
  kind?: ProgramGroup
  method?: TherapyMethod
  /** Public explainer that already ranks. Linked, not copied. */
  official?: { href: string; he: string; en: string }
}

const focusSeeds: {
  focus: FocusArea
  slug: string
  he: string
  en: string
  introHe: string
  introEn: string
  official?: { href: string; he: string; en: string }
}[] = [
  {
    focus: 'alcohol',
    slug: 'alcohol',
    he: 'גמילה מאלכוהול',
    en: 'Alcohol rehab',
    introHe: 'מסגרות בישראל שהכרטיס שלהן מציין אלכוהול: אשפוזית, קהילה, מרכז יום או מרפאה. זהו קיבוץ של מה שפורסם, לא דירוג של איכות הטיפול.',
    introEn: 'Israeli programs whose card mentions alcohol: a detox ward, a residential stay, a day program, or a clinic. This groups what was published. It is not a ranking of treatment quality.',
    official: {
      href: 'https://me.health.gov.il/mental-health/information-and-updates/addictions/substances-and-alcohol/alcoholism/',
      he: 'התמכרות לאלכוהול, משרד הבריאות',
      en: 'Alcohol addiction, Ministry of Health',
    },
  },
  {
    focus: 'drugs',
    slug: 'drugs',
    he: 'גמילה מסמים',
    en: 'Drug rehab',
    introHe: 'מסגרות בישראל שהכרטיס שלהן מציין סמים. הכתובת, הטלפון ומשך הטיפול מופיעים רק כפי שפורסמו במאגר או באתר המסגרת.',
    introEn: 'Israeli programs whose card mentions drugs. The address, phone, and length of stay appear only as published in a register or on the program’s site.',
    official: {
      href: 'https://me.health.gov.il/mental-health/information-and-updates/addictions/rehab/',
      he: 'גמילה מהתמכרויות, משרד הבריאות',
      en: 'Addiction rehab, Ministry of Health',
    },
  },
  {
    focus: 'gambling',
    slug: 'gambling',
    he: 'גמילה מהימורים',
    en: 'Gambling rehab',
    introHe: 'מסגרות שהכרטיס שלהן מציין הימורים. מרפאה פרטית ומסגרת אשפוזית אינן אותו דבר, וסוג המסגרת כתוב בכל כרטיס.',
    introEn: 'Programs whose card mentions gambling. A private clinic and a hospital ward are not the same thing, and the card says which one it is.',
    official: {
      href: 'https://me.health.gov.il/mental-health/information-and-updates/addictions/compulsive-gambling/',
      he: 'התמכרות להימורים, משרד הבריאות',
      en: 'Gambling addiction, Ministry of Health',
    },
  },
  {
    focus: 'dual',
    slug: 'dual',
    he: 'תחלואה כפולה',
    en: 'Dual diagnosis',
    introHe: 'מסגרות שהכרטיס שלהן מציין תחלואה כפולה: התמכרות יחד עם מצב נפשי. מחלקות בית החולים שמופיעות כאן לקוחות מעמוד משרד הבריאות, עם הטלפון שפורסם שם.',
    introEn: 'Programs whose card mentions dual diagnosis: addiction together with a mental-health condition. Hospital wards listed here come from the Health Ministry page, with the phone published there.',
    official: {
      href: 'https://www.gov.il/he/pages/comorbidity',
      he: 'תחלואה כפולה, משרד הבריאות',
      en: 'Dual diagnosis, Ministry of Health',
    },
  },
  {
    focus: 'youth',
    slug: 'youth',
    he: 'גמילה לנוער',
    en: 'Youth rehab',
    introHe: 'מסגרות שהכרטיס שלהן מציין נוער או צעירים. גיל מדויק מופיע רק אם המקור פרסם אותו.',
    introEn: 'Programs whose card mentions youth or young people. An exact age appears only when the source published one.',
  },
  {
    focus: 'women',
    slug: 'women',
    he: 'גמילה לנשים',
    en: 'Rehab for women',
    introHe: 'מסגרות שהכרטיס שלהן מציין נשים. מסגרת מעורבת שמזכירה גם נשים נשארת ברשימה רק אם המקור ציין זאת.',
    introEn: 'Programs whose card mentions women. A mixed program stays in this list only when the source said so.',
  },
  {
    focus: 'men',
    slug: 'men',
    he: 'גמילה לגברים',
    en: 'Rehab for men',
    introHe: 'מסגרות שהכרטיס שלהן מציין גברים, כולל מחלקה סגורה לגברים כשהעמוד הרשמי כתב זאת.',
    introEn: 'Programs whose card mentions men, including a closed men’s ward when the official page said so.',
  },
  {
    focus: 'religious',
    slug: 'religious',
    he: 'גמילה לציבור דתי',
    en: 'Religious rehab',
    introHe: 'מסגרות שהכרטיס שלהן מציין ציבור דתי או חרדי. פרטי אורח החיים מופיעים רק כפי שפורסמו.',
    introEn: 'Programs whose card mentions a religious or Haredi setting. Details of daily life appear only as published.',
  },
  {
    focus: 'family',
    slug: 'family',
    he: 'טיפול שכולל משפחה',
    en: 'Programs that include family',
    introHe: 'מסגרות שהכרטיס שלהן מציין משפחה, הורים או בני זוג כחלק מהטיפול. זו אינה רשימת מטפלים זוגיים.',
    introEn: 'Programs whose card mentions family, parents, or a partner as part of the care. This is not a directory of couples therapists.',
  },
]

const programSeeds: { kind: ProgramGroup; slug: string; he: string; en: string; textHe: string; textEn: string }[] = [
  {
    kind: 'detox',
    slug: 'detox',
    he: 'גמילה רפואית קצרה',
    en: 'Short medical detox',
    textHe: 'אשפוזית של שבועות, או קליטת חירום, לפי מה שכתוב בכרטיס. זו אינה קהילה של כמה חודשים.',
    textEn: 'A ward of weeks, or an emergency admission, as the card describes it. This is not a community stay of several months.',
  },
  {
    kind: 'months',
    slug: 'months',
    he: 'גמילה של כמה חודשים',
    en: 'Rehab of several months',
    textHe: 'פנימייה או קהילה טיפולית. משך מדויק מופיע בכרטיס רק אם המקור פרסם אותו.',
    textEn: 'A residential stay or a therapeutic community. An exact length appears on the card only when the source published it.',
  },
  {
    kind: 'day',
    slug: 'day',
    he: 'מרכז יום לגמילה',
    en: 'Day programs',
    textHe: 'מגיעים ביום וחוזרים הביתה, בלי לינה. מרכזי יום עירוניים בלי כתובת במאגר אינם מופיעים כאן.',
    textEn: 'People come during the day and go home, without staying overnight. Municipal day centers with no address in the register are not listed here.',
  },
  {
    kind: 'clinic',
    slug: 'clinic',
    he: 'מרפאות להתמכרויות',
    en: 'Addiction clinics',
    textHe: 'טיפול בלי לינה: קופות חולים, מרפאות אמבולטוריות ומכונים. זה אינו אשפוז.',
    textEn: 'Care without an overnight stay: health-fund clinics, outpatient clinics, and institutes. This is not a hospital admission.',
  },
]

const therapySeeds: { method: TherapyMethod; slug: string; he: string; en: string; textHe: string; textEn: string }[] = [
  {
    method: 'cbt',
    slug: 'cbt',
    he: 'טיפול CBT בהתמכרויות',
    en: 'CBT for addiction',
    textHe: 'מטפלים שאתר שלהם מפרסם CBT או גישה קוגניטיבית־התנהגותית להתמכרויות. זו רשימה של מה שפורסם, לא דירוג.',
    textEn: 'Therapists whose own site publishes CBT or a cognitive-behavioral approach for addiction. This lists what was published. It is not a ranking.',
  },
  {
    method: 'dynamic',
    slug: 'dynamic',
    he: 'טיפול דינמי בהתמכרויות',
    en: 'Dynamic therapy for addiction',
    textHe: 'מטפלים שאתר שלהם מפרסם טיפול דינמי בהתמכרויות. שיטה שלא פורסמה באתר לא נכנסת לעמוד.',
    textEn: 'Therapists whose own site publishes dynamic therapy for addiction. A method that was not published on the site is not on this page.',
  },
]

const WARD_PAGE = {
  href: 'https://me.health.gov.il/mental-health/therapy-rehabilitation/public-care/addiction-treatment/rehab-centers/',
  he: 'גמילה באשפוזיות, משרד הבריאות',
  en: 'Detox wards, Ministry of Health',
}
const REHAB_PAGE = {
  href: 'https://me.health.gov.il/mental-health/information-and-updates/addictions/rehab/',
  he: 'גמילה מהתמכרויות, משרד הבריאות',
  en: 'Addiction rehab, Ministry of Health',
}
const AFTER_PAGE = {
  href: 'https://me.health.gov.il/mental-health/therapy-rehabilitation/public-care/addiction-treatment/rehabilitation-after-detox/',
  he: 'שיקום לאחר גמילה, משרד הבריאות',
  en: 'Rehab after detox, Ministry of Health',
}
const DUAL_PAGE = {
  href: 'https://www.gov.il/he/pages/comorbidity',
  he: 'תחלואה כפולה, משרד הבריאות',
  en: 'Dual diagnosis, Ministry of Health',
}

const questions: Topic[] = [
  {
    slug: 'how-to-choose',
    group: 'question',
    h1: { he: 'איך לבחור מסגרת גמילה בישראל', en: 'How to choose a rehab program in Israel' },
    title: {
      he: metaTitle('איך לבחור מסגרת גמילה בישראל', '', 'משך, סוג, מסגרת ומקור'),
      en: metaTitle('How to choose a rehab program in Israel', '', 'length, type, and what was published'),
    },
    description: {
      he: metaDescription(
        'איך לבחור מסגרת גמילה בישראל: קודם משך השהייה, אחר כך סוג ההתמכרות, ורק מה שפורסם בכרטיס.',
        'האתר לא קובע תור ולא מדרג איכות רפואית. זה אינו קו חירום.',
      ),
      en: metaDescription(
        'How to choose a rehab program in Israel: start with the length of stay, then the addiction, and only what the card published.',
        'This site does not book a place and does not rank medical quality.',
      ),
    },
    intro: [
      {
        he: 'הבחירה מתחילה במשך השהייה ובמה שהכרטיס באמת פרסם. מחיר, גמילה גופנית, עזרה לבן משפחה ושיטת טיפול יושבים בעמודי שאלה נפרדים.',
        en: 'The choice starts with the length of stay and with what the card actually published. Price, physical detox, help for a family member, and a therapy method each have their own question page.',
      },
    ],
    sections: [
      {
        heading: { he: 'קודם משך השהייה', en: 'Start with the length of stay' },
        paragraphs: [
          {
            he: 'גמילה רפואית קצרה, שהייה של כמה חודשים, מרכז יום ומרפאה הם מסלולים שונים. לכל אחד יש עמוד משלו.',
            en: 'A short medical detox, a stay of several months, a day program, and a clinic are different paths. Each has its own page.',
          },
        ],
      },
      {
        heading: { he: 'אחר כך סוג ההתמכרות', en: 'Then the kind of addiction' },
        paragraphs: [
          {
            he: 'בודקים התאמה: סמים, אלכוהול, הימורים, נוער, נשים, תחלואה כפולה, מסגרת דתית, או מעורבות של המשפחה. השדה מופיע רק אם המקור פרסם אותו.',
            en: 'Check the fit: drugs, alcohol, gambling, youth, women, dual diagnosis, a religious setting, or family involvement. A field appears only when the source published it.',
          },
        ],
      },
      {
        heading: { he: 'מה כתוב בכרטיס', en: 'What the card says' },
        paragraphs: [
          {
            he: 'בכרטיס כתוב מאיפה הגיע המידע. אם כתוב שהמקור לא פרסם נתון, אין לנו עובדה להשלים. דירוג גוגל מופיע רק כשנמצא כרטיס תואם.',
            en: 'The card says where the facts came from. When it says the source did not publish a fact, there is nothing for us to fill in. A Google rating appears only when a matching listing was found.',
          },
        ],
      },
      {
        heading: { he: 'מה האתר לא עושה', en: 'What this site does not do' },
        paragraphs: [
          {
            he: 'האתר לא קובע תור ולא מדרג איכות רפואית. מתקשרים למסגרת עצמה. זה אינו קו חירום ואינו ייעוץ רפואי.',
            en: 'This site does not book a place and does not rank medical quality. Call the program itself. This is not an emergency line and not medical advice.',
          },
        ],
      },
    ],
  },
  {
    slug: 'inpatient-vs-outpatient',
    group: 'question',
    h1: { he: 'אשפוזית או קהילה טיפולית', en: 'A detox ward or a therapeutic community' },
    title: {
      he: metaTitle('אשפוזית או קהילה טיפולית', 'בישראל', 'ההבדל בין המסלולים'),
      en: metaTitle('A detox ward or a therapeutic community', 'in Israel', 'how the paths differ'),
    },
    description: {
      he: metaDescription(
        'אשפוזית או קהילה טיפולית בישראל: איך להבדיל בין אשפוזית, קהילה, מרכז יום ומרפאה.',
        'מה שקורה בגמילה הגופנית, ומה פורסם על מחיר, יושבים בעמודים אחרים.',
      ),
      en: metaDescription(
        'A detox ward or a therapeutic community in Israel: how a ward, a community, a day program, and a clinic differ.',
      ),
    },
    intro: [
      {
        he: 'אשפוזית, קהילה טיפולית, מרכז יום ומרפאה הם מסלולים שונים. העמוד מפריד ביניהם. הוא אינו בוחר מסלול במקום הקורא.',
        en: 'A detox ward, a therapeutic community, a day program, and a clinic are different paths. This page separates them. It does not pick a path for the reader.',
      },
    ],
    sections: [
      {
        heading: { he: 'אשפוזית', en: 'A detox ward' },
        paragraphs: [
          {
            he: 'אשפוזית גמילה רפואית במאגר משרד הבריאות מוצגת כאן כגמילה קצרה. עמוד התחלואה הכפולה של המשרד מתאר גמילה גופנית של עשרה ימים עד שלושה שבועות במחלקות שמופיעות אצלו. עמוד האשפוזיות של המשרד כותב עד שלושה שבועות למבוגרים ועד שלושה חודשים לנוער.',
            en: 'A medical detox ward from the Health Ministry register is shown here as short detox. The ministry’s dual-diagnosis page describes physical detox of ten days to three weeks in the wards it lists. The ministry’s detox-ward page says up to three weeks for adults and up to three months for youth.',
          },
        ],
        sources: [DUAL_PAGE, WARD_PAGE],
      },
      {
        heading: { he: 'קהילה של כמה חודשים', en: 'A community of several months' },
        paragraphs: [
          {
            he: 'קהילה או פנימייה של כמה חודשים היא מסלול אחר. משך מדויק נכתב בכרטיס רק אם פורסם. עמוד השיקום של המשרד מתאר קהילה טיפולית כמגורים עם סדר יום, למספר חודשים ועד שנה ויותר.',
            en: 'A community or residential program of several months is a different path. An exact length is written on the card only when it was published. The ministry’s after-detox page describes a therapeutic community as a residential stay with a set daily routine, from several months to a year or more.',
          },
        ],
        sources: [AFTER_PAGE],
      },
      {
        heading: { he: 'מרכז יום ומרפאה', en: 'A day program and a clinic' },
        paragraphs: [
          {
            he: 'מרכז יום הוא בלי לינה. מרפאה היא טיפול בלי שהייה, כולל מרפאות של קופות החולים. מה שקורה בתוך הגמילה הגופנית, ומה פורסם על מחיר, יושבים בעמודי השאלות שלהם.',
            en: 'A day program has no overnight stay. A clinic is care without a stay, including health-fund clinics. What happens during physical detox, and what was published about price, sit on their own question pages.',
          },
        ],
      },
    ],
  },
  {
    slug: 'what-detox-involves',
    group: 'question',
    h1: { he: 'מה כוללת גמילה גופנית', en: 'What physical detox involves' },
    title: {
      he: metaTitle('מה כוללת גמילה גופנית', 'בישראל', 'פיקוח, משך והמשך'),
      en: metaTitle('What physical detox involves', 'in Israel', 'supervision, length, next step'),
    },
    description: {
      he: metaDescription(
        'מה כוללת גמילה גופנית בישראל: לינה ופיקוח רפואי, לפי עמוד האשפוזיות של משרד הבריאות. הרשימה הקצרה בעמוד נפרד.',
      ),
      en: metaDescription(
        'What physical detox involves in Israel, from the Ministry of Health detox-ward page: an overnight stay, medical supervision, and a length by age.',
        'The short medical-detox list sits on its own page. This is not a medical recommendation.',
      ),
    },
    intro: [
      {
        he: 'גמילה גופנית היא השלב הראשון שעמוד משרד הבריאות מתאר, לא שהייה של כמה חודשים. כרטיס נכנס לרשימת הגמילה הקצרה רק כשהכרטיס עצמו הוא אשפוזית או קליטת חירום.',
        en: 'Physical detox is the first stage the Ministry of Health page describes, not a stay of several months. A card joins the short-detox list only when that card itself is a detox ward or an emergency admission.',
      },
    ],
    sections: [
      {
        heading: { he: 'מה קורה באשפוזית', en: 'What happens on a ward' },
        paragraphs: [
          {
            he: 'עמוד האשפוזיות מתאר יחידה עם לינה לגמילה גופנית מסמים או מחומרים פסיכו־אקטיביים אחרים, תחת פיקוח רפואי. הוא מונה רופא נרקולוג, צוות אחיות, מדריכים נקיים, עובדים סוציאליים ומטפלים משלימים. הניסוח הזה הוא של העמוד, לא תיאור של כל כרטיס במדריך.',
            en: 'The detox-ward page describes an overnight unit for physical detox from drugs or other psychoactive substances, under medical supervision. It names a narcologist, a nursing team, guides in recovery, social workers, and complementary therapists. That wording is the page’s, not a description of every card in this directory.',
          },
        ],
        sources: [WARD_PAGE],
      },
      {
        heading: { he: 'כמה זמן זה נמשך', en: 'How long it lasts' },
        paragraphs: [
          {
            he: 'אותו עמוד כותב שהמשך משתנה לפי הגיל: עד שלושה שבועות למבוגרים, ועד שלושה חודשים לנוער ולצעירים. משך של מסגרת מסוימת נכתב בכרטיס רק אם המקור שלה פרסם אותו.',
            en: 'The same page says the length changes by age: up to three weeks for adults, and up to three months for youth and young people. A specific program’s length is written on the card only when its source published one.',
          },
        ],
        sources: [WARD_PAGE],
      },
      {
        heading: { he: 'מתי מטפלים במרפאה', en: 'When care is in a clinic' },
        paragraphs: [
          {
            he: 'עמוד הגמילה של המשרד כותב שאפשר לקיים גמילה גם במרפאה, במקרים קלים עד בינוניים, כשיש שיתוף פעולה של האדם. התמכרויות התנהגותיות, כמו הימורים, מתוארות שם כטיפול בעיקר במרפאה.',
            en: 'The ministry’s rehab page says detox can also happen in a clinic, in mild to moderate cases, when the person cooperates. Behavioral addictions, such as gambling, are described there as care that is mainly in a clinic.',
          },
        ],
        sources: [REHAB_PAGE],
      },
      {
        heading: { he: 'מה אחרי השחרור', en: 'What follows discharge' },
        paragraphs: [
          {
            he: 'עמוד האשפוזיות כותב שגמילה גופנית בלי המשך טיפול אינה מספיקה, ומפנה להמשך בקהילה מיד אחרי השחרור. הרשימות של קהילה, מרכז יום ומרפאה נמצאות בעמודים שלהן.',
            en: 'The detox-ward page says physical detox without continued care is not enough, and it points to community care straight after discharge. The community, day-program, and clinic lists are on their own pages.',
          },
        ],
        sources: [WARD_PAGE],
      },
    ],
  },
  {
    slug: 'rehab-costs',
    group: 'question',
    h1: { he: 'כמה עולה גמילה בישראל', en: 'What rehab costs in Israel' },
    title: {
      he: metaTitle('כמה עולה גמילה בישראל', '', 'מה שפורסם בכרטיס, בלי טווח'),
      en: metaTitle('What rehab costs in Israel', '', 'only a published price'),
    },
    description: {
      he: metaDescription(
        'כמה עולה גמילה בישראל: אין כאן טווח שחושב. מופיע משפט של משרד הבריאות, או משפט שפורסם בכרטיס.',
        'שדה ריק נשאר ריק. זו אינה המלצה רפואית.',
      ),
      en: metaDescription(
        'What rehab costs in Israel: there is no range calculated here. A published sentence is kept as written, and an empty field stays empty.',
      ),
    },
    intro: [
      {
        he: 'אין למדריך מחיר אחד, ואין טווח שחושב מתוך הכרטיסים. מופיע רק משפט שמשרד הבריאות פרסם, או משפט שפורסם בכרטיס של מסגרת.',
        en: 'This directory has no single price, and no range calculated from the cards. Only a sentence the Ministry of Health published appears, or a sentence published on a program’s card.',
      },
    ],
    sections: [
      {
        heading: { he: 'אשפוזית ציבורית ופרטית', en: 'A public ward and a private one' },
        paragraphs: [
          {
            he: 'עמוד האשפוזיות כותב שהטיפול במסגרות הציבוריות ממומן על ידי משרד הבריאות, ללא עלות וללא השתתפות עצמית, וכלול בסל הבריאות. אותו עמוד כותב שהעלות במסגרות פרטיות מגיעה לעשרות אלפי שקלים בחודש. זה משפט של המשרד על מסגרות פרטיות באופן כללי, לא מחיר של מרכז מסוים במדריך.',
            en: 'The detox-ward page says treatment in the public settings is funded by the Ministry of Health, with no charge and no copay, and is included in the health basket. The same page says the cost in private settings reaches tens of thousands of shekels a month. That is the ministry’s sentence about private settings in general, not the price of a named center in this directory.',
          },
        ],
        sources: [WARD_PAGE],
      },
      {
        heading: { he: 'קהילה, הוסטל ומרכז יום', en: 'A community, a hostel, and a day center' },
        paragraphs: [
          {
            he: 'עמוד השיקום כותב שהשתתפות עצמית בקהילה טיפולית נקבעת באופן פרטני על ידי משרד הרווחה, בלי סכום אחד. הוא מציין, נכון לשנת 2025, 50 ש״ח לחודש ביחידה להתמכרויות של הרווחה (עד שנתיים), 50 ש״ח לחודש בהוסטל שאחרי קהילה, ו־50 ש״ח לחודש במרכז יום למבוגרים מעל גיל 18. לבני נוער במרכז יום העמוד כותב שאין השתתפות עצמית.',
            en: 'The after-detox page says the copay in a therapeutic community is set individually by the Welfare Ministry, with no single amount. As of 2025 it states 50 NIS a month in a welfare addiction unit (up to two years), 50 NIS a month in a hostel after a community, and 50 NIS a month in a day center for adults over 18. For youth in a day center, the page says there is no copay.',
          },
        ],
        sources: [AFTER_PAGE],
      },
    ],
  },
  {
    slug: 'help-a-family-member',
    group: 'question',
    h1: { he: 'איך לעזור לבן משפחה בהתמכרות', en: 'How to help a family member with addiction' },
    title: {
      he: metaTitle('איך לעזור לבן משפחה בהתמכרות', 'בישראל', 'רווחה ומסגרת'),
      en: metaTitle('How to help a family member with addiction', '', 'welfare, and a program'),
    },
    description: {
      he: metaDescription(
        'איך לעזור לבן משפחה בהתמכרות בישראל: פנייה לרווחה או לרופא, לפי משרד הבריאות. רשימת המשפחה בעמוד נפרד. זה אינו ייעוץ.',
      ),
      en: metaDescription(
        'How to help a family member with addiction in Israel: contact welfare or a doctor, as the ministry page says. This is not advice.',
      ),
    },
    intro: [
      {
        he: 'העמוד מתאר פנייה ראשונה, לפי מה שמשרד הבריאות מפרסם. הוא אינו תוכנית טיפול ביתית, אינו טיפול זוגי, ואינו קו חירום.',
        en: 'This page describes a first contact, from what the Ministry of Health publishes. It is not a home-treatment plan, not couples therapy, and not an emergency line.',
      },
    ],
    sections: [
      {
        heading: { he: 'פנייה לרווחה או לרופא', en: 'Contact welfare or a doctor' },
        paragraphs: [
          {
            he: 'עמוד האשפוזיות כותב שבן משפחה יכול לפנות ליחידה להתמכרויות במחלקת הרווחה המקומית. העובד הסוציאלי מכוון לבדיקות, עוזר במסמכים ומפנה למסגרת. אותו עמוד כותב שאפשר גם לקבל הפניה מרופא בקופת החולים.',
            en: 'The detox-ward page says a family member can contact the addiction unit in the local welfare department. The social worker directs the tests, helps with the papers, and refers to a program. The same page says a referral can also come from a doctor at the health fund.',
          },
        ],
        sources: [WARD_PAGE],
      },
      {
        heading: { he: 'מתי המשפחה נכנסת לתוכנית', en: 'When family joins the plan' },
        paragraphs: [
          {
            he: 'עמוד הגמילה של המשרד כותב שאם יש משפחה תומכת, רצוי לשלב אותה בתוכנית. זה תיאור של העמוד, לא הוראה לטיפול בבית.',
            en: 'The ministry’s rehab page says that when there is a supportive family, it is worth including them in the plan. That is the page’s description, not an instruction to treat someone at home.',
          },
        ],
        sources: [REHAB_PAGE],
      },
      {
        heading: { he: 'מסגרות שמציינות משפחה', en: 'Programs that mention family' },
        paragraphs: [
          {
            he: 'הרשימה במדריך כוללת רק מסגרת שהכרטיס שלה מציין משפחה, הורים או בני זוג כחלק מהטיפול. זו אינה רשימת מטפלים זוגיים.',
            en: 'The list in this directory includes only a program whose card mentions family, parents, or a partner as part of the care. It is not a list of couples therapists.',
          },
        ],
      },
    ],
  },
  {
    slug: 'therapy-types',
    group: 'question',
    h1: { he: 'שיטות טיפול בהתמכרויות', en: 'Therapy methods for addiction' },
    title: {
      he: metaTitle('שיטות טיפול בהתמכרויות', 'בישראל', 'רק שיטה שפורסמה'),
      en: metaTitle('Therapy methods for addiction', 'in Israel', 'on a site'),
    },
    description: {
      he: metaDescription(
        'שיטות טיפול בהתמכרויות בישראל: עמוד נפתח רק כשלפחות שני מטפלים פרסמו את השיטה. CBT וטיפול דינמי עומדים בסף.',
      ),
      en: metaDescription(
        'Therapy methods for addiction in Israel: a page opens only when at least two therapists published that method on their own site.',
      ),
    },
    intro: [
      {
        he: 'שיטה מקבלת עמוד רק אם לפחות שני אתרים של מטפלים פרסמו אותה. שיטה שמופיעה באתר אחד נשארת בכרטיס של אותו מטפל.',
        en: 'A method gets a page only when at least two therapists’ sites published it. A method that appears on one site stays on that therapist’s card.',
      },
    ],
    sections: [
      {
        heading: { he: 'מה עמוד המשרד מונה', en: 'What the ministry page names' },
        paragraphs: [
          {
            he: 'עמוד הגמילה של המשרד כותב שטיפול במרפאה כולל פסיכותרפיה, ומונה טיפול מוטיבציוני, טיפול קוגניטיבי־התנהגותי וטיפול בטראומה, וגם תרופות שמפחיתות כמיהה. זו הרשימה של העמוד. היא אינה דירוג, והיא אינה זהה לרשימת העמודים במדריך.',
            en: 'The ministry’s rehab page says clinic care includes psychotherapy, and it names motivational treatment, cognitive-behavioral therapy, and trauma treatment, plus medication that reduces craving. That is the page’s list. It is not a ranking, and it is not the same as the list of pages in this directory.',
          },
        ],
        sources: [REHAB_PAGE],
      },
      {
        heading: { he: 'אילו שיטות קיבלו עמוד', en: 'Which methods have a page' },
        paragraphs: [
          {
            he: 'CBT וטיפול דינמי קיבלו עמוד, כי לפחות שני מטפלים פרסמו את השיטה באתר שלהם. כל שם ברשימה מוביל לכרטיס. זו אינה המלצה על שיטה.',
            en: 'CBT and dynamic therapy have a page, because at least two therapists published the method on their own site. Each name on the list leads to a card. This is not a recommendation of a method.',
          },
        ],
      },
      {
        heading: { he: 'שיטה שפורסמה פעם אחת', en: 'A method published once' },
        paragraphs: [
          {
            he: 'EMDR וראיון מוטיבציוני מופיעים בעמוד של מכון טמיר, ולכן אין להם עמוד נפרד. שיטה שלא פורסמה באתר של מטפל לא נכנסת למדריך.',
            en: 'EMDR and motivational interviewing appear on the Tamir Institute page, so they have no separate page. A method that was not published on a therapist’s site is not in the directory.',
          },
        ],
      },
    ],
  },
  {
    slug: 'what-we-cover',
    group: 'question',
    h1: { he: 'מה המדריך מכסה', en: 'What this directory covers' },
    title: {
      he: metaTitle('מה המדריך מכסה', 'בישראל', 'סמים, אלכוהול, עיר ומסגרת'),
      en: metaTitle('What this directory covers', 'in Israel', 'drugs, care, city'),
    },
    description: {
      he: metaDescription(
        'מה המדריך מכסה בישראל: סמים, אלכוהול, הימורים, תחלואה כפולה, עיר, וסוג המסגרת, כשהכרטיס מציין זאת.',
        'עברית בכתובת /he/ ואנגלית בכתובת /en/. אין מרכזים מחוץ לישראל.',
      ),
      en: metaDescription(
        'What this directory covers in Israel: drugs, alcohol, gambling, dual diagnosis, a city, and the setting, when the card says so.',
        'Hebrew is at /he/ and English at /en/. No centers outside Israel.',
      ),
    },
    intro: [
      {
        he: 'המדריך הוא לישראל. עברית נמצאת תחת /he/ ואנגלית תחת /en/, וכל עמוד מצביע על השפה השנייה.',
        en: 'The directory is for Israel. Hebrew lives under /he/ and English under /en/, and each page points at the other language.',
      },
      {
        he: 'העמודים מכסים התמכרות לסמים, לאלכוהול ולהימורים, תחלואה כפולה, נוער, נשים, גברים, מסגרת דתית ומעורבות של משפחה, כשהכרטיס מציין זאת. לצד זה יש חלוקה לגמילה רפואית קצרה, שהייה של כמה חודשים, מרכז יום ומרפאה.',
        en: 'The pages cover addiction to drugs, alcohol, and gambling, dual diagnosis, youth, women, men, a religious setting, and family involvement, when the card says so. Beside that, programs are split into short medical detox, a stay of several months, a day program, and a clinic.',
      },
      {
        he: 'עמוד CBT ועמוד טיפול דינמי כוללים רק מטפלים שאתר שלהם מפרסם את השיטה, וכל שם מוביל לכרטיס. אין עמוד לטיפול זוגי, כי אין רשימה של מטפלים שזה התחום שפורסם אצלם.',
        en: 'The CBT page and the dynamic-therapy page list only therapists whose own site publishes that method, and each name links to that card. There is no couples-therapy page, because there is no list of therapists who published that as their field.',
      },
      {
        he: 'עמוד עיר נפתח רק כשפורסמו לפחות ארבע מסגרות באותה עיר. עיר עם פחות מזה נשארת בכרטיסים, בלי עמוד משלה.',
        en: 'A city page opens only when at least four programs were published in that city. A city with fewer stays on the cards, without a page of its own.',
      },
      {
        he: 'לשונית המטפלים כוללת רק מי שאתר שלו מפרסם טיפול בהתמכרויות וטלפון. דומיין ציבורי מתאים לסיומת co.il, כי הקהל והמקורות הם בישראל. כתובת ההשקה היא הכתובת הקנונית של העמודים.',
        en: 'The therapists tab includes only people whose own site publishes addiction treatment and a phone. A public domain fits a .co.il ending, because the audience and the sources are in Israel. The launch address is the canonical address of these pages.',
      },
      {
        he: 'לשאלות יש עמודים נפרדים: איך לבחור מסגרת, אשפוזית או קהילה, מה כוללת גמילה גופנית, כמה עולה גמילה, איך לעזור לבן משפחה, ואילו שיטות טיפול פורסמו.',
        en: 'Questions have their own pages: how to choose a program, a ward or a community, what physical detox involves, what rehab costs, how to help a family member, and which therapy methods were published.',
      },
    ],
  },
]

function focusTopics(): Topic[] {
  return focusSeeds.map((seed) => ({
    slug: seed.slug,
    group: 'focus' as const,
    focus: seed.focus,
    h1: { he: `${seed.he} בישראל`, en: `${seed.en} in Israel` },
    title: {
      he: metaTitle(`${seed.he} בישראל`, '', 'מסגרות שפורסמו במדריך הפתוח'),
      en: metaTitle(`${seed.en} in Israel`, '', 'programs listed here now'),
    },
    description: {
      he: metaDescription(seed.introHe, 'הכתובת והטלפון מופיעים רק אם המקור פרסם אותם. זו אינה המלצה רפואית.'),
      en: metaDescription(seed.introEn, 'The address and phone appear only when the source published them. This is not a medical recommendation.'),
    },
    intro: [{ he: seed.introHe, en: seed.introEn }],
    official: seed.official,
  }))
}

function therapyTopics(): Topic[] {
  const taken = new Set(therapists.map((person) => person.slug))
  return therapySeeds.map((seed) => {
    if (taken.has(seed.slug)) throw new Error(`Therapy page /therapists/${seed.slug}/ uses a therapist address`)
    return {
      slug: seed.slug,
      group: 'therapy' as const,
      method: seed.method,
      h1: { he: `${seed.he} בישראל`, en: `${seed.en} in Israel` },
      title: {
        he: metaTitle(`${seed.he} בישראל`, '', 'מטפלים שפרסמו את השיטה באתר'),
        en: metaTitle(`${seed.en} in Israel`, '', 'from their own site'),
      },
      description: {
        he: metaDescription(seed.textHe, 'הרשימה כוללת רק מי שפרסם את השיטה. זו אינה המלצה רפואית, ושדה ריק נשאר ריק.'),
        en: metaDescription(seed.textEn, 'The list includes only people who published the method. This is not a medical recommendation, and an empty field stays empty.'),
      },
      intro: [{ he: seed.textHe, en: seed.textEn }],
    }
  })
}

function programTopics(): Topic[] {
  return programSeeds.map((seed) => ({
    slug: seed.slug,
    group: 'program' as const,
    kind: seed.kind,
    h1: { he: `${seed.he} בישראל`, en: `${seed.en} in Israel` },
    title: {
      he: metaTitle(`${seed.he} בישראל`, '', 'מסגרות מהסוג הזה במדריך הזה'),
      en: metaTitle(`${seed.en} in Israel`, '', 'programs of this type, as published'),
    },
    description: {
      he: metaDescription(seed.textHe, 'הכתובת והטלפון מופיעים רק אם המקור פרסם אותם. שדה ריק נשאר ריק. זו אינה המלצה רפואית.'),
      en: metaDescription(seed.textEn, 'The address and phone appear only when the source published them. An empty field stays empty. This is not a medical recommendation.'),
    },
    intro: [{ he: seed.textHe, en: seed.textEn }],
  }))
}

function cityTopics(): Topic[] {
  const merged = new Set(['tel-aviv', 'tel-aviv-yafo'])
  const counts = new Map<string, { he: string; en: string; ids: string[] }>()
  for (const center of centers) {
    const id = merged.has(center.cityId) ? 'tel-aviv' : center.cityId
    const he = id === 'tel-aviv' ? 'תל אביב' : center.city.he
    const en = id === 'tel-aviv' ? 'Tel Aviv' : center.city.en
    const row = counts.get(id) ?? { he, en, ids: [] }
    if (!row.ids.includes(center.cityId)) row.ids.push(center.cityId)
    counts.set(id, row)
  }
  return [...counts.entries()]
    .filter(([, row]) => centers.filter((center) => row.ids.includes(center.cityId)).length >= 4)
    .map(([slug, row]) => ({
      slug,
      group: 'city' as const,
      cityIds: row.ids,
      place: { he: row.he, en: row.en },
      h1: { he: `מרכזי גמילה ב${row.he}`, en: `Rehab centers in ${row.en}` },
      title: {
        he: metaTitle(`מרכזי גמילה ב${row.he}`, '', 'כתובות, טלפונים, פרטים ומקור'),
        en: metaTitle(`Rehab centers in ${row.en}`, '', 'addresses, phones, info'),
      },
      description: {
        he: metaDescription(
          `מרכזי גמילה ב${row.he}: ${centers.filter((center) => row.ids.includes(center.cityId)).length} מסגרות שפורסמו, עם הסוג והמחיר שבכרטיס.`,
          'מימון ציבורי מופיע רק כשהכרטיס מסומן כך. שדה ריק נשאר ריק.',
        ),
        en: metaDescription(
          `Rehab centers in ${row.en}: ${centers.filter((center) => row.ids.includes(center.cityId)).length} published programs, with the type and price on the card.`,
          'Public funding appears only when the card is marked that way. An empty field stays empty.',
        ),
      },
      intro: [
        {
          he: `מסגרות גמילה שפורסמו ב${row.he}, לפי מאגר משרד הבריאות או לפי אתר המסגרת. דירוג גוגל מופיע רק כשהכרטיס תואם.`,
          en: `Rehab programs published in ${row.en}, from the Health Ministry register or from the program’s own site. A Google rating appears only when the listing matches.`,
        },
      ],
    }))
    .sort((a, b) => a.h1.he.localeCompare(b.h1.he, 'he'))
}

let cached: Topic[] | null = null

/** One dimension only: a city, an addiction, a program length, or a therapy method. Not a cross-filter. */
function publishesAlone(topic: Topic): boolean {
  const dimensions =
    Number(Boolean(topic.cityIds?.length)) +
    Number(Boolean(topic.focus)) +
    Number(Boolean(topic.kind)) +
    Number(Boolean(topic.method))
  if (topic.group === 'question') return dimensions === 0
  return dimensions === 1
}

export function allTopics(): Topic[] {
  if (cached) return cached
  const inventory = [...focusTopics(), ...programTopics(), ...cityTopics()].filter((topic) => {
    if (!publishesAlone(topic)) return false
    const count = centersForTopic(topic).length
    if (topic.group === 'program') return count >= 2
    return count >= 3
  })
  const methods = therapyTopics().filter((topic) => publishesAlone(topic) && therapistsForTopic(topic).length >= 2)
  cached = [...inventory, ...methods, ...questions.filter(publishesAlone)]
  return cached
}

export function centersForTopic(topic: Topic): Center[] {
  if (topic.group === 'question' || topic.group === 'therapy') return []
  return centers.filter((center) => {
    if (topic.cityIds && !topic.cityIds.includes(center.cityId)) return false
    if (topic.focus && !center.focus.includes(topic.focus)) return false
    if (topic.kind && programGroup(center) !== topic.kind) return false
    return true
  })
}

/** Therapists whose own site named this addiction, this city, or this method. */
export function therapistsForTopic(topic: Topic): Therapist[] {
  if (topic.group === 'question' || topic.group === 'program') return []
  return therapists
    .filter((person) => {
      if (topic.method && !person.methods.includes(topic.method)) return false
      if (topic.focus && !person.focusAreas.includes(topic.focus)) return false
      if (topic.cityIds && !person.cityIds.some((id) => topic.cityIds?.includes(id))) return false
      return true
    })
    .sort((a, b) => a.name.he.localeCompare(b.name.he, 'he') || a.id.localeCompare(b.id))
}

export function topicPath(topic: Topic): string {
  if (topic.group === 'question') return `/guides/${topic.slug}/`
  if (topic.group === 'therapy') return `/therapists/${topic.slug}/`
  return `/rehab/${topic.slug}/`
}

export function cityTopic(slug: string | undefined): Topic | undefined {
  if (!slug) return undefined
  return allTopics().find((topic) => topic.group === 'city' && topic.slug === slug)
}

export function topicBySlug(slug: string | undefined, group: TopicGroup | 'rehab'): Topic | undefined {
  if (!slug) return undefined
  return allTopics().find((topic) => {
    if (topic.slug !== slug) return false
    if (group === 'rehab') return topic.group !== 'question'
    return topic.group === group
  })
}

export function topicsInGroup(group: TopicGroup): Topic[] {
  return allTopics().filter((topic) => topic.group === group)
}

export function topicShape(topic: Topic): TopicShape {
  if (topic.group === 'city') return 'map'
  if (topic.group === 'program' || topic.group === 'therapy') return 'directory'
  return 'article'
}

export const shapeLabel: Record<TopicShape, Localized> = {
  article: { he: 'מאמר', en: 'Article' },
  map: { he: 'מפה', en: 'Map' },
  directory: { he: 'רשימה', en: 'List' },
}

export const guideGroups: { id: TopicGroup; label: Localized; note: Localized }[] = [
  {
    id: 'focus',
    label: { he: 'לפי סוג ההתמכרות', en: 'By addiction' },
    note: { he: 'מאמר, ואחריו הכרטיסים שפורסמו.', en: 'An article, then the cards that were published.' },
  },
  {
    id: 'program',
    label: { he: 'לפי סוג המסגרת', en: 'By type of program' },
    note: { he: 'רשימת המסגרות מהסוג הזה.', en: 'A list of programs of this type.' },
  },
  {
    id: 'city',
    label: { he: 'לפי עיר', en: 'By city' },
    note: { he: 'עמוד עיר רק כשפורסמו לפחות ארבע מסגרות.', en: 'A city page only when at least four programs were published.' },
  },
  {
    id: 'therapy',
    label: { he: 'לפי שיטת טיפול', en: 'By therapy method' },
    note: { he: 'רשימת המטפלים שפרסמו את השיטה, עם קישור לכל כרטיס.', en: 'Therapists who published that method, with a link to each card.' },
  },
  {
    id: 'question',
    label: { he: 'שאלות', en: 'Questions' },
    note: { he: 'מאמר שעונה על שאלה, ואחר כך קישור לרשימות.', en: 'An article that answers a question, then links to the lists.' },
  },
]

export const articleCopy: Record<
  Lang,
  { lead: string; readCard: string; official: string; listHeading: string; peopleHeading: string; nearbyHeading: string; nearbyNote: string; hubsHeading: string }
> = {
  he: {
    lead: 'העמוד מסביר מה פורסם במדריך על הנושא, ואחריו מופיעים הכרטיסים. הוא אינו ייעוץ רפואי.',
    readCard: 'בכל כרטיס כתוב סוג המסגרת, הכתובת והטלפון רק אם המקור פרסם אותם. שדה ריק נשאר ריק.',
    official: 'ההסבר הרשמי בנושא יושב באתר משרד הבריאות:',
    listHeading: 'המסגרות שפורסמו',
    peopleHeading: 'מטפלים שפרסמו את הנושא',
    nearbyHeading: 'ערים קרובות',
    nearbyNote: 'ערים אחרות במדריך, לפי המיקום שפורסם בכרטיסים. עד 80 ק״מ.',
    hubsHeading: 'הרשימות של הנושא',
  },
  en: {
    lead: 'This page explains what the directory published on the subject, and the cards follow. It is not medical advice.',
    readCard: 'Each card shows the setting, address, and phone only when the source published them. An empty field stays empty.',
    official: 'The official explanation is on the Ministry of Health site:',
    listHeading: 'Programs that were published',
    peopleHeading: 'Therapists who published this',
    nearbyHeading: 'Nearby cities',
    nearbyNote: 'Other cities in the directory, based on the locations published on the cards, within 80 km.',
    hubsHeading: 'Lists for this subject',
  },
}

export { guideCopy } from './guideCopy.ts'

export type SitemapKind = 'listings' | 'locations' | 'articles'

export function sitemapKind(topic: Topic): SitemapKind {
  if (topic.group === 'city') return 'locations'
  if (topic.group === 'program' || topic.group === 'therapy') return 'listings'
  return 'articles'
}

/** Every indexable address, grouped the way the sitemap files are split. */
export function sitemapPaths(): { path: string; kind: SitemapKind }[] {
  const rows: { path: string; kind: SitemapKind }[] = [
    { path: '/', kind: 'listings' },
    { path: '/centers/', kind: 'listings' },
    { path: '/therapists/', kind: 'listings' },
    { path: '/articles/', kind: 'articles' },
    { path: '/guides/', kind: 'articles' },
    { path: '/about/', kind: 'articles' },
    { path: '/privacy/', kind: 'articles' },
    { path: '/accessibility/', kind: 'articles' },
    { path: '/contact/', kind: 'articles' },
  ]
  for (const path of pagedPaths('/centers/', centers.length)) rows.push({ path, kind: 'listings' })
  for (const path of pagedPaths('/therapists/', therapists.length)) rows.push({ path, kind: 'listings' })
  for (const topic of allTopics()) {
    if (topic.group === 'city' && !locationIsFilled(centersForTopic(topic))) continue
    const kind = sitemapKind(topic)
    const base = topicPath(topic)
    rows.push({ path: base, kind })
    for (const path of pagedPaths(base, centersForTopic(topic).length)) rows.push({ path, kind })
  }
  for (const center of centers) {
    if (centerIsFilled(center)) rows.push({ path: centerPath(center), kind: 'listings' })
  }
  for (const person of therapists) {
    if (therapistIsFilled(person)) rows.push({ path: therapistPath(person.slug), kind: 'listings' })
  }
  for (const row of rows) {
    if (row.path.includes('?') || row.path.includes('#')) {
      throw new Error(`Indexable path must not carry a filter: ${row.path}`)
    }
  }
  return rows
}

export function indexablePaths(): string[] {
  return sitemapPaths().map((row) => row.path)
}

/** Listing and location URLs that stay on the site but are not indexable yet. */
export function unfilledPaths(): string[] {
  const live = new Set(indexablePaths())
  const published = [
    ...centers.map((center) => centerPath(center)),
    ...therapists.map((person) => therapistPath(person.slug)),
    ...allTopics()
      .filter((topic) => topic.group === 'city')
      .flatMap((topic) => {
        const base = topicPath(topic)
        return [base, ...pagedPaths(base, centersForTopic(topic).length)]
      }),
  ]
  return published.filter((path) => !live.has(path))
}

/** /page/1/ is the same document as the first page. It is not a second URL. */
export function aliasPaths(): string[] {
  const bases = ['/centers/', '/therapists/', ...allTopics().map(topicPath)]
  return bases.map((base) => `${base}page/1/`)
}

/** The map is a view of the catalog, so it is prerendered and kept out of the sitemap. */
export function prerenderPaths(): string[] {
  const content = [...indexablePaths(), ...unfilledPaths(), '/map/', ...aliasPaths(), '/404/', '/410/']
  return content.flatMap((path) => [localePath(path, 'he'), localePath(path, 'en')])
}
