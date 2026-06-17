import { useEffect, useState } from 'react'
import { getEventos } from '../../api'
import PublicLayout from '../../layouts/PublicLayout'
import PitbullSilhouette from '../../components/PitbullSilhouette'

const TIPO_CONFIG = {
  exposicion:  { color: '#C4956A', label: 'EXPOSICIÓN',   icon: '🏆' },
  competencia: { color: '#CC1100', label: 'COMPETENCIA',  icon: '⚔️' },
  seminario:   { color: '#4a7aaa', label: 'SEMINARIO',    icon: '📚' },
  reunion:     { color: '#6aaa4a', label: 'REUNIÓN',      icon: '🤝' },
  capacitacion:{ color: '#aa7a4a', label: 'CAPACITACIÓN', icon: '🎓' },
  otro:        { color: '#777777', label: 'EVENTO',       icon: '📅' },
}

const TIPOS_FILTRO = [
  { value: '', label: 'TODOS LOS EVENTOS' },
  { value: 'exposicion', label: 'EXPOSICIONES' },
  { value: 'competencia', label: 'COMPETENCIAS' },
  { value: 'seminario', label: 'SEMINARIOS' },
  { value: 'reunion', label: 'REUNIONES' },
  { value: 'capacitacion', label: 'CAPACITACIONES' },
]

