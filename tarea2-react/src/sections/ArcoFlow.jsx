import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Play, Pause, RefreshCw, Layers, Shuffle, Trash2, GitBranch } from 'lucide-react'
import { Section, Heading, Reveal } from '../components/ui'

const PASOS = [
  {
    st: 'Solicitud en el portal',
    sd: 'El titular elige ARCO, oposición o no ser objeto de decisiones automatizadas. El plazo empieza al día hábil siguiente.',
  },
  {
    st: 'Verificación de identidad',
    sd: 'Usuario con segundo factor. No exigimos biometría para verificar, en línea con la ANPD sobre medidas menos intrusivas.',
  },
  {
    st: 'Registro y plazo',
    sd: 'Se crea un ticket con SLA: 10 días hábiles para oposición, rectificación y cancelación. Ampliable una vez por igual plazo.',
  },
  {
    st: 'Supresión operativa',
    sd: 'Se borra o bloquea el registro en la Bóveda A y sus embeddings en el índice vectorial. Si hay obligación legal de conservar, se bloquea.',
  },
  {
    st: 'Pipeline sin rupturas',
    sd: 'Las tablas usan seudónimos. Al eliminar la tabla de correspondencia, el registro queda anonimizado y los joins del pipeline no fallan.',
  },
  {
    st: 'Retorno a los modelos',
    sd: 'El titular entra a la lista de exclusión. El siguiente retrain la excluye y se verifica el impacto en las métricas.',
  },
  {
    st: 'Evidencia y respuesta',
    sd: 'Log inmutable con fecha, acción y responsable. Se responde al titular dentro del plazo legal.',
  },
]

const ESTRATEGIAS = [
  {
    icon: RefreshCw,
    t: 'Exclusión en el próximo retrain',
    d: 'El dataset de entrenamiento se reconstruye sin los IDs eliminados. Es la opción por defecto y la más simple.',
  },
  {
    icon: Layers,
    t: 'Entrenamiento por shards (SISA)',
    d: 'El dataset se divide en fragmentos y cada uno produce un submodelo. Al eliminar un titular solo se reentrena su fragmento.',
  },
  {
    icon: Shuffle,
    t: 'Unlearning aproximado',
    d: 'Para modelos grandes sin tiempo de reentreno. Se ajusta el modelo y se mide si queda rastro del dato con pruebas de pertenencia.',
  },
  {
    icon: Trash2,
    t: 'Desvinculación de vectores',
    d: 'Se borran los embeddings del titular del índice y se reconstruye solo esa partición, sin reentrenar el modelo completo.',
  },
]

export default function ArcoFlow() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setStep((s) => (s + 1) % PASOS.length), 2400)
    return () => clearInterval(id)
  }, [playing])

  return (
    <Section id="arco">
      <Heading
        kicker="06 · Fase 2 · Flujo de derechos ARCO"
        title="Cancelar datos sin romper el pipeline"
        sub="Cuando un usuario pide supresión, el sistema borra la PII, mantiene la integridad de los datos y actualiza los modelos."
      />

      <div className="grid grid-2" style={{ alignItems: 'start' }}>
        <Reveal>
          <div className="pill-group">
            <button className="pill on" onClick={() => setPlaying((p) => !p)}>
              {playing ? <Pause size={14} style={{ verticalAlign: '-2px' }} /> : <Play size={14} style={{ verticalAlign: '-2px' }} />}{' '}
              {playing ? 'Pausar' : 'Reproducir'} flujo
            </button>
          </div>
          <div className="timeline">
            {PASOS.map((p, i) => (
              <motion.button
                key={p.st}
                className={`step ${i === step ? 'on' : ''}`}
                onMouseEnter={() => {
                  setPlaying(false)
                  setStep(i)
                }}
                onClick={() => {
                  setPlaying(false)
                  setStep(i)
                }}
              >
                <div className="num">{i + 1}</div>
                <div>
                  <div className="st">{p.st}</div>
                  {i === step && (
                    <motion.div
                      className="sd"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      {p.sd}
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 style={{ fontSize: 22, marginBottom: 6 }}>
            <GitBranch size={20} style={{ verticalAlign: '-3px', marginRight: 8, color: 'var(--cyan)' }} />
            ¿Cómo afecta a los modelos ya entrenados?
          </h3>
          <p style={{ marginBottom: 16 }}>
            Un dato eliminado puede seguir dentro de un modelo ya entrenado. La estrategia combina
            cuatro opciones según el costo de reentrenar.
          </p>
          <div className="grid" style={{ gap: 12 }}>
            {ESTRATEGIAS.map((e) => {
              const Icon = e.icon
              return (
                <div className="card" key={e.t} style={{ padding: 18, display: 'flex', gap: 14 }}>
                  <div className="icon" style={{ marginBottom: 0, flexShrink: 0, width: 38, height: 38 }}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 16, marginBottom: 4 }}>{e.t}</h3>
                    <p style={{ fontSize: 14 }}>{e.d}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
