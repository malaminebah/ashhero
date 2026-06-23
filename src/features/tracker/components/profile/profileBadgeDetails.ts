import type { ProfileBadgeStats } from './badgeRules'
import { PROFILE_BADGES } from './badgeRules'

export type ProfileBadgeDetail = {
  title: string
  summary: string
  backBody: string
}

export const PROFILE_BADGE_DETAILS: Record<string, ProfileBadgeDetail> = {
  jour1: {
    title: 'Premier pas',
    summary: '24 h sans vape — tu as lancé la partie.',
    backBody:
      'Le premier jour prouve que tu peux tenir une journée entière. Chaque heure sans nicotine, ton corps respire un peu mieux.',
  },
  jours3: {
    title: 'Trois jours solides',
    summary: 'Tu passes le cap des 72 h.',
    backBody:
      'La nicotine quitte ton sang. Les envies sont fortes mais tu as déjà survécu au pic le plus dur.',
  },
  sem1: {
    title: 'Une semaine',
    summary: '7 jours — une vraie semaine de combat gagnée.',
    backBody:
      'Goût et odorat reviennent. Tu construis une routine sans vapoter au réveil ou au stress.',
  },
  sem2: {
    title: 'Deux semaines',
    summary: '14 jours de discipline.',
    backBody:
      'Circulation et souffle s’améliorent. Ton cerveau réapprend à vivre sans dose régulière de nicotine.',
  },
  mois1: {
    title: 'Un mois libre',
    summary: '30 jours — un mois complet sans vape.',
    backBody:
      'Les automatismes faiblissent. Toux et irritation diminuent souvent : tes poumons reprennent du terrain.',
  },
  combat1: {
    title: 'Première victoire',
    summary: 'Tu as gagné ton premier combat contre le boss.',
    backBody:
      'Chaque victoire renforce ta confiance. Tu prouves que tu peux résister quand la pression monte.',
  },
  combat3: {
    title: 'Combattant',
    summary: '3 combats gagnés — tu connais la tactique.',
    backBody:
      'Tu apprends à repousser les envies au bon moment. La régularité compte plus qu’un coup de chance.',
  },
  combat10: {
    title: 'Vétéran',
    summary: '10 victoires — tu maîtrises l’arène.',
    backBody:
      'Tu sais encaisser les coups et counter-attaque. Le boss perd de son emprise sur ton quotidien.',
  },
  niv3: {
    title: 'Niveau 3',
    summary: 'Ton héros monte en puissance.',
    backBody:
      'Plus de niveau, plus d’XP accumulée par ta sobriété. Tu progresses dans le jeu et dans la vraie vie.',
  },
  niv5: {
    title: 'Niveau 5',
    summary: 'Milieu de parcours — tu tiens la route.',
    backBody:
      'Les habitudes sans vape se stabilisent. Chaque niveau reflète des jours où tu as choisi ta santé.',
  },
  niv10: {
    title: 'Niveau 10',
    summary: 'Élite — tu es un exemple pour ton personnage.',
    backBody:
      'Longévité et constance. Tu as transformé la progression RPG en preuve concrète de ta détermination.',
  },
  xp500: {
    title: '500 XP',
    summary: 'Une montagne d’expérience gagnée sans rechute.',
    backBody:
      'Chaque jour sans vape, chaque combat gagné alimente ta barre. 500 XP, c’est du temps investi pour toi.',
  },
  xp2000: {
    title: '2000 XP',
    summary: 'Tu as farmé la sobriété comme un pro.',
    backBody:
      '2000 XP reflètent des semaines de choix répétés. Ta progression est visible — garde le cap.',
  },
  eco50: {
    title: '50 € économisés',
    summary: 'L’argent de la vape reste dans ta poche.',
    backBody:
      '50 € que tu ne dépenses plus en pods ou liquides. Investis-les dans quelque chose qui te fait du bien.',
  },
  eco200: {
    title: '200 € économisés',
    summary: 'Un budget sérieux récupéré.',
    backBody:
      '200 € économisés montrent l’impact financier réel de la dépendance. C’est une récompense tangible de ta santé.',
  },
}

export const getProfileBadgeById = (id: string) => PROFILE_BADGES.find((b) => b.id === id)

export const getProfileBadgeDetail = (id: string): ProfileBadgeDetail | undefined =>
  PROFILE_BADGE_DETAILS[id]

export const getProfileBadgeProgressHint = (
  badgeId: string,
  stats: ProfileBadgeStats
): string | null => {
  const badge = getProfileBadgeById(badgeId)
  if (!badge || badge.isUnlocked(stats)) return null

  switch (badgeId) {
    case 'jour1':
      return 'Encore 1 jour sans vape'
    case 'jours3':
      return `Encore ${Math.max(0, 3 - stats.dayCount)} jour(s)`
    case 'sem1':
      return `Encore ${Math.max(0, 7 - stats.dayCount)} jour(s)`
    case 'sem2':
      return `Encore ${Math.max(0, 14 - stats.dayCount)} jour(s)`
    case 'mois1':
      return `Encore ${Math.max(0, 30 - stats.dayCount)} jour(s)`
    case 'combat1':
      return 'Gagne 1 combat'
    case 'combat3':
      return `Encore ${Math.max(0, 3 - stats.combatsWon)} combat(s)`
    case 'combat10':
      return `Encore ${Math.max(0, 10 - stats.combatsWon)} combat(s)`
    case 'niv3':
      return `Atteins le niveau 3 (niv. ${stats.level})`
    case 'niv5':
      return `Atteins le niveau 5 (niv. ${stats.level})`
    case 'niv10':
      return `Atteins le niveau 10 (niv. ${stats.level})`
    case 'xp500':
      return `Encore ${Math.max(0, 500 - stats.xp)} XP`
    case 'xp2000':
      return `Encore ${Math.max(0, 2000 - stats.xp)} XP`
    case 'eco50':
      return `Encore ${Math.max(0, 50 - stats.moneySaved).toFixed(0)} €`
    case 'eco200':
      return `Encore ${Math.max(0, 200 - stats.moneySaved).toFixed(0)} €`
    default:
      return null
  }
}
