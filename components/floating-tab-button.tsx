import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs'
import { PlatformPressable } from '@react-navigation/elements'
import * as Haptics from 'expo-haptics'
import { StyleSheet } from 'react-native'

export function FloatingTabButton(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      style={[props.style, styles.hit]}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {})
        }
        props.onPressIn?.(ev)
      }}
    >
      {props.children}
    </PlatformPressable>
  )
}

const styles = StyleSheet.create({
  hit: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
