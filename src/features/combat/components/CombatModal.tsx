import { useCallback } from 'react'
import { Modal, View, Text, Pressable, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { COMBAT_XP_BY_ACTION } from '@/src/features/tracker/combatXpTable'
import { useTrackerStore } from '@/src/features/tracker/store'
import { displayHeroName } from '@/src/features/tracker/utils/heroName'
import { PlayerHeroEmoji } from '@/src/features/tracker/components/PlayerHeroEmoji'
import { COMBAT_SPECIAL_LOCKED_HINT, combatActionLabel } from '../constants'
import { useTurnCombat } from '../hooks/useTurnCombat'
import { ActionButton } from './ActionButton'
import { BreatheTimer } from './BreatheTimer'
import { CombatArenaView } from './CombatArenaView'
import { CombatHpBar } from './CombatHpBar'
import { CombatMessageBox } from './CombatMessageBox'
import { DefeatBanner } from './DefeatBanner'
import { VictoryBanner } from './VictoryBanner'

type Props = {
  visible: boolean
  onClose: () => void
}

export const CombatModal = ({ visible, onClose }: Props) => {
  const router = useRouter()
  const level = useTrackerStore((s) => s.level)
  const heroName = useTrackerStore((s) => s.heroName)
  const heroLabel = displayHeroName(heroName).toUpperCase()

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
    currentAttackEmoji,
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

  const closeWithReset = useCallback(() => {
    onClose()
  }, [onClose])

  const onGoHome = useCallback(() => {
    closeWithReset()
    router.replace('/(tabs)/' as never)
  }, [closeWithReset, router])

  const onAbandon = async () => {
    await abandon()
    closeWithReset()
  }

  const handleRequestClose = () => {
    if (phase === 'victory' || phase === 'defeat') {
      closeWithReset()
      return
    }
    void abandon().then(() => closeWithReset())
  }

  const xpGained =
    victoryAction != null ? COMBAT_XP_BY_ACTION[victoryAction] : 0

  const isResultScreen = phase === 'victory' || phase === 'defeat'

  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="fullScreen"
      onRequestClose={handleRequestClose}
    >
      <SafeAreaView className="flex-1 bg-[#05000a]">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        >
          {!isResultScreen ? (
            <View className="mb-4 flex-row items-center justify-between pt-2">
              <Pressable
                onPress={handleRequestClose}
                accessibilityRole="button"
                accessibilityLabel="Fermer le combat"
                className="h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] active:opacity-80"
              >
                <MaterialIcons name="close" size={20} color="#f3e8ff" />
              </Pressable>
              <Text className="font-mono text-xs uppercase tracking-wider text-white/70">
                Tour : {turnCount} / ∞
              </Text>
            </View>
          ) : null}

          {phase === 'victory' && victoryAction != null ? (
            <VictoryBanner
              xpGained={xpGained}
              level={level}
              onContinue={closeWithReset}
            />
          ) : phase === 'defeat' && defeatSource != null ? (
            <DefeatBanner onRetry={reset} onGoHome={onGoHome} />
          ) : (
            <View className="flex-1">
              <View className="mb-3">
                <Text className="mb-2 font-mono text-sm font-bold uppercase text-white">
                  L&apos;envie 👿
                </Text>
                <CombatHpBar hp={bossHp} maxHp={bossMaxHp} fillColor="#a855f7" />
              </View>

              <CombatArenaView
                level={level}
                bossShakeKey={bossShakeKey}
                playerShakeKey={playerShakeKey}
                attackEmoji={currentAttackEmoji}
              />

              <View className="mb-4 flex-row items-center gap-2">
                <Text className="font-mono text-sm font-bold uppercase text-white">
                  {heroLabel}
                </Text>
                <PlayerHeroEmoji level={level} variant="profile" />
              </View>
              <View className="mb-4">
                <CombatHpBar hp={playerHp} maxHp={playerMaxHp} fillColor="#22c55e" />
              </View>

              <CombatMessageBox
                message={battleMessage}
                showPrompt={phase === 'player_turn' && !showBreatheTimer}
              />

              {showBreatheTimer ? <BreatheTimer onComplete={onBreatheComplete} /> : null}

              <View className="mt-2 gap-2">
                {showActionButtons ? (
                  <>
                    <ActionButton
                      variant="breathe"
                      label={combatActionLabel('breathe')}
                      onPress={chooseBreathe}
                      badge="60s"
                      accessibilityLabel="Respirer"
                    />
                    <ActionButton
                      variant="water"
                      label={combatActionLabel('water')}
                      onPress={() => chooseInstantAction('water')}
                      accessibilityLabel="Boire de l'eau"
                    />
                    <ActionButton
                      variant="distract"
                      label={combatActionLabel('distract')}
                      onPress={() => chooseInstantAction('distract')}
                      accessibilityLabel="Se distraire"
                    />
                    <ActionButton
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
                  </>
                ) : null}

                {showAbandon ? (
                  <Pressable
                    onPress={() => void onAbandon()}
                    accessibilityRole="button"
                    accessibilityLabel="Abandonner le combat"
                    className="mt-3 items-center py-3 active:opacity-70"
                  >
                    <Text className="font-mono text-[10px] uppercase tracking-wider text-white/45">
                      Abandonner le combat
                    </Text>
                  </Pressable>
                ) : null}
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  )
}
