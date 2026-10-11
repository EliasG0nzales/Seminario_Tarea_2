import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { Section, Heading, Reveal } from '../components/ui'

const PREGUNTAS = [
  {
    tag: 'Pregunta 1 · Oposición y perfilamiento',
    q: '¿Qué ajustes inmediatos debe aplicar el pipeline de inferencia si un cliente se opone al scoring automatizado?',
    answer:
      'Excluir al titular del scoring en el momento de la solicitud, no en el próximo batch. La API de inferencia consulta la bandera de oposición antes de puntuar. Si la oposición procede, el caso pasa a revisión humana o a un modelo sin perfilamiento.',
    acts: [
      'Bandera de exclusión en el servicio de consentimiento y en el feature store, consultada antes de inferir',
      'Ruta de decisión humana o modelo alternativo que solo use los datos necesarios para el servicio',
      'Log de la decisión con fecha y responsable, dentro del plazo de 10 días hábiles',
    ],
    legal:
      'Oposición: requiere motivo legítimo y fundado, y no procede si existe base legal (por ejemplo, un contrato). El derecho a no ser objeto de decisiones basadas solo en tratamiento automatizado está en el reglamento vigente (DS 016-2024-JUS).',
  },
  {
    tag: 'Pregunta 2 · Entrenamiento con datos biométricos',
    q: '¿Es legal usar imágenes de reconocimiento facial de tiendas para entrenar un modelo general de comportamiento de compra?',
    answer:
      'No, sin un consentimiento específico para esa finalidad. Los datos biométricos son sensibles, y las imágenes se capturaron para control de acceso. Usarlas para analizar compras cambia la finalidad, y eso viola el principio de finalidad.',
    acts: [
      'No usar biometría para el modelo. Entrenar con datos transaccionales seudonimizados',
      'Si ya hay imágenes almacenadas, eliminarlas o bloquearlas, y revisar la base de consentimiento',
      'Retención mínima de la biometría y acceso restringido a la Bóveda C',
    ],
    legal:
      'Art. 2 (definición de dato sensible), Art. 6 (finalidad), Art. 7 (proporcionalidad) y Art. 13.5-13.6 (consentimiento; en sensibles, por escrito). Caso real: el BCP fue multado en 2025 con S/ 124,200 por recopilación excesiva de biometría facial y S/ 165,600 por almacenarla sin consentimiento válido.',
  },
  {
    tag: 'Pregunta 3 · Transferencia y nube',
    q: '¿Qué condiciones exige el flujo transfronterizo si los modelos se alojan en AWS o Azure en EE. UU. o Europa?',
    answer:
      'La transferencia solo es válida si el país destino tiene un nivel adecuado de protección. Si no lo tiene, el emisor debe garantizar que el tratamiento cumpla la ley peruana, mediante cláusulas contractuales modelo u otro instrumento equivalente.',
    acts: [
      'Enviar solo datos seudonimizados o anonimizados a la nube extranjera',
      'Cifrado en tránsito (TLS 1.2+) y en reposo (AES-256), con claves gestionadas por la empresa (KMS/HSM propio o BYOK)',
      'Contrato de encargo con confidencialidad y destrucción de datos al finalizar',
    ],
    legal:
      'Art. 15 de la Ley 29733 (modificado por DL 1353) y arts. 18-20 del reglamento vigente: nivel adecuado, acuerdos o cláusulas contractuales modelo. La ley también aplica a responsables fuera del Perú que ofrecen servicios a personas en el país.',
  },
]

export default function Questions() {
  const [open, setOpen] = useState(0)

  return (
    <Section id="preguntas">
      <Heading
        kicker="07 · Fase 3 · Cuestionario técnico"
        title="Respuestas a las preguntas del comité"
        sub="Cada respuesta tiene una conclusión, acciones técnicas y su fundamento legal. Haz clic para desplegar."
      />

      <div className="grid" style={{ gap: 14 }}>
        {PREGUNTAS.map((p, i) => {
          const isOpen = open === i
          return (
            <Reveal key={p.tag} delay={i * 0.08}>
              <div className={`qa ${isOpen ? 'open' : ''}`}>
                <button className="qa-head" onClick={() => setOpen(isOpen ? -1 : i)}>
                  <div>
                    <span className="tag">{p.tag}</span>
                    <span className="q">{p.q}</span>
                  </div>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={22} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="qa-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="answer">{p.answer}</p>
                      <ul>
                        {p.acts.map((a) => (
                          <li key={a}>{a}</li>
                        ))}
                      </ul>
                      <div className="legal">{p.legal}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
