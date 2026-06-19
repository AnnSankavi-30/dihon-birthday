import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SECRET_CODE = '0620'

interface LockScreenProps {
  onUnlock: () => void
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = () => {
    if (code === SECRET_CODE) {
      onUnlock()
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="text-center max-w-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          className="text-6xl mb-8"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          🎁
        </motion.div>

        <motion.h1
          className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 glow-text"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Today is a special day...
        </motion.h1>

        <motion.p
          className="text-gray-300 text-lg mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          but your surprise is locked <span className="text-2xl">🔒</span>
        </motion.p>

        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-gray-200 text-sm mb-3">Enter secret birthday code</p>
          <motion.div
            animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <input
              type="password"
              value={code}
              onChange={(e) => {
                setCode(e.target.value)
                setError(false)
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white text-center text-xl font-mono tracking-widest outline-none focus:border-yellow-400/50 transition-colors placeholder:text-gray-500"
              placeholder="••••••"
              maxLength={6}
              autoFocus
            />
          </motion.div>

          <p className="text-yellow-400/70 text-xs mt-3">
            Hint: Your special day 🎂
          </p>

          <motion.button
            onClick={handleSubmit}
            className="mt-5 w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-semibold rounded-xl text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Unlock Surprise 🔓
          </motion.button>

          <AnimatePresence>
            {error && (
              <motion.p
                className="text-red-400 mt-3 text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                Oops! Try again Anna 😄
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
