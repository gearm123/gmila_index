import { copy, type Lang } from '../i18n/copy.ts'
import { cityFacts } from './cityFacts.ts'
import type { Topic } from './topics.ts'
import type { Center, FocusArea, ProgramGroup } from '../types/center.ts'
import type { Therapist } from '../types/therapist.ts'

export type FaqEntry = {
  question: Record<Lang, string>
  answer: Record<Lang, string>
  link?: { path: string; label: Record<Lang, string> }
}

const COST_GUIDE = {
  path: '/guides/rehab-costs/',
  label: { he: 'כמה עולה גמילה בישראל', en: 'What rehab costs in Israel' },
}
const DETOX_GUIDE = {
  path: '/guides/what-detox-involves/',
  label: { he: 'מה כוללת גמילה גופנית', en: 'What physical detox involves' },
}
const FAMILY_GUIDE = {
  path: '/guides/help-a-family-member/',
  label: { he: 'איך לעזור לבן משפחה בהתמכרות', en: 'How to help a family member with addiction' },
}
const THERAPY_GUIDE = {
  path: '/guides/therapy-types/',
  label: { he: 'שיטות טיפול בהתמכרויות', en: 'Therapy methods for addiction' },
}
const COMPARE_GUIDE = {
  path: '/guides/inpatient-vs-outpatient/',
  label: { he: 'אשפוזית או קהילה טיפולית', en: 'A detox ward or a therapeutic community' },
}

function cards(count: number, lang: Lang): string {
  if (lang === 'en') return count === 1 ? '1 card' : `${count} cards`
  return count === 1 ? 'כרטיס אחד' : `${count} כרטיסים`
}

function inCards(count: number, lang: Lang): string {
  if (lang === 'en') return count === 1 ? 'on 1 card' : `on ${count} cards`
  return count === 1 ? 'בכרטיס אחד' : `ב-${count} כרטיסים`
}

function typeLine(list: readonly Center[], lang: Lang): string {
  const facts = cityFacts(list)
  if (facts.types.length === 0) return lang === 'he' ? 'אין סוג מסומן בכרטיסים.' : 'No type is marked on the cards.'
  const parts = facts.types.map((row) => `${copy[lang].program[row.group].title} (${row.count})`)
  return parts.join(', ')
}

function priceSentence(list: readonly Center[], lang: Lang): string {
  const facts = cityFacts(list)
  const priced = facts.count - facts.unpriced
  const price =
    priced === 0
      ? lang === 'he'
        ? 'אף כרטיס לא מפרסם מחיר. השדה נשאר ריק.'
        : 'No card publishes a price. The field stays empty.'
      : lang === 'he'
        ? `מחיר פורסם ${inCards(priced, lang)}. השדה ריק ${inCards(facts.unpriced, lang)}.`
        : `A price is published ${inCards(priced, lang)}. The field is empty ${inCards(facts.unpriced, lang)}.`
  const funding =
    facts.publicCount === 0
      ? lang === 'he'
        ? 'אף כרטיס לא מסומן כמימון ציבורי.'
        : 'No card is marked as publicly funded.'
      : lang === 'he'
        ? `${cards(facts.publicCount, lang)} ${facts.publicCount === 1 ? 'מסומן' : 'מסומנים'} כמימון ציבורי.`
        : `${cards(facts.publicCount, lang)} ${facts.publicCount === 1 ? 'is' : 'are'} marked as publicly funded.`
  return lang === 'he' ? `${price} ${funding} אין כאן טווח שחושב.` : `${price} ${funding} No range is calculated here.`
}

function focusNoun(focus: FocusArea): Record<Lang, string> {
  const noun: Record<FocusArea, Record<Lang, string>> = {
    drugs: { he: 'סמים', en: 'drugs' },
    alcohol: { he: 'אלכוהול', en: 'alcohol' },
    gambling: { he: 'הימורים', en: 'gambling' },
    dual: { he: 'תחלואה כפולה', en: 'dual diagnosis' },
    youth: { he: 'נוער', en: 'youth' },
    women: { he: 'נשים', en: 'women' },
    men: { he: 'גברים', en: 'men' },
    religious: { he: 'ציבור דתי', en: 'a religious setting' },
    family: { he: 'משפחה', en: 'family' },
  }
  return noun[focus]
}

