import { APIProvider, Map, Marker, useApiIsLoaded, useMap } from '@vis.gl/react-google-maps'
import L from 'leaflet'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.tsx'
import { googleAreaUrl, googleMapsApiKey, telHref } from '../lib/centers.ts'
import type { Center } from '../types/center.ts'
import RatingStars from './RatingStars.tsx'
import SafeImage from './SafeImage.tsx'
import 'leaflet/dist/leaflet.css'

type CentersMapProps = {
  centers: Center[]
  highlightedId: string | null
  selectedId: string | null
  onSelect: (id: string) => void
  onClear: () => void
}

const ISRAEL = { lat: 31.4, lng: 35 }

const MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#efebe5' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#4a4a4a' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#d5ddd8' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
]

function pinIcon(active: boolean): google.maps.Symbol {
  return {
    path: google.maps.SymbolPath.CIRCLE,
    scale: active ? 12 : 9,
    fillColor: active ? '#f05a24' : '#111111',
    fillOpacity: 1,
    strokeColor: '#ffffff',
    strokeWeight: 2,
  }
}

function GooglePins({
  centers,
  highlightedId,
  selectedId,
  onSelect,
}: Omit<CentersMapProps, 'onClear'>) {
  const map = useMap()
  const loaded = useApiIsLoaded()
  const fittedKey = useRef('')
  const centersRef = useRef(centers)

  useEffect(() => {
    centersRef.current = centers
  }, [centers])

  useEffect(() => {
    if (!map) return
    const key = centers.map((center) => center.id).join('|')
    if (fittedKey.current === key) return
    fittedKey.current = key
    if (centers.length === 1) {
      map.setCenter({ lat: centers[0].lat, lng: centers[0].lng })
      map.setZoom(14)
      return
    }
    if (centers.length === 0) {
      map.setCenter(ISRAEL)
      map.setZoom(8)
      return
    }
    const bounds = new google.maps.LatLngBounds()
    centers.forEach((center) => bounds.extend({ lat: center.lat, lng: center.lng }))
    map.fitBounds(bounds, 64)
  }, [map, centers])

  useEffect(() => {
    if (!map || !selectedId) return
    const center = centersRef.current.find((item) => item.id === selectedId)
    if (!center) return
    map.panTo({ lat: center.lat, lng: center.lng })
  }, [map, selectedId])

  if (!loaded) return null

  return (
    <>
      {centers.map((center) => (
        <Marker
          key={center.id}
          position={{ lat: center.lat, lng: center.lng }}
          title={center.name.en}
          icon={pinIcon(center.id === highlightedId)}
          onClick={() => onSelect(center.id)}
        />
      ))}
    </>
  )
}

function LeafletCanvas({
  centers,
  highlightedId,
  selectedId,
  onSelect,
}: Omit<CentersMapProps, 'onClear'>) {
  const nodeRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const groupRef = useRef<L.LayerGroup | null>(null)
  const fittedKey = useRef('')
  const onSelectRef = useRef(onSelect)
  const centersRef = useRef(centers)

  useEffect(() => {
    onSelectRef.current = onSelect
  }, [onSelect])

  useEffect(() => {
    centersRef.current = centers
  }, [centers])

  useEffect(() => {
    const node = nodeRef.current
    if (!node) return
    const map = L.map(node, { scrollWheelZoom: true })
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map)
    groupRef.current = L.layerGroup().addTo(map)
    mapRef.current = map
    const frame = window.requestAnimationFrame(() => map.invalidateSize())
    return () => {
      window.cancelAnimationFrame(frame)
      map.remove()
      mapRef.current = null
      groupRef.current = null
      fittedKey.current = ''
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    const group = groupRef.current
    if (!map || !group) return
    group.clearLayers()
    centers.forEach((center) => {
      const active = center.id === highlightedId
      L.circleMarker([center.lat, center.lng], {
        radius: active ? 12 : 8,
        color: '#ffffff',
        weight: 2,
        fillColor: active ? '#f05a24' : '#111111',
        fillOpacity: 1,
      })
        .on('click', () => onSelectRef.current(center.id))
        .addTo(group)
    })

    const key = centers.map((center) => center.id).join('|')
    if (fittedKey.current === key) return
    fittedKey.current = key
    if (centers.length === 1) {
      map.setView([centers[0].lat, centers[0].lng], 14)
      return
    }
    if (centers.length === 0) {
      map.setView([ISRAEL.lat, ISRAEL.lng], 8)
      return
    }
    map.fitBounds(
      L.latLngBounds(centers.map((center) => [center.lat, center.lng])),
      { padding: [36, 36], maxZoom: 12 },
    )
  }, [centers, highlightedId])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !selectedId) return
    const center = centersRef.current.find((item) => item.id === selectedId)
    if (!center) return
    map.panTo([center.lat, center.lng])
  }, [selectedId])

  return <div ref={nodeRef} className="centers-map__canvas" />
}

export default function CentersMap({
  centers,
  highlightedId,
  selectedId,
  onSelect,
  onClear,
}: CentersMapProps) {
  const { lang, t } = useLanguage()
  const apiKey = googleMapsApiKey()
  const selected = centers.find((center) => center.id === selectedId) ?? null

  return (
    <div className="centers-map">
      <div className="centers-map__toolbar">
        <p>{apiKey ? t.map.google : t.map.osm}</p>
        <a href={googleAreaUrl(centers)} target="_blank" rel="noreferrer">
          {t.map.open}
        </a>
      </div>
      <div className="centers-map__frame">
        {apiKey ? (
          <APIProvider apiKey={apiKey}>
            <Map
              defaultCenter={ISRAEL}
              defaultZoom={8}
              gestureHandling="cooperative"
              disableDefaultUI
              zoomControl
              styles={MAP_STYLES}
              style={{ width: '100%', height: '100%' }}
            >
              <GooglePins
                centers={centers}
                highlightedId={highlightedId}
                selectedId={selectedId}
                onSelect={onSelect}
              />
            </Map>
          </APIProvider>
        ) : (
          <LeafletCanvas
            centers={centers}
            highlightedId={highlightedId}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        )}
        {selected ? (
          <article className="centers-map__card">
            <SafeImage src={selected.images[0]} alt="" />
            <div>
              <p className="kicker">{selected.city[lang]}</p>
              <h3>
                <Link to={`/centers/${selected.slug}`}>{selected.name[lang]}</Link>
              </h3>
              {selected.googleRating != null ? (
                <RatingStars
                  rating={selected.googleRating}
                  count={selected.googleReviewCount ?? undefined}
                  label={t.detail.rating}
                />
              ) : null}
              <div className="centers-map__card-actions">
                <Link to={`/centers/${selected.slug}#tour`}>{t.card.bookTour}</Link>
                {selected.phone ? <a href={telHref(selected.phone)}>{t.card.call}</a> : null}
                <button type="button" onClick={onClear}>
                  {t.map.close}
                </button>
              </div>
            </div>
          </article>
        ) : null}
      </div>
    </div>
  )
}
