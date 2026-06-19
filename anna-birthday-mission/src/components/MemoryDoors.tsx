import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BirthdayPuzzle from './BirthdayPuzzle'
import PhotoSlideshow from './PhotoSlideshow'

interface MemoryDoorsProps {
  onComplete: () => void
}

export default function MemoryDoors({ onComplete }: MemoryDoorsProps) {
  const [showMemories, setShowMemories] = useState(false)

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <BirthdayPuzzle />

      <AnimatePresence mode="wait">
        {!showMemories ? (
          <motion.div
            key="next-btn"
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <motion.button
              onClick={() => setShowMemories(true)}
              className="px-10 py-4 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500 text-gray-900 font-bold text-xl rounded-full shadow-lg shadow-yellow-500/30 cursor-pointer"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              Next ➡️
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="slideshow"
            className="w-full mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <PhotoSlideshow onComplete={onComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
