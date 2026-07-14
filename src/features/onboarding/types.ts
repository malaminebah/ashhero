import type MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import type { ComponentProps } from 'react'

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
  /** Approximate years of use — midpoint of the chosen range (profileFacts.YEARS_OPTIONS). */
  yearsUsing: number | null
  /** Craving trigger ids (profileFacts.TRIGGERS). */
  triggers: string[]
  /** Motivation ids (profileFacts.MOTIVATIONS). */
  motivations: string[]
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
  disabled?: boolean
  loading?: boolean
}

export type OnboardingSecondaryButtonParams = {
  label: string
  onPress: () => void
  disabled?: boolean
}

export type OnboardingChoiceIcon = ComponentProps<typeof MaterialCommunityIcons>['name']

export type OnboardingChoiceCardParams = {
  icon?: OnboardingChoiceIcon
  label: string
  variant?: OnboardingChoiceVariant
  /** Toggle mode — shows a check circle instead of a chevron. */
  selected?: boolean
  onPress: () => void
}
