import { View, Text, ScrollView, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useEmailAuthActions } from '@/src/features/auth/hooks/useEmailAuthActions'

export default function SettingsScreen() {
  const router = useRouter()
  const { signOut, pending: signOutPending } = useEmailAuthActions()

  const onLogout = async () => {
    const ok = await signOut()
    if (ok) router.replace('/auth/login' as never)
  }

  return (
    <ScrollView className="flex-1 bg-brand-bg" showsVerticalScrollIndicator={false}>
      <View className="px-5 pb-10 pt-12">
        <View className="mb-8 flex-row items-center">
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Retour"
            className="mr-3 h-10 w-10 items-center justify-center rounded-full active:opacity-70"
          >
            <MaterialIcons name="arrow-back" size={22} color="#f3e8ff" />
          </Pressable>
          <Text className="font-mono text-lg font-bold uppercase tracking-[0.2rem] text-white">
            Réglages
          </Text>
        </View>

        <View className="rounded-2xl border border-white/10 bg-white/[0.03]">
          <Pressable
            onPress={onLogout}
            disabled={signOutPending}
            className="flex-row items-center justify-between px-4 py-4 active:opacity-85 disabled:opacity-50"
          >
            <Text className="font-mono text-sm text-white/85">Se déconnecter</Text>
            <MaterialIcons name="logout" size={20} color="rgba(255,255,255,0.45)" />
          </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}
