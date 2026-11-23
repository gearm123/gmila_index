const BRAND = 'GMILA'
const TITLE_MAX = 60
const DESCRIPTION_LENGTH = 150
const TAIL = ` | ${BRAND}`

function clean(text: string): string {
  return text.replace(/\s+/g, ' ').trim()
}

/** Shorten on a space. A word that fits whole is kept; a word is not sliced. */
function cutAtWord(text: string, max: number): string {
  const value = clean(text)
  if (max < 4) return ''
  if (value.length <= max) return tidy(value)
  const window = value.slice(0, max)
  const next = value[max] ?? ' '
  const endsOnWord = next === ' ' || /[,:;]/.test(next)
  const base = endsOnWord ? window : window.slice(0, Math.max(0, window.lastIndexOf(' ')))
  const cut = tidy(base)
  return cut.length >= 4 ? cut : ''
}

function tidy(text: string): string {
  return text
    .replace(/\s+(and|or|the|a|an|of|who|to|for|in|with|from|ב|ו)$/iu, '')
    .replace(/[|,;:\s]+$/u, '')
    .trim()
}

function titled(head: string, middle = ''): string {
  return `${middle ? `${head} | ${middle}` : head}${TAIL}`
}

/**
 * Keyword, then location when it is not already in the keyword, then a short
 * factual phrase, then the brand. The phrase, and then the location, is
 * shortened so the title stays within 60 characters. The brand stays at the end.
 */
export function metaTitle(keyword: string, location: string, detail: string): string {
  const key = clean(keyword)
  const place = clean(location)
  const extra = clean(detail)
  let head = key
  if (place && !key.includes(place)) {
    if (titled(`${key} ${place}`).length <= TITLE_MAX) {
      head = `${key} ${place}`
    } else {
      const room = TITLE_MAX - titled(key).length - 1
      const shortPlace = cutAtWord(place, room)
      if (shortPlace && !/^(in|ב)$/u.test(shortPlace)) head = `${key} ${shortPlace}`
    }
  }
  if (titled(head).length > TITLE_MAX) head = cutAtWord(head, TITLE_MAX - TAIL.length) || key.slice(0, TITLE_MAX - TAIL.length).trim()
  if (!extra) return titled(head)
  if (titled(head, extra).length <= TITLE_MAX) return titled(head, extra)
  const room = TITLE_MAX - head.length - TAIL.length - 3
  const middle = cutAtWord(extra, room)
  return middle.length >= 4 ? titled(head, middle) : titled(head)
}

/** About 150 characters. Longer copy stops on a word. Shorter copy is kept whole. */
export function metaDescription(lead: string, support = ''): string {
  const text = [lead, support].map(clean).filter(Boolean).join(' ')
  if (text.length <= DESCRIPTION_LENGTH) return text
  return cutAtWord(text, DESCRIPTION_LENGTH) || text.slice(0, DESCRIPTION_LENGTH).trim()
}
