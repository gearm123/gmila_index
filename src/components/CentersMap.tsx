import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import type { CentersMapProps } from './CentersMapCanvas.tsx'

const CentersMapCanvas = lazy(() => import('./CentersMapCanvas.tsx'))

function MapFrame() {
  return (
    <div className="centers-map">
      <div className="centers-map__frame">
        <div className="centers-map__canvas" />
      </div>
    </div>
  )
}

/** The map canvas needs a browser. It stays out of the first render, and out of the download until it is near the screen. */
export default function CentersMap(props: CentersMapProps) {
  const [ready, setReady] = useState(false)
  const holder = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = holder.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setReady(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        setReady(true)
        observer.disconnect()
      },
      { rootMargin: '240px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  if (!ready) {
    return (
      <div ref={holder}>
        <MapFrame />
      </div>
    )
  }

  return (
    <Suspense fallback={<MapFrame />}>
      <CentersMapCanvas {...props} />
    </Suspense>
  )
}
