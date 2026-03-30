import { Pressable, Text, View } from 'react-native'

type Props = {
  emoji?: string
  label: string
  variant?: 'primary' | 'outline'
  onPress: () => void
}

export const OnboardingChoiceCard = ({
  emoji,
  label,
  variant = 'outline',
  onPress,
}: Props) => (
  <Pressable
    onPress={onPress}
    className={`mb-3 w-full flex-row items-center gap-4 rounded-2xl border-2 px-4 py-4 active:opacity-90 ${
      variant === 'primary'
        ? 'border-brand-accent bg-brand-accent/25'
        : 'border-brand-accent/35 bg-white/[0.04]'
    }`}
  >
    {emoji ? (
      <View className="h-12 w-12 items-center justify-center rounded-xl border border-brand-accent/25 bg-brand-bg2">
        <Text className="text-2xl">{emoji}</Text>
      </View>
    ) : null}
    <Text
      className={`flex-1 font-mono text-xs uppercase tracking-[0.15rem] ${
        variant === 'primary' ? 'text-white' : 'text-white/90'
      }`}
    >
      {label}
    </Text>
  </Pressable>
)
