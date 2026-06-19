import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useConfetti } from './Confetti'

const CANDLE_COUNT = 5

export default function FinalCelebration() {
  const [cakeCut, setCakeCut] = useState(false)
  const [cutting, setCutting] = useState(false)
  const [candlesOut, setCandlesOut] = useState<boolean[]>(Array(CANDLE_COUNT).fill(false))
  const { fire } = useConfetti()

  const handleCutCake = () => {
    setCutting(true)
    setTimeout(() => {
      setCakeCut(true)
      fire()
      candlesOut.forEach((_, i) => {
        setTimeout(() => {
          setCandlesOut((prev) => {
            const next = [...prev]
            next[i] = true
            return next
          })
        }, (i + 1) * 400)
      })
    }, 1000)
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="text-center max-w-xl"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <AnimatePresence mode="wait">
          {!cakeCut ? (
            <motion.h1
              key="mission"
              className="text-4xl md:text-5xl font-serif font-bold text-white mb-3 glow-text"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ delay: 0.2 }}
            >
              Mission Completed 🎉
            </motion.h1>
          ) : (
            <motion.h1
              key="birthday"
              className="text-4xl md:text-5xl font-cursive text-yellow-300 mb-3 glow-text"
              initial={{ y: 30, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              Happy 23rd Happy Birthday Anna ❤️
            </motion.h1>
          )}
        </AnimatePresence>



        {/* Animated Cake */}
        <motion.div
          className="relative mb-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
        >
          {/* Cake container */}
          <div className="relative inline-block">
            {/* Candles */}
            <div className="flex justify-center gap-3 mb-2">
              {Array.from({ length: CANDLE_COUNT }, (_, i) => (
                <motion.div
                  key={i}
                  className="relative"
                  animate={candlesOut[i] ? { scale: 0.8 } : {}}
                >
                  <div className="w-2 h-5 bg-gradient-to-b from-cyan-300 to-cyan-500 rounded-sm mx-auto" />
                  <AnimatePresence>
                    {!candlesOut[i] && (
                      <motion.div
                        className="absolute -top-3 left-1/2 -translate-x-1/2"
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="w-3 h-4 bg-gradient-to-b from-yellow-300 via-orange-400 to-red-500 rounded-full"
                          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                          transition={{ duration: 0.3, repeat: Infinity }}
                        />
                        <div className="absolute -top-1 -left-1 w-5 h-5 bg-yellow-300/30 blur-lg rounded-full" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {candlesOut[i] && (
                      <motion.div
                        className="absolute -top-6 left-1/2 -translate-x-1/2"
                        initial={{ opacity: 1, y: 0, scale: 0.5 }}
                        animate={{ opacity: 0, y: -20, scale: 2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                      >
                        <span className="text-gray-300 text-xs">💨</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Uncaked cake - shown before cut */}
            <AnimatePresence mode="wait">
              {!cakeCut ? (
                <motion.div
                  key="whole-cake"
                  className="relative"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-gradient-to-b from-pink-400 to-pink-600 rounded-t-full w-48 h-16 mx-auto relative overflow-hidden">
                    <div className="absolute top-1 left-1 right-1 h-3 bg-white/30 rounded-t-full" />
                  </div>
                  <div className="bg-gradient-to-b from-pink-500 to-pink-700 w-52 h-12 mx-auto rounded-b-lg relative">
                    <div className="absolute top-0 left-0 right-0 h-2 bg-white/20" />
                  </div>
                  <div className="w-56 h-3 bg-gray-300 rounded-full mx-auto mt-1" />
                </motion.div>
              ) : (
                /* Cut cake - two halves */
                <motion.div
                  key="cut-cake"
                  className="flex items-center justify-center gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Left half */}
                  <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: -10 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                  >
                    <div className="bg-gradient-to-b from-pink-400 to-pink-600 rounded-t-full w-[92px] h-16 relative overflow-hidden">
                      <div className="absolute top-1 left-1 right-1 h-3 bg-white/30 rounded-t-full" />
                    </div>
                    <div className="bg-gradient-to-b from-pink-500 to-pink-700 w-[100px] h-12 rounded-b-lg relative">
                      <div className="absolute top-0 left-0 right-0 h-2 bg-white/20" />
                    </div>
                  </motion.div>
                  {/* Right half */}
                  <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: 10 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                  >
                    <div className="bg-gradient-to-b from-pink-400 to-pink-600 rounded-t-full w-[92px] h-16 relative overflow-hidden">
                      <div className="absolute top-1 left-1 right-1 h-3 bg-white/30 rounded-t-full" />
                    </div>
                    <div className="bg-gradient-to-b from-pink-500 to-pink-700 w-[100px] h-12 rounded-b-lg relative">
                      <div className="absolute top-0 left-0 right-0 h-2 bg-white/20" />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Plate (stays visible) */}
            <div className="w-56 h-3 bg-gray-300 rounded-full mx-auto mt-1" />

            {/* Knife */}
            <AnimatePresence>
              {cutting && !cakeCut && (
                <motion.div
                  className="absolute left-1/2 top-0 z-20"
                  style={{ x: '-50%' }}
                  initial={{ y: -60, rotate: 0 }}
                  animate={{ y: 80, rotate: 5 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                >
                  <span className="text-3xl">🔪</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Decorations */}
            <motion.div
              className="text-2xl absolute -top-8 -left-6"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🍒
            </motion.div>
            <motion.div
              className="text-xl absolute -top-6 -right-4"
              animate={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              🌸
            </motion.div>
          </div>
        </motion.div>

        {/* Cut Cake Button */}
        {!cutting && !cakeCut && (
          <motion.button
            onClick={handleCutCake}
            className="px-10 py-4 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500 text-gray-900 font-bold text-xl rounded-full shadow-lg shadow-yellow-500/30 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            Tap to Cut Cake 🎂
          </motion.button>
        )}

        {cutting && !cakeCut && (
          <motion.p
            className="text-yellow-400 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ✂️ Cutting the cake...
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  )
}
