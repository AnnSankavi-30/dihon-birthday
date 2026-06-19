import { useState, useEffect, useCallback } from 'react'

interface UseTypewriterOptions {
  text: string
  speed?: number
  delay?: number
  onComplete?: () => void
}

export function useTypewriter({ text, speed = 40, delay = 0, onComplete }: UseTypewriterOptions) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  const start = useCallback(() => setStarted(true), [])

  useEffect(() => {
    if (!started) return
    const timer = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          onComplete?.()
        }
      }, speed)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timer)
  }, [started, text, speed, delay, onComplete])

  return { displayed, start, isComplete: displayed.length >= text.length }
}
