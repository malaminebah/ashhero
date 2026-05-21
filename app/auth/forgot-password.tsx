import { useEmailAuthActions } from '@/src/features/auth/hooks/useEmailAuthActions'
import { Link } from 'expo-router'
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
    <KeyboardAvoidingView
      className="flex-1 bg-brand-bg"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="flex-grow justify-center px-6 py-10"
      >
        <Text className="text-[9px] tracking-[4px] text-white/20 uppercase font-mono mb-1">
          Réinitialisation
        </Text>
        <Text className="text-xl font-bold text-white tracking-wider mb-2">Mot de passe oublié</Text>
        <Text className="text-white/40 text-xs font-mono leading-5 mb-6">
          Saisis l’e-mail de ton compte. Si un compte existe, tu recevras un lien (vérifie les spams).
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

        {error ? (
          <Text className="text-brand-red text-xs font-mono mb-3">{error}</Text>
        ) : null}
        {sent && !error ? (
          <Text className="text-[#22c55e] text-xs font-mono mb-3">
            Si cette adresse est valide, un e-mail a été envoyé.
          </Text>
        ) : null}

        <Pressable
          onPress={onSubmit}
          disabled={pending}
          className="w-full py-4 rounded-2xl items-center bg-brand-accentDark active:opacity-90 disabled:opacity-50"
        >
          <Text className="text-white text-xs font-mono tracking-[2px] uppercase">
            {pending ? '…' : 'Envoyer le lien'}
          </Text>
        </Pressable>

        <Link href={'/auth/login' as never} asChild>
          <Pressable className="items-center py-4 mt-6">
            <Text className="text-white/50 text-xs font-mono">Retour à la connexion</Text>
          </Pressable>
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
