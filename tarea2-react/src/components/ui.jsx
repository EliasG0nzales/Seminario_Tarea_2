import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1]

export function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="section-inner">{children}</div>
    </section>
  )
}

export function Heading({ kicker, title, sub }) {
  return (
    <motion.div
      className="heading"
      style={{ marginBottom: 36 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {kicker && <span className="kicker">{kicker}</span>}
      <h2>{title}</h2>
      {sub && <p className="sub">{sub}</p>}
    </motion.div>
  )
}

export function Reveal({ children, delay = 0, className = '', style }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
