export const DASHBOARD_JALONS = [
  {
    key: '3d',
    label: '3 JOURS',
    hours: 72,
    title: 'Première victoire',
    summary:
      'La nicotine quitte ton sang. Les envies sont fortes, mais c’est le pic le plus dur — tu es déjà en train de gagner.',
    health:
      'Ton rythme cardiaque et ta tension commencent à se stabiliser. Ton corps sort de l’état d’alerte permanent provoqué par la vape.',
  },
  {
    key: '7d',
    label: '7 JOURS',
    hours: 168,
    title: 'Sens retrouvés',
    summary:
      'Une semaine sans vape. Les envies restent possibles, mais elles perdent en intensité jour après jour.',
    health:
      'Goût et odorat s’améliorent. Tu respires un peu mieux : les voies respiratoires sont moins irritées.',
  },
  {
    key: '14d',
    label: '14 JOURS',
    hours: 336,
    title: 'Circulation relancée',
    summary:
      'Deux semaines de sobriété. Ton cerveau réapprend à fonctionner sans nicotine régulière.',
    health:
      'La circulation sanguine s’améliore. Moins d’essoufflement à l’effort, plus d’oxygène pour tes muscles.',
  },
  {
    key: '30d',
    label: '30 JOURS',
    hours: 720,
    title: 'Poumons en réparation',
    summary:
      'Un mois complet. Les automatismes liés à la vape commencent à faiblir.',
    health:
      'Les poumons reprennent du terrain : toux et sifflements diminuent souvent. Les cils pulmonaires reprennent leur travail de nettoyage.',
  },
  {
    key: '60d',
    label: '60 JOURS',
    hours: 1440,
    title: 'Énergie retrouvée',
    summary:
      'Deux mois sans nicotine. Tu gères mieux le stress sans vapoter par réflexe.',
    health:
      'Plus d’énergie au quotidien, sommeil souvent plus stable. L’inflammation des voies respiratoires recule.',
  },
  {
    key: '90d',
    label: '90 JOURS',
    hours: 2160,
    title: 'Défenses renforcées',
    summary:
      'Trois mois : un vrai tournant. Les envies deviennent plus rares et plus courtes.',
    health:
      'Les poumons filtrent mieux poussières et microbes. Ton risque d’infections respiratoires baisse nettement.',
  },
  {
    key: '180d',
    label: '180 JOURS',
    hours: 4320,
    title: 'Souffle long',
    summary:
      'Six mois sans vape. Tu as prouvé que tu peux tenir sur la durée.',
    health:
      'Capacité respiratoire en hausse, effort physique plus facile. Ton cœur encaisse moins de stress lié à la nicotine.',
  },
  {
    key: '365d',
    label: '1 AN',
    hours: 8760,
    title: 'Année de liberté',
    summary:
      '365 jours sans vape. Tu as reconstruit une routine sans dépendance quotidienne.',
    health:
      'Risque cardiovasculaire nettement réduit par rapport à un vapoteur actif. Tes poumons continuent de guérir — chaque mois compte encore.',
  },
] as const

export type DashboardJalon = (typeof DASHBOARD_JALONS)[number]
export type JalonKey = DashboardJalon['key']

export const getJalonByKey = (key: string): DashboardJalon | undefined =>
  DASHBOARD_JALONS.find((j) => j.key === key)
