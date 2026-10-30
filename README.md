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
