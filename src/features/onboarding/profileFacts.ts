import type { OnboardingChoiceIcon } from './types'

/** Shared taxonomy — onboarding capture + profile display. */

export type TriggerFact = {
  id: string
  label: string
  icon: OnboardingChoiceIcon
}

export const TRIGGERS: TriggerFact[] = [
  { id: 'stress', label: 'Le stress', icon: 'lightning-bolt-outline' },
  { id: 'boredom', label: "L'ennui", icon: 'clock-outline' },
  { id: 'coffee', label: 'Café / repas', icon: 'coffee-outline' },
  { id: 'social', label: 'Soirées / alcool', icon: 'glass-cocktail' },
  { id: 'wakeup', label: 'Le réveil', icon: 'weather-sunset-up' },
  { id: 'work', label: 'Pauses au travail', icon: 'briefcase-outline' },
]

export type MotivationFact = {
  id: string
  label: string
  icon: OnboardingChoiceIcon
}

export const MOTIVATIONS: MotivationFact[] = [
  { id: 'health', label: 'Ma santé', icon: 'heart-outline' },
  { id: 'money', label: 'Mon argent', icon: 'piggy-bank-outline' },
  { id: 'family', label: 'Mes proches', icon: 'account-group-outline' },
  { id: 'freedom', label: 'Ma liberté', icon: 'bird' },
  { id: 'sport', label: 'Mon souffle / le sport', icon: 'run' },
  { id: 'looks', label: 'Mon apparence', icon: 'emoticon-happy-outline' },
]

export type YearsOption = {
  /** Stored value — approximate midpoint in years. */
  value: number
  label: string
}

export const YEARS_OPTIONS: YearsOption[] = [
  { value: 0.5, label: 'Moins d’un an' },
  { value: 2, label: '1 à 3 ans' },
  { value: 4, label: '3 à 5 ans' },
  { value: 7, label: '5 à 10 ans' },
  { value: 12, label: 'Plus de 10 ans' },
]

export const getTrigger = (id: string) => TRIGGERS.find((t) => t.id === id)
export const getMotivation = (id: string) => MOTIVATIONS.find((m) => m.id === id)
export const getYearsLabel = (value: number | null): string | null =>
  YEARS_OPTIONS.find((y) => y.value === value)?.label ?? null
