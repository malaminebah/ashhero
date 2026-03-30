export type SmokingType = 'cigarette' | 'vape'
export type OnboardingData = {
  smokingType: SmokingType | null
  quantityPerDay: number | null
  pricePerUnit: number | null
  /** Vape : volume du flacon de référence (ml), ex. 50 */
  vapeBottleVolumeMl: number | null
  /** Vape : prix du flacon (€), ex. 9 */
  vapeBottlePriceEuro: number | null
  /** Vape : consommation estimée avant arrêt (ml / semaine) */
  vapeMlPerWeek: number | null
  quitDate: Date | null
  isFirstTime: boolean| null
}
