/** Public paths: lowercase, hyphens, no ids or query parameters. */
export function cityPathSlug(cityId: string): string {
  return cityId === 'tel-aviv-yafo' ? 'tel-aviv' : cityId
}

export function centerPath(center: { cityId: string; slug: string }): string {
  return `/rehab/${cityPathSlug(center.cityId)}/${center.slug}/`
}

export function therapistPath(slug: string): string {
  return `/therapists/${slug}/`
}
