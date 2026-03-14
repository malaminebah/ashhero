import { useState, useEffect } from 'react'

const ONE_MINUTE_MS = 60_000
export function useNow(intervalMs = ONE_MINUTE_MS) {
  const [, setNow] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), intervalMs)
    return () => clearInterval(interval)
  }, [])

}