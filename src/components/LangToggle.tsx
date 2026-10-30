import { useLanguage } from '../context/LanguageContext.tsx'
import type { Lang } from '../i18n/copy.ts'

export default function LangToggle() {
  const { lang, setLang, t } = useLanguage()

  return (
    <div className="lang-toggle" role="group" aria-label={t.langLabel}>
      {(['he', 'en'] as const).map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={lang === option}
          onClick={() => setLang(option satisfies Lang)}
        >
          {option === 'he' ? 'עב' : 'EN'}
        </button>
      ))}
    </div>
  )
}
