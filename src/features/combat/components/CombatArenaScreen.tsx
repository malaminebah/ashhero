import { titleSerif } from '@/constants/theme'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { LinearGradient } from 'expo-linear-gradient'
import { Pressable, Text, View } from 'react-native'

type Props = {
  onLaunchCombat: () => void
}

export const CombatArenaScreen = ({ onLaunchCombat }: Props) => (
  <View className="flex-1 bg-brand-bg">
    <View className="h-[42%] min-h-[240px] max-h-[360px] w-full overflow-hidden"></View>

    <View className="flex-1 items-center px-6 pt-2">
      <Text className="mb-3 text-7xl leading-[80px]">⚔️</Text>
      <Text
        className="text-3xl font-bold uppercase tracking-[0.12rem] text-white"
        style={{ fontFamily: titleSerif }}
      >
        Arène
      </Text>
      <Text className="mt-4 max-w-[300px] text-center font-mono text-sm leading-6 text-white/65">
        Affronte l&apos;envie, gagne de l&apos;XP et deviens plus fort chaque
        jour.
      </Text>

      <Pressable
        onPress={onLaunchCombat}
        accessibilityRole="button"
        accessibilityLabel="Lancer un combat"
        className="mt-auto mb-10 active:opacity-90"
      >
        <View
          className="h-[148px] w-[148px] items-center justify-center rounded-full border-2 border-brand-success/50"
          style={{
            shadowColor: '#22c55e',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.65,
            shadowRadius: 28,
            elevation: 16,
          }}
        >
          <LinearGradient
            colors={['#15803d', '#22c55e', '#16a34a']}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.8, y: 1 }}
            style={{
              width: 140,
              height: 140,
              borderRadius: 70,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 12,
            }}
          >
            <MaterialCommunityIcons
              name="sword-cross"
              size={36}
              color="#ecfdf5"
            />
            <Text className="mt-2 text-center font-mono text-[9px] font-bold uppercase leading-3 tracking-wider text-white">
              Lancer{'\n'}un combat
            </Text>
          </LinearGradient>
        </View>
      </Pressable>
    </View>
  </View>
)
