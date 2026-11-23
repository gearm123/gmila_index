import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.tsx'
import { contentPath, localePath } from '../lib/locale.ts'

export default function LangToggle() {
  const { lang, t } = useLanguage()
  const { pathname, search, hash } = useLocation()
  const content = contentPath(pathname)

  return (
    <div className="lang-toggle" role="group" aria-label={t.langLabel}>
      {(['he', 'en'] as const).map((option) => (
        <Link
          key={option}
          to={`${localePath(content, option)}${search}${hash}`}
          aria-current={lang === option ? 'page' : undefined}
          {...{ hreflang: option }}
        >
          {option === 'he' ? 'עב' : 'EN'}
        </Link>
      ))}
    </div>
  )
}
