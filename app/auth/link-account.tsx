import { useEmailAuthActions } from '@/src/features/auth/hooks/useEmailAuthActions'
import { signupPasswordFieldError } from '@/src/features/auth/utils/passwordPolicy'
import { OnboardingPrimaryButton } from '@/src/features/onboarding/components/OnboardingPrimaryButton'
import { OnboardingInput } from '@/src/features/onboarding/components/OnboardingInput'
import { OnboardingText } from '@/src/features/onboarding/components/OnboardingText'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LinkAccountScreen() {
  const router = useRouter()
  const { linkAccount, error, pending, clearError } = useEmailAuthActions()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldError, setFieldError] = useState<string | null>(null)

  const onSubmit = async () => {
    clearError()
    const passwordError = signupPasswordFieldError(password)
    setFieldError(passwordError)
    if (passwordError) return

    const uid = await linkAccount(email, password)
    if (uid) {
      Alert.alert(
        'Compte créé',
        'Ta progression est maintenant sauvegardée. Tu peux te reconnecter avec cet e-mail sur n\'importe quel appareil.'
      )
      router.back()
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-flow-bg">
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
            <OnboardingText className="mt-4 text-center text-[22px] font-bold leading-7 text-flow-text">
              Sauvegarde ta progression
            </OnboardingText>
            <OnboardingText className="mt-2 text-center text-[15px] leading-6 text-flow-muted">
              Ton parcours, tes badges et ton XP restent liés à ton héros — ajoute
              simplement un e-mail et un mot de passe.
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
            placeholder="8 caractères minimum"
            secureTextEntry
            autoComplete="new-password"
          />

          {fieldError ?? error ? (
            <OnboardingText className="mb-4 text-sm text-red-500">
              {fieldError ?? error}
            </OnboardingText>
          ) : null}

          <View className="mt-2">
            <OnboardingPrimaryButton
              label={pending ? '…' : 'Créer mon compte'}
              onPress={() => void onSubmit()}
              disabled={pending || email.length === 0 || password.length === 0}
            />
          </View>

          <OnboardingText className="mt-6 text-center text-[11px] leading-4 text-flow-faint">
            Ta progression actuelle est conservée — même héros, même XP.
          </OnboardingText>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
