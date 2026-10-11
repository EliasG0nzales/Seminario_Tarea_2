import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Section, Heading, Reveal } from '../components/ui'

const LEVELS = ['Todos', 'Básico', 'Medio', 'Alto']

const ROWS = [
  {
    tipo: 'Identificativos',
    ej: 'Nombre, DNI, correo, teléfono, ID de cliente',
    nivel: 'Básico',
    cls: 'ok',
    medida: 'Control de acceso con usuario, contraseña o tokens; copias de respaldo y gestión de soportes.',
  },
  {
    tipo: 'Hábitos de consumo',
    ej: 'Historial de compras, navegación, preferencias',
    nivel: 'Medio',
    cls: 'mid',
    medida:
      'Base del perfilamiento publicitario: seudonimizar antes de entrenar y limitar el uso a la finalidad declarada.',
  },
  {
    tipo: 'Transaccionales',
    ej: 'Montos, fechas, medios de pago, productos comprados',
    nivel: 'Medio',
    cls: 'mid',
    medida: 'Almacenar en bóveda separada, cifrada en reposo, con registro de accesos.',
  },
  {
    tipo: 'Solvencia y crédito',
    ej: 'Score interno, deudas, ingresos declarados',
    nivel: 'Alto',
    cls: 'high',
    medida:
      'Los ingresos económicos figuran como dato sensible en la definición legal. La solvencia regulada por ley puede quedar fuera del ámbito (Art. 3, inc. 3), pero los datos propios sí aplican.',
  },
  {
    tipo: 'Biométricos',
    ej: 'Plantillas faciales de reconocimiento en tiendas',
    nivel: 'Alto',
    cls: 'high',
    medida:
      'Dato sensible por definición. Aislarlo, retención mínima, sin reutilización para otros modelos y consentimiento específico.',
  },
]

export default function Classification() {
  const [filter, setFilter] = useState('Todos')
  const [open, setOpen] = useState(4)

  const visible = ROWS.map((r, i) => ({ ...r, i })).filter((r) => filter === 'Todos' || r.nivel === filter)
  const current = ROWS[open]

  return (
    <Section id="clasificacion">
      <Heading
        kicker="02 · Fase 1 · Diagnóstico normativo"
        title="Clasificación de bancos de datos"
        sub="Haz clic en cada tipo de dato para ver su nivel de seguridad y la medida técnica que exige."
      />

      <Reveal>
        <div className="pill-group">
          {LEVELS.map((l) => (
            <button key={l} className={`pill ${filter === l ? 'on' : ''}`} onClick={() => setFilter(l)}>
              {l === 'Todos' ? 'Todos los niveles' : `Nivel ${l.toLowerCase()}`}
            </button>
          ))}
        </div>

        <div className="class-table">
          <AnimatePresence initial={false}>
            {visible.map((r) => (
              <motion.button
                layout
                key={r.tipo}
                className={`class-row ${open === r.i ? 'on' : ''}`}
                onClick={() => setOpen(r.i)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="tipo">{r.tipo}</div>
                <div className="ej">{r.ej}</div>
                <div>
                  <span className={`badge ${r.cls}`}>{r.nivel}</span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={open}
            className="class-detail"
            style={{ marginTop: 18 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <strong>
              {current.tipo} → Nivel {current.nivel}
            </strong>
            <p style={{ marginTop: 6 }}>{current.medida}</p>
          </motion.div>
        </AnimatePresence>
      </Reveal>

      <p className="note">
        Clasificación propuesta por el equipo. El documento usa los niveles Básico, Medio y Alto; antes
        de entregar, verifica el nombre exacto de cada nivel en el reglamento vigente (DS 016-2024-JUS).
      </p>
    </Section>
  )
}
