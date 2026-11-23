import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { Localized } from '../types/center.ts'

export type CompareKind = 'center' | 'therapist'

const LIMIT = 3
const STORAGE_KEY = 'gmila-compare'

export type CompareEntry = {
  kind: CompareKind
  id: string
  name: Localized
  city: Localized
  kindLabel: Localized
  phone: string
  price: Localized
  funded: boolean | null
  path: string
}

type CompareContextValue = {
  entries: CompareEntry[]
  notice: string
  has: (kind: CompareKind, id: string) => boolean
  /** True when the listing was added. False when it was removed or the list is already full. */
  toggle: (entry: CompareEntry) => boolean
  remove: (kind: CompareKind, id: string) => void
  clear: () => void
}

const CompareContext = createContext<CompareContextValue | null>(null)

function isEntry(value: unknown): value is CompareEntry {
  if (!value || typeof value !== 'object') return false
  const entry = value as CompareEntry
  return (entry.kind === 'center' || entry.kind === 'therapist') && typeof entry.id === 'string' && typeof entry.path === 'string'
}

export function CompareProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<CompareEntry[]>([])
  const [ready, setReady] = useState(false)
  const [notice, setNotice] = useState('')
  const entriesRef = useRef(entries)
  entriesRef.current = entries

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      const parsed: unknown = raw ? JSON.parse(raw) : []
      if (Array.isArray(parsed)) setEntries(parsed.filter(isEntry).slice(0, LIMIT))
    } catch {
      setEntries([])
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }, [entries, ready])

  const value = useMemo<CompareContextValue>(() => {
    return {
      entries,
      notice,
      has: (kind, id) => entries.some((entry) => entry.kind === kind && entry.id === id),
      toggle: (entry) => {
        const current = entriesRef.current
        if (current.some((item) => item.kind === entry.kind && item.id === entry.id)) {
          setEntries(current.filter((item) => item.kind !== entry.kind || item.id !== entry.id))
          setNotice('')
          return false
        }
        if (current.length >= LIMIT) {
          setNotice('limit')
          return false
        }
        setEntries([...current, entry])
        setNotice('')
        return true
      },
      remove: (kind, id) => {
        setEntries(entriesRef.current.filter((item) => item.kind !== kind || item.id !== id))
      },
      clear: () => {
        setEntries([])
        setNotice('')
      },
    }
  }, [entries, notice])

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
}

export function useCompare(): CompareContextValue {
  const value = useContext(CompareContext)
  if (!value) throw new Error('Compare is only available inside the directory')
  return value
}
