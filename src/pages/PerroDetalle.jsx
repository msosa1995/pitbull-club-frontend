import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getPerro, deletePerro } from '../api'
import Layout from '../components/Layout'

export default function PerroDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [p, setP] = useState(null)

  useEffect(() => { getPerro(id).then(r => setP(r.data)) }, [id])

  const handleDelete = async () => {
    if (!window.confirm(`¿Eliminar a ${p.nombre}?`)) return
    await deletePerro(id)
    navigate('/perros')
  }

  if (!p) return <Layout><div style={{ padding: 20, color: '#aaa' }}>Cargando...</div></Layout>

  const razaColor = p.raza === 'pitbull' ? '#7a9cbf' : '#bf7a9c'

  return (
    <Layout>
      <div style={styles.header}>
        <div>
          <Link to="/perros" style={styles.back}>← Perros</Link>
          <h1 style={styles.title}>{p.nombre}</h1>
          <div style={{ ...styles.raza, color: razaColor }}>
            {p.raza_display}{p.variante !== 'na' ? ` · ${p.variante_display}` : ''}
          </div>
        </div>
        <div style={styles.headerBtns}>
          <Link to={`/perros/${id}/editar`} style={styles.btnEdit}>Editar</Link>
          <button onClick={handleDelete} style={styles.btnDel}>Eliminar</button>
        </div>
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <CardTitle>Información</CardTitle>
          <Row label="Sexo" value={p.sexo_display} />
          <Row label="Color / Marcas" value={p.color} />
          <Row label="Fecha de nacimiento" value={p.fecha_nacimiento} />
          <Row label="Dueño" value={
            <Link to={`/integrantes/${p.dueno}`} style={{ color: '#8B6240', fontWeight: 600 }}>{p.dueno_nombre}</Link>
          } />
        </div>

        <div style={styles.card}>
          <CardTitle>Procedencia</CardTitle>
          <Row label="Adquirido de" value={p.procedencia} />
          <Row label="Padre" value={p.padre} />
          <Row label="Madre" value={p.madre} />
        </div>

        <div style={styles.card}>
          <CardTitle>Registro</CardTitle>
          <Row label="Tiene registro" value={
            p.tiene_registro
              ? <span style={styles.conReg}>✓ Sí</span>
              : <span style={styles.sinReg}>No</span>
          } />
          {p.tiene_registro && <>
            <Row label="Número" value={p.numero_registro} />
            <Row label="Kennel" value={p.kennel} />
          </>}
        </div>
      </div>

      {p.notas && (
        <div style={styles.notas}>
          <CardTitle>Notas</CardTitle>
          <p style={{ fontSize: 14, color: '#555', marginTop: 8 }}>{p.notas}</p>
        </div>
      )}
    </Layout>
  )
}

function CardTitle({ children }) {
  return <div style={{ fontWeight: 700, color: '#C4956A', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>{children}</div>
}

function Row({ label, value }) {
  return (
    <div style={{ display: 'flex', gap: 8, padding: '7px 0', borderBottom: '1px solid #f0f0f0', fontSize: 14 }}>
      <span style={{ color: '#888', minWidth: 130 }}>{label}</span>
      <span style={{ color: '#222', fontWeight: 500 }}>{value || '—'}</span>
    </div>
  )
}

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  back: { color: '#C4956A', fontSize: 13, display: 'block', marginBottom: 6 },
  title: { fontSize: 26, fontWeight: 700 },
  raza: { fontSize: 13, fontWeight: 600, marginTop: 3 },
  headerBtns: { display: 'flex', gap: 8 },
  btnEdit: { background: '#f0dfc0', color: '#8B6240', padding: '8px 16px', borderRadius: 6, fontWeight: 600, fontSize: 13 },
  btnDel: { background: '#fde8e8', color: '#c0392b', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 600, fontSize: 13 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, marginBottom: 20 },
  card: { background: '#fff', borderRadius: 10, padding: '18px 22px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' },
  notas: { background: '#fff', borderRadius: 10, padding: '18px 22px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', maxWidth: 600 },
  conReg: { background: '#d4edda', color: '#276749', borderRadius: 10, padding: '2px 8px', fontSize: 12 },
  sinReg: { background: '#f0f0f0', color: '#888', borderRadius: 10, padding: '2px 8px', fontSize: 12 },
}
