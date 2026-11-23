export type RetiredListing = {
  /** Last public URL, with a trailing slash. */
  path: string
  /** Public city slug, such as haifa or tel-aviv. Required for a center. */
  city?: string
}

/**
 * Centers and therapists taken out of the catalog.
 * A center 301s to /rehab/{city}/ when that city has a location page.
 * Otherwise the answer is 410.
 */
export const retiredListings: RetiredListing[] = []
