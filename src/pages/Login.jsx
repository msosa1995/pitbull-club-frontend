import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { verificarCI, activarCuenta, login as apiLogin } from '../api'
import PitbullSilhouette from '../components/PitbullSilhouette'

const PASO = { CI: 'ci', PASSWORD: 'password', ACTIVAR: 'activar' }

const normalizarTel = (n) => n.replace(/[\s\-.()\+]/g, '')

export default function Login() {
  const { login, loginConTokens } = useAuth()
  const navigate = useNavigate()
  const [paso, setPaso] = useState(PASO.CI)
  const [ci, setCi] = useState('')
  const [nombre, setNombre] = useState('')
  const [tipo, setTipo] = useState('miembro')
  const [password, setPassword] = useState('')
  const [passwordNueva, setPasswordNueva] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleVerificarCI = async e => {
    e.preventDefault()
    setError('')
    if (!ci.trim()) { setError('Ingresá tu número de WhatsApp'); return }
    setLoading(true)
    try {
      const res = await verificarCI(ci.trim())
      setNombre(res.data.nombre)
      setTipo(res.data.tipo)
      setPaso(res.data.primer_ingreso ? PASO.ACTIVAR : PASO.PASSWORD)
    } catch (err) {
      setError(err.response?.data?.error || 'CI no encontrada en el registro del club')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const username = tipo === 'admin' ? ci.trim() : `tel_${normalizarTel(ci.trim())}`
      await login(username, password)
      navigate(tipo === 'admin' ? '/panel' : '/mi-panel')
    } catch {
      setError('Contraseña incorrecta')
    } finally {
      setLoading(false)
    }
  }

  const handleActivar = async e => {
    e.preventDefault()
    setError('')
    if (passwordNueva !== passwordConfirm) { setError('Las contraseñas no coinciden'); return }
    if (passwordNueva.length < 6) { setError('Mínimo 6 caracteres'); return }
    setLoading(true)
    try {
      const res = await activarCuenta(ci.trim(), passwordNueva)
      await loginConTokens(res.data.access, res.data.refresh)
      navigate('/mi-panel')
    } catch (err) {
      setError(err.response?.data?.error || 'Error al activar cuenta')
    } finally {
      setLoading(false)
    }
  }

  const volver = () => {
    setPaso(PASO.CI); setPassword(''); setPasswordNueva(''); setPasswordConfirm(''); setError('')
  }

  return (
    <div style={s.page}>
      <div style={{ position: 'fixed', bottom: -20, left: -30 }}>
        <PitbullSilhouette size={300} opacity={0.08} />
      </div>
      <div style={{ position: 'fixed', top: -20, right: -30 }}>
        <PitbullSilhouette size={280} opacity={0.06} />
      </div>
      <div style={s.glow} />

      <div style={s.card}>
        <div style={s.line} />
        <div style={s.logoArea}>
          <div style={s.logoGlow} />
          <img src="/logo.jpg" alt="Pit Bull Club" style={s.logo} />
        </div>

        {paso === PASO.CI && (
          <>
            <Divider text="ACCESO AL SISTEMA" />
            <form onSubmit={handleVerificarCI} style={s.form}>
              <Field label="WHATSAPP / TELÉFONO" value={ci} onChange={setCi}
                placeholder="Ej: 0981-427-603" autoFocus />
              {error && <Error msg={error} />}
              <button style={s.btn} disabled={loading}>
                {loading ? 'VERIFICANDO...' : 'CONTINUAR →'}
              </button>
              <p style={s.hint}>Usá el número de WhatsApp registrado en el club.</p>
            </form>
          </>
        )}

        {paso === PASO.PASSWORD && (
          <>
            <Bienvenida nombre={nombre} sub="Ingresá tu contraseña para continuar." />
            <form onSubmit={handleLogin} style={s.form}>
              <Field label="CONTRASEÑA" type="password" value={password}
                onChange={setPassword} autoFocus />
              {error && <Error msg={error} />}
              <button style={s.btn} disabled={loading}>
                {loading ? 'INGRESANDO...' : 'INGRESAR'}
              </button>
              <button type="button" style={s.backBtn} onClick={volver}>← Cambiar número</button>
            </form>
          </>
        )}

        {paso === PASO.ACTIVAR && (
          <>
            <Bienvenida nombre={nombre} sub="Es tu primer acceso. Creá tu contraseña." primer />
            <form onSubmit={handleActivar} style={s.form}>
              <Field label="NUEVA CONTRASEÑA" type="password" value={passwordNueva}
                onChange={setPasswordNueva} placeholder="Mínimo 6 caracteres" autoFocus />
              <Field label="CONFIRMAR CONTRASEÑA" type="password" value={passwordConfirm}
                onChange={setPasswordConfirm} />
              {error && <Error msg={error} />}
              <button style={s.btn} disabled={loading}>
                {loading ? 'ACTIVANDO...' : 'ACTIVAR MI CUENTA'}
              </button>
              <button type="button" style={s.backBtn} onClick={volver}>← Cambiar número</button>
            </form>
          </>
        )}

        <div style={s.footer}>PIT BULL CLUB PARAGUAY</div>
        <div style={s.line} />
      </div>
    </div>
  )
}

