import Link from './LocaleLink.tsx'
import { useCompare, type CompareEntry } from '../context/CompareContext.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'
import { telHref } from '../lib/centers.ts'
import { trackConversion } from '../lib/conversions.ts'

type ListingActionsProps = {
  entry: CompareEntry
  /** A path on this site, a #hash on this page, or a mailto link. */
  contactTo: string
}

export default function ListingActions({ entry, contactTo }: ListingActionsProps) {
  const { lang, t } = useLanguage()
  const compare = useCompare()
  const selected = compare.has(entry.kind, entry.id)
  const listing = { id: entry.id, type: entry.kind, name: entry.name[lang] }
  const contactClass = 'site-cta site-cta--solid'
  const onContact = () => trackConversion('contact', listing)

  return (
    <>
      {contactTo.startsWith('/') ? (
        <Link className={contactClass} to={contactTo} onClick={onContact}>
          {t.card.contact}
        </Link>
      ) : (
        <a className={contactClass} href={contactTo} onClick={onContact}>
          {t.card.contact}
        </a>
      )}
      {entry.phone ? (
        <a className="site-cta" href={telHref(entry.phone)} onClick={() => trackConversion('call', listing)}>
          {t.card.call}
        </a>
      ) : null}
      <button
        type="button"
        className="site-cta"
        aria-pressed={selected}
        onClick={() => {
          if (compare.toggle(entry)) trackConversion('compare', listing)
        }}
      >
        {selected ? t.card.compared : t.card.compare}
      </button>
    </>
  )
}
