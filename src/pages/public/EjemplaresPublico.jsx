import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getPerros } from '../../api'
import PublicLayout from '../../layouts/PublicLayout'
import PitbullSilhouette from '../../components/PitbullSilhouette'

const FILTRO_RAZA = [
  { value: '', label: 'TODAS LAS RAZAS' },
  { value: 'pitbull', label: 'AMERICAN PIT BULL TERRIER' },
  { value: 'bully', label: 'AMERICAN BULLY' },
]

const FILTRO_SEXO = [
  { value: '', label: 'TODOS' },
  { value: 'M', label: 'MACHOS' },
  { value: 'H', label: 'HEMBRAS' },
]

const FILTRO_ESTADO = [
  { value: 'activo', label: 'ACTIVOS' },
  { value: '', label: 'TODOS' },
  { value: 'retirado', label: 'RETIRADOS' },
  { value: 'fallecido', label: 'FALLECIDOS' },
]

const RAZA_COLOR = { pitbull: '#4a7aaa', bully: '#9a4aaa' }
const RAZA_LABEL = { pitbull: 'APBT', bully: 'BULLY' }

function calcEdad(fechaNac) {
  if (!fechaNac) return null
  const hoy = new Date()
  const nac = new Date(fechaNac + 'T00:00:00')
  const años = hoy.getFullYear() - nac.getFullYear()
  const meses = hoy.getMonth() - nac.getMonth()
  if (años === 0) return `${meses < 0 ? 0 : meses} meses`
  return `${años} año${años !== 1 ? 's' : ''}`
}

