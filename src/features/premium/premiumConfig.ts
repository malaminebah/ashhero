import type { PremiumFeature, PremiumPlan } from './types'

export const PREMIUM_PLANS: PremiumPlan[] = [
  {
    id: 'monthly',
    label: 'Mensuel',
    priceLabel: '5,99 €',
    periodLabel: '/ mois',
  },
  {
    id: 'annual',
    label: 'Annuel',
    priceLabel: '49,99 €',
    periodLabel: '/ an',
    badge: '−30 %',
  },
]

export const PREMIUM_FEATURES: PremiumFeature[] = [
  {
    key: 'mood-notes',
    icon: 'edit-note',
    title: 'Notes d\'humeur',
    description: 'Ajoute un journal à chaque suivi pour mieux comprendre tes déclencheurs.',
  },
  {
    key: 'avatars',
    icon: 'face-retouching-natural',
    title: 'Personnages & avatars',
    description: 'Débloque plus de skins et d\'assets pour personnaliser ton héros.',
  },
  {
    key: 'goals',
    icon: 'flag',
    title: 'Objectifs perso',
    description: 'Fixe tes propres jalons, défis et rappels — à ton rythme.',
  },
  {
    key: 'stats',
    icon: 'insights',
    title: 'Stats avancées',
    description: 'Analyses détaillées de ta progression, rechutes et victoires.',
  },
  {
    key: 'themes',
    icon: 'palette',
    title: 'Thèmes & ambiance',
    description: 'Personnalise les couleurs et l\'ambiance de ton espace coach.',
  },
]

export const PAYWALL_COPY = {
  title: 'AshHero Pro',
  subtitle: 'Passe au niveau supérieur. Ton parcours, ta façon.',
  ctaSubscribe: 'S\'abonner',
  ctaActive: 'Abonnement actif',
  restore: 'Restaurer mes achats',
  continueFree: 'Continuer gratuitement',
  legal:
    'Abonnement renouvelé automatiquement. Résiliable à tout moment depuis les réglages de l\'App Store ou Google Play. Paiement via ton compte store à la confirmation.',
} as const
