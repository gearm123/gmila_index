import { createContext, useContext, useLayoutEffect, useState, type ReactNode } from 'react'
import { copy, type Copy, type Lang } from '../i18n/copy.ts'

const STORAGE_KEY = 'gmila-lang-choice'
const PICKED_KEY = 'gmila-lang-picked'

type LanguageContextValue = {
  lang: Lang
  t: Copy
  setLang: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function initialLang(): Lang {
  if (typeof window === 'undefined') return 'he'
  if (localStorage.getItem(PICKED_KEY) !== '1') return 'he'
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'en' || stored === 'he' ? stored : 'he'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  function setLang(next: Lang) {
    localStorage.setItem(PICKED_KEY, '1')
    localStorage.setItem(STORAGE_KEY, next)
    setLangState(next)
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
