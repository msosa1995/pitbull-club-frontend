import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import PitbullSilhouette from '../components/PitbullSilhouette'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true); setError('')
    try { await login(form.username, form.password); navigate('/panel') }
    catch { setError('Usuario o contraseña incorrectos') }
    finally { setLoading(false) }
  }

  return (
    <div style={styles.page}>
      {/* pitbulls de fondo */}
      <div style={{ position: 'fixed', bottom: -20, left: -30 }}>
        <PitbullSilhouette size={300} opacity={0.08} />
      </div>
      <div style={{ position: 'fixed', top: -20, right: -30 }}>
        <PitbullSilhouette size={280} opacity={0.06} style={{ transform: 'scaleX(-1)' }} />
      </div>
      <div style={{ position: 'fixed', top: '30%', left: '6%' }}>
        <PitbullSilhouette size={130} opacity={0.04} />
      </div>

      {/* glow central */}
      <div style={styles.centerGlow} />

      <div style={styles.card}>
        {/* línea roja superior */}
        <div style={styles.topLine} />

        {/* logo */}
        <div style={styles.logoArea}>
          <div style={styles.logoGlow} />
          <img src="/logo.jpg" alt="Pit Bull Club" style={styles.logoImg} />
        </div>

        {/* separador */}
        <div style={styles.divider}>
          <div style={styles.divLine} />
          <span style={styles.divText}>ACCESO AL SISTEMA</span>
          <div style={styles.divLine} />
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>CÉDULA / USUARIO</label>
            <input
              style={styles.input}
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              placeholder="Nro. de cédula"
              required autoFocus
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>CONTRASEÑA</label>
            <input
              style={styles.input}
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          {error && <div style={styles.error}>⚠ {error}</div>}

          <button style={styles.btn} disabled={loading}>
            {loading ? 'VERIFICANDO...' : 'INGRESAR'}
          </button>
        </form>

        {/* footer */}
        <div style={styles.footer}>
          <span style={styles.footerText}>PIT BULL CLUB PARAGUAY</span>
        </div>

        {/* línea roja inferior */}
        <div style={styles.topLine} />
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'radial-gradient(ellipse at center, #0e0808 0%, #050505 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  centerGlow: {
    position: 'fixed',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400, height: 400,
    background: 'radial-gradient(circle, rgba(204,17,0,0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  card: {
    background: '#0d0d0d',
    border: '1px solid #1e1e1e',
    borderRadius: 4,
    width: 380,
    overflow: 'hidden',
    position: 'relative', zIndex: 1,
    boxShadow: '0 0 60px rgba(0,0,0,0.8), 0 0 20px rgba(204,17,0,0.05)',
  },
  topLine: {
    height: 2,
    background: 'linear-gradient(90deg, transparent, #CC1100, transparent)',
  },
  logoArea: {
    textAlign: 'center', padding: '28px 24px 18px',
    position: 'relative',
  },
  logoGlow: {
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 160, height: 160,
    background: 'radial-gradient(circle, rgba(204,17,0,0.1) 0%, transparent 70%)',
    borderRadius: '50%',
  },
  logoImg: {
    width: '100%', maxWidth: 220, borderRadius: 4,
    position: 'relative', zIndex: 1,
    filter: 'drop-shadow(0 0 16px rgba(204,17,0,0.2))',
  },
  divider: {
    display: 'flex', alignItems: 'center',
    gap: 10, padding: '0 24px 20px',
  },
  divLine: { flex: 1, height: 1, background: '#1e1e1e' },
  divText: { color: '#333', fontSize: 9, letterSpacing: 3, fontWeight: 700, whiteSpace: 'nowrap' },
  form: {
    display: 'flex', flexDirection: 'column',
    gap: 14, padding: '0 24px',
  },
  field: { display: 'flex', flexDirection: 'column', gap: 5 },
  label: { color: '#444', fontSize: 10, letterSpacing: 2, fontWeight: 700 },
  input: {
    padding: '11px 14px',
    background: '#080808',
    border: '1px solid #1e1e1e',
    borderRadius: 2, color: '#e0e0e0',
    fontSize: 15, outline: 'none',
  },
  error: {
    background: 'rgba(204,17,0,0.1)',
    border: '1px solid rgba(204,17,0,0.3)',
    color: '#ff6060', padding: '10px 14px',
    borderRadius: 2, fontSize: 12, letterSpacing: 0.5,
  },
  btn: {
    padding: '13px',
    background: '#CC1100',
    border: 'none', borderRadius: 2,
    color: '#fff', fontWeight: 800,
    fontSize: 13, letterSpacing: 3,
    cursor: 'pointer',
    boxShadow: '0 0 20px rgba(204,17,0,0.25)',
  },
  footer: {
    textAlign: 'center',
    padding: '20px 24px 18px',
  },
  footerText: { color: '#2a2a2a', fontSize: 9, letterSpacing: 4, fontWeight: 700 },
}
