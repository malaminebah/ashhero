import { Pressable, ScrollView, View } from 'react-native'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { flowShadow } from '@/constants/flowTheme'
import { FlowText } from '@/components/ui/flow-text'
import { getLegalDocument } from '../legalContent'
import type { LegalDocumentScreenParams } from '../types'
import { SettingsScreenHeader } from './SettingsScreenHeader'

export const LegalDocumentBody = ({ slug }: LegalDocumentScreenParams) => {
  const router = useRouter()
  const doc = getLegalDocument(slug)

  if (!doc) {
    return (
      <SafeAreaView className="flex-1 bg-[#FAFAFA]">
        <StatusBar style="dark" />
        <View className="flex-1 px-5 pt-2">
          <SettingsScreenHeader title="Document" onBack={() => router.back()} />
          <FlowText className="text-[15px] text-flow-muted">Document introuvable.</FlowText>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <StatusBar style="dark" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-5 pb-12 pt-2">
          <SettingsScreenHeader title={doc.title} onBack={() => router.back()} />

          <FlowText className="mb-5 px-1 text-[12px] text-flow-faint">
            Mis à jour le {doc.updatedAt}
          </FlowText>

          <View className="rounded-[18px] bg-flow-bg px-4 py-5" style={flowShadow.card}>
            {doc.paragraphs.map((paragraph, index) => (
              <FlowText
                key={paragraph}
                className={`text-[15px] leading-[26px] text-flow-muted ${index > 0 ? 'mt-5' : ''}`}
              >
                {paragraph}
              </FlowText>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
