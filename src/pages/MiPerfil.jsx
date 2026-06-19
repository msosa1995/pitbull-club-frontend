import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMiPerfil, updateMiPerfil } from '../api'

const CIUDADES_PY = [
  'Asunción', 'Luque', 'San Lorenzo', 'Lambaré', 'Capiatá', 'Fernando de la Mora',
  'Limpio', 'Ñemby', 'Mariano Roque Alonso', 'Ciudad del Este', 'Encarnación',
  'Coronel Oviedo', 'Caaguazú', 'Pedro Juan Caballero', 'Concepción', 'Villarrica',
  'Pilar', 'Paraguarí', 'Caazapá', 'San Juan Bautista', 'Ayolas', 'Bella Vista',
]

export default function MiPerfil() {
  const navigate = useNavigate()
  const fotoRef = useRef()
  const [nombre, setNombre] = useState('')
  const [fotoUrl, setFotoUrl] = useState(null)
  const [fotoPreview, setFotoPreview] = useState(null)
  const [fotoFile, setFotoFile] = useState(null)
  const [form, setForm] = useState({ apodo: '', ciudad: '', whatsapp: '', email: '', cedula: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [ok, setOk] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getMiPerfil().then(r => {
      const { nombre, foto_url, ...rest } = r.data
      setNombre(nombre)
      setFotoUrl(foto_url)
      setForm({
        apodo: rest.apodo || '',
        ciudad: rest.ciudad || '',
        whatsapp: rest.whatsapp || '',
        email: rest.email || '',
        cedula: rest.cedula || '',
      })
    }).finally(() => setLoading(false))
  }, [])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleFoto = e => {
    const file = e.target.files[0]
    if (!file) return
    setFotoFile(file)
    setFotoPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setSaving(true)
    setOk(false)
    setError('')
    try {
      const payload = { ...form }
      if (fotoFile) payload.foto = fotoFile
      const res = await updateMiPerfil(payload)
      if (res.data.foto_url) setFotoUrl(res.data.foto_url)
      setFotoFile(null)
      setFotoPreview(null)
      setOk(true)
      setTimeout(() => setOk(false), 3000)
    } catch (err) {
      setError(err.response?.data?.error || 'Error al guardar. Intentá de nuevo.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div style={s.page}><div style={s.loading}>Cargando...</div></div>

  const fotoActual = fotoPreview || fotoUrl

  return (
    <div style={s.page}>
      <div style={s.header}>
        <button onClick={() => navigate('/mi-panel')} style={s.backBtn}>← Volver</button>
        <h1 style={s.title}>MI PERFIL</h1>
        <p style={s.sub}>Actualizá tu foto, ciudad y datos de contacto.</p>
      </div>

      <form onSubmit={handleSubmit} style={s.form}>

        {/* Foto */}
        <div style={s.fotoSection}>
          <div style={s.fotoWrap} onClick={() => fotoRef.current.click()}>
            {fotoActual
              ? <img src={fotoActual} alt="Foto" style={s.fotoImg} />
              : <div style={s.fotoPlaceholder}>
                  <span style={{ fontSize: 36 }}>👤</span>
                  <span style={{ color: '#444', fontSize: 10, letterSpacing: 1 }}>FOTO</span>
                </div>
            }
            <div style={s.fotoOverlay}>📷 CAMBIAR</div>
          </div>
          <input ref={fotoRef} type="file" accept="image/*" onChange={handleFoto} style={{ display: 'none' }} />
          <div style={s.fotoInfo}>
            <div style={s.nombre}>{nombre}</div>
            {form.apodo && <div style={s.apodo}>"{form.apodo}"</div>}
            <div style={{ color: '#444', fontSize: 11, marginTop: 6 }}>Hacé click en la foto para cambiarla</div>
          </div>
        </div>

        <div style={s.divider} />

        {/* Apodo */}
        <Field label="APODO / ALIAS" hint="Cómo te conocen en el club">
          <input style={s.input} value={form.apodo} onChange={e => set('apodo', e.target.value)} placeholder="Tu apodo" />
        </Field>

        {/* Ciudad */}
        <Field label="CIUDAD" hint="Se usa para el mapa público del club — sin dirección exacta." required>
          <select style={s.input} value={form.ciudad} onChange={e => set('ciudad', e.target.value)} required>
            <option value="">— Seleccioná tu ciudad —</option>
            {CIUDADES_PY.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>

        {/* WhatsApp */}
        <Field label="WHATSAPP / TELÉFONO" hint="Este número usás para entrar al sistema.">
          <input style={s.input} value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)} placeholder="0981-000-000" />
        </Field>

        {/* Email */}
        <Field label="EMAIL">
          <input style={s.input} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="tu@email.com" />
        </Field>

        {/* Cédula */}
        <Field label="NÚMERO DE CÉDULA" hint="Opcional. Puede usarse como identificador alternativo de acceso.">
          <input style={s.input} value={form.cedula} onChange={e => set('cedula', e.target.value)} placeholder="Ej: 4.567.890" />
        </Field>

        {/* Nombre (solo lectura) */}
        <Field label="NOMBRE COMPLETO" hint="El nombre es gestionado por la presidencia del club.">
          <div style={s.readonly}>{nombre}</div>
        </Field>

        {error && <div style={s.error}>{error}</div>}
        {ok && <div style={s.success}>✓ Perfil actualizado correctamente</div>}

        <button type="submit" style={s.btn} disabled={saving}>
          {saving ? 'GUARDANDO...' : 'GUARDAR CAMBIOS'}
        </button>
      </form>
    </div>
  )
}

function Field({ label, hint, required, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ color: '#555', fontSize: 10, fontWeight: 700, letterSpacing: 2 }}>
        {label}{required && <span style={{ color: '#CC1100' }}> *</span>}
      </label>
      {children}
      {hint && <div style={{ color: '#333', fontSize: 11 }}>{hint}</div>}
    </div>
  )
}

