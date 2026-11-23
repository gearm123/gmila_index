import { createContext, useContext, useLayoutEffect, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { copy, type Copy, type Lang } from '../i18n/copy.ts'
import { contentPath, langFromPath, localePath } from '../lib/locale.ts'

type LanguageContextValue = {
  lang: Lang
  t: Copy
  setLang: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const lang = langFromPath(location.pathname) ?? 'he'

  function setLang(next: Lang) {
    const target = `${localePath(contentPath(location.pathname), next)}${location.search}${location.hash}`
    if (target !== `${location.pathname}${location.search}${location.hash}`) navigate(target)
  }

  useLayoutEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr'
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, t: copy[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLanguage must be used within LanguageProvider')
  return value
}
