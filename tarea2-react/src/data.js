// Secciones de la presentación con su tiempo asignado (total = 14.5 min, máximo 15)
export const SECTIONS = [
  { id: 'inicio', label: 'Inicio', minutes: 0.5 },
  { id: 'contexto', label: 'El caso', minutes: 1 },
  { id: 'clasificacion', label: 'Diagnóstico normativo', minutes: 2 },
  { id: 'consentimiento', label: 'Consentimiento', minutes: 1.5 },
  { id: 'casos', label: 'Vulnerabilidades', minutes: 2 },
  { id: 'arquitectura', label: 'Arquitectura segura', minutes: 2.5 },
  { id: 'arco', label: 'Derechos ARCO', minutes: 2 },
  { id: 'preguntas', label: 'Preguntas críticas', minutes: 2.5 },
  { id: 'cierre', label: 'Conclusiones', minutes: 0.5 },
]

export const TOTAL_SECONDS = SECTIONS.reduce((acc, s) => acc + s.minutes * 60, 0)
