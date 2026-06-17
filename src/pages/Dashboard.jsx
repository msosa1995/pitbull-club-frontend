import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getStats } from '../api'
import Layout from '../components/Layout'
import PawIcon from '../components/PawIcon'
import PitbullSilhouette from '../components/PitbullSilhouette'

const statConfig = [
  { key: 'activos',           label: 'MIEMBROS ACTIVOS',  color: '#CC1100', icon: '🔴' },
  { key: 'total_integrantes', label: 'TOTAL INTEGRANTES', color: '#C4956A', icon: '👥' },
  { key: 'total_perros',      label: 'PERROS',            color: '#C4956A', icon: '🐕' },
  { key: 'pitbulls',          label: 'PIT BULL TERRIER',  color: '#4a7aaa', icon: '💪' },
  { key: 'bullys',            label: 'AMERICAN BULLY',    color: '#aa4a7a', icon: '⭐' },
  { key: 'con_registro',      label: 'CON PEDIGREE',      color: '#6aaa4a', icon: '📋' },
]

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  useEffect(() => { getStats().then(r => setStats(r.data)).catch(() => {}) }, [])

  return (
    <Layout>

      {/* ══ HERO BANNER ══ */}
      <div style={styles.hero}>
        {/* glow rojo de fondo */}
        <div style={styles.redGlow} />
        <div style={styles.redGlowRight} />

        {/* pitbull grande derecha */}
        <div style={{ position: 'absolute', right: -10, top: -10, zIndex: 1 }}>
          <PitbullSilhouette size={200} opacity={0.14} />
        </div>
        {/* pitbull pequeño izquierda espejado */}
        <div style={{ position: 'absolute', left: -10, bottom: -14, zIndex: 1 }}>
          <PitbullSilhouette size={128} opacity={0.07} style={{ transform: 'scaleX(-1)' }} />
        </div>

        {/* contenido */}
        <div style={styles.heroContent}>
          <img src="/logo.jpg" alt="logo" style={styles.heroLogo} />
          <div>
            <div style={styles.heroPais}>▸ PARAGUAY ◂</div>
            <h1 style={styles.heroTitle}>PIT BULL CLUB</h1>
            <p style={styles.heroSub}>LA CASA DEL DEPORTE CANINO</p>
            <div style={styles.heroLine} />
            <div style={styles.heroTags}>
              <span style={styles.tag}>RAZAS PODEROSAS</span>
              <span style={styles.tagSep}>✦</span>
              <span style={styles.tag}>DEPORTE CANINO</span>
              <span style={styles.tagSep}>✦</span>
              <span style={styles.tag}>DESDE 2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══ STATS ══ */}
      <div style={styles.statsGrid}>
        {statConfig.map(s => (
          <div key={s.key} style={styles.statCard}>
            <div style={{ ...styles.statTop, background: s.color }} />
            <div style={styles.statInner}>
              <div style={{ ...styles.statValue, color: s.color }}>
                {stats ? (stats[s.key] ?? 0) : '—'}
              </div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ══ ACCESOS RÁPIDOS ══ */}
      <SectionHeader>ACCESOS RÁPIDOS</SectionHeader>
      <div style={styles.quickGrid}>
        <QuickCard to="/integrantes/nuevo" color="#CC1100" icon="👤" title="NUEVO INTEGRANTE" desc="Registrar miembro del club" />
        <QuickCard to="/perros/nuevo"      color="#C4956A" icon="🐕" title="NUEVO PERRO"      desc="Registrar Pit Bull o Bully" />
        <QuickCard to="/integrantes"       color="#333"    icon="📋" title="VER INTEGRANTES"  desc="Lista completa de miembros" />
        <QuickCard to="/perros"            color="#333"    icon="🏆" title="VER PERROS"       desc="Directorio del club" />
        <QuickCard to="/"                  color="#4a7aaa" icon="🌐" title="SITIO PÚBLICO"    desc="Ver el sitio web del club" />
      </div>

      {/* ══ RAZAS ══ */}
      <SectionHeader>RAZAS DEL CLUB</SectionHeader>
      <div style={styles.razasGrid}>
        <RazaCard
          nombre="AMERICAN PIT BULL TERRIER"
          desc="Raza atlética y de carácter fuerte. Alta energía, musculatura marcada y lealtad extrema. Considerada raza potencialmente peligrosa en varios países."
          color="#4a7aaa"
          count={stats?.pitbulls}
          tag="APBT"
        />
        <RazaCard
          nombre="AMERICAN BULLY"
          desc="Derivada del APBT. Musculatura extrema, cabeza ancha y poderosa. Variantes: Pocket, Standard, Classic, XL y Extreme."
          color="#aa4a7a"
          count={stats?.bullys}
          tag="BULLY"
        />
      </div>

    </Layout>
  )
}

function SectionHeader({ children }) {
  return (
    <div style={styles.sectionHeader}>
      <div style={styles.sectionLine} />
      <span style={styles.sectionTitle}>{children}</span>
      <div style={styles.sectionLine} />
    </div>
  )
}

