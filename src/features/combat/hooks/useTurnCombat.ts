import { useCombat } from '@/src/features/tracker/hooks/useCombat'
import { COMBAT_XP_BY_ACTION } from '@/src/features/tracker/combatXpTable'
import { useTrackerStore } from '@/src/features/tracker/store'
import { canUseSpecialAttack } from '@/src/features/tracker/utils/levelProgress'
import type { CombatAction } from '@/src/features/tracker/types'
import * as Haptics from 'expo-haptics'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  BOSS_INTRO_MS,
  bossAnimDurationMs,
  playerAttackDurationMs,
  soldierAnimDurationMs,
} from '../animConfig'
import {
  BOSS_COUNTER_ACTION,
  BOSS_REGEN_MS,
  BREATHE_RESULT,
  COMBAT_BREATHE_STATUS,
  combatActionLabel,
  COUNTER_BONUS_XP,
  CRAVING_TIERS,
  CRIT_CHANCE,
  CRIT_MULTIPLIER,
  DAMAGE_TO_BOSS,
  WATER_HEAL,
  randomBossAttackName,
  rollBossRegenPlan,
  rollBossRiposteDamage,
} from '../constants'
import { applyBossRegenHp, bossRegenHealAmount, shouldTriggerBossRegen } from '../utils/bossRegen'
import type {
  BattleMessage,
  BossAttackName,
  CombatEffect,
  CombatPhase,
  CravingTier,
  FloatDamagePayload,
} from '../types'
import type { BossRegenPlan } from '../constants'
import type { BreatheGrade } from '../breatheCycle'
import type { CombatSpriteCue } from '../utils/combatVisuals'
import { BOSS_ATTACK_EFFECT } from '../utils/combatVisuals'

export type { CombatPhase } from '../types'

const INTRO_DURATION_MS = 1000
/** Short beat after anim cue ends — lets the pose read before the next phase. */
const HIT_PAUSE_BUFFER_MS = 200
/** Boss idle telegraph before riposte. */
const ENEMY_WINDUP_MS = 900
const VICTORY_CELEBRATE_MS = 900
const DEFEAT_CELEBRATE_MS = soldierAnimDurationMs('death') + 180
const FLOAT_DAMAGE_MS = 750

function postAnimHandoffMs(animMs: number): number {
  return animMs + HIT_PAUSE_BUFFER_MS
}

type Options = {
  enabled: boolean
  playerMaxHp: number
  tier: CravingTier
}

