import type { Lang } from '../i18n/copy.ts'
import { localePath } from '../lib/locale.ts'
import { absoluteUrl } from './site.ts'

export type Crumb = {
  name: string
  /** Content path, starting with /. */
  path: string
}

/** The visible trail and the BreadcrumbList use the same items. */
export function breadcrumbJsonLd(items: Crumb[], lang: Lang) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localePath(item.path, lang)),
    })),
  }
}

/** Page 2 and later add a last crumb. Earlier crumbs stay links to page 1. */
export function pagedCrumbs(items: Crumb[], page: number, pageWord: string, pagePath: string): Crumb[] {
  if (page <= 1) return items
  return [...items, { name: `${pageWord} ${page}`, path: pagePath }]
}
