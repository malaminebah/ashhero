import { View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FLOW } from '@/constants/flowTheme'
import { flowCardShadow, flowSurface } from '@/constants/flowSurfaces'
import { FlowText } from '@/components/ui/flow-text'
import type { StatTier, TierProgress } from './statsEquivalents'

type StatFlipDashboardParams = {
  valueLabel: string
  valueDisplay: string
  tierProgress: TierProgress
  metrics: { label: string; value: string }[]
}

function TierRow({ tier, reached }: { tier: StatTier; reached: boolean }) {
  return (
    <View className="flex-row items-start gap-2.5 py-2">
      <MaterialIcons
        name={reached ? 'check-circle' : 'radio-button-unchecked'}
        size={16}
        color={reached ? FLOW.cta : FLOW.faint}
        style={{ marginTop: 1 }}
      />
      <View className="min-w-0 flex-1">
        <FlowText
          className={`text-sm font-bold ${reached ? 'text-flow-text' : 'text-flow-faint'}`}
        >
          {tier.label}
          <FlowText className="text-xs font-normal text-flow-faint"> · {tier.threshold}+</FlowText>
        </FlowText>
        {reached ? (
          <FlowText className="mt-0.5 text-xs leading-4 text-flow-muted">{tier.equivalent}</FlowText>
        ) : null}
      </View>
    </View>
  )
}

export const StatFlipDashboard = ({
  valueLabel,
  valueDisplay,
  tierProgress,
  metrics,
}: StatFlipDashboardParams) => {
  const { current, next, progressPct, reached } = tierProgress

  return (
    <View className="mt-5">
      <View className={`overflow-hidden ${flowSurface.cardActive}`} style={flowCardShadow}>
        <View className="px-4 py-4">
          <FlowText className="text-[11px] font-bold uppercase tracking-wide text-flow-muted">
            Ton tableau
          </FlowText>
          <FlowText className="mt-2 text-3xl font-bold text-flow-text">{valueDisplay}</FlowText>
          <FlowText className="mt-0.5 text-xs text-flow-muted">{valueLabel}</FlowText>

          <View className="mt-4 flex-row flex-wrap gap-2">
            {metrics.map((m) => (
              <View
                key={m.label}
                className={`min-w-[46%] flex-1 rounded-xl px-3 py-2.5 ${flowSurface.card}`}
              >
                <FlowText className="text-[10px] font-bold uppercase text-flow-faint">
                  {m.label}
                </FlowText>
                <FlowText className="mt-1 text-sm font-bold text-flow-text">{m.value}</FlowText>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className={`mt-4 overflow-hidden ${flowSurface.card}`} style={flowCardShadow}>
        <View className="px-4 py-4">
          <FlowText className="text-[11px] font-bold uppercase tracking-wide text-flow-muted">
            {current ? 'Palier actuel' : 'Prochain palier'}
          </FlowText>
          {current ? (
            <>
              <FlowText className="mt-2 text-lg font-bold text-flow-cta">{current.label}</FlowText>
              <FlowText className="mt-1 text-sm leading-5 text-flow-muted">
                {current.equivalent}
              </FlowText>
            </>
          ) : (
            <FlowText className="mt-2 text-sm text-flow-muted">
              Continue — ton premier palier approche.
            </FlowText>
          )}

          {next ? (
            <View className="mt-4">
              <View className="mb-1.5 flex-row items-center justify-between">
                <FlowText className="text-xs font-bold text-flow-text">
                  Vers : {next.label}
                </FlowText>
                <FlowText className="text-xs text-flow-faint">
                  {Math.round(progressPct)} %
                </FlowText>
              </View>
              <View className="h-2.5 w-full overflow-hidden rounded-full bg-flow-border">
                <View
                  className="h-full rounded-full bg-flow-cta"
                  style={{ width: `${progressPct}%` }}
                />
              </View>
              <FlowText className="mt-2 text-xs leading-4 text-flow-muted">
                {next.equivalent}
              </FlowText>
            </View>
          ) : (
            <FlowText className="mt-3 text-xs font-bold text-flow-cta">
              Tous les paliers débloqués — bravo.
            </FlowText>
          )}
        </View>
      </View>

      <View className={`mt-4 overflow-hidden ${flowSurface.card}`} style={flowCardShadow}>
        <View className="px-4 py-3">
          <FlowText className="mb-1 text-[11px] font-bold uppercase tracking-wide text-flow-muted">
            Paliers
          </FlowText>
          {reached.length === 0 ? (
            <FlowText className="py-2 text-sm text-flow-muted">
              Aucun palier atteint pour l’instant.
            </FlowText>
          ) : null}
          {reached.slice(-3).map((tier) => (
            <TierRow key={tier.threshold} tier={tier} reached />
          ))}
          {next ? <TierRow tier={next} reached={false} /> : null}
        </View>
      </View>
    </View>
  )
}
