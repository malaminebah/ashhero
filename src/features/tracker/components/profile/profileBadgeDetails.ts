import type { ProfileBadgeStats } from './badgeRules'
import { PROFILE_BADGES } from './badgeRules'

export type ProfileBadgeDetail = {
  title: string
  summary: string
  backBody: string
  /** Concrete advice or fact shown in the "Le sais-tu ?" card. */
  tip: string
}

export const PROFILE_BADGE_DETAILS: Record<string, ProfileBadgeDetail> = {
  jour1: {
    title: 'Premier pas',
    summary: '24 h sans vape — tu as lancé la partie.',
    backBody:
      'Le premier jour prouve que tu peux tenir une journée entière. Chaque heure sans nicotine, ton corps respire un peu mieux.',
    tip:
      'Les premières 24 h, l\'envie dure rarement plus de 3 minutes. Bois un verre d\'eau ou lance un combat — elle passera.',
  },
  jours3: {
    title: 'Trois jours solides',
    summary: 'Tu passes le cap des 72 h.',
    backBody:
      'La nicotine quitte ton sang. Les envies sont fortes mais tu as déjà survécu au pic le plus dur.',
    tip:
      'Jour 3 = pic de sevrage. Après, la nicotine a quitté ton sang : chaque envie suivante est un écho, pas un besoin.',
  },
  sem1: {
    title: 'Une semaine',
    summary: '7 jours — une vraie semaine de combat gagnée.',
    backBody:
      'Goût et odorat reviennent. Tu construis une routine sans vapoter au réveil ou au stress.',
    tip:
      'Une semaine suffit pour retrouver du goût et de l\'odorat. Teste : un fruit que tu aimes aura déjà plus de saveur.',
  },
  sem2: {
    title: 'Deux semaines',
    summary: '14 jours de discipline.',
    backBody:
      'Circulation et souffle s’améliorent. Ton cerveau réapprend à vivre sans dose régulière de nicotine.',
    tip:
      'À 14 jours, ta circulation s\'améliore nettement. Monte un escalier : ton souffle est déjà différent.',
  },
  mois1: {
    title: 'Un mois libre',
    summary: '30 jours — un mois complet sans vape.',
    backBody:
      'Les automatismes faiblissent. Toux et irritation diminuent souvent : tes poumons reprennent du terrain.',
    tip:
      'Un mois sans vape divise par deux la force des automatismes. Les endroits déclencheurs perdent leur pouvoir.',
  },
  combat1: {
    title: 'Première victoire',
    summary: 'Tu as gagné ton premier combat contre le boss.',
    backBody:
      'Chaque victoire renforce ta confiance. Tu prouves que tu peux résister quand la pression monte.',
    tip:
      'En combat, « Respirer » inflige le plus de dégâts : la cohérence cardiaque est aussi l\'arme la plus efficace en vrai.',
  },
  combat3: {
    title: 'Combattant',
    summary: '3 combats gagnés — tu connais la tactique.',
    backBody:
      'Tu apprends à repousser les envies au bon moment. La régularité compte plus qu’un coup de chance.',
    tip:
      'Lancer un combat dès que l\'envie monte, c\'est remplacer le geste de vapoter par un réflexe qui te renforce.',
  },
  combat10: {
    title: 'Vétéran',
    summary: '10 victoires — tu maîtrises l’arène.',
    backBody:
      'Tu sais encaisser les coups et counter-attaque. Le boss perd de son emprise sur ton quotidien.',
    tip:
      '10 victoires = 10 envies réelles surmontées. Ton cerveau a appris un nouveau chemin — il devient ta valeur par défaut.',
  },
  niv3: {
    title: 'Niveau 3',
    summary: 'Ton héros monte en puissance.',
    backBody:
      'Plus de niveau, plus d’XP accumulée par ta sobriété. Tu progresses dans le jeu et dans la vraie vie.',
    tip:
      'Chaque niveau demande 100 XP. Gagne un combat par jour et tu montes d\'un niveau tous les 3-4 jours.',
  },
  niv5: {
    title: 'Niveau 5',
    summary: 'Milieu de parcours — tu tiens la route.',
    backBody:
      'Les habitudes sans vape se stabilisent. Chaque niveau reflète des jours où tu as choisi ta santé.',
    tip:
      'Au niveau 5, la plupart des joueurs ont déjà passé les pires semaines. La suite est une consolidation.',
  },
  niv10: {
    title: 'Niveau 10',
    summary: 'Élite — tu es un exemple pour ton personnage.',
    backBody:
      'Longévité et constance. Tu as transformé la progression RPG en preuve concrète de ta détermination.',
    tip:
      'Niveau 10 : tu as accumulé ~900 XP de résistance. Statistiquement, ton risque de rechute a fortement chuté.',
  },
  xp500: {
    title: '500 XP',
    summary: 'Une montagne d’expérience gagnée sans rechute.',
    backBody:
      'Chaque jour sans vape, chaque combat gagné alimente ta barre. 500 XP, c’est du temps investi pour toi.',
    tip:
      '500 XP ≈ 15-20 combats gagnés. Chacun correspond à une vraie envie qui ne t\'a pas fait replonger.',
  },
  xp2000: {
    title: '2000 XP',
    summary: 'Tu as farmé la sobriété comme un pro.',
    backBody:
      '2000 XP reflètent des semaines de choix répétés. Ta progression est visible — garde le cap.',
    tip:
      'À ce stade, résister ne te demande presque plus d\'effort conscient. C\'est la définition d\'une habitude vaincue.',
  },
  eco50: {
    title: '50 € économisés',
    summary: 'L’argent de la vape reste dans ta poche.',
    backBody:
      '50 € que tu ne dépenses plus en pods ou liquides. Investis-les dans quelque chose qui te fait du bien.',
    tip:
      '50 € = environ un mois de vape pour un fumeur moyen. Offre-toi quelque chose de concret avec — tu l\'as gagné.',
  },
  eco200: {
    title: '200 € économisés',
    summary: 'Un budget sérieux récupéré.',
    backBody:
      '200 € économisés montrent l’impact financier réel de la dépendance. C’est une récompense tangible de ta santé.',
    tip:
      '200 € par trimestre, c\'est près de 800 € par an. De quoi financer un vrai projet plutôt que des nuages.',
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