function focusExtra(focus: FocusArea): FaqEntry {
  const extra: Record<FocusArea, FaqEntry> = {
    alcohol: {
      question: { he: 'גמילה מאלכוהול חייבת להיות באשפוז?', en: 'Does alcohol detox have to be in a ward?' },
      answer: {
        he: 'עמוד הגמילה של משרד הבריאות כותב שגמילה גופנית מאלכוהול צריכה פיקוח רפואי, ושבמקרים קלים עד בינוניים אפשר גם במרפאה. כרטיס נכנס לכאן לפי מה שהוא פרסם.',
        en: 'The Ministry of Health rehab page says physical detox from alcohol needs medical supervision, and that a clinic is also possible in mild to moderate cases. A card is on this list according to what it published.',
      },
      link: DETOX_GUIDE,
    },
    drugs: {
      question: { he: 'אפשר לפנות בעצמך למסגרת גמילה מסמים?', en: 'Can you contact a drug rehab program yourself?' },
      answer: {
        he: 'עמוד האשפוזיות של משרד הבריאות כותב שאפשר לפנות בעצמך, דרך יחידת ההתמכרויות ברווחה, או דרך רופא. הרשימה כאן היא כרטיסים שציינו סמים.',
        en: 'The Ministry of Health detox-ward page says a person can apply on their own, through the welfare addiction unit, or through a doctor. This list is cards that mentioned drugs.',
      },
      link: COMPARE_GUIDE,
    },
    gambling: {
      question: { he: 'גמילה מהימורים מתבצעת באשפוזית?', en: 'Is gambling rehab done in a detox ward?' },
      answer: {
        he: 'עמוד הגמילה של משרד הבריאות כותב שהתמכרויות התנהגותיות, ובהן הימורים, מטופלות בעיקר במרפאה. סוג המסגרת ברשימה הוא מה שהכרטיס פרסם.',
        en: 'The Ministry of Health rehab page says behavioral addictions, including gambling, are treated mainly in a clinic. The setting on this list is what the card published.',
      },
      link: COMPARE_GUIDE,
    },
    dual: {
      question: { he: 'מה נחשב כאן תחלואה כפולה?', en: 'What counts here as dual diagnosis?' },
      answer: {
        he: 'התמכרות יחד עם מצב נפשי, רק כשהכרטיס מציין זאת. המדריך לא מוסיף אבחנה שלא פורסמה.',
        en: 'Addiction together with a mental-health condition, only when the card says so. The directory does not add a diagnosis that was not published.',
      },
    },
    youth: {
      question: { he: 'מאיזה גיל מופיעה כאן גמילה לנוער?', en: 'From what age is youth rehab listed here?' },
      answer: {
        he: 'עמוד האשפוזיות של משרד הבריאות כותב שאשפוזית נוער מקבלת מגיל 12 עד 21. גיל מדויק נכתב בכרטיס רק אם המקור פרסם אותו, ולא לכל כרטיס ברשימה יש גיל.',
        en: 'The Ministry of Health detox-ward page says a youth ward accepts ages 12 to 21. An exact age is written on a card only when its source published one, and not every card on this list has an age.',
      },
    },
    women: {
      question: { he: 'האם כל המסגרות כאן מיועדות לנשים בלבד?', en: 'Is every program here for women only?' },
      answer: {
        he: 'לא. נכנס כרטיס שציין נשים, כולל מסגרת מעורבת אם המקור ציין זאת.',
        en: 'No. A card that mentioned women is included, including a mixed program when the source said so.',
      },
    },
    men: {
      question: { he: 'האם כל המסגרות כאן מיועדות לגברים בלבד?', en: 'Is every program here for men only?' },
      answer: {
        he: 'לא. נכנס כרטיס שציין גברים. מסגרת מעורבת נכנסת רק אם המקור ציין גברים.',
        en: 'No. A card that mentioned men is included. A mixed program is included only when the source mentioned men.',
      },
    },
    religious: {
      question: { he: 'מה נחשב כאן מסגרת לציבור דתי?', en: 'What counts here as a religious program?' },
      answer: {
        he: 'כרטיס שציין ציבור דתי או חרדי. פרטי אורח החיים מופיעים רק כפי שפורסמו.',
        en: 'A card that mentioned a religious or Haredi setting. Details of daily life appear only as published.',
      },
    },
    family: {
      question: { he: 'האם זו רשימת טיפול זוגי?', en: 'Is this a list of couples therapy?' },
      answer: {
        he: 'לא. אלה מסגרות שהכרטיס שלהן מציין משפחה, הורים או בני זוג כחלק מהטיפול.',
        en: 'No. These are programs whose card mentions family, parents, or a partner as part of the care.',
      },
      link: FAMILY_GUIDE,
    },
  }
  return extra[focus]
}

