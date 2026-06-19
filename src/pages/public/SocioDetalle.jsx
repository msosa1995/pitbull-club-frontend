import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getSocioPublico } from '../../api'
import PublicLayout from '../../layouts/PublicLayout'
import PitbullSilhouette from '../../components/PitbullSilhouette'

const RAZA_COLOR = { pitbull: '#4a7aaa', bully: '#9a4aaa' }
const RAZA_LABEL = { pitbull: 'APBT', bully: 'BULLY' }

export default function SocioDetalle() {
  const { id } = useParams()
  const [socio, setSocio] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSocioPublico(id)
      .then(r => setSocio(r.data))
      .catch(() => setSocio(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <PublicLayout>
      <div style={s.center}>
        <PitbullSilhouette size={60} opacity={0.15} />
        <span style={{ color: '#444', fontSize: 12, letterSpacing: 2 }}>CARGANDO...</span>
      </div>
    </PublicLayout>
  )

  if (!socio) return (
    <PublicLayout>
      <div style={s.center}>
        <p style={{ color: '#555' }}>Socio no encontrado.</p>
        <Link to="/socios" style={s.backLink}>← Volver a socios</Link>
      </div>
    </PublicLayout>
  )

  const iniciales = socio.nombre.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()

  return (
    <PublicLayout>
      {/* Hero */}
      <div style={s.hero}>
        <div style={s.heroGlow} />
        <div style={s.heroInner}>
          <Link to="/socios" style={s.backLink}>← LISTA DE SOCIOS</Link>

          <div style={s.heroProfile}>
            <div style={s.avatarWrap}>
              {socio.foto_url
                ? <img src={socio.foto_url} alt={socio.nombre} style={s.avatarImg} />
                : <div style={s.avatarPlaceholder}>
                    <span style={s.avatarText}>{iniciales}</span>
                  </div>
              }
            </div>
            <div style={s.heroInfo}>
              {socio.apodo && <div style={s.apodo}>"{socio.apodo}"</div>}
              <h1 style={s.nombre}>{socio.nombre}</h1>
              <div style={s.ciudad}>📍 {socio.ciudad}</div>
              <div style={s.perroCuenta}>
                🐕 {socio.total_perros} ejemplar{socio.total_perros !== 1 ? 'es' : ''} registrado{socio.total_perros !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Perros */}
      <div style={s.content}>
        {socio.perros.length === 0 ? (
          <div style={s.empty}>
            <PitbullSilhouette size={60} opacity={0.1} />
            <p style={{ color: '#444' }}>Este socio aún no tiene ejemplares registrados.</p>
          </div>
        ) : (
          <>
            <div style={s.sectionTitle}>EJEMPLARES</div>
            <div style={s.perrosGrid}>
              {socio.perros.map(p => {
                const color = RAZA_COLOR[p.raza] || '#C4956A'
                const label = RAZA_LABEL[p.raza] || ''
                return (
                  <Link key={p.id} to={`/ejemplares/${p.id}`} style={s.perroCard}>
                    <div style={{ ...s.perroFoto, background: color + '15' }}>
                      {p.foto_url
                        ? <img src={p.foto_url} alt={p.nombre} style={s.perroImg} />
                        : <PitbullSilhouette size={60} opacity={0.15} />
                      }
                      <div style={{ ...s.razaBadge, background: color }}>{label}</div>
                      {p.tiene_registro && <div style={s.pedigreeBadge}>📋</div>}
                    </div>
                    <div style={s.perroBody}>
                      <div style={s.perroNombre}>{p.nombre}</div>
                      <div style={s.perroMeta}>{p.sexo_display} · {p.color}</div>
                      {p.kennel && <div style={{ ...s.perroMeta, color: '#C4956A' }}>{p.kennel}</div>}
                      {p.total_camadas > 0 && (
                        <div style={s.camadasBadge}>🐣 {p.total_camadas} camada{p.total_camadas !== 1 ? 's' : ''}</div>
                      )}
                    </div>
                    <div style={{ ...s.perroAccent, background: color }} />
                  </Link>
                )
              })}
            </div>
          </>
        )}
      </div>
    </PublicLayout>
  )
}

const s = {
  center: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '120px 0' },
  backLink: { color: '#555', fontSize: 10, fontWeight: 700, letterSpacing: 2, textDecoration: 'none', display: 'block', marginBottom: 20 },

  hero: { padding: '90px 48px 48px', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #111', background: '#060606' },
  heroGlow: { position: 'absolute', top: '50%', left: '40%', transform: 'translate(-50%,-50%)', width: 500, height: 300, background: 'radial-gradient(ellipse, rgba(196,149,106,0.05) 0%, transparent 70%)', pointerEvents: 'none' },
  heroInner: { maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 },

  heroProfile: { display: 'flex', gap: 36, alignItems: 'center', flexWrap: 'wrap' },
  avatarWrap: { width: 110, height: 110, borderRadius: '50%', overflow: 'hidden', border: '2px solid #C4956A44', flexShrink: 0 },
  avatarImg: { width: '100%', height: '100%', objectFit: 'cover' },
  avatarPlaceholder: { width: '100%', height: '100%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#C4956A', fontSize: 38, fontWeight: 900 },

  heroInfo: {},
  apodo: { color: '#C4956A', fontSize: 13, fontStyle: 'italic', marginBottom: 4 },
  nombre: { color: '#f0f0f0', fontSize: 'clamp(24px,3vw,40px)', fontWeight: 900, letterSpacing: 2, margin: '0 0 8px' },
  ciudad: { color: '#555', fontSize: 13, marginBottom: 6 },
  perroCuenta: { color: '#888', fontSize: 13 },

  content: { maxWidth: 1100, margin: '0 auto', padding: '40px 48px 80px' },
  sectionTitle: { color: '#444', fontSize: 9, fontWeight: 700, letterSpacing: 3, marginBottom: 20 },
  empty: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '60px 0' },

  perrosGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 },
  perroCard: { background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 3, overflow: 'hidden', textDecoration: 'none', display: 'flex', flexDirection: 'column', transition: 'border-color 0.15s' },
  perroFoto: { height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' },
  perroImg: { width: '100%', height: '100%', objectFit: 'cover' },
  razaBadge: { position: 'absolute', top: 8, left: 8, padding: '3px 7px', fontSize: 9, fontWeight: 700, letterSpacing: 1, color: '#fff', borderRadius: 2 },
  pedigreeBadge: { position: 'absolute', top: 8, right: 8, fontSize: 15 },
  perroBody: { padding: '12px 14px', flex: 1 },
  perroNombre: { color: '#f0f0f0', fontWeight: 800, fontSize: 15, marginBottom: 4 },
  perroMeta: { color: '#666', fontSize: 11, marginBottom: 2 },
  camadasBadge: { color: '#C4956A', fontSize: 10, fontWeight: 700, marginTop: 6 },
  perroAccent: { height: 2, opacity: 0.4 },
}
