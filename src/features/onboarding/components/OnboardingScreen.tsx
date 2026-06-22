import type { ReactNode } from 'react'
import { ScrollView, View } from 'react-native'

type OnboardingScreenParams = {
  children: ReactNode
  footer?: ReactNode
  centered?: boolean
  variant?: 'default' | 'breathe'
}

export const OnboardingScreen = ({
  children,
  footer,
  centered = false,
  variant = 'default',
}: OnboardingScreenParams) => (
  <View className={`flex-1 ${variant === 'breathe' ? 'bg-flow-breathe' : 'bg-flow-bg'}`}>
    <ScrollView
      className="flex-1 px-6 pt-6"
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View className={centered ? 'flex-1 items-center justify-center' : 'flex-1'}>{children}</View>
    </ScrollView>
    {footer ? <View className="px-6 pb-10 pt-2">{footer}</View> : null}
  </View>
)
