import type { CareType, FocusArea, ProgramGroup, SocialNetwork } from '../types/center.ts'

export type Lang = 'he' | 'en'

export type Copy = {
  brandTagline: string
  langLabel: string
  sampleAll: string
  sampleSome: string
  nav: { home: string; centers: string; therapists: string; map: string; about: string; contact: string; aria: string }
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
  footer: { blurb: string; emergency: string; rights: string }
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
    branches: string
    noRating: string
    source: string
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
  }
  about: { kicker: string; title: string; script: string; paragraphs: string[] }
  contact: { kicker: string; title: string; lede: string }
  notFound: { title: string; text: string; home: string }
  map: { google: string; osm: string; open: string; close: string }
  meta: { home: string; centers: string; therapists: string; about: string; contact: string; notFound: string }
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
      branches: 'סניפים וטלפונים',
      noRating: 'לא נמצא דירוג גוגל למרכז הזה.',
      source: 'מקור',
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
    },
    about: {
      kicker: 'המדריך',
      title: 'איך לקרוא את האתר',
      script: 'לפני הרשימה המלאה',
      paragraphs: [
        'GMILA הוא מדריך ישראלי למרכזי גמילה, למרפאות של קופות החולים ולמסגרות יום. הרשימה נשענת על מאגר משרד הבריאות מ־10 בנובמבר 2026 ועל אתרי המסגרות. מרכזי יום עירוניים של משרד הרווחה, שאין להם כתובת במאגר, מגיעים דרך העובד הסוציאלי ביחידת ההתמכרויות ברשות. עמוד משרד הבריאות לשנת 2025 מציין השתתפות עצמית של 50 ש״ח בחודש למבוגרים במרכז יום, ובלי השתתפות עצמית לנוער.',
        'דירוג גוגל מוצג רק כשנמצא כרטיס שתואם למרכז. אם לא אומת ציון, הכרטיס נשאר בלי כוכבים.',
        'לשונית המטפלים מציגה אנשי טיפול שאתר שלהם מפרסם טיפול בהתמכרויות, טלפון, ומחיר כשהוא פורסם. זו אינה רשימה של כל המטפלים בישראל.',
        'האתר עוזר למצוא מסגרת. הוא אינו ייעוץ רפואי ואינו שירות חירום.',
      ],
    },
    contact: {
      kicker: 'פנייה כללית',
      title: 'דברו איתנו',
      lede: 'לשאלה על המדריך עצמו. לפנייה למסגרת מסוימת, עדיף לפתוח את הכרטיס שלה.',
    },
    notFound: {
      title: 'העמוד לא נמצא',
      text: 'ייתכן שהקישור ישן, או שהמרכז עדיין לא נטען.',
      home: 'חזרה לראשי',
    },
    map: {
      google: 'Google Maps',
      osm: 'מפת OpenStreetMap עד שיוזן מפתח Google Maps. הקישורים נפתחים בגוגל מפות.',
      open: 'פתיחה בגוגל מפות',
      close: 'סגירה',
    },
    meta: {
      home: 'GMILA | מרכזי גמילה בישראל',
      centers: 'כל המרכזים | GMILA',
      therapists: 'מטפלים בהתמכרויות | GMILA',
      about: 'אודות | GMILA',
      contact: 'צור קשר | GMILA',
      notFound: 'העמוד לא נמצא | GMILA',
    },
    whatsappText: 'שלום, אשמח לפרטים על',
    therapists: {
      kicker: 'טיפול פרטי',
      title: 'מטפלים בהתמכרויות',
      lede: 'אנשי טיפול בישראל שאתר שלהם מפרסם טיפול בהתמכרויות לסמים, עם טלפון ומחיר כשהוא פורסם. זו אינה רשימה של כל המטפלים בארץ.',
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
      branches: 'Branches and phones',
      noRating: 'No Google rating was found for this center.',
      source: 'Source',
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
    },
    about: {
      kicker: 'The directory',
      title: 'How to read this site',
      script: 'Before the full list',
      paragraphs: [
        'GMILA is an Israeli directory of rehab centers, health-fund clinics, and day programs. The list draws on the Health Ministry register of 10 November 2026 and on the programs’ own sites. Municipal welfare day centers that have no address in that register are reached through the addiction social worker in the local authority. The Health Ministry page for 2025 states a copay of 50 NIS a month for adults in a day center, and no copay for youth.',
        'A Google rating is shown only when a listing matches the center. If no score was confirmed, the card stays without stars.',
        'The therapists tab lists clinicians whose own site publishes addiction treatment, a phone number, and a price when one is published. It is not a list of every therapist in Israel.',
        'The site helps you find a program. It is not medical advice and it is not an emergency service.',
      ],
    },
    contact: {
      kicker: 'General inquiry',
      title: 'Talk to us',
      lede: 'For a question about the directory. To reach a specific program, open its card.',
    },
    notFound: {
      title: 'Page not found',
      text: 'The link may be old, or that center is not loaded yet.',
      home: 'Back home',
    },
    map: {
      google: 'Google Maps',
      osm: 'OpenStreetMap until a Google Maps key is added. Links still open in Google Maps.',
      open: 'Open in Google Maps',
      close: 'Close',
    },
    meta: {
      home: 'GMILA | Rehab centers in Israel',
      centers: 'All centers | GMILA',
      therapists: 'Addiction therapists | GMILA',
      about: 'About | GMILA',
      contact: 'Contact | GMILA',
      notFound: 'Page not found | GMILA',
    },
    whatsappText: 'Hello, I would like details about',
    therapists: {
      kicker: 'Private care',
      title: 'Addiction therapists',
      lede: 'Clinicians in Israel whose own site publishes treatment for drug addiction, with a phone number and a price when one is published. This is not a list of every therapist in the country.',
      search: 'Search by name or city',
      noPrice: 'No price was published.',
      focus: 'What they treat',
      back: 'Back to therapists',
      countOne: 'One therapist',
      count: 'therapists',
    },
  },
}