export default function EjemplaresPublico() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [perros, setPerros] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'

  const razaFiltro = searchParams.get('raza') || ''
  const sexoFiltro = searchParams.get('sexo') || ''
  const estadoFiltro = searchParams.get('estado') || 'activo'

  const load = () => {
    setLoading(true)
    const params = {}
    if (razaFiltro) params.raza = razaFiltro
    if (sexoFiltro) params.sexo = sexoFiltro
    if (estadoFiltro) params.estado = estadoFiltro
    if (search.trim()) params.search = search.trim()
    params.ordering = 'nombre'
    getPerros(params)
      .then(r => {
        const data = r.data?.results ?? r.data
        setPerros(Array.isArray(data) ? data : [])
      })
      .catch(() => setPerros([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [razaFiltro, sexoFiltro, estadoFiltro])

  const handleSearch = (e) => {
    e.preventDefault()
    load()
  }

  const setFiltro = (key, value) => {
    const p = new URLSearchParams(searchParams)
    if (value) p.set(key, value)
    else p.delete(key)
    setSearchParams(p)
  }

  const pitbulls = perros.filter(p => p.raza === 'pitbull').length
  const bullys = perros.filter(p => p.raza === 'bully').length

  return (
    <PublicLayout>

      {/* ══════ HEADER ══════ */}
      <div style={styles.pageHeader}>
        <div style={styles.pageHeaderGlow} />
        <div style={styles.pageHeaderInner}>
          <div style={styles.headerBadge}>CATÁLOGO OFICIAL</div>
          <h1 style={styles.pageTitle}>REGISTRO DE <span style={styles.pageTitleAccent}>EJEMPLARES</span></h1>
          <p style={styles.pageSubtitle}>Directorio completo de American Pit Bull Terrier y American Bully registrados en el club.</p>
          <div style={styles.headerStats}>
            <div style={styles.headerStat}>
              <span style={{ color: '#C4956A', fontWeight: 900, fontSize: 22 }}>{perros.length}</span>
              <span style={styles.headerStatLabel}>TOTAL</span>
            </div>
            <div style={styles.headerStatDiv} />
            <div style={styles.headerStat}>
              <span style={{ color: '#4a7aaa', fontWeight: 900, fontSize: 22 }}>{pitbulls}</span>
              <span style={styles.headerStatLabel}>APBT</span>
            </div>
            <div style={styles.headerStatDiv} />
            <div style={styles.headerStat}>
              <span style={{ color: '#9a4aaa', fontWeight: 900, fontSize: 22 }}>{bullys}</span>
              <span style={styles.headerStatLabel}>BULLY</span>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', right: 0, bottom: -20, pointerEvents: 'none' }}>
          <PitbullSilhouette size={300} opacity={0.05} />
        </div>
      </div>

      <div style={styles.main}>

        {/* ══════ FILTROS ══════ */}
        <aside style={styles.sidebar}>
          <div style={styles.filterSection}>
            <div style={styles.filterTitle}>BUSCAR</div>
            <form onSubmit={handleSearch}>
              <input
                style={styles.searchInput}
                placeholder="Nombre, color, kennel..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button type="submit" style={styles.searchBtn}>BUSCAR</button>
            </form>
          </div>

          <div style={styles.filterSection}>
            <div style={styles.filterTitle}>RAZA</div>
            {FILTRO_RAZA.map(f => (
              <button
                key={f.value}
                onClick={() => setFiltro('raza', f.value)}
                style={{
                  ...styles.filterBtn,
                  background: razaFiltro === f.value ? 'rgba(196,149,106,0.12)' : 'transparent',
                  color: razaFiltro === f.value ? '#C4956A' : '#666',
                  borderLeft: razaFiltro === f.value ? '2px solid #C4956A' : '2px solid transparent',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div style={styles.filterSection}>
            <div style={styles.filterTitle}>SEXO</div>
            {FILTRO_SEXO.map(f => (
              <button
                key={f.value}
                onClick={() => setFiltro('sexo', f.value)}
                style={{
                  ...styles.filterBtn,
                  background: sexoFiltro === f.value ? 'rgba(196,149,106,0.12)' : 'transparent',
                  color: sexoFiltro === f.value ? '#C4956A' : '#666',
                  borderLeft: sexoFiltro === f.value ? '2px solid #C4956A' : '2px solid transparent',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div style={styles.filterSection}>
            <div style={styles.filterTitle}>ESTADO</div>
            {FILTRO_ESTADO.map(f => (
              <button
                key={f.value}
                onClick={() => setFiltro('estado', f.value)}
                style={{
                  ...styles.filterBtn,
                  background: estadoFiltro === f.value ? 'rgba(196,149,106,0.12)' : 'transparent',
                  color: estadoFiltro === f.value ? '#C4956A' : '#666',
                  borderLeft: estadoFiltro === f.value ? '2px solid #C4956A' : '2px solid transparent',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </aside>

        {/* ══════ CATÁLOGO ══════ */}
        <div style={styles.catalogArea}>
          {/* barra de opciones */}
          <div style={styles.catalogBar}>
            <span style={styles.catalogCount}>
              {loading ? 'Cargando...' : `${perros.length} ejemplar${perros.length !== 1 ? 'es' : ''}`}
            </span>
            <div style={styles.viewToggle}>
              <button
                onClick={() => setViewMode('grid')}
                style={{ ...styles.viewBtn, background: viewMode === 'grid' ? '#C4956A22' : 'transparent', color: viewMode === 'grid' ? '#C4956A' : '#555' }}
              >
                ⊞ GRILLA
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{ ...styles.viewBtn, background: viewMode === 'list' ? '#C4956A22' : 'transparent', color: viewMode === 'list' ? '#C4956A' : '#555' }}
              >
                ≡ LISTA
              </button>
            </div>
          </div>

          {loading ? (
            <div style={styles.loadingState}>
              <PitbullSilhouette size={80} opacity={0.15} />
              <span style={{ color: '#444', fontSize: 13, letterSpacing: 2 }}>CARGANDO EJEMPLARES...</span>
            </div>
          ) : perros.length === 0 ? (
            <div style={styles.emptyState}>
              <PitbullSilhouette size={100} opacity={0.1} />
              <p style={{ color: '#444', letterSpacing: 1 }}>No se encontraron ejemplares</p>
              <button onClick={() => { setSearch(''); setSearchParams({}) }} style={styles.resetBtn}>
                LIMPIAR FILTROS
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div style={styles.grid}>
              {perros.map(p => <GridCard key={p.id} perro={p} />)}
            </div>
          ) : (
            <div style={styles.listContainer}>
              {perros.map(p => <ListRow key={p.id} perro={p} />)}
            </div>
          )}
        </div>
      </div>

    </PublicLayout>
  )
}

function GridCard({ perro }) {
  const color = RAZA_COLOR[perro.raza] || '#C4956A'
  const label = RAZA_LABEL[perro.raza] || ''
  return (
    <Link to={`/ejemplares/${perro.id}`} style={styles.gridCard}>
      <div style={{ ...styles.cardPhoto, background: color + '18' }}>
        {perro.foto_url
          ? <img src={perro.foto_url} alt={perro.nombre} style={styles.cardImg} />
          : <PitbullSilhouette size={80} opacity={0.18} />
        }
        <div style={{ ...styles.razaBadge, background: color }}>{label}</div>
        {perro.tiene_registro && <div style={styles.pedigreeBadge}>📋</div>}
      </div>
      <div style={styles.cardBody}>
        <div style={styles.cardNombre}>{perro.nombre}</div>
        <div style={styles.cardSexoColor}>{perro.sexo_display} · {perro.color}</div>
        {perro.fecha_nacimiento && (
          <div style={styles.cardEdad}>{calcEdad(perro.fecha_nacimiento)}</div>
        )}
        {perro.kennel && <div style={styles.cardKennel}>{perro.kennel}</div>}
        <div style={styles.cardDueno}>👤 {perro.dueno_nombre}</div>
        {(perro.total_camadas > 0 || perro.total_cachorros > 0) && (
          <div style={styles.cardStats}>
            <span>🐣 {perro.total_camadas} camada{perro.total_camadas !== 1 ? 's' : ''}</span>
            <span style={{ color: '#2a2a2a' }}>·</span>
            <span>🐶 {perro.total_cachorros} cachorro{perro.total_cachorros !== 1 ? 's' : ''}</span>
          </div>
        )}
        {perro.variante && perro.variante !== 'na' && (
          <div style={{ ...styles.varianteBadge, borderColor: color, color }}>
            {perro.variante_display}
          </div>
        )}
      </div>
      <div style={{ ...styles.cardBorder, background: color }} />
    </Link>
  )
}

function ListRow({ perro }) {
  const color = RAZA_COLOR[perro.raza] || '#C4956A'
  const label = RAZA_LABEL[perro.raza] || ''
  return (
    <Link to={`/ejemplares/${perro.id}`} style={{ ...styles.listRow, borderLeft: `3px solid ${color}` }}>
      <div style={{ ...styles.listThumb, background: color + '18' }}>
        {perro.foto_url
          ? <img src={perro.foto_url} alt={perro.nombre} style={styles.listImg} />
          : <PitbullSilhouette size={40} opacity={0.2} />
        }
      </div>
      <div style={styles.listInfo}>
        <div style={styles.listNombre}>{perro.nombre}</div>
        <div style={styles.listMeta}>{perro.sexo_display} · {perro.color}</div>
      </div>
      <div style={{ ...styles.listRaza, color }}>{label}</div>
      <div style={styles.listDueno}>{perro.dueno_nombre}</div>
      <div style={styles.listEdad}>
        {perro.fecha_nacimiento ? calcEdad(perro.fecha_nacimiento) : '—'}
      </div>
      <div style={styles.listKennel}>{perro.kennel || '—'}</div>
      {perro.tiene_registro
        ? <div style={styles.listPedigree}>✓ PEDIGREE</div>
        : <div style={{ ...styles.listPedigree, color: '#333' }}>—</div>
      }
    </Link>
  )
}

const styles = {
  pageHeader: {
    background: 'linear-gradient(135deg, #060606 0%, #0a0808 100%)',
    borderBottom: '1px solid #1a1a1a',
    padding: '100px 48px 48px',
    position: 'relative',
    overflow: 'hidden',
  },
  pageHeaderGlow: {
    position: 'absolute', top: '50%', left: '30%',
    transform: 'translate(-50%,-50%)',
    width: 500, height: 300,
    background: 'radial-gradient(ellipse, rgba(196,149,106,0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  pageHeaderInner: {
    position: 'relative', zIndex: 2,
    maxWidth: 700,
  },
  headerBadge: {
    display: 'inline-block',
    background: 'rgba(196,149,106,0.1)',
    border: '1px solid rgba(196,149,106,0.3)',
    color: '#C4956A',
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 4,
    padding: '5px 14px',
    borderRadius: 2,
    marginBottom: 18,
  },
  pageTitle: {
    fontSize: 'clamp(32px, 5vw, 56px)',
    fontWeight: 900,
    letterSpacing: 4,
    color: '#f0f0f0',
    margin: 0,
    marginBottom: 12,
  },
  pageTitleAccent: { color: '#C4956A' },
  pageSubtitle: {
    color: '#555',
    fontSize: 13,
    lineHeight: 1.6,
    marginBottom: 24,
  },
  headerStats: {
    display: 'flex',
    gap: 24,
    alignItems: 'center',
  },
  headerStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
  },
  headerStatLabel: {
    color: '#444',
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 2,
  },
  headerStatDiv: {
    width: 1, height: 30,
    background: '#1e1e1e',
  },

  main: {
    display: 'grid',
    gridTemplateColumns: '220px 1fr',
    minHeight: 'calc(100vh - 400px)',
    maxWidth: 1400,
    margin: '0 auto',
    padding: '0 24px',
    gap: 0,
  },

  sidebar: {
    borderRight: '1px solid #1a1a1a',
    padding: '24px 20px',
    position: 'sticky',
    top: 66,
    height: 'fit-content',
  },
  filterSection: {
    marginBottom: 24,
    paddingBottom: 20,
    borderBottom: '1px solid #111',
  },
  filterTitle: {
    color: '#444',
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 3,
    marginBottom: 10,
  },
  filterBtn: {
    display: 'block',
    width: '100%',
    padding: '8px 12px',
    border: 'none',
    borderLeft: '2px solid transparent',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 1,
    cursor: 'pointer',
    textAlign: 'left',
    borderRadius: 0,
    transition: 'all 0.1s',
    marginBottom: 2,
  },
  searchInput: {
    width: '100%',
    padding: '9px 12px',
    background: '#0d0d0d',
    border: '1px solid #1e1e1e',
    color: '#e0e0e0',
    fontSize: 12,
    borderRadius: 2,
    outline: 'none',
    marginBottom: 8,
    boxSizing: 'border-box',
  },
  searchBtn: {
    width: '100%',
    padding: '8px',
    background: '#C4956A22',
    border: '1px solid #C4956A44',
    color: '#C4956A',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 2,
    cursor: 'pointer',
    borderRadius: 2,
  },

  catalogArea: {
    padding: '24px 0 24px 24px',
  },
  catalogBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 12,
    borderBottom: '1px solid #111',
  },
  catalogCount: {
    color: '#555',
    fontSize: 11,
    letterSpacing: 1,
  },
  viewToggle: {
    display: 'flex',
    gap: 4,
  },
  viewBtn: {
    border: '1px solid #1a1a1a',
    padding: '5px 12px',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 1,
    cursor: 'pointer',
    borderRadius: 2,
    transition: 'all 0.1s',
  },

  loadingState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    padding: '80px 0',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    padding: '80px 0',
  },
  resetBtn: {
    background: 'transparent',
    border: '1px solid #C4956A44',
    color: '#C4956A',
    padding: '8px 20px',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 2,
    cursor: 'pointer',
    borderRadius: 2,
  },

  // Grid view
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: 14,
  },
  gridCard: {
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderRadius: 3,
    overflow: 'hidden',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    transition: 'border-color 0.15s',
  },
  cardPhoto: {
    height: 180,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  cardImg: {
    width: '100%', height: '100%',
    objectFit: 'cover',
  },
  razaBadge: {
    position: 'absolute',
    top: 8, left: 8,
    padding: '3px 7px',
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 1,
    color: '#fff',
    borderRadius: 2,
  },
  pedigreeBadge: {
    position: 'absolute',
    top: 8, right: 8,
    fontSize: 16,
  },
  cardBody: {
    padding: '12px 14px',
    flex: 1,
  },
  cardNombre: {
    color: '#f0f0f0',
    fontSize: 15,
    fontWeight: 800,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  cardSexoColor: {
    color: '#666',
    fontSize: 11,
    marginBottom: 4,
  },
  cardEdad: {
    color: '#555',
    fontSize: 11,
    marginBottom: 4,
  },
  cardKennel: {
    color: '#C4956A',
    fontSize: 10,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  cardDueno: {
    color: '#444',
    fontSize: 11,
    marginBottom: 6,
  },
  varianteBadge: {
    display: 'inline-block',
    border: '1px solid',
    padding: '2px 7px',
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 1,
    borderRadius: 2,
  },
  cardStats: {
    display: 'flex', alignItems: 'center', gap: 6,
    color: '#C4956A', fontSize: 10, fontWeight: 600, marginBottom: 4,
  },
  cardBorder: {
    height: 2,
    opacity: 0.4,
  },

  // List view
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  listRow: {
    display: 'grid',
    gridTemplateColumns: '60px 1fr 80px 1fr 80px 1fr 80px',
    alignItems: 'center',
    gap: 16,
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    padding: '10px 16px',
    textDecoration: 'none',
    transition: 'background 0.1s',
  },
  listThumb: {
    width: 50, height: 50,
    borderRadius: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
  },
  listImg: { width: '100%', height: '100%', objectFit: 'cover' },
  listInfo: {},
  listNombre: { color: '#e0e0e0', fontWeight: 700, fontSize: 13 },
  listMeta: { color: '#555', fontSize: 11 },
  listRaza: { fontSize: 10, fontWeight: 700, letterSpacing: 1 },
  listDueno: { color: '#555', fontSize: 12 },
  listEdad: { color: '#555', fontSize: 11 },
  listKennel: { color: '#777', fontSize: 11 },
  listPedigree: { color: '#6aaa4a', fontSize: 10, fontWeight: 700, letterSpacing: 1, textAlign: 'right' },
}
