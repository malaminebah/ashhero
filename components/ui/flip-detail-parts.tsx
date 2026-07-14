import type { ReactNode } from 'react'
import { View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FlowText } from './flow-text'

export const FlipDetailFront = ({ children }: { children: ReactNode }) => (
  <View className="w-full items-center">{children}</View>
)

export const FlipDetailIconWell = ({
  children,
  locked = false,
}: {
  children: ReactNode
  locked?: boolean
}) => (
  <View className="relative mb-5 h-[88px] w-[88px] items-center justify-center rounded-2xl bg-brand-track">
    {children}
    {locked ? (
      <View className="absolute inset-0 items-center justify-center rounded-2xl bg-[rgba(8,0,15,0.6)]">
        <MaterialIcons name="lock-outline" size={26} color="#5b4a75" />
      </View>
    ) : null}
  </View>
)

export const FlipDetailEyebrow = ({ children }: { children: ReactNode }) => (
  <FlowText className="text-[11px] font-bold uppercase tracking-widest text-brand-accent">
    {children}
  </FlowText>
)

export const FlipDetailTitle = ({ children }: { children: ReactNode }) => (
  <FlowText className="mt-3 text-center text-[22px] font-extrabold leading-7 text-white">
    {children}
  </FlowText>
)

export const FlipDetailSubtitle = ({ children }: { children: ReactNode }) => (
  <FlowText className="mt-2 text-center text-sm leading-5 text-brand-muted">{children}</FlowText>
)

export const FlipDetailHeroValue = ({ children }: { children: ReactNode }) => (
  <FlowText className="mt-2 text-[36px] font-extrabold leading-10 text-white">{children}</FlowText>
)

export const FlipDetailMetricPill = ({
  value,
  label,
}: {
  value: string
  label: string
}) => (
  <View className="mt-5 items-center rounded-2xl border border-[rgba(255,255,255,0.1)] bg-brand-track px-6 py-3">
    <FlowText className="text-2xl font-extrabold text-brand-gold">{value}</FlowText>
    <FlowText className="mt-0.5 text-[11px] font-bold uppercase tracking-wide text-brand-muted">
      {label}
    </FlowText>
  </View>
)

export const FlipDetailStatusChip = ({
  unlocked,
  unlockedLabel = 'Débloqué',
  lockedLabel,
}: {
  unlocked: boolean
  unlockedLabel?: string
  lockedLabel: string
}) => (
  <View
    className={`mt-5 flex-row items-center gap-1.5 rounded-full px-3.5 py-1.5 ${
      unlocked ? 'bg-[rgba(34,197,94,0.15)]' : 'bg-brand-track'
    }`}
  >
    <MaterialIcons
      name={unlocked ? 'check-circle' : 'schedule'}
      size={14}
      color={unlocked ? '#22c55e' : '#8b7aa8'}
    />
    <FlowText
      className={`text-xs font-bold ${unlocked ? 'text-brand-success' : 'text-brand-muted'}`}
    >
      {unlocked ? unlockedLabel : lockedLabel}
    </FlowText>
  </View>
)

export const FlipDetailBackHeader = ({
  eyebrow,
  title,
}: {
  eyebrow: string
  title: string
}) => (
  <View className="mb-1">
    <FlipDetailEyebrow>{eyebrow}</FlipDetailEyebrow>
    <FlowText className="mt-3 text-[20px] font-extrabold leading-7 text-white">{title}</FlowText>
  </View>
)

export const FlipDetailBackBody = ({ children }: { children: ReactNode }) => (
  <FlowText className="mt-4 text-[15px] leading-6 text-brand-muted">{children}</FlowText>
)

export const FlipDetailInsightCard = ({
  label,
  accent = 'cta',
  children,
}: {
  label: string
  accent?: 'cta' | 'gold' | 'brand'
  children: ReactNode
}) => {
  const barColor =
    accent === 'gold' ? 'bg-brand-gold' : accent === 'brand' ? 'bg-brand-accent' : 'bg-brand-success'

  return (
    <View className="mt-6 overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.07)] bg-brand-track">
      <View className={`h-1 w-full ${barColor}`} />
      <View className="px-4 py-4">
        <FlowText className="text-[11px] font-bold uppercase tracking-wide text-brand-muted">
          {label}
        </FlowText>
        <View className="mt-2.5">{children}</View>
      </View>
    </View>
  )
}

export const FlipDetailHighlightValue = ({ children }: { children: ReactNode }) => (
  <FlowText className="text-2xl font-extrabold text-brand-gold">{children}</FlowText>
)

export const FlipDetailInsightText = ({ children }: { children: ReactNode }) => (
  <FlowText className="text-[15px] leading-6 text-brand-muted">{children}</FlowText>
)

export const FlipDetailNotFound = ({ label }: { label: string }) => (
  <FlipDetailFront>
    <MaterialIcons name="info-outline" size={32} color="#8b7aa8" />
    <FlowText className="mt-4 text-center text-sm text-brand-muted">{label}</FlowText>
  </FlipDetailFront>
)
