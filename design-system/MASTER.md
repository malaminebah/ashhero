# AshHero — Design System (source unique UI)

> Référence pour tout agent / dev.  
> Implémentation : **NativeWind** + `flow.*` / `brand.*` dans `tailwind.config.js` et `constants/flowTheme.ts` + `constants/theme.ts`.

---

## 0. Vision produit (cible Ahead-like)

| Attribut | Flow (cible app) | Game (legacy, en place) |
|----------|------------------|-------------------------|
| Ambiance | Clair, aéré, coach bienveillant | Dark OLED, RPG pixel |
| Référence | Screens Ahead (Mobbin) | Combat / dashboard actuel |
| Fond | `#FFFFFF`, lavande respiration | `#08000f` |
| CTA | Violet pill `#7C3AED` | Vert `#22c55e` |
| Illustration | 2D flat / mascot (assets TBD) | Sprites `Hero.png` |
| Typo | Sans-serif arrondi (Nunito → System interim) | M5x7 pixel |

**Migration** : Phase 1 = parcours entrée (auth, welcome, onboarding). Phase 2 = tabs / dashboard. Phase 3 = combat (garder ou adoucir). **Assets 2D flat à créer plus tard** — placeholders autorisés.

**Écrans référence** (workspace) : `assets/Ahead_iOS_Onboarding_*.png`

---

## 1. Tokens Flow (`flow.*`)

Source JS : `constants/flowTheme.ts` · Tailwind : `tailwind.config.js`

### Couleurs

| Token | Hex | Usage |
|-------|-----|--------|
| `flow-bg` | `#FFFFFF` | Fond écran standard |
| `flow-breathe` | `#E5DDF5` | Plein écran respiration |
| `flow-brand` | `#9B87F5` | Logo « ashhero », accents doux |
| `flow-cta` | `#7C3AED` | Bouton primaire |
| `flow-cta-loading` | `#C4B5FD` | CTA état chargement (« Promesse en cours… ») |
| `flow-mascot` | `#C8EDD6` | Tuile illustration (mint) |
| `flow-text` | `#171717` | Titres, corps |
| `flow-muted` | `#64748B` | Sous-titres, labels |
| `flow-faint` | `#94A3B8` | Legal, hints |
| `flow-border` | `#E5E7EB` | Inputs, séparateurs |
| `flow-secondary` | `#F3EEFF` | Bouton secondaire fond |
| `flow-gold` | `#F5C518` | Lauriers social proof |

### Ombres (StyleSheet autorisé)

```ts
import { flowShadow } from '@/constants/flowTheme'
// flowShadow.card — cartes choix, inputs surélevés
// flowShadow.canvas — zone dessin promesse
```

### Rayons

| Élément | Valeur |
|---------|--------|
| CTA pill | `rounded-full` |
| Tuile mascot | `rounded-[28px]` |
| Carte / input / canvas | `rounded-2xl` (16px) |

### Espacement

| Élément | Valeur |
|---------|--------|
| Padding horizontal écran | `px-6` (24px) |
| Gap sections | `mb-8` – `mb-10` |
| Footer CTA | `pb-10` |
| Min hauteur bouton | `min-h-[52px]` |

### Typographie Flow

| Rôle | Classes NativeWind | Notes |
|------|-------------------|--------|
| Logo | `text-[32px] font-bold text-flow-brand font-flow` | lowercase « ashhero » |
| Titre écran | `text-[22px] font-bold text-flow-text text-center font-flow` | Une question / écran |
| Corps | `text-[15px] leading-6 text-flow-muted font-flow` | Centré si onboarding |
| Caption / legal | `text-[11px] leading-4 text-flow-faint font-flow` | |
| Bouton | `text-base font-bold text-white font-flow` | Sur fond `flow-cta` |

**Font** : `font-flow` → System (interim). **Cible** : Nunito via `expo-font` — ne pas utiliser M5x7 sur Flow.

**Composant texte** : `OnboardingText` / futur `FlowText` avec `fontFamily: System`.

---

## 2. Tokens Game (`brand.*`) — legacy combat / tabs

| Token | Hex | Usage |
|-------|-----|--------|
| `brand-bg` | `#08000f` | Fond écran |
| `brand-bg2` | `#0f0020` | Tab bar |
| `brand-success` | `#22c55e` | Joueur, progression |
| `brand-accent` | `#a855f7` | Boss, PV ennemi |
| `brand-gold` | `#fbbf24` | XP, récompenses |
| `brand-red` | `#ef4444` | Danger |

Voir sections 5–6 pour composants combat existants.

---

## 3. Layout Flow — patterns Ahead

### 3.1 Welcome

```
[SafeArea bg-flow-bg]
  Logo ashhero (centre, haut)
  [flex-1 centre] Mascot tuile mint + tagline 2 lignes
  [bas] CTA primaire + secondaire + legal caption
```

- Tagline type : « Contrôle tes envies, contrôle ta vie. »
- CTA : « Commencer » · secondaire : « Changer de compte » / « J'ai déjà un compte »

### 3.2 Respiration (interstitiel)

```
[plein écran bg-flow-breathe]
  Mascot centré (yeux fermés — asset TBD)
  « Prends une grande inspiration »
  Tap ou auto 3s → suite
```

