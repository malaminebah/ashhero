import type { ReactNode } from 'react'
import { ScrollView, View } from 'react-native'

type OnboardingScreenParams = {
  children: ReactNode
  footer?: ReactNode
  centered?: boolean
}

export const OnboardingScreen = ({ children, footer, centered = false }: OnboardingScreenParams) => (
  <View className="flex-1 bg-brand-bg">
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
