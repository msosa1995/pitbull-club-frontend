import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getPerros, deletePerro } from '../api'
import Layout from '../components/Layout'
import PawIcon from '../components/PawIcon'
import DogAvatar from '../components/DogAvatar'

const FILTROS = ['Todos', 'Pit Bull', 'American Bully', 'Con registro', 'Machos', 'Hembras']

export default function Perros() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [filtro, setFiltro] = useState('Todos')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const load = (q = '') => {
    setLoading(true)
    getPerros(q ? { search: q } : {})
      .then(r => setData(r.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleSearch = e => { setSearch(e.target.value); load(e.target.value) }

  const handleDelete = async (id, nombre) => {
    if (!window.confirm(`¿Eliminar a ${nombre}?`)) return
    await deletePerro(id)
    load(search)
  }

  const filtered = data.filter(p => {
    if (filtro === 'Pit Bull') return p.raza === 'pitbull'
    if (filtro === 'American Bully') return p.raza === 'bully'
    if (filtro === 'Con registro') return p.tiene_registro
    if (filtro === 'Machos') return p.sexo === 'M'
    if (filtro === 'Hembras') return p.sexo === 'H'
    return true
  })

  return (
    <Layout>
      {/* header */}
      <div style={styles.pageHeader}>
        <div style={styles.pageHeaderLeft}>
          <PawIcon size={28} color="#C4956A" />
          <div>
            <h1 style={styles.title}>Perros</h1>
            <p style={styles.subtitle}>{filtered.length} perros en el club</p>
          </div>
        </div>
        <Link to="/perros/nuevo" style={styles.btnAdd}>+ Nuevo perro</Link>
      </div>

      {/* búsqueda */}
      <div style={styles.searchWrap}>
        <span style={styles.searchIcon}>🔍</span>
        <input
          style={styles.search}
          placeholder="Buscar por nombre, color, dueño..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      {/* filtros */}
      <div style={styles.filtros}>
        {FILTROS.map(f => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            style={{
              ...styles.filtroBtn,
              background: filtro === f ? '#111820' : '#fff',
              color: filtro === f ? '#C4956A' : '#666',
              border: filtro === f ? '1px solid #C4956A' : '1px solid #ddd',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={styles.loading}>
          <PawIcon size={40} color="#C4956A" opacity={0.3} />
          <span>Cargando perros...</span>
        </div>
      ) : (
        <div style={styles.grid}>
          {filtered.map(p => (
            <PerroCard key={p.id} p={p} onDelete={handleDelete} navigate={navigate} />
          ))}
          {filtered.length === 0 && (
            <div style={styles.empty}>
              <PawIcon size={48} color="#ccc" />
              <p>No hay perros en esta categoría.</p>
            </div>
          )}
        </div>
      )}
    </Layout>
  )
}

function PerroCard({ p, onDelete, navigate }) {
  const razaColor = p.raza === 'pitbull' ? '#7a9cbf' : '#bf7a9c'
  const razaBg = p.raza === 'pitbull'
    ? 'linear-gradient(135deg,#1a3a5a,#0d2a45)'
    : 'linear-gradient(135deg,#4a1a4a,#3a0a3a)'

  return (
    <div style={styles.card}>
      {/* banner superior con avatar */}
      <div style={{ ...styles.cardBanner, background: razaBg }}>
        <div style={styles.bannerPaws}>
          <PawIcon size={50} color="#fff" opacity={0.07} rotate={15} />
        </div>
        <div style={styles.avatarWrap}>
          {p.foto_principal
            ? <img src={p.foto_principal} alt={p.nombre} style={styles.fotoReal} />
            : <DogAvatar size={80} raza={p.raza} />
          }
        </div>
        <div style={{ ...styles.razaBadge, background: razaColor }}>
          {p.raza === 'pitbull' ? 'APBT' : 'BULLY'}
          {p.variante !== 'na' && ` · ${p.variante_display?.toUpperCase()}`}
        </div>
      </div>

      {/* cuerpo */}
      <div style={styles.cardBody}>
        <div style={styles.cardTop}>
          <div style={styles.nombre}>{p.nombre}</div>
          <span style={p.sexo === 'M' ? styles.macho : styles.hembra}>
            {p.sexo === 'M' ? '♂ Macho' : '♀ Hembra'}
          </span>
        </div>

        <div style={styles.colorRow}>
          <span style={{ ...styles.colorDot, background: razaColor }} />
          <span style={styles.colorText}>{p.color}</span>
        </div>

        {p.fecha_nacimiento && (
          <div style={styles.info}>🎂 {calcEdad(p.fecha_nacimiento)}</div>
        )}

        <div style={styles.dueno}>
          👤 <Link to={`/integrantes/${p.dueno}`} style={styles.duenoLink}>{p.dueno_nombre}</Link>
        </div>

        {p.procedencia && (
          <div style={styles.proc}>🏠 De: {p.procedencia}</div>
        )}

        <div style={styles.regRow}>
          {p.tiene_registro
            ? <span style={styles.conReg}>📋 Registrado {p.numero_registro ? `· ${p.numero_registro}` : ''}</span>
            : <span style={styles.sinReg}>Sin registro</span>
          }
        </div>

        <div style={styles.actions}>
          <Link to={`/perros/${p.id}`} style={styles.btnVer}>Ver detalle</Link>
          <button onClick={() => navigate(`/perros/${p.id}/editar`)} style={styles.btnEdit}>✏️</button>
          <button onClick={() => onDelete(p.id, p.nombre)} style={styles.btnDel}>🗑️</button>
        </div>
      </div>
    </div>
  )
}

function calcEdad(fecha) {
  const hoy = new Date()
  const nac = new Date(fecha)
  const meses = (hoy.getFullYear() - nac.getFullYear()) * 12 + (hoy.getMonth() - nac.getMonth())
  if (meses < 12) return `${meses} mes${meses !== 1 ? 'es' : ''}`
  const años = Math.floor(meses / 12)
  return `${años} año${años !== 1 ? 's' : ''}`
}

const styles = {
  pageHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  pageHeaderLeft: { display: 'flex', alignItems: 'center', gap: 12 },
  title: { fontSize: 24, fontWeight: 800, margin: 0 },
  subtitle: { fontSize: 13, color: '#888', margin: 0 },
  btnAdd: {
    background: 'linear-gradient(135deg,#C4956A,#8B6240)',
    color: '#fff', padding: '10px 22px', borderRadius: 8,
    fontWeight: 700, fontSize: 14,
    boxShadow: '0 2px 8px rgba(196,149,106,0.4)',
  },
  searchWrap: { position: 'relative', marginBottom: 12, display: 'flex', alignItems: 'center' },
  searchIcon: { position: 'absolute', left: 14, fontSize: 16, pointerEvents: 'none' },
  search: {
    width: '100%', padding: '11px 14px 11px 42px',
    border: '1px solid #ddd', borderRadius: 8, fontSize: 14,
    outline: 'none', background: '#fff',
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
  },
  filtros: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 },
  filtroBtn: {
    padding: '6px 14px', borderRadius: 20, fontSize: 12,
    fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
  },
  loading: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: 40, color: '#aaa' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 },
  card: {
    background: '#fff', borderRadius: 14, overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  },
  cardBanner: {
    height: 110, display: 'flex', alignItems: 'center',
    justifyContent: 'center', position: 'relative',
  },
  bannerPaws: { position: 'absolute', top: 5, right: 5 },
  avatarWrap: { position: 'relative', zIndex: 2 },
  fotoReal: { width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)' },
  razaBadge: {
    position: 'absolute', bottom: 8, left: 10,
    color: '#fff', fontSize: 10, fontWeight: 800,
    padding: '3px 10px', borderRadius: 20,
    letterSpacing: 0.5,
  },
  cardBody: { padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 4 },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  nombre: { fontWeight: 800, fontSize: 16, color: '#1C1C1C' },
  macho: { background: '#d0e8ff', color: '#1a5fa0', borderRadius: 20, padding: '2px 9px', fontSize: 11, fontWeight: 700 },
  hembra: { background: '#ffd0e8', color: '#a01a5f', borderRadius: 20, padding: '2px 9px', fontSize: 11, fontWeight: 700 },
  colorRow: { display: 'flex', alignItems: 'center', gap: 6 },
  colorDot: { width: 10, height: 10, borderRadius: '50%' },
  colorText: { fontSize: 13, color: '#555' },
  info: { fontSize: 12, color: '#777' },
  dueno: { fontSize: 13, color: '#555' },
  duenoLink: { color: '#8B6240', fontWeight: 700 },
  proc: { fontSize: 12, color: '#888' },
  regRow: { marginTop: 2 },
  conReg: { background: '#d4edda', color: '#276749', borderRadius: 10, padding: '3px 8px', fontSize: 11, fontWeight: 600 },
  sinReg: { background: '#f0f0f0', color: '#999', borderRadius: 10, padding: '3px 8px', fontSize: 11 },
  actions: { display: 'flex', gap: 6, marginTop: 8 },
  btnVer: {
    flex: 1, textAlign: 'center', background: '#111820', color: '#C4956A',
    padding: '7px 0', borderRadius: 6, fontSize: 12, fontWeight: 700,
  },
  btnEdit: { background: '#f5f5f5', border: 'none', borderRadius: 6, padding: '7px 10px', fontSize: 14, cursor: 'pointer' },
  btnDel: { background: '#fff0f0', border: 'none', borderRadius: 6, padding: '7px 10px', fontSize: 14, cursor: 'pointer' },
  empty: { gridColumn: '1/-1', textAlign: 'center', padding: 48, color: '#bbb', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 },
}
