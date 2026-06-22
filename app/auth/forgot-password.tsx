import { useEmailAuthActions } from '@/src/features/auth/hooks/useEmailAuthActions'
import { AuthEntryRedirect } from '@/src/features/auth/components/AuthEntryRedirect'
import { OnboardingInput } from '@/src/features/onboarding/components/OnboardingInput'
import { OnboardingPrimaryButton } from '@/src/features/onboarding/components/OnboardingPrimaryButton'
import { OnboardingText } from '@/src/features/onboarding/components/OnboardingText'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ForgotPasswordScreen() {
  const { sendReset, error, pending, clearError } = useEmailAuthActions()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const onSubmit = async () => {
    clearError()
    setSent(false)
    const ok = await sendReset(email)
    if (ok) setSent(true)
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
          <View className="mb-10 items-center pt-6">
            <OnboardingText className="text-[32px] font-bold text-flow-brand">ashhero</OnboardingText>
            <OnboardingText className="mt-6 text-center text-[22px] font-bold text-flow-text">
              Mot de passe oublié
            </OnboardingText>
            <OnboardingText className="mt-3 text-center text-[15px] leading-6 text-flow-muted">
              Saisis l’e-mail de ton compte. Si un compte existe, tu recevras un lien (vérifie les
              spams).
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

          {error ? (
            <OnboardingText className="mb-4 text-sm text-red-500">{error}</OnboardingText>
          ) : null}
          {sent && !error ? (
            <OnboardingText className="mb-4 text-sm text-[#10B981]">
              Si cette adresse est valide, un e-mail a été envoyé.
            </OnboardingText>
          ) : null}

          <OnboardingPrimaryButton
            label={pending ? '…' : 'Envoyer le lien'}
            onPress={onSubmit}
            disabled={pending}
          />

          <Link href={'/auth/login' as never} asChild>
            <Pressable className="mt-8 items-center py-3">
              <OnboardingText className="text-base font-bold text-flow-text">
                Retour à la connexion
              </OnboardingText>
            </Pressable>
          </Link>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
