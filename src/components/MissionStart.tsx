import { motion } from 'framer-motion'

interface MissionStartProps {
  onStart: () => void
}

export default function MissionStart({ onStart }: MissionStartProps) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <motion.div
        className="text-center max-w-lg"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="w-64 h-80 md:w-72 md:h-96 mx-auto mb-10 rounded-2xl overflow-hidden border-4 border-yellow-400/50 shadow-xl shadow-yellow-400/20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        >
          <img
            src="/anna-photo.png"
            alt="Anna"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.button
          onClick={onStart}
          className="px-10 py-4 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500 text-gray-900 font-bold text-xl rounded-full shadow-lg shadow-yellow-500/30 cursor-pointer"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)' }}
          whileTap={{ scale: 0.95 }}
        >
          Start Mission 🚀
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
