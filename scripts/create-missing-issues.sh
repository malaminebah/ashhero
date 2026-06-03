#!/usr/bin/env bash
# Crée les issues GitHub T-114+ manquantes et les ajoute au Project AshHero.
set -euo pipefail

OWNER="${GITHUB_OWNER:-malaminebah}"
REPO="${OWNER}/ashhero"
PROJECT_NUM=1

add_to_project() {
  local num="$1"
  gh project item-add "$PROJECT_NUM" --owner "$OWNER" --url "https://github.com/${REPO}/issues/${num}"
  echo "  → Project + issue #${num}"
}

create_issue() {
  local title="$1"
  local labels="$2"
  local body_file="$3"
  local num
  num=$(gh issue create -R "$REPO" --title "$title" --label "$labels" --body-file "$body_file" | grep -oE '[0-9]+$')
  echo "Created #${num}: ${title}"
  add_to_project "$num"
}

BODY_DIR=$(mktemp -d)
trap 'rm -rf "$BODY_DIR"' EXIT

# T-114
cat > "$BODY_DIR/t114.md" <<'EOF'
**Statut board :** In Review
**Commit :** `a4e07f6`

**Objectif** : améliorer le cadre combat actuel (vertical) pour un affrontement visuel plus immersif : bordures épaisses pixel art, fond arène, espacer boss/joueur.

**Critères d'acceptation**
- [x] Bordures pixel art épaisses (4px) autour panneaux boss et joueur
- [x] Fond arène sombre (`bg-[#05000a]`)
- [x] Boss aligné bordure droite, joueur bordure gauche
- [ ] Responsive iPhone SE — validation PO
- [x] Shake horizontal conservé

**Définition of Done** : test visuel OK ; `npx tsc --noEmit` OK.
EOF

# T-115
cat > "$BODY_DIR/t115.md" <<'EOF'
**Statut board :** In Review
**Commit :** `a4e07f6`

**Objectif** : afficher un emoji animé au centre de l'écran quand une action est résolue (fade + scale).

**Critères d'acceptation**
- [x] Composant `AttackEffect.tsx`
- [x] Animation Reanimated (~900 ms total)
- [x] Mapping breathe 💨, water 💧, distract 🎮, special ⚡, boss 😈

**Définition of Done** : animation fluide ; pas de crash.
EOF

# T-116
cat > "$BODY_DIR/t116.md" <<'EOF'
**Statut board :** In Review
**Commit :** `a4e07f6`

**Objectif** : déclencher `AttackEffect` via `currentAttackEmoji` dans `useTurnCombat`.

**Critères d'acceptation**
- [x] État FSM + clear après 900 ms
- [x] Sync message box + emoji + shake
- [ ] Playtest PO : chaque action affiche le bon emoji

**Définition of Done** : 3 combats testés.
EOF

# T-117
cat > "$BODY_DIR/t117.md" <<'EOF'
**Statut board :** In Review
**Commit :** `a4e07f6`

**Objectif** : barres PV qui drainent smooth avec `withTiming` (400 ms).

**Critères d'acceptation**
- [x] `CombatMonster` + `CombatPlayerPanel`
- [ ] Drain fluide sur coups rapides — validation PO

**Définition of Done** : 60 fps ; pas de régression visuelle.
EOF

# T-118
cat > "$BODY_DIR/t118.md" <<'EOF'
**Statut board :** In Review
**Commit :** `a4e07f6`

**Objectif** : vibration légère (`expo-haptics`) quand joueur ou boss prend des dégâts.

**Critères d'acceptation**
- [x] Light sur hit joueur, Medium sur riposte boss
- [x] Guard `.catch` si device ne supporte pas
- [ ] Testé sur device physique

**Définition of Done** : vibration ressentie sur device.
EOF

# T-119
cat > "$BODY_DIR/t119.md" <<'EOF'
**Statut board :** To Do

**Objectif** : uniformiser tous les textes du modal combat en français (tutoiement).

**Périmètre**
- `CombatModal`, `CombatMessageBox`, banners, `ACTION_LABELS`, messages FSM UI

**Hors périmètre** : noms boss FR déjà faits (T-124) ; copy auth/onboarding

**Critères d'acceptation**
- [ ] Aucune chaîne EN visible en combat
- [ ] Ton cohérent, tutoiement
- [ ] `npx tsc --noEmit` OK

**Définition of Done** : PO valide le ton sur device.

**Dépend de :** T-114 à T-118
EOF

# T-120
cat > "$BODY_DIR/t120.md" <<'EOF'
**Statut board :** To Do

**Objectif** : retouche visuelle globale du combat après copy FR (T-119) et juice validés.

**Périmètre**
- Espacements boss/joueur, typo, message box, boutons, banners, responsive SE

**Hors périmètre** : nouvelles mécaniques ; sprites (T-121)

**Critères d'acceptation**
- [ ] 3 playtests sans régression
- [ ] Aligné `CURSOR.md` (NativeWind, pixel art sombre)

