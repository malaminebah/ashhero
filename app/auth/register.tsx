import { useEmailAuthActions } from '@/src/features/auth/hooks/useEmailAuthActions'
import { AuthEntryRedirect } from '@/src/features/auth/components/AuthEntryRedirect'
import { signupPasswordFieldError } from '@/src/features/auth/utils/passwordPolicy'
import { OnboardingInput } from '@/src/features/onboarding/components/OnboardingInput'
import { OnboardingPrimaryButton } from '@/src/features/onboarding/components/OnboardingPrimaryButton'
import { OnboardingSecondaryButton } from '@/src/features/onboarding/components/OnboardingSecondaryButton'
import { OnboardingText } from '@/src/features/onboarding/components/OnboardingText'
import { Link, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const EMAIL_LIKE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function RegisterScreen() {
  const router = useRouter()
  const { register, signInAsGuest, error, pending, clearError } = useEmailAuthActions()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState<string | null>(null)

  const onSubmit = async () => {
    clearError()
    const e = email.trim()
    if (!e) {
      setFormError('Saisis ton adresse e-mail.')
      return
    }
    if (!EMAIL_LIKE.test(e)) {
      setFormError('Adresse e-mail invalide.')
      return
    }
    const pwdErr = signupPasswordFieldError(password)
    if (pwdErr) {
      setFormError(pwdErr)
      return
    }
    setFormError(null)
    const uid = await register(e, password)
    if (uid) router.replace('/' as never)
  }

  const onGuest = async () => {
    clearError()
    const uid = await signInAsGuest()
    if (uid) router.replace('/' as never)
  }

  const displayError = formError ?? error

  return (
    <SafeAreaView className="flex-1 bg-flow-bg">
      <AuthEntryRedirect />
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="flex-grow px-6 py-8"
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-10 items-center pt-6">
            <OnboardingText className="text-[32px] font-bold text-flow-brand">ashhero</OnboardingText>
            <OnboardingText className="mt-3 text-center text-[15px] text-flow-muted">
              Crée ton compte pour sauvegarder ta progression.
            </OnboardingText>
          </View>

          <OnboardingInput
            label="E-mail"
            value={email}
            onChangeText={(t) => {
              setFormError(null)
              setEmail(t)
            }}
            placeholder="toi@exemple.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          <OnboardingInput
            label="Mot de passe (8 car. min., 1 lettre, 1 chiffre)"
            value={password}
            onChangeText={(t) => {
              setFormError(null)
              setPassword(t)
            }}
            placeholder="••••••••"
            secureTextEntry
            autoComplete="password"
          />

          {displayError ? (
            <OnboardingText className="mb-4 text-sm text-red-500">{displayError}</OnboardingText>
          ) : null}

          <OnboardingPrimaryButton
            label={pending ? '…' : "S'inscrire"}
            onPress={onSubmit}
            disabled={pending}
          />

          <OnboardingText className="mt-8 text-center text-sm text-flow-muted">
            Déjà un compte ?
          </OnboardingText>
          <Link href={'/auth/sign-in' as never} asChild>
            <Pressable className="items-center py-3">
              <OnboardingText className="text-base font-bold text-flow-text">Se connecter</OnboardingText>
            </Pressable>
          </Link>

          <View className="my-6 h-px bg-flow-border" />

          <OnboardingText className="mb-4 text-center text-xs leading-5 text-flow-faint">
            Démarrer sans e-mail (session anonyme). Pour retrouver tes données ailleurs, lie un
            compte plus tard depuis le profil.
          </OnboardingText>
          <OnboardingSecondaryButton
            label={pending ? '…' : 'Continuer en invité'}
            onPress={onGuest}
            disabled={pending}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
