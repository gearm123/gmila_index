import { useLanguage } from '../context/LanguageContext.tsx'
import type { Crumb } from '../seo/breadcrumbs.ts'
import Link from './LocaleLink.tsx'

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const { t } = useLanguage()
  if (items.length < 2) return null
  return (
    <nav aria-label={t.crumbs.nav}>
      <ol className="crumbs" {...{ itemscope: 'true', itemtype: 'https://schema.org/BreadcrumbList' }}>
        {items.map((item, index) => {
          const current = index === items.length - 1
          return (
            <li
              key={`${item.path}-${item.name}`}
              {...{ itemprop: 'itemListElement', itemscope: 'true', itemtype: 'https://schema.org/ListItem' }}
            >
              <Link to={item.path} {...(current ? { 'aria-current': 'page' as const } : {})} {...{ itemprop: 'item' }}>
                <span {...{ itemprop: 'name' }}>{item.name}</span>
              </Link>
              <span className="crumbs__pos" aria-hidden="true" {...{ itemprop: 'position' }}>
                {index + 1}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
