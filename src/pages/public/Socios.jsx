import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSociosPublico } from '../../api'
import PublicLayout from '../../layouts/PublicLayout'
import PitbullSilhouette from '../../components/PitbullSilhouette'

function initials(nombre) {
  return nombre.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

const AVATAR_COLORS = ['#C4956A','#8B6240','#4a7aaa','#9a4aaa','#5a8a5a','#aa6a4a','#6a7aaa','#aa4a6a']
function avatarColor(nombre) {
  let h = 0
  for (const c of nombre) h = c.charCodeAt(0) + ((h << 5) - h)
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length]
}

export default function Socios() {
  const [socios, setSocios] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const load = (q = '') => {
    setLoading(true)
    getSociosPublico(q ? { search: q } : {})
      .then(r => setSocios(r.data))
      .catch(() => setSocios([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleSearch = e => {
    e.preventDefault()
    load(search)
  }

  const totalPerros = socios.reduce((s, m) => s + m.total_perros, 0)

  return (
    <PublicLayout>
      {/* Header */}
      <div style={s.hero}>
        <div style={s.heroGlow} />
        <div style={s.heroInner}>
          <div style={s.badge}>DIRECTORIO OFICIAL</div>
          <h1 style={s.title}>LISTA DE <span style={{ color: '#C4956A' }}>SOCIOS</span></h1>
          <p style={s.subtitle}>Miembros activos del Pit Bull Club Paraguay.</p>
          <div style={s.heroStats}>
            <div style={s.heroStat}>
              <span style={{ color: '#C4956A', fontWeight: 900, fontSize: 24 }}>{socios.length}</span>
              <span style={s.heroStatLabel}>SOCIOS</span>
            </div>
            <div style={s.heroStatDiv} />
            <div style={s.heroStat}>
              <span style={{ color: '#C4956A', fontWeight: 900, fontSize: 24 }}>{totalPerros}</span>
              <span style={s.heroStatLabel}>EJEMPLARES</span>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', right: 0, bottom: -20, pointerEvents: 'none' }}>
          <PitbullSilhouette size={260} opacity={0.05} />
        </div>
      </div>

      {/* Búsqueda */}
      <div style={s.searchArea}>
        <form onSubmit={handleSearch} style={s.searchForm}>
          <input
            style={s.searchInput}
            placeholder="Buscar por nombre o apodo..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="submit" style={s.searchBtn}>BUSCAR</button>
        </form>
      </div>

      {/* Lista */}
      <div style={s.content}>
        {loading ? (
          <div style={s.center}>
            <PitbullSilhouette size={60} opacity={0.15} />
            <span style={{ color: '#444', fontSize: 12, letterSpacing: 2 }}>CARGANDO...</span>
          </div>
        ) : socios.length === 0 ? (
          <div style={s.center}>
            <p style={{ color: '#444' }}>No se encontraron socios.</p>
          </div>
        ) : (
          <div style={s.grid}>
            {socios.map(m => {
              const color = avatarColor(m.nombre)
              return (
                <Link key={m.id} to={`/socios/${m.id}`} style={s.card}>
                  <div style={{ ...s.avatar, background: color + '22', border: `1px solid ${color}44` }}>
                    {m.foto_url
                      ? <img src={m.foto_url} alt={m.nombre} style={s.avatarImg} />
                      : <span style={{ ...s.avatarText, color }}>{initials(m.nombre)}</span>
                    }
                  </div>
                  <div style={s.cardBody}>
                    <div style={s.cardNombre}>{m.nombre}</div>
                    {m.apodo && <div style={s.cardApodo}>"{m.apodo}"</div>}
                    <div style={s.cardCiudad}>📍 {m.ciudad}</div>
                    <div style={s.cardPerros}>
                      <span style={{ ...s.perroBadge, borderColor: color + '44', color }}>
                        🐕 {m.total_perros} perro{m.total_perros !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  <div style={{ ...s.cardAccent, background: color }} />
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </PublicLayout>
  )
}

const s = {
  hero: { padding: '100px 48px 48px', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #111' },
  heroGlow: { position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%,-50%)', width: 500, height: 300, background: 'radial-gradient(ellipse, rgba(196,149,106,0.06) 0%, transparent 70%)', pointerEvents: 'none' },
  heroInner: { position: 'relative', zIndex: 2, maxWidth: 700 },
  badge: { display: 'inline-block', background: 'rgba(196,149,106,0.1)', border: '1px solid rgba(196,149,106,0.3)', color: '#C4956A', fontSize: 9, fontWeight: 700, letterSpacing: 4, padding: '5px 14px', borderRadius: 2, marginBottom: 18 },
  title: { fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, letterSpacing: 4, color: '#f0f0f0', margin: '0 0 12px' },
  subtitle: { color: '#555', fontSize: 13, marginBottom: 24 },
  heroStats: { display: 'flex', gap: 24, alignItems: 'center' },
  heroStat: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 },
  heroStatLabel: { color: '#444', fontSize: 9, fontWeight: 700, letterSpacing: 2 },
  heroStatDiv: { width: 1, height: 30, background: '#1e1e1e' },

  searchArea: { padding: '24px 48px', borderBottom: '1px solid #111', maxWidth: 1300, margin: '0 auto' },
  searchForm: { display: 'flex', gap: 8, maxWidth: 480 },
  searchInput: { flex: 1, padding: '10px 14px', background: '#0d0d0d', border: '1px solid #1e1e1e', color: '#e0e0e0', fontSize: 13, borderRadius: 2, outline: 'none' },
  searchBtn: { padding: '10px 20px', background: '#C4956A22', border: '1px solid #C4956A44', color: '#C4956A', fontSize: 10, fontWeight: 700, letterSpacing: 2, cursor: 'pointer', borderRadius: 2 },

  content: { maxWidth: 1300, margin: '0 auto', padding: '32px 48px 80px' },
  center: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '80px 0' },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 },
  card: { background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 3, overflow: 'hidden', textDecoration: 'none', display: 'flex', flexDirection: 'column', position: 'relative', transition: 'border-color 0.15s' },
  avatar: { height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' },
  avatarImg: { width: '100%', height: '100%', objectFit: 'cover' },
  avatarText: { fontSize: 36, fontWeight: 900 },
  cardBody: { padding: '12px 14px', flex: 1 },
  cardNombre: { color: '#f0f0f0', fontWeight: 800, fontSize: 14, marginBottom: 3 },
  cardApodo: { color: '#666', fontSize: 12, fontStyle: 'italic', marginBottom: 4 },
  cardCiudad: { color: '#555', fontSize: 11, marginBottom: 8 },
  cardPerros: {},
  perroBadge: { display: 'inline-block', border: '1px solid', borderRadius: 2, padding: '3px 8px', fontSize: 10, fontWeight: 700 },
  cardAccent: { height: 2, opacity: 0.4 },
}