### 3.3 Social proof (optionnel)

```
Logo + titre coach
3 blocs stats (lauriers flow-gold) — chiffres bold, sous-texte muted
CTA « C'est parti ! »
```

### 3.4 Promesse (geste)

```
Titre : « Prêt à investir en toi ? »
Mascot tuile mint
« Engage-toi en traçant une coche : »
[Canvas blanc + ombre + clear X]
CTA « Je m'engage » → confetti → loading CTA
```

### 3.5 Formulaire onboarding (steps 1–6)

- Colonne centrée, **1 action principale**
- Barre progression : track `flow-border`, fill `flow-cta`
- Cartes choix : fond blanc, ombre légère, icône Material (pas emoji)
- Inputs : bordure `flow-border`, fond blanc, label `flow-muted`

---

## 4. Composants Flow — catalogue

| Composant | Fichier | Variantes |
|-----------|---------|-----------|
| Shell écran | `OnboardingScreen.tsx` | `default` · `breathe` |
| Texte | `OnboardingText.tsx` | force System |
| Mascot | `OnboardingMascot.tsx` | `sm` · `md` · `lg` — placeholder sprite |
| CTA primaire | `OnboardingPrimaryButton.tsx` | disabled, loading label |
| CTA secondaire | `OnboardingSecondaryButton.tsx` | fond `flow-secondary` |
| Header step | `OnboardingHeader.tsx` | step X/6, titre centré |
| Carte choix | `OnboardingChoiceCard.tsx` | primary / outline |
| Input | `OnboardingInput.tsx` | email, decimal, password |
| Respiration | `OnboardingBreatheScreen.tsx` | |
| Dessin promesse | `OnboardingDrawPad.tsx` | PanResponder |
| Confetti | `OnboardingConfetti.tsx` | burst 500ms |

### Règles composants

- Icônes : `@expo/vector-icons` uniquement
- Press : `active:opacity-90` — **pas de scale** layout
- StatusBar Flow : `style="dark"`
- StatusBar Game : `style="light"`

---

## 5. Composants Game — catalogue (inchangé)

### 5.1 Boutons combat · 5.2 Actions · 5.3 Barres PV/XP · 5.4 Badges · 5.5 Stats · 5.6 Jalons · 5.7 Dialogue · 5.8 Arène · 5.9 Nav

Référence implémentation : `src/features/combat/components/*`, `src/features/tracker/components/*`.

| Composant | Fichier |
|-----------|---------|
| Action combat | `ActionButton.tsx` |
| Barre PV | `CombatHpBar.tsx` |
| Sprite joueur | `PlayerSoldierSprite.tsx` |
| Arène | `CombatArenaView.tsx` |

---

## 6. Anti-patterns

| ❌ Ne pas | ✅ Faire |
|----------|----------|
| M5x7 sur écrans Flow | `font-flow` / OnboardingText |
| Emojis comme icônes UI | MaterialCommunityIcons |
| Fond dark sur welcome/onboarding | `bg-flow-bg` |
| Violet `brand-accent` sur CTA Flow | `bg-flow-cta` |
| Boutons &lt; 48px | `min-h-[52px]` |
| Ombres dures noir 40% | `flowShadow.*` (~6–8%) |
| Copier mascot Ahead (ghost) | Asset AshHero flat (TBD) |

---

## 7. Accessibilité & motion

- Contraste Flow : texte `#171717` sur `#FFFFFF` ≥ 4.5:1
- Contraste CTA : blanc sur `#7C3AED` ≥ 4.5:1
- `accessibilityRole="button"` + label sur pressables
- Animations entrée : fade 150–450ms (Reanimated)
- Confetti / respiration : respecter `prefers-reduced-motion` (à câbler)
- Canvas promesse : alternative bouton si gesture impossible

---

## 8. Assets — backlog (post design system)

| Asset | Spec | Écrans |
|-------|------|--------|
| Mascot idle flat | PNG transparent, ~512px, violet doux | Welcome, steps |
| Mascot breathe | Yeux fermés, nuages optionnels | Respiration |
| Mascot promise | Pose engagement | Promesse |
| Mascot victory | Célébration légère | Step 6 |
| Laurier social proof | SVG or PNG `flow-gold` | Social proof |
| Logo wordmark | « ashhero » lowercase | Partout Flow |

Placeholder actuel : `Hero.png` sprite combat dans tuile mint.

---

## 9. Fichiers code ↔ design

| Sujet | Fichier |
|-------|---------|
| Tokens Flow JS | `constants/flowTheme.ts` |
| Tokens Game JS | `constants/theme.ts` |
| Tailwind | `tailwind.config.js` |
| Overrides écran | `design-system/pages/*.md` |
| Composants Flow | `src/features/onboarding/components/*` |
| Règles agent | `CURSOR.md` |

---

## 10. Évolution

1. Modifier **ce fichier** ou `design-system/pages/<écran>.md`
2. Propager tokens → `flowTheme.ts` + `tailwind.config.js`
3. Implémenter composants Flow
4. Remplacer placeholders assets (§8)

_Dernière sync : design system Flow Ahead-like — juin 2026._
