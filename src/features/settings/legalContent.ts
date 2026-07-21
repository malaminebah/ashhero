import type { LegalDocument, LegalSlug } from './types'

export const LEGAL_DOCUMENTS: Record<LegalSlug, LegalDocument> = {
  terms: {
    slug: 'terms',
    title: "Conditions d'utilisation",
    updatedAt: '23 juin 2026',
    paragraphs: [
      "AshHero est une application d'accompagnement pour réduire ou arrêter la consommation de nicotine. Elle ne remplace pas un avis médical.",
      "En utilisant l'application, tu t'engages à fournir des informations sincères lors de l'onboarding et à utiliser le service à des fins personnelles.",
      "Le contenu gamifié (combat, XP, badges) vise à motiver des comportements sains. Les résultats varient selon chaque personne.",
      "Nous pouvons faire évoluer les fonctionnalités ou suspendre un compte en cas d'usage abusif ou frauduleux.",
      "Pour toute question : contact@ashhero.app",
    ],
  },
  privacy: {
    slug: 'privacy',
    title: 'Politique de confidentialité',
    updatedAt: '21 juillet 2026',
    paragraphs: [
      "Nous collectons les données nécessaires au suivi de ta progression : profil, date d'arrêt, type de consommation, combats, humeur et préférences.",
      "Les données sont hébergées via Firebase (Google Cloud). Elles sont associées à ton compte et ne sont pas vendues à des tiers.",
      "Tu peux supprimer définitivement ton compte et toutes tes données depuis l'application (Réglages → Compte → Supprimer mon compte) ou par e-mail.",
      "Nous n'utilisons pas de publicité ciblée. Les analytics produit, s'ils sont activés plus tard, seront soumis à ton consentement.",
      "Contact DPO / confidentialité : privacy@ashhero.app",
    ],
  },
  rules: {
    slug: 'rules',
    title: 'Règles du jeu',
    updatedAt: '23 juin 2026',
    paragraphs: [
      "Chaque jour, tu peux affronter l'Envie en combat. Tu disposes de plusieurs actions : Respirer, Boire de l'eau, Se distraire et une attaque spéciale débloquée après 7 jours de série.",
      "Respirer lance une séance guidée de 3 inspirations (compte à rebours 3-2-1, inspire, expire). Les autres actions sont instantanées.",
      "Chaque action réussie inflige des dégâts au boss et te rapporte de l'XP. Le boss riposte après ton tour si tu ne l'as pas vaincu.",
      "Tes points de vie et ceux du boss sont affichés en haut de l'arène. Tu perds si tes PV tombent à zéro ; tu gagnes de l'XP en cas de victoire.",
      "Les badges, jalons et niveaux reflètent ta régularité. Un écart (rechute) est enregistré sans jugement — l'objectif est la progression, pas la perfection.",
    ],
  },
}

export function getLegalDocument(slug: string): LegalDocument | null {
  if (slug in LEGAL_DOCUMENTS) {
    return LEGAL_DOCUMENTS[slug as LegalSlug]
  }
  return null
}

const HOSTED_LEGAL_SLUGS: LegalSlug[] = ['privacy', 'terms']

/** Firebase Hosting default URL — same project as EXPO_PUBLIC_FIREBASE_PROJECT_ID. */
export function getPublicLegalUrl(slug: LegalSlug): string | null {
  const projectId = process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID?.trim()
  if (!projectId || !HOSTED_LEGAL_SLUGS.includes(slug)) return null
  return `https://${projectId}.web.app/${slug}/`
}
