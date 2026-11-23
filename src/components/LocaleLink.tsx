import { Link as RouterLink, type LinkProps, type To } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.tsx'
import { localePath } from '../lib/locale.ts'

function localizeTo(to: To, lang: 'he' | 'en'): To {
  if (typeof to === 'string') return localePath(to, lang)
  if (typeof to.pathname === 'string') return { ...to, pathname: localePath(to.pathname, lang) }
  return to
}

export default function Link({ to, ...rest }: LinkProps) {
  const { lang } = useLanguage()
  return <RouterLink to={localizeTo(to, lang)} {...rest} />
}
