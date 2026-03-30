import { Pressable, Text } from 'react-native'

type Props = {
  label: string
  onPress: () => void
}

export const OnboardingPrimaryButton = ({ label, onPress }: Props) => (
  <Pressable
    onPress={onPress}
    className="w-full items-center justify-center rounded-2xl bg-brand-accent py-4 active:opacity-90"
  >
    <Text className="font-mono text-xs uppercase tracking-[0.2rem] text-white">{label}</Text>
  </Pressable>
)
