export const invitation = {
  couple: 'Sweta & Prem',
  message: 'Together with our families, we invite you to celebrate our engagement.',
  date: 'Sunday, 18 November 2026',
  time: '1:00 PM onwards',
  venue: 'Janakpuri Resort',
  address: 'Aurangabad, Bihar',
  closing: 'Your presence will make our celebration even more special.',
} as const

export type Invitation = typeof invitation

export const eventDetails = [
  { label: 'Date', value: invitation.date },
  { label: 'Time', value: invitation.time },
  { label: 'Venue', value: invitation.venue },
  { label: 'Address', value: invitation.address },
] as const

export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

export function easeOut(value: number) {
  return 1 - Math.pow(1 - value, 3)
}

export function reveal(value: number, start: number, end: number) {
  return easeOut(clamp((value - start) / (end - start)))
}
