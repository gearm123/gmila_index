import type { Lang } from '../i18n/copy.ts'
import { copy } from '../i18n/copy.ts'
import { absoluteUrl, assetUrl } from './site.ts'

/**
 * Profiles published by this directory. A center's Facebook or Instagram page
 * does not belong here. Add a URL only after GMILA itself publishes that profile.
 */
export const organizationProfiles: readonly string[] = []

export function organizationId(): string {
  return `${absoluteUrl('/')}#organization`
}

export function websiteId(): string {
  return `${absoluteUrl('/')}#website`
}

/** Organization and WebSite for every page. Addresses follow VITE_SITE_URL. */
export function siteGraph(lang: Lang): Record<string, unknown>[] {
  const organization: Record<string, unknown> = {
    '@type': 'Organization',
    '@id': organizationId(),
    name: 'GMILA',
    alternateName: copy[lang].brandTagline,
    url: absoluteUrl('/'),
    logo: {
      '@type': 'ImageObject',
      '@id': `${absoluteUrl('/')}#logo`,
      url: assetUrl('/logo.svg'),
      contentUrl: assetUrl('/logo.svg'),
      width: 512,
      height: 512,
    },
    description: copy[lang].footer.blurb,
  }
  if (organizationProfiles.length > 0) organization.sameAs = [...organizationProfiles]

  return [
    organization,
    {
      '@type': 'WebSite',
      '@id': websiteId(),
      name: 'GMILA',
      alternateName: copy[lang].brandTagline,
      url: absoluteUrl('/'),
      description: copy[lang].footer.blurb,
      inLanguage: lang === 'he' ? 'he-IL' : 'en-US',
      publisher: { '@id': organizationId() },
    },
  ]
}
