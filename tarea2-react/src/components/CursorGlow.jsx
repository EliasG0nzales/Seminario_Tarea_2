import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export default function CursorGlow() {
  const x = useMotionValue(-1000)
  const y = useMotionValue(-1000)
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.6 })

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  return <motion.div className="cursor-glow" style={{ x: sx, y: sy }} />
}
