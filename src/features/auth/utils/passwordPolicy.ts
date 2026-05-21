/** Règles d’inscription côté app (Firebase impose au minimum 6 ; on est plus strict). */
export const SIGNUP_PASSWORD_MIN_LEN = 8

/** Au moins une lettre ASCII, au moins un chiffre, longueur ≥ 8. */
export const SIGNUP_PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/

export function signupPasswordFieldError(password: string): string | null {
  if (password.length === 0) return 'Saisis un mot de passe.'
  if (password.length < SIGNUP_PASSWORD_MIN_LEN) {
    return `Le mot de passe doit faire au moins ${SIGNUP_PASSWORD_MIN_LEN} caractères.`
  }
  if (!SIGNUP_PASSWORD_REGEX.test(password)) {
    return 'Le mot de passe doit contenir au moins une lettre et un chiffre.'
  }
  return null
}
