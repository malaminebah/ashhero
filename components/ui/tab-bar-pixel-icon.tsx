import { Image } from 'expo-image'
import type { ImageSource } from 'expo-image'
import type { TabBarPixelIconParams } from '@/src/features/navigation/types'

export const TabBarPixelIcon = ({
  source,
  focused,
  size = 32,
}: TabBarPixelIconParams) => (
  <Image
    source={source as ImageSource}
    style={{
      width: size,
      height: size,
      opacity: focused ? 1 : 0.5,
    }}
    contentFit="contain"
  />
)
