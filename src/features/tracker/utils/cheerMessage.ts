export const getCheerMessage = (dayCount: number): string => {
  if (dayCount >= 60) return 'Tu es une légende !'
  if (dayCount >= 30) return 'Un mois — incroyable !'
  if (dayCount >= 14) return 'Tu assures !'
  if (dayCount >= 7) return 'Belle série !'
  if (dayCount >= 3) return 'Continue comme ça !'
  if (dayCount >= 1) return 'Chaque jour compte.'
  return 'Prêt pour l’aventure ?'
}
