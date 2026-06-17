import { useEffect, useState } from 'react'
import { getCampeonatos } from '../../api'
import PublicLayout from '../../layouts/PublicLayout'
import PitbullSilhouette from '../../components/PitbullSilhouette'

const PODIO_COLORS = ['#C4956A', '#aaaaaa', '#8B6240']
const PODIO_LABELS = ['1°', '2°', '3°']

export default function Campeonatos() {
  const [campeonatos, setCampeonatos] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCampeonatos()
      .then(r => {
        const data = r.data?.results ?? r.data
        const list = Array.isArray(data) ? data : []
        setCampeonatos(list)
        if (list.length > 0) setSelected(list[0])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const ranking = selected?.puntos || []
  const top3 = ranking.slice(0, 3)
  const resto = ranking.slice(3)

  return (
    <PublicLayout>

      {/* ══════ HEADER ══════ */}
      <div style={styles.header}>
        <div style={styles.headerGlow} />
        <div style={styles.headerInner}>
          <div style={styles.badge}>RANKING OFICIAL</div>
          <h1 style={styles.title}>CAMPEONATOS Y <span style={styles.accent}>CLASIFICACIONES</span></h1>
          <p style={styles.sub}>
            Seguimiento oficial de los mejores ejemplares del club en cada temporada.
          </p>
        </div>
        <div style={{ position: 'absolute', right: 20, bottom: 0, pointerEvents: 'none' }}>
          <PitbullSilhouette size={240} opacity={0.06} />
        </div>
      </div>

      <div style={styles.container}>

        {loading ? (
          <div style={styles.loading}>
            <PitbullSilhouette size={80} opacity={0.1} />
            <span style={{ color: '#444', letterSpacing: 2, fontSize: 12 }}>CARGANDO RANKINGS...</span>
          </div>
        ) : campeonatos.length === 0 ? (
          <div style={styles.empty}>
            <div style={{ fontSize: 60 }}>🏆</div>
            <h3 style={{ color: '#444', fontWeight: 700, letterSpacing: 2 }}>TEMPORADA AÚN NO INICIADA</h3>
            <p style={{ color: '#333', fontSize: 13, maxWidth: 400, textAlign: 'center' }}>
              El primer campeonato del Pit Bull Club Paraguay será anunciado próximamente.
              ¡Registrá tu ejemplar para participar!
            </p>
          </div>
        ) : (
          <div style={styles.mainGrid}>

            {/* Selector de temporada */}
            <aside style={styles.sidePanel}>
              <div style={styles.panelTitle}>TEMPORADAS</div>
              {campeonatos.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelected(c)}
                  style={{
                    ...styles.temporadaBtn,
                    background: selected?.id === c.id ? 'rgba(196,149,106,0.12)' : 'transparent',
                    borderLeft: selected?.id === c.id ? '2px solid #C4956A' : '2px solid transparent',
                    color: selected?.id === c.id ? '#C4956A' : '#666',
                  }}
                >
                  <div style={styles.temporadaNombre}>{c.nombre}</div>
                  <div style={styles.temporadaAño}>{c.año}</div>
                  {c.activo && <div style={styles.activeBadge}>ACTIVO</div>}
                </button>
              ))}
            </aside>

            {/* Ranking */}
            <div style={styles.rankingArea}>
              {selected && (
                <>
                  <div style={styles.rankingHeader}>
                    <div>
                      <h2 style={styles.rankingTitle}>{selected.nombre}</h2>
                      <div style={styles.rankingMeta}>
                        Temporada {selected.año}
                        {selected.fecha_inicio && ` · ${selected.fecha_inicio}`}
                        {selected.fecha_fin && ` — ${selected.fecha_fin}`}
                        {selected.activo && <span style={styles.activoLabel}> · EN CURSO</span>}
                      </div>
                    </div>
                    <div style={styles.totalInscritos}>
                      <div style={styles.totalNum}>{ranking.length}</div>
                      <div style={styles.totalLabel}>INSCRIPTOS</div>
                    </div>
                  </div>

                  {selected.descripcion && (
                    <p style={styles.rankingDesc}>{selected.descripcion}</p>
                  )}

                  {ranking.length === 0 ? (
                    <div style={styles.emptyRanking}>
                      <span style={{ fontSize: 40 }}>📋</span>
                      <p>No hay puntuaciones registradas aún.</p>
                    </div>
                  ) : (
                    <>
                      {/* PODIO TOP 3 */}
                      {top3.length > 0 && (
                        <div style={styles.podioSection}>
                          <div style={styles.podioTitle}>PODIO</div>
                          <div style={styles.podio}>
                            {top3.map((p, i) => (
                              <div key={p.id} style={{ ...styles.podioCard, borderTop: `3px solid ${PODIO_COLORS[i]}` }}>
                                <div style={{ ...styles.podioPos, color: PODIO_COLORS[i] }}>{PODIO_LABELS[i]}</div>
                                <div style={styles.podioFoto}>
                                  {p.perro_foto
                                    ? <img src={p.perro_foto} alt={p.perro_nombre} style={styles.podioImg} />
                                    : <PitbullSilhouette size={50} opacity={0.2} />
                                  }
                                </div>
                                <div style={styles.podioNombre}>{p.perro_nombre}</div>
                                <div style={styles.podioRaza}>{p.perro_raza_display}</div>
                                <div style={styles.podioDueno}>👤 {p.dueno_nombre}</div>
                                <div style={{ ...styles.podioPuntos, color: PODIO_COLORS[i] }}>
                                  {p.puntos} pts
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tabla completa */}
                      {ranking.length > 0 && (
                        <div style={styles.tablaSection}>
                          <div style={styles.tablaHeader}>
                            <span>#</span>
                            <span>EJEMPLAR</span>
                            <span>RAZA</span>
                            <span>DUEÑO</span>
                            <span>CATEGORÍA</span>
                            <span style={{ textAlign: 'right' }}>PUNTOS</span>
                          </div>
                          {ranking.map((p, i) => (
                            <div key={p.id} style={{
                              ...styles.tablaRow,
                              background: i < 3 ? 'rgba(196,149,106,0.04)' : 'transparent',
                            }}>
                              <span style={{
                                ...styles.tablaPosNum,
                                color: i < 3 ? PODIO_COLORS[i] : '#444',
                              }}>
                                {p.posicion || i + 1}
                              </span>
                              <div style={styles.tablaThumb}>
                                {p.perro_foto
                                  ? <img src={p.perro_foto} alt={p.perro_nombre} style={styles.tablaThumbImg} />
                                  : <span style={{ fontSize: 16 }}>🐕</span>
                                }
                                <span style={styles.tablaNombre}>{p.perro_nombre}</span>
                              </div>
                              <span style={styles.tablaMeta}>{p.perro_raza_display}</span>
                              <span style={styles.tablaMeta}>{p.dueno_nombre}</span>
                              <span style={styles.tablaMeta}>{p.categoria || '—'}</span>
                              <span style={{ ...styles.tablaPuntos, color: i < 3 ? PODIO_COLORS[i] : '#C4956A' }}>
                                {p.puntos}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>

          </div>
        )}
      </div>
    </PublicLayout>
  )
}

const styles = {
  header: {
    background: 'linear-gradient(135deg, #060606 0%, #0a0808 100%)',
    borderBottom: '1px solid #1a1a1a',
    padding: '100px 48px 52px',
    position: 'relative',
    overflow: 'hidden',
  },
  headerGlow: {
    position: 'absolute', top: '30%', left: '20%',
    width: 400, height: 300,
    background: 'radial-gradient(ellipse, rgba(196,149,106,0.08) 0%, transparent 70%)',
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
  title: {
    fontSize: 'clamp(32px, 5vw, 56px)',
    fontWeight: 900, letterSpacing: 4, color: '#f0f0f0',
    margin: '0 0 12px',
  },
  accent: { color: '#C4956A' },
  sub: { color: '#555', fontSize: 13, lineHeight: 1.7 },

  container: {
    maxWidth: 1200, margin: '0 auto', padding: '36px 32px',
  },

  loading: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: 20, padding: '80px 0',
  },
  empty: {
    textAlign: 'center', padding: '80px 0',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
  },

  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '200px 1fr',
    gap: 32,
    alignItems: 'start',
  },

  sidePanel: {
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderRadius: 3,
    overflow: 'hidden',
    position: 'sticky',
    top: 80,
  },
  panelTitle: {
    color: '#444', fontSize: 9, fontWeight: 700, letterSpacing: 3,
    padding: '12px 14px',
    borderBottom: '1px solid #111',
  },
  temporadaBtn: {
    width: '100%', padding: '12px 14px',
    border: 'none', borderLeft: '2px solid transparent',
    textAlign: 'left', cursor: 'pointer',
    transition: 'all 0.1s',
    borderBottom: '1px solid #111',
  },
  temporadaNombre: { fontSize: 11, fontWeight: 700, letterSpacing: 0.5, marginBottom: 2 },
  temporadaAño: { color: '#444', fontSize: 10 },
  activeBadge: {
    display: 'inline-block',
    background: 'rgba(106,170,74,0.15)',
    color: '#6aaa4a',
    fontSize: 8, fontWeight: 700, letterSpacing: 2,
    padding: '2px 6px', borderRadius: 2, marginTop: 4,
  },

  rankingArea: { minWidth: 0 },
  rankingHeader: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 20,
    paddingBottom: 16, borderBottom: '1px solid #1a1a1a',
  },
  rankingTitle: {
    color: '#f0f0f0', fontSize: 20,
    fontWeight: 900, letterSpacing: 2, margin: '0 0 6px',
  },
  rankingMeta: { color: '#555', fontSize: 12 },
  activoLabel: { color: '#6aaa4a' },
  totalInscritos: { textAlign: 'center' },
  totalNum: { color: '#C4956A', fontSize: 32, fontWeight: 900, lineHeight: 1 },
  totalLabel: { color: '#444', fontSize: 9, fontWeight: 700, letterSpacing: 2, marginTop: 4 },
  rankingDesc: { color: '#555', fontSize: 13, lineHeight: 1.7, marginBottom: 24 },

  emptyRanking: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: 12, padding: '60px 0',
    color: '#444',
  },

  podioSection: { marginBottom: 36 },
  podioTitle: {
    color: '#444', fontSize: 9, fontWeight: 700, letterSpacing: 4,
    marginBottom: 16,
  },
  podio: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: 14,
  },
  podioCard: {
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderRadius: 3,
    padding: '20px 16px',
    textAlign: 'center',
  },
  podioPos: { fontSize: 24, fontWeight: 900, marginBottom: 12 },
  podioFoto: {
    width: 70, height: 70,
    borderRadius: '50%',
    background: '#111',
    margin: '0 auto 12px',
    overflow: 'hidden',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  podioImg: { width: '100%', height: '100%', objectFit: 'cover' },
  podioNombre: { color: '#f0f0f0', fontSize: 13, fontWeight: 800, marginBottom: 4 },
  podioRaza: { color: '#555', fontSize: 11, marginBottom: 4 },
  podioDueno: { color: '#444', fontSize: 11, marginBottom: 10 },
  podioPuntos: { fontSize: 22, fontWeight: 900 },

  tablaSection: {
    border: '1px solid #1a1a1a',
    borderRadius: 3,
    overflow: 'hidden',
  },
  tablaHeader: {
    display: 'grid',
    gridTemplateColumns: '40px 1fr 1fr 1fr 100px 80px',
    gap: 12,
    padding: '10px 16px',
    background: '#111',
    color: '#444', fontSize: 9, fontWeight: 700, letterSpacing: 2,
    borderBottom: '1px solid #1a1a1a',
  },
  tablaRow: {
    display: 'grid',
    gridTemplateColumns: '40px 1fr 1fr 1fr 100px 80px',
    gap: 12,
    padding: '12px 16px',
    borderBottom: '1px solid #111',
    alignItems: 'center',
    transition: 'background 0.1s',
  },
  tablaPosNum: { fontSize: 16, fontWeight: 900 },
  tablaThumb: {
    display: 'flex', alignItems: 'center', gap: 10,
  },
  tablaThumbImg: {
    width: 32, height: 32,
    borderRadius: '50%', objectFit: 'cover',
    border: '1px solid #222',
  },
  tablaNombre: { color: '#e0e0e0', fontSize: 13, fontWeight: 700 },
  tablaMeta: { color: '#666', fontSize: 12 },
  tablaPuntos: {
    fontSize: 16, fontWeight: 900,
    textAlign: 'right',
  },
}