function cityFaqs(topic: Topic, list: readonly Center[]): FaqEntry[] {
  const place = topic.place
  if (!place) return []
  const facts = cityFacts(list)
  const funding =
    facts.publicCount === 0
      ? {
          he: `אף כרטיס ב${place.he} לא מסומן כמימון ציבורי.`,
          en: `No card in ${place.en} is marked as publicly funded.`,
        }
      : {
          he: `${cards(facts.publicCount, 'he')} ב${place.he} ${facts.publicCount === 1 ? 'מסומן' : 'מסומנים'} כמימון ציבורי. זו אינה הבטחה שכל מסגרת בעיר ציבורית.`,
          en: `${cards(facts.publicCount, 'en')} in ${place.en} ${facts.publicCount === 1 ? 'is' : 'are'} marked as publicly funded. This is not a promise that every program in the city is public.`,
        }
  return [
    {
      question: {
        he: `כמה מרכזי גמילה יש ב${place.he}?`,
        en: `How many rehab centers are there in ${place.en}?`,
      },
      answer: {
        he: `המדריך מפרסם ${cards(facts.count, 'he')} שציינו את ${place.he}. זה אינו מפקד של כל מסגרת בעיר. עמוד עיר נפתח רק כשפורסמו לפחות ארבע.`,
        en: `The directory publishes ${cards(facts.count, 'en')} that named ${place.en}. This is not a census of every program in the city. A city page opens only when at least four were published.`,
      },
    },
    {
      question: {
        he: `יש ב${place.he} אשפוזית או רק מרפאה?`,
        en: `Is there a detox ward in ${place.en}, or only a clinic?`,
      },
      answer: {
        he: `בכרטיסים שציינו את ${place.he}: ${typeLine(list, 'he')}. סוג שלא מופיע כאן לא סומן.`,
        en: `On the cards that named ${place.en}: ${typeLine(list, 'en')}. A type that is not listed here was not marked.`,
      },
      link: COMPARE_GUIDE,
    },
    {
      question: { he: `כמה עולה גמילה ב${place.he}?`, en: `What does rehab cost in ${place.en}?` },
      answer: {
        he: `אין מחיר אחד ל${place.he}. ${priceSentence(list, 'he')}`,
        en: `There is no single price for ${place.en}. ${priceSentence(list, 'en')}`,
      },
      link: COST_GUIDE,
    },
    {
      question: { he: `יש גמילה ציבורית ב${place.he}?`, en: `Is there public rehab in ${place.en}?` },
      answer: funding,
    },
  ]
}

function whereQuestion(focus: FocusArea): Record<Lang, string> {
  const question: Record<FocusArea, Record<Lang, string>> = {
    alcohol: { he: 'איפה עושים גמילה מאלכוהול?', en: 'Where do people go for alcohol rehab?' },
    drugs: { he: 'איפה עושים גמילה מסמים?', en: 'Where do people go for drug rehab?' },
    gambling: { he: 'איפה מטפלים בהימורים?', en: 'Where is gambling treated?' },
    dual: { he: 'איפה מטפלים בתחלואה כפולה?', en: 'Where is dual diagnosis treated?' },
    youth: { he: 'איפה יש גמילה לנוער?', en: 'Where is youth rehab?' },
    women: { he: 'איפה יש גמילה לנשים?', en: 'Where is rehab for women?' },
    men: { he: 'איפה יש גמילה לגברים?', en: 'Where is rehab for men?' },
    religious: { he: 'איפה יש גמילה לציבור דתי?', en: 'Where is religious rehab?' },
    family: { he: 'איפה יש טיפול שכולל את המשפחה?', en: 'Where does treatment include the family?' },
  }
  return question[focus]
}