**Définition of Done** : PO valide sur device.

**Bloqué par :** T-119
EOF

# T-121
cat > "$BODY_DIR/t121.md" <<'EOF'
**Statut board :** Backlog

**Objectif** : remplacer emojis d'attaque par sprites/particules si proto emoji insuffisant.

**Périmètre**
- Assets PO validés ; intégration `AttackEffect` ; fallback emoji

**Critères d'acceptation**
- [ ] Assets sourcés pixel art AshHero
- [ ] Perf OK device milieu de gamme
- [ ] Pas de régression FSM (T-116)

**Définition of Done** : playtest visuel ; PO choisit emoji vs sprite.

**Priorité :** P3 — après T-120
EOF

# T-123
cat > "$BODY_DIR/t123.md" <<'EOF'
**Statut board :** In Review
**Commit :** `06ef17d`

**Objectif** : empêcher l'accès aux tabs sans profil Firestore ; sync reset profil / onboarding / session.

**Critères d'acceptation**
- [x] Guard dans `app/(tabs)/_layout.tsx`
- [x] `sessionStore` conserve `hasServerProfile` si même uid
- [x] Reset onboarding + session depuis profil
- [ ] Validation PO : reset ramène au bon écran

**Définition of Done** : pas d'accès dashboard sans profil.
EOF

# T-124
cat > "$BODY_DIR/t124.md" <<'EOF'
**Statut board :** In Review
**Commit :** `7d7b8b4`

**Objectif** : rebalance `DAMAGE_TO_BOSS` + riposte ; noms attaque boss FR.

**Critères d'acceptation**
- [x] Chiffres dans `constants.ts`
- [ ] Validation PO : combat ~3–8 tours

**Note** : copy UI (Battle, You…) = T-119

**Définition of Done** : playtest ; chiffres vs spec.
EOF

# T-125
cat > "$BODY_DIR/t125.md" <<'EOF'
**Statut board :** In Review
**Commit :** `024f0f2`

**Objectif** : rebalance XP victoire (`COMBAT_XP_BY_ACTION`), distinct des dégâts combat.

**Critères d'acceptation**
- [x] `combatXpTable.ts` mis à jour
- [ ] Progression tracker cohérente — validation PO

**Définition of Done** : victoire applique le bon XP.
EOF

echo "=== Mise à jour #13 → T-122 ==="
gh issue edit 13 -R "$REPO" --title "T-122 — Auth : persistance session Firebase avec AsyncStorage (React Native)" --body-file "$BODY_DIR/t123.md" 2>/dev/null || true
# fix: use t122 body for issue 13
cat > "$BODY_DIR/t122.md" <<'EOF'
**Statut board :** In Review
**Commit :** `b1b4611`

**Objectif** : conserver la session auth entre les relances de l'app.

**Critères d'acceptation**
- [x] `getReactNativePersistence(AsyncStorage)`
- [x] Guard double init fast refresh
- [ ] Validation PO : fermer app → rouvrir → toujours connecté

**Définition of Done** : session persistée ; pas de crash.
EOF
gh issue edit 13 -R "$REPO" --title "T-122 — Auth : persistance session Firebase avec AsyncStorage (React Native)" --body-file "$BODY_DIR/t122.md"

echo "=== Création issues manquantes ==="
create_issue "T-114 — Combat : améliorer cadre vertical (pixel art + espacement)" "mvp,combat" "$BODY_DIR/t114.md"
create_issue "T-115 — Combat : emojis d'attaque animés (fade + scale)" "mvp,combat" "$BODY_DIR/t115.md"
create_issue "T-116 — Combat : connecter emojis aux actions (FSM)" "mvp,combat" "$BODY_DIR/t116.md"
create_issue "T-117 — Combat : drain animé barres PV (withTiming)" "mvp,combat" "$BODY_DIR/t117.md"
create_issue "T-118 — Combat : vibration sur hit (haptics)" "mvp,combat" "$BODY_DIR/t118.md"
create_issue "T-119 — Combat : remplacer You / Opponent et copy EN → FR" "mvp,combat,ux-copy" "$BODY_DIR/t119.md"
create_issue "T-120 — Combat : passe design finale (polish UI)" "mvp,combat" "$BODY_DIR/t120.md"
create_issue "T-121 — Combat : sprites / particules d'attaque (optionnel)" "combat,content" "$BODY_DIR/t121.md"
create_issue "T-123 — Auth : garde tabs sans profil + sync reset routing" "mvp,auth,tracker" "$BODY_DIR/t123.md"
create_issue "T-124 — Combat : rebalance dégâts et noms d'attaque boss (FR)" "mvp,combat" "$BODY_DIR/t124.md"
create_issue "T-125 — Combat : rebalance XP victoire par action" "mvp,combat,tracker" "$BODY_DIR/t125.md"

echo ""
echo "OK. Board : gh project view ${PROJECT_NUM} --owner ${OWNER} --web"
