export const invitation = {
  couple: 'श्वेता और प्रेम',
  message: 'अपने परिवारों के साथ, हम आपको अपनी सगाई के शुभ अवसर पर आमंत्रित करते हैं।',
  date: 'रविवार, 18 नवंबर 2026',
  time: 'दोपहर 1:00 बजे से',
  venue: 'जनकपुरी रिज़ॉर्ट',
  address: 'औरंगाबाद, बिहार',
  closing: 'आपकी उपस्थिति हमारे उत्सव को और भी खास बना देगी।',
} as const

export type Invitation = typeof invitation

export const eventDetails = [
  { label: 'दिनांक', value: invitation.date },
  { label: 'समय', value: invitation.time },
  { label: 'स्थान', value: invitation.venue },
  { label: 'पता', value: invitation.address },
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
