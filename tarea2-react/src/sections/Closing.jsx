import { Section, Heading, Reveal } from '../components/ui'

const TAKE = [
  { n: '01', t: 'Privacidad desde el diseño', d: 'Validar el consentimiento en la ingesta, antes de guardar cualquier dato.' },
  { n: '02', t: 'Consentimiento por finalidad', d: 'Separar operativo y marketing. Sin acción afirmativa no hay consentimiento.' },
  { n: '03', t: 'Segregar y seudonimizar', d: 'Tres bóvedas y seudónimos antes de entrenar. La biometría se aísla.' },
  { n: '04', t: 'ARCO automatizado', d: 'Supresión que no rompe el pipeline y retrain que excluye al titular.' },
  { n: '05', t: 'Transferencias con garantías', d: 'Nivel adecuado o cláusulas contractuales, y cifrado con claves propias.' },
]

const REFS = [
  ['Ley N.° 29733 (texto oficial, OEA)', 'https://www.oas.org/es/sla/ddi/docs/P6%20Ley%2029733%20de%20protecci%C3%B3n%20de%20datos%20personales.pdf'],
  ['Ley 29733 con el Art. 15 (flujo transfronterizo, modificado por DL 1353)', 'https://vlex.com.pe/vid/ley-n-29733-ley-578578822'],
  ['Nuevo reglamento DS 016-2024-JUS (IAPP)', 'https://iapp.org/news/a/se-publica-el-nuevo-reglamento-de-protecci-n-de-datos-personales-en-per-'],
  ['Derechos ARCO y plazos (Libro de Reclamaciones Virtual)', 'https://www.librovirtual.pe/derechos-arco'],
  ['Sanción al BCP por datos biométricos (Infobae, 2025)', 'https://www.infobae.com/peru/2025/01/06/bcp-es-sancionado-con-casi-s-300000-por-recolectar-y-almacenar-datos-biometricos-faciales-de-usuarios-sin-permiso/'],
  ['Indecopi: sanción a Banco Falabella (45 UIT, 2020)', 'https://static.legis.pe/wp-content/uploads/2020/01/Indecopi-Saga-Falabella-LP.pdf'],
]

export default function Closing() {
  return (
    <Section id="cierre">
      <Heading kicker="08 · Cierre" title="Cinco ideas para llevarse" />

      <div className="takeaways">
        {TAKE.map((t, i) => (
          <Reveal key={t.n} delay={i * 0.08}>
            <div className="card" style={{ height: '100%' }}>
              <div className="n grad-text">{t.n}</div>
              <h3 style={{ marginTop: 8 }}>{t.t}</h3>
              <p style={{ fontSize: 14 }}>{t.d}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="refs">
        <strong style={{ color: 'var(--text)' }}>Fuentes consultadas</strong>
        {REFS.map(([label, url]) => (
          <div key={url}>
            {label}:{' '}
            <a href={url} target="_blank" rel="noreferrer">
              {url}
            </a>
          </div>
        ))}
      </Reveal>

      <p className="note" style={{ marginTop: 22 }}>
        Preguntas del comité. Gracias.
      </p>
    </Section>
  )
}