function Divider({ text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 24px 16px' }}>
      <div style={{ flex: 1, height: 1, background: '#1e1e1e' }} />
      <span style={{ color: '#333', fontSize: 9, letterSpacing: 3, fontWeight: 700 }}>{text}</span>
      <div style={{ flex: 1, height: 1, background: '#1e1e1e' }} />
    </div>
  )
}

function Bienvenida({ nombre, sub, primer }) {
  return (
    <div style={{ textAlign: 'center', padding: '4px 24px 20px' }}>
      <div style={{ color: '#555', fontSize: 12 }}>{primer ? 'Bienvenido,' : 'Hola,'}</div>
      <div style={{ color: '#C4956A', fontSize: 20, fontWeight: 800, letterSpacing: 1 }}>{nombre}</div>
      <div style={{ color: '#666', fontSize: 11, marginTop: 4 }}>{sub}</div>
    </div>
  )
}

function Field({ label, type = 'text', value, onChange, placeholder, autoFocus }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label style={{ color: '#444', fontSize: 10, letterSpacing: 2, fontWeight: 700 }}>{label}</label>
      <input style={s.input} type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} autoFocus={autoFocus} required />
    </div>
  )
}

function Error({ msg }) {
  return (
    <div style={{ background: 'rgba(204,17,0,0.1)', border: '1px solid rgba(204,17,0,0.3)', color: '#ff6060', padding: '10px 14px', borderRadius: 2, fontSize: 12 }}>
      ⚠ {msg}
    </div>
  )
}

const s = {
  page: { minHeight: '100vh', background: 'radial-gradient(ellipse at center, #0e0808 0%, #050505 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  glow: { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, height: 400, background: 'radial-gradient(circle, rgba(196,149,106,0.06) 0%, transparent 70%)', pointerEvents: 'none' },
  card: { background: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: 4, width: 380, overflow: 'hidden', position: 'relative', zIndex: 1, boxShadow: '0 0 60px rgba(0,0,0,0.8)' },
  line: { height: 2, background: 'linear-gradient(90deg, transparent, #C4956A, transparent)' },
  logoArea: { textAlign: 'center', padding: '24px 24px 16px', position: 'relative' },
  logoGlow: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 160, height: 160, background: 'radial-gradient(circle, rgba(196,149,106,0.1) 0%, transparent 70%)', borderRadius: '50%' },
  logo: { width: '100%', maxWidth: 200, borderRadius: 4, position: 'relative', zIndex: 1, filter: 'drop-shadow(0 0 16px rgba(196,149,106,0.2))' },
  form: { display: 'flex', flexDirection: 'column', gap: 14, padding: '0 24px 8px' },
  input: { padding: '11px 14px', background: '#080808', border: '1px solid #1e1e1e', borderRadius: 2, color: '#e0e0e0', fontSize: 15, outline: 'none' },
  btn: { padding: 13, background: '#C4956A', border: 'none', borderRadius: 2, color: '#000', fontWeight: 800, fontSize: 13, letterSpacing: 3, cursor: 'pointer' },
  backBtn: { background: 'none', border: 'none', color: '#444', fontSize: 11, cursor: 'pointer', letterSpacing: 1, padding: '4px 0' },
  hint: { color: '#333', fontSize: 11, textAlign: 'center', margin: 0 },
  footer: { textAlign: 'center', padding: '16px 24px 14px', color: '#2a2a2a', fontSize: 9, letterSpacing: 4, fontWeight: 700 },
}
