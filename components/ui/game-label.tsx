import { FlowText } from '@/components/ui/flow-text'
import type { TextProps } from 'react-native'

export type GameLabelParams = TextProps & { className?: string }

export const GameLabel = ({ className = '', ...props }: GameLabelParams) => (
  <FlowText
    className={`text-[11px] font-bold uppercase tracking-[0.6px] text-brand-muted ${className}`}
    {...props}
  />
)
