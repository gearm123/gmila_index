export type ConversionAction = 'contact' | 'call' | 'compare'

export type ConversionListing = {
  id: string
  type: 'center' | 'therapist'
  name: string
}

type DataLayerEvent = {
  event: 'listing_conversion'
  conversion_action: ConversionAction
  conversion_step: 'click' | 'submit'
  listing_id: string
  listing_type: ConversionListing['type']
  listing_name: string
}

/** A contact, call, or compare action. GTM can mark listing_conversion as a conversion. */
export function trackConversion(action: ConversionAction, listing: ConversionListing, step: 'click' | 'submit' = 'click') {
  if (typeof window === 'undefined') return
  const payload: DataLayerEvent = {
    event: 'listing_conversion',
    conversion_action: action,
    conversion_step: step,
    listing_id: listing.id,
    listing_type: listing.type,
    listing_name: listing.name,
  }
  const host = window as Window & { dataLayer?: DataLayerEvent[] }
  host.dataLayer = host.dataLayer ?? []
  host.dataLayer.push(payload)
}
