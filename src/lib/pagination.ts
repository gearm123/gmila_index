/** How many listings are in the HTML of one page. Later pages are real links. */
export const LISTING_PAGE_SIZE = 20

export function pageCount(total: number): number {
  if (total <= 0) return 1
  return Math.ceil(total / LISTING_PAGE_SIZE)
}

/** Page 1 keeps the base path. Page 2 is /base/page/2/. */
export function listingPagePath(base: string, page: number): string {
  const root = base.endsWith('/') ? base : `${base}/`
  if (page <= 1) return root
  return `${root}page/${page}/`
}

export function pagedPaths(base: string, total: number): string[] {
  const last = pageCount(total)
  const paths: string[] = []
  for (let page = 2; page <= last; page += 1) paths.push(listingPagePath(base, page))
  return paths
}

/** Missing param is page 1. Anything that is not 1, 2, 3… is not a page. */
export function parseListingPage(raw: string | undefined): number | null {
  if (raw == null) return 1
  if (!/^[1-9]\d*$/.test(raw)) return null
  const page = Number(raw)
  return Number.isSafeInteger(page) ? page : null
}

export function slicePage<T>(items: readonly T[], page: number): T[] {
  const start = (page - 1) * LISTING_PAGE_SIZE
  return items.slice(start, start + LISTING_PAGE_SIZE)
}

export function pagedTitle(title: string, page: number, pageWord: string): string {
  if (page <= 1) return title
  const split = title.lastIndexOf(' | ')
  if (split === -1) return `${title} — ${pageWord} ${page}`
  return `${title.slice(0, split)} — ${pageWord} ${page}${title.slice(split)}`
}
