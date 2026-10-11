import { useEffect } from 'react'
import { motion, animate, useMotionValue, useTransform } from 'motion/react'
import { ArrowDown, GraduationCap } from 'lucide-react'
import { Section } from '../components/ui'

function Counter({ to, prefix = '', suffix = '' }) {
  const mv = useMotionValue(0)
  const shown = useTransform(mv, (v) => `${prefix}${Math.round(v).toLocaleString('es-PE')}${suffix}`)

  useEffect(() => {
    const controls = animate(mv, to, { duration: 1.8, ease: 'easeOut', delay: 0.4 })
    return () => controls.stop()
  }, [mv, to])

  return <motion.span>{shown}</motion.span>
}

const TITLE = ['Ley', '29733', 'en', 'pipelines', 'de', 'IA']

export default function Hero() {
  return (
    <Section id="inicio" className="hero">
      <div className="orb" />

      <motion.div
        className="hero-tag"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <GraduationCap size={16} />
        Seminario de Complementación Práctica IV · Tarea 2 · Caso práctico
      </motion.div>

      <h1 className="hero-title">
        {TITLE.map((w, i) => (
          <span className="word" key={i}>
            <motion.span
              style={{ display: 'inline-block' }}
              className={i >= 3 ? 'grad-text' : ''}
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.p
        className="hero-sub"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        Evaluar, diseñar y proponer soluciones técnicas y normativas alineadas a la{' '}
        <strong>Ley N.° 29733</strong> dentro de una arquitectura de ingestión, entrenamiento y
        despliegue de modelos de Ciencia de Datos e IA, garantizando los <strong>derechos ARCO</strong>.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        <a
          className="btn"
          href="#contexto"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('contexto')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          Comenzar <ArrowDown size={18} />
        </a>
      </motion.div>

      <div className="stats">
        <div className="stat">
          <div className="num">
            <Counter to={3} />
          </div>
          <div className="lbl">Fases: diagnóstico, diseño y cuestionario</div>
        </div>
        <div className="stat">
          <div className="num">
            <Counter to={10} suffix=" días" />
          </div>
          <div className="lbl">hábiles para atender oposición, rectificación o cancelación</div>
        </div>
        <div className="stat">
          <div className="num">
            <Counter to={289800} prefix="S/ " />
          </div>
          <div className="lbl">multas al BCP en 2025 por datos biométricos (referencia real)</div>
        </div>
        <div className="stat">
          <div className="num">
            <Counter to={3} />
          </div>
          <div className="lbl">casos de estudio analizados en clase</div>
        </div>
      </div>
    </Section>
  )
}
