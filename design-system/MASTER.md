# AshHero — Design System (source unique UI)

> Fichier de référence pour tout agent / dev.  
> Implémentation : **NativeWind** + tokens `brand.*` dans `tailwind.config.js` et `constants/theme.ts`.  
> Mock composants : capture design system (boutons, barres, badges, stats, jalons, actions combat).

---

## 1. Identité visuelle

| Attribut | Valeur |
|----------|--------|
| Style | Dark OLED, pixel-art RPG, gamification santé (anti-vape) |
| Ambiance | Fond très sombre, accents vert succès, violet ennemi, or récompenses |
| Densité | Cartes compactes, labels **UPPERCASE** mono, chiffres gros et lisibles |
| Stack UI | React Native · Expo · NativeWind (pas de `StyleSheet` sauf ombre / gradient) |

### Anti-patterns (ne pas faire)

- Emojis comme **icônes de boutons** → `@expo/vector-icons` (MaterialIcons / MaterialCommunityIcons)
- Violet partout → vert = progression / joueur ; violet = boss / brand legacy
- Boutons &lt; 48px de hauteur tactile
- Texte body en violet clair sur fond sombre pour longues phrases (préférer `text-white/65`)
- Dupliquer ces tokens ailleurs — **modifier ici + `tailwind.config.js` + `theme.ts`**

---

## 2. Couleurs

### Tokens `brand` (Tailwind)

| Token | Hex / valeur | Usage |
|-------|----------------|-------|
| `brand-bg` | `#08000f` | Fond écran principal |
| `brand-bg2` | `#0f0020` | Tab bar, surfaces surélevées |
| `brand-surface` | `rgba(255,255,255,0.03)` | Cartes, inputs |
| `brand-border` | `rgba(168,85,247,0.15)` | Bordures génériques (legacy violet) |
| `brand-accent` | `#a855f7` | **PV ennemi**, glow legacy, titres onboarding |
| `brand-accentDark` | `#7c3aed` | Boutons primaires legacy |
| `brand-accentDeep` | `#4c1d95` | Profondeur violet |
| `brand-success` | `#22c55e` | **Progression, PV joueur, onglet actif, jalons OK** |
| `brand-gold` | `#fbbf24` | XP gemme, spécial, économies, bonus |
| `brand-red` | `#ef4444` | Danger, défaite |

### Couleurs sémantiques (hors `brand`)

| Rôle | Classes / hex | Usage |
|------|----------------|-------|
| Eau (action combat) | `border-sky-500/40 bg-sky-950/40` | Bouton « Boire de l'eau » |
| Neutre secondaire | `border-white/15 bg-white/[0.04]` | Cartes stats, distraire |
| Texte principal | `text-white` | Titres, valeurs |
| Texte secondaire | `text-white/50`–`text-white/65` | Labels, descriptions |
| Texte tertiaire | `text-white/35`–`text-white/45` | Hints, footer |

### Dégradés (LinearGradient)

```txt
PV / XP joueur :  #16a34a → #22c55e → #4ade80
Bouton combat vert : #15803d → #22c55e → #16a34a
PV ennemi (solide) : #a855f7
```

### JS (`constants/theme.ts`)

Utiliser `THEME.*` pour tab bar, ombres, composants non-NativeWind.  
Onglet actif dark : `THEME.success` (`#22c55e`).

---

## 3. Typographie

| Rôle | Font | Classes typiques |
|------|------|------------------|
| Titres écran (Accueil, Arène, Mon héros) | `titleSerif` (Georgia) | `text-2xl`–`text-3xl font-bold uppercase` |
| Labels UI / stats / nav | Mono système | `font-mono text-[9px]–text-xs uppercase tracking-wider` |
| Valeurs chiffrées | Mono | `font-mono text-lg`–`text-2xl font-bold` |
| Corps / dialogue combat | Mono | `font-mono text-xs leading-5` |

**Futur pixel (optionnel)** : Press Start 2P / VT323 pour labels retro — pas encore chargées dans l'app ; jusqu'à intégration expo-font, rester sur mono système.

---

