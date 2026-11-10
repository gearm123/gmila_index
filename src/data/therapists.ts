import type { Therapist } from '../types/therapist.ts'

/**
 * Practitioners whose own sites publish addiction treatment plus a way to contact them.
 * This is not a register of every clinician in Israel.
 */
export const therapists: Therapist[] = [
  {
    id: 'tamir-institute',
    slug: 'tamir-institute',
    name: { he: 'מכון טמיר', en: 'Tamir Institute' },
    credential: {
      he: 'האתר מציג את איתן טמיר, MA, כראש המכון, וצוות של פסיכולוגים ופסיכותרפיסטים לטיפול בהתמכרויות.',
      en: 'The site presents Eitan Tamir, MA, as head of the institute, with a team of psychologists and psychotherapists for addiction treatment.',
    },
    city: { he: 'תל אביב', en: 'Tel Aviv' },
    address: { he: 'נחלת יצחק 32א, תל אביב-יפו, 6744824', en: '32A Nahalat Yitzhak, Tel Aviv-Yafo, 6744824' },
    phone: '072-3940004',
    email: 'info@tipulpsychology.co.il',
    website: 'https://www.tipulpsychology.co.il/addiction/tel-aviv-recovery-and-experts.html',
    hours: { he: 'ימים א׳–ה׳, 9:00–20:00', en: 'Sunday–Thursday, 9:00–20:00' },
    focus: {
      he: 'סמים, אלכוהול, קנאביס, הימורים, מסכים ופורנו. הצוות ששמותיו בעמוד כולל את עמיר פירני, אסף צבי, ד״ר נועם זילברמן ומאיה בלום.',
      en: 'Drugs, alcohol, cannabis, gambling, screens, and pornography. Clinicians named on the page include Amir Pirani, Asaf Zvi, Dr. Noam Zilberman, and Maya Blum.',
    },
    pricing: {
      he: 'העמוד כותב שהעלות למפגש אינה נמוכה מ־400 ש״ח.',
      en: 'The page says a session is not priced below 400 NIS.',
    },
    summary: {
      he: 'מכון בתל אביב לטיפול פרטי בהתמכרויות, עם פגישות גם בזום כשצריך.',
      en: 'A Tel Aviv institute for private addiction treatment, with Zoom sessions when needed.',
    },
    description: {
      he: 'העמוד מתאר CBT, ראיון מוטיבציוני, טיפול משפחתי, טיפול דינמי ו־EMDR. הוא כותב שהמכון מוכר על ידי מועצת הפסיכולוגים ומשרד הבריאות להסמכת פסיכולוגים קליניים. פגישות גם במרכז העיר, בדרום, ביפו ובצפון, בלי כתובת נפרדת לכל קליניקה.',
      en: 'The page describes CBT, motivational interviewing, family therapy, dynamic therapy, and EMDR. It says the institute is recognized by the Council of Psychologists and the Ministry of Health for training clinical psychologists. Sessions are also offered in the city center, the south, Jaffa, and the north, without a separate address for each clinic.',
    },
    source: { he: 'עמוד הטיפול בהתמכרויות בתל אביב באתר מכון טמיר.', en: 'The Tel Aviv addiction-treatment page on the Tamir Institute site.' },
    sourceUrl: 'https://www.tipulpsychology.co.il/addiction/tel-aviv-recovery-and-experts.html',
  },
  {
    id: 'yanir-yaakovi',
    slug: 'yanir-yaakovi',
    name: { he: 'יניר יעקובי', en: 'Yanir Yaakovi' },
    credential: {
      he: 'האתר מציג אותו כפסיכותרפיסט בגישה קוגניטיבית־התנהגותית.',
      en: 'The site presents him as a cognitive-behavioral psychotherapist.',
    },
    city: { he: 'נתניה', en: 'Netanya' },
    address: { he: 'האתר מציין נתניה ואינו מפרסם רחוב.', en: 'The site says Netanya and does not publish a street.' },
    phone: '052-3800007',
    email: '',
    website: 'https://www.tipul-yanir.co.il/addiction',
    hours: { he: 'האתר אינו מפרסם שעות. התיאום הוא בטלפון.', en: 'The site does not publish hours. Appointments are by phone.' },
    focus: {
      he: 'סמים, כולל קנאביס וסמי מסיבות, אלכוהול, הימורים, מין, אינטרנט וקניות. גם בני זוג, הורים וליווי מול מרכזי גמילה.',
      en: 'Drugs, including cannabis and party drugs, alcohol, gambling, sex, the internet, and shopping. Also partners, parents, and liaison with rehab centers.',
    },
    pricing: null,
    summary: {
      he: 'פסיכותרפיסט בנתניה שמפרסם טיפול CBT בהתמכרויות.',
      en: 'A Netanya psychotherapist who publishes CBT treatment for addictions.',
    },
    description: {
      he: 'עמוד ההתמכרויות נותן את הטלפון 052-3800007. הוא כותב על תחלואה כפולה ועל ליווי פסיכיאטרי בעת הצורך, בלי לפרסם מחיר.',
      en: 'The addiction page gives the phone 052-3800007. It mentions dual diagnosis and psychiatric liaison when needed, and does not publish a price.',
    },
    source: { he: 'האתר tipul-yanir.co.il, עמוד הבית ועמוד ההתמכרויות.', en: 'tipul-yanir.co.il, the home page and the addiction page.' },
    sourceUrl: 'https://www.tipul-yanir.co.il/',
  },
  {
    id: 'ofir-livne',
    slug: 'ofir-livne',
    name: { he: 'ד״ר אופיר ליבנה', en: 'Dr. Ofir Livne' },
    credential: {
      he: 'העמוד מציג אותו כפסיכיאטר מומחה למבוגרים, עם תת־התמחות בחקר התמכרויות באוניברסיטת קולומביה.',
      en: 'The page presents him as a specialist adult psychiatrist, with addiction-research training at Columbia University.',
    },
    city: { he: 'הרצליה', en: 'Herzliya' },
    address: { he: 'הסדנאות 4, הרצליה. הייעוץ גם מקוון.', en: '4 HaSadnaot, Herzliya. Consultations are also online.' },
    phone: '077-2318080',
    email: 'info@mentalics.co.il',
    website: 'https://mentalics.co.il/team/ofir/',
    hours: { he: 'ימים א׳–ה׳ 9:00–19:00, יום ו׳ 9:00–13:00. שבת סגור.', en: 'Sunday–Thursday 9:00–19:00, Friday 9:00–13:00. Closed Saturday.' },
    focus: {
      he: 'התמכרות לחומרים, כולל קנאביס ואלכוהול, והתמכרויות התנהגותיות כמו מין, הימורים ומשחקי מחשב. גם פוסט־טראומה.',
      en: 'Substance addiction, including cannabis and alcohol, and behavioral addictions such as sex, gambling, and computer games. Also post-trauma.',
    },
    pricing: null,
    summary: {
      he: 'פסיכיאטר להתמכרויות בהרצליה, עם ייעוץ מקוון.',
      en: 'An addiction psychiatrist in Herzliya, with online consultations.',
    },
    description: {
      he: 'העמוד נותן גם 077-8037322. הוא כותב שהוא מחלק את זמנו בין ישראל לארצות הברית ומקבל ייעוץ בזום או בשיחה מקוונת. מחיר לא פורסם.',
      en: 'The page also lists 077-8037322. It says he splits his time between Israel and the United States and offers Zoom or other online consultations. No price is published.',
    },
    source: { he: 'עמוד ד״ר אופיר ליבנה באתר mentalics.co.il.', en: 'The Dr. Ofir Livne page on mentalics.co.il.' },
    sourceUrl: 'https://mentalics.co.il/team/ofir/',
  },
  {
    id: 'mati-semionov',
    slug: 'mati-semionov',
    name: { he: 'מתי סמיונוב', en: 'Mati Semionov' },
    credential: {
      he: 'האתר מציג אותו כמוביל צוות גמילה ביתית, עם יותר מ־20 שנות ניסיון והכשרות בטיפול בהתמכרויות ובאימון אישי.',
      en: 'The site presents him as the lead of a home-detox team, with more than 20 years of experience and training in addiction treatment and personal coaching.',
    },
    city: { he: 'בית שמש', en: 'Beit Shemesh' },
    address: { he: 'השבעה 30, בית שמש. הצוות מגיע לבית בכל הארץ.', en: '30 HaShiva, Beit Shemesh. The team comes to the home anywhere in Israel.' },
    phone: '050-4999876',
    email: '',
    website: 'https://gmila.net/',
    hours: { he: 'האתר כותב 24/7.', en: 'The site says 24/7.' },
    focus: {
      he: 'גמילה ביתית מסמים, אלכוהול והימורים, עם ליווי של פסיכיאטר נרקולוג לפי האתר.',
      en: 'Home detox from drugs, alcohol, and gambling, with an addiction psychiatrist on the team according to the site.',
    },
    pricing: null,
    summary: {
      he: 'גמילה בבית, בלי אשפוז, מבית שמש לכל הארץ.',
      en: 'Detox at home, without a hospital stay, from Beit Shemesh to anywhere in Israel.',
    },
    description: {
      he: 'האתר כותב שהשיחה הראשונה אנונימית ובלי עלות, ושמחיר התוכנית עצמה אינו מפורסם. הוא נותן גם וואטסאפ לאותו מספר.',
      en: 'The site says the first call is anonymous and free, and it does not publish the price of the program itself. It also offers WhatsApp on the same number.',
    },
    source: { he: 'האתר gmila.net.', en: 'The site gmila.net.' },
    sourceUrl: 'https://gmila.net/',
  },
]
