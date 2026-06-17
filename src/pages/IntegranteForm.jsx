import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getIntegrante, createIntegrante, updateIntegrante } from '../api'
import Layout from '../components/Layout'

const empty = {
  nombre: '', apodo: '', ciudad: '', pais: 'Paraguay',
  whatsapp: '', email: '', activo: true, notas: '',
}

export default function IntegranteForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [form, setForm] = useState(empty)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isEdit) {
      getIntegrante(id).then(r => {
        const { perros, total_perros, foto, ...rest } = r.data
        setForm(rest)
      })
    }
  }, [id])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      if (isEdit) await updateIntegrante(id, form)
      else await createIntegrante(form)
      navigate('/integrantes')
    } catch (err) {
      setError('Error al guardar. Revisá los datos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div style={styles.header}>
        <Link to="/integrantes" style={styles.back}>← Integrantes</Link>
        <h1 style={styles.title}>{isEdit ? 'Editar integrante' : 'Nuevo integrante'}</h1>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.grid}>
          <Field label="Nombre completo *" value={form.nombre} onChange={v => set('nombre', v)} required />
          <Field label="Apodo" value={form.apodo} onChange={v => set('apodo', v)} />
          <Field label="Ciudad *" value={form.ciudad} onChange={v => set('ciudad', v)} required />
          <Field label="País" value={form.pais} onChange={v => set('pais', v)} />
          <Field label="WhatsApp" value={form.whatsapp} onChange={v => set('whatsapp', v)} placeholder="0981-000-000" />
          <Field label="Email" type="email" value={form.email} onChange={v => set('email', v)} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Estado</label>
          <select style={styles.input} value={form.activo} onChange={e => set('activo', e.target.value === 'true')}>
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Notas</label>
          <textarea
            style={{ ...styles.input, minHeight: 80, resize: 'vertical' }}
            value={form.notas}
            onChange={e => set('notas', e.target.value)}
          />
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.actions}>
          <Link to="/integrantes" style={styles.btnCancel}>Cancelar</Link>
          <button type="submit" style={styles.btnSave} disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </Layout>
  )
}

function Field({ label, value, onChange, type = 'text', required, placeholder }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label style={{ color: '#666', fontSize: 13 }}>{label}</label>
      <input
        style={{ padding: '9px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, outline: 'none' }}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
      />
    </div>
  )
}

const styles = {
  header: { marginBottom: 24 },
  back: { color: '#C4956A', fontSize: 13, display: 'block', marginBottom: 6 },
  title: { fontSize: 24, fontWeight: 700 },
  form: { background: '#fff', borderRadius: 10, padding: '24px 28px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', maxWidth: 700 },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 },
  field: { display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 16 },
  label: { color: '#666', fontSize: 13 },
  input: { padding: '9px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, outline: 'none' },
  error: { background: '#fde8e8', color: '#c0392b', padding: '10px 14px', borderRadius: 6, fontSize: 13, marginBottom: 12 },
  actions: { display: 'flex', gap: 10, justifyContent: 'flex-end' },
  btnCancel: { padding: '10px 20px', border: '1px solid #ddd', borderRadius: 6, color: '#666', fontSize: 14 },
  btnSave: { padding: '10px 24px', background: '#C4956A', border: 'none', borderRadius: 6, color: '#fff', fontWeight: 600, fontSize: 14 },
}
