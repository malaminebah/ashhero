import { useCallback, useMemo } from 'react'
import { Modal, View, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FlowText } from '@/components/ui/flow-text'
import {
  BOSS_COUNTER_ACTION,
  COMBAT_PLAYER_MAX_HP,
  combatActionLabel,
  CRAVING_TIERS,
  WATER_HEAL,
} from '../constants'
import { breatheTotalTicks } from '../breatheCycle'
import { useStats } from '@/src/features/tracker/hooks/useStats'
import { useTrackerStore } from '@/src/features/tracker/store'
import { displayHeroName } from '@/src/features/tracker/utils/heroName'
import { levelFromXp } from '@/src/features/tracker/utils/levelProgress'
import {
  getDefenseHealthBonusPercent,
  playerEffectiveMaxHp,
} from '@/src/features/tracker/components/dashboard/defenseBadgesConfig'
import { useTurnCombat } from '../hooks/useTurnCombat'
import { useBreatheTimer } from '../hooks/useBreatheTimer'
import { resolveCombatVisuals } from '../utils/combatVisuals'
import { ActionButton } from './ActionButton'
import { BreatheTimer } from './BreatheTimer'
import { CombatArenaView } from './CombatArenaView'
import { CombatHpBar } from './CombatHpBar'
import { CombatXpBar } from './CombatXpBar'
import { CombatMessageBox } from './CombatMessageBox'
import { DefeatBanner } from './DefeatBanner'
import { FloatingDamage } from './FloatingDamage'
import { VictoryBanner } from './VictoryBanner'
import type { CombatModalParams, CombatEffect } from '../types'

/** Damage chip color follows the attack (mockup: blue −13 for water). */
const PLAYER_HIT_CHIP: Record<string, string> = {
  water: '#3b82f6',
  distract: '#64748b',
  breathe: '#22c55e',
  special: '#f59e0b',
}

function chipFill(combatEffect: CombatEffect): string | undefined {
  if (combatEffect?.kind === 'player_hits_boss' && combatEffect.effect != null) {
    return PLAYER_HIT_CHIP[combatEffect.effect]
  }
  return undefined
}

