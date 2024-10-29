'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Laser {
  id: number
  x: number
  y: number
  angle: number
  speed: number
  length: number
  opacity: number
}

export default function LaserBackground({ darkMode }: { darkMode: boolean }) {
  const [lasers, setLasers] = useState<Laser[]>([])

  useEffect(() => {
    console.log('LaserBackground mounted, darkMode:', darkMode)

    if (!darkMode) return

    // Create initial lasers
    const initialLasers = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      angle: Math.random() * 360,
      speed: 1 + Math.random() * 2,
      length: 200 + Math.random() * 300,
      opacity: 0.3 + Math.random() * 0.4
    }))

    console.log('Created lasers:', initialLasers)
    setLasers(initialLasers)

    const interval = setInterval(() => {
      setLasers(prevLasers => 
        prevLasers.map(laser => ({
          ...laser,
          x: (laser.x + Math.cos(laser.angle * Math.PI / 180) * laser.speed) % window.innerWidth,
          y: (laser.y + Math.sin(laser.angle * Math.PI / 180) * laser.speed) % window.innerHeight,
          opacity: 0.3 + Math.random() * 0.4
        }))
      )
    }, 50)

    return () => clearInterval(interval)
  }, [darkMode])

  if (!darkMode) return null

  return (
    <div className="fixed inset-0 z-10 overflow-hidden pointer-events-none">
      {lasers.map(laser => (
        <motion.div
          key={laser.id}
          className="absolute bg-gradient-to-r from-purple-500/50 to-purple-600/50 blur-md"
          style={{
            left: laser.x,
            top: laser.y,
            width: laser.length,
            height: '4px',
            opacity: laser.opacity,
            transform: `rotate(${laser.angle}deg)`,
            boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)',
            zIndex: 1
          }}
          animate={{
            opacity: [laser.opacity, laser.opacity * 1.5, laser.opacity],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
} 