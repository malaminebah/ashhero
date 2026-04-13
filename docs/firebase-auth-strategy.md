# Stratégie Firebase Auth — AshHero (V1)

Document de référence pour le todo « stratégie auth + impacts Firestore ». À faire évoluer avec le produit.

## Décision retenue (V1)

| Phase | Mécanisme | Rôle |
|--------|-----------|------|
| **V1 — maintenant** | **Anonyme + liaison email/mot de passe** | Premier lancement sans friction ; l’utilisateur peut **lier** le même `uid` à un email pour retrouver ses données sur un autre téléphone. |
| **V1 — entrée « compte »** | **Connexion email/mot de passe** | Pour « J’ai déjà un compte » : `signInWithEmailAndPassword` (pas d’anonyme). |
| **Plus tard (V2)** | Google / Apple Sign-In | `linkWithCredential` ou compte uniquement social ; nécessite config native (Expo) plus lourde. |

### Pourquoi ne pas seulement « créer un compte » sans anonyme ?

Tu peux, mais tu perds l’avantage actuel : **démarrer tout de suite** avec un `uid` stable et du Firestore déjà écrit. La liaison préserve exactement ce `uid` :

- `signInAnonymously` → données sous `users/{uid}/...`
- `linkWithCredential(EmailAuthProvider.credential(email, password))` → **même `uid`**, mêmes documents.

### Pourquoi pas Google/Apple en V1 ?

Avec **Firebase JS + Expo**, l’email/mot de passe est entièrement supporté par le SDK web. Google/Apple impliquent en général **flux OAuth natifs ou Custom Token**, plus de pièces à configurer (bundle ID, SHA, écran consentement). À planifier après la boucle email stable.

---

## Flux utilisateur cibles

1. **Nouvel utilisateur — « Commencer l’aventure »**  
   - `signInAnonymously` (comme aujourd’hui).  
   - Optionnel : écran ou section profil **« Sécuriser mon compte »** → email + mot de passe → `linkWithCredential`.

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

Aujourd’hui le repo ne contient **pas** de `firestore.rules` versionné ; elles sont à maintenir dans la **console Firebase** (ou via Firebase CLI si tu ajoutes un dossier `firebase/` plus tard).

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

| Question | Choix V1 |
|----------|----------|
| Anonyme au démarrage ? | Oui (conservé). |
| Compte « permanent » ? | Email + mot de passe, avec **link** depuis l’anonyme. |
| « J’ai déjà un compte » ? | `signInWithEmailAndPassword` sans anonyme préalable sur cet écran. |
| Google / Apple ? | V2. |
| Firestore ? | Règles par `uid` sur `users/{userId}/**` ; pas de changement de schéma obligatoire. |

---

## Checklist avant d’implémenter l’UI auth

- [ ] Activer **Email/Password** dans Firebase Console.
- [ ] Déployer / coller les **Firestore rules** ci-dessus (ou équivalent plus strict si besoin).
- [ ] Tracer le flux navigation : welcome → soit anon, soit login email (pas les deux dans le désordre).
- [ ] Tester sur 2 appareils : anonyme → lier email → se connecter sur le 2e avec le même email.
