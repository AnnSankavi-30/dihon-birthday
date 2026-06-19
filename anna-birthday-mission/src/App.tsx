import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { Screen } from './types'
import LockScreen from './components/LockScreen'
import MissionStart from './components/MissionStart'
import MemoryDoors from './components/MemoryDoors'
import FinalCelebration from './components/FinalCelebration'
import FloatingElements from './components/FloatingElements'
import MusicToggle from './components/MusicToggle'

export default function App() {
  const [screen, setScreen] = useState<Screen>('lock')

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0a0020] via-[#1a0040] to-[#2d0060]">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,215,0,0.08)_0%,transparent_60%)]" />

      {/* Floating animated elements */}
      <FloatingElements />

      {/* Music Toggle */}
      <MusicToggle />

      {/* Screen transitions */}
      <AnimatePresence mode="wait">
        {screen === 'lock' && (
          <LockScreen key="lock" onUnlock={() => setScreen('mission')} />
        )}
        {screen === 'mission' && (
          <MissionStart key="mission" onStart={() => setScreen('doors')} />
        )}
        {screen === 'doors' && (
          <MemoryDoors key="doors" onComplete={() => setScreen('celebration')} />
        )}
        {screen === 'celebration' && (
          <FinalCelebration key="celebration" />
        )}
      </AnimatePresence>
    </div>
  )
}
