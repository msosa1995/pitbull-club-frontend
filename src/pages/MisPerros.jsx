import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getMisPerros, deleteMiPerro } from '../api'

export default function MisPerros() {
  const [perros, setPerros] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const cargar = () => {
    getMisPerros().then(r => setPerros(r.data)).finally(() => setLoading(false))
  }

  useEffect(() => { cargar() }, [])

  const handleDelete = async (id, nombre) => {
    if (!confirm(`¿Eliminar a ${nombre}?`)) return
    await deleteMiPerro(id)
    cargar()
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <button onClick={() => navigate('/mi-panel')} style={styles.backBtn}>← Volver</button>
          <h1 style={styles.title}>MIS PERROS</h1>
        </div>
        <Link to="/mis-perros/nuevo" style={styles.addBtn}>+ REGISTRAR PERRO</Link>
      </div>

      {loading ? (
        <div style={styles.loading}>Cargando...</div>
      ) : perros.length === 0 ? (
        <div style={styles.empty}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🐕</div>
          <p style={{ color: '#555' }}>No tenés perros registrados aún.</p>
          <Link to="/mis-perros/nuevo" style={styles.addBtn}>Registrar mi primer perro</Link>
        </div>
      ) : (
        <div style={styles.list}>
          {perros.map(p => (
            <div key={p.id} style={styles.card}>
              <div style={styles.cardLeft}>
                {p.foto_url
                  ? <img src={p.foto_url} alt={p.nombre} style={styles.foto} />
                  : <div style={styles.fotoPlaceholder}>🐕</div>
                }
              </div>
              <div style={styles.cardInfo}>
                <div style={styles.nombre}>{p.nombre}</div>
                <div style={styles.meta}>
                  <Badge color="#C4956A">{p.raza_display}</Badge>
                  <Badge color="#555">{p.sexo_display}</Badge>
                  <Badge color="#444">{p.estado_display}</Badge>
                </div>
                <div style={styles.detail}>{p.color} · {p.kennel || 'Sin kennel'}</div>
                <div style={styles.stats}>
                  <span style={styles.stat}>🐣 {p.total_camadas || 0} camada{p.total_camadas !== 1 ? 's' : ''}</span>
                  <span style={styles.statDiv}>·</span>
                  <span style={styles.stat}>🐶 {p.total_cachorros || 0} cachorro{p.total_cachorros !== 1 ? 's' : ''}</span>
                </div>
              </div>
              <div style={styles.cardActions}>
                <Link to={`/mis-perros/${p.id}/editar`} style={styles.editBtn}>Editar</Link>
                <button onClick={() => handleDelete(p.id, p.nombre)} style={styles.deleteBtn}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Badge({ children, color }) {
  return (
    <span style={{ background: `${color}22`, color, border: `1px solid ${color}44`, borderRadius: 4, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>
      {children}
    </span>
  )
}

const styles = {
  page: { minHeight: '100vh', background: '#060606', padding: '36px 32px', marginLeft: 220 },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 },
  backBtn: { background: 'none', border: 'none', color: '#555', fontSize: 13, cursor: 'pointer', marginBottom: 4, padding: 0 },
  title: { color: '#C4956A', fontSize: 22, fontWeight: 800, letterSpacing: 2, margin: 0 },
  addBtn: { background: '#C4956A', color: '#000', padding: '10px 20px', borderRadius: 6, fontWeight: 800, fontSize: 12, letterSpacing: 2, textDecoration: 'none', border: 'none', cursor: 'pointer' },
  loading: { color: '#555', textAlign: 'center', padding: 60 },
  empty: { textAlign: 'center', padding: 60, color: '#888', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 },
  list: { display: 'flex', flexDirection: 'column', gap: 12 },
  card: { background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 },
  cardLeft: { flexShrink: 0 },
  foto: { width: 64, height: 64, borderRadius: 8, objectFit: 'cover' },
  fotoPlaceholder: { width: 64, height: 64, borderRadius: 8, background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 },
  cardInfo: { flex: 1, display: 'flex', flexDirection: 'column', gap: 6 },
  nombre: { color: '#e0e0e0', fontWeight: 700, fontSize: 16 },
  meta: { display: 'flex', gap: 6, flexWrap: 'wrap' },
  detail: { color: '#555', fontSize: 12 },
  stats: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 },
  stat: { color: '#C4956A', fontSize: 11, fontWeight: 600 },
  statDiv: { color: '#333', fontSize: 11 },
  cardActions: { display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 },
  editBtn: { padding: '7px 16px', background: 'rgba(196,149,106,0.1)', border: '1px solid #C4956A44', borderRadius: 4, color: '#C4956A', fontSize: 11, fontWeight: 700, textDecoration: 'none', textAlign: 'center', letterSpacing: 1 },
  deleteBtn: { padding: '7px 16px', background: 'rgba(204,17,0,0.08)', border: '1px solid rgba(204,17,0,0.2)', borderRadius: 4, color: '#cc5555', fontSize: 11, fontWeight: 700, cursor: 'pointer', letterSpacing: 1 },
}
