import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

const NAV_LINKS = [
  { to: '/club', label: 'EL CLUB' },
  { to: '/socios', label: 'SOCIOS' },
  { to: '/ejemplares', label: 'EJEMPLARES' },
  { to: '/eventos', label: 'EVENTOS' },
  { to: '/campeonatos', label: 'CAMPEONATOS' },
  { to: '/mapa', label: 'MAPA' },
  { to: '/contacto', label: 'CONTACTO' },
]

const RAZAS_LINKS = [
  { to: '/razas/pitbull', label: 'American Pit Bull Terrier' },
  { to: '/razas/bully', label: 'American Bully' },
]

export default function PublicLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [razasOpen, setRazasOpen] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div style={styles.page}>
      {/* ═══ NAVBAR ═══ */}
      <header style={styles.header}>
        {/* línea dorada superior */}
        <div style={styles.goldLine} />

        <nav style={styles.nav}>
          {/* Logo + Brand */}
          <Link to="/" style={styles.brand}>
            <img src="/logo.jpg" alt="Pit Bull Club" style={styles.logo} />
            <div style={styles.brandText}>
              <span style={styles.brandName}>PIT BULL CLUB</span>
              <span style={styles.brandCountry}>PARAGUAY</span>
            </div>
          </Link>

          {/* Links centrales (desktop) */}
          <div style={styles.navLinks}>
            {/* Razas con dropdown */}
            <div
              style={styles.dropdownWrap}
              onMouseEnter={() => setRazasOpen(true)}
              onMouseLeave={() => setRazasOpen(false)}
            >
              <button style={styles.dropdownTrigger}>
                RAZAS <span style={{ fontSize: 8 }}>▼</span>
              </button>
              {razasOpen && (
                <div style={styles.dropdown}>
                  {RAZAS_LINKS.map(l => (
                    <Link key={l.to} to={l.to} style={styles.dropdownItem}
                      onClick={() => setRazasOpen(false)}>
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {NAV_LINKS.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                style={({ isActive }) => ({
                  ...styles.navLink,
                  color: isActive ? '#C4956A' : '#888',
                  borderBottom: isActive ? '1px solid #C4956A' : '1px solid transparent',
                })}
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Botón panel admin */}
          <div style={styles.navRight}>
            {user ? (
              <button onClick={() => navigate('/panel')} style={styles.adminBtn}>
                PANEL ADMIN
              </button>
            ) : (
              <Link to="/login" style={styles.adminBtn}>
                ÁREA PRIVADA
              </Link>
            )}
            {/* Hamburger (mobile) */}
            <button style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </nav>

        {/* Menú mobile */}
        {menuOpen && (
          <div style={styles.mobileMenu}>
            <Link to="/razas/pitbull" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>American Pit Bull Terrier</Link>
            <Link to="/razas/bully" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>American Bully</Link>
            {NAV_LINKS.map(l => (
              <Link key={l.to} to={l.to} style={styles.mobileLink} onClick={() => setMenuOpen(false)}>
                {l.label}
              </Link>
            ))}
            {user
              ? <Link to="/panel" style={{ ...styles.mobileLink, color: '#C4956A' }} onClick={() => setMenuOpen(false)}>PANEL ADMIN</Link>
              : <Link to="/login" style={{ ...styles.mobileLink, color: '#C4956A' }} onClick={() => setMenuOpen(false)}>ÁREA PRIVADA</Link>
            }
          </div>
        )}
      </header>

      {/* ═══ CONTENIDO ═══ */}
      <main style={styles.main}>{children}</main>

      {/* ═══ FOOTER ═══ */}
      <footer style={styles.footer}>
        <div style={styles.goldLine} />
        <div style={styles.footerInner}>
          <div style={styles.footerLeft}>
            <img src="/logo.jpg" alt="Pit Bull Club" style={{ width: 50, borderRadius: 3 }} />
            <div>
              <div style={styles.footerName}>PIT BULL CLUB PARAGUAY</div>
              <div style={styles.footerSlogan}>La Casa del Deporte Canino</div>
            </div>
          </div>
          <div style={styles.footerLinks}>
            <Link to="/club" style={styles.footerLink}>El Club</Link>
            <Link to="/razas/pitbull" style={styles.footerLink}>APBT</Link>
            <Link to="/razas/bully" style={styles.footerLink}>American Bully</Link>
            <Link to="/ejemplares" style={styles.footerLink}>Ejemplares</Link>
            <Link to="/eventos" style={styles.footerLink}>Eventos</Link>
            <Link to="/contacto" style={styles.footerLink}>Contacto</Link>
          </div>
          <div style={styles.footerCopy}>
            © {new Date().getFullYear()} Pit Bull Club Paraguay.<br />
            Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#060606',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    background: 'rgba(6,6,6,0.96)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid #1a1a1a',
    zIndex: 1000,
  },
  goldLine: {
    height: 1,
    background: 'linear-gradient(90deg, transparent, #C4956A44, #C4956A, #C4956A44, transparent)',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    height: 64,
    maxWidth: 1400,
    margin: '0 auto',
    width: '100%',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    textDecoration: 'none',
  },
  logo: {
    width: 44,
    height: 44,
    objectFit: 'contain',
    borderRadius: 3,
    filter: 'drop-shadow(0 0 8px rgba(196,149,106,0.3))',
  },
  brandText: {
    display: 'flex',
    flexDirection: 'column',
  },
  brandName: {
    color: '#f0f0f0',
    fontSize: 14,
    fontWeight: 900,
    letterSpacing: 3,
    lineHeight: 1.1,
  },
  brandCountry: {
    color: '#C4956A',
    fontSize: 8,
    letterSpacing: 4,
    fontWeight: 700,
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  navLink: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 2,
    padding: '8px 12px',
    textDecoration: 'none',
    transition: 'all 0.15s',
    paddingBottom: 7,
  },
  dropdownWrap: {
    position: 'relative',
  },
  dropdownTrigger: {
    background: 'transparent',
    border: 'none',
    color: '#888',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 2,
    padding: '8px 12px',
    cursor: 'pointer',
    transition: 'color 0.15s',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    background: '#0d0d0d',
    border: '1px solid #1e1e1e',
    borderTop: '1px solid #C4956A',
    minWidth: 220,
    zIndex: 200,
  },
  dropdownItem: {
    display: 'block',
    padding: '12px 16px',
    color: '#888',
    fontSize: 12,
    textDecoration: 'none',
    borderBottom: '1px solid #111',
    transition: 'all 0.1s',
    letterSpacing: 0.5,
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  adminBtn: {
    background: 'transparent',
    border: '1px solid #C4956A44',
    color: '#C4956A',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 2,
    padding: '7px 16px',
    borderRadius: 2,
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.15s',
  },
  hamburger: {
    display: 'none',
    background: 'transparent',
    border: 'none',
    color: '#888',
    fontSize: 20,
    cursor: 'pointer',
    padding: '4px 8px',
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
    background: '#0a0a0a',
    borderTop: '1px solid #1e1e1e',
    padding: '8px 0',
  },
  mobileLink: {
    display: 'block',
    padding: '14px 28px',
    color: '#888',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 2,
    textDecoration: 'none',
    borderBottom: '1px solid #111',
  },
  main: {
    flex: 1,
    paddingTop: 66,
  },
  footer: {
    background: '#050505',
    borderTop: '1px solid #111',
    marginTop: 'auto',
  },
  footerInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 24,
    padding: '28px 40px',
    maxWidth: 1400,
    margin: '0 auto',
  },
  footerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
  },
  footerName: {
    color: '#f0f0f0',
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: 2,
  },
  footerSlogan: {
    color: '#555',
    fontSize: 11,
    letterSpacing: 1,
    marginTop: 2,
  },
  footerLinks: {
    display: 'flex',
    gap: 20,
    flexWrap: 'wrap',
  },
  footerLink: {
    color: '#555',
    fontSize: 11,
    textDecoration: 'none',
    letterSpacing: 1,
    transition: 'color 0.1s',
  },
  footerCopy: {
    color: '#333',
    fontSize: 10,
    letterSpacing: 0.5,
    lineHeight: 1.6,
    textAlign: 'right',
  },
}
