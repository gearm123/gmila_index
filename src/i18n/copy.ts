import type { CareType, FocusArea, ProgramGroup, SocialNetwork } from '../types/center.ts'

export type Lang = 'he' | 'en'

export type Copy = {
  brandTagline: string
  langLabel: string
  sampleAll: string
  sampleSome: string
  nav: { home: string; centers: string; therapists: string; map: string; about: string; contact: string; aria: string }
  crumbs: { nav: string; rehab: string }
  hero: {
    kicker: string
    title: string
    script: string
    lede: string
    search: string
    searchButton: string
    all: string
    map: string
  }
  stats: { centers: string; cities: string; countries: string; therapists: string; rating: string }
  areasKicker: string
  areasTitle: string
  areasAll: string
  featured: { kicker: string; title: string }
  mapBand: { kicker: string; title: string; lede: string; open: string }
  points: { title: string; text: string }[]
  footer: { blurb: string; emergency: string; rights: string; legalLabel: string; privacy: string; accessibility: string }
  care: Record<CareType, string>
  program: Record<ProgramGroup, { title: string; text: string }>
  focus: Record<FocusArea, string>
  social: Record<SocialNetwork, string>
  filters: {
    search: string
    country: string
    allCountries: string
    city: string
    allCities: string
    care: string
    allCare: string
    focus: string
    allFocus: string
    rating: string
    anyRating: string
    rating4: string
    rating45: string
    sort: string
    sortRating: string
    sortName: string
    sortCity: string
    viewList: string
    viewMap: string
    viewSplit: string
    resultOne: string
    results: string
    emptyTitle: string
    emptyText: string
    reset: string
  }
  pager: { nav: string; prev: string; next: string; page: string }
  card: {
    sample: string
    funded: string
    call: string
    whatsapp: string
    details: string
    onMap: string
    email: string
    website: string
    bookTour: string
    contact: string
    compare: string
    compared: string
  }
  compare: {
    title: string
    note: string
    show: string
    hide: string
    clear: string
    remove: string
    limit: string
    phone: string
    price: string
    funding: string
    notMarked: string
    unpublished: string
  }
  detail: {
    back: string
    about: string
    care: string
    focus: string
    hours: string
    languages: string
    ages: string
    address: string
    supervision: string
    rating: string
    reviews: string
    google: string
    directions: string
    contact: string
    gallery: string
    sampleNote: string
    pricing: string
    social: string
    quotes: string
    reviewOpen: string
    reviewClose: string
    reviewNote: string
    reviewPolicy: string
    branches: string
    noRating: string
    source: string
    related: string
    relatedNote: string
  }
  form: {
    name: string
    phone: string
    email: string
    message: string
    method: string
    methodPhone: string
    methodWhatsapp: string
    methodEmail: string
    submit: string
    success: string
    storageError: string
    nameError: string
    phoneError: string
    emailError: string
    sampleWarning: string
    generalTitle: string
    centerTitle: string
    tourTitle: string
    tourNote: string
    tourDate: string
    tourTime: string
    morning: string
    afternoon: string
    evening: string
    tourSubmit: string
    tourSuccess: string
    dateError: string
    privacyNote: string
  }
  legal: {
    privacy: { kicker: string; title: string; script: string; summary: string; sections: { heading: string; paragraphs: string[] }[] }
    accessibility: {
      kicker: string
      title: string
      script: string
      summary: string
      standardLabel: string
      standardHref: string
      commissionLabel: string
      commissionHref: string
      sections: { heading: string; paragraphs: string[] }[]
    }
  }
  about: {
    kicker: string
    title: string
    script: string
    summary: string
    sections: { id?: string; heading: string; paragraphs: string[] }[]
  }
  contact: { kicker: string; title: string; lede: string }
  notFound: {
    title: string
    text: string
    home: string
    search: string
    submit: string
    none: string
    centers: string
    therapists: string
    goneTitle: string
    goneText: string
  }
  map: { google: string; osm: string; open: string; close: string }
  meta: {
    home: string
    centers: string
    centersH1: string
    centersLede: string
    therapists: string
    about: string
    contact: string
    notFound: string
    gone: string
  }
  therapists: {
    kicker: string
    title: string
    lede: string
    search: string
    noPrice: string
    focus: string
    back: string
    countOne: string
    count: string
  }
  whatsappText: string
}

