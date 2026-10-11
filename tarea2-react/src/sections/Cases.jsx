import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Section, Heading, Reveal } from '../components/ui'

const CASOS = [
  {
    year: 'Europa / Reino Unido',
    nm: 'Clearview AI',
    pasa:
      'Extrajo miles de millones de fotos públicas de internet para construir una base de reconocimiento facial vendida a terceros, sin consentimiento de las personas.',
    falla:
      'Recolección masiva sin base legal ni finalidad clara. Biometría tratada sin control y sin mecanismo para que el titular suprima sus datos.',
    evitar:
      'No hacer scraping de datos personales. No reutilizar imágenes capturadas en tiendas para entrenar otros modelos. Documentar la finalidad de cada dato.',
  },
  {
    year: 'EE. UU. · 2017',
    nm: 'Equifax',
    pasa:
      'Una brecha expuso datos personales de unos 147 millones de personas, incluidos números de Seguro Social, en EE. UU.',
    falla:
      'Una vulnerabilidad conocida en el framework Apache Struts no fue parchada a tiempo. Había datos sin cifrar y poca segmentación de sistemas, y el gobierno de seguridad era débil.',
    evitar:
      'Gestión de parches con SLA. Cifrado en reposo y en tránsito. Segmentación de redes. Monitoreo de accesos y pruebas periódicas.',
  },
  {
    year: 'Perú · Indecopi 2020',
    nm: 'Saga Falabella / Banco Falabella',
    pasa:
      'Indecopi sancionó a Banco Falabella Perú con 45 UIT por enviar comunicaciones comerciales sin haber recabado antes el consentimiento de los consumidores.',
    falla:
      'Datos usados para marketing sin un registro de consentimiento separado de otras autorizaciones. El documento del caso lo menciona junto a la ANPD; el registro público que encontramos es de Indecopi.',
    evitar:
      'Usar datos para publicidad solo con consentimiento registrado. Separar las autorizaciones por finalidad y respetar la revocación.',
  },
]

export default function Cases() {
  const [i, setI] = useState(0)
  const c = CASOS[i]

  return (
    <Section id="casos">
      <Heading
        kicker="04 · Fase 1 · Análisis de vulnerabilidades"
        title="Dos casos, fallas que debemos evitar"
        sub="El caso pide analizar dos casos. Elegimos Equifax y Saga Falabella, y añadimos Clearview AI como referencia."
      />

      <Reveal className="case-tabs">
        {CASOS.map((x, idx) => (
          <button key={x.nm} className={`case-tab ${idx === i ? 'on' : ''}`} onClick={() => setI(idx)}>
            <div className="yr">{x.year}</div>
            <div className="nm">{x.nm}</div>
          </button>
        ))}
      </Reveal>

      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          className="case-body"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
        >
          <div className="case-col">
            <h4>Qué pasó</h4>
            <p>{c.pasa}</p>
          </div>
          <div className="case-col">
            <h4>Falla técnica o de gobierno</h4>
            <p>{c.falla}</p>
          </div>
          <div className="case-col" style={{ borderColor: 'rgba(163,230,53,0.35)' }}>
            <h4 style={{ color: 'var(--lime)' }}>Qué evitar en nuestro proyecto</h4>
            <p>{c.evitar}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  )
}