## 4. Espacement & rayons

| Élément | Valeur |
|---------|--------|
| Padding écran | `px-5`, `pt-12`, `pb-10` |
| Gap cartes grille | `gap-2` ou `gap-3` |
| Rayon carte / input | `rounded-xl` (12–16px) |
| Rayon bouton action | `rounded-xl` |
| Rayon bouton rond (CTA arène) | `rounded-full` |
| Hauteur min bouton tactile | `min-h-[48px]` (combat : `min-h-[52px]`) |
| Hauteur barre PV/XP | `h-3` ou `h-3.5` |

---

## 5. Composants — catalogue

### 5.1 Boutons (générique app)

Référence visuelle : panneau **BOUTONS** du mock.

| Variante | Bordure + fond NativeWind | Texte | Composant / usage |
|----------|---------------------------|-------|-------------------|
| **Primaire** | `border-brand-success/45 bg-brand-success/10` + gradient optionnel | `text-white uppercase font-mono font-bold` | CTAs positifs, lancer combat |
| **Secondaire** | `border-white/15 bg-white/[0.04]` | `text-white/90` | Actions neutres |
| **Spécial** | `border-brand-gold/45 bg-brand-gold/10` | `text-brand-gold` | Attaque spéciale, bonus |
| **Danger** | `border-brand-red/45 bg-brand-red/10` | `text-red-300` | Abandon, reset (si besoin) |

État pressé : `active:opacity-85` ou `active:opacity-90` — **pas de scale** qui décale le layout.

### 5.2 Actions combat

Composant : `src/features/combat/components/ActionButton.tsx`

| Action | `variant` | Icône (MaterialCommunityIcons) | Badge |
|--------|-----------|----------------------------------|-------|
| Respirer | `breathe` | `lungs` | `60s` + horloge |
| Boire de l'eau | `water` | `water` | — |
| Se distraire | `distract` | `gamepad-variant` | — |
| Attaque spéciale | `special` | `flash` | cadenas + « 7 jours de série » si locked |

### 5.3 Barres de progression

Composant partagé combat : `CombatHpBar.tsx`

| Type | Label | Fill | Exemple |
|------|-------|------|---------|
| **PV joueur** | `PV` + `85 / 100` | `#22c55e` / `fillColor="brand-success"` | Sous l'arène combat |
| **PV ennemi** | idem | `#a855f7` / `fillColor="#a855f7"` | Au-dessus de l'arène |
| **XP** | `XP` + `650 / 1200` | gradient vert | `DashboardXpBar`, `ProfileProgressPair` |

Structure barre :

```txt
Track : h-3 rounded-sm border border-white/15 bg-black/50
Fill  : Animated width % + gradient ou couleur unie
Label : font-mono text-[10px], PV/XP à gauche, fraction à droite
```

Gemme XP (mock) : petit carré `rotate-45 border-brand-gold/70 bg-brand-gold/25` à droite du compteur.

### 5.4 Badges (hex)

Composant : `ProfileBadgesGrid.tsx`

| État | Forme | Bordure | Icône |
|------|-------|---------|-------|
| Débloqué | carré 48px `rotate-45` | `border-brand-success/70 bg-brand-success/15` | emoji métier au centre `-rotate-45` |
| Verrouillé | idem | `border-white/15 opacity-35` | `MaterialIcons lock` en coin |

Couleurs mock badges : vert ★ · or ♥ · bleu 💧 · gris cadenas.

### 5.5 Cartes stats (Accueil)

Composant : `DashboardStatsPair.tsx`

```txt
Container : flex-1 rounded-2xl border border-white/10 bg-white/[0.04] p-4
Icône     : MaterialIcons (savings gold, cloud blue)
Titre     : font-mono text-[9px] uppercase text-white/50
Valeur    : font-mono text-2xl font-bold text-white
Sous-texte: font-mono text-[9px] text-white/40
Sparkline : barres décoratives bg-brand-success/35 (pas de lib chart)
```

Argent : `toLocaleString('fr-FR', { minimumFractionDigits: 2 })` + ` €`.