function formatDate(d) {
  if (!d) return ''
  const date = new Date(d + 'T00:00:00')
  return date.toLocaleDateString('es-PY', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

function formatDateShort(d) {
  if (!d) return ''
  const date = new Date(d + 'T00:00:00')
  return {
    dia: date.getDate(),
    mes: date.toLocaleDateString('es-PY', { month: 'short' }).toUpperCase(),
    año: date.getFullYear(),
  }
}

function isPast(d) {
  if (!d) return false
  return new Date(d + 'T23:59:59') < new Date()
}

export default function Eventos() {
  const [eventos, setEventos] = useState([])
  const [loading, setLoading] = useState(true)
  const [tipoFiltro, setTipoFiltro] = useState('')

  useEffect(() => {
    setLoading(true)
    const params = { ordering: 'fecha' }
    if (tipoFiltro) params.tipo = tipoFiltro
    getEventos(params)
      .then(r => {
        const data = r.data?.results ?? r.data
        setEventos(Array.isArray(data) ? data : [])
      })
      .catch(() => setEventos([]))
      .finally(() => setLoading(false))
  }, [tipoFiltro])

  const proximos = eventos.filter(e => !isPast(e.fecha))
  const pasados = eventos.filter(e => isPast(e.fecha))

  return (
    <PublicLayout>

      {/* ══════ HEADER ══════ */}
      <div style={styles.header}>
        <div style={styles.headerGlow} />
        <div style={styles.headerInner}>
          <div style={styles.badge}>AGENDA DEL CLUB</div>
          <h1 style={styles.headerTitle}>EVENTOS Y <span style={styles.accent}>ACTIVIDADES</span></h1>
          <p style={styles.headerSub}>
            Exposiciones, competencias, seminarios y más. Conocé todo lo que organiza el Pit Bull Club Paraguay.
          </p>
        </div>
        <div style={{ position: 'absolute', right: 0, bottom: 0, pointerEvents: 'none' }}>
          <PitbullSilhouette size={260} opacity={0.05} />
        </div>
      </div>

      <div style={styles.container}>

        {/* ══════ FILTROS TIPO ══════ */}
        <div style={styles.tipoFiltros}>
          {TIPOS_FILTRO.map(t => (
            <button
              key={t.value}
              onClick={() => setTipoFiltro(t.value)}
              style={{
                ...styles.tipoBtn,
                background: tipoFiltro === t.value ? '#C4956A' : 'transparent',
                color: tipoFiltro === t.value ? '#060606' : '#666',
                border: tipoFiltro === t.value ? '1px solid #C4956A' : '1px solid #1e1e1e',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={styles.loading}>
            <PitbullSilhouette size={80} opacity={0.1} />
            <span style={{ color: '#444', fontSize: 12, letterSpacing: 2 }}>CARGANDO EVENTOS...</span>
          </div>
        ) : eventos.length === 0 ? (
          <div style={styles.empty}>
            <div style={{ fontSize: 60 }}>📅</div>
            <h3 style={{ color: '#444', fontWeight: 700, letterSpacing: 2 }}>NO HAY EVENTOS PROGRAMADOS</h3>
            <p style={{ color: '#333', fontSize: 13 }}>Próximamente se anunciarán nuevos eventos. ¡Mantenete atento!</p>
          </div>
        ) : (
          <>
            {/* Próximos eventos */}
            {proximos.length > 0 && (
              <div style={styles.eventosSection}>
                <div style={styles.sectionHeader}>
                  <div style={styles.sectionLine} />
                  <h2 style={styles.sectionTitle}>PRÓXIMOS EVENTOS</h2>
                </div>
                <div style={styles.eventosGrid}>
                  {proximos.map(e => <EventoCard key={e.id} evento={e} />)}
                </div>
              </div>
            )}

            {/* Eventos pasados */}
            {pasados.length > 0 && (
              <div style={styles.eventosSection}>
                <div style={styles.sectionHeader}>
                  <div style={{ ...styles.sectionLine, background: '#333' }} />
                  <h2 style={{ ...styles.sectionTitle, color: '#444' }}>EVENTOS ANTERIORES</h2>
                </div>
                <div style={styles.eventosGrid}>
                  {pasados.reverse().map(e => <EventoCard key={e.id} evento={e} past />)}
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </PublicLayout>
  )
}

function EventoCard({ evento, past }) {
  const cfg = TIPO_CONFIG[evento.tipo] || TIPO_CONFIG.otro
  const fecha = formatDateShort(evento.fecha)

  return (
    <div style={{
      ...styles.eventCard,
      opacity: past ? 0.65 : 1,
      borderLeft: `3px solid ${past ? '#333' : cfg.color}`,
    }}>
      {/* fecha bloque */}
      <div style={{ ...styles.fechaBloque, background: past ? '#111' : cfg.color + '18', borderRight: `1px solid ${past ? '#222' : cfg.color + '33'}` }}>
        <div style={{ ...styles.fechaDia, color: past ? '#444' : cfg.color }}>{fecha.dia}</div>
        <div style={{ ...styles.fechaMes, color: past ? '#333' : cfg.color + 'bb' }}>{fecha.mes}</div>
        <div style={styles.fechaAño}>{fecha.año}</div>
      </div>

      {/* info */}
      <div style={styles.eventInfo}>
        <div style={styles.eventHeader}>
          <span style={{ ...styles.eventTipo, color: past ? '#444' : cfg.color }}>
            {cfg.icon} {cfg.label}
          </span>
          {past && <span style={styles.pastBadge}>FINALIZADO</span>}
          {!past && evento.inscripcion_abierta && (
            <span style={styles.inscBadge}>INSCRIPCIÓN ABIERTA</span>
          )}
        </div>
        <h3 style={styles.eventTitulo}>{evento.titulo}</h3>
        <div style={styles.eventMeta}>
          {evento.hora && <span>🕐 {evento.hora.slice(0, 5)} hs</span>}
          <span>📍 {evento.lugar}{evento.ciudad ? `, ${evento.ciudad}` : ''}</span>
          {evento.organizador && <span>👤 {evento.organizador}</span>}
        </div>
        {evento.descripcion && (
          <p style={styles.eventDesc}>{evento.descripcion}</p>
        )}
        {!past && evento.cupo && (
          <div style={styles.cupoInfo}>Cupo: {evento.cupo} inscriptos</div>
        )}
      </div>
    </div>
  )
}

const styles = {
  header: {
    background: 'linear-gradient(135deg, #060606 0%, #080a06 100%)',
    borderBottom: '1px solid #1a1a1a',
    padding: '100px 48px 52px',
    position: 'relative',
    overflow: 'hidden',
  },
  headerGlow: {
    position: 'absolute', top: '30%', left: '20%',
    width: 400, height: 300,
    background: 'radial-gradient(ellipse, rgba(196,149,106,0.07) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  headerInner: { position: 'relative', zIndex: 2, maxWidth: 700 },
  badge: {
    display: 'inline-block',
    background: 'rgba(196,149,106,0.1)',
    border: '1px solid rgba(196,149,106,0.3)',
    color: '#C4956A',
    fontSize: 9, fontWeight: 700, letterSpacing: 4,
    padding: '5px 14px', borderRadius: 2, marginBottom: 18,
  },
  headerTitle: {
    fontSize: 'clamp(32px, 5vw, 56px)',
    fontWeight: 900, letterSpacing: 4, color: '#f0f0f0',
    margin: '0 0 12px',
  },
  accent: { color: '#C4956A' },
  headerSub: { color: '#555', fontSize: 13, lineHeight: 1.7 },

  container: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '36px 32px',
  },

  tipoFiltros: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 36,
  },
  tipoBtn: {
    padding: '7px 16px',
    fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
    borderRadius: 2, cursor: 'pointer', transition: 'all 0.15s',
  },

  loading: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: 20, padding: '80px 0',
  },
  empty: {
    textAlign: 'center', padding: '80px 0',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
  },

  eventosSection: { marginBottom: 48 },
  sectionHeader: {
    display: 'flex', alignItems: 'center', gap: 14,
    marginBottom: 20,
  },
  sectionLine: {
    height: 2, width: 30, background: '#C4956A',
  },
  sectionTitle: {
    color: '#f0f0f0', fontSize: 14,
    fontWeight: 900, letterSpacing: 4, margin: 0,
  },
  eventosGrid: {
    display: 'flex', flexDirection: 'column', gap: 10,
  },

  eventCard: {
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderRadius: 3,
    display: 'flex',
    overflow: 'hidden',
    transition: 'border-color 0.15s',
  },
  fechaBloque: {
    minWidth: 72, width: 72,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    padding: '16px 8px',
    flexShrink: 0,
  },
  fechaDia: {
    fontSize: 32, fontWeight: 900, lineHeight: 1,
  },
  fechaMes: {
    fontSize: 11, fontWeight: 700, letterSpacing: 1,
    marginTop: 2,
  },
  fechaAño: {
    color: '#333', fontSize: 9, letterSpacing: 1,
    marginTop: 2,
  },
  eventInfo: {
    padding: '16px 20px',
    flex: 1,
  },
  eventHeader: {
    display: 'flex', alignItems: 'center', gap: 10,
    marginBottom: 8,
  },
  eventTipo: {
    fontSize: 10, fontWeight: 700, letterSpacing: 2,
  },
  inscBadge: {
    background: 'rgba(106,170,74,0.1)',
    border: '1px solid rgba(106,170,74,0.3)',
    color: '#6aaa4a',
    fontSize: 8, fontWeight: 700, letterSpacing: 2,
    padding: '2px 8px', borderRadius: 2,
  },
  pastBadge: {
    background: 'rgba(80,80,80,0.15)',
    border: '1px solid #333',
    color: '#444',
    fontSize: 8, fontWeight: 700, letterSpacing: 2,
    padding: '2px 8px', borderRadius: 2,
  },
  eventTitulo: {
    color: '#f0f0f0', fontSize: 16,
    fontWeight: 800, margin: '0 0 10px',
  },
  eventMeta: {
    display: 'flex', gap: 18,
    color: '#555', fontSize: 12,
    flexWrap: 'wrap', marginBottom: 8,
  },
  eventDesc: {
    color: '#555', fontSize: 12,
    lineHeight: 1.6, margin: '8px 0 0',
  },
  cupoInfo: {
    color: '#C4956A', fontSize: 11,
    fontWeight: 700, letterSpacing: 1,
    marginTop: 8,
  },
}
