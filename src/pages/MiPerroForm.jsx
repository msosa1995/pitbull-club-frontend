import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMiPerro, createMiPerro, updateMiPerro } from '../api'

const RAZAS = [{ value: 'pitbull', label: 'American Pit Bull Terrier' }, { value: 'bully', label: 'American Bully' }]
const VARIANTES = [{ value: 'na', label: 'N/A' }, { value: 'pocket', label: 'Pocket' }, { value: 'standard', label: 'Standard' }, { value: 'classic', label: 'Classic' }, { value: 'xl', label: 'XL' }, { value: 'extreme', label: 'Extreme' }]
const SEXOS = [{ value: 'M', label: 'Macho' }, { value: 'H', label: 'Hembra' }]
const ESTADOS = [{ value: 'activo', label: 'Activo' }, { value: 'retirado', label: 'Retirado' }, { value: 'fallecido', label: 'Fallecido' }]

export default function MiPerroForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nombre: '', raza: 'pitbull', variante: 'na', sexo: 'M',
    color: '', fecha_nacimiento: '', procedencia: '',
    tiene_registro: false, numero_registro: '', kennel: '',
    padre: '', madre: '', microchip: '', peso: '', altura: '',
    estado: 'activo', notas: '',
  })
  const [foto, setFoto] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const esEdicion = !!id

  useEffect(() => {
    if (id) {
      getMiPerro(id).then(r => {
        const d = r.data
        setForm({
          nombre: d.nombre || '', raza: d.raza || 'pitbull', variante: d.variante || 'na',
          sexo: d.sexo || 'M', color: d.color || '', fecha_nacimiento: d.fecha_nacimiento || '',
          procedencia: d.procedencia || '', tiene_registro: d.tiene_registro || false,
          numero_registro: d.numero_registro || '', kennel: d.kennel || '',
          padre: d.padre || '', madre: d.madre || '', microchip: d.microchip || '',
          peso: d.peso || '', altura: d.altura || '', estado: d.estado || 'activo', notas: d.notas || '',
        })
      })
    }
  }, [id])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    if (!form.nombre || !form.raza || !form.sexo || !form.color) {
      setError('Completá los campos obligatorios')
      return
    }
    setLoading(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => { if (v !== '' && v !== null) fd.append(k, v) })
      if (foto) fd.append('foto_principal', foto)

      if (esEdicion) {
        await updateMiPerro(id, fd)
      } else {
        await createMiPerro(fd)
      }
      navigate('/mis-perros')
    } catch (err) {
      setError(err.response?.data?.detail || JSON.stringify(err.response?.data) || 'Error al guardar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <button onClick={() => navigate('/mis-perros')} style={styles.backBtn}>← Volver</button>
        <h1 style={styles.title}>{esEdicion ? 'EDITAR PERRO' : 'REGISTRAR PERRO'}</h1>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <Section title="DATOS BÁSICOS">
          <Field label="NOMBRE *" value={form.nombre} onChange={v => set('nombre', v)} required />
          <Select label="RAZA *" value={form.raza} onChange={v => set('raza', v)} options={RAZAS} />
          <Select label="VARIANTE" value={form.variante} onChange={v => set('variante', v)} options={VARIANTES} />
          <Select label="SEXO *" value={form.sexo} onChange={v => set('sexo', v)} options={SEXOS} />
          <Field label="COLOR *" value={form.color} onChange={v => set('color', v)} required />
          <Field label="FECHA DE NACIMIENTO" type="date" value={form.fecha_nacimiento} onChange={v => set('fecha_nacimiento', v)} />
        </Section>

        <Section title="PEDIGREE">
          <Field label="PADRE (nombre)" value={form.padre} onChange={v => set('padre', v)} />
          <Field label="MADRE (nombre)" value={form.madre} onChange={v => set('madre', v)} />
          <Field label="KENNEL" value={form.kennel} onChange={v => set('kennel', v)} />
          <Field label="PROCEDENCIA" value={form.procedencia} onChange={v => set('procedencia', v)} />
          <div style={styles.checkField}>
            <input type="checkbox" id="tiene_registro" checked={form.tiene_registro} onChange={e => set('tiene_registro', e.target.checked)} />
            <label htmlFor="tiene_registro" style={{ color: '#888', fontSize: 12 }}>Tiene registro/pedigree oficial</label>
          </div>
          {form.tiene_registro && (
            <Field label="NRO. REGISTRO" value={form.numero_registro} onChange={v => set('numero_registro', v)} />
          )}
        </Section>

        <Section title="DATOS FÍSICOS">
          <Field label="MICROCHIP" value={form.microchip} onChange={v => set('microchip', v)} />
          <Field label="PESO (kg)" type="number" value={form.peso} onChange={v => set('peso', v)} />
          <Field label="ALTURA (cm)" type="number" value={form.altura} onChange={v => set('altura', v)} />
          <Select label="ESTADO" value={form.estado} onChange={v => set('estado', v)} options={ESTADOS} />
        </Section>

        <Section title="FOTO Y NOTAS">
          <div style={styles.field}>
            <label style={styles.label}>FOTO PRINCIPAL</label>
            <input type="file" accept="image/*" onChange={e => setFoto(e.target.files[0])} style={{ color: '#888', fontSize: 13 }} />
          </div>
          <div style={{ ...styles.field, gridColumn: '1 / -1' }}>
            <label style={styles.label}>NOTAS</label>
            <textarea style={{ ...styles.input, height: 80, resize: 'vertical' }} value={form.notas} onChange={e => set('notas', e.target.value)} />
          </div>
        </Section>

        {error && <div style={styles.error}>⚠ {error}</div>}

        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button style={styles.saveBtn} disabled={loading}>{loading ? 'GUARDANDO...' : 'GUARDAR'}</button>
          <button type="button" style={styles.cancelBtn} onClick={() => navigate('/mis-perros')}>CANCELAR</button>
        </div>
      </form>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ color: '#C4956A', fontSize: 11, fontWeight: 800, letterSpacing: 2, marginBottom: 14, paddingBottom: 8, borderBottom: '1px solid #1a1a1a' }}>{title}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
        {children}
      </div>
    </div>
  )
}

