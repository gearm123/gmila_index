import { useParams } from 'react-router-dom'
import { topicBySlug } from '../seo/topics.ts'
import MissingPage from './MissingPage.tsx'
import TherapistDetailPage from './TherapistDetailPage.tsx'
import TopicPage from './TopicPage.tsx'

/** A therapy-method address and a person address share /therapists/:slug/. */
export default function TherapistSlugPage() {
  const { slug, page } = useParams()
  if (topicBySlug(slug, 'therapy')) return <TopicPage group="therapy" />
  if (page) return <MissingPage />
  return <TherapistDetailPage />
}
