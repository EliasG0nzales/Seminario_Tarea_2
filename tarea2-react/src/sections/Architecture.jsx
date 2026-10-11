import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Database, EyeOff, Fingerprint, KeyRound, Lock, Server, Workflow } from 'lucide-react'
import { Section, Heading, Reveal } from '../components/ui'

const NODOS = [
  {
    n: '01',
    t: 'Ingesta + consentimiento',
    icon: Fingerprint,
    items: [
      'Puntos de captura: app, portal, tienda y libro de reclamaciones',
      'Servicio de consentimiento que guarda versión, finalidad y fecha',
      'Sin consentimiento vigente: el dato solo sirve para lo operativo, no para marketing',
    ],
  },
  {
    n: '02',
    t: 'Seudonimización',
    icon: EyeOff,
    items: [
      'Identificadores pasan por HMAC-SHA256 con clave en un KMS separado',
      'Tokenización para datos de contacto',
      'Biometría: convertir a plantilla no reversible o eliminarla tras verificar la identidad',
    ],
  },
  {
    n: '03',
    t: 'Bancos segregados',
    icon: Database,
    items: [
      'Bóveda A: identificativos (PII), acceso mínimo',
      'Bóveda B: transaccional seudonimizado',
      'Bóveda C: sensibles y biométricos, aislada, con retención corta',
    ],
  },
  {
    n: '04',
    t: 'Entrenamiento ML',
    icon: Workflow,
    items: [
      'Lee solo features seudonimizadas, sin join a la Bóveda A',
      'Feature store con linaje: qué dato alimentó qué versión del modelo',
      'Lista de exclusión de titulares que se opusieron',
    ],
  },
  {
    n: '05',
    t: 'Inferencia + Portal ARCO',
    icon: Server,
    items: [
      'La API de scoring consulta la bandera de oposición antes de puntuar',
      'Si hay oposición: revisión humana o un modelo sin perfilamiento',
      'Portal de autoservicio para ARCO, con registro de auditoría',
    ],
  },
]

const ENC = [
  {
    t: 'En tránsito',
    d: 'TLS 1.2 como mínimo, idealmente 1.3, entre todos los servicios. Certificados rotados.',
    icon: Lock,
  },
  {
    t: 'En reposo',
    d: 'AES-256 en bases de datos, buckets y backups. Una clave distinta por bóveda.',
    icon: KeyRound,
  },
  {
    t: 'Gestión de claves',
    d: 'KMS o HSM con rotación periódica. La clave de seudonimización se guarda aparte de los datos.',
    icon: Server,
  },
]

export default function Architecture() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)

  // Recorre los nodos de forma automática hasta que el usuario interactúe
  useEffect(() => {
    if (!auto) return
    const id = setInterval(() => setActive((a) => (a + 1) % NODOS.length), 2800)
    return () => clearInterval(id)
  }, [auto])

  const pick = (i) => {
    setAuto(false)
    setActive(i)
  }

  const N = NODOS[active]

  return (
    <Section id="arquitectura">
      <Heading
        kicker="05 · Fase 2 · Diseño de arquitectura"
        title="Pipeline de datos seguros, por capas"
        sub="Los datos fluyen de izquierda a derecha. Cada capa reduce el riesgo antes de llegar al modelo."
      />

      <Reveal>
        <div className="pipeline">
          {NODOS.map((nodo, i) => {
            const Icon = nodo.icon
            return (
              <button
                key={nodo.n}
                className={`node ${i === active ? 'on' : ''}`}
                onClick={() => pick(i)}
              >
                <div className="ic">
                  <Icon size={22} />
                </div>
                <div className="n">{nodo.n}</div>
                <div className="t">{nodo.t}</div>
              </button>
            )
          })}
        </div>

        <div className="flow-track">
          <motion.div
            className="flow-dot"
            style={{ x: '-50%' }}
            animate={{ left: `${(active / (NODOS.length - 1)) * 100}%` }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="node-detail"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <h3>
              {N.n} · {N.t}
            </h3>
            <ul>
              {N.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>

        <div className="enc-strip">
          {ENC.map((e) => {
            const Icon = e.icon
            return (
              <div className="card" key={e.t}>
                <div className="icon">
                  <Icon size={20} />
                </div>
                <h3 style={{ fontSize: 16 }}>Cifrado · {e.t}</h3>
                <p style={{ fontSize: 14 }}>{e.d}</p>
              </div>
            )
          })}
        </div>
      </Reveal>
    </Section>
  )
}
