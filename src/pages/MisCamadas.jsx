import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMisCamadas, getMisPerros, createMiCamada, updateMiCamada, deleteMiCamada } from '../api'

export default function MisCamadas() {
  const [camadas, setCamadas] = useState([])
  const [hembras, setHembras] = useState([])
  const [machos, setMachos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editando, setEditando] = useState(null)
  const navigate = useNavigate()

  const cargar = () => {
    Promise.all([getMisCamadas(), getMisPerros()])
      .then(([c, p]) => {
        setCamadas(c.data)
        setHembras(p.data.filter(x => x.sexo === 'H'))
        setMachos(p.data.filter(x => x.sexo === 'M'))
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => { cargar() }, [])

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar esta camada?')) return
    await deleteMiCamada(id)
    cargar()
  }

  const handleSave = async (data) => {
    if (editando) {
      await updateMiCamada(editando.id, data)
    } else {
      await createMiCamada(data)
    }
    setShowForm(false)
    setEditando(null)
    cargar()
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <button onClick={() => navigate('/mi-panel')} style={styles.backBtn}>← Volver</button>
          <h1 style={styles.title}>MIS CAMADAS</h1>
        </div>
        <button onClick={() => { setEditando(null); setShowForm(true) }} style={styles.addBtn}>
          + REGISTRAR CAMADA
        </button>
      </div>

      {showForm && (
        <CamadaForm
          initial={editando}
          hembras={hembras}
          machos={machos}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditando(null) }}
        />
      )}

      {loading ? (
        <div style={styles.loading}>Cargando...</div>
      ) : camadas.length === 0 ? (
        <div style={styles.empty}>
          <div style={{ fontSize: 48 }}>🐾</div>
          <p style={{ color: '#555' }}>No tenés camadas registradas.</p>
        </div>
      ) : (
        <div style={styles.list}>
          {camadas.map(c => (
            <div key={c.id} style={styles.card}>
              <div style={styles.cardInfo}>
                <div style={styles.cardTitle}>
                  {c.madre_nombre} × {c.padre_nombre || c.padre_externo || 'Padre ext.'}
                </div>
                <div style={styles.cardMeta}>
                  Nacimiento: <b style={{ color: '#ccc' }}>{c.fecha_nacimiento}</b>
                </div>
                <div style={styles.badges}>
                  <Stat label="Total" value={c.cantidad_total} />
                  <Stat label="Machos" value={c.cantidad_machos} />
                  <Stat label="Hembras" value={c.cantidad_hembras} />
                </div>
                {c.notas && <div style={styles.notas}>{c.notas}</div>}
              </div>
              <div style={styles.cardActions}>
                <button onClick={() => { setEditando(c); setShowForm(true) }} style={styles.editBtn}>Editar</button>
                <button onClick={() => handleDelete(c.id)} style={styles.deleteBtn}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function CamadaForm({ initial, hembras, machos, onSave, onCancel }) {
  const [form, setForm] = useState({
    madre: initial?.madre || '',
    padre: initial?.padre || '',
    padre_externo: initial?.padre_externo || '',
    fecha_nacimiento: initial?.fecha_nacimiento || '',
    cantidad_total: initial?.cantidad_total || 0,
    cantidad_machos: initial?.cantidad_machos || 0,
    cantidad_hembras: initial?.cantidad_hembras || 0,
    notas: initial?.notas || '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    if (!form.madre) { setError('Seleccioná la madre'); return }
    if (!form.fecha_nacimiento) { setError('Ingresá la fecha de nacimiento'); return }
    setLoading(true)
    try {
      await onSave(form)
    } catch (err) {
      setError(err.response?.data?.detail || JSON.stringify(err.response?.data) || 'Error al guardar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.formCard}>
      <div style={styles.formTitle}>{initial ? 'EDITAR CAMADA' : 'NUEVA CAMADA'}</div>
      <form onSubmit={handleSubmit} style={styles.formGrid}>
        <div style={styles.field}>
          <label style={styles.label}>MADRE (del club) *</label>
          <select style={styles.input} value={form.madre} onChange={e => setForm({ ...form, madre: e.target.value })} required>
            <option value="">Seleccioná la madre</option>
            {hembras.map(h => <option key={h.id} value={h.id}>{h.nombre}</option>)}
          </select>
        </div>
        <div style={styles.field}>
          <label style={styles.label}>PADRE (del club)</label>
          <select style={styles.input} value={form.padre} onChange={e => setForm({ ...form, padre: e.target.value })}>
            <option value="">Padre externo / ninguno</option>
            {machos.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
          </select>
        </div>
        <div style={styles.field}>
          <label style={styles.label}>PADRE EXTERNO (nombre)</label>
          <input style={styles.input} value={form.padre_externo} onChange={e => setForm({ ...form, padre_externo: e.target.value })} placeholder="Si el padre no es del club" />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>FECHA DE NACIMIENTO *</label>
          <input style={styles.input} type="date" value={form.fecha_nacimiento} onChange={e => setForm({ ...form, fecha_nacimiento: e.target.value })} required />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>TOTAL CACHORROS</label>
          <input style={styles.input} type="number" min="0" value={form.cantidad_total} onChange={e => setForm({ ...form, cantidad_total: +e.target.value })} />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>MACHOS</label>
          <input style={styles.input} type="number" min="0" value={form.cantidad_machos} onChange={e => setForm({ ...form, cantidad_machos: +e.target.value })} />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>HEMBRAS</label>
          <input style={styles.input} type="number" min="0" value={form.cantidad_hembras} onChange={e => setForm({ ...form, cantidad_hembras: +e.target.value })} />
        </div>
        <div style={{ ...styles.field, gridColumn: '1 / -1' }}>
          <label style={styles.label}>NOTAS</label>
          <textarea style={{ ...styles.input, height: 70, resize: 'vertical' }} value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} />
        </div>

        {error && <div style={{ ...styles.error, gridColumn: '1 / -1' }}>⚠ {error}</div>}

        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 10 }}>
          <button style={styles.saveBtn} disabled={loading}>{loading ? 'GUARDANDO...' : 'GUARDAR'}</button>
          <button type="button" style={styles.cancelBtn} onClick={onCancel}>CANCELAR</button>
        </div>
      </form>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div style={{ background: '#1a1a1a', borderRadius: 6, padding: '6px 12px', textAlign: 'center' }}>
      <div style={{ color: '#C4956A', fontSize: 18, fontWeight: 800 }}>{value}</div>
      <div style={{ color: '#555', fontSize: 10, letterSpacing: 1 }}>{label}</div>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: '#060606', padding: '36px 32px', marginLeft: 220 },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 },
  backBtn: { background: 'none', border: 'none', color: '#555', fontSize: 13, cursor: 'pointer', marginBottom: 4, padding: 0 },
  title: { color: '#C4956A', fontSize: 22, fontWeight: 800, letterSpacing: 2, margin: 0 },
  addBtn: { background: '#C4956A', color: '#000', padding: '10px 20px', borderRadius: 6, fontWeight: 800, fontSize: 12, letterSpacing: 2, textDecoration: 'none', border: 'none', cursor: 'pointer' },
  loading: { color: '#555', textAlign: 'center', padding: 60 },
  empty: { textAlign: 'center', padding: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 },
  list: { display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 },
  card: { background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 },
  cardInfo: { flex: 1, display: 'flex', flexDirection: 'column', gap: 8 },
  cardTitle: { color: '#e0e0e0', fontWeight: 700, fontSize: 15 },
  cardMeta: { color: '#666', fontSize: 12 },
  badges: { display: 'flex', gap: 10 },
  notas: { color: '#555', fontSize: 12, fontStyle: 'italic' },
  cardActions: { display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 },
  editBtn: { padding: '7px 16px', background: 'rgba(196,149,106,0.1)', border: '1px solid #C4956A44', borderRadius: 4, color: '#C4956A', fontSize: 11, fontWeight: 700, cursor: 'pointer' },
  deleteBtn: { padding: '7px 16px', background: 'rgba(204,17,0,0.08)', border: '1px solid rgba(204,17,0,0.2)', borderRadius: 4, color: '#cc5555', fontSize: 11, fontWeight: 700, cursor: 'pointer' },
  formCard: { background: '#111', border: '1px solid #C4956A33', borderRadius: 10, padding: '24px', marginBottom: 24 },
  formTitle: { color: '#C4956A', fontSize: 13, fontWeight: 800, letterSpacing: 2, marginBottom: 20 },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 },
  field: { display: 'flex', flexDirection: 'column', gap: 5 },
  label: { color: '#444', fontSize: 10, letterSpacing: 2, fontWeight: 700 },
  input: { padding: '10px 12px', background: '#080808', border: '1px solid #1e1e1e', borderRadius: 4, color: '#e0e0e0', fontSize: 13, outline: 'none' },
  error: { background: 'rgba(204,17,0,0.1)', border: '1px solid rgba(204,17,0,0.3)', color: '#ff6060', padding: '10px 14px', borderRadius: 4, fontSize: 12 },
  saveBtn: { padding: '11px 24px', background: '#C4956A', border: 'none', borderRadius: 4, color: '#000', fontWeight: 800, fontSize: 12, letterSpacing: 2, cursor: 'pointer' },
  cancelBtn: { padding: '11px 20px', background: 'transparent', border: '1px solid #222', borderRadius: 4, color: '#555', fontSize: 11, letterSpacing: 2, cursor: 'pointer' },
}
