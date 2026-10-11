import { useEffect, useState } from 'react'
import { motion, useScroll } from 'motion/react'
import { SECTIONS } from './data'
import SideNav from './components/SideNav'
import PresenterTimer from './components/PresenterTimer'
import CursorGlow from './components/CursorGlow'
import Hero from './sections/Hero'
import Context from './sections/Context'
import Classification from './sections/Classification'
import Consent from './sections/Consent'
import Cases from './sections/Cases'
import Architecture from './sections/Architecture'
import ArcoFlow from './sections/ArcoFlow'
import Questions from './sections/Questions'
import Closing from './sections/Closing'

const COMPONENTS = {
  inicio: Hero,
  contexto: Context,
  clasificacion: Classification,
  consentimiento: Consent,
  casos: Cases,
  arquitectura: Architecture,
  arco: ArcoFlow,
  preguntas: Questions,
  cierre: Closing,
}

export default function App() {
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll()

  // Detecta qué sección está visible
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = SECTIONS.findIndex((s) => s.id === entry.target.id)
            if (idx !== -1) setActive(idx)
          }
        })
      },
      { threshold: 0.55 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Navegación con teclado: flechas, PageUp/PageDown y espacio
  useEffect(() => {
    const onKey = (e) => {
      const next = ['ArrowDown', 'ArrowRight', 'PageDown', ' ']
      const prev = ['ArrowUp', 'ArrowLeft', 'PageUp']
      let target = null
      if (next.includes(e.key)) target = Math.min(active + 1, SECTIONS.length - 1)
      if (prev.includes(e.key)) target = Math.max(active - 1, 0)
      if (target === null || target === active) return
      e.preventDefault()
      document.getElementById(SECTIONS[target].id)?.scrollIntoView({ behavior: 'smooth' })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  return (
    <>
      <div className="bg-grid" />
      <CursorGlow />
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
      <SideNav activeIndex={active} />

      <main>
        {SECTIONS.map((s) => {
          const Comp = COMPONENTS[s.id]
          return <Comp key={s.id} />
        })}
      </main>

      <PresenterTimer activeIndex={active} />
    </>
  )
}
