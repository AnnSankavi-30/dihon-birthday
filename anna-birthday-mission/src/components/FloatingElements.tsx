import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Element {
  id: number
  type: 'balloon' | 'star' | 'heart'
  x: number
  size: number
  delay: number
  duration: number
}

const ELEMENT_COUNT = 15

const ICONS: Record<Element['type'], string> = {
  balloon: '🎈',
  star: '⭐',
  heart: '❤️',
}

export default function FloatingElements() {
  const [elements, setElements] = useState<Element[]>([])

  useEffect(() => {
    const items: Element[] = Array.from({ length: ELEMENT_COUNT }, (_, i) => ({
      id: i,
      type: (['balloon', 'star', 'heart'] as const)[i % 3],
      x: Math.random() * 100,
      size: 16 + Math.random() * 24,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 12,
    }))
    setElements(items)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {elements.map((el) => (
          <motion.div
            key={el.id}
            className="absolute"
            style={{
              left: `${el.x}%`,
              fontSize: el.size,
              bottom: '-5%',
            }}
            initial={{ y: '100vh', opacity: 0, rotate: 0 }}
            animate={{
              y: '-110vh',
              opacity: [0, 1, 1, 1, 0],
              rotate: [0, 10, -10, 5, 0],
            }}
            transition={{
              duration: el.duration,
              delay: el.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {ICONS[el.type]}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
