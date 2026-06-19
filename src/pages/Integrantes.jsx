import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getIntegrantes, deleteIntegrante } from '../api'
import Layout from '../components/Layout'
import PawIcon from '../components/PawIcon'

export default function Integrantes() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const load = (q = '') => {
    setLoading(true)
    getIntegrantes(q ? { search: q } : {})
      .then(r => setData(r.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleSearch = e => { setSearch(e.target.value); load(e.target.value) }

  const handleDelete = async (id, nombre) => {
    if (!window.confirm(`¿Eliminar a ${nombre}?`)) return
    await deleteIntegrante(id)
    load(search)
  }

  const initials = nombre => nombre.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
  const avatarColor = nombre => {
    const colors = ['#C4956A','#8B6240','#7a9cbf','#bf7a9c','#5a8a5a','#c4b56a','#6a7abf','#bf6a7a']
    let h = 0; for (const c of nombre) h = c.charCodeAt(0) + ((h << 5) - h)
    return colors[Math.abs(h) % colors.length]
  }

  return (
    <Layout>
      {/* header */}
      <div style={styles.pageHeader}>
        <div style={styles.pageHeaderLeft}>
          <PawIcon size={28} color="#C4956A" />
          <div>
            <h1 style={styles.title}>Integrantes</h1>
            <p style={styles.subtitle}>{data.length} miembros del club</p>
          </div>
        </div>
        <Link to="/integrantes/nuevo" style={styles.btnAdd}>+ Nuevo integrante</Link>
      </div>

      {/* búsqueda */}
      <div style={styles.searchWrap}>
        <span style={styles.searchIcon}>🔍</span>
        <input
          style={styles.search}
          placeholder="Buscar por nombre, apodo o ciudad..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <div style={styles.loading}>
          <PawIcon size={40} color="#C4956A" opacity={0.3} />
          <span>Cargando integrantes...</span>
        </div>
      ) : (
        <div style={styles.grid}>
          {data.map(m => {
            const bg = avatarColor(m.nombre)
            return (
              <div key={m.id} style={styles.card}>
                {/* avatar */}
                <div style={{ ...styles.avatar, background: bg }}>
                  {m.foto
                    ? <img src={m.foto} alt="" style={styles.avatarImg} />
                    : <span style={styles.avatarText}>{initials(m.nombre)}</span>
                  }
                </div>

                {/* info */}
                <div style={styles.cardBody}>
                  <Link to={`/integrantes/${m.id}`} style={styles.nombre}>{m.nombre}</Link>
                  {m.apodo && <div style={styles.apodo}>"{m.apodo}"</div>}
                  <div style={styles.ciudad}>📍 {m.ciudad}</div>
                  {m.whatsapp && <div style={styles.phone}>📱 {m.whatsapp}</div>}

                  <div style={styles.cardFooter}>
                    <div style={styles.perroBadge}>
                      <PawIcon size={13} color="#8B6240" />
                      <span>{m.total_perros} perro{m.total_perros !== 1 ? 's' : ''}</span>
                    </div>
                    <span style={m.activo ? styles.activo : styles.inactivo}>
                      {m.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                  <div style={styles.webBadge(m)}>
                    {m.tiene_usuario ? '✅ Web activo' : m.cedula ? '⏳ CI cargada' : '❌ Sin CI'}
                  </div>

                  <div style={styles.actions}>
                    <Link to={`/integrantes/${m.id}`} style={styles.btnVer}>Ver perfil</Link>
                    <button onClick={() => navigate(`/integrantes/${m.id}/editar`)} style={styles.btnEdit}>✏️</button>
                    <button onClick={() => handleDelete(m.id, m.nombre)} style={styles.btnDel}>🗑️</button>
                  </div>
                </div>
              </div>
            )
          })}
          {data.length === 0 && (
            <div style={styles.empty}>
              <PawIcon size={48} color="#ccc" />
              <p>No hay integrantes registrados.</p>
            </div>
          )}
        </div>
      )}
    </Layout>
  )
}

const styles = {
  pageHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  pageHeaderLeft: { display: 'flex', alignItems: 'center', gap: 12 },
  title: { fontSize: 22, fontWeight: 900, margin: 0, letterSpacing: 2, color: '#e0e0e0' },
  subtitle: { fontSize: 11, color: '#444', margin: 0, letterSpacing: 1 },
  btnAdd: {
    background: '#CC1100', color: '#fff', padding: '10px 22px', borderRadius: 2,
    fontWeight: 800, fontSize: 11, letterSpacing: 2,
    boxShadow: '0 0 16px rgba(204,17,0,0.25)',
  },
  searchWrap: {
    position: 'relative', marginBottom: 16,
    display: 'flex', alignItems: 'center',
  },
  searchIcon: { position: 'absolute', left: 14, fontSize: 16, pointerEvents: 'none', color: '#444' },
  search: {
    width: '100%', padding: '11px 14px 11px 42px',
    border: '1px solid #1e1e1e', borderRadius: 2, fontSize: 14,
    outline: 'none', background: '#111', color: '#e0e0e0',
  },
  loading: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: 40, color: '#333' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 12 },
  card: {
    background: '#111', border: '1px solid #1e1e1e',
    borderRadius: 3, overflow: 'hidden',
    display: 'flex', flexDirection: 'column',
  },
  avatar: {
    height: 80, display: 'flex', alignItems: 'center',
    justifyContent: 'center', position: 'relative', overflow: 'hidden',
  },
  avatarImg: { width: '100%', height: '100%', objectFit: 'cover' },
  avatarText: { fontSize: 30, fontWeight: 900, color: '#fff', opacity: 0.85 },
  cardBody: { padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', gap: 3 },
  nombre: { fontWeight: 700, fontSize: 14, color: '#e0e0e0' },
  apodo: { color: '#555', fontSize: 12, fontStyle: 'italic' },
  ciudad: { color: '#666', fontSize: 12, marginTop: 2 },
  phone: { color: '#666', fontSize: 12 },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  perroBadge: {
    display: 'flex', alignItems: 'center', gap: 4,
    background: 'rgba(196,149,106,0.12)', borderRadius: 2, padding: '3px 8px',
    color: '#C4956A', fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
  },
  activo: { background: 'rgba(80,160,80,0.12)', color: '#5aaa5a', borderRadius: 2, padding: '3px 8px', fontSize: 10, fontWeight: 700, letterSpacing: 1 },
  inactivo: { background: 'rgba(204,17,0,0.12)', color: '#CC1100', borderRadius: 2, padding: '3px 8px', fontSize: 10, fontWeight: 700, letterSpacing: 1 },
  actions: { display: 'flex', gap: 6, marginTop: 10 },
  btnVer: {
    flex: 1, textAlign: 'center', background: '#CC1100', color: '#fff',
    padding: '7px 0', borderRadius: 2, fontSize: 11, fontWeight: 800, letterSpacing: 1,
  },
  btnEdit: {
    background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 2,
    padding: '7px 10px', fontSize: 14, cursor: 'pointer', color: '#888',
  },
  btnDel: {
    background: 'rgba(204,17,0,0.1)', border: '1px solid rgba(204,17,0,0.2)',
    borderRadius: 2, padding: '7px 10px', fontSize: 14, cursor: 'pointer', color: '#CC1100',
  },
  empty: { gridColumn: '1/-1', textAlign: 'center', padding: 48, color: '#333', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 },
  webBadge: (m) => ({
    marginTop: 6, fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
    color: m.tiene_usuario ? '#5aaa5a' : m.cedula ? '#C4956A' : '#555',
  }),
}
