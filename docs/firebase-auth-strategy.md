# Stratégie Firebase Auth — AshHero (V1)

Document de référence pour le todo « stratégie auth + impacts Firestore ». À faire évoluer avec le produit.

## Décision produit (V1)

**V1 = les deux** : sur les écrans d’authentification, l’utilisateur peut soit **s’inscrire / se connecter en e-mail + mot de passe**, soit **démarrer en session anonyme** (`signInAnonymously`). Aucun de ces modes ne remplace l’autre ; le reset mot de passe ne concerne que le parcours e-mail. La **liaison** e-mail depuis un compte anonyme (même `uid`) est prévue côté produit pour une étape « Sécuriser mon compte » (plus tard / profil).

## Décision retenue (V1)

| Phase | Mécanisme | Rôle |
|--------|-----------|------|
| **V1** | **E-mail + mot de passe** | Inscription, connexion, `sendPasswordResetEmail`. |
| **V1** | **Anonyme** | Démarrage rapide, même arbre Firestore `users/{uid}`. |
| **V1+** | **Liaison** `linkWithCredential` (email) | Même `uid` que l’anonyme, données conservées. |
| **V2** | Google / Apple Sign-In | `linkWithCredential` ou flux dédié ; config native. |

### Pourquoi ne pas seulement « créer un compte » sans anonyme ?

Tu peux, mais tu perds l’avantage actuel : **démarrer tout de suite** avec un `uid` stable et du Firestore déjà écrit. La liaison préserve exactement ce `uid` :

- `signInAnonymously` → données sous `users/{uid}/...`
- `linkWithCredential(EmailAuthProvider.credential(email, password))` → **même `uid`**, mêmes documents.

### Pourquoi pas Google/Apple en V1 ?

Avec **Firebase JS + Expo**, l’email/mot de passe est entièrement supporté par le SDK web. Google/Apple impliquent en général **flux OAuth natifs ou Custom Token**, plus de pièces à configurer (bundle ID, SHA, écran consentement). À planifier après la boucle email stable.

---

## Flux utilisateur cibles

*L’app propose **côte à côte** l’e-mail (inscription / connexion) et l’anonyme : l’utilisateur choisit sur l’écran auth.*

0. **V1 — nouvel utilisateur (e-mail)**  
   - Inscription : email + mot de passe → compte Firestore dès le premier écran de setup.

1. **Nouvel utilisateur — « Commencer l’aventure » (option anonyme)**  
   - `signInAnonymously` (si ce flux est conservé).  
   - Optionnel : **« Sécuriser mon compte »** → email + mot de passe → `linkWithCredential`.

2. **Retour — « J’ai déjà un compte »**  
   - Écran email + mot de passe → `signInWithEmailAndPassword`.  
   - **Ne pas** appeler `signInAnonymously` avant (sinon tu crées un anonyme inutile). Ordre : afficher le choix **avant** tout sign-in, ou déconnecter l’anonyme si tu changes de stratégie mid-flight (à éviter si données locales non synchronisées).

3. **Mot de passe oublié (recommandé V1.1)**  
   - `sendPasswordResetEmail` depuis le SDK ; email Firebase obligatoire.

---

## Implémentation technique (prochaines tâches code)

Fichiers concernés actuels : [src/services/auth.service.ts](../src/services/auth.service.ts), [src/services/firebase.ts](../src/services/firebase.ts), [app/_layout.tsx](../app/_layout.tsx), [app/index.tsx](../app/index.tsx).

À ajouter dans `auth.service.ts` (APIs indicatives) :

- `linkEmailPassword(email, password)` — nécessite `auth.currentUser` non null, idéalement `isAnonymous`.
- `signInWithEmail(email, password)` — flux « déjà un compte ».
- `signOutUser()` — si besoin de basculer de session proprement.
- Gestion d’erreurs Firebase (`auth/email-already-in-use`, `auth/weak-password`, `auth/invalid-credential`, etc.) pour l’UI.

**Important** : après `signInWithEmailAndPassword` sur un **nouvel** appareil, le profil est rechargé comme aujourd’hui via `getProfile(uid)` dans le layout.

---

## Règles Firestore (sécurité)

Le fichier source des règles est **`firestore.rules`** à la racine du dépôt (déploiement : `firebase deploy --only firestore:rules` avec un projet lié). La console Firebase doit rester **alignée** sur ce fichier.

### Modèle d’accès recommandé

Tout le contenu utilisateur est sous `users/{userId}/...`. Règle minimale saine :

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null
        && request.auth.uid == userId;
    }
  }
}
```

- Un utilisateur **anonyme** a quand même un `request.auth.uid` : la règle s’applique pareil.
- Après **liaison email**, le `uid` ne change pas : aucune migration de chemins Firestore.

### Console Firebase — fournisseurs à activer

- **Anonymous** : déjà utilisé.
- **Email/Password** : activer pour liaison + connexion.

### Points de vigilance

- **email-already-in-use** : si quelqu’un lie un email déjà utilisé par un *autre* compte Firebase, la liaison échoue. L’UI doit expliquer « ce mail est déjà associé à un compte → connecte-toi avec ce mail ».
- Ne jamais exposer de clé **Admin** SDK dans l’app ; tout reste côté client + règles strictes.

---

## Récap décision (pour la suite du plan)

| Question | Choix |
|----------|--------|
| V1 — e-mail ? | **Oui** : inscription, connexion, reset. |
| V1 — anonyme ? | **Oui** : `signInAnonymously` depuis l’écran auth (invité). |
| Compte « permanent » ? | E-mail + mot de passe ; **liaison** depuis anonyme (même `uid`) en option produit. |
| « J’ai déjà un compte » ? | `signInWithEmailAndPassword` sur l’écran dédié (ne pas lancer d’anonyme juste avant sur ce flux). |
| Google / Apple ? | V2. |
| Firestore ? | Règles par `uid` sur `users/{userId}/**` ; pas de changement de schéma obligatoire. |

---

## Checklist avant d’implémenter l’UI auth

- [ ] Activer **Email/Password** dans Firebase Console.
- [ ] Déployer / coller les **Firestore rules** ci-dessus (ou équivalent plus strict si besoin).
- [ ] Tracer le flux navigation : welcome → soit anon, soit login email (pas les deux dans le désordre).
- [ ] Tester sur 2 appareils : anonyme → lier email → se connecter sur le 2e avec le même email.
