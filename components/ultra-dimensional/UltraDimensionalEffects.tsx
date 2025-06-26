'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 究極のパーティクルエフェクト
export function UltraDimensionalParticles() {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    size: number
    color: string
    speed: number
  }>>([])

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 1,
        color: ['#ff00ff', '#00ffff', '#ffff00', '#ff6600', '#8a2be2'][Math.floor(Math.random() * 5)],
        speed: Math.random() * 2 + 0.5,
      }))
      setParticles(newParticles)
    }

    generateParticles()
    window.addEventListener('resize', generateParticles)
    return () => window.removeEventListener('resize', generateParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-5">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-60"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 4}px ${particle.color}`,
          }}
          animate={{
            x: [particle.x, particle.x + 200, particle.x - 100, particle.x],
            y: [particle.y, particle.y - 150, particle.y + 100, particle.y],
            scale: [1, 1.5, 0.8, 1],
            opacity: [0.6, 1, 0.3, 0.6],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// 次元の裂け目エフェクト
export function DimensionalRift() {
  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      <motion.div
        className="absolute top-1/4 left-1/4 w-2 h-32 bg-gradient-to-b from-purple-500 via-pink-500 to-transparent"
        animate={{
          scaleY: [1, 3, 1],
          opacity: [0.3, 0.8, 0.3],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          filter: 'blur(1px)',
          boxShadow: '0 0 20px rgba(255, 0, 255, 0.5)',
        }}
      />
      <motion.div
        className="absolute top-3/4 right-1/3 w-2 h-24 bg-gradient-to-b from-cyan-500 via-blue-500 to-transparent"
        animate={{
          scaleY: [1, 2.5, 1],
          opacity: [0.4, 0.9, 0.4],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{
          filter: 'blur(1px)',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
        }}
      />
    </div>
  )
}

// 龍神のオーラエフェクト
export function DragonAura() {
  return (
    <div className="fixed inset-0 pointer-events-none z-5">
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(255,215,0,0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 70%, rgba(255,0,255,0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 20%, rgba(0,255,255,0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 30%, rgba(255,215,0,0.3) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

// 宇宙エネルギー波動エフェクト
export function CosmicWaves() {
  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border-2 border-purple-500/20 rounded-full"
          style={{
            width: '200%',
            height: '200%',
            left: '-50%',
            top: '-50%',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0, 0.5, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2.5,
          }}
        />
      ))}
    </div>
  )
}

// マトリックス風数字雨エフェクト
export function DigitalRain() {
  const [columns, setColumns] = useState<number>(0)

  useEffect(() => {
    setColumns(Math.floor(window.innerWidth / 20))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden opacity-20">
      {Array.from({ length: columns }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 text-green-400 text-sm font-mono"
          style={{ left: i * 20 }}
          animate={{
            y: [-100, window.innerHeight + 100],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 3,
          }}
        >
          {Array.from({ length: 20 }).map((_, j) => (
            <div key={j} className="h-5">
              {Math.random() > 0.5 ? Math.floor(Math.random() * 10) : '異'}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  )
}

// 魔法陣エフェクト
export function MagicCircle() {
  return (
    <div className="fixed inset-0 pointer-events-none z-5 flex items-center justify-center">
      <motion.div
        className="relative w-96 h-96 opacity-30"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {/* 外側の円 */}
        <div className="absolute inset-0 border-2 border-yellow-400 rounded-full" />
        <div className="absolute inset-4 border border-purple-400 rounded-full" />
        <div className="absolute inset-8 border border-cyan-400 rounded-full" />
        
        {/* 内側の星 */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-6xl text-yellow-400"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          ⭐
        </motion.div>
        
        {/* 外側の記号 */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 text-purple-400 text-2xl flex items-center justify-center"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-180px)`,
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            🔯
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// 統合エフェクト コンポーネント
export function UltraDimensionalEffectsContainer() {
  const [activeEffect, setActiveEffect] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEffect((prev) => (prev + 1) % 6)
    }, 10000) // 10秒ごとにエフェクト切り替え

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <UltraDimensionalParticles />
      <DragonAura />
      <CosmicWaves />
      
      <AnimatePresence mode="wait">
        {activeEffect === 0 && <DimensionalRift key="rift" />}
        {activeEffect === 1 && <DigitalRain key="rain" />}
        {activeEffect === 2 && <MagicCircle key="circle" />}
        {activeEffect >= 3 && <UltraDimensionalParticles key="particles-extra" />}
      </AnimatePresence>
    </>
  )
}