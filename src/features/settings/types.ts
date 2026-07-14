import type { ReactNode } from 'react'
import type MaterialIcons from '@expo/vector-icons/MaterialIcons'

export type SettingsIconName = keyof typeof MaterialIcons.glyphMap

export type SettingsRowParams = {
  label: string
  subtitle?: string
  icon: SettingsIconName
  onPress?: () => void
  destructive?: boolean
  disabled?: boolean
  trailing?: string
  showChevron?: boolean
}

export type SettingsSectionParams = {
  title: string
  children: ReactNode
}

export type LegalSlug = 'terms' | 'privacy' | 'rules'

export type LegalDocument = {
  slug: LegalSlug
  title: string
  updatedAt: string
  paragraphs: string[]
}

export type LegalDocumentScreenParams = {
  slug: string
}

export type SettingsScreenBodyParams = Record<string, never>
