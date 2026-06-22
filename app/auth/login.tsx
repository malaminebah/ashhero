import { useEmailAuthActions } from '@/src/features/auth/hooks/useEmailAuthActions'
import { OnboardingPrimaryButton } from '@/src/features/onboarding/components/OnboardingPrimaryButton'
import { OnboardingSecondaryButton } from '@/src/features/onboarding/components/OnboardingSecondaryButton'
import { OnboardingInput } from '@/src/features/onboarding/components/OnboardingInput'
import { Link, useRouter } from 'expo-router'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LoginScreen() {
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
    if (uid) router.replace('/' as never)
  }

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
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
            <Text className="text-3xl font-bold text-brand-accent">ashhero</Text>
            <Text className="mt-3 text-center text-sm text-white/50">
              Ton coach anti-vape, version RPG.
            </Text>
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
              <Text className="text-sm text-brand-success">Mot de passe oublié</Text>
            </Pressable>
          </Link>

          {error ? <Text className="mb-4 text-sm text-brand-red">{error}</Text> : null}

          <OnboardingPrimaryButton label={pending ? '…' : 'Se connecter'} onPress={onSubmit} />

          <Text className="mt-8 text-center text-sm text-white/40">Pas de compte ?</Text>
          <Link href={'/auth/register' as never} asChild>
            <Pressable className="items-center py-3">
              <Text className="text-base text-white">Créer un compte</Text>
            </Pressable>
          </Link>

          <View className="my-6 h-px bg-white/8" />

          <Text className="mb-4 text-center text-xs leading-5 text-white/35">
            Démarrer sans e-mail (session anonyme). Pour retrouver tes données ailleurs, lie un
            compte plus tard depuis le profil.
          </Text>
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