function costQuestion(focus: FocusArea): Record<Lang, string> {
  const question: Record<FocusArea, Record<Lang, string>> = {
    alcohol: { he: 'כמה עולה גמילה מאלכוהול?', en: 'What does alcohol rehab cost?' },
    drugs: { he: 'כמה עולה גמילה מסמים?', en: 'What does drug rehab cost?' },
    gambling: { he: 'כמה עולה טיפול בהימורים?', en: 'What does gambling treatment cost?' },
    dual: { he: 'כמה עולה טיפול בתחלואה כפולה?', en: 'What does dual-diagnosis treatment cost?' },
    youth: { he: 'כמה עולה גמילה לנוער?', en: 'What does youth rehab cost?' },
    women: { he: 'כמה עולה גמילה לנשים?', en: 'What does rehab for women cost?' },
    men: { he: 'כמה עולה גמילה לגברים?', en: 'What does rehab for men cost?' },
    religious: { he: 'כמה עולה גמילה במסגרת דתית?', en: 'What does rehab in a religious setting cost?' },
    family: { he: 'כמה עולה טיפול שכולל משפחה?', en: 'What does treatment that includes family cost?' },
  }
  return question[focus]
}

function focusFaqs(topic: Topic, list: readonly Center[], people: readonly Therapist[]): FaqEntry[] {
  if (!topic.focus) return []
  const noun = focusNoun(topic.focus)
  const therapistLine =
    people.length === 0
      ? { he: '', en: '' }
      : {
          he: ` ${people.length === 1 ? 'מטפל אחד פרסם' : `${people.length} מטפלים פרסמו`} את התחום באתר שלהם.`,
          en: ` ${people.length === 1 ? '1 therapist published' : `${people.length} therapists published`} this on their own site.`,
        }
  return [
    {
      question: whereQuestion(topic.focus),
      answer: {
        he: `בעמוד הזה ${cards(list.length, 'he')} שציינו ${noun.he}. הסוגים שסומנו: ${typeLine(list, 'he')}. זו רשימה של מה שפורסם, לא דירוג.${therapistLine.he}`,
        en: `This page has ${cards(list.length, 'en')} that mentioned ${noun.en}. The types marked: ${typeLine(list, 'en')}. This is a list of what was published, not a ranking.${therapistLine.en}`,
      },
      link: COMPARE_GUIDE,
    },
    {
      question: costQuestion(topic.focus),
      answer: {
        he: `אין מחיר אחד לנושא הזה. ${priceSentence(list, 'he')}`,
        en: `There is no single price for this subject. ${priceSentence(list, 'en')}`,
      },
      link: COST_GUIDE,
    },
    focusExtra(topic.focus),
  ]
}

