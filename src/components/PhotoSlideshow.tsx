import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PHOTOS = [
  { src: '/photos/slide1.jpg', caption: 'Best Memory' },
  { src: '/photos/slide2.jpg', caption: 'Family Love' },
  { src: '/photos/slide3.jpg', caption: 'Funny Moment' },
  { src: '/photos/slide4.jpg', caption: 'My Support' },
  { src: '/photos/slide5.jpg', caption: 'Forever Bond' },
  { src: '/photos/slide6.jpg', caption: 'Special Day' },
  { src: '/photos/slide7.jpg', caption: 'Happy Birthday' },
]

function playBirthdaySong() {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
  const notes = [
    { freq: 523.25, dur: 0.3 },
    { freq: 523.25, dur: 0.15 },
    { freq: 587.33, dur: 0.4 },
    { freq: 523.25, dur: 0.4 },
    { freq: 659.25, dur: 0.4 },
    { freq: 587.33, dur: 0.6 },
    { freq: 523.25, dur: 0.3 },
    { freq: 523.25, dur: 0.15 },
    { freq: 587.33, dur: 0.4 },
    { freq: 783.99, dur: 0.4 },
    { freq: 659.25, dur: 0.6 },
    { freq: 523.25, dur: 0.3 },
    { freq: 523.25, dur: 0.15 },
    { freq: 783.99, dur: 0.4 },
    { freq: 659.25, dur: 0.4 },
    { freq: 587.33, dur: 0.6 },
    { freq: 1046.50, dur: 0.3 },
    { freq: 1046.50, dur: 0.15 },
    { freq: 783.99, dur: 0.4 },
    { freq: 659.25, dur: 0.4 },
    { freq: 587.33, dur: 0.4 },
    { freq: 523.25, dur: 0.6 },
    { freq: 1046.50, dur: 0.3 },
    { freq: 1046.50, dur: 0.15 },
    { freq: 783.99, dur: 0.4 },
    { freq: 659.25, dur: 0.4 },
    { freq: 587.33, dur: 0.4 },
    { freq: 523.25, dur: 0.6 },
  ]

  let time = ctx.currentTime
  notes.forEach((note) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(note.freq, time)
    gain.gain.setValueAtTime(0.12, time)
    gain.gain.exponentialRampToValueAtTime(0.01, time + note.dur)
    osc.start(time)
    osc.stop(time + note.dur)
    time += note.dur + 0.05
  })

  setTimeout(() => ctx.close(), (time - ctx.currentTime) * 1000 + 500)
}

interface PhotoSlideshowProps {
  onComplete: () => void
}

export default function PhotoSlideshow({ onComplete }: PhotoSlideshowProps) {
  const [visible, setVisible] = useState(false)
  const [revealedCount, setRevealedCount] = useState(0)
  const [showButton, setShowButton] = useState(false)
  const hasPlayed = useRef(false)

  useEffect(() => {
    setVisible(true)
    if (!hasPlayed.current) {
      playBirthdaySong()
      hasPlayed.current = true
    }
    PHOTOS.forEach((_, i) => {
      setTimeout(() => setRevealedCount(i + 1), (i + 1) * 500)
    })
    setTimeout(() => setShowButton(true), PHOTOS.length * 500 + 800)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="w-full"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-2xl md:text-3xl font-serif font-bold text-white text-center mb-6 glow-text"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Our Memories ❤️
          </motion.h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
            {PHOTOS.map((photo, i) => (
              <motion.div
                key={i}
                className="relative rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/40 to-pink-900/40"
                style={{ aspectRatio: '4/3' }}
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                animate={
                  i < revealedCount
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 40, scale: 0.8 }
                }
                transition={{ duration: 0.5, ease: 'easeOut' }}
                whileHover={{ scale: 1.08, zIndex: 10 }}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.currentTarget
                    target.style.display = 'none'
                    if (target.parentElement) {
                      target.parentElement.classList.add(
                        'bg-gradient-to-br', 'from-purple-500', 'to-pink-500',
                        'flex', 'flex-col', 'items-center', 'justify-center'
                      )
                      target.parentElement.innerHTML = `
                        <span class="text-3xl">📸</span>
                        <span class="text-white text-xs font-medium mt-1">${photo.caption}</span>
                      `
                    }
                  }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-white text-[10px] font-medium">{photo.caption}</span>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {showButton && (
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.button
                onClick={onComplete}
                className="px-10 py-4 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500 text-gray-900 font-bold text-xl rounded-full shadow-lg shadow-yellow-500/30 cursor-pointer"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                Continue to Celebration 🎉
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
