import { Pressable, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FlowText } from '@/components/ui/flow-text'

type SettingsScreenHeaderParams = {
  title: string
  onBack: () => void
}

export const SettingsScreenHeader = ({ title, onBack }: SettingsScreenHeaderParams) => (
  <View className="mb-6">
    <Pressable
      onPress={onBack}
      accessibilityRole="button"
      accessibilityLabel="Retour"
      hitSlop={12}
      className="-ml-1 mb-4 self-start active:opacity-60"
    >
      <MaterialIcons name="chevron-left" size={26} color="#8b7aa8" />
    </Pressable>
    <FlowText className="text-[22px] font-extrabold text-white" style={{ letterSpacing: -0.4 }}>
      {title}
    </FlowText>
  </View>
)
