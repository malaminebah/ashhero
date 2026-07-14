import type MaterialIcons from '@expo/vector-icons/MaterialIcons'

export type PremiumPlanId = 'monthly' | 'annual'

export type PremiumIconName = keyof typeof MaterialIcons.glyphMap

export type PremiumFeature = {
  key: string
  icon: PremiumIconName
  title: string
  description: string
}

export type PremiumPlan = {
  id: PremiumPlanId
  label: string
  priceLabel: string
  periodLabel: string
  badge?: string
}

export type PaywallPlanCardParams = {
  plan: PremiumPlan
  selected: boolean
  onSelect: () => void
}

export type PaywallFeatureRowParams = {
  feature: PremiumFeature
}

export type PaywallScreenBodyParams = Record<string, never>
