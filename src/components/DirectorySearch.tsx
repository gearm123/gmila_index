import { useMemo, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Link from './LocaleLink.tsx'
import { localePath } from '../lib/locale.ts'
import { useLanguage } from '../context/LanguageContext.tsx'
import { directoryHits } from '../lib/directorySearch.ts'

export default function DirectorySearch() {
  const { lang, t } = useLanguage()
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const hits = useMemo(() => directoryHits(q, lang), [q, lang])
  const needle = q.trim()

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!needle) return
    navigate(localePath('/centers/', lang), { state: { q: needle } })
  }

  return (
    <div className="miss-search">
      <form className="hero__search" role="search" method="post" onSubmit={onSubmit}>
        <label className="field" htmlFor="directory-search">
          <span>{t.notFound.search}</span>
          <input
            id="directory-search"
            value={q}
            onChange={(event) => setQ(event.target.value)}
            placeholder={t.notFound.search}
            autoComplete="off"
            enterKeyHint="search"
          />
        </label>
        <button className="site-cta site-cta--solid" type="submit">
          {t.notFound.submit}
        </button>
      </form>
      {needle.length >= 2 && hits.length === 0 ? <p>{t.notFound.none}</p> : null}
      {hits.length > 0 ? (
        <ul className="miss-hits" aria-live="polite">
          {hits.map((hit) => (
            <li key={hit.href}>
              <Link to={hit.href}>
                <span>{hit.title}</span>
                <small>{hit.note}</small>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
      <p className="hero__actions">
        <Link className="site-cta" to="/centers/">
          {t.notFound.centers}
        </Link>
        <Link className="site-cta" to="/therapists/">
          {t.notFound.therapists}
        </Link>
        <Link className="site-cta" to="/">
          {t.notFound.home}
        </Link>
      </p>
    </div>
  )
}