export const CombatModal = ({ visible, tier, onClose }: CombatModalParams) => {
  const router = useRouter()
  const heroName = useTrackerStore((s) => s.heroName)
  const heroLabel = displayHeroName(heroName)
  const { dayCount } = useStats()
  const playerShieldBonus = getDefenseHealthBonusPercent(dayCount)
  const effectivePlayerMaxHp = playerEffectiveMaxHp(COMBAT_PLAYER_MAX_HP, playerShieldBonus)

  const {
    phase,
    playerHp,
    playerMaxHp,
    bossHp,
    bossMaxHp,
    nextBossAttack,
    battleMessage,
    bossShakeKey,
    playerShakeKey,
    victoryAction,
    defeatSource,
    canUseSpecial,
    sessionXp,
    displayXp,
    xpAtStart,
    specialsUsed,
    spriteCue,
    floatDamage,
    combatEffect,
    turnCount,
    inArena,
    showActionButtons,
    showBreatheTimer,
    showAbandon,
    chooseBreathe,
    onBreatheComplete,
    chooseInstantAction,
    abandon,
    reset,
  } = useTurnCombat({ enabled: visible, playerMaxHp: effectivePlayerMaxHp, tier })

  const breathe = useBreatheTimer(onBreatheComplete, showBreatheTimer)

  const onGoHome = useCallback(() => {
    onClose()
    router.replace('/(tabs)/' as never)
  }, [onClose, router])

  const handleRequestClose = () => {
    if (phase === 'victory' || phase === 'defeat') {
      onClose()
      return
    }
    void abandon()
  }

  const combatLevel = levelFromXp(displayXp)
  const counterAction = BOSS_COUNTER_ACTION[nextBossAttack]
  const counterBadge = (action: string) => (counterAction === action ? 'Contre !' : undefined)

  const { playerAnim, bossAnim } = useMemo(
    () => resolveCombatVisuals(phase, playerHp, bossHp, spriteCue),
    [phase, playerHp, bossHp, spriteCue]
  )

  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="fullScreen"
      onRequestClose={handleRequestClose}
    >
      <View className="flex-1 bg-brand-bg">
        <StatusBar style="light" />
        {phase === 'victory' && victoryAction != null ? (
          <VictoryBanner xpGained={sessionXp} level={combatLevel} onContinue={onClose} />
        ) : phase === 'defeat' && defeatSource != null ? (
          <DefeatBanner onRetry={reset} onGoHome={onGoHome} />
        ) : inArena ? (
          <SafeAreaView className="flex-1" edges={['top', 'left', 'right', 'bottom']}>
            <View className="flex-1 px-5 pb-2" style={{ gap: 12 }}>
              <View className="flex-row items-center justify-between">
                <Pressable
                  onPress={handleRequestClose}
                  accessibilityRole="button"
                  accessibilityLabel="Fermer le combat"
                  className="h-9 w-9 items-center justify-center rounded-full bg-brand-card active:opacity-80"
                >
                  <MaterialIcons name="close" size={18} color="#8b7aa8" />
                </Pressable>
                <FlowText className="text-[11px] font-bold uppercase tracking-[0.6px] text-brand-muted">
                  Tour {turnCount}
                </FlowText>
              </View>

              <CombatHpBar
                variant="boss"
                name={CRAVING_TIERS[tier].bossName}
                level={combatLevel + 1}
                hp={bossHp}
                maxHp={bossMaxHp}
              />

              <CombatArenaView
                phase={phase}
                bossTier={tier}
                bossDefeated={bossHp <= 0}
                bossShakeKey={bossShakeKey}
                playerShakeKey={playerShakeKey}
                playerAnim={playerAnim}
                bossAnim={bossAnim}
                combatEffect={combatEffect}
                breatheActive={showBreatheTimer}
                breathePhase={breathe.phase}
                style={{ flex: 1, minHeight: 220 }}
              >
                {floatDamage != null ? (
                  <FloatingDamage floatDamage={floatDamage} fill={chipFill(combatEffect)} />
                ) : null}
                {showBreatheTimer ? (
                  <>
                    <Pressable
                      onPress={breathe.registerTap}
                      accessibilityRole="button"
                      accessibilityLabel="Taper au rythme de la respiration"
                      style={{ position: 'absolute', inset: 0 }}
                    />
                    <View style={{ position: 'absolute', top: 14, right: 14 }}>
                      <BreatheTimer {...breathe} />
                    </View>
                  </>
                ) : null}
              </CombatArenaView>

              <View>
                <CombatHpBar
                  variant="player"
                  name={heroLabel}
                  level={combatLevel}
                  hp={playerHp}
                  maxHp={playerMaxHp}
                  baseMaxHp={COMBAT_PLAYER_MAX_HP}
                />
                <View className="mt-2">
                  <CombatXpBar
                    xpStart={xpAtStart}
                    sessionXp={sessionXp}
                    specialsUsed={specialsUsed}
                    locked={!canUseSpecial}
                  />
                </View>
              </View>

              <CombatMessageBox
                message={battleMessage}
                heroName={heroLabel}
                showPrompt={phase === 'player_turn'}
                nextAttack={phase === 'player_turn' ? nextBossAttack : undefined}
              />

              <View className="flex-row flex-wrap justify-between" style={{ rowGap: 12 }}>
                <View style={{ width: '48.5%' }}>
                  <ActionButton
                    variant="breathe"
                    label={combatActionLabel('breathe')}
                    onPress={chooseBreathe}
                    disabled={!showActionButtons}
                    badge={counterBadge('breathe') ?? `${breatheTotalTicks()} s`}
                    accessibilityLabel="Respirer"
                  />
                </View>
                <View style={{ width: '48.5%' }}>
                  <ActionButton
                    variant="water"
                    label={combatActionLabel('water')}
                    onPress={() => chooseInstantAction('water')}
                    disabled={!showActionButtons}
                    badge={counterBadge('water') ?? `+${WATER_HEAL} PV`}
                    accessibilityLabel="Boire de l'eau"
                  />
                </View>
                <View style={{ width: '48.5%' }}>
                  <ActionButton
                    variant="distract"
                    label={combatActionLabel('distract')}
                    onPress={() => chooseInstantAction('distract')}
                    disabled={!showActionButtons}
                    badge={counterBadge('distract')}
                    accessibilityLabel="Se distraire"
                  />
                </View>
                <View style={{ width: '48.5%' }}>
                  <ActionButton
                    variant="special"
                    label={combatActionLabel('special')}
                    onPress={() => chooseInstantAction('special')}
                    disabled={!showActionButtons || !canUseSpecial}
                    badge={!canUseSpecial ? '100 XP' : undefined}
                    accessibilityLabel={
                      canUseSpecial
                        ? 'Attaque spéciale'
                        : 'Attaque spéciale, débloquée à 100 XP gagnés'
                    }
                  />
                </View>
              </View>

              <Pressable
                onPress={() => void abandon()}
                disabled={!showAbandon}
                accessibilityRole="button"
                accessibilityLabel="Abandonner le combat"
                style={{ opacity: showAbandon ? 1 : 0 }}
                className="items-center py-1"
              >
                <FlowText className="text-[10px] uppercase tracking-wider text-brand-locked">
                  Abandonner le combat
                </FlowText>
              </Pressable>
            </View>
          </SafeAreaView>
        ) : null}
      </View>
    </Modal>
  )
}
