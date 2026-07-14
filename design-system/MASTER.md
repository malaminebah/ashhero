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

## 2. Tokens Game (`brand.*`) — zone sombre (maquette ashhero-ui-frames)

Référence : maquette 22 frames (juillet 2026). Typo : **Nunito** partout (M5x7 abandonné, `font-pixel` en secours).

| Token | Hex | Usage |
|-------|-----|--------|
| `brand-bg` | `#08000f` | Fond écran |
| `brand-bg2` | `#0f0020` | Tab bar flottante |
| `brand-card` | `#150826` | Cartes (GameCard) |
| `brand-track` | `#1d0b2b` | Fond barres / wells |
| `brand-muted` | `#8b7aa8` | Labels (GameLabel) |
| `brand-locked` | `#5b4a75` | Éléments verrouillés |
| `brand-success` | `#22c55e` | Joueur, streak, CTA vert |
| `brand-accent` | `#a855f7` | Boss, violet |
| `brand-gold` | `#fbbf24` | XP, récompenses, jalon en cours |
| `brand-red` | `#ef4444` | Danger, dégâts |
| `brand-blue` | `#3b82f6` | Eau, DÉF |

### Composants Game partagés

| Composant | Fichier | Notes |
|-----------|---------|-------|
| Bouton chunky 3D | `components/ui/chunky-button.tsx` | `CHUNKY_COLORS` green/blue/gray/gold/violet, press anim |
| Carte sombre | `components/ui/game-card.tsx` | 20px radius, bordure blanche 7 % |
| Label uppercase | `components/ui/game-label.tsx` | 11px 700 `brand-muted` |
| Barre XP or | `components/ui/xp-bar.tsx` | gradient `#f59e0b→#fbbf24` |
| Icônes jeu | `components/ui/game-icon.tsx` | lungs/drop/swords/crown/gem… |
| Sprites cartoon SVG | `components/characters/HeroSprite.tsx` · `BossSprite.tsx` | poses maquette (avatars hors combat) |
| Étoiles arène | `components/ui/star-field.tsx` | |

Combat : spritesheets PNG `assets/combat/sprite_hero.png` (3×3) / `sprite_boss.png` (3×2) + `assets/images/night_arena.jpg` — voir `src/features/combat/`.

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
| Hex en dur dans un composant | Token `flowTheme.ts` / `theme.ts` / Tailwind |
| Divider par réflexe | `gap` + whitespace |
| Animation bloquante &gt; 500ms hors combat | 150–450ms, jamais bloquant |

---

## 7. Discipline UI — garde-fous senior (moderne & minimaliste)

Règles transverses Flow **et** Game. Elles priment sur les habitudes locales d'un fichier.

### 7.1 Couleur

- **Zéro hex en dur dans un composant** — tout vient des tokens (`flowTheme.ts`, `theme.ts`, classes Tailwind). Seule exception : une couleur **portée par la donnée** (ex. `mood.circleColor`), jamais décorative.
- **1 couleur d'accent par écran.** Le reste : neutres (`brand-muted`, blanc, `brand-track` / `flow-muted`, `flow-border`).
- Fond teinté = couleur + alpha hex : **`${color}26`** (~15 %). Pattern unique pour tous les cercles/chips/pills teintés — pas de variantes `33`/`40` improvisées.
- La couleur code une **sémantique** (succès, danger, XP, donnée) — jamais « pour faire joli ».

### 7.2 Typographie

- Échelle fermée : **11 · 13 · 15 · 18 · 22** px (+ `text-2xl` pour les gros chiffres). Pas de taille ad hoc.
- Max **2 graisses par écran** : extrabold (titres, chiffres) + regular/semibold (corps).
- `letterSpacing` custom réservé aux titres (`-0.4`) et labels uppercase (`0.6`) — nulle part ailleurs.

### 7.3 Espacement & hiérarchie

- Échelle **4px** uniquement : 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40.
- Padding horizontal écran : Flow `px-6`, Game `px-5` — jamais mélangés sur un même écran.
- **1 action primaire par écran.** Tout le reste est secondaire (texte, ghost, chevron).
- Une carte = **2 niveaux de texte max** (titre + support). Besoin d'un 3e → écran détail.
- Aérer plutôt que séparer : un `gap` remplace un divider dans 90 % des cas.

### 7.4 Motion

- Micro-interactions **150–300ms** · entrées d'écran **300–450ms** · stagger **≤ 60ms/item**.
- `transform` + `opacity` uniquement (Reanimated, UI thread) — jamais width/height/layout.
- Hors combat, aucune animation ne bloque une action utilisateur au-delà de 500ms.

### 7.5 États — non négociable

- Composant interactif : pressed (`active:opacity-*`) **et** disabled visibles.
- Écran data : **loading, empty, error** — tous les trois. Un empty state a une copy FR + une action. Un écran sans empty state n'est pas terminé.
- Jamais de layout shift au hover/press (pas de scale qui pousse le layout).

### 7.6 Étendre, pas dupliquer

- Besoin visuel proche d'un composant existant → **prop/variante**, pas un fork.
- Style répété **2 fois** → composant partagé (ex. `MoodIcon`). Répété 1 fois → inline, pas d'abstraction préventive.
- Un nouveau composant sans état ni logique qui wrappe juste des classes = à refuser en review.

---

## 8. Accessibilité & motion

- Contraste Flow : texte `#171717` sur `#FFFFFF` ≥ 4.5:1
- Contraste CTA : blanc sur `#7C3AED` ≥ 4.5:1
- `accessibilityRole="button"` + label sur pressables
- Animations entrée : fade 150–450ms (Reanimated)
- Confetti / respiration : respecter `prefers-reduced-motion` (à câbler)
- Canvas promesse : alternative bouton si gesture impossible

---

## 9. Assets — backlog (post design system)

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

## 10. Fichiers code ↔ design

| Sujet | Fichier |
|-------|---------|
| Tokens Flow JS | `constants/flowTheme.ts` |
| Tokens Game JS | `constants/theme.ts` |
| Tailwind | `tailwind.config.js` |
| Overrides écran | `design-system/pages/*.md` |
| Composants Flow | `src/features/onboarding/components/*` |
| Règles agent | `CURSOR.md` |

---

## 11. Évolution

1. Modifier **ce fichier** ou `design-system/pages/<écran>.md`
2. Propager tokens → `flowTheme.ts` + `tailwind.config.js`
3. Implémenter composants Flow
4. Remplacer placeholders assets (§9)

_Dernière sync : discipline UI senior (§7) — juillet 2026._