export function useTurnCombat({ enabled, playerMaxHp, tier }: Options) {
  const { handleVictory, handleDefeat } = useCombat()

  const [phase, setPhase] = useState<CombatPhase>('entering')
  const [playerHp, setPlayerHp] = useState(playerMaxHp)
  const [bossMaxHp, setBossMaxHp] = useState(CRAVING_TIERS[tier].bossHp)
  const [bossHp, setBossHp] = useState(CRAVING_TIERS[tier].bossHp)
  const [nextBossAttack, setNextBossAttack] = useState<BossAttackName>(() => randomBossAttackName())
  const [battleMessage, setBattleMessage] = useState<BattleMessage>({ kind: 'idle' })
  const [bossShakeKey, setBossShakeKey] = useState(0)
  const [playerShakeKey, setPlayerShakeKey] = useState(0)
  const [victoryAction, setVictoryAction] = useState<CombatAction | null>(null)
  const [defeatSource, setDefeatSource] = useState<'riposte' | 'abandon' | null>(null)
  const [spriteCue, setSpriteCue] = useState<CombatSpriteCue>(null)
  const [turnCount, setTurnCount] = useState(1)
  const [sessionXp, setSessionXp] = useState(0)
  const [specialsUsed, setSpecialsUsed] = useState(0)

  const xpAtStartRef = useRef(0)
  const bossMaxHpRef = useRef(CRAVING_TIERS[tier].bossHp)
  const nextAttackRef = useRef<BossAttackName>(nextBossAttack)
  const counteredRef = useRef(false)
  const bossRegenPlanRef = useRef<BossRegenPlan | null>(null)
  const bossRegenUsedRef = useRef(false)

  const endedRef = useRef(false)
  const finalizedRef = useRef(false)
  const wasEnabledRef = useRef(false)
  const inputLockRef = useRef(false)
  const enemyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const enemyWindupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const spriteCueTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const celebrateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const introTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const bossIntroTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const floatTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [floatDamage, setFloatDamage] = useState<FloatDamagePayload | null>(null)
  const [combatEffect, setCombatEffect] = useState<CombatEffect>(null)

  const clearEnemyTimers = useCallback(() => {
    for (const ref of [enemyTimerRef, enemyWindupTimerRef]) {
      if (ref.current) {
        clearTimeout(ref.current)
        ref.current = null
      }
    }
  }, [])

  const clearTimers = useCallback(() => {
    clearEnemyTimers()
    for (const ref of [
      spriteCueTimerRef,
      celebrateTimerRef,
      introTimerRef,
      bossIntroTimerRef,
      floatTimerRef,
    ]) {
      if (ref.current) {
        clearTimeout(ref.current)
        ref.current = null
      }
    }
  }, [clearEnemyTimers])

  const showFloatDamage = useCallback(
    (target: 'boss' | 'player', amount: number, variant: 'damage' | 'heal' = 'damage') => {
      if (floatTimerRef.current) clearTimeout(floatTimerRef.current)
      setFloatDamage({ target, amount, key: Date.now(), variant })
      floatTimerRef.current = setTimeout(() => {
        floatTimerRef.current = null
        setFloatDamage(null)
        setCombatEffect(null)
      }, FLOAT_DAMAGE_MS)
    },
    []
  )

  const playSpriteCue = useCallback((cue: CombatSpriteCue, durationMs: number) => {
    if (spriteCueTimerRef.current) clearTimeout(spriteCueTimerRef.current)
    setSpriteCue(cue)
    spriteCueTimerRef.current = setTimeout(() => {
      spriteCueTimerRef.current = null
      setSpriteCue(null)
    }, durationMs)
  }, [])

  const rollNextBossAttack = useCallback(() => {
    const upcoming = randomBossAttackName()
    nextAttackRef.current = upcoming
    setNextBossAttack(upcoming)
  }, [])

  const reset = useCallback(() => {
    clearTimers()
    endedRef.current = false
    finalizedRef.current = false
    inputLockRef.current = false
    const maxHp = CRAVING_TIERS[tier].bossHp
    bossMaxHpRef.current = maxHp
    counteredRef.current = false
    rollNextBossAttack()
    setBossMaxHp(maxHp)
    setPhase('entering')
    setPlayerHp(playerMaxHp)
    setBossHp(maxHp)
    setBattleMessage({ kind: 'status', text: CRAVING_TIERS[tier].introText })
    setBossShakeKey(0)
    setPlayerShakeKey(0)
    setVictoryAction(null)
    setDefeatSource(null)
    setSpriteCue(null)
    setFloatDamage(null)
    setCombatEffect(null)
    setTurnCount(1)
    setSessionXp(0)
    setSpecialsUsed(0)
    xpAtStartRef.current = useTrackerStore.getState().xp
    bossRegenPlanRef.current = rollBossRegenPlan()
    bossRegenUsedRef.current = false
    introTimerRef.current = setTimeout(() => {
      introTimerRef.current = null
      setPhase('boss_entering')
      bossIntroTimerRef.current = setTimeout(() => {
        bossIntroTimerRef.current = null
        setPhase('player_turn')
        setBattleMessage({ kind: 'idle' })
      }, BOSS_INTRO_MS)
    }, INTRO_DURATION_MS)
  }, [clearTimers, playerMaxHp, rollNextBossAttack, tier])

  useEffect(() => {
    if (enabled && !wasEnabledRef.current) {
      reset()
    }
    wasEnabledRef.current = enabled
  }, [enabled, reset])

  useEffect(() => () => clearTimers(), [clearTimers])

  const finalizeVictory = useCallback(
    async (action: CombatAction, totalSessionXp: number) => {
      if (finalizedRef.current) return
      finalizedRef.current = true
      inputLockRef.current = true
      await handleVictory(action, totalSessionXp)
      setVictoryAction(action)
      setPhase('victory')
    },
    [handleVictory]
  )

  const finalizeDefeat = useCallback(
    async (source: 'riposte' | 'abandon') => {
      if (finalizedRef.current) return
      finalizedRef.current = true
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
    const name = nextAttackRef.current
    const countered = counteredRef.current
    counteredRef.current = false
    rollNextBossAttack()

    setPhase('enemy_turn')
    playSpriteCue('boss', animMs)

    if (countered) {
      // Telegraphed attack was countered — it fizzles, no damage.
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {})
      setBattleMessage({ kind: 'boss_countered', attackName: name, bonusXp: COUNTER_BONUS_XP })
      enemyTimerRef.current = setTimeout(() => {
        enemyTimerRef.current = null
        inputLockRef.current = false
        setPhase('player_turn')
        setBattleMessage({ kind: 'idle' })
        setTurnCount((c) => c + 1)
      }, postAnimHandoffMs(animMs))
      return
    }

    const dmg = rollBossRiposteDamage(tier)
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {})
    setBattleMessage({ kind: 'boss_hit', attackName: name, damage: dmg })
    setCombatEffect({
      kind: 'boss_hits_player',
      effect: BOSS_ATTACK_EFFECT[name] ?? 'smoke',
      key: Date.now(),
    })
    setPlayerShakeKey((k) => k + 1)
    showFloatDamage('player', dmg)

    setPlayerHp((prev) => {
      const next = Math.max(0, prev - dmg)
      if (next === 0) {
        clearEnemyTimers()
        endedRef.current = true
        inputLockRef.current = true
        celebrateTimerRef.current = setTimeout(() => {
          setPhase('celebrate_defeat')
          celebrateTimerRef.current = setTimeout(() => {
            celebrateTimerRef.current = null
            void finalizeDefeat('riposte')
          }, DEFEAT_CELEBRATE_MS)
        }, postAnimHandoffMs(animMs))
      } else {
        enemyTimerRef.current = setTimeout(() => {
          enemyTimerRef.current = null
          inputLockRef.current = false
          setPhase('player_turn')
          setBattleMessage({ kind: 'idle' })
          setTurnCount((c) => c + 1)
        }, postAnimHandoffMs(animMs))
      }
      return next
    })
  }, [clearEnemyTimers, finalizeDefeat, playSpriteCue, rollNextBossAttack, showFloatDamage, tier])

  const startBossWindup = useCallback(() => {
    if (endedRef.current) return
    setPhase('boss_windup')
    enemyTimerRef.current = setTimeout(() => {
      enemyTimerRef.current = null
      runEnemyTurn()
    }, ENEMY_WINDUP_MS)
  }, [runEnemyTurn])

  const runBossRegen = useCallback(() => {
    if (endedRef.current) return
    const plan = bossRegenPlanRef.current
    if (plan == null || bossRegenUsedRef.current) {
      startBossWindup()
      return
    }

    bossRegenUsedRef.current = true
    setPhase('boss_regen')
    playSpriteCue('boss_regen', BOSS_REGEN_MS)
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {})
    setBattleMessage({ kind: 'boss_regen' })
    setCombatEffect({ kind: 'boss_regen', key: Date.now() })

    setBossHp((prev) => {
      const heal = bossRegenHealAmount(prev, plan.amount, bossMaxHpRef.current)
      if (heal > 0) showFloatDamage('boss', heal, 'heal')
      return applyBossRegenHp(prev, plan.amount, bossMaxHpRef.current)
    })

    enemyTimerRef.current = setTimeout(() => {
      enemyTimerRef.current = null
      startBossWindup()
    }, postAnimHandoffMs(BOSS_REGEN_MS))
  }, [playSpriteCue, showFloatDamage, startBossWindup])

  const scheduleEnemyTurn = useCallback(
    (playerAnimMs: number, nextBossHp: number, currentTurn: number) => {
      if (endedRef.current) return
      if (enemyWindupTimerRef.current) clearTimeout(enemyWindupTimerRef.current)
      enemyWindupTimerRef.current = setTimeout(() => {
        enemyWindupTimerRef.current = null
        if (
          shouldTriggerBossRegen(
            bossRegenPlanRef.current,
            bossRegenUsedRef.current,
            currentTurn,
            nextBossHp,
            bossMaxHpRef.current
          )
        ) {
          runBossRegen()
          return
        }
        startBossWindup()
      }, postAnimHandoffMs(playerAnimMs))
    },
    [runBossRegen, startBossWindup]
  )

  const applyDamageToBoss = useCallback(
    (action: CombatAction, baseDamage: number, support?: { heal: number; grade?: BreatheGrade }) => {
      const countered = BOSS_COUNTER_ACTION[nextAttackRef.current] === action
      counteredRef.current = countered

      // Utility moves (water/breathe) heal instead — only pure attacks can crit.
      const crit = support == null && Math.random() < CRIT_CHANCE
      const damage = crit ? Math.round(baseDamage * CRIT_MULTIPLIER) : baseDamage

      const xpGain = COMBAT_XP_BY_ACTION[action] + (countered ? COUNTER_BONUS_XP : 0)
      let nextSessionXp = 0

      setSessionXp((prev) => {
        nextSessionXp = prev + xpGain
        return nextSessionXp
      })
      if (action === 'special') {
        setSpecialsUsed((n) => n + 1)
      }

      const animMs = playerAttackDurationMs(action)
      playSpriteCue(action, animMs)
      void Haptics.impactAsync(
        crit ? Haptics.ImpactFeedbackStyle.Heavy : Haptics.ImpactFeedbackStyle.Light
      ).catch(() => {})
      if (support != null) {
        setPlayerHp((prev) => Math.min(playerMaxHp, prev + support.heal))
        setBattleMessage(
          support.grade != null
            ? { kind: 'player_breathe', grade: support.grade, damage, heal: support.heal }
            : { kind: 'player_water', damage, heal: support.heal }
        )
        showFloatDamage('player', support.heal, 'heal')
      } else {
        setBattleMessage({
          kind: 'player_hit',
          actionLabel: combatActionLabel(action),
          damage,
          crit,
        })
        showFloatDamage('boss', damage)
      }
      setBossShakeKey((k) => k + 1)
      setCombatEffect({
        kind: 'player_hits_boss',
        effect: action,
        key: Date.now(),
      })

      setBossHp((prev) => {
        const next = Math.max(0, prev - damage)
        if (next === 0) {
          clearEnemyTimers()
          endedRef.current = true
          inputLockRef.current = true
          // Read nextSessionXp inside the timer: the setSessionXp updater that
          // fills it may run after this bossHp updater in the same batch.
          celebrateTimerRef.current = setTimeout(() => {
            // Harder cravings pay a flat XP bonus on top of the session XP.
            setSessionXp((prev) => prev + CRAVING_TIERS[tier].victoryBonusXp)
            setPhase('celebrate_victory')
            celebrateTimerRef.current = setTimeout(() => {
              celebrateTimerRef.current = null
              void finalizeVictory(action, nextSessionXp + CRAVING_TIERS[tier].victoryBonusXp)
            }, VICTORY_CELEBRATE_MS)
          }, postAnimHandoffMs(animMs))
        } else {
          scheduleEnemyTurn(animMs, next, turnCount)
        }
        return next
      })
    },
    [
      clearEnemyTimers,
      finalizeVictory,
      playerMaxHp,
      playSpriteCue,
      scheduleEnemyTurn,
      showFloatDamage,
      tier,
      turnCount,
    ]
  )

  const chooseInstantAction = useCallback(
    (action: 'water' | 'distract' | 'special') => {
      if (phase !== 'player_turn' || endedRef.current || inputLockRef.current) return
      if (
        action === 'special' &&
        !canUseSpecialAttack(xpAtStartRef.current, sessionXp, specialsUsed)
      ) {
        return
      }
      inputLockRef.current = true
      setPhase('resolving_instant')
      applyDamageToBoss(
        action,
        DAMAGE_TO_BOSS[action],
        action === 'water' ? { heal: WATER_HEAL } : undefined
      )
    },
    [phase, sessionXp, specialsUsed, applyDamageToBoss]
  )

  const chooseBreathe = useCallback(() => {
    if (phase !== 'player_turn' || endedRef.current || inputLockRef.current) return
    inputLockRef.current = true
    setBattleMessage({ kind: 'status', text: COMBAT_BREATHE_STATUS })
    setPhase('breathe_pending')
  }, [phase])

  const onBreatheComplete = useCallback(
    (grade: BreatheGrade) => {
      if (phase !== 'breathe_pending' || endedRef.current) return
      const { heal, damage } = BREATHE_RESULT[grade]
      setPhase('resolving_instant')
      applyDamageToBoss('breathe', damage, { heal, grade })
    },
    [phase, applyDamageToBoss]
  )

  const abandon = useCallback(async () => {
    if (endedRef.current) return
    if (phase === 'entering' || phase === 'victory' || phase === 'defeat') return
    clearTimers()
    await finalizeDefeat('abandon')
  }, [phase, clearTimers, finalizeDefeat])

  const inArena =
    phase !== 'victory' &&
    phase !== 'defeat'

  const canUseSpecial = canUseSpecialAttack(
    xpAtStartRef.current,
    sessionXp,
    specialsUsed
  )
  const displayXp = xpAtStartRef.current + sessionXp

  return {
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
    xpAtStart: xpAtStartRef.current,
    specialsUsed,
    spriteCue,
    floatDamage,
    combatEffect,
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
