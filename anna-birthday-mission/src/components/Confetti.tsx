import { useCallback, useRef } from 'react'
import confetti from 'canvas-confetti'

export function useConfetti() {
  const fired = useRef(false)

  const fire = useCallback(() => {
    if (fired.current) return
    fired.current = true

    const duration = 4000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#ffd700', '#ff6b6b', '#ff9ff3', '#54a0ff', '#5f27cd'],
      })
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#ffd700', '#ff6b6b', '#ff9ff3', '#54a0ff', '#5f27cd'],
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()

    // Big burst
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#ff6b6b', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3'],
      })
    }, 500)

    setTimeout(() => {
      fired.current = false
    }, duration + 1000)
  }, [])

  return { fire }
}
