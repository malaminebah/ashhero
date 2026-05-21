import { FirebaseError } from 'firebase/app'

export type AuthErrorContext = 'signIn' | 'passwordReset'

export const authErrorToUserMessage = (
  err: unknown,
  context: AuthErrorContext = 'signIn'
): string => {
  if (err instanceof FirebaseError) {
    switch (err.code) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        if (context === 'passwordReset') {
          return 'Impossible d’envoyer le lien pour le moment. Vérifie l’adresse ou réessaie plus tard.'
        }
        return 'E-mail ou mot de passe incorrect.'
      case 'auth/invalid-email':
        return 'Adresse e-mail invalide.'
      case 'auth/email-already-in-use':
        return 'Cette adresse e-mail est déjà utilisée.'
      case 'auth/weak-password':
        return 'Mot de passe trop faible (8 caractères, au moins une lettre et un chiffre).'
      case 'auth/too-many-requests':
        return 'Trop de tentatives, réessaie plus tard.'
      case 'auth/network-request-failed':
        return 'Problème de connexion réseau.'
      default:
        return err.message || 'Une erreur est survenue.'
    }
  }
  return 'Une erreur est survenue.'
}
