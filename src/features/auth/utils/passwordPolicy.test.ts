import { describe, expect, it } from 'vitest'
import { signupPasswordFieldError } from './passwordPolicy'

describe('signupPasswordFieldError', () => {
  it(`
    Given an empty password
    When signupPasswordFieldError is called
    Then a required-field message is returned
  `, () => {
    const password = ''

    const error = signupPasswordFieldError(password)

    expect(error).toBe('Saisis un mot de passe.')
  })

  it(`
    Given a password shorter than 8 characters
    When signupPasswordFieldError is called
    Then a minimum-length message is returned
  `, () => {
    const password = 'abc1'

    const error = signupPasswordFieldError(password)

    expect(error).toBe('Le mot de passe doit faire au moins 8 caractères.')
  })

  it(`
    Given a password with 8+ chars but no digit
    When signupPasswordFieldError is called
    Then a letter-and-digit rule message is returned
  `, () => {
    const password = 'abcdefgh'

    const error = signupPasswordFieldError(password)

    expect(error).toBe(
      'Le mot de passe doit contenir au moins une lettre et un chiffre.'
    )
  })

  it(`
    Given a password with 8+ chars but no letter
    When signupPasswordFieldError is called
    Then a letter-and-digit rule message is returned
  `, () => {
    const password = '12345678'

    const error = signupPasswordFieldError(password)

    expect(error).toBe(
      'Le mot de passe doit contenir au moins une lettre et un chiffre.'
    )
  })

  it(`
    Given a valid password with letters and digits
    When signupPasswordFieldError is called
    Then no error is returned
  `, () => {
    const password = 'secret42'

    const error = signupPasswordFieldError(password)

    expect(error).toBeNull()
  })
})
