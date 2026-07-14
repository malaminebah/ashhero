---
name: 2d-animation
description: 2D animation specialist for spritesheet/frame-based animation — timing, easing, anticipation, frame drift/bleed/snap debugging, Reanimated UI-thread sprite playback. Use for any feature needing sprite or frame animation (combat, onboarding hero, victory/defeat banners, badges, mascots), not just combat.
---

# 2D Animation — Spécialiste

## Quand l'utiliser

- Toute nouvelle feature avec sprite animé (hero, boss, mascotte, badge, célébration) — pas seulement combat.
- Debug d'un glitch d'anim : snap, clignotement, bleed entre frames, drift.
- Décider du frame timing / easing pour une nouvelle anim.
- Décider s'il faut réutiliser `SheetSprite` ou non avant d'écrire quoi que ce soit.

## Différence avec l'agent `combat-sprites`

- `combat-sprites` (agent) = exécutant scoppé à `src/features/combat/` — il lit/mesure/édite directement les fichiers de cette feature.
- Ce skill = référence transversale : principes d'anim 2D + convention établie dans ce repo, applicable à n'importe quelle feature. Si le travail tombe dans `src/features/combat/`, lancer l'agent `combat-sprites` pour l'exécution ; ce skill sert à cadrer la demande (et couvre les features hors combat où l'agent ne s'applique pas).

## Technique établie dans ce repo (ne pas réinventer)

- Spritesheet = grille fixe de cellules carrées (`CELL=100` actuellement). Container = fenêtre visible (`overflow:hidden`), image enfant = sheet complet translaté à `-col*CELL*scale / -row*CELL*scale`. Voir `SheetSprite.tsx`.
- Anim pilotée sur UI thread via Reanimated (`useSheetFrameAnim.ts`, `withTiming`/`withRepeat`) — jamais `setInterval` (re-render JS, jank sur device bas de gamme).
- Config centralisée par anim dans `animConfig.ts` : `{ row, frames, frameMs, loop }`. Une seule source de vérité — ne pas dupliquer la logique de timing ailleurs.
- Anims one-shot tiennent la dernière frame (pas de retour auto à idle) ; seules idle/victory bouclent.
- État visuel résolu par une fonction pure (ex. `resolveCombatVisuals()`) — pas de logique d'anim éparpillée dans les composants ou la FSM.

## Principes génériques d'anim 2D

- **Timing > frame count** : un coup qui "claque" tient à des frames courtes (60-90ms) sur l'impact, pas au nombre de frames.
- **Anticipation** : une pose de recul avant l'action (même 1 frame) rend un coup plus lisible qu'un cut direct.
- **Hold the last frame**, jamais un retour silencieux à idle au milieu d'une transition d'état — cause n°1 de "clignotement" (cf. bug `combatVisuals.ts` : fallback idle pendant la fenêtre `HIT_PAUSE_BUFFER_MS`, corrigé en ajoutant la branche manquante plutôt qu'en retouchant le timing).
- **Frame anchoring** : ancrer au pied (`feet`) plutôt qu'au centre évite le bobbing vertical involontaire entre frames d'une même anim.
- **Flash de hit** : une frame quasi blanche/contour clair en frame 0 d'un `hurt` est un pattern voulu (pas un bug) si elle dure ≤100ms — vérifier la durée avant de la traiter comme un défaut.

## Debug checklist (drift / bleed / snap)

1. Mesurer le PNG réel, jamais supposer : `python3 -c "from PIL import Image; im=Image.open(path); print(im.size, im.mode)"`.
2. Vérifier `SHEET_W == COLS*CELL` et `SHEET_H == ROWS*CELL`.
3. Bounding-box alpha par cellule pour repérer un élément qui dépasse réellement le cadre — à distinguer d'un effet artistique voulu en bord de cellule (particule, traînée).
4. Si drift réel confirmé : `scripts/normalize-spritesheet.py <in> <out> <cols> <rows> <cell> feet` — jamais de tweak d'offset à la main frame par frame.
5. Simuler le déroulé complet (idle → action → résolution → retour idle) avant de conclure que c'est bon.

## Interdits

- Pas de nouveau composant sprite si `SheetSprite` suffit.
- Pas de `setInterval` pour driver des frames.
- Pas d'offset magique par frame — passer par `normalize-spritesheet.py` ou par la config.
- Toujours mesurer le PNG avant de toucher `animConfig.ts` (ou son équivalent dans une autre feature).

Reply in French.
