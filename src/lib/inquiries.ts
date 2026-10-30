export type ContactMethod = 'phone' | 'whatsapp' | 'email'

export type InquiryInput = {
  centerId: string | null
  centerName: string | null
  name: string
  phone: string
  email: string
  contactMethod: ContactMethod
  message: string
}

export type Inquiry = InquiryInput & {
  id: string
  createdAt: string
}

const STORAGE_KEY = 'gmila-inquiries'

export function readInquiries(): Inquiry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Inquiry[]) : []
  } catch {
    return []
  }
}

/** Saves the lead on this device until a delivery endpoint is connected. */
export function saveInquiry(input: InquiryInput): Inquiry {
  const record: Inquiry = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  const next = [record, ...readInquiries()]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return record
}
