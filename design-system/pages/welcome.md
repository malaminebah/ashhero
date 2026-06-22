# Page override — Welcome

> Remplace les defaults Flow du MASTER pour cet écran.

## Référence

Ahead welcome : fond blanc, illustration haut, logo, tagline, 2 CTA pill, legal footer.

## Layout

- `SafeAreaView` · `bg-flow-bg` · `px-6`
- Structure : `justify-between` · `flex-1`
- Zone centre : mascot `size="lg"` + tagline

## Copy AshHero

- Logo : `ashhero` (lowercase, `text-flow-brand`)
- Tagline : « Contrôle tes envies, contrôle ta vie. »
- Sous-texte optionnel : « Chaque heure sans fumer, ton héros devient plus fort. »
- CTA primaire : « Commencer »
- CTA secondaire : « Changer de compte » (post-login) ou « J'ai déjà un compte » (pre-auth)
- Legal : 11px `text-flow-faint`, conditions + privacy

## Animations

- Fade séquentiel : logo 150ms → mascot 300ms → CTA 550ms
- Durée 450–500ms

## Assets

- Mascot flat centré (placeholder : `OnboardingMascot` + Hero sprite)
- Pas de décor planètes/étoiles tant qu'asset dédié absent

## Fichier code

`app/index.tsx`
