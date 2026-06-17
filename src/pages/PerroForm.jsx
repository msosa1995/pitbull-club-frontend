import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom'
import { getPerro, createPerro, updatePerro, getIntegrantes } from '../api'
import Layout from '../components/Layout'

const empty = {
  dueno: '', nombre: '', raza: 'pitbull', variante: 'na', sexo: 'M',
  color: '', fecha_nacimiento: '', procedencia: '',
  tiene_registro: false, numero_registro: '', kennel: '',
  padre: '', madre: '', notas: '',
}

export default function PerroForm() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm] = useState({ ...empty, dueno: searchParams.get('dueno') || '' })
  const [integrantes, setIntegrantes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getIntegrantes().then(r => setIntegrantes(r.data))
    if (isEdit) {
      getPerro(id).then(r => {
        const { raza_display, variante_display, sexo_display, dueno_nombre, foto_principal, ...rest } = r.data
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
      if (isEdit) await updatePerro(id, form)
      else await createPerro(form)
      navigate(form.dueno ? `/integrantes/${form.dueno}` : '/perros')
    } catch {
      setError('Error al guardar. Revisá los datos.')
    } finally {
      setLoading(false)
    }
  }

  const razaEsBully = form.raza === 'bully'

  return (
    <Layout>
      <div style={styles.header}>
        <Link to="/perros" style={styles.back}>← Perros</Link>
        <h1 style={styles.title}>{isEdit ? 'Editar perro' : 'Nuevo perro'}</h1>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <Section title="Dueño">
          <div style={styles.field}>
            <label style={styles.label}>Integrante *</label>
            <select style={styles.input} value={form.dueno} onChange={e => set('dueno', e.target.value)} required>
              <option value="">— Seleccionar —</option>
              {integrantes.map(m => (
                <option key={m.id} value={m.id}>{m.nombre}{m.apodo ? ` (${m.apodo})` : ''}</option>
              ))}
            </select>
          </div>
        </Section>

        <Section title="Datos del perro">
          <div style={styles.grid}>
            <div style={styles.field}>
              <label style={styles.label}>Nombre *</label>
              <input style={styles.input} value={form.nombre} onChange={e => set('nombre', e.target.value)} required />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Raza *</label>
              <select style={styles.input} value={form.raza} onChange={e => set('raza', e.target.value)}>
                <option value="pitbull">American Pit Bull Terrier</option>
                <option value="bully">American Bully</option>
              </select>
            </div>
            {razaEsBully && (
              <div style={styles.field}>
                <label style={styles.label}>Variante Bully</label>
                <select style={styles.input} value={form.variante} onChange={e => set('variante', e.target.value)}>
                  <option value="na">N/A</option>
                  <option value="pocket">Pocket</option>
                  <option value="standard">Standard</option>
                  <option value="classic">Classic</option>
                  <option value="xl">XL</option>
                  <option value="extreme">Extreme</option>
                </select>
              </div>
            )}
            <div style={styles.field}>
              <label style={styles.label}>Sexo *</label>
              <select style={styles.input} value={form.sexo} onChange={e => set('sexo', e.target.value)}>
                <option value="M">Macho</option>
                <option value="H">Hembra</option>
              </select>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Color / Marcas *</label>
              <input style={styles.input} value={form.color} onChange={e => set('color', e.target.value)} required />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Fecha de nacimiento</label>
              <input type="date" style={styles.input} value={form.fecha_nacimiento || ''} onChange={e => set('fecha_nacimiento', e.target.value || null)} />
            </div>
          </div>
        </Section>

        <Section title="Procedencia">
          <div style={styles.grid}>
            <div style={styles.field}>
              <label style={styles.label}>De quién adquirió el perro</label>
              <input style={styles.input} value={form.procedencia} onChange={e => set('procedencia', e.target.value)} placeholder="Nombre del criador o vendedor" />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Padre</label>
              <input style={styles.input} value={form.padre} onChange={e => set('padre', e.target.value)} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Madre</label>
              <input style={styles.input} value={form.madre} onChange={e => set('madre', e.target.value)} />
            </div>
          </div>
        </Section>

        <Section title="Registro">
          <div style={styles.checkRow}>
            <input
              type="checkbox"
              id="tiene_registro"
              checked={form.tiene_registro}
              onChange={e => set('tiene_registro', e.target.checked)}
              style={{ width: 16, height: 16 }}
            />
            <label htmlFor="tiene_registro" style={{ fontSize: 14, color: '#333' }}>Tiene registro</label>
          </div>
          {form.tiene_registro && (
            <div style={{ ...styles.grid, marginTop: 12 }}>
              <div style={styles.field}>
                <label style={styles.label}>Número de registro</label>
                <input style={styles.input} value={form.numero_registro} onChange={e => set('numero_registro', e.target.value)} />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Kennel / Asociación</label>
                <input style={styles.input} value={form.kennel} onChange={e => set('kennel', e.target.value)} />
              </div>
            </div>
          )}
        </Section>

        <div style={styles.field}>
          <label style={styles.label}>Notas</label>
          <textarea style={{ ...styles.input, minHeight: 70, resize: 'vertical' }} value={form.notas} onChange={e => set('notas', e.target.value)} />
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.actions}>
          <Link to="/perros" style={styles.btnCancel}>Cancelar</Link>
          <button type="submit" style={styles.btnSave} disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </Layout>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontWeight: 700, color: '#C4956A', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12, borderBottom: '1px solid #f0dfc0', paddingBottom: 6 }}>
        {title}
      </div>
      {children}
    </div>
  )
}

const styles = {
  header: { marginBottom: 24 },
  back: { color: '#C4956A', fontSize: 13, display: 'block', marginBottom: 6 },
  title: { fontSize: 24, fontWeight: 700 },
  form: { background: '#fff', borderRadius: 10, padding: '24px 28px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', maxWidth: 700 },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 },
  field: { display: 'flex', flexDirection: 'column', gap: 5 },
  label: { color: '#666', fontSize: 13 },
  input: { padding: '9px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, outline: 'none', background: '#fff' },
  checkRow: { display: 'flex', alignItems: 'center', gap: 8 },
  error: { background: '#fde8e8', color: '#c0392b', padding: '10px 14px', borderRadius: 6, fontSize: 13, marginBottom: 12 },
  actions: { display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 },
  btnCancel: { padding: '10px 20px', border: '1px solid #ddd', borderRadius: 6, color: '#666', fontSize: 14 },
  btnSave: { padding: '10px 24px', background: '#C4956A', border: 'none', borderRadius: 6, color: '#fff', fontWeight: 600, fontSize: 14 },
}
