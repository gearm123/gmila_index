import { useLayoutEffect, useState } from 'react'

export const MOBILE_QUERY = '(max-width: 820px)'

export type UiMode = 'browser' | 'mobile'

export function readUiMode(): UiMode {
  if (typeof window === 'undefined') return 'browser'
  return window.matchMedia(MOBILE_QUERY).matches ? 'mobile' : 'browser'
}

export function applyViewport(mode: UiMode = readUiMode()) {
  document.documentElement.dataset.ui = mode
  return mode
}

export function useViewport(): UiMode {
  const [mode, setMode] = useState<UiMode>(readUiMode)

  useLayoutEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY)
    const sync = () => setMode(applyViewport(media.matches ? 'mobile' : 'browser'))
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  return mode
}
