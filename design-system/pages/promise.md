# Page override — Promesse (geste)

## Référence

Ahead : titre → tuile mint + mascot → instruction → canvas blanc → CTA violet.

## Copy

- Titre : « Prêt à investir en toi ? »
- Instruction : « Engage-toi en traçant une coche : »
- CTA idle : « Je m'engage »
- CTA loading : « Promesse en cours… » · fond `flow-cta-loading`

## Canvas

- `h-44` · `bg-flow-bg` · `rounded-2xl` · `flowShadow.canvas`
- Clear : icône `close` en haut-gauche, hitSlop 12
- Trait : points 5px `#171717` (PanResponder)
- Validation : ≥18 points, longueur trait ≥70px

## Feedback

- Confetti 14 particules, 500ms, couleurs : rouge, or, violet, vert, bleu
- Puis transition phase « Tu es prêt » (step 6)

## Fichiers code

`OnboardingDrawPad.tsx` · `OnboardingConfetti.tsx` · `Step6.tsx`
