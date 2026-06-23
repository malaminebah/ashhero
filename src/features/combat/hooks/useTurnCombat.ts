import { useCallback, useEffect, useRef, useState } from 'react'
import * as Haptics from 'expo-haptics'
import { useCombat } from '@/src/features/tracker/hooks/useCombat'
import type { CombatAction } from '@/src/features/tracker/types'
import type { BattleMessage, CombatPhase, FloatDamagePayload } from '../types'
import type { CombatSpriteCue } from '../utils/combatVisuals'
import {
  bossAnimDurationMs,
  playerAttackDurationMs,
  soldierAnimDurationMs,
} from '../animConfig'

export type { CombatPhase } from '../types'
import {
  COMBAT_BOSS_MAX_HP,
  COMBAT_PLAYER_MAX_HP,
  DAMAGE_TO_BOSS,
  COMBAT_BREATHE_STATUS,
  combatActionLabel,
  randomBossAttackName,
  rollBossRiposteDamage,
} from '../constants'

const INTRO_DURATION_MS = 1500
const HIT_PAUSE_BUFFER_MS = 220
const ENEMY_WINDUP_MS = 520
const VICTORY_CELEBRATE_MS = 900
const DEFEAT_CELEBRATE_MS = soldierAnimDurationMs('death') + 180
const FLOAT_DAMAGE_MS = 1100

type Options = {
  enabled: boolean
}

