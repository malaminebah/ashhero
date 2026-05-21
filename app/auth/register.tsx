import { useEmailAuthActions } from '@/src/features/auth/hooks/useEmailAuthActions'
import { signupPasswordFieldError } from '@/src/features/auth/utils/passwordPolicy'
import { Link, useRouter } from 'expo-router'
import { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
} from 'react-native'

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
          Inscription
        </Text>
        <Text className="text-2xl font-bold text-white tracking-wider mb-6">
          ASH<Text className="text-brand-accent">HERO</Text>
        </Text>

        <Text className="text-white/50 text-xs font-mono mb-2">E-mail</Text>
        <TextInput
          value={email}
          onChangeText={(t) => {
            setFormError(null)
            setEmail(t)
          }}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          className="bg-brand-surface border border-white/10 rounded-md px-3 py-3 text-white font-mono text-sm mb-4"
        />

        <Text className="text-white/50 text-xs font-mono mb-2">
          Mot de passe (8 caractères min., 1 lettre et 1 chiffre)
        </Text>
        <TextInput
          value={password}
          onChangeText={(t) => {
            setFormError(null)
            setPassword(t)
          }}
          secureTextEntry
          autoComplete="new-password"
          className="bg-brand-surface border border-white/10 rounded-md px-3 py-3 text-white font-mono text-sm mb-4"
        />

        {formError || error ? (
          <Text className="text-brand-red text-xs font-mono mb-4">{formError ?? error}</Text>
        ) : null}

        <Pressable
          onPress={onSubmit}
          disabled={pending}
          className="w-full py-4 rounded-2xl items-center bg-brand-accentDark active:opacity-90 disabled:opacity-50"
        >
          <Text className="text-white text-xs font-mono tracking-[2px] uppercase">
            {pending ? '…' : "S'inscrire"}
          </Text>
        </Pressable>

        <Link href={'/auth/login' as never} asChild>
          <Pressable className="items-center py-4 mt-2">
            <Text className="text-white/50 text-xs font-mono">Déjà un compte ? Connexion</Text>
          </Pressable>
        </Link>

        <Text className="text-center text-white/25 text-[10px] font-mono my-2">ou</Text>
        <Pressable
          onPress={onGuest}
          disabled={pending}
          className="w-full py-3 rounded-xl items-center border border-white/10 active:opacity-80 disabled:opacity-50"
        >
          <Text className="text-white/50 text-xs font-mono">
            {pending ? '…' : 'Continuer en invité (anonyme)'}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
