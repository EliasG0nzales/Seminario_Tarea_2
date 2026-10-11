import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check } from 'lucide-react'
import { Section, Heading, Reveal } from '../components/ui'

const REQUISITOS = [
  { t: 'Libre', d: 'No puede condicionar el servicio. Si el cliente no acepta marketing, igual puede comprar.' },
  { t: 'Previo', d: 'Se obtiene antes de recopilar o tratar el dato, no después.' },
  { t: 'Expreso e inequívoco', d: 'Requiere una acción afirmativa. Una casilla preseleccionada no cuenta.' },
  { t: 'Informado', d: 'Indica finalidad, destinatarios, plazo de conservación y cómo ejercer ARCO.' },
  { t: 'Por escrito (sensibles)', d: 'Para datos sensibles, como biometría o ingresos, el consentimiento debe constar por escrito.' },
]

const USOS = {
  operativo: {
    title: 'Uso operativo',
    text: 'Ejecutar el contrato o cumplir obligaciones legales (por ejemplo, validar una compra o emitir una factura). La base suele ser la relación contractual, no el marketing.',
    badge: 'info',
    label: 'Base contractual / legal',
  },
  prospeccion: {
    title: 'Prospección comercial',
    text: 'Ofertas, segmentación publicitaria y perfilamiento para campañas. Requiere consentimiento específico, separado y revocable. El contrato del servicio no lo cubre por sí solo.',
    badge: 'high',
    label: 'Requiere consentimiento específico',
  },
}

function MockConsent({ title, preChecked, good }) {
  const [checked, setChecked] = useState(preChecked)
  return (
    <div className="mock-form" style={{ borderColor: good ? 'rgba(163,230,53,0.35)' : 'rgba(244,63,94,0.35)' }}>
      <div className="field" />
      <div className="field" style={{ width: '70%' }} />
      <div className="mock-opt" style={{ marginTop: 16, color: '#eef0f7' }}>
        <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        <span>
          Acepto que mis datos se usen para <strong>publicidad personalizada</strong> de terceros.
        </span>
      </div>
      <div className={`verdict ${good ? 'good' : 'bad'}`}>
        {good
          ? checked
            ? '✔ Acción afirmativa del titular: consentimiento válido.'
            : '✔ Sin marcar: solo hay consentimiento si el titular la marca.'
          : '✖ Preseleccionada: no hay acción afirmativa, no es consentimiento expreso.'}
      </div>
      <p style={{ fontSize: 13, marginTop: 8 }}>{title}</p>
    </div>
  )
}

export default function Consent() {
  const [done, setDone] = useState([])
  const [uso, setUso] = useState('prospeccion')
  const pct = Math.round((done.length / REQUISITOS.length) * 100)

  const toggle = (i) =>
    setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]))

  return (
    <Section id="consentimiento">
      <Heading
        kicker="03 · Fase 1 · Consentimiento"
        title="Qué exige la ley para captar datos"
        sub="Ley 29733, art. 13.5: el consentimiento debe ser previo, informado, expreso e inequívoco."
      />

      <div className="grid grid-2" style={{ alignItems: 'start' }}>
        <Reveal>
          <p style={{ marginBottom: 12 }}>
            <strong>Checklist del flujo de captación.</strong> Marca cada requisito para validar el flujo.
          </p>
          <div className="progress-bar">
            <motion.div animate={{ width: `${pct}%` }} transition={{ duration: 0.5 }} />
          </div>
          <div style={{ fontSize: 13, marginBottom: 14 }}>{pct}% del flujo validado</div>

          <div className="checklist">
            {REQUISITOS.map((r, i) => {
              const on = done.includes(i)
              return (
                <button key={r.t} className={`check-item ${on ? 'on' : ''}`} onClick={() => toggle(i)}>
                  <span className="box">{on && <Check size={15} strokeWidth={3} />}</span>
                  <span className="txt">
                    <strong>{r.t}</strong>
                    <span>{r.d}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="pill-group">
            <button className={`pill ${uso === 'operativo' ? 'on' : ''}`} onClick={() => setUso('operativo')}>
              Uso operativo
            </button>
            <button className={`pill ${uso === 'prospeccion' ? 'on' : ''}`} onClick={() => setUso('prospeccion')}>
              Prospección comercial
            </button>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={uso}
              className="card"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3 }}
            >
              <span className={`badge ${USOS[uso].badge}`}>{USOS[uso].label}</span>
              <h3 style={{ marginTop: 12 }}>{USOS[uso].title}</h3>
              <p>{USOS[uso].text}</p>
            </motion.div>
          </AnimatePresence>

          <div className="grid grid-2" style={{ marginTop: 18 }}>
            <MockConsent title="Diseño incorrecto" preChecked good={false} />
            <MockConsent title="Diseño correcto" preChecked={false} good />
          </div>
        </Reveal>
      </div>

      <p className="note">
        Prueba las casillas: el diseño incorrecto no genera consentimiento válido aunque el usuario no lo
        desmarque.
      </p>
    </Section>
  )
}
