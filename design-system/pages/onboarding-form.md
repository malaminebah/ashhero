# Page override — Onboarding formulaire (steps 1–6)

## Pattern

Minimal single column · 1 question · CTA bas de page fixe (footer).

## Barre progression

- Track : `bg-flow-border` · h-1
- Fill : `bg-flow-cta` · width `(step/6)*100%`

## Header

- « Étape X sur 6 » · `text-flow-faint` · `text-xs`
- Titre · `text-[22px] font-bold text-flow-text text-center`
- Sous-titre · `text-[15px] text-flow-muted text-center`

## Cartes choix (steps 1–2)

- Default : bordure `flow-border`, fond blanc, ombre card
- Selected : bordure `flow-cta/35`, fond `flow-secondary`
- Icône Material 22px · chevron droit `flow-faint`

## Inputs (steps 3–4)

- Label `text-sm text-flow-muted`
- Field : `min-h-[52px] rounded-2xl border-flow-border bg-flow-bg`

## Date (step 5)

- Container : `rounded-2xl border-flow-border p-2`
- `DateTimePicker` · `themeVariant="light"`

## Final (step 6)

- Phase promesse → voir `promise.md`
- Phase ready : mascot victory, CTA « Commencer l'aventure » → submit Firestore

## Fichiers

`src/features/onboarding/Step*.tsx` · `_layout.tsx`
