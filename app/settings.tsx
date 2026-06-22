import { View, Pressable, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FLOW } from '@/constants/flowTheme'
import { FlowText } from '@/components/ui/flow-text'
import { useEmailAuthActions } from '@/src/features/auth/hooks/useEmailAuthActions'

export default function SettingsScreen() {
  const router = useRouter()
  const { signOut, pending: signOutPending } = useEmailAuthActions()

  const onLogout = async () => {
    const ok = await signOut()
    if (ok) router.replace('/auth/login' as never)
  }

  return (
    <SafeAreaView className="flex-1 bg-flow-bg">
      <StatusBar style="dark" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pb-10 pt-4">
          <View className="mb-8 flex-row items-center">
            <Pressable
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel="Retour"
              className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-flow-secondary active:opacity-70"
            >
              <MaterialIcons name="arrow-back" size={22} color={FLOW.muted} />
            </Pressable>
            <FlowText className="text-[22px] font-bold text-flow-text">Réglages</FlowText>
          </View>

          <View className="overflow-hidden rounded-2xl border border-flow-border bg-flow-secondary">
            <Pressable
              onPress={onLogout}
              disabled={signOutPending}
              className="flex-row items-center justify-between px-4 py-4 active:opacity-85 disabled:opacity-50"
            >
              <FlowText className="text-sm font-bold text-flow-text">
                {signOutPending ? '…' : 'Se déconnecter'}
              </FlowText>
              <MaterialIcons name="logout" size={20} color={FLOW.muted} />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
