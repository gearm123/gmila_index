import type { CareType, FocusArea, SocialNetwork } from '../types/center.ts'

export type Lang = 'he' | 'en'

export type Copy = {
  brandTagline: string
  langLabel: string
  sampleAll: string
  sampleSome: string
  nav: { home: string; centers: string; map: string; about: string; contact: string; aria: string }
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
  stats: { centers: string; cities: string; countries: string; rating: string }
  areasKicker: string
  areasTitle: string
  areasAll: string
  featured: { kicker: string; title: string }
  mapBand: { kicker: string; title: string; lede: string; open: string }
  points: { title: string; text: string }[]
  footer: { blurb: string; emergency: string; rights: string }
  care: Record<CareType, string>
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
  meta: { home: string; centers: string; about: string; contact: string; notFound: string }
  whatsappText: string
}

export const copy: Record<Lang, Copy> = {
  he: {
    brandTagline: 'מרכזי גמילה בעולם',
    langLabel: 'שפה',
    sampleAll: 'כל הכרטיסים שמוצגים כרגע הם נתוני הדגמה. מספר הטלפון אינו אמיתי. הרשימה המלאה תחליף אותם.',
    sampleSome: 'חלק מהכרטיסים הם נתוני הדגמה ומסומנים בהתאם.',
    nav: {
      home: 'ראשי',
      centers: 'מרכזים',
      map: 'מפה',
      about: 'אודות',
      contact: 'צור קשר',
      aria: 'ניווט ראשי',
    },
    hero: {
      kicker: 'מדריך לפי מדינה',
      title: 'מרכזי גמילה לפי מדינה',
      script: 'במקום אחד',
      lede: 'ישראל, ניו יורק, קפריסין, אירופה ותאילנד. תמונות, דירוג גוגל כשיש, כתובת ודרך לפנות.',
      search: 'חיפוש לפי שם, עיר או מדינה',
      searchButton: 'חיפוש',
      all: 'לכל המרכזים',
      map: 'צפייה במפה',
    },
    stats: { centers: 'מרכזים', cities: 'ערים', countries: 'מדינות', rating: 'דירוג ממוצע' },
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
      blurb: 'מדריך למרכזי גמילה ושיקום לפי מדינה.',
      emergency: 'האתר אינו קו חירום ואינו ייעוץ רפואי. בישראל: מד״א 101, ער״ן 1201. במדינות אחרות: מספר החירום המקומי.',
      rights: 'כל הזכויות שמורות.',
    },
    care: {
      detox: 'גמילה רפואית',
      residential: 'פנימייה',
      day: 'אשפוז יום',
      outpatient: 'אמבולטורי',
      aftercare: 'המשך טיפול',
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
      emptyText: 'נסו מדינה אחרת, או נקו את החיפוש.',
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
        'GMILA הוא מדריך למרכזי גמילה ושיקום. הרשימה מחולקת לישראל, ניו יורק, קפריסין, אירופה ותאילנד. בכל כרטיס יש מקום לתמונות, מיקום, דירוג גוגל, שעות, שפות, סוג המסגרת ודרכי התקשרות.',
        'הרשימה נלקחה מאתרי המרכזים, ממדריכים ממשלתיים, ומכרטיסי גוגל רק כשהציון תואם למרכז. אם לא אומת דירוג, הכרטיס נשאר בלי כוכבים.',
        'אפשר לסנן לפי אזור, מדינה, עיר, סוג מסגרת ותחום, לפתוח כל מקום בגוגל מפות, ולהתקשר, לשלוח וואטסאפ או להשאיר פנייה.',
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
      home: 'GMILA | מרכזי גמילה לפי מדינה',
      centers: 'כל המרכזים | GMILA',
      about: 'אודות | GMILA',
      contact: 'צור קשר | GMILA',
      notFound: 'העמוד לא נמצא | GMILA',
    },
    whatsappText: 'שלום, אשמח לפרטים על',
  },
  en: {
    brandTagline: 'Rehab centers by country',
    langLabel: 'Language',
    sampleAll: 'Every card on the site right now is sample data. The phone numbers are not real. The full list will replace them.',
    sampleSome: 'Some cards are sample data and are marked as such.',
    nav: {
      home: 'Home',
      centers: 'Centers',
      map: 'Map',
      about: 'About',
      contact: 'Contact',
      aria: 'Primary',
    },
    hero: {
      kicker: 'A directory by country',
      title: 'Rehab centers by country',
      script: 'in one place',
      lede: 'Israel, New York, Cyprus, Europe, and Thailand. Photos, a Google rating when one matches, an address, and a way to reach each program.',
      search: 'Search by name, city, or country',
      searchButton: 'Search',
      all: 'All centers',
      map: 'View the map',
    },
    stats: { centers: 'Centers', cities: 'Cities', countries: 'Countries', rating: 'Average rating' },
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
      blurb: 'A directory of rehab and recovery centers by country.',
      emergency: 'This site is not an emergency service and not medical advice. In Israel, call Magen David Adom at 101 or ERAN at 1201. In other countries, use the local emergency number.',
      rights: 'All rights reserved.',
    },
    care: {
      detox: 'Medical detox',
      residential: 'Residential',
      day: 'Day program',
      outpatient: 'Outpatient',
      aftercare: 'Aftercare',
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
      emptyText: 'Try another country, or clear the search.',
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
        'GMILA is a directory of rehab and recovery centers, split into Israel, New York, Cyprus, Europe, and Thailand. Each card has room for photos, a location, a Google rating, hours, languages, the type of program, and ways to get in touch.',
        'The list comes from the centers’ sites, government directories, and Google listings only when the score matches the center. If no rating was confirmed, the card stays without stars.',
        'Filter by place, country, city, program type, and focus, open any place in Google Maps, and call, WhatsApp, or leave an inquiry.',
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
      home: 'GMILA | Rehab centers by country',
      centers: 'All centers | GMILA',
      about: 'About | GMILA',
      contact: 'Contact | GMILA',
      notFound: 'Page not found | GMILA',
    },
    whatsappText: 'Hello, I would like details about',
  },
}
