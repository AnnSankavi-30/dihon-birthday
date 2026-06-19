import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleToggle = useCallback(() => {
    if (!audioRef.current) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = ctx.createOscillator()
      const gain = ctx.createGain()
      oscillator.connect(gain)
      gain.connect(ctx.destination)
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(523.25, ctx.currentTime) // C5

      // Simple birthday melody
      const notes = [
        { freq: 523.25, start: 0, dur: 0.4 },
        { freq: 523.25, start: 0.4, dur: 0.2 },
        { freq: 587.33, start: 0.7, dur: 0.4 },
        { freq: 523.25, start: 1.1, dur: 0.4 },
        { freq: 659.25, start: 1.5, dur: 0.4 },
        { freq: 587.33, start: 1.9, dur: 0.6 },
        { freq: 523.25, start: 2.6, dur: 0.4 },
        { freq: 523.25, start: 3.0, dur: 0.2 },
        { freq: 587.33, start: 3.3, dur: 0.4 },
        { freq: 783.99, start: 3.7, dur: 0.4 },
        { freq: 659.25, start: 4.1, dur: 0.6 },
        { freq: 523.25, start: 4.8, dur: 0.4 },
        { freq: 523.25, start: 5.2, dur: 0.2 },
        { freq: 783.99, start: 5.5, dur: 0.4 },
        { freq: 659.25, start: 5.9, dur: 0.4 },
        { freq: 587.33, start: 6.3, dur: 0.6 },
      ]

      let interval: ReturnType<typeof setInterval>
      let noteIndex = 0

      const playNote = () => {
        if (noteIndex >= notes.length) {
          noteIndex = 0
        }
        const note = notes[noteIndex]
        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        osc.connect(g)
        g.connect(ctx.destination)
        osc.type = 'sine'
        osc.frequency.setValueAtTime(note.freq, ctx.currentTime)
        g.gain.setValueAtTime(0.15, ctx.currentTime)
        g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + note.dur)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + note.dur)
        noteIndex++
      }

      playNote()
      interval = setInterval(() => {
        if (noteIndex < notes.length) {
          playNote()
        } else {
          clearInterval(interval)
          setPlaying(false)
        }
      }, (notes[1]?.start ?? 0.4) * 1000)

      const stopAll = () => {
        clearInterval(interval)
        ctx.close()
        audioRef.current = null
      }

      audioRef.current = { stop: stopAll } as any
    } else {
      ;(audioRef.current as any).stop()
      audioRef.current = null
    }

    setPlaying(!playing)
  }, [playing])

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.button
        onClick={handleToggle}
        className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="text-xl">
          {playing ? '🔊' : '🔇'}
        </span>
      </motion.button>
      <AnimatePresence>
        {showTooltip && (
          <motion.p
            className="absolute -bottom-8 right-0 text-xs text-white/60 whitespace-nowrap"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
          >
            {playing ? 'Music Playing' : 'Play Music'}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