export const copy: Record<Lang, Copy> = {
  he: {
    brandTagline: 'מרכזי גמילה בישראל',
    langLabel: 'שפה',
    sampleAll: 'כל הכרטיסים שמוצגים כרגע הם נתוני הדגמה. מספר הטלפון אינו אמיתי. הרשימה המלאה תחליף אותם.',
    sampleSome: 'חלק מהכרטיסים הם נתוני הדגמה ומסומנים בהתאם.',
    nav: {
      home: 'ראשי',
      centers: 'מרכזים',
      therapists: 'מטפלים',
      map: 'מפה',
      about: 'אודות',
      contact: 'צור קשר',
      aria: 'ניווט ראשי',
    },
    crumbs: { nav: 'מיקום בדף', rehab: 'גמילה' },
    hero: {
      kicker: 'מדריך לגמילה בישראל',
      title: 'מרכזי גמילה בישראל',
      script: 'כולל מרפאות ויום',
      lede: 'אשפוזיות, קהילות, מרפאות של קופות החולים ומרכזי יום שפורסמו. דירוג גוגל רק כשהכרטיס תואם.',
      search: 'חיפוש לפי שם או עיר',
      searchButton: 'חיפוש',
      all: 'לכל המרכזים',
      map: 'צפייה במפה',
    },
    stats: { centers: 'מרכזים', cities: 'ערים', countries: 'מדינות', therapists: 'מטפלים', rating: 'דירוג ממוצע' },
    areasKicker: 'לפי אזור',
    areasTitle: 'בחרו מדינה',
    areasAll: 'כל האזורים',
    featured: { kicker: 'נבחרו להצגה', title: 'מהרשימה' },
    mapBand: {
      kicker: 'מפה לפי אזור',
      title: 'המפה של האזור שנבחר',
      lede: 'בחרו אזור והמפה מציגה רק אותו. כל כרטיס נפתח גם בגוגל מפות.',
      open: 'למפה המלאה',
    },
    points: [
      {
        title: 'תמונות ומסגרת',
        text: 'סוג הטיפול, קהל היעד, שעות, שפות ופיקוח — בכרטיס אחד.',
      },
      {
        title: 'דירוג גוגל',
        text: 'הציון ומספר הביקורות מוצגים על הכרטיס, עם קישור לעמוד בגוגל.',
      },
      {
        title: 'יצירת קשר',
        text: 'שיחה, וואטסאפ, אימייל, אתר, או פנייה קצרה מתוך הכרטיס.',
      },
    ],
    footer: {
      blurb: 'מדריך למרכזי גמילה, מרפאות ומטפלים בהתמכרויות בישראל.',
      emergency: 'האתר אינו קו חירום ואינו ייעוץ רפואי. בישראל: מד״א 101, ער״ן 1201.',
      rights: 'כל הזכויות שמורות.',
      legalLabel: 'מסמכים',
      privacy: 'מדיניות פרטיות',
      accessibility: 'הצהרת נגישות',
    },
    legal: {
      privacy: {
        kicker: 'מידע אישי',
        title: 'מדיניות פרטיות',
        script: 'עודכן ב־23 בנובמבר 2026. הפנייה נשמרת בדפדפן, ואינה נשלחת אל GMILA.',
        summary: 'פנייה בטופס נשמרת בדפדפן הזה בלבד. היא אינה נשלחת אל GMILA או אל המסגרת.',
        sections: [
          {
            heading: 'מי מבקש את הפרטים',
            paragraphs: [
              'את המדריך מפרסמת GMILA. זה אינו משרד הבריאות, אינו מרכז מהרשימה, ואינו מטפל מהרשימה.',
            ],
          },
          {
            heading: 'מה הטופס שומר',
            paragraphs: [
              'טופס פנייה שומר שם, טלפון, דוא״ל, דרך מועדפת לחזרה, והודעה חופשית. אם הטופס יושב על כרטיס של מסגרת, שם המסגרת נשמר איתו. טופס סיור שומר גם תאריך וחלק של היום.',
              'ההשוואה שומרת עד שלוש רשומות שכבר פורסמו, עד סגירת הלשונית. החיפוש נשאר בעמוד ואינו נשלח.',
            ],
          },
          {
            heading: 'מידע על בריאות',
            paragraphs: [
              'הודעה על מסגרת גמילה יכולה לתאר מצב בריאות, ובכלל זה התמכרות. לפי חוק הגנת הפרטיות, התשמ״א-1981, מידע על בריאותו של אדם הוא מידע בעל רגישות מיוחדת. הטופס אינו מבקש אבחנה, מספר זהות או תיק רפואי. כותבים רק מה שרוצים שיישמר במכשיר הזה.',
            ],
          },
          {
            heading: 'איפה זה נשמר, ולמי זה לא נמסר',
            paragraphs: [
              'השליחה שומרת את הרשומה באחסון של הדפדפן הזה. היא אינה נשלחת אל GMILA, אינה נשלחת אל המסגרת, ואינה נשלחת אל גוגל. חיבור של משלוח אל המסגרת אינו פעיל. כל עוד העמוד הזה אינו אומר אחרת, שליחת הטופס אינה יוצאת מהמכשיר.',
              'אין חובה למלא את הטופס. אפשר להתקשר או לפתוח וואטסאפ מהכרטיס, כשמספר פורסם. אם לא ממלאים, לא נשמרת פנייה.',
            ],
          },
          {
            heading: 'עיון ומחיקה',
            paragraphs: [
              'GMILA אינה יכולה להציג את ההודעה או למחוק אותה, כי ההודעה אינה מגיעה אליה. מחיקת נתוני האתר בדפדפן מוחקת את הפניות שנשמרו ואת ההשוואה.',
            ],
          },
          {
            heading: 'גוגל',
            paragraphs: [
              'בכל עמוד נטען Google Tag Manager, המיכל GTM-KQLCRCKV. תגיות בתוך המיכל יכולות לשמור עוגיות, והן יכולות לקבל את כתובת העמוד. לחיצה על צור קשר, על התקשרות או על השוואה שולחת אירוע עם שם הרשומה, סוג הרשומה, והפעולה. האירוע אינו כולל את השם, הטלפון, הדוא״ל או ההודעה מהטופס.',
              'העמודים מבקשים גופנים מגוגל. פתיחת המפה יכולה לטעון את גוגל מפות. הבקשות האלה מעבירות אל גוגל נתונים טכניים, ובכלל זה כתובת IP.',
            ],
          },
          {
            heading: 'יציאה מהמדריך',
            paragraphs: [
              'קישור לטלפון, לוואטסאפ, לאתר של מסגרת או לגוגל מפות יוצא מהמדריך. כללי הפרטיות שם הם של אותו אתר.',
            ],
          },
        ],
      },
      accessibility: {
        kicker: 'נגישות',
        title: 'הצהרת נגישות',
        script: 'פורסמה ב־23 בנובמבר 2026. היעד הוא ת״י 5568 חלק 1 ברמה AA.',
        summary: 'האתר נבנה לפי ת״י 5568 חלק 1 ברמה AA. לא פורסם טלפון לפנייה על נגישות.',
        standardLabel: 'ת״י 5568 חלק 1, ספטמבר 2023, באתר הנציבות',
        standardHref:
          'https://www.gov.il/BlobFolder/legalinfo/israeli_accessibility_standards_pdf/he/sitedocs_si-5568-1-september-2023.pdf',
        commissionLabel: 'מדריך הנציבות לנגישות אתרי אינטרנט',
        commissionHref: 'https://www.gov.il/he/pages/website_accessibility',
        sections: [
          {
            heading: 'התקן',
            paragraphs: [
              'המדריך נבנה לפי תקן ישראלי 5568 חלק 1 (ספטמבר 2023) ברמה AA. התקן מאמץ את הנחיות WCAG 2.0, עם השינויים הישראליים, ובהם כותרות מקטעים ברמה AA. זו אינה תעודה של מכון התקנים, ולא בוצעה בדיקת נגישות חיצונית.',
            ],
          },
          {
            heading: 'מה הונגש',
            paragraphs: [
              'שפת העמוד וכיוונו נקבעים לעברית ולאנגלית. קישור דילוג מוביל אל התוכן. לכל עמוד כותרת ראשית אחת, ולקטעים יש כותרות.',
              'לקישורים ולכפתורים יש שם. לתמונות יש חלופת טקסט. לטפסים יש תוויות. שם או טלפון חסרים מסומנים, והשגיאה מוקראת. מילוי טופס הוא רצוני, וההודעה על הפרטיות יושבת על הטופס.',
              'צבע הטקסט והכפתורים כהה כדי שאפשר לקרוא אותם על רקע העמוד. המיקוד נראה. בטלפון, הפקדים העיקריים בגובה של 44 פיקסלים לפחות.',
              'אותן רשומות שמופיעות על המפה מופיעות גם ברשימה. הרשימה היא הדרך כשהמפה קשה לשימוש.',
            ],
          },
          {
            heading: 'מה עדיין מוגבל',
            paragraphs: [
              'המפה היא מפה של צד שלישי. שימוש במקלדת בסיכה אינו זהה לרשימה.',
              'Google Tag Manager מוסיף מסגרת מוסתרת. גופנים נטענים מגוגל.',
              'לא פורסמו טלפון או דוא״ל לפנייה על נגישות. הטופס בעמוד צור קשר שומר את ההודעה בדפדפן הזה, והיא אינה מגיעה אל אדם. פנייה על מחסום אינה מגיעה אל GMILA עד שיפורסם בעמוד הזה אמצעי קשר ישיר.',
              'חובת מינוי רכז נגישות חלה על מעסיק של 25 עובדים לפחות. במדריך לא פורסם צוות בגודל הזה, ולא פורסם שם של רכז.',
            ],
          },
        ],
      },
    },
    care: {
      detox: 'גמילה רפואית',
      residential: 'פנימייה',
      day: 'אשפוז יום',
      outpatient: 'אמבולטורי',
      aftercare: 'המשך טיפול',
    },
    program: {
      long: {
        title: 'תוכנית ארוכה',
        text: 'קהילה או הוסטל לשנה ויותר. אילנות נמצאת כאן, והוסטל אביבים מפרסם שהות של שנה.',
      },
      months: {
        title: 'גמילה של כמה חודשים',
        text: 'פנימייה או קהילה טיפולית. משך מדויק מופיע בכרטיס רק אם המקור מפרסם אותו.',
      },
      day: {
        title: 'טיפול יומי',
        text: 'מרכז יום: מגיעים ביום וחוזרים הביתה, בלי לינה.',
      },
      clinic: {
        title: 'מרפאה',
        text: 'טיפול בלי לינה: קופות חולים, מרפאות אמבולטוריות ומכונים.',
      },
      detox: {
        title: 'גמילה רפואית קצרה',
        text: 'אשפוזית של שבועות, או קליטת חירום. זו אינה תוכנית של כמה חודשים.',
      },
    },
    focus: {
      drugs: 'סמים',
      alcohol: 'אלכוהול',
      gambling: 'הימורים',
      dual: 'אבחנה כפולה',
      youth: 'נוער',
      women: 'נשים',
      men: 'גברים',
      religious: 'דתי',
      family: 'משפחה',
    },
    social: {
      facebook: 'פייסבוק',
      instagram: 'אינסטגרם',
      youtube: 'יוטיוב',
      linkedin: 'לינקדאין',
    },
    filters: {
      search: 'חיפוש',
      country: 'מדינה',
      allCountries: 'כל המדינות',
      city: 'עיר',
      allCities: 'כל הערים',
      care: 'סוג מסגרת',
      allCare: 'כל המסגרות',
      focus: 'תחום',
      allFocus: 'כל התחומים',
      rating: 'דירוג',
      anyRating: 'כל הדירוגים',
      rating4: '4.0 ומעלה',
      rating45: '4.5 ומעלה',
      sort: 'מיון',
      sortRating: 'דירוג',
      sortName: 'שם',
      sortCity: 'עיר',
      viewList: 'רשימה',
      viewMap: 'מפה',
      viewSplit: 'רשימה ומפה',
      resultOne: 'מרכז אחד',
      results: 'מרכזים',
      emptyTitle: 'אין מרכזים שמתאימים לסינון',
      emptyText: 'נסו עיר אחרת, או נקו את החיפוש.',
      reset: 'ניקוי סינון',
    },
    pager: { nav: 'עמודים', prev: 'הקודם', next: 'הבא', page: 'עמוד' },
    card: {
      sample: 'דוגמה',
      funded: 'מימון ציבורי',
      call: 'התקשרות',
      whatsapp: 'וואטסאפ',
      details: 'לכרטיס',
      onMap: 'על המפה',
      email: 'אימייל',
      website: 'אתר',
      bookTour: 'קביעת סיור',
      contact: 'צור קשר',
      compare: 'השוואה',
      compared: 'בהשוואה',
    },
    compare: {
      title: 'השוואה',
      note: 'עד שלוש רשומות. מוצג רק מה שפורסם. זו אינה המלצה.',
      show: 'הצגת ההשוואה',
      hide: 'סגירת ההשוואה',
      clear: 'ניקוי',
      remove: 'הסרה',
      limit: 'אפשר להשוות עד שלוש.',
      phone: 'טלפון',
      price: 'מחיר',
      funding: 'מימון ציבורי',
      notMarked: 'לא סומן',
      unpublished: 'לא פורסם',
    },
    detail: {
      back: 'חזרה למרכזים',
      about: 'על המסגרת',
      care: 'סוג מסגרת',
      focus: 'תחומים',
      hours: 'שעות',
      languages: 'שפות',
      ages: 'גילאים',
      address: 'כתובת',
      supervision: 'פיקוח',
      rating: 'דירוג גוגל',
      reviews: 'ביקורות',
      google: 'עמוד בגוגל',
      directions: 'ניווט',
      contact: 'פנייה למרכז',
      gallery: 'תמונות',
      sampleNote: 'זה כרטיס הדגמה. הטלפון, האתר והדירוג אינם של מסגרת אמיתית.',
      pricing: 'מחיר',
      social: 'רשתות',
      quotes: 'ביקורות והמלצות',
      reviewOpen: 'הסבר מלא',
      reviewClose: 'סגירה',
      reviewNote:
        'קורא אינו יכול להשאיר כאן ביקורת. שורה מופיעה רק כקיצור של ביקורת גוגל שתואמת לכרטיס, או כמשפט שהמסגרת פרסמה באתר שלה. האתר אינו מבקש ביקורת, אינו משלם עליה, ואינו מפרסם ביקורת שניתנה תמורת הטבה.',
      reviewPolicy: 'איך בודקים ביקורת',
      branches: 'סניפים וטלפונים',
      noRating: 'לא נמצא דירוג גוגל למרכז הזה.',
      source: 'מקור',
      related: 'מסגרות קשורות',
      relatedNote: 'מסגרות נוספות באותה עיר, ואחר כך מסגרות שפורסמו באותו תחום. זו אינה המלצה.',
    },
    form: {
      name: 'שם',
      phone: 'טלפון',
      email: 'אימייל',
      message: 'הודעה',
      method: 'איך לחזור אליכם',
      methodPhone: 'טלפון',
      methodWhatsapp: 'וואטסאפ',
      methodEmail: 'אימייל',
      submit: 'שליחת פנייה',
      success: 'הפנייה נשמרה במכשיר הזה. שליחה אוטומטית למרכז תחובר כשהרשימה תהיה מוכנה. בינתיים אפשר להתקשר או לשלוח וואטסאפ מהכרטיס.',
      storageError: 'לא הצלחנו לשמור את הפנייה בדפדפן. התקשרו למרכז ישירות.',
      nameError: 'נא למלא שם.',
      phoneError: 'נא למלא טלפון בן 9 ספרות לפחות.',
      emailError: 'כתובת האימייל אינה תקינה.',
      sampleWarning: 'המרכז הזה הוא דוגמה, והפנייה לא תגיע למסגרת אמיתית.',
      generalTitle: 'השאירו פרטים ונחזור אליכם',
      centerTitle: 'בקשו שיחזרו אליכם',
      tourTitle: 'בקשת סיור',
      tourNote: 'בחרו תאריך מועדף. הבקשה נשמרת במכשיר הזה ואינה אישור של מועד. השליחה למרכז תחובר כשהרשימה תהיה מוכנה.',
      tourDate: 'תאריך מועדף',
      tourTime: 'חלק מהיום',
      morning: 'בוקר',
      afternoon: 'אחר הצהריים',
      evening: 'ערב',
      tourSubmit: 'שליחת בקשת סיור',
      tourSuccess: 'בקשת הסיור נשמרה במכשיר הזה. המועד אינו מאושר. השליחה למרכז תחובר כשהרשימה תהיה מוכנה.',
      dateError: 'נא לבחור תאריך מהיום והלאה.',
      privacyNote:
        'השם, הטלפון, הדוא״ל וההודעה נשמרים בדפדפן הזה בלבד, ואינם נשלחים אל GMILA או אל המסגרת. מילוי הטופס רצוני, וההודעה יכולה לכלול מידע על בריאות.',
    },
    about: {
      kicker: 'המדריך',
      title: 'איך לקרוא את האתר',
      script: 'מי מפרסם את המדריך, לשם מה הוא קיים, ואיך נכנסת אליו מסגרת.',
      summary: 'את המדריך מפרסמת GMILA. זה אינו משרד הבריאות, אינו מרכז מהרשימה, ואינו מטפל מהרשימה.',
      sections: [
        {
          heading: 'מי מפעיל את האתר',
          paragraphs: [
            'את המדריך מפרסמת GMILA. זה אינו משרד הבריאות, אינו מרכז מהרשימה, ואינו מטפל מהרשימה.',
            'שאלה על המדריך נשלחת מעמוד צור קשר. פנייה למסגרת נפתחת מהכרטיס שלה.',
          ],
        },
        {
          heading: 'לשם מה המדריך',
          paragraphs: [
            'המדריך נועד כדי שיהיה אפשר לראות, בישראל, אילו מסגרות ואילו מטפלים פרסמו פרטים בעצמם, ואיזה שדה נשאר ריק. אין כאן דירוג ואין הבטחה לתוצאה. האתר אינו קובע מקום במסגרת.',
            'עברית נמצאת תחת /he/ ואנגלית תחת /en/, וכל עמוד מצביע על השפה השנייה. האתר אינו ייעוץ רפואי ואינו שירות חירום.',
          ],
        },
        {
          heading: 'איך נבחרת מסגרת',
          paragraphs: [
            'מרכז נכנס כשהוא מופיע במאגר משרד הבריאות שהורד ב־10 בנובמבר 2026, או כשאתר שלו מפרסם טיפול בהתמכרות בישראל. הכרטיס מעתיק רק את מה שהמקור פרסם. טלפון, מחיר או דירוג שלא פורסמו נשארים ריקים. דירוג גוגל מופיע רק כשנמצא כרטיס גוגל תואם.',
            'מטפל נכנס כשאתר שלו מפרסם טיפול בהתמכרויות, עם טלפון, ומחיר כשהוא פורסם. זו אינה רשימה של כל המטפלים בישראל.',
            'עמוד עיר נפתח רק כשפורסמו לפחות ארבע מסגרות. עמוד שיטת טיפול נפתח רק כשלפחות שני אתרים של מטפלים פרסמו את השיטה. אין עמוד לטיפול זוגי, ואין מרכזים מחוץ לישראל. הופעה ברשימה אינה המלצה.',
            'מרכז יום עירוני של משרד הרווחה שאין לו כתובת במאגר מגיע דרך העובד הסוציאלי ביחידת ההתמכרויות ברשות.',
          ],
        },
        {
          id: 'reviews',
          heading: 'ביקורות',
          paragraphs: [
            'קורא אינו יכול להשאיר ביקורת באתר הזה. אין טופס לכך, ואין תור של ביקורות שמחכות לפרסום.',
            'שורה בכרטיס היא קיצור של ביקורת גוגל, ורק כשכרטיס הגוגל תואם למרכז, או משפט שהמסגרת פרסמה באתר שלה. השורה שמתחת אומרת איזה מהם. בפתיחה כתוב אם פורסם שם. משפט מאתר המסגרת אינו מסומן כביקורת של מטופל.',
            'המדריך אינו פונה בבקשה לביקורת, אינו משלם על ביקורת, ואינו מפרסם ביקורת שניתנה תמורת הנחה, מתנה, או כתנאי לטיפול. מסגרת אינה יכולה לשלוח ביקורת על עצמה כדי שתוצג כביקורת של מטופל.',
            'אין כאן ציון שמחושב מהשורות. דירוג גוגל הוא הציון שפורסם בכרטיס התואם. אם לא נמצא כרטיס תואם, אין כוכבים.',
          ],
        },
      ],
    },
    contact: {
      kicker: 'פנייה כללית',
      title: 'דברו איתנו',
      lede: 'לשאלה על המדריך עצמו. לפנייה למסגרת מסוימת, עדיף לפתוח את הכרטיס שלה.',
    },
    notFound: {
      title: 'העמוד לא נמצא',
      text: 'הקישור לא מוביל לעמוד במדריך. אפשר לחפש לפי שם או עיר.',
      home: 'חזרה לראשי',
      search: 'חיפוש לפי שם או עיר',
      submit: 'חיפוש',
      none: 'אין התאמה במדריך.',
      centers: 'כל המסגרות',
      therapists: 'מטפלים',
      goneTitle: 'המסגרת הוסרה',
      goneText: 'העמוד הזה הוסר מהמדריך, ואין עמוד עיר שאפשר להפנות אליו.',
    },
    map: {
      google: 'Google Maps',
      osm: 'מפת OpenStreetMap עד שיוזן מפתח Google Maps. הקישורים נפתחים בגוגל מפות.',
      open: 'פתיחה בגוגל מפות',
      close: 'סגירה',
    },
    meta: {
      home: 'מרכזי גמילה בישראל | GMILA',
      centers: 'רשימת המסגרות | GMILA',
      centersH1: 'רשימת המסגרות',
      centersLede: 'כל הכרטיסים שבמדריך, בלי בחירה של עיר או של סוג התמכרות. לכל עיר ולכל סוג יש עמוד משלו.',
      therapists: 'מטפלים בהתמכרויות | GMILA',
      about: 'אודות | GMILA',
      contact: 'צור קשר | GMILA',
      notFound: 'העמוד לא נמצא | GMILA',
      gone: 'המסגרת הוסרה | GMILA',
    },
    whatsappText: 'שלום, אשמח לפרטים על',
    therapists: {
      kicker: 'טיפול פרטי',
      title: 'מטפלים בהתמכרויות',
      lede: 'אנשי טיפול שאתר שלהם מפרסם טיפול בהתמכרויות, עם טלפון ומחיר כשהוא פורסם. זו אינה רשימה של כל המטפלים בארץ, ואינה רשימת המרכזים.',
      search: 'חיפוש לפי שם או עיר',
      noPrice: 'לא פורסם מחיר.',
      focus: 'תחומי טיפול',
      back: 'חזרה למטפלים',
      countOne: 'מטפל אחד',
      count: 'מטפלים',
    },
  },
  en: {
    brandTagline: 'Israeli rehab centers',
    langLabel: 'Language',
    sampleAll: 'Every card on the site right now is sample data. The phone numbers are not real. The full list will replace them.',
    sampleSome: 'Some cards are sample data and are marked as such.',
    nav: {
      home: 'Home',
      centers: 'Centers',
      therapists: 'Therapists',
      map: 'Map',
      about: 'About',
      contact: 'Contact',
      aria: 'Primary',
    },
    crumbs: { nav: 'Breadcrumb', rehab: 'Rehab' },
    hero: {
      kicker: 'An Israel directory',
      title: 'Rehab centers in Israel',
      script: 'clinics and day programs too',
      lede: 'Detox wards, communities, health-fund clinics, and published day programs. A Google rating only when the listing matches.',
      search: 'Search by name or city',
      searchButton: 'Search',
      all: 'All centers',
      map: 'View the map',
    },
    stats: { centers: 'Centers', cities: 'Cities', countries: 'Countries', therapists: 'Therapists', rating: 'Average rating' },
    areasKicker: 'By place',
    areasTitle: 'Choose a country',
    areasAll: 'All places',
    featured: { kicker: 'On view', title: 'From the directory' },
    mapBand: {
      kicker: 'A map for each place',
      title: 'The map follows the place you choose',
      lede: 'Pick a place and the map shows only that list. Each card also opens in Google Maps.',
      open: 'Open the full map',
    },
    points: [
      {
        title: 'Photos and the program',
        text: 'Care type, who it is for, hours, languages, and supervision — on one card.',
      },
      {
        title: 'Google rating',
        text: 'The score and review count sit on the card, with a link to the Google listing.',
      },
      {
        title: 'A way to reach them',
        text: 'Call, WhatsApp, email, the website, or a short inquiry from the card.',
      },
    ],
    footer: {
      blurb: 'A directory of Israeli rehab centers, clinics, and addiction therapists.',
      emergency: 'This site is not an emergency service and not medical advice. In Israel, call Magen David Adom at 101 or ERAN at 1201.',
      rights: 'All rights reserved.',
      legalLabel: 'Documents',
      privacy: 'Privacy policy',
      accessibility: 'Accessibility statement',
    },
    legal: {
      privacy: {
        kicker: 'Personal information',
        title: 'Privacy policy',
        script: 'Updated 23 November 2026. A form stays in the browser and is not sent to GMILA.',
        summary: 'A form is saved in this browser only. It is not sent to GMILA or to the program.',
        sections: [
          {
            heading: 'Who asks for the details',
            paragraphs: [
              'GMILA publishes this directory. It is not the Health Ministry, not a center on the list, and not a therapist on the list.',
            ],
          },
          {
            heading: 'What a form keeps',
            paragraphs: [
              'An inquiry form keeps a name, a phone number, an email, a preferred way to reply, and a free message. On a center card, the center name is kept with it. A tour form also keeps a date and a part of the day.',
              'Compare keeps up to three listings that were already published, until the tab is closed. Search stays on the page and is not sent.',
            ],
          },
          {
            heading: 'Health information',
            paragraphs: [
              'A message about a rehab program can describe health, including addiction. Under the Privacy Protection Law, 1981, information about a person’s health is information of special sensitivity. The form does not ask for a diagnosis, an identity number, or a medical file. Write only what you want stored on this device.',
            ],
          },
          {
            heading: 'Where it is kept, and who does not receive it',
            paragraphs: [
              'Sending the form stores the record in this browser. It is not sent to GMILA, not sent to the program, and not sent to Google. Delivery to a program is not connected. Until this page says otherwise, submitting the form does not leave the device.',
              'You do not have to fill in the form. You can call or open WhatsApp from the card when a number was published. If you leave the form empty, no inquiry is stored.',
            ],
          },
          {
            heading: 'Access and deletion',
            paragraphs: [
              'GMILA cannot show the message or delete it, because the message never arrives. Clearing this site’s data in the browser deletes the saved forms and the comparison.',
            ],
          },
          {
            heading: 'Google',
            paragraphs: [
              'Every page loads Google Tag Manager, container GTM-KQLCRCKV. Tags in that container can set cookies, and they can receive the page address. A contact, call, or compare action sends an event with the listing name, the listing type, and the action. The event does not include the name, phone, email, or message from a form.',
              'Pages request fonts from Google. Opening the map can load Google Maps. Those requests send technical data, including the IP address, to Google.',
            ],
          },
          {
            heading: 'Leaving the directory',
            paragraphs: [
              'A phone link, WhatsApp, a program’s website, or Google Maps leaves this directory. The privacy rules there belong to that site.',
            ],
          },
        ],
      },
      accessibility: {
        kicker: 'Access',
        title: 'Accessibility statement',
        script: 'Published 23 November 2026. The target is Israeli Standard 5568 part 1, level AA.',
        summary: 'The site is built to Israeli Standard 5568 part 1, level AA. No phone is published for an accessibility request.',
        standardLabel: 'Israeli Standard 5568 part 1, September 2023, on the commission site',
        standardHref:
          'https://www.gov.il/BlobFolder/legalinfo/israeli_accessibility_standards_pdf/he/sitedocs_si-5568-1-september-2023.pdf',
        commissionLabel: 'The commission’s guide to website accessibility',
        commissionHref: 'https://www.gov.il/he/pages/website_accessibility',
        sections: [
          {
            heading: 'The standard',
            paragraphs: [
              'The directory is built to Israeli Standard 5568 part 1 (September 2023), level AA. The standard adopts WCAG 2.0, with the Israeli changes, including section headings at level AA. This is not a certificate from the Standards Institution, and an outside accessibility audit has not been done.',
            ],
          },
          {
            heading: 'What was arranged',
            paragraphs: [
              'The page language and direction are set for Hebrew and for English. A skip link leads to the content. Each page has one main heading, and sections have headings.',
              'Links and buttons have names. Images have a text alternative. Forms have labels. A missing name or phone is marked, and the error is announced. Filling in a form is voluntary, and the privacy note sits on the form.',
              'Text and buttons are dark enough to read on the page background. Focus is visible. On a phone, the main controls are at least 44 pixels tall.',
              'The same listings that appear on the map appear in the list. The list is the way through when the map is hard to use.',
            ],
          },
          {
            heading: 'What is still limited',
            paragraphs: [
              'The map is a third-party map. Using a pin from the keyboard is not the same as using the list.',
              'Google Tag Manager adds a hidden frame. Fonts are loaded from Google.',
              'No phone number and no email have been published for an accessibility request. The form on the contact page stores the message in this browser, and it does not reach a person. A request about a barrier does not reach GMILA until a direct contact is published on this page.',
              'The duty to appoint an accessibility coordinator applies to an employer of at least 25 employees. This directory has not published a staff of that size, and no coordinator name is published.',
            ],
          },
        ],
      },
    },
    care: {
      detox: 'Medical detox',
      residential: 'Residential',
      day: 'Day program',
      outpatient: 'Outpatient',
      aftercare: 'Aftercare',
    },
    program: {
      long: {
        title: 'Longer program',
        text: 'A community or hostel of a year or more. Ilanot is here, and the Avivim hostel publishes a one-year stay.',
      },
      months: {
        title: 'A few months',
        text: 'A residential program or therapeutic community. The card states a length only when the source publishes one.',
      },
      day: {
        title: 'Daily care',
        text: 'A day center: people come during the day and go home, with no overnight stay.',
      },
      clinic: {
        title: 'Clinic',
        text: 'Care without an overnight stay: health-fund clinics, outpatient clinics, and institutes.',
      },
      detox: {
        title: 'Short medical detox',
        text: 'A ward of weeks, or emergency intake. This is not a program of several months.',
      },
    },
    focus: {
      drugs: 'Drugs',
      alcohol: 'Alcohol',
      gambling: 'Gambling',
      dual: 'Dual diagnosis',
      youth: 'Youth',
      women: 'Women',
      men: 'Men',
      religious: 'Religious',
      family: 'Family',
    },
    social: {
      facebook: 'Facebook',
      instagram: 'Instagram',
      youtube: 'YouTube',
      linkedin: 'LinkedIn',
    },
    filters: {
      search: 'Search',
      country: 'Country',
      allCountries: 'All countries',
      city: 'City',
      allCities: 'All cities',
      care: 'Program type',
      allCare: 'All types',
      focus: 'Focus',
      allFocus: 'All focuses',
      rating: 'Rating',
      anyRating: 'Any rating',
      rating4: '4.0 and up',
      rating45: '4.5 and up',
      sort: 'Sort',
      sortRating: 'Rating',
      sortName: 'Name',
      sortCity: 'City',
      viewList: 'List',
      viewMap: 'Map',
      viewSplit: 'List and map',
      resultOne: '1 center',
      results: 'centers',
      emptyTitle: 'No centers match these filters',
      emptyText: 'Try another city, or clear the search.',
      reset: 'Clear filters',
    },
    pager: { nav: 'Pages', prev: 'Previous', next: 'Next', page: 'Page' },
    card: {
      sample: 'Sample',
      funded: 'Publicly funded',
      call: 'Call',
      whatsapp: 'WhatsApp',
      details: 'View',
      onMap: 'On the map',
      email: 'Email',
      website: 'Website',
      bookTour: 'Book a tour',
      contact: 'Contact',
      compare: 'Compare',
      compared: 'In compare',
    },
    compare: {
      title: 'Compare',
      note: 'Up to three listings. Only what was published is shown. This is not a recommendation.',
      show: 'Show comparison',
      hide: 'Close comparison',
      clear: 'Clear',
      remove: 'Remove',
      limit: 'You can compare up to three.',
      phone: 'Phone',
      price: 'Price',
      funding: 'Public funding',
      notMarked: 'Not marked',
      unpublished: 'Not published',
    },
    detail: {
      back: 'Back to centers',
      about: 'About this program',
      care: 'Program type',
      focus: 'Focus',
      hours: 'Hours',
      languages: 'Languages',
      ages: 'Ages',
      address: 'Address',
      supervision: 'Supervision',
      rating: 'Google rating',
      reviews: 'reviews',
      google: 'Google listing',
      directions: 'Directions',
      contact: 'Contact this center',
      gallery: 'Photos',
      sampleNote: 'This is a sample card. The phone, website, and rating do not belong to a real program.',
      pricing: 'Price',
      social: 'Social',
      quotes: 'Reviews and recommendations',
      reviewOpen: 'Read the explanation',
      reviewClose: 'Hide the explanation',
      reviewNote:
        'A reader cannot leave a review here. A line appears only as a shortened Google review when that listing matches the card, or as a sentence the program published on its own site. The site does not ask for a review, does not pay for one, and does not publish a review given for a benefit.',
      reviewPolicy: 'How a review is checked',
      branches: 'Branches and phones',
      noRating: 'No Google rating was found for this center.',
      source: 'Source',
      related: 'Related programs',
      relatedNote: 'Other programs in the same city, then programs published for the same focus. This is not a recommendation.',
    },
    form: {
      name: 'Name',
      phone: 'Phone',
      email: 'Email',
      message: 'Message',
      method: 'How should we reply',
      methodPhone: 'Phone',
      methodWhatsapp: 'WhatsApp',
      methodEmail: 'Email',
      submit: 'Send inquiry',
      success:
        'The inquiry is saved on this device. Automatic delivery to the center will be connected once the list is ready. Until then, call or WhatsApp from the card.',
      storageError: 'The inquiry could not be saved in this browser. Call the center directly.',
      nameError: 'Enter a name.',
      phoneError: 'Enter a phone number with at least 9 digits.',
      emailError: 'That email address does not look valid.',
      sampleWarning: 'This center is a sample, so the inquiry will not reach a real program.',
      generalTitle: 'Leave your details and we will get back to you',
      centerTitle: 'Ask them to call you back',
      tourTitle: 'Request a tour',
      tourNote: 'Choose a preferred date. The request is saved on this device and is not a confirmed time. Delivery to the center will be connected once the list is ready.',
      tourDate: 'Preferred date',
      tourTime: 'Time of day',
      morning: 'Morning',
      afternoon: 'Afternoon',
      evening: 'Evening',
      tourSubmit: 'Send tour request',
      tourSuccess: 'The tour request is saved on this device. The time is not confirmed. Delivery to the center will be connected once the list is ready.',
      dateError: 'Choose a date from today onward.',
      privacyNote:
        'The name, phone, email, and message stay in this browser only. They are not sent to GMILA or to the program. Filling in the form is voluntary, and the message can include health information.',
    },
    about: {
      kicker: 'The directory',
      title: 'How to read this site',
      script: 'Who publishes the directory, what it is for, and how a program is included.',
      summary: 'GMILA publishes this directory, not the Health Ministry or a listed program.',
      sections: [
        {
          heading: 'Who runs the site',
          paragraphs: [
            'GMILA publishes this directory. It is not the Health Ministry, not a center on the list, and not a therapist on the list.',
            'A question about the directory goes to the contact page. A question for a program opens from that program’s card.',
          ],
        },
        {
          heading: 'What the directory is for',
          paragraphs: [
            'The directory exists so a reader in Israel can see which programs and which therapists published their own details, and which field was left empty. There is no ranking and no promised outcome. The site does not reserve a place in a program.',
            'Hebrew is under /he/ and English under /en/, and each page points at the other language. The site is not medical advice and it is not an emergency service.',
          ],
        },
        {
          heading: 'How a program is included',
          paragraphs: [
            'A center is included when it appears in the Health Ministry register downloaded on 10 November 2026, or when its own site publishes addiction treatment in Israel. The card copies only what that source published. A phone, a price, or a rating that was not published stays empty. A Google rating appears only when a matching Google listing was found.',
            'A therapist is included when their own site publishes addiction treatment, with a phone number and a price when one is published. This is not a list of every therapist in Israel.',
            'A city page opens only when at least four programs were published. A therapy-method page opens only when at least two therapists’ sites published that method. There is no couples-therapy page, and no centers outside Israel. A place on the list is not a recommendation.',
            'A municipal welfare day center with no address in the register is reached through the addiction social worker in the local authority.',
          ],
        },
        {
          id: 'reviews',
          heading: 'Reviews',
          paragraphs: [
            'A reader cannot leave a review on this site. There is no form for it, and there is no queue of reviews waiting to be published.',
            'A line on a card is a shortened Google review, and only when the Google listing matches the center, or a sentence the program published on its own site. The line under it says which. Opening it says whether a name was published. A sentence from the program’s site is not labeled as a patient’s review.',
            'The directory does not request a review, does not pay for a review, and does not publish a review given for a discount, a gift, or as a condition of treatment. A program cannot send a review of itself to be shown as a patient’s review.',
            'No score is calculated from the lines. A Google rating is the score published on the matching listing. If no listing matched, there are no stars.',
          ],
        },
      ],
    },
    contact: {
      kicker: 'General inquiry',
      title: 'Talk to us',
      lede: 'For a question about the directory. To reach a specific program, open its card.',
    },
    notFound: {
      title: 'Page not found',
      text: 'That link does not lead to a page in the directory. Search by name or city.',
      home: 'Back home',
      search: 'Search by name or city',
      submit: 'Search',
      none: 'Nothing in the directory matches.',
      centers: 'All programs',
      therapists: 'Therapists',
      goneTitle: 'This listing was removed',
      goneText: 'This page was taken out of the directory, and there is no city page to send you to.',
    },
    map: {
      google: 'Google Maps',
      osm: 'OpenStreetMap until a Google Maps key is added. Links still open in Google Maps.',
      open: 'Open in Google Maps',
      close: 'Close',
    },
    meta: {
      home: 'Rehab centers in Israel | GMILA',
      centers: 'The full list | GMILA',
      centersH1: 'The full list',
      centersLede: 'Every card in the directory, without picking a city or an addiction. Each city and each type has its own page.',
      therapists: 'Addiction therapists | GMILA',
      about: 'About | GMILA',
      contact: 'Contact | GMILA',
      notFound: 'Page not found | GMILA',
      gone: 'Listing removed | GMILA',
    },
    whatsappText: 'Hello, I would like details about',
    therapists: {
      kicker: 'Private care',
      title: 'Addiction therapists',
      lede: 'Clinicians whose own site publishes addiction treatment, with a phone number and a price when one is published. This is not a list of every therapist in the country, and it is not the list of centers.',
      search: 'Search by name or city',
      noPrice: 'No price was published.',
      focus: 'What they treat',
      back: 'Back to therapists',
      countOne: 'One therapist',
      count: 'therapists',
    },
  },
}