function Field({ label, type = 'text', value, onChange, required }) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      <input style={styles.input} type={type} value={value} onChange={e => onChange(e.target.value)} required={required} />
    </div>
  )
}

function Select({ label, value, onChange, options }) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      <select style={styles.input} value={value} onChange={e => onChange(e.target.value)}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: '#060606', padding: '36px 32px', marginLeft: 220 },
  header: { marginBottom: 28 },
  backBtn: { background: 'none', border: 'none', color: '#555', fontSize: 13, cursor: 'pointer', marginBottom: 4, padding: 0 },
  title: { color: '#C4956A', fontSize: 22, fontWeight: 800, letterSpacing: 2, margin: 0 },
  form: { maxWidth: 800 },
  field: { display: 'flex', flexDirection: 'column', gap: 5 },
  label: { color: '#444', fontSize: 10, letterSpacing: 2, fontWeight: 700 },
  input: { padding: '10px 12px', background: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: 4, color: '#e0e0e0', fontSize: 13, outline: 'none' },
  checkField: { display: 'flex', alignItems: 'center', gap: 8, gridColumn: '1 / -1' },
  error: { background: 'rgba(204,17,0,0.1)', border: '1px solid rgba(204,17,0,0.3)', color: '#ff6060', padding: '12px 16px', borderRadius: 4, fontSize: 12, marginBottom: 8 },
  saveBtn: { padding: '12px 28px', background: '#C4956A', border: 'none', borderRadius: 4, color: '#000', fontWeight: 800, fontSize: 12, letterSpacing: 2, cursor: 'pointer' },
  cancelBtn: { padding: '12px 20px', background: 'transparent', border: '1px solid #222', borderRadius: 4, color: '#555', fontSize: 11, letterSpacing: 2, cursor: 'pointer' },
}