function QuickCard({ to, color, icon, title, desc }) {
  return (
    <Link to={to} style={styles.quickCard}>
      <div style={{ ...styles.quickBorder, borderColor: color }} />
      <div style={styles.quickIcon}>{icon}</div>
      <div style={{ ...styles.quickTitle, color: color === '#333' ? '#C4956A' : color }}>{title}</div>
      <div style={styles.quickDesc}>{desc}</div>
    </Link>
  )
}

function RazaCard({ nombre, color, count, desc, tag }) {
  return (
    <div style={styles.razaCard}>
      <div style={{ ...styles.razaTop, borderColor: color }}>
        <div>
          <div style={styles.razaTag}>{tag}</div>
          <div style={{ ...styles.razaNombre, color }}>{nombre}</div>
        </div>
        <div style={{ ...styles.razaCount, border: `1px solid ${color}`, color }}>
          {count ?? 0}
        </div>
      </div>
      <div style={styles.razaDesc}>{desc}</div>
      <div style={{ ...styles.razaBar, background: color }} />
      {/* cabeza pitbull de fondo */}
      <div style={{ position: 'absolute', right: 10, bottom: 5, pointerEvents: 'none' }}>
        <PitbullSilhouette size={90} opacity={0.09} />
      </div>
    </div>
  )
}

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #080808 0%, #0e0e0e 50%, #100808 100%)',
    border: '1px solid #1e1e1e',
    borderLeft: '3px solid #CC1100',
    borderRadius: 4,
    padding: '30px 36px',
    marginBottom: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  redGlow: {
    position: 'absolute', top: -40, left: -40,
    width: 200, height: 200,
    background: 'radial-gradient(circle, rgba(204,17,0,0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  redGlowRight: {
    position: 'absolute', bottom: -30, right: 80,
    width: 180, height: 180,
    background: 'radial-gradient(circle, rgba(196,149,106,0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  heroContent: {
    display: 'flex', alignItems: 'center', gap: 28,
    position: 'relative', zIndex: 2,
  },
  heroLogo: {
    width: 120, height: 120,
    objectFit: 'contain', borderRadius: 4,
    filter: 'drop-shadow(0 0 20px rgba(204,17,0,0.3))',
  },
  heroPais: {
    color: '#CC1100', fontSize: 10, letterSpacing: 4,
    fontWeight: 700, marginBottom: 6,
  },
  heroTitle: {
    color: '#F0F0F0', fontSize: 34,
    fontWeight: 900, letterSpacing: 6, margin: 0,
    textShadow: '0 0 30px rgba(204,17,0,0.2)',
  },
  heroSub: {
    color: '#C4956A', fontSize: 12, letterSpacing: 3, marginTop: 4,
  },
  heroLine: {
    height: 1, background: 'linear-gradient(90deg, #CC1100, transparent)',
    margin: '12px 0', width: 200,
  },
  heroTags: { display: 'flex', alignItems: 'center', gap: 8 },
  tag: { color: '#555', fontSize: 9, letterSpacing: 2, fontWeight: 700 },
  tagSep: { color: '#CC1100', fontSize: 8 },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: 10, marginBottom: 28,
  },
  statCard: {
    background: '#111', border: '1px solid #1e1e1e',
    borderRadius: 3, overflow: 'hidden',
  },
  statTop: { height: 3 },
  statInner: { padding: '16px 14px' },
  statValue: { fontSize: 40, fontWeight: 900, lineHeight: 1 },
  statLabel: { fontSize: 9, color: '#555', marginTop: 6, fontWeight: 700, letterSpacing: 1 },

  sectionHeader: {
    display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14,
  },
  sectionLine: { flex: 1, height: 1, background: '#1e1e1e' },
  sectionTitle: {
    color: '#333', fontSize: 10, fontWeight: 700, letterSpacing: 3,
    whiteSpace: 'nowrap',
  },

  quickGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
    gap: 10, marginBottom: 28,
  },
  quickCard: {
    background: '#111', border: '1px solid #1e1e1e',
    borderRadius: 3, padding: '18px 16px', position: 'relative',
    transition: 'border-color 0.15s',
    display: 'block',
  },
  quickBorder: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
    borderTop: '2px solid',
  },
  quickIcon: { fontSize: 24, marginBottom: 10 },
  quickTitle: { fontSize: 11, fontWeight: 800, letterSpacing: 1.5, marginBottom: 5 },
  quickDesc: { fontSize: 12, color: '#555' },

  razasGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 14, marginBottom: 24,
  },
  razaCard: {
    background: '#111', border: '1px solid #1e1e1e',
    borderRadius: 3, padding: '18px 20px',
    position: 'relative', overflow: 'hidden',
  },
  razaTop: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 12,
    paddingBottom: 12, borderBottom: '1px solid',
  },
  razaTag: { color: '#444', fontSize: 9, letterSpacing: 3, fontWeight: 700, marginBottom: 4 },
  razaNombre: { fontWeight: 800, fontSize: 13, letterSpacing: 1 },
  razaCount: {
    fontSize: 28, fontWeight: 900, padding: '4px 14px',
    borderRadius: 2, lineHeight: 1,
  },
  razaDesc: { fontSize: 13, color: '#555', lineHeight: 1.6, marginBottom: 14 },
  razaBar: { height: 2, borderRadius: 1, opacity: 0.4 },
}
