type RatingStarsProps = {
  rating: number
  count?: number
  label: string
  reviewsLabel?: string
}

export default function RatingStars({ rating, count, label, reviewsLabel }: RatingStarsProps) {
  const width = `${(Math.max(0, Math.min(5, rating)) / 5) * 100}%`

  return (
    <span className="rating">
      <span className="rating__stars" aria-hidden="true">
        <span className="rating__base">★★★★★</span>
        <span className="rating__fill" style={{ width }}>
          ★★★★★
        </span>
      </span>
      <span className="rating__value">{rating.toFixed(1)}</span>
      {count != null ? (
        <span className="rating__count">
          ({count}
          {reviewsLabel ? ` ${reviewsLabel}` : ''})
        </span>
      ) : null}
      <span className="visually-hidden">
        {label} {rating.toFixed(1)}
        {count != null ? `, ${count}` : ''}
      </span>
    </span>
  )
}
