import type { ReactNode } from 'react'
import { View } from 'react-native'
import { FlowText } from '@/components/ui/flow-text'
import { COMBAT_BOSS_REGEN_MESSAGE } from '../constants'
import { BREATHE_GRADE_LABEL } from '../breatheCycle'
import type { CombatMessageBoxParams } from '../types'

const ACTION_COLOR: Record<string, string> = {
  "Boire de l'eau": '#60a5fa',
  Respirer: '#22c55e',
  'Se distraire': '#94a3b8',
  'Attaque spéciale': '#fbbf24',
}

/** Mockup dialog — dark violet box, 14px bold copy, colored keywords. */
export const CombatMessageBox = ({
  message,
  showPrompt = true,
  heroName,
  nextAttack,
}: CombatMessageBoxParams) => {
  const idlePrompt =
    heroName != null && heroName.length > 0
      ? `Que doit faire ${heroName} ?`
      : 'Que vas-tu faire ?'

  const wrap = (children: ReactNode) => (
    <View
      className="min-h-[48px] justify-center rounded-2xl px-4 py-3"
      style={{
        backgroundColor: '#160826',
        borderWidth: 1.5,
        borderColor: 'rgba(168,85,247,0.45)',
      }}
    >
      {children}
    </View>
  )

  const body = 'text-sm font-bold leading-5 text-white'

  if (message.kind === 'idle') {
    return wrap(
      <>
        <FlowText className={body}>{showPrompt ? idlePrompt : '…'}</FlowText>
        {showPrompt && nextAttack != null ? (
          <FlowText className="mt-0.5 text-xs font-bold leading-4" style={{ color: '#c084fc' }}>
            L&apos;Envie prépare {nextAttack}…
          </FlowText>
        ) : null}
      </>
    )
  }

  if (message.kind === 'status') {
    return wrap(<FlowText className={body}>{message.text}</FlowText>)
  }

  if (message.kind === 'player_hit') {
    const color = ACTION_COLOR[message.actionLabel] ?? '#60a5fa'
    return wrap(
      <FlowText className={body}>
        {message.crit ? (
          <FlowText className={body} style={{ color: '#fbbf24' }}>Coup critique ! </FlowText>
        ) : null}
        Tu utilises <FlowText className={body} style={{ color }}>{message.actionLabel}</FlowText> !
        {' '}L&apos;Envie subit{' '}
        <FlowText className={body} style={{ color }}>{message.damage} dégâts</FlowText> !
      </FlowText>
    )
  }

  if (message.kind === 'player_water') {
    return wrap(
      <FlowText className={body}>
        Tu bois de l&apos;eau : tu récupères{' '}
        <FlowText className={body} style={{ color: '#60a5fa' }}>{message.heal} PV</FlowText>
        {' '}et l&apos;Envie subit{' '}
        <FlowText className={body} style={{ color: '#60a5fa' }}>{message.damage} dégâts</FlowText> !
      </FlowText>
    )
  }

  if (message.kind === 'player_breathe') {
    return wrap(
      <FlowText className={body}>
        <FlowText className={body} style={{ color: '#22c55e' }}>
          {BREATHE_GRADE_LABEL[message.grade]}
        </FlowText>
        {' '}Tu récupères{' '}
        <FlowText className={body} style={{ color: '#22c55e' }}>{message.heal} PV</FlowText>
        {' '}et l&apos;Envie subit{' '}
        <FlowText className={body} style={{ color: '#22c55e' }}>{message.damage} dégâts</FlowText> !
      </FlowText>
    )
  }

  if (message.kind === 'boss_countered') {
    return wrap(
      <FlowText className={body}>
        <FlowText className={body} style={{ color: '#22c55e' }}>Contré !</FlowText>
        {' '}<FlowText className={body} style={{ color: '#c084fc' }}>{message.attackName}</FlowText>
        {' '}échoue —{' '}
        <FlowText className={body} style={{ color: '#fbbf24' }}>+{message.bonusXp} XP</FlowText>
      </FlowText>
    )
  }

  if (message.kind === 'boss_regen') {
    return wrap(
      <FlowText className={body} style={{ color: '#4ade80' }}>
        {COMBAT_BOSS_REGEN_MESSAGE}
      </FlowText>
    )
  }

  return wrap(
    <FlowText className={body}>
      L&apos;Envie utilise{' '}
      <FlowText className={body} style={{ color: '#c084fc' }}>{message.attackName}</FlowText> !
      {' '}Tu subis{' '}
      <FlowText className={body} style={{ color: '#ef4444' }}>{message.damage} dégâts</FlowText> !
    </FlowText>
  )
}
