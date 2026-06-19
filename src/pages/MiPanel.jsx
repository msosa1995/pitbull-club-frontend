import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { getMisPerros, getMisCamadas } from '../api'

export default function MiPanel() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [perros, setPerros] = useState([])
  const [camadas, setCamadas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getMisPerros(), getMisCamadas()])
      .then(([p, c]) => { setPerros(p.data); setCamadas(c.data) })
      .finally(() => setLoading(false))
  }, [])

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.goldLine} />
        <div style={styles.logoWrap}>
          <img src="/logo.jpg" alt="Pit Bull Club" style={styles.logo} />
        </div>
        <div style={styles.clubLabel}>MI PANEL</div>

        <nav style={styles.nav}>
          <SideLink to="/mi-panel" icon="▦" label="INICIO" />
          <SideLink to="/mis-perros" icon="🐕" label="MIS PERROS" />
          <SideLink to="/mis-camadas" icon="🐾" label="MIS CAMADAS" />
          <SideLink to="/cambiar-password" icon="🔑" label="CONTRASEÑA" />
        </nav>

        <div style={{ flex: 1 }} />
        <Link to="/" style={styles.publicLink}>🌐 VER SITIO PÚBLICO ↗</Link>
        <button onClick={handleLogout} style={styles.logout}>CERRAR SESIÓN</button>
        <div style={styles.goldLine} />
      </aside>

      {/* Contenido */}
      <main style={styles.main}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <div style={styles.welcome}>Bienvenido,</div>
            <div style={styles.nombre}>{user?.nombre || user?.username}</div>
          </div>
        </div>

        {/* Cards resumen */}
        <div style={styles.cards}>
          <ResumenCard
            icon="🐕" label="MIS PERROS"
            value={loading ? '...' : perros.length}
            sub="registrados"
            to="/mis-perros"
          />
          <ResumenCard
            icon="🐾" label="MIS CAMADAS"
            value={loading ? '...' : camadas.length}
            sub="registradas"
            to="/mis-camadas"
          />
          <ResumenCard
            icon="🐶" label="CACHORROS"
            value={loading ? '...' : camadas.reduce((s, c) => s + (c.cantidad_total || 0), 0)}
            sub="en total"
            to="/mis-camadas"
          />
        </div>

        {/* Acciones rápidas */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>ACCIONES RÁPIDAS</div>
          <div style={styles.acciones}>
            <AccionCard to="/mis-perros/nuevo" icon="➕" label="Registrar nuevo perro" />
            <AccionCard to="/mis-camadas/nuevo" icon="➕" label="Registrar camada" />
            <AccionCard to="/cambiar-password" icon="🔑" label="Cambiar contraseña" />
          </div>
        </div>

        {/* Últimos perros */}
        {perros.length > 0 && (
          <div style={styles.section}>
            <div style={styles.sectionTitle}>MIS PERROS</div>
            <div style={styles.perrosList}>
              {perros.slice(0, 5).map(p => (
                <div key={p.id} style={styles.perroRow}>
                  <div style={styles.perroInfo}>
                    <span style={styles.perroNombre}>{p.nombre}</span>
                    <span style={styles.perroMeta}>{p.raza_display} · {p.sexo_display} · {p.color}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Link to={`/mis-perros/${p.id}/editar`} style={styles.editBtn}>Editar</Link>
                  </div>
                </div>
              ))}
              {perros.length > 5 && (
                <Link to="/mis-perros" style={styles.verTodos}>Ver todos ({perros.length})</Link>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function SideLink({ to, icon, label }) {
  const { pathname } = window.location
  const active = pathname === to
  return (
    <Link to={to} style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 20px', fontSize: 11, fontWeight: 700,
      letterSpacing: 1.5, textDecoration: 'none',
      color: active ? '#C4956A' : '#888',
      background: active ? 'rgba(196,149,106,0.1)' : 'transparent',
      borderLeft: active ? '3px solid #C4956A' : '3px solid transparent',
    }}>
      <span>{icon}</span><span>{label}</span>
    </Link>
  )
}

function ResumenCard({ icon, label, value, sub, to }) {
  return (
    <Link to={to} style={styles.resumenCard}>
      <div style={styles.resumenIcon}>{icon}</div>
      <div style={styles.resumenValue}>{value}</div>
      <div style={styles.resumenLabel}>{label}</div>
      <div style={styles.resumenSub}>{sub}</div>
    </Link>
  )
}

function AccionCard({ to, icon, label }) {
  return (
    <Link to={to} style={styles.accionCard}>
      <span style={{ fontSize: 22 }}>{icon}</span>
      <span style={{ color: '#ccc', fontSize: 13 }}>{label}</span>
    </Link>
  )
}

const styles = {
  page: { display: 'flex', minHeight: '100vh', background: '#060606' },
  sidebar: {
    width: 220, minHeight: '100vh', background: '#040404',
    borderRight: '1px solid #1a1a1a', display: 'flex', flexDirection: 'column',
    position: 'fixed', top: 0, left: 0, zIndex: 100,
  },
  goldLine: { height: 1, background: 'linear-gradient(90deg, transparent, #C4956A66, transparent)' },
  logoWrap: { padding: '20px 16px 12px', textAlign: 'center' },
  logo: { width: '100%', maxWidth: 160, borderRadius: 4 },
  clubLabel: { color: '#444', fontSize: 9, letterSpacing: 3, fontWeight: 700, textAlign: 'center', paddingBottom: 14, borderBottom: '1px solid #1a1a1a' },
  nav: { display: 'flex', flexDirection: 'column', gap: 1, paddingTop: 16 },
  publicLink: { display: 'block', padding: '10px 20px', color: '#555', fontSize: 10, fontWeight: 700, letterSpacing: 1, textDecoration: 'none' },
  logout: { margin: '8px 14px 16px', padding: 9, background: 'transparent', border: '1px solid #1e1e1e', borderRadius: 2, color: '#444', fontSize: 10, letterSpacing: 2, fontWeight: 700, cursor: 'pointer' },
  main: { marginLeft: 220, flex: 1, padding: '36px 32px', maxWidth: '900px' },
  header: { marginBottom: 32 },
  welcome: { color: '#555', fontSize: 13 },
  nombre: { color: '#C4956A', fontSize: 26, fontWeight: 800, letterSpacing: 1 },
  cards: { display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' },
  resumenCard: {
    flex: 1, minWidth: 140, background: '#111', border: '1px solid #1e1e1e', borderRadius: 10,
    padding: '20px 16px', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
    transition: 'border-color 0.2s',
  },
  resumenIcon: { fontSize: 28, marginBottom: 4 },
  resumenValue: { color: '#C4956A', fontSize: 32, fontWeight: 800 },
  resumenLabel: { color: '#888', fontSize: 10, letterSpacing: 2, fontWeight: 700 },
  resumenSub: { color: '#555', fontSize: 11 },
  section: { marginBottom: 32 },
  sectionTitle: { color: '#C4956A', fontSize: 11, letterSpacing: 2, fontWeight: 800, marginBottom: 14, paddingLeft: 2 },
  acciones: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  accionCard: {
    display: 'flex', alignItems: 'center', gap: 12,
    background: '#111', border: '1px solid #1e1e1e', borderRadius: 8,
    padding: '14px 20px', textDecoration: 'none', minWidth: 200,
    transition: 'border-color 0.2s',
  },
  perrosList: { background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, overflow: 'hidden' },
  perroRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid #161616' },
  perroInfo: { display: 'flex', flexDirection: 'column', gap: 3 },
  perroNombre: { color: '#e0e0e0', fontWeight: 700, fontSize: 14 },
  perroMeta: { color: '#555', fontSize: 12 },
  editBtn: { padding: '6px 14px', background: 'rgba(196,149,106,0.1)', border: '1px solid #C4956A', borderRadius: 4, color: '#C4956A', fontSize: 11, fontWeight: 700, textDecoration: 'none', letterSpacing: 1 },
  verTodos: { display: 'block', padding: '12px 20px', color: '#C4956A', fontSize: 12, textDecoration: 'none', textAlign: 'center' },
}
