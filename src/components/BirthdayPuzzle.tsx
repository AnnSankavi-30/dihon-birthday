import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GRID_SIZE = 3
const TILE_COUNT = GRID_SIZE * GRID_SIZE

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 2; i > 0; i--) {
    const j = 1 + Math.floor(Math.random() * i)
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function isSolvable(tiles: number[]): boolean {
  let inversions = 0
  for (let i = 0; i < tiles.length; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      if (tiles[i] && tiles[j] && tiles[i] > tiles[j]) {
        inversions++
      }
    }
  }
  return inversions % 2 === 0
}

function generateSolvablePuzzle(): number[] {
  let tiles = shuffleArray(Array.from({ length: TILE_COUNT }, (_, i) => i))
  while (!isSolvable(tiles)) {
    tiles = shuffleArray(Array.from({ length: TILE_COUNT }, (_, i) => i))
  }
  return tiles
}

export default function BirthdayPuzzle() {
  const [tiles, setTiles] = useState<number[]>(() => generateSolvablePuzzle())
  const [moves, setMoves] = useState(0)
  const [solved, setSolved] = useState(false)

  const emptyIndex = tiles.indexOf(0)

  const checkSolved = useCallback((currentTiles: number[]) => {
    const isSolved = currentTiles.every((tile, i) => tile === i)
    setSolved(isSolved)
    return isSolved
  }, [])

  const canMove = (index: number) => {
    const emptyRow = Math.floor(emptyIndex / GRID_SIZE)
    const emptyCol = emptyIndex % GRID_SIZE
    const row = Math.floor(index / GRID_SIZE)
    const col = index % GRID_SIZE
    return Math.abs(emptyRow - row) + Math.abs(emptyCol - col) === 1
  }

  const handleTileClick = (index: number) => {
    if (solved || !canMove(index)) return
    const newTiles = [...tiles]
    ;[newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]]
    setTiles(newTiles)
    setMoves((m) => m + 1)
    checkSolved(newTiles)
  }

  const handleShuffle = () => {
    setTiles(generateSolvablePuzzle())
    setMoves(0)
    setSolved(false)
  }

  return (
    <motion.div
      className="flex flex-col items-center w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.p
        className="text-gray-300 text-sm mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Solve the puzzle to unlock the memories 🧩
        <span className="block text-yellow-400/60 text-xs mt-1">Moves: {moves}</span>
      </motion.p>

      <div
        className="grid gap-1.5 mb-4"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          width: 270,
          height: 270,
        }}
      >
        <AnimatePresence mode="popLayout">
          {tiles.map((tile, i) => {
            if (tile === 0) {
              return (
                <motion.div
                  key="empty"
                  layoutId={`tile-${i}`}
                  className="rounded-lg bg-white/5"
                  style={{ aspectRatio: '1' }}
                />
              )
            }
            const row = Math.floor((tile - 1) / GRID_SIZE)
            const col = (tile - 1) % GRID_SIZE
            return (
              <motion.button
                key={tile}
                layoutId={`tile-${i}`}
                className={`rounded-lg overflow-hidden cursor-pointer ${solved ? 'pointer-events-none' : ''}`}
                style={{ aspectRatio: '1' }}
                onClick={() => handleTileClick(i)}
                whileHover={!solved && canMove(i) ? { scale: 1.05 } : {}}
                whileTap={!solved && canMove(i) ? { scale: 0.95 } : {}}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'url(/anna-photo.png)',
                    backgroundSize: `${GRID_SIZE * 100}%`,
                    backgroundPosition: `-${col * 100}% -${row * 100}%`,
                  }}
                />
              </motion.button>
            )
          })}
        </AnimatePresence>
      </div>

      {solved ? (
        <motion.p
          className="text-yellow-400 font-semibold text-lg mb-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          🎉 Puzzle Solved! Now explore the doors below ✨
        </motion.p>
      ) : (
        <motion.button
          onClick={handleShuffle}
          className="px-6 py-2 bg-white/10 text-white/70 text-sm rounded-full border border-white/20 cursor-pointer hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔀 Shuffle Puzzle
        </motion.button>
      )}
    </motion.div>
  )
}
