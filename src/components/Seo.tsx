import { useEffect } from 'react'

type SeoProps = {
  title: string
  description?: string
}

export default function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    document.title = title
    if (!description) return
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', description)
  }, [title, description])

  return null
}
