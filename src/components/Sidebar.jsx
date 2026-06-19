import { NavLink, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import PawIcon from './PawIcon'

const adminNav = [
  { to: '/panel',        label: 'Dashboard',   icon: '▦' },
  { to: '/integrantes',  label: 'Integrantes', icon: '👥' },
  { to: '/perros',       label: 'Perros',      icon: '🐕' },
]

export default function Sidebar() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const handleLogout = () => { logout(); navigate('/login') }
  const nav = adminNav

  return (
    <aside style={styles.sidebar}>
      {/* línea dorada superior */}
      <div style={styles.goldLine} />

      {/* logo */}
      <div style={styles.logoWrap}>
        <div style={styles.logoGlow} />
        <img src="/logo.jpg" alt="Pit Bull Club" style={styles.logoImg} />
      </div>

      {/* etiqueta */}
      <div style={styles.clubLabel}>
        <span style={styles.clubDash}>—</span>
        <span style={styles.clubText}>PANEL ADMIN</span>
        <span style={styles.clubDash}>—</span>
      </div>

      {/* navegación */}
      <nav style={styles.nav}>
        {nav.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/panel'}
            style={({ isActive }) => ({
              ...styles.link,
              background: isActive ? 'rgba(196,149,106,0.1)' : 'transparent',
              color: isActive ? '#C4956A' : '#888',
              borderLeft: isActive ? '3px solid #C4956A' : '3px solid transparent',
            })}
          >
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            <span style={{ letterSpacing: 1 }}>{item.label.toUpperCase()}</span>
          </NavLink>
        ))}
      </nav>

      {/* separador */}
      <div style={styles.separator} />

      {/* link al sitio público */}
      <Link to="/" style={styles.publicLink}>
        <span>🌐</span>
        <span style={{ letterSpacing: 1, fontSize: 10 }}>VER SITIO PÚBLICO</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, opacity: 0.5 }}>↗</span>
      </Link>

      {/* paw row decorativo */}
      <div style={styles.pawRow}>
        <PawIcon size={14} color="#C4956A" opacity={0.2} rotate={-10} />
        <PawIcon size={14} color="#C4956A" opacity={0.2} />
        <PawIcon size={14} color="#C4956A" opacity={0.2} rotate={10} />
      </div>

      {/* logout */}
      <button onClick={handleLogout} style={styles.logout}>
        CERRAR SESIÓN
      </button>

      {/* línea dorada inferior */}
      <div style={styles.goldLine} />
    </aside>
  )
}

const styles = {
  sidebar: {
    width: 'var(--sidebar-w)',
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #040404 0%, #080808 100%)',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: 0, left: 0,
    zIndex: 100,
    borderRight: '1px solid #1a1a1a',
  },
  goldLine: {
    height: 1,
    background: 'linear-gradient(90deg, transparent, #C4956A66, transparent)',
  },
  logoWrap: {
    padding: '22px 16px 18px',
    textAlign: 'center',
    position: 'relative',
  },
  logoGlow: {
    position: 'absolute',
    top: '50%', left: '50%',
    transform: 'translate(-50%,-50%)',
    width: 120, height: 120,
    background: 'radial-gradient(circle, rgba(196,149,106,0.12) 0%, transparent 70%)',
    borderRadius: '50%',
    pointerEvents: 'none',
  },
  logoImg: {
    width: '100%',
    maxWidth: 190,
    borderRadius: 4,
    position: 'relative',
    zIndex: 1,
    filter: 'drop-shadow(0 0 12px rgba(196,149,106,0.18))',
  },
  clubLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '4px 0 14px',
    borderBottom: '1px solid #1a1a1a',
  },
  clubDash: { color: '#C4956A', fontSize: 10 },
  clubText: { color: '#444', fontSize: 9, letterSpacing: 3, fontWeight: 700 },
  nav: {
    flex: 1,
    padding: '18px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 20px',
    fontSize: 11,
    fontWeight: 700,
    transition: 'all 0.15s',
    letterSpacing: 1.5,
    textDecoration: 'none',
  },
  separator: {
    height: 1,
    background: '#111',
    margin: '0 14px 10px',
  },
  publicLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 20px',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 1,
    color: '#555',
    textDecoration: 'none',
    transition: 'color 0.15s',
    marginBottom: 8,
  },
  pawRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 6,
    paddingBottom: 14,
  },
  logout: {
    margin: '0 14px 16px',
    padding: '9px',
    background: 'transparent',
    border: '1px solid #1e1e1e',
    borderRadius: 2,
    color: '#444',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
}