export function useTurnCombat({ enabled }: Options) {
  const { handleVictory, handleDefeat, canUseSpecial } = useCombat()

  const [phase, setPhase] = useState<CombatPhase>('entering')
  const [playerHp, setPlayerHp] = useState(COMBAT_PLAYER_MAX_HP)
  const [bossHp, setBossHp] = useState(COMBAT_BOSS_MAX_HP)
  const [battleMessage, setBattleMessage] = useState<BattleMessage>({ kind: 'idle' })
  const [bossShakeKey, setBossShakeKey] = useState(0)
  const [playerShakeKey, setPlayerShakeKey] = useState(0)
  const [victoryAction, setVictoryAction] = useState<CombatAction | null>(null)
  const [defeatSource, setDefeatSource] = useState<'riposte' | 'abandon' | null>(null)
  const [spriteCue, setSpriteCue] = useState<CombatSpriteCue>(null)
  const [turnCount, setTurnCount] = useState(1)

  const endedRef = useRef(false)
  const inputLockRef = useRef(false)
  const enemyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const enemyWindupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const spriteCueTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const celebrateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const introTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const floatTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [floatDamage, setFloatDamage] = useState<FloatDamagePayload | null>(null)

  const clearTimers = useCallback(() => {
    for (const ref of [
      enemyTimerRef,
      enemyWindupTimerRef,
      spriteCueTimerRef,
      celebrateTimerRef,
      introTimerRef,
      floatTimerRef,
    ]) {
      if (ref.current) {
        clearTimeout(ref.current)
        ref.current = null
      }
    }
  }, [])

  const showFloatDamage = useCallback((target: 'boss' | 'player', amount: number) => {
    if (floatTimerRef.current) clearTimeout(floatTimerRef.current)
    setFloatDamage({ target, amount, key: Date.now() })
    floatTimerRef.current = setTimeout(() => {
      floatTimerRef.current = null
      setFloatDamage(null)
    }, FLOAT_DAMAGE_MS)
  }, [])

  const playSpriteCue = useCallback((cue: CombatSpriteCue, durationMs: number) => {
    if (spriteCueTimerRef.current) clearTimeout(spriteCueTimerRef.current)
    setSpriteCue(cue)
    spriteCueTimerRef.current = setTimeout(() => {
      spriteCueTimerRef.current = null
      setSpriteCue(null)
    }, durationMs)
  }, [])

  const reset = useCallback(() => {
    clearTimers()
    endedRef.current = false
    inputLockRef.current = false
    setPhase('entering')
    setPlayerHp(COMBAT_PLAYER_MAX_HP)
    setBossHp(COMBAT_BOSS_MAX_HP)
    setBattleMessage({ kind: 'status', text: "L'Envie apparaît !" })
    setBossShakeKey(0)
    setPlayerShakeKey(0)
    setVictoryAction(null)
    setDefeatSource(null)
    setSpriteCue(null)
    setFloatDamage(null)
    setTurnCount(1)
    introTimerRef.current = setTimeout(() => {
      introTimerRef.current = null
      setPhase('player_turn')
      setBattleMessage({ kind: 'idle' })
    }, INTRO_DURATION_MS)
  }, [clearTimers])

  useEffect(() => {
    if (enabled) reset()
  }, [enabled, reset])

  useEffect(() => () => clearTimers(), [clearTimers])

  const finalizeVictory = useCallback(
    async (action: CombatAction) => {
      if (endedRef.current) return
      endedRef.current = true
      inputLockRef.current = true
      await handleVictory(action)
      setVictoryAction(action)
      setPhase('victory')
    },
    [handleVictory]
  )

  const finalizeDefeat = useCallback(
    async (source: 'riposte' | 'abandon') => {
      if (endedRef.current) return
      endedRef.current = true
      inputLockRef.current = true
      await handleDefeat()
      setDefeatSource(source)
      setPhase('defeat')
    },
    [handleDefeat]
  )

  const runEnemyTurn = useCallback(() => {
    if (endedRef.current) return
    const animMs = bossAnimDurationMs('attack')
    const dmg = rollBossRiposteDamage()
    const name = randomBossAttackName()

    playSpriteCue('boss', animMs)
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {})
    setBattleMessage({ kind: 'boss_hit', attackName: name, damage: dmg })
    setPlayerShakeKey((k) => k + 1)
    showFloatDamage('player', dmg)

    setPlayerHp((prev) => {
      const next = Math.max(0, prev - dmg)
      if (next === 0) {
        setPhase('celebrate_defeat')
        celebrateTimerRef.current = setTimeout(() => {
          celebrateTimerRef.current = null
          void finalizeDefeat('riposte')
        }, DEFEAT_CELEBRATE_MS)
      } else {
        enemyTimerRef.current = setTimeout(() => {
          enemyTimerRef.current = null
          inputLockRef.current = false
          setPhase('player_turn')
          setTurnCount((c) => c + 1)
        }, animMs + HIT_PAUSE_BUFFER_MS)
      }
      return next
    })
  }, [finalizeDefeat, playSpriteCue, showFloatDamage])

  const scheduleEnemyTurn = useCallback(
    (playerAnimMs: number) => {
      if (enemyWindupTimerRef.current) clearTimeout(enemyWindupTimerRef.current)
      enemyWindupTimerRef.current = setTimeout(() => {
        enemyWindupTimerRef.current = null
        setPhase('enemy_turn')
        enemyTimerRef.current = setTimeout(() => {
          enemyTimerRef.current = null
          runEnemyTurn()
        }, ENEMY_WINDUP_MS)
      }, playerAnimMs + HIT_PAUSE_BUFFER_MS)
    },
    [runEnemyTurn]
  )

  const applyDamageToBoss = useCallback(
    (action: CombatAction, damage: number) => {
      const animMs = playerAttackDurationMs(action)
      playSpriteCue(action, animMs)
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {})
      setBattleMessage({
        kind: 'player_hit',
        actionLabel: combatActionLabel(action),
        damage,
      })
      setBossShakeKey((k) => k + 1)
      showFloatDamage('boss', damage)

      setBossHp((prev) => {
        const next = Math.max(0, prev - damage)
        if (next === 0) {
          setPhase('celebrate_victory')
          celebrateTimerRef.current = setTimeout(() => {
            celebrateTimerRef.current = null
            void finalizeVictory(action)
          }, VICTORY_CELEBRATE_MS)
        } else {
          scheduleEnemyTurn(animMs)
        }
        return next
      })
    },
    [finalizeVictory, playSpriteCue, scheduleEnemyTurn, showFloatDamage]
  )

  const chooseInstantAction = useCallback(
    (action: 'water' | 'distract' | 'special') => {
      if (phase !== 'player_turn' || endedRef.current || inputLockRef.current) return
      inputLockRef.current = true
      setPhase('resolving_instant')
      applyDamageToBoss(action, DAMAGE_TO_BOSS[action])
    },
    [phase, applyDamageToBoss]
  )

  const chooseBreathe = useCallback(() => {
    if (phase !== 'player_turn' || endedRef.current || inputLockRef.current) return
    inputLockRef.current = true
    setBattleMessage({ kind: 'status', text: COMBAT_BREATHE_STATUS })
    setPhase('breathe_pending')
  }, [phase])

  const onBreatheComplete = useCallback(() => {
    if (phase !== 'breathe_pending' || endedRef.current) return
    setPhase('resolving_instant')
    applyDamageToBoss('breathe', DAMAGE_TO_BOSS.breathe)
  }, [phase, applyDamageToBoss])

  const abandon = useCallback(async () => {
    if (endedRef.current) return
    if (phase === 'entering' || phase === 'victory' || phase === 'defeat') return
    clearTimers()
    await finalizeDefeat('abandon')
  }, [phase, clearTimers, finalizeDefeat])

  const inArena =
    phase !== 'victory' &&
    phase !== 'defeat'

  return {
    phase,
    playerHp,
    playerMaxHp: COMBAT_PLAYER_MAX_HP,
    bossHp,
    bossMaxHp: COMBAT_BOSS_MAX_HP,
    battleMessage,
    bossShakeKey,
    playerShakeKey,
    victoryAction,
    defeatSource,
    canUseSpecial,
    spriteCue,
    floatDamage,
    turnCount,
    inArena,
    showActionButtons: phase === 'player_turn',
    showBreatheTimer: phase === 'breathe_pending',
    showAbandon: phase === 'player_turn' || phase === 'breathe_pending',
    chooseBreathe,
    onBreatheComplete,
    chooseInstantAction,
    abandon,
    reset,
  }
}
