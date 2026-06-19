import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cambiarPassword } from '../api'
import { useAuth } from '../AuthContext'

export default function CambiarPassword({ forzado = false }) {
  const { refreshMe, logout } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ old_password: '', new_password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    if (form.new_password !== form.confirm) {
      setError('Las contraseñas nuevas no coinciden')
      return
    }
    setLoading(true)
    try {
      await cambiarPassword({ old_password: form.old_password, new_password: form.new_password })
      await refreshMe()
      navigate('/mi-panel')
    } catch (err) {
      setError(err.response?.data?.error || 'Error al cambiar contraseña')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.topLine} />
        <div style={styles.header}>
          <img src="/logo.jpg" alt="logo" style={styles.logo} />
          <h2 style={styles.title}>
            {forzado ? 'CAMBIAR CONTRASEÑA' : 'CAMBIAR CONTRASEÑA'}
          </h2>
          {forzado && (
            <p style={styles.subtitle}>
              Es tu primer ingreso. Debés cambiar la contraseña antes de continuar.
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <Field label="CONTRASEÑA ACTUAL" type="password"
            value={form.old_password}
            onChange={v => setForm({ ...form, old_password: v })} />
          <Field label="NUEVA CONTRASEÑA" type="password"
            value={form.new_password}
            onChange={v => setForm({ ...form, new_password: v })} />
          <Field label="CONFIRMAR NUEVA CONTRASEÑA" type="password"
            value={form.confirm}
            onChange={v => setForm({ ...form, confirm: v })} />

          {error && <div style={styles.error}>⚠ {error}</div>}

          <button style={styles.btn} disabled={loading}>
            {loading ? 'GUARDANDO...' : 'CAMBIAR CONTRASEÑA'}
          </button>

          {!forzado && (
            <button type="button" style={styles.cancelBtn} onClick={() => navigate(-1)}>
              CANCELAR
            </button>
          )}

          {forzado && (
            <button type="button" style={styles.logoutBtn} onClick={() => { logout(); navigate('/login') }}>
              SALIR
            </button>
          )}
        </form>
        <div style={styles.topLine} />
      </div>
    </div>
  )
}

function Field({ label, type, value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label style={styles.label}>{label}</label>
      <input
        style={styles.input}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        required
      />
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#050505',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  card: {
    background: '#0d0d0d',
    border: '1px solid #1e1e1e',
    borderRadius: 4,
    width: 380,
    overflow: 'hidden',
  },
  topLine: { height: 2, background: 'linear-gradient(90deg, transparent, #C4956A, transparent)' },
  header: { textAlign: 'center', padding: '24px 24px 8px' },
  logo: { width: 80, borderRadius: 4, marginBottom: 12 },
  title: { color: '#C4956A', fontSize: 14, letterSpacing: 3, fontWeight: 800, margin: '0 0 8px' },
  subtitle: { color: '#888', fontSize: 12, margin: 0 },
  form: { display: 'flex', flexDirection: 'column', gap: 14, padding: '16px 24px 24px' },
  label: { color: '#444', fontSize: 10, letterSpacing: 2, fontWeight: 700 },
  input: {
    padding: '11px 14px', background: '#080808',
    border: '1px solid #1e1e1e', borderRadius: 2,
    color: '#e0e0e0', fontSize: 14, outline: 'none',
  },
  error: {
    background: 'rgba(204,17,0,0.1)', border: '1px solid rgba(204,17,0,0.3)',
    color: '#ff6060', padding: '10px 14px', borderRadius: 2, fontSize: 12,
  },
  btn: {
    padding: 13, background: '#C4956A', border: 'none', borderRadius: 2,
    color: '#000', fontWeight: 800, fontSize: 12, letterSpacing: 3, cursor: 'pointer',
  },
  cancelBtn: {
    padding: 10, background: 'transparent', border: '1px solid #222', borderRadius: 2,
    color: '#555', fontSize: 11, letterSpacing: 2, cursor: 'pointer',
  },
  logoutBtn: {
    padding: 10, background: 'transparent', border: 'none',
    color: '#333', fontSize: 10, letterSpacing: 2, cursor: 'pointer',
  },
}
