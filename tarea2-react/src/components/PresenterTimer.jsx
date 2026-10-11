import { useEffect, useMemo, useState } from 'react'
import { Pause, Play, RotateCcw, Timer, ChevronDown, ChevronUp } from 'lucide-react'
import { SECTIONS, TOTAL_SECONDS } from '../data'

const fmt = (sec) => {
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

// Límites acumulados (en segundos) de cada sección
const BOUNDS = SECTIONS.reduce((acc, s, i) => {
  const prev = i === 0 ? 0 : acc[i - 1]
  acc.push(prev + s.minutes * 60)
  return acc
}, [])

export default function PresenterTimer({ activeIndex }) {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setElapsed((e) => Math.min(e + 1, TOTAL_SECONDS))
    }, 1000)
    return () => clearInterval(id)
  }, [running])

  useEffect(() => {
    if (elapsed >= TOTAL_SECONDS) setRunning(false)
  }, [elapsed])

  const suggested = useMemo(() => {
    const idx = BOUNDS.findIndex((b) => elapsed < b)
    return idx === -1 ? SECTIONS.length - 1 : idx
  }, [elapsed])

  const remaining = TOTAL_SECONDS - elapsed
  const diff = activeIndex - suggested

  let status = { cls: 'ok', text: 'Pulsa Iniciar para cronometrar' }
  if (elapsed > 0 && diff === 0) status = { cls: 'ok', text: 'Vas a tiempo' }
  if (elapsed > 0 && diff > 0) status = { cls: 'ahead', text: 'Vas adelantado: pausa o profundiza' }
  if (elapsed > 0 && diff < 0) status = { cls: 'behind', text: 'Vas atrasado: acorta la sección' }

  if (!open) {
    return (
      <button className="mini" onClick={() => setOpen(true)} aria-label="Abrir temporizador">
        <Timer size={16} /> {fmt(remaining)} <ChevronUp size={14} />
      </button>
    )
  }

  return (
    <div className="timer">
      <div className="top">
        <span>Modo presentador · máx. 14:30</span>
        <button onClick={() => setOpen(false)} aria-label="Minimizar temporizador">
          <ChevronDown size={16} />
        </button>
      </div>
      <div className="clock">{fmt(remaining)}</div>
      <div className="meta">
        Sugerida ahora: <b>{SECTIONS[suggested].label}</b>
      </div>
      <div className="meta">
        Estás en: <b>{SECTIONS[activeIndex]?.label}</b>
      </div>
      <div className={`status ${status.cls}`}>{status.text}</div>
      <div className="ctrls">
        <button className="primary" onClick={() => setRunning((r) => !r)}>
          {running ? <Pause size={15} /> : <Play size={15} />}
          {running ? 'Pausar' : elapsed > 0 ? 'Seguir' : 'Iniciar'}
        </button>
        <button
          onClick={() => {
            setRunning(false)
            setElapsed(0)
          }}
        >
          <RotateCcw size={15} /> Reiniciar
        </button>
      </div>
    </div>
  )
}
