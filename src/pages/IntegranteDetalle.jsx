import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getIntegrante, deleteIntegrante, deletePerro } from '../api'
import Layout from '../components/Layout'

export default function IntegranteDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [m, setM] = useState(null)

  const load = () => getIntegrante(id).then(r => setM(r.data))
  useEffect(() => { load() }, [id])

  const handleDeleteIntegrante = async () => {
    if (!window.confirm(`¿Eliminar a ${m.nombre}?`)) return
    await deleteIntegrante(id)
    navigate('/integrantes')
  }

  const handleDeletePerro = async (pid, nombre) => {
    if (!window.confirm(`¿Eliminar al perro ${nombre}?`)) return
    await deletePerro(pid)
    load()
  }

  if (!m) return <Layout><div style={{ padding: 20, color: '#aaa' }}>Cargando...</div></Layout>

  return (
    <Layout>
      <div style={styles.header}>
        <div>
          <Link to="/integrantes" style={styles.back}>← Integrantes</Link>
          <h1 style={styles.title}>{m.nombre}</h1>
          {m.apodo && <div style={styles.apodo}>"{m.apodo}"</div>}
        </div>
        <div style={styles.headerBtns}>
          <Link to={`/integrantes/${id}/editar`} style={styles.btnEdit}>Editar</Link>
          <button onClick={handleDeleteIntegrante} style={styles.btnDel}>Eliminar</button>
        </div>
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Información personal</div>
          <Row label="Ciudad" value={m.ciudad} />
          <Row label="País" value={m.pais} />
          <Row label="WhatsApp" value={m.whatsapp} />
          <Row label="Email" value={m.email} />
          <Row label="Miembro desde" value={m.fecha_ingreso} />
          <Row label="Estado" value={
            <span style={m.activo ? styles.activo : styles.inactivo}>
              {m.activo ? 'Activo' : 'Inactivo'}
            </span>
          } />
          {m.notas && <Row label="Notas" value={m.notas} />}
        </div>
      </div>

      <div style={styles.perrosSection}>
        <div style={styles.perrosHeader}>
          <h2 style={styles.h2}>Perros ({m.perros.length})</h2>
          <Link to={`/perros/nuevo?dueno=${id}`} style={styles.btnAdd}>+ Agregar perro</Link>
        </div>

        {m.perros.length === 0 ? (
          <div style={styles.empty}>Este integrante aún no tiene perros registrados.</div>
        ) : (
          <div style={styles.perrosGrid}>
            {m.perros.map(p => (
              <div key={p.id} style={styles.perroCard}>
                <div style={styles.perroNombre}>{p.nombre}</div>
                <div style={styles.perroRaza}>{p.raza_display} {p.variante !== 'na' ? `· ${p.variante_display}` : ''}</div>
                <div style={styles.perroInfo}>
                  <span>{p.sexo_display}</span>
                  <span>·</span>
                  <span>{p.color}</span>
                </div>
                {p.procedencia && <div style={styles.perroProc}>De: {p.procedencia}</div>}
                <div style={styles.perroReg}>
                  {p.tiene_registro
                    ? <span style={styles.conReg}>✓ Registrado {p.numero_registro ? `· ${p.numero_registro}` : ''}</span>
                    : <span style={styles.sinReg}>Sin registro</span>}
                </div>
                <div style={styles.perroActions}>
                  <Link to={`/perros/${p.id}`} style={styles.btnVer}>Ver</Link>
                  <Link to={`/perros/${p.id}/editar`} style={styles.btnEditP}>Editar</Link>
                  <button onClick={() => handleDeletePerro(p.id, p.nombre)} style={styles.btnDelP}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

function Row({ label, value }) {
  return (
    <div style={{ display: 'flex', gap: 8, padding: '7px 0', borderBottom: '1px solid #f0f0f0', fontSize: 14 }}>
      <span style={{ color: '#888', minWidth: 120 }}>{label}</span>
      <span style={{ color: '#222', fontWeight: 500 }}>{value || '—'}</span>
    </div>
  )
}

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  back: { color: '#C4956A', fontSize: 13, display: 'block', marginBottom: 6 },
  title: { fontSize: 26, fontWeight: 700 },
  apodo: { color: '#888', fontSize: 15, marginTop: 2 },
  headerBtns: { display: 'flex', gap: 8 },
  btnEdit: { background: '#f0dfc0', color: '#8B6240', padding: '8px 16px', borderRadius: 6, fontWeight: 600, fontSize: 13 },
  btnDel: { background: '#fde8e8', color: '#c0392b', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 600, fontSize: 13 },
  grid: { marginBottom: 28 },
  card: { background: '#fff', borderRadius: 10, padding: '18px 22px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', maxWidth: 480 },
  cardTitle: { fontWeight: 700, color: '#C4956A', marginBottom: 12, fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.5 },
  activo: { background: '#d4edda', color: '#276749', borderRadius: 20, padding: '2px 10px', fontSize: 12, fontWeight: 600 },
  inactivo: { background: '#f8d7da', color: '#721c24', borderRadius: 20, padding: '2px 10px', fontSize: 12, fontWeight: 600 },
  perrosSection: {},
  perrosHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  h2: { fontSize: 18, fontWeight: 700 },
  btnAdd: { background: '#C4956A', color: '#fff', padding: '8px 16px', borderRadius: 6, fontWeight: 600, fontSize: 13 },
  empty: { color: '#aaa', padding: '20px 0' },
  perrosGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 },
  perroCard: { background: '#fff', borderRadius: 10, padding: '16px 18px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', borderTop: '3px solid #C4956A' },
  perroNombre: { fontWeight: 700, fontSize: 16, marginBottom: 4 },
  perroRaza: { color: '#8B6240', fontSize: 13, fontWeight: 500, marginBottom: 6 },
  perroInfo: { display: 'flex', gap: 6, fontSize: 13, color: '#555', marginBottom: 4 },
  perroProc: { fontSize: 12, color: '#888', marginBottom: 4 },
  perroReg: { fontSize: 12, marginBottom: 10 },
  conReg: { color: '#276749', background: '#d4edda', padding: '2px 8px', borderRadius: 10 },
  sinReg: { color: '#888', background: '#f0f0f0', padding: '2px 8px', borderRadius: 10 },
  perroActions: { display: 'flex', gap: 6 },
  btnVer: { background: '#111820', color: '#C4956A', padding: '4px 10px', borderRadius: 5, fontSize: 12, fontWeight: 600 },
  btnEditP: { background: '#f0dfc0', color: '#8B6240', padding: '4px 10px', borderRadius: 5, fontSize: 12, fontWeight: 600 },
  btnDelP: { background: '#fde8e8', color: '#c0392b', border: 'none', borderRadius: 5, padding: '4px 10px', fontSize: 12, fontWeight: 600 },
}
