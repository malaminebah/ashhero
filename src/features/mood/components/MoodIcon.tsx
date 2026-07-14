import { View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import type { ComponentProps } from 'react'
import { getPrimaryMood } from '../moodTaxonomy'
import type { MoodIconParams } from '../types'

type MciName = ComponentProps<typeof MaterialCommunityIcons>['name']

/** Emotion glyph inside a tinted circle — single visual for a mood across the app. */
export const MoodIcon = ({ mood, size = 44 }: MoodIconParams) => {
  const def = getPrimaryMood(mood)
  return (
    <View
      className="items-center justify-center rounded-full"
      style={{ width: size, height: size, backgroundColor: `${def.circleColor}26` }}
    >
      <MaterialCommunityIcons
        name={def.icon as MciName}
        size={Math.round(size * 0.55)}
        color={def.circleColor}
      />
    </View>
  )
}
