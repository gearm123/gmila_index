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
  stats: { centers: string; cities: string; rating: string }
  featured: { kicker: string; title: string }
  mapBand: { kicker: string; title: string; lede: string; open: string }
  points: { title: string; text: string }[]
  footer: { blurb: string; emergency: string; rights: string }
  care: Record<CareType, string>
  focus: Record<FocusArea, string>
  social: Record<SocialNetwork, string>
  filters: {
    search: string
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
    brandTagline: 'מרכזי גמילה בישראל',
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
      kicker: 'מדריך ארצי',
      title: 'כל מרכזי הגמילה',
      script: 'במקום אחד',
      lede: 'תמונות, דירוג גוגל, כתובת ודרך לפנות לכל מסגרת — על המפה וברשימה.',
      search: 'חיפוש לפי שם, עיר או אזור',
      searchButton: 'חיפוש',
      all: 'לכל המרכזים',
      map: 'צפייה במפה',
    },
    stats: { centers: 'מרכזים', cities: 'ערים', rating: 'דירוג ממוצע' },
    featured: { kicker: 'נבחרו להצגה', title: 'מהרשימה' },
    mapBand: {
      kicker: 'פריסה',
      title: 'כל המרכזים על המפה',
      lede: 'בחרו נקודה כדי לראות דירוג ודרכי קשר. כל כרטיס נפתח גם בגוגל מפות.',
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
      blurb: 'מדריך למרכזי גמילה ושיקום בישראל.',
      emergency: 'האתר אינו קו חירום ואינו ייעוץ רפואי. במצוקה מיידית: מד״א 101, ער״ן 1201.',
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
      quotes: 'ביקורות',
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
    },
    about: {
      kicker: 'המדריך',
      title: 'איך לקרוא את האתר',
      script: 'לפני הרשימה המלאה',
      paragraphs: [
        'GMILA הוא מדריך למרכזי גמילה ושיקום בישראל. בכל כרטיס יש מקום לתמונות, מיקום, דירוג גוגל, שעות, שפות, סוג המסגרת ודרכי התקשרות.',
        'הרשימה נלקחה מאתרי המרכזים, ממדריכים ממשלתיים, ומכרטיסי גוגל כשיש ציון. אם לא נמצא דירוג, הכרטיס נשאר בלי כוכבים.',
        'אפשר לסנן לפי עיר, סוג מסגרת ותחום, לפתוח כל מקום בגוגל מפות, ולהתקשר, לשלוח וואטסאפ או להשאיר פנייה.',
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
      about: 'אודות | GMILA',
      contact: 'צור קשר | GMILA',
      notFound: 'העמוד לא נמצא | GMILA',
    },
    whatsappText: 'שלום, אשמח לפרטים על',
  },
  en: {
    brandTagline: 'Rehab centers in Israel',
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
      kicker: 'A national directory',
      title: 'Rehab centers in Israel',
      script: 'in one place',
      lede: 'Photos, Google rating, address, and a way to reach each program — on the map and in the list.',
      search: 'Search by name, city, or region',
      searchButton: 'Search',
      all: 'All centers',
      map: 'View the map',
    },
    stats: { centers: 'Centers', cities: 'Cities', rating: 'Average rating' },
    featured: { kicker: 'On view', title: 'From the directory' },
    mapBand: {
      kicker: 'Across Israel',
      title: 'Every center on the map',
      lede: 'Choose a pin to see the rating and how to get in touch. Each card also opens in Google Maps.',
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
      blurb: 'A directory of rehab and recovery centers in Israel.',
      emergency: 'This site is not an emergency service and not medical advice. If you need urgent help, call Magen David Adom at 101 or ERAN at 1201.',
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
      quotes: 'Reviews',
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
    },
    about: {
      kicker: 'The directory',
      title: 'How to read this site',
      script: 'Before the full list',
      paragraphs: [
        'GMILA is a directory of rehab and recovery centers in Israel. Each card has room for photos, a location, a Google rating, hours, languages, the type of program, and ways to get in touch.',
        'The list comes from the centers’ sites, government directories, and Google listings when a score exists. If no rating was found, the card stays without stars.',
        'Filter by city, program type, and focus, open any place in Google Maps, and call, WhatsApp, or leave an inquiry.',
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
      about: 'About | GMILA',
      contact: 'Contact | GMILA',
      notFound: 'Page not found | GMILA',
    },
    whatsappText: 'Hello, I would like details about',
  },
}
