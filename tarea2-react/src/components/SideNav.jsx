import { SECTIONS } from '../data'

export default function SideNav({ activeIndex }) {
  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="side-nav" aria-label="Navegación de secciones">
      {SECTIONS.map((s, i) => (
        <button
          key={s.id}
          className={i === activeIndex ? 'active' : ''}
          onClick={() => go(s.id)}
          aria-label={s.label}
        >
          <span className="dot" />
          <span className="tip">{s.label}</span>
        </button>
      ))}
    </nav>
  )
}
