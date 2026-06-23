import { useCallback, useMemo } from 'react'
import { Modal, View, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FLOW } from '@/constants/flowTheme'
import { FlowText } from '@/components/ui/flow-text'
import { COMBAT_XP_BY_ACTION } from '@/src/features/tracker/combatXpTable'
import { useTrackerStore } from '@/src/features/tracker/store'
import { displayHeroName } from '@/src/features/tracker/utils/heroName'
import { COMBAT_SPECIAL_LOCKED_HINT, combatActionLabel } from '../constants'
import { useTurnCombat } from '../hooks/useTurnCombat'
import { getPlayerSoldierAnim } from '../utils/playerSoldierAnim'
import { getBossAnim } from '../utils/getBossAnim'
import { ActionButton } from './ActionButton'
import { BreatheTimer } from './BreatheTimer'
import { CombatArenaView } from './CombatArenaView'
import { CombatHpBar } from './CombatHpBar'
import { CombatMessageBox } from './CombatMessageBox'
import { DefeatBanner } from './DefeatBanner'
import { FloatingDamage } from './FloatingDamage'
import { VictoryBanner } from './VictoryBanner'
import type { CombatModalParams } from '../types'

export const CombatModal = ({ visible, onClose }: CombatModalParams) => {
  const router = useRouter()
  const level = useTrackerStore((s) => s.level)
  const heroName = useTrackerStore((s) => s.heroName)
  const heroLabel = displayHeroName(heroName).toUpperCase()
  const heroDialogName = displayHeroName(heroName)

  const {
    phase,
    playerHp,
    playerMaxHp,
    bossHp,
    bossMaxHp,
    battleMessage,
    bossShakeKey,
    playerShakeKey,
    victoryAction,
    defeatSource,
    canUseSpecial,
    currentAttackEffect,
    floatDamage,
    turnCount,
    showActionButtons,
    showBreatheTimer,
    showAbandon,
    chooseBreathe,
    onBreatheComplete,
    chooseInstantAction,
    abandon,
    reset,
  } = useTurnCombat({ enabled: visible })

  const onGoHome = useCallback(() => {
    onClose()
    router.replace('/(tabs)/' as never)
  }, [onClose, router])

  const onAbandon = async () => {
    await abandon()
    onClose()
  }

  const handleRequestClose = () => {
    if (phase === 'victory' || phase === 'defeat') {
      onClose()
      return
    }
    void abandon().then(() => onClose())
  }

  const xpGained =
    victoryAction != null ? COMBAT_XP_BY_ACTION[victoryAction] : 0

  const isResultScreen = phase === 'victory' || phase === 'defeat'

  const playerAnim = useMemo(
    () => getPlayerSoldierAnim(phase, playerHp, currentAttackEffect),
    [phase, playerHp, currentAttackEffect]
  )

  const bossAnim = useMemo(
    () => getBossAnim(phase, bossHp, currentAttackEffect),
    [phase, bossHp, currentAttackEffect]
  )

  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="fullScreen"
      onRequestClose={handleRequestClose}
    >
      <SafeAreaView className="flex-1 bg-flow-bg">
        <StatusBar style="dark" />
        {isResultScreen ? (
          <>
            {phase === 'victory' && victoryAction != null ? (
              <VictoryBanner
                xpGained={xpGained}
                level={level}
                onContinue={onClose}
              />
            ) : phase === 'defeat' && defeatSource != null ? (
              <DefeatBanner onRetry={reset} onGoHome={onGoHome} />
            ) : null}
          </>
        ) : (
          <View className="flex-1 px-4 pb-4">
            <View className="mb-2 flex-row items-center justify-between pt-1">
              <Pressable
                onPress={handleRequestClose}
                accessibilityRole="button"
                accessibilityLabel="Fermer le combat"
                className="h-10 w-10 items-center justify-center rounded-full bg-flow-secondary active:opacity-80"
              >
                <MaterialIcons name="close" size={20} color={FLOW.muted} />
              </Pressable>
              <FlowText className="text-xs font-bold uppercase tracking-wider text-flow-muted">
                Tour {turnCount}
              </FlowText>
            </View>

            <View className="mb-2 min-h-[200px] flex-1">
              <CombatArenaView
                bossDefeated={bossHp <= 0}
                bossShakeKey={bossShakeKey}
                playerShakeKey={playerShakeKey}
                attackEffect={currentAttackEffect}
                playerAnim={playerAnim}
                bossAnim={bossAnim}
              >
                <View className="absolute left-3 top-3 z-10">
                  <CombatHpBar
                    overlay
                    variant="boss"
                    name="L'ENVIE"
                    level={level + 1}
                    hp={bossHp}
                    maxHp={bossMaxHp}
                  />
                </View>

                <View className="absolute bottom-3 right-3 z-10 items-end">
                  <CombatHpBar
                    overlay
                    variant="player"
                    name={heroLabel}
                    level={level}
                    hp={playerHp}
                    maxHp={playerMaxHp}
                  />
                </View>

                {floatDamage != null ? (
                  <FloatingDamage floatDamage={floatDamage} />
                ) : null}
              </CombatArenaView>
            </View>

            <View className="shrink-0">
              <CombatMessageBox
                message={battleMessage}
                heroName={heroDialogName}
                showPrompt={phase === 'player_turn' && !showBreatheTimer}
              />

              {showBreatheTimer ? <BreatheTimer onComplete={onBreatheComplete} /> : null}

              {/* Buttons stay mounted (opacity/pointerEvents) so layout never shifts between player_turn and resolving/enemy phases. */}
              <View
                style={{ opacity: showActionButtons ? 1 : 0 }}
                pointerEvents={showActionButtons ? 'auto' : 'none'}
                className="mt-2 flex-row flex-wrap justify-between gap-y-2"
              >
                <View className="w-[48%]">
                  <ActionButton
                    compact
                    variant="breathe"
                    label={combatActionLabel('breathe')}
                    onPress={chooseBreathe}
                    badge="60s"
                    accessibilityLabel="Respirer"
                  />
                </View>
                <View className="w-[48%]">
                  <ActionButton
                    compact
                    variant="water"
                    label={combatActionLabel('water')}
                    onPress={() => chooseInstantAction('water')}
                    accessibilityLabel="Boire de l'eau"
                  />
                </View>
                <View className="w-[48%]">
                  <ActionButton
                    compact
                    variant="distract"
                    label={combatActionLabel('distract')}
                    onPress={() => chooseInstantAction('distract')}
                    accessibilityLabel="Se distraire"
                  />
                </View>
                <View className="w-[48%]">
                  <ActionButton
                    compact
                    variant="special"
                    label={combatActionLabel('special')}
                    onPress={() => chooseInstantAction('special')}
                    disabled={!canUseSpecial}
                    lockHint={!canUseSpecial ? COMBAT_SPECIAL_LOCKED_HINT : undefined}
                    accessibilityLabel={
                      canUseSpecial
                        ? 'Attaque spéciale'
                        : `Attaque spéciale, débloquée après ${COMBAT_SPECIAL_LOCKED_HINT}`
                    }
                  />
                </View>
              </View>

              <Pressable
                onPress={() => void onAbandon()}
                disabled={!showAbandon}
                accessibilityRole="button"
                accessibilityLabel="Abandonner le combat"
                style={{ opacity: showAbandon ? 1 : 0 }}
                className="mt-2 items-center py-2"
              >
                <FlowText className="text-[10px] uppercase tracking-wider text-flow-faint">
                  Abandonner le combat
                </FlowText>
              </Pressable>
            </View>
          </View>
        )}
      </SafeAreaView>
    </Modal>
  )
}
