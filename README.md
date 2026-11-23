# GMILA

Directory of rehab centers in Israel. The first list is taken from the centers’ public sites and from government directories. A field those pages did not publish is left blank.

## Run

```bash
npm install
npm run dev
```

## Centers

Edit `src/data/centers.ts`. Leave a field blank when the source page does not publish it. Do not fill in a Google rating that was not published.

## Google Maps

Copy `.env.example` to `.env` and set `VITE_GOOGLE_MAPS_API_KEY`.

Without a key, the on-site map uses OpenStreetMap. Every center still has a link that opens Google Maps.

## Search

The directory is for Israel. Hebrew is at /he/ and English at /en/. Each page has hreflang links to the other language, and x-default points at Hebrew. An address without a language prefix redirects to Hebrew.

Set `VITE_SITE_URL` to the public origin, with no trailing slash, before a production build. A `.co.il` host matches the audience. The build then writes `sitemap.xml` (an index) plus `sitemap-listings.xml`, `sitemap-locations.xml`, and `sitemap-articles.xml`, and adds the index to `robots.txt`. Each URL’s `lastmod` is the day its source file was last committed, or the day it was saved if that file has uncommitted edits.

Guide pages live at `/he/guides/` and `/en/guides/`. Rehab topics live at `/he/rehab/:slug/` and `/en/rehab/:slug/`. Text search is marked `noindex`.
