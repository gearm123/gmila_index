import Link from './LocaleLink.tsx'
import { listingPagePath } from '../lib/pagination.ts'

type ListingPagesProps = {
  base: string
  page: number
  pages: number
  label: string
  prev: string
  next: string
}

export default function ListingPages({ base, page, pages, label, prev, next }: ListingPagesProps) {
  if (pages <= 1) return null
  const numbers = Array.from({ length: pages }, (_, index) => index + 1)

  return (
    <nav className="pager" aria-label={label}>
      {page > 1 ? (
        <Link to={listingPagePath(base, page - 1)} rel="prev">
          {prev}
        </Link>
      ) : (
        <span className="pager__edge" />
      )}
      <ol>
        {numbers.map((number) => (
          <li key={number}>
            {number === page ? (
              <span aria-current="page">{number}</span>
            ) : (
              <Link to={listingPagePath(base, number)}>{number}</Link>
            )}
          </li>
        ))}
      </ol>
      {page < pages ? (
        <Link to={listingPagePath(base, page + 1)} rel="next">
          {next}
        </Link>
      ) : (
        <span className="pager__edge" />
      )}
    </nav>
  )
}
