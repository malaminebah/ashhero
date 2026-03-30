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
    <View className="items-center py-6">
      <View className="w-40 h-40 rounded-full border-4 border-brand-accent items-center justify-center p-2">
        <View className="flex-row flex-wrap justify-center gap-1 w-32">
          {Array.from({ length: SEGMENTS }, (_, i) => (
            <View
              key={i}
              className={`w-3 h-3 ${i < filledSegments ? 'bg-brand-accent' : 'bg-white/10'}`}
            />
          ))}
        </View>
      </View>
      <Text className="text-brand-accent text-lg font-mono mt-6 tracking-widest">
        Respire...
      </Text>
      <Text className="text-white text-3xl font-mono mt-2 tabular-nums">
        {remaining}s
      </Text>
    </View>
  )
}
