import { useEmailAuthActions } from '@/src/features/auth/hooks/useEmailAuthActions'
import { AuthEntryRedirect } from '@/src/features/auth/components/AuthEntryRedirect'
import { OnboardingPrimaryButton } from '@/src/features/onboarding/components/OnboardingPrimaryButton'
import { OnboardingInput } from '@/src/features/onboarding/components/OnboardingInput'
import { OnboardingText } from '@/src/features/onboarding/components/OnboardingText'
import { Link, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignInScreen() {
  const router = useRouter()
  const { signIn, error, pending, clearError } = useEmailAuthActions()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async () => {
    clearError()
    const uid = await signIn(email, password)
    if (uid) router.replace('/' as never)
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
          contentContainerClassName="flex-grow px-6 py-8"
          showsVerticalScrollIndicator={false}
        >
          <Pressable onPress={() => router.back()} className="mb-2 self-start py-1 active:opacity-70">
            <OnboardingText className="text-sm text-flow-muted">Retour</OnboardingText>
          </Pressable>

          <View className="mb-10 items-center pt-4">
            <OnboardingText className="text-[28px] font-bold text-flow-brand">ashhero</OnboardingText>
            <OnboardingText className="mt-2 text-center text-[15px] text-flow-muted">
              Content de te revoir.
            </OnboardingText>
          </View>

          <OnboardingInput
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            placeholder="toi@exemple.com"
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
            <Pressable className="mb-6 self-end py-1">
              <OnboardingText className="text-sm text-flow-cta">Mot de passe oublié</OnboardingText>
            </Pressable>
          </Link>

          {error ? (
            <OnboardingText className="mb-4 text-sm text-red-500">{error}</OnboardingText>
          ) : null}

          <OnboardingPrimaryButton
            label={pending ? '…' : 'Se connecter'}
            onPress={onSubmit}
            disabled={pending}
          />

          <OnboardingText className="mt-8 text-center text-sm text-flow-muted">
            Pas encore de compte ?
          </OnboardingText>
          <Link href={'/auth/register' as never} asChild>
            <Pressable className="items-center py-3">
              <OnboardingText className="text-base font-bold text-flow-text">
                Créer un compte
              </OnboardingText>
            </Pressable>
          </Link>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
