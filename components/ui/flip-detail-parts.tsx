import type { ReactNode } from 'react'
import { View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FLOW } from '@/constants/flowTheme'
import { flowCardShadow, flowSurface } from '@/constants/flowSurfaces'
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
  <View
    className={`relative mb-5 h-[88px] w-[88px] items-center justify-center border border-flow-cta/15 ${flowSurface.iconWell}`}
    style={flowCardShadow}
  >
    {children}
    {locked ? (
      <View className="absolute inset-0 items-center justify-center rounded-2xl bg-flow-bg/60">
        <MaterialIcons name="lock-outline" size={26} color={FLOW.faint} />
      </View>
    ) : null}
  </View>
)

export const FlipDetailEyebrow = ({ children }: { children: ReactNode }) => (
  <FlowText className="text-[11px] font-bold uppercase tracking-widest text-flow-cta">
    {children}
  </FlowText>
)

export const FlipDetailTitle = ({ children }: { children: ReactNode }) => (
  <FlowText className="mt-3 text-center text-[22px] font-bold leading-7 text-flow-text">
    {children}
  </FlowText>
)

export const FlipDetailSubtitle = ({ children }: { children: ReactNode }) => (
  <FlowText className="mt-2 text-center text-sm leading-5 text-flow-muted">{children}</FlowText>
)

export const FlipDetailHeroValue = ({ children }: { children: ReactNode }) => (
  <FlowText className="mt-2 text-[36px] font-bold leading-10 text-flow-text">{children}</FlowText>
)

export const FlipDetailMetricPill = ({
  value,
  label,
}: {
  value: string
  label: string
}) => (
  <View className="mt-5 items-center rounded-2xl border border-flow-cta/20 bg-flow-bg px-6 py-3">
    <FlowText className="text-2xl font-bold text-flow-cta">{value}</FlowText>
    <FlowText className="mt-0.5 text-[11px] font-bold uppercase tracking-wide text-flow-muted">
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
      unlocked ? 'border border-flow-cta/25 bg-flow-cta/10' : 'bg-flow-border/40'
    }`}
  >
    <MaterialIcons
      name={unlocked ? 'check-circle' : 'schedule'}
      size={14}
      color={unlocked ? FLOW.cta : FLOW.faint}
    />
    <FlowText
      className={`text-xs font-bold ${unlocked ? 'text-flow-cta' : 'text-flow-faint'}`}
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
    <FlowText className="mt-3 text-[20px] font-bold leading-7 text-flow-text">{title}</FlowText>
  </View>
)

export const FlipDetailBackBody = ({ children }: { children: ReactNode }) => (
  <FlowText className="mt-4 text-[15px] leading-6 text-flow-muted">{children}</FlowText>
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
    accent === 'gold' ? 'bg-flow-gold' : accent === 'brand' ? 'bg-flow-brand' : 'bg-flow-cta'

  return (
    <View
      className={`mt-6 overflow-hidden rounded-2xl border border-flow-border bg-flow-bg ${flowSurface.card}`}
      style={flowCardShadow}
    >
      <View className={`h-1 w-full ${barColor}`} />
      <View className="px-4 py-4">
        <FlowText className="text-[11px] font-bold uppercase tracking-wide text-flow-muted">
          {label}
        </FlowText>
        <View className="mt-2.5">{children}</View>
      </View>
    </View>
  )
}

export const FlipDetailHighlightValue = ({ children }: { children: ReactNode }) => (
  <FlowText className="text-2xl font-bold text-flow-cta">{children}</FlowText>
)

export const FlipDetailInsightText = ({ children }: { children: ReactNode }) => (
  <FlowText className="text-[15px] leading-6 text-flow-muted">{children}</FlowText>
)

export const FlipDetailNotFound = ({ label }: { label: string }) => (
  <FlipDetailFront>
    <MaterialIcons name="info-outline" size={32} color={FLOW.faint} />
    <FlowText className="mt-4 text-center text-sm text-flow-muted">{label}</FlowText>
  </FlipDetailFront>
)
