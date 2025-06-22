'use client'

import { motion } from 'framer-motion'

const elements = ['🌟', '💫', '🔮', '✨', '🔯', '🌙', '⭐', '🪐']

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl opacity-30"
          initial={{
            x: -100,
            y: '100vh',
            rotate: 0,
          }}
          animate={{
            x: 'calc(100vw + 100px)',
            y: -100,
            rotate: 720,
          }}
          transition={{
            duration: 20 + index * 2,
            repeat: Infinity,
            delay: index * 3,
            ease: 'linear',
          }}
          style={{
            top: `${Math.random() * 80}%`,
          }}
        >
          {element}
        </motion.div>
      ))}
    </div>
  )
}