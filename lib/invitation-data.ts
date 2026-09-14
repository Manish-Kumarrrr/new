export const invitation = {
  couple: 'स्वेता & प्रेम',
  message: 'अपने परिवार के साथ, हम आपको अपनी सगाई के शुभ अवसर पर आमंत्रित करते हैं।',
 date: 'रविवार, 18 नवंबर 2026',

time: 'दोपहर 1:00 बजे से',

venue: 'जनकपुरी रिज़ॉर्ट',

address: 'औरंगाबाद, बिहार',

closing: 'आपकी उपस्थिति हमारे इस उत्सव को और भी विशेष बनाएगी।'
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