const s = {
  page: { minHeight: '100vh', background: '#060606', padding: '36px 32px', marginLeft: 220 },
  loading: { color: '#555', textAlign: 'center', padding: 60 },
  header: { marginBottom: 28 },
  backBtn: { background: 'none', border: 'none', color: '#555', fontSize: 13, cursor: 'pointer', marginBottom: 8, padding: 0 },
  title: { color: '#C4956A', fontSize: 22, fontWeight: 800, letterSpacing: 2, margin: '0 0 6px' },
  sub: { color: '#555', fontSize: 13, margin: 0 },

  form: { background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 4, padding: '28px 32px', maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 20 },

  fotoSection: { display: 'flex', gap: 24, alignItems: 'center' },
  fotoWrap: { position: 'relative', width: 90, height: 90, borderRadius: '50%', overflow: 'hidden', cursor: 'pointer', flexShrink: 0, border: '2px solid #1e1e1e' },
  fotoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  fotoPlaceholder: { width: '100%', height: '100%', background: '#111', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 },
  fotoOverlay: { position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C4956A', fontSize: 10, fontWeight: 700, letterSpacing: 1, opacity: 0, transition: 'opacity 0.2s' },
  fotoInfo: { flex: 1 },
  nombre: { color: '#e0e0e0', fontWeight: 800, fontSize: 18 },
  apodo: { color: '#C4956A', fontSize: 13, fontStyle: 'italic', marginTop: 2 },

  divider: { height: 1, background: '#1a1a1a' },

  input: { padding: '11px 14px', background: '#080808', border: '1px solid #1e1e1e', borderRadius: 2, color: '#e0e0e0', fontSize: 14, outline: 'none' },
  readonly: { padding: '11px 14px', background: '#0a0a0a', border: '1px solid #111', borderRadius: 2, color: '#444', fontSize: 14 },

  error: { background: 'rgba(204,17,0,0.1)', border: '1px solid rgba(204,17,0,0.3)', color: '#ff6060', padding: '10px 14px', borderRadius: 2, fontSize: 12 },
  success: { background: 'rgba(90,170,90,0.1)', border: '1px solid rgba(90,170,90,0.3)', color: '#5aaa5a', padding: '10px 14px', borderRadius: 2, fontSize: 12, fontWeight: 700 },
  btn: { padding: 13, background: '#C4956A', border: 'none', borderRadius: 2, color: '#000', fontWeight: 800, fontSize: 12, letterSpacing: 3, cursor: 'pointer' },
}
