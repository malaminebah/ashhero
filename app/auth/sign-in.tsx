import { useEmailAuthActions } from '@/src/features/auth/hooks/useEmailAuthActions'
import { AuthEntryRedirect } from '@/src/features/auth/components/AuthEntryRedirect'
import { OnboardingPrimaryButton } from '@/src/features/onboarding/components/OnboardingPrimaryButton'
import { OnboardingSecondaryButton } from '@/src/features/onboarding/components/OnboardingSecondaryButton'
import { OnboardingInput } from '@/src/features/onboarding/components/OnboardingInput'
import { OnboardingText } from '@/src/features/onboarding/components/OnboardingText'
import { Link, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignInScreen() {
  const router = useRouter()
  const { signIn, signInAsGuest, error, pending, clearError } = useEmailAuthActions()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async () => {
    clearError()
    const uid = await signIn(email, password)
    if (uid) router.replace('/' as never)
  }

  const onGuest = async () => {
    clearError()
    const uid = await signInAsGuest()
    if (uid) router.replace('/breathe' as never)
  }

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
          contentContainerClassName="flex-grow px-6 py-6"
          showsVerticalScrollIndicator={false}
        >
          <Pressable onPress={() => router.back()} className="mb-2 self-start py-1 active:opacity-70">
            <OnboardingText className="text-sm text-flow-muted">Retour</OnboardingText>
          </Pressable>

          <View className="mb-9 items-center pt-6">
            <OnboardingText className="text-[28px] font-extrabold text-flow-brand" style={{ letterSpacing: -0.5 }}>
              ashhero
            </OnboardingText>
            <OnboardingText className="mt-6 text-center text-2xl font-bold leading-8 text-flow-text">
              Content de te revoir
            </OnboardingText>
            <OnboardingText className="mt-2 text-center text-[15px] leading-6 text-flow-muted">
              Connecte-toi pour retrouver ta progression.
            </OnboardingText>
          </View>

          <OnboardingInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="ton@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          <OnboardingInput
            label="Mot de passe"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
            autoComplete="password"
          />

          <Link href={'/auth/forgot-password' as never} asChild>
            <Pressable className="self-end py-1">
              <OnboardingText className="text-sm font-semibold text-flow-cta">
                Mot de passe oublié ?
              </OnboardingText>
            </Pressable>
          </Link>

          {error ? (
            <OnboardingText className="mt-3 text-sm text-red-500">{error}</OnboardingText>
          ) : null}

          <View className="flex-1" />

          <View className="mt-8 gap-3">
            <OnboardingPrimaryButton
              label={pending ? '…' : 'Se connecter'}
              onPress={() => void onSubmit()}
              disabled={pending}
            />
            <OnboardingSecondaryButton
              label="Continuer en invité"
              onPress={() => void onGuest()}
              disabled={pending}
            />
          </View>

          <Link href={'/auth/register' as never} asChild>
            <Pressable className="mt-5 items-center py-2 active:opacity-70">
              <OnboardingText className="text-sm text-flow-faint">
                Pas encore de compte ?{' '}
                <OnboardingText className="text-sm font-bold text-flow-cta">
                  Créer un compte
                </OnboardingText>
              </OnboardingText>
            </Pressable>
          </Link>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
