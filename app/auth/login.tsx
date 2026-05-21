import { useEmailAuthActions } from '@/src/features/auth/hooks/useEmailAuthActions'
import { Link, useRouter } from 'expo-router'
import { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'

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
    <KeyboardAvoidingView
      className="flex-1 bg-brand-bg"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="flex-grow justify-center px-6 py-10"
      >
        <Text className="text-[9px] tracking-[4px] text-white/20 uppercase font-mono mb-1">
          Connexion
        </Text>
        <Text className="text-2xl font-bold text-white tracking-wider mb-6">
          ASH<Text className="text-brand-accent">HERO</Text>
        </Text>

        <Text className="text-white/50 text-xs font-mono mb-2">E-mail</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          className="bg-brand-surface border border-white/10 rounded-md px-3 py-3 text-white font-mono text-sm mb-4"
        />

        <Text className="text-white/50 text-xs font-mono mb-2">Mot de passe</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
          className="bg-brand-surface border border-white/10 rounded-md px-3 py-3 text-white font-mono text-sm mb-2"
        />

        <Link href={'/auth/forgot-password' as never} asChild>
          <Pressable className="self-end py-2">
            <Text className="text-brand-accent/90 text-xs font-mono">Mot de passe oublié</Text>
          </Pressable>
        </Link>

        {error ? (
          <Text className="text-brand-red text-xs font-mono mb-4 mt-1">{error}</Text>
        ) : null}

        <Pressable
          onPress={onSubmit}
          disabled={pending}
          className="w-full py-4 rounded-2xl items-center bg-brand-accentDark active:opacity-90 disabled:opacity-50"
        >
          <Text className="text-white text-xs font-mono tracking-[2px] uppercase">
            {pending ? '…' : 'Se connecter'}
          </Text>
        </Pressable>

        <Text className="text-center text-white/30 text-xs font-mono mt-6">Pas de compte ?</Text>
        <Link href={'/auth/register' as never} asChild>
          <Pressable className="items-center py-3">
            <Text className="text-white text-sm font-mono">Créer un compte</Text>
          </Pressable>
        </Link>

        <View className="h-px bg-white/10 my-4" />
        <Text className="text-center text-white/30 text-[10px] font-mono mb-2">
          Démarrer sans e-mail (session anonyme). Pour retrouver les données ailleurs, lie un compte plus tard (profil).
        </Text>
        <Pressable
          onPress={onGuest}
          disabled={pending}
          className="w-full py-3 rounded-xl items-center border border-white/15 active:opacity-80 disabled:opacity-50"
        >
          <Text className="text-white/70 text-xs font-mono tracking-wide">
            {pending ? '…' : 'Continuer en invité (anonyme)'}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