function programFaqs(topic: Topic, list: readonly Center[]): FaqEntry[] {
  const kind = topic.kind
  if (!kind) return []
  const cost: FaqEntry = {
    question: { he: 'כמה זה עולה?', en: 'What does it cost?' },
    answer: {
      he: `אין מחיר אחד לסוג הזה. ${priceSentence(list, 'he')}`,
      en: `There is no single price for this type. ${priceSentence(list, 'en')}`,
    },
    link: COST_GUIDE,
  }
  const listed = {
    he: `בעמוד הזה ${cards(list.length, 'he')}.`,
    en: `This page has ${cards(list.length, 'en')}.`,
  }
  const byKind: Partial<Record<ProgramGroup, FaqEntry[]>> = {
    detox: [
      {
        question: { he: 'כמה זמן נמשכת אשפוזית גמילה?', en: 'How long does a detox ward last?' },
        answer: {
          he: `עמוד האשפוזיות של משרד הבריאות כותב עד שלושה שבועות למבוגרים ועד שלושה חודשים לנוער. ${listed.he} משך של מסגרת מסוימת נכתב רק אם הכרטיס פרסם אותו. שהייה של כמה חודשים היא עמוד אחר.`,
          en: `The Ministry of Health detox-ward page says up to three weeks for adults and up to three months for youth. ${listed.en} A specific program’s length is written only when its card published one. A stay of several months is another page.`,
        },
        link: DETOX_GUIDE,
      },
      {
        question: { he: 'אשפוזית ציבורית עולה כסף?', en: 'Does a public detox ward cost money?' },
        answer: {
          he: `עמוד האשפוזיות כותב שהטיפול במסגרת ציבורית ממומן על ידי משרד הבריאות, בלי עלות ובלי השתתפות עצמית. ${priceSentence(list, 'he')}`,
          en: `The detox-ward page says treatment in a public setting is funded by the Ministry of Health, with no charge and no copay. ${priceSentence(list, 'en')}`,
        },
        link: COST_GUIDE,
      },
      {
        question: { he: 'אשפוזית או קהילה טיפולית?', en: 'A detox ward or a therapeutic community?' },
        answer: {
          he: 'אשפוזית כאן היא גמילה קצרה או קליטת חירום. קהילה של כמה חודשים היא מסלול אחר.',
          en: 'A ward on this page is a short detox or an emergency admission. A community of several months is a different path.',
        },
        link: COMPARE_GUIDE,
      },
    ],
    months: [
      {
        question: { he: 'כמה זמן נשארים בקהילה טיפולית?', en: 'How long do people stay in a therapeutic community?' },
        answer: {
          he: `עמוד השיקום של משרד הבריאות מתאר קהילה טיפולית כמספר חודשים ועד שנה ויותר. ${listed.he} משך מדויק נכתב בכרטיס רק אם פורסם.`,
          en: `The Ministry of Health after-detox page describes a therapeutic community as several months up to a year or more. ${listed.en} An exact length is written on the card only when it was published.`,
        },
        link: COMPARE_GUIDE,
      },
      {
        question: { he: 'קהילה טיפולית כוללת לינה?', en: 'Does a therapeutic community include an overnight stay?' },
        answer: {
          he: 'כן. זו פנימייה, לא מרכז יום ולא מרפאה.',
          en: 'Yes. It is a residential stay, not a day program and not a clinic.',
        },
      },
      cost,
    ],
    day: [
      {
        question: { he: 'מרכז יום לגמילה כולל לינה?', en: 'Does a rehab day program include an overnight stay?' },
        answer: {
          he: `לא. מגיעים ביום וחוזרים הביתה. ${listed.he} עמוד השיקום של משרד הבריאות מתאר מרכז יום כחמישה ימים בשבוע. זה הניסוח של העמוד, לא לוח הזמנים של כל כרטיס.`,
          en: `No. People come during the day and go home. ${listed.en} The Ministry of Health after-detox page describes a day center as five days a week. That is the page’s wording, not the schedule of every card.`,
        },
        link: COMPARE_GUIDE,
      },
      {
        question: { he: 'כמה עולה מרכז יום?', en: 'What does a day program cost?' },
        answer: {
          he: `עמוד השיקום מציין, נכון לשנת 2025, 50 ש״ח לחודש למבוגרים מעל גיל 18, ובלי השתתפות עצמית לבני נוער. ${priceSentence(list, 'he')}`,
          en: `The after-detox page states, as of 2025, 50 NIS a month for adults over 18, and no copay for youth. ${priceSentence(list, 'en')}`,
        },
        link: COST_GUIDE,
      },
    ],
    clinic: [
      {
        question: { he: 'מרפאת התמכרויות היא אשפוז?', en: 'Is an addiction clinic a hospital stay?' },
        answer: {
          he: `לא. גרים בבית ומגיעים לטיפול. ${listed.he} זה כולל מרפאות של קופות החולים כשהכרטיס פרסם זאת.`,
          en: `No. People live at home and come in for care. ${listed.en} That includes health-fund clinics when the card published that.`,
        },
        link: COMPARE_GUIDE,
      },
      {
        question: { he: 'קופת חולים מכסה מרפאת התמכרויות?', en: 'Does a health fund cover an addiction clinic?' },
        answer: {
          he: `אין תשובה אחת לכל הקופות. ${priceSentence(list, 'he')}`,
          en: `There is no single answer for every health fund. ${priceSentence(list, 'en')}`,
        },
        link: COST_GUIDE,
      },
    ],
  }
  return byKind[kind] ?? []
}

