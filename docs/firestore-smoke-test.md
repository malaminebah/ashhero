# Smoke test Firestore — T-112

Checklist manuelle après `firebase deploy --only firestore:rules` sur le projet prod/staging.

**Prérequis** : compte email authentifié, `.env` configuré, app sur device ou simulateur.

| # | Action | Attendu |
|---|--------|---------|
| 1 | Inscription → onboarding → fin step 5 | Doc `users/{uid}/profile/data` créé |
| 2 | Relance app | Profil rechargé, pas d’onboarding |
| 3 | Victoire combat | Doc dans `users/{uid}/combats/` |
| 4 | Relapse (craving) | Doc `relapses/` + profil mis à jour |
| 5 | Débloquer une étape | Doc `etapes/` |
| 6 | Mood : save aujourd’hui | Doc `users/{uid}/moodEntries/{YYYY-MM-DD}` |
| 7 | Déconnexion → autre compte | Pas d’accès aux données du premier uid |

**Échec rules** : log console `[tracker]` / `[onboarding]` / hook mood — pas de crash silencieux.

**Référence rules** : `firestore.rules` à la racine du dépôt.
