import { useEffect, useState } from 'react'
import { optimizedImages } from '../lib/optimizedImages.ts'

const FALLBACK = '/images/place-a.svg'

type SafeImageProps = {
  src: string
  alt: string
  priority?: boolean
}

export default function SafeImage({ src, alt, priority = false }: SafeImageProps) {
  const [current, setCurrent] = useState(src)

  useEffect(() => {
    setCurrent(src)
  }, [src])

  const optimized = current === src ? optimizedImages[src] : undefined
  const loading = priority ? 'eager' : 'lazy'
  const fetchPriority = priority ? 'high' : 'low'

  function onError() {
    if (current !== FALLBACK) setCurrent(FALLBACK)
  }

  if (optimized) {
    return (
      <picture>
        <source type="image/avif" srcSet={optimized.avif} />
        <source type="image/webp" srcSet={optimized.webp} />
        <img
          src={optimized.webp}
          alt={alt}
          width={optimized.width}
          height={optimized.height}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          onError={onError}
        />
      </picture>
    )
  }

  return (
    <img
      src={current}
      alt={alt}
      width={1200}
      height={750}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      onError={onError}
    />
  )
}
