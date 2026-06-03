export type SmokingType = 'cigarette' | 'vape'
export type OnboardingData = {
  smokingType: SmokingType | null
  quantityPerDay: number | null
  pricePerUnit: number | null
  /** Vape: reference bottle volume (ml), e.g. 50 */
  vapeBottleVolumeMl: number | null
  /** Vape: bottle price (€), e.g. 9 */
  vapeBottlePriceEuro: number | null
  /** Vape: estimated consumption before quit (ml / week) */
  vapeMlPerWeek: number | null
  quitDate: Date | null
  isFirstTime: boolean| null
}

export type OnboardingChoiceVariant = 'primary' | 'outline'

export type OnboardingHeaderParams = {
  step: number
  title: string
  subtitle?: string
}

export type OnboardingPrimaryButtonParams = {
  label: string
  onPress: () => void
}

export type OnboardingChoiceCardParams = {
  emoji?: string
  label: string
  variant?: OnboardingChoiceVariant
  onPress: () => void
}