function therapyFaqs(topic: Topic, people: readonly Therapist[]): FaqEntry[] {
  const dynamic = topic.method === 'dynamic'
  const where = dynamic
    ? { he: 'איפה מוצאים טיפול דינמי בהתמכרויות?', en: 'Where do you find dynamic therapy for addiction?' }
    : { he: 'איפה מוצאים מטפל CBT בהתמכרויות?', en: 'Where do you find a CBT addiction therapist?' }
  const priceQuestion = dynamic
    ? { he: 'כמה עולה מפגש בטיפול דינמי?', en: 'What does a dynamic-therapy session cost?' }
    : { he: 'כמה עולה מפגש CBT?', en: 'What does a CBT session cost?' }
  const priced = people.filter((person) => person.pricing != null)
  const priceAnswer =
    priced.length === 0
      ? {
          he: 'אף כרטיס ברשימה לא מפרסם מחיר מפגש. השדה נשאר ריק.',
          en: 'No card on this list publishes a session price. The field stays empty.',
        }
      : {
          he: `מחיר מפגש פורסם ${inCards(priced.length, 'he')}. השדה ריק ${inCards(people.length - priced.length, 'he')}. ${priced.map((person) => person.pricing?.he).join(' ')}`,
          en: `A session price is published ${inCards(priced.length, 'en')}. The field is empty ${inCards(people.length - priced.length, 'en')}. ${priced.map((person) => person.pricing?.en).join(' ')}`,
        }
  return [
    {
      question: where,
      answer: {
        he: `${people.length === 1 ? 'מטפל אחד פרסם' : `${people.length} מטפלים פרסמו`} את השיטה באתר שלהם. נכנס רק מי שפרסם אותה. זו אינה רשימה של כל המטפלים בישראל.`,
        en: `${people.length === 1 ? '1 therapist published' : `${people.length} therapists published`} the method on their own site. Only someone who published it is included. This is not a list of every therapist in Israel.`,
      },
    },
    {
      question: priceQuestion,
      answer: priceAnswer,
    },
    {
      question: { he: 'CBT או טיפול דינמי?', en: 'CBT or dynamic therapy?' },
      answer: {
        he: 'המדריך לא מדרג שיטות. עמוד נפתח רק כשלפחות שני מטפלים פרסמו את השיטה באתר שלהם. שיטה שפורסמה פעם אחת נשארת בכרטיס.',
        en: 'The directory does not rank methods. A page opens only when at least two therapists published the method on their own site. A method published once stays on that card.',
      },
      link: THERAPY_GUIDE,
    },
  ]
}

/** Questions people ask on a treatment hub or a city page. Answers use only this page's cards. */
export function faqsForTopic(topic: Topic, list: readonly Center[], people: readonly Therapist[]): FaqEntry[] {
  if (topic.group === 'city') return cityFaqs(topic, list)
  if (topic.group === 'focus') return focusFaqs(topic, list, people)
  if (topic.group === 'program') return programFaqs(topic, list)
  if (topic.group === 'therapy') return therapyFaqs(topic, people)
  return []
}

export function faqAnswerText(item: FaqEntry, lang: Lang): string {
  const answer = item.answer[lang]
  if (!item.link) return answer
  return `${answer} ${item.link.label[lang]}.`
}

export function faqJsonLd(items: readonly FaqEntry[], lang: Lang) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question[lang],
      acceptedAnswer: { '@type': 'Answer', text: faqAnswerText(item, lang) },
    })),
  }
}
