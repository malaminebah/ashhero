import { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react'
import { View, TextInput, Pressable, type TextStyle } from 'react-native'
import { Image } from 'expo-image'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FLOW, flowFontFamily } from '@/constants/flowTheme'
import {
  DEFAULT_HERO_NAME,
  displayHeroName,
  HERO_NAME_MAX_LEN,
  normalizeHeroName,
} from '../../utils/heroName'

import type { ProfileHeroCardHandle, ProfileHeroCardParams } from '../../types'

const heroAvatar = require('@/assets/caracter/hero-avatar.png')

export type { ProfileHeroCardHandle } from '../../types'

const inputStyle: TextStyle = { fontFamily: flowFontFamily.sans }

export const ProfileHeroCard = forwardRef<ProfileHeroCardHandle, ProfileHeroCardParams>(
  ({ heroName, onSaveName }, ref) => {
    const inputRef = useRef<TextInput>(null)
    const [draft, setDraft] = useState(() => displayHeroName(heroName))

    useImperativeHandle(ref, () => ({
      focusName: () => inputRef.current?.focus(),
    }))

    useEffect(() => {
      setDraft(displayHeroName(heroName))
    }, [heroName])

    const commitName = () => {
      if (normalizeHeroName(draft) === heroName) return
      onSaveName(draft)
    }

    return (
      <View className="mb-5 flex-row items-center gap-4">
        <View className="h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-[20px] bg-flow-mascot">
          <Image
            source={heroAvatar}
            style={{ width: 68, height: 68 }}
            contentFit="contain"
            accessibilityLabel="Avatar du héros"
          />
        </View>
        <View className="relative flex-1">
          <TextInput
            ref={inputRef}
            value={draft}
            onChangeText={setDraft}
            onBlur={commitName}
            onSubmitEditing={commitName}
            maxLength={HERO_NAME_MAX_LEN}
            returnKeyType="done"
            accessibilityLabel="Nom du héros"
            placeholder={DEFAULT_HERO_NAME}
            placeholderTextColor={FLOW.faint}
            className="rounded-2xl border border-flow-border bg-flow-bg py-3 pl-4 pr-10 text-lg font-bold text-flow-text"
            style={inputStyle}
          />
          <Pressable
            onPress={() => inputRef.current?.focus()}
            accessibilityRole="button"
            accessibilityLabel="Modifier le nom"
            className="absolute bottom-0 right-0 top-0 w-10 items-center justify-center"
          >
            <MaterialIcons name="edit" size={16} color={FLOW.faint} />
          </Pressable>
        </View>
      </View>
    )
  }
)

ProfileHeroCard.displayName = 'ProfileHeroCard'
