import { useState } from 'react'
import Link from './LocaleLink.tsx'
import { useCompare } from '../context/CompareContext.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'

export default function CompareBar() {
  const { lang, t } = useLanguage()
  const compare = useCompare()
  const [open, setOpen] = useState(false)
  if (compare.entries.length === 0) return null

  return (
    <div className="compare-bar">
      <div className="compare-bar__tools">
        <p>
          {t.compare.title} ({compare.entries.length})
        </p>
        <button type="button" className="site-cta site-cta--solid" onClick={() => setOpen((value) => !value)}>
          {open ? t.compare.hide : t.compare.show}
        </button>
        <button type="button" className="site-cta" onClick={compare.clear}>
          {t.compare.clear}
        </button>
      </div>
      {compare.notice === 'limit' ? <p className="compare-bar__note">{t.compare.limit}</p> : null}
      {open ? (
        <div className="compare-panel" role="region" aria-label={t.compare.title}>
          <p>{t.compare.note}</p>
          <div className="compare-panel__grid">
            {compare.entries.map((entry) => (
              <article key={`${entry.kind}-${entry.id}`}>
                <h3>
                  <Link to={entry.path}>{entry.name[lang]}</Link>
                </h3>
                <p>
                  {entry.city[lang]} · {entry.kindLabel[lang]}
                </p>
                <p>
                  {t.compare.phone}: {entry.phone || t.compare.unpublished}
                </p>
                <p>
                  {t.compare.price}: {entry.price[lang] || t.compare.unpublished}
                </p>
                {entry.funded == null ? null : (
                  <p>
                    {t.compare.funding}: {entry.funded ? t.card.funded : t.compare.notMarked}
                  </p>
                )}
                <button type="button" className="text-button" onClick={() => compare.remove(entry.kind, entry.id)}>
                  {t.compare.remove}
                </button>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
