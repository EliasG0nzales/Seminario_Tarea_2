import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { Database, Brain, Smartphone, ShieldAlert, Scale } from 'lucide-react'
import { Section, Heading, Reveal } from '../components/ui'

function TiltCard({ icon: Icon, title, children, delay }) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 200, damping: 20 })
  const sry = useSpring(ry, { stiffness: 200, damping: 20 })
  const glare = useTransform(sry, [-12, 12], ['0%', '100%'])
  const glareBg = useTransform(glare, (g) => `radial-gradient(circle at ${g} 0%, rgba(34,211,238,0.14), transparent 60%)`)

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * 16)
    rx.set(-py * 16)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <Reveal delay={delay} className="tilt">
      <motion.div
        className="card"
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d', position: 'relative', overflow: 'hidden', height: '100%' }}
      >
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: glareBg,
            pointerEvents: 'none',
          }}
        />
        <div className="icon">
          <Icon size={22} />
        </div>
        <h3>{title}</h3>
        {children}
      </motion.div>
    </Reveal>
  )
}

export default function Context() {
  return (
    <Section id="contexto">
      <Heading
        kicker="01 · Contexto del caso"
        title="Una empresa Retail y Financiera con IA en todo el ciclo"
        sub="Tres componentes que procesan datos personales, incluidos datos sensibles y biométricos."
      />

      <div className="grid grid-3">
        <TiltCard icon={Database} title="1. Pipeline de ingesta" delay={0}>
          <ul>
            <li>Datos transaccionales y hábitos de consumo</li>
            <li>Biometría de acceso a tiendas (reconocimiento facial)</li>
            <li>Datos de solvencia económica, locales y en la nube</li>
          </ul>
        </TiltCard>
        <TiltCard icon={Brain} title="2. Modelos de IA" delay={0.1}>
          <ul>
            <li>Scoring de riesgo crediticio (ML supervisado)</li>
            <li>NLP para recomendación de productos</li>
            <li>Segmentación publicitaria del usuario</li>
          </ul>
        </TiltCard>
        <TiltCard icon={Smartphone} title="3. Portal / API de autoservicio" delay={0.2}>
          <ul>
            <li>El cliente consulta su estado de datos</li>
            <li>Envía solicitudes sobre el manejo de sus datos</li>
            <li>Canal para ejercer derechos ARCO</li>
          </ul>
        </TiltCard>
      </div>

      <Reveal className="alert">
        <ShieldAlert className="icon" size={26} />
        <div>
          <strong>Alerta de auditoría:</strong>
          <p style={{ marginTop: 6 }}>
            Brechas de seguridad, políticas de consentimiento publicitario poco claras y riesgo de
            multas de la ANPD por mal uso de datos sensibles y biométricos.{' '}
            <strong>Nuestro rol:</strong> rediseñar la solución técnica y normativa como Arquitectos
            de Datos e IA.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.15} className="card" style={{ marginTop: 18, display: 'flex', gap: 14, alignItems: 'center' }}>
        <Scale size={22} color="#c4b5fd" />
        <p style={{ fontSize: 15 }}>
          <strong>Marco normativo:</strong> Ley N.° 29733 · Reglamento vigente aprobado por
          DS N.° 016-2024-JUS (reemplaza al DS 003-2013-JUS) · DL 1353 (2017), que modificó el flujo
          transfronterizo.
        </p>
      </Reveal>
    </Section>
  )
}
