import { useEffect, useState } from 'react'

const FALLBACK = '/images/place-a.svg'

type SafeImageProps = {
  src: string
  alt: string
}

export default function SafeImage({ src, alt }: SafeImageProps) {
  const [current, setCurrent] = useState(src)

  useEffect(() => {
    setCurrent(src)
  }, [src])

  return (
    <img
      src={current}
      alt={alt}
      onError={() => {
        if (current !== FALLBACK) setCurrent(FALLBACK)
      }}
    />
  )
}
