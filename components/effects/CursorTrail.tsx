'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Point {
  x: number
  y: number
  id: number
}

export function CursorTrail() {
  const [points, setPoints] = useState<Point[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let pointId = 0

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true)
      
      setPoints(prevPoints => {
        const newPoint: Point = {
          x: e.clientX,
          y: e.clientY,
          id: pointId++,
        }
        
        // 最大15個のポイントを保持
        const newPoints = [newPoint, ...prevPoints.slice(0, 14)]
        return newPoints
      })
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
      setTimeout(() => setPoints([]), 300)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {points.map((point, index) => (
        <motion.div
          key={point.id}
          className="absolute w-3 h-3 rounded-full bg-purple-500"
          style={{
            left: point.x - 6,
            top: point.y - 6,
          }}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ 
            scale: 0,
            opacity: 0,
          }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          {/* 光のオーラ */}
          <div 
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              background: `radial-gradient(circle, rgba(147, 51, 234, 0.6) 0%, transparent 70%)`,
              transform: 'scale(2)',
            }}
          />
          
          {/* 星のパーティクル */}
          {index % 3 === 0 && (
            <motion.div
              className="absolute inset-0 text-yellow-400 text-sm flex items-center justify-center"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: [0, 1.5, 0], rotate: 360 }}
              transition={{ duration: 1 }}
            >
              ✨
            </motion.div>
          )}
          
          {/* 異次元記号 */}
          {index % 5 === 0 && (
            <motion.div
              className="absolute inset-0 text-cyan-400 text-xs flex items-center justify-center"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: [0, 2, 0], rotate: -360 }}
              transition={{ duration: 1.2 }}
            >
              🔮
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

// クリック時の爆発エフェクト
export function ClickExplosion() {
  const [explosions, setExplosions] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    let explosionId = 0

    const handleClick = (e: MouseEvent) => {
      const newExplosion = {
        id: explosionId++,
        x: e.clientX,
        y: e.clientY,
      }

      setExplosions(prev => [...prev, newExplosion])

      // 3秒後にエフェクトを削除
      setTimeout(() => {
        setExplosions(prev => prev.filter(exp => exp.id !== newExplosion.id))
      }, 3000)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {explosions.map((explosion) => (
        <div
          key={explosion.id}
          className="absolute"
          style={{
            left: explosion.x - 25,
            top: explosion.y - 25,
          }}
        >
          {/* 中心の爆発 */}
          <motion.div
            className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          
          {/* 放射状のパーティクル */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              style={{
                left: 22,
                top: 22,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                x: Math.cos((i * Math.PI * 2) / 8) * 50,
                y: Math.sin((i * Math.PI * 2) / 8) * 50,
                scale: [0, 1, 0],
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
              }}
            />
          ))}
          
          {/* 魔法の文字 */}
          <motion.div
            className="absolute text-2xl"
            style={{ left: 15, top: 10 }}
            initial={{ scale: 0, rotate: 0, opacity: 1 }}
            animate={{ 
              scale: [0, 1.5, 0], 
              rotate: 360, 
              opacity: [1, 1, 0],
              y: -30,
            }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            {['✨', '🌟', '💫', '🔮', '⭐'][Math.floor(Math.random() * 5)]}
          </motion.div>
        </div>
      ))}
    </div>
  )
}