### 5.6 Jalons

Composant : `DashboardJalonsGrid.tsx` · config : `jalonsConfig.ts`

| État | Carte | Texte | Icône |
|------|-------|-------|-------|
| Débloqué | `border-brand-success/50 bg-brand-success/10` | `text-brand-success` | `check-circle` vert |
| Verrouillé | `border-white/10 bg-white/[0.02]` | `text-white/35` | `lock` |

Header section : **TES JALONS** + `{n} / 8 débloqués`. Défilement horizontal `ScrollView`.

### 5.7 Dialogue combat

Composant : `CombatMessageBox.tsx`

```txt
Cadre : rounded-lg border-2 border-brand-success/45 bg-black/50 px-3 py-3 min-h-[64px]
Prompt par défaut : « Que vas-tu faire ? »
```

### 5.8 Arène combat (sprites)

Composant : `CombatArenaView.tsx`

```txt
Fond   : h-[168px] rounded-xl border border-white/10 bg-[#0a1008]
Sol    : ellipse bg-white/[0.06] en bas
Joueur : gauche — PlayerHeroEmoji variant combat
Boss   : droite — emoji 👾 (placeholder pixel)
VFX    : AttackEffect centré (emoji action 💨💧🎮⚡)
```

### 5.9 Header & navigation

| Zone | Pattern |
|------|---------|
| Badge niveau accueil | `border-brand-success/45 bg-brand-success/10` + « XP · Niveau N » |
| Tab bar | fond `THEME.bg2`, actif `brand-success`, labels `font-mono text-[10px] uppercase` |
| Icônes tabs | Accueil `house` · Combat `sword-cross` · Profil `person` |
| Fermer modal combat | carré `border-white/15` + `MaterialIcons close` |

---

## 6. Écrans — checklist rapide

### Accueil (`DashboardHome`)

1. Header badge XP + engrenage → `/settings`  
2. Hero avatar halo vert + jours sans vape + message cheer  
3. Barre XP pleine largeur  
4. Stats pair (argent / puffs)  
5. Jalons horizontal  
6. Bonus du jour → onglet Combat  

### Arène (`CombatArenaScreen`)

1. Emoji / illustration héros  
2. Titre **Arène** serif  
3. Bouton rond vert **Lancer un combat**  

### Combat modal (`CombatModal`)

1. ✕ + Tour N / ∞  
2. L'ENVIE + barre violette  
3. Arène  
4. Nom héros + PV vert  
5. Message box  
6. 4 ActionButton + abandon texte  

### Profil (`ProfileScreenBody`)

1. **Mon héros** + edit  
2. Avatar rond + input nom  
3. Paire Niveau | XP  
4. Grille 2×3 stats  
5. Badges hex  
6. Avatars (bientôt)  

---

## 7. Accessibilité & UX

- `accessibilityRole="button"` + `accessibilityLabel` sur tout pressable  
- Contraste : texte principal blanc sur `#08000f`  
- Feedback : opacité au press, haptics combat (existant)  
- `prefers-reduced-motion` : pas encore câblé — à respecter si animations ajoutées  
- Focus clavier web : conserver bordures visibles sur inputs  

---

## 8. Fichiers code ↔ design

| Design token / composant | Fichier |
|--------------------------|---------|
| Couleurs Tailwind | `tailwind.config.js` |
| THEME / Colors / titleSerif | `constants/theme.ts` |
| Accueil | `src/features/tracker/components/dashboard/*` |
| Profil | `src/features/tracker/components/profile/*` |
| Arène + modal | `src/features/combat/components/*` |
| Icônes SF → Material | `components/ui/icon-symbol.tsx` |

---

## 9. Évolution

1. Modifier **ce fichier** d'abord (intention design)  
2. Propager tokens dans `tailwind.config.js` + `theme.ts` si nouvelle couleur  
3. Mettre à jour le composant référencé en section 5  
4. Pages spécifiques avec override fort → `design-system/pages/<page>.md` (optionnel, rare)

_Dernière sync : mock design system composants + écrans Accueil / Arène / Combat / Profil (2026)._
