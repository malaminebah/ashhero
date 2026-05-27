import { useEffect, useRef, useState } from 'react'
import { View, Text } from 'react-native'

const TOTAL_SECONDS = 60
const SEGMENTS = 12

type Props = {
  onComplete: () => void
}

export const BreatheTimer = ({ onComplete }: Props) => {
  const [remaining, setRemaining] = useState(TOTAL_SECONDS)
  const onCompleteRef = useRef(onComplete)
  const completedRef = useRef(false)
  onCompleteRef.current = onComplete

  useEffect(() => {
    if (remaining <= 0) return
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000)
    return () => clearTimeout(t)
  }, [remaining])

  useEffect(() => {
    if (remaining !== 0 || completedRef.current) return
    completedRef.current = true
    onCompleteRef.current()
  }, [remaining])

  const filledSegments = Math.min(
    SEGMENTS,
    Math.floor(((TOTAL_SECONDS - remaining) / TOTAL_SECONDS) * SEGMENTS)
  )

  return (
    <View className="mb-4 items-center py-4">
      <View className="h-36 w-36 items-center justify-center rounded-full border-2 border-brand-success/50 p-2">
        <View className="w-32 flex-row flex-wrap justify-center gap-1">
          {Array.from({ length: SEGMENTS }, (_, i) => (
            <View
              key={i}
              className={`h-3 w-3 ${i < filledSegments ? 'bg-brand-success' : 'bg-white/10'}`}
            />
          ))}
        </View>
      </View>
      <Text className="mt-4 font-mono text-xs tracking-widest text-brand-success">
        Respire…
      </Text>
      <Text className="mt-2 font-mono text-3xl tabular-nums text-white">{remaining}s</Text>
    </View>
  )
}
