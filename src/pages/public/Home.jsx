import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getStats, getPerros, getEventos, getNoticias } from '../../api'
import PublicLayout from '../../layouts/PublicLayout'
import PitbullSilhouette from '../../components/PitbullSilhouette'

function useCountUp(target, duration = 1600) {
  const [count, setCount] = useState(0)
  const started = useRef(false)
  const ref = useRef(null)

  useEffect(() => {
    if (target === null || target === undefined) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          setCount(Math.round(ease * target))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return [count, ref]
}

function StatCard({ label, value, icon, accent }) {
  const [count, ref] = useCountUp(value)
  return (
    <div ref={ref} style={{ ...styles.statCard, borderTop: `2px solid ${accent}` }}>
      <div style={{ ...styles.statIcon, color: accent }}>{icon}</div>
      <div style={{ ...styles.statValue, color: accent }}>{value !== null ? count : '—'}</div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  )
}

const TIPO_COLORS = {
  exposicion: '#C4956A',
  competencia: '#CC1100',
  seminario: '#4a7aaa',
  reunion: '#6aaa4a',
  capacitacion: '#aa7a4a',
  otro: '#777',
}

const TIPO_LABELS = {
  exposicion: 'EXPOSICIÓN',
  competencia: 'COMPETENCIA',
  seminario: 'SEMINARIO',
  reunion: 'REUNIÓN',
  capacitacion: 'CAPACITACIÓN',
  otro: 'EVENTO',
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('es-PY', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function Home() {
  const [stats, setStats] = useState(null)
  const [dogs, setDogs] = useState([])
  const [eventos, setEventos] = useState([])
  const [noticias, setNoticias] = useState([])

  useEffect(() => {
    getStats().then(r => setStats(r.data)).catch(() => {})
    getPerros({ destacado: true, ordering: 'nombre' }).then(r => {
      const data = r.data?.results ?? r.data
      setDogs(Array.isArray(data) ? data.slice(0, 4) : [])
    }).catch(() => {})
    getEventos({ ordering: 'fecha' }).then(r => {
      const data = r.data?.results ?? r.data
      setEventos(Array.isArray(data) ? data.slice(0, 3) : [])
    }).catch(() => {})
    getNoticias().then(r => {
      const data = r.data?.results ?? r.data
      setNoticias(Array.isArray(data) ? data.slice(0, 3) : [])
    }).catch(() => {})
  }, [])

  return (
    <PublicLayout>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes sweepLine {
          from { width: 0; opacity: 0; }
          to   { width: 100%; opacity: 1; }
        }
        @keyframes floatLogo {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 0.7; transform: scale(1.08); }
        }
        .hero-badge    { animation: fadeUp  0.6s ease 0.1s both; }
        .hero-title    { animation: fadeUp  0.7s ease 0.25s both; }
        .hero-line     { animation: sweepLine 0.6s ease 0.55s both; overflow: hidden; }
        .hero-slogan   { animation: fadeUp  0.6s ease 0.65s both; }
        .hero-desc     { animation: fadeUp  0.6s ease 0.80s both; }
        .hero-btns     { animation: fadeUp  0.6s ease 0.95s both; }
        .hero-tags     { animation: fadeIn  0.7s ease 1.1s  both; }
        .hero-logo     { animation: fadeIn  0.8s ease 0.3s  both, floatLogo 4s ease-in-out 1.5s infinite; }
        .hero-logo-glow{ animation: glowPulse 3s ease-in-out 1.5s infinite; }
        .hero-pitbull  { animation: fadeIn  1.2s ease 0.2s  both; }
        .hero-scroll   { animation: fadeIn  0.8s ease 1.4s  both; }
      `}</style>

      {/* ══════════════════ HERO ══════════════════ */}
      <section style={styles.hero}>
        {/* glows de fondo */}
        <div style={styles.glowLeft} />
        <div style={styles.glowRight} />
        {/* grid sutil */}
        <div style={styles.heroGrid} />

        {/* pitbull grande derecha */}
        <div className="hero-pitbull" style={styles.heroPitbull}>
          <PitbullSilhouette size={520} opacity={0.10} />
        </div>

        {/* contenido */}
        <div style={styles.heroContent}>
          <div style={styles.heroLeft}>
            <div className="hero-badge" style={styles.heroBadge}>
              <span style={styles.heroBadgeDot} />
              PARAGUAY — FUNDADO 2024
            </div>

            <h1 className="hero-title" style={styles.heroTitle}>
              <span style={styles.heroTitleTop}>PIT BULL</span>
              <span style={styles.heroTitleBottom}>CLUB</span>
            </h1>

            <div className="hero-line" style={styles.heroGoldLine} />

            <p className="hero-slogan" style={styles.heroSlogan}>
              PRESERVANDO LA EXCELENCIA DEL<br />
              <strong style={{ color: '#C4956A' }}>AMERICAN PIT BULL TERRIER</strong><br />
              Y <strong style={{ color: '#C4956A' }}>AMERICAN BULLY</strong>
            </p>

            <p className="hero-desc" style={styles.heroDesc}>
              La organización oficial de criadores y propietarios de razas de alto rendimiento
              en Paraguay. Registro, competencia y excelencia canina.
            </p>

            <div className="hero-btns" style={styles.heroBtns}>
              <Link to="/club" style={styles.btnPrimary}>CONOCER EL CLUB</Link>
              <Link to="/ejemplares" style={styles.btnSecondary}>VER EJEMPLARES</Link>
            </div>

            <div className="hero-tags" style={styles.heroTags}>
              <span style={styles.heroTag}>🏆 REGISTRO OFICIAL</span>
              <span style={styles.heroTagSep}>·</span>
              <span style={styles.heroTag}>🐕 PEDIGREE CERTIFICADO</span>
              <span style={styles.heroTagSep}>·</span>
              <span style={styles.heroTag}>⚡ DEPORTE CANINO</span>
            </div>
          </div>

          {/* logo flotante */}
          <div style={styles.heroLogoWrap}>
            <div className="hero-logo-glow" style={styles.heroLogoGlow} />
            <img className="hero-logo" src="/logo.jpg" alt="Pit Bull Club" style={styles.heroLogo} />
          </div>
        </div>

        {/* scroll indicator */}
        <div className="hero-scroll" style={styles.scrollIndicator}>
          <div style={styles.scrollDot} />
          <span style={styles.scrollText}>SCROLL</span>
        </div>
      </section>

      {/* ══════════════════ STATS ══════════════════ */}
      <section style={styles.statsSection}>
        <div style={styles.container}>
          <div style={styles.statsGrid}>
            <StatCard label="SOCIOS ACTIVOS"     value={stats?.activos}            icon="👥" accent="#C4956A" />
            <StatCard label="EJEMPLARES REGISTRADOS" value={stats?.total_perros}   icon="🐕" accent="#C4956A" />
            <StatCard label="PIT BULL TERRIER"   value={stats?.pitbulls}           icon="💪" accent="#4a7aaa" />
            <StatCard label="AMERICAN BULLY"     value={stats?.bullys}             icon="⭐" accent="#9a4aaa" />
            <StatCard label="CON PEDIGREE"        value={stats?.con_registro}      icon="📋" accent="#6aaa4a" />
            <StatCard label="EVENTOS REALIZADOS"  value={stats?.total_eventos}     icon="🏆" accent="#CC1100" />
          </div>
        </div>
      </section>

      {/* ══════════════════ RAZAS ══════════════════ */}
      <section style={styles.section}>
        <div style={styles.container}>
          <SectionHeader title="NUESTRAS RAZAS" subtitle="Las razas más poderosas del deporte canino" />
          <div style={styles.razasGrid}>

            <div style={{ ...styles.razaCard, borderLeft: '3px solid #4a7aaa' }}>
              <div style={styles.razaCardBg}>
                <PitbullSilhouette size={160} opacity={0.06} style={{ position: 'absolute', right: -10, bottom: -10 }} />
              </div>
              <div style={styles.razaTag}>APBT</div>
              <h3 style={{ ...styles.razaNombre, color: '#7aaddd' }}>AMERICAN PIT BULL TERRIER</h3>
              <p style={styles.razaDesc}>
                Raza atlética de carácter fuerte y leal. Alta energía, musculatura marcada
                y determinación sin igual. El auténtico atleta canino.
              </p>
              <div style={styles.razaSpecs}>
                <span>⚖️ 14–27 kg</span>
                <span>📏 43–53 cm</span>
                <span>🔴 Reconocida por ADBA</span>
              </div>
              <Link to="/razas/pitbull" style={{ ...styles.razaBtn, borderColor: '#4a7aaa', color: '#7aaddd' }}>
                VER ESTÁNDAR COMPLETO →
              </Link>
            </div>

            <div style={{ ...styles.razaCard, borderLeft: '3px solid #9a4aaa' }}>
              <div style={styles.razaCardBg}>
                <PitbullSilhouette size={160} opacity={0.06} style={{ position: 'absolute', right: -10, bottom: -10 }} />
              </div>
              <div style={styles.razaTag}>BULLY</div>
              <h3 style={{ ...styles.razaNombre, color: '#cc7add' }}>AMERICAN BULLY</h3>
              <p style={styles.razaDesc}>
                Musculatura extrema, cabeza ancha y poderosa. Derivada del APBT con
                selección para temperamento dócil. Variantes: Pocket, Standard, Classic, XL y Extreme.
              </p>
              <div style={styles.razaSpecs}>
                <span>⚖️ 25–54 kg</span>
                <span>📏 33–53 cm</span>
                <span>🔵 Reconocida por ABKC</span>
              </div>
              <Link to="/razas/bully" style={{ ...styles.razaBtn, borderColor: '#9a4aaa', color: '#cc7add' }}>
                VER ESTÁNDAR COMPLETO →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════ EJEMPLARES DESTACADOS ══════════════════ */}
      {dogs.length > 0 && (
        <section style={{ ...styles.section, background: '#0a0a0a' }}>
          <div style={styles.container}>
            <SectionHeader title="EJEMPLARES DESTACADOS" subtitle="Los mejores representantes del club" />
            <div style={styles.dogsGrid}>
              {dogs.map(d => (
                <DogCard key={d.id} dog={d} />
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 28 }}>
              <Link to="/ejemplares" style={styles.verTodosBtn}>VER TODOS LOS EJEMPLARES →</Link>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════ EVENTOS ══════════════════ */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.splitGrid}>

            {/* Próximos eventos */}
            <div>
              <SectionHeader title="PRÓXIMOS EVENTOS" subtitle="Agenda del club" />
              {eventos.length === 0 ? (
                <div style={styles.emptyCard}>
                  <span style={{ fontSize: 36 }}>📅</span>
                  <p>No hay eventos programados</p>
                  <span style={{ fontSize: 11, color: '#333' }}>Próximamente...</span>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {eventos.map(e => (
                    <EventCard key={e.id} evento={e} />
                  ))}
                </div>
              )}
              <Link to="/eventos" style={{ ...styles.verTodosBtn, display: 'inline-block', marginTop: 16 }}>
                VER TODOS LOS EVENTOS →
              </Link>
            </div>

            {/* Noticias recientes */}
            <div>
              <SectionHeader title="NOTICIAS" subtitle="Lo más reciente del club" />
              {noticias.length === 0 ? (
                <div style={styles.emptyCard}>
                  <span style={{ fontSize: 36 }}>📰</span>
                  <p>No hay noticias publicadas</p>
                  <span style={{ fontSize: 11, color: '#333' }}>Próximamente...</span>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {noticias.map(n => (
                    <NoticiaCard key={n.id} noticia={n} />
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════ CTA FINAL ══════════════════ */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaGlow} />
        <PitbullSilhouette size={300} opacity={0.04} style={{ position: 'absolute', right: 40, bottom: -20, pointerEvents: 'none' }} />
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>¿QUERÉS SER PARTE DEL CLUB?</h2>
          <p style={styles.ctaText}>
            Únete a la comunidad de criadores y propietarios más exigentes del Paraguay.
            Registrá tus ejemplares, participá en eventos y accedé a pedigrees certificados.
          </p>
          <Link to="/contacto" style={styles.ctaBtn}>CONTACTANOS HOY</Link>
        </div>
      </section>

    </PublicLayout>
  )
}

function SectionHeader({ title, subtitle }) {
  return (
    <div style={styles.sectionHeader}>
      <div style={styles.sectionHeaderLine} />
      <div>
        <h2 style={styles.sectionTitle}>{title}</h2>
        {subtitle && <p style={styles.sectionSubtitle}>{subtitle}</p>}
      </div>
    </div>
  )
}

function DogCard({ dog }) {
  const razaColor = dog.raza === 'pitbull' ? '#4a7aaa' : '#9a4aaa'
  return (
    <Link to={`/ejemplares/${dog.id}`} style={styles.dogCard}>
      <div style={{ ...styles.dogPhoto, background: razaColor + '22' }}>
        {dog.foto_url
          ? <img src={dog.foto_url} alt={dog.nombre} style={styles.dogImg} />
          : <PitbullSilhouette size={80} opacity={0.2} />
        }
        <div style={{ ...styles.dogRazaBadge, background: razaColor }}>
          {dog.raza === 'pitbull' ? 'APBT' : 'BULLY'}
        </div>
      </div>
      <div style={styles.dogInfo}>
        <div style={styles.dogNombre}>{dog.nombre}</div>
        <div style={styles.dogMeta}>{dog.sexo_display} · {dog.color}</div>
        <div style={{ ...styles.dogDueno, color: '#555' }}>👤 {dog.dueno_nombre}</div>
        {dog.tiene_registro && (
          <div style={styles.dogPedigree}>📋 CON PEDIGREE</div>
        )}
      </div>
    </Link>
  )
}

function EventCard({ evento }) {
  const color = TIPO_COLORS[evento.tipo] || '#777'
  return (
    <div style={{ ...styles.eventCard, borderLeft: `3px solid ${color}` }}>
      <div style={{ ...styles.eventTipo, color }}>{TIPO_LABELS[evento.tipo] || 'EVENTO'}</div>
      <div style={styles.eventTitulo}>{evento.titulo}</div>
      <div style={styles.eventMeta}>
        <span>📅 {formatDate(evento.fecha)}</span>
        {evento.lugar && <span>📍 {evento.lugar}</span>}
      </div>
      {evento.inscripcion_abierta && (
        <div style={styles.eventBadge}>INSCRIPCIÓN ABIERTA</div>
      )}
    </div>
  )
}

function NoticiaCard({ noticia }) {
  return (
    <div style={styles.noticiaCard}>
      <div style={styles.noticiaDate}>{formatDate(noticia.fecha_publicacion)}</div>
      <div style={styles.noticiaTitulo}>{noticia.titulo}</div>
      {noticia.resumen && <p style={styles.noticiaResumen}>{noticia.resumen}</p>}
    </div>
  )
}

const styles = {
  container: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '0 32px',
    width: '100%',
  },

  // ── HERO ──
  hero: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #060606 0%, #0a0606 50%, #060606 100%)',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: '80px 32px 60px',
  },
  glowLeft: {
    position: 'absolute', top: '20%', left: '-5%',
    width: 500, height: 500,
    background: 'radial-gradient(circle, rgba(204,17,0,0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  glowRight: {
    position: 'absolute', bottom: '10%', right: '10%',
    width: 400, height: 400,
    background: 'radial-gradient(circle, rgba(196,149,106,0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  heroGrid: {
    position: 'absolute', inset: 0,
    backgroundImage: 'linear-gradient(rgba(196,149,106,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(196,149,106,0.02) 1px, transparent 1px)',
    backgroundSize: '60px 60px',
    pointerEvents: 'none',
  },
  heroPitbull: {
    position: 'absolute',
    right: -40, top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
  },
  heroContent: {
    position: 'relative', zIndex: 2,
    maxWidth: 1280, margin: '0 auto', width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 40,
  },
  heroLeft: {
    maxWidth: 620,
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    background: 'rgba(196,149,106,0.08)',
    border: '1px solid rgba(196,149,106,0.2)',
    color: '#C4956A',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 3,
    padding: '6px 14px',
    borderRadius: 2,
    marginBottom: 24,
  },
  heroBadgeDot: {
    width: 6, height: 6,
    background: '#C4956A',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'pulse 2s infinite',
  },
  heroTitle: {
    margin: 0,
    lineHeight: 0.85,
    letterSpacing: 6,
  },
  heroTitleTop: {
    display: 'block',
    fontSize: 'clamp(48px, 7vw, 88px)',
    fontWeight: 900,
    color: '#f0f0f0',
    textShadow: '0 0 60px rgba(204,17,0,0.15)',
  },
  heroTitleBottom: {
    display: 'block',
    fontSize: 'clamp(64px, 10vw, 124px)',
    fontWeight: 900,
    color: '#C4956A',
    WebkitTextStroke: '2px #C4956A',
    textShadow: '0 0 40px rgba(196,149,106,0.3)',
  },
  heroGoldLine: {
    height: 2,
    background: 'linear-gradient(90deg, #C4956A, transparent)',
    margin: '24px 0',
    width: 200,
  },
  heroSlogan: {
    color: '#aaa',
    fontSize: 14,
    letterSpacing: 2,
    lineHeight: 1.8,
    margin: '0 0 16px',
  },
  heroDesc: {
    color: '#555',
    fontSize: 14,
    lineHeight: 1.7,
    margin: '0 0 32px',
    maxWidth: 480,
  },
  heroBtns: {
    display: 'flex',
    gap: 14,
    flexWrap: 'wrap',
    marginBottom: 28,
  },
  btnPrimary: {
    background: '#C4956A',
    color: '#060606',
    padding: '14px 28px',
    fontWeight: 900,
    fontSize: 11,
    letterSpacing: 3,
    borderRadius: 2,
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'all 0.15s',
  },
  btnSecondary: {
    background: 'transparent',
    border: '1px solid #C4956A44',
    color: '#C4956A',
    padding: '14px 28px',
    fontWeight: 700,
    fontSize: 11,
    letterSpacing: 3,
    borderRadius: 2,
    textDecoration: 'none',
    display: 'inline-block',
  },
  heroTags: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  heroTag: {
    color: '#444',
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: 700,
  },
  heroTagSep: { color: '#222', fontSize: 14 },
  heroLogoWrap: {
    position: 'relative',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroLogoGlow: {
    position: 'absolute',
    width: 250, height: 250,
    background: 'radial-gradient(circle, rgba(196,149,106,0.15) 0%, transparent 70%)',
    borderRadius: '50%',
  },
  heroLogo: {
    width: 200,
    objectFit: 'contain',
    borderRadius: 8,
    position: 'relative', zIndex: 1,
    filter: 'drop-shadow(0 0 30px rgba(196,149,106,0.3))',
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: 28, left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
  },
  scrollDot: {
    width: 1, height: 40,
    background: 'linear-gradient(180deg, #C4956A, transparent)',
  },
  scrollText: {
    color: '#333',
    fontSize: 8,
    letterSpacing: 3,
    fontWeight: 700,
  },

  // ── STATS ──
  statsSection: {
    padding: '48px 0',
    background: '#0a0a0a',
    borderTop: '1px solid #111',
    borderBottom: '1px solid #111',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: 2,
  },
  statCard: {
    background: '#0d0d0d',
    padding: '24px 20px',
    textAlign: 'center',
    border: '1px solid #111',
    borderBottom: 'none',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
    display: 'block',
  },
  statValue: {
    fontSize: 48,
    fontWeight: 900,
    lineHeight: 1,
    marginBottom: 6,
  },
  statLabel: {
    color: '#555',
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 2,
  },

  // ── SECCIONES ──
  section: {
    padding: '72px 0',
  },
  sectionHeader: {
    marginBottom: 36,
    paddingBottom: 18,
    borderBottom: '1px solid #1a1a1a',
  },
  sectionHeaderLine: {
    height: 2,
    width: 40,
    background: '#C4956A',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#f0f0f0',
    fontSize: 22,
    fontWeight: 900,
    letterSpacing: 4,
    margin: 0,
  },
  sectionSubtitle: {
    color: '#555',
    fontSize: 12,
    letterSpacing: 1,
    margin: '6px 0 0',
  },

  // ── RAZAS ──
  razasGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: 20,
  },
  razaCard: {
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderRadius: 3,
    padding: '28px 28px 24px',
    position: 'relative',
    overflow: 'hidden',
  },
  razaCardBg: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
  },
  razaTag: {
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 4,
    color: '#444',
    marginBottom: 8,
  },
  razaNombre: {
    fontSize: 18,
    fontWeight: 900,
    letterSpacing: 2,
    marginBottom: 14,
  },
  razaDesc: {
    color: '#666',
    fontSize: 13,
    lineHeight: 1.7,
    marginBottom: 18,
  },
  razaSpecs: {
    display: 'flex',
    gap: 16,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  razaBtn: {
    display: 'inline-block',
    border: '1px solid',
    padding: '9px 18px',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 2,
    textDecoration: 'none',
    borderRadius: 2,
    transition: 'all 0.15s',
  },

  // ── DOGS ──
  dogsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: 14,
  },
  dogCard: {
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderRadius: 3,
    overflow: 'hidden',
    textDecoration: 'none',
    transition: 'border-color 0.15s',
  },
  dogPhoto: {
    height: 180,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  dogImg: {
    width: '100%', height: '100%',
    objectFit: 'cover',
  },
  dogRazaBadge: {
    position: 'absolute',
    top: 10, right: 10,
    padding: '3px 8px',
    borderRadius: 2,
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 1,
    color: '#fff',
  },
  dogInfo: {
    padding: '12px 14px',
  },
  dogNombre: {
    color: '#f0f0f0',
    fontWeight: 800,
    fontSize: 15,
    letterSpacing: 1,
    marginBottom: 4,
  },
  dogMeta: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
  dogDueno: {
    fontSize: 11,
    marginBottom: 6,
  },
  dogPedigree: {
    color: '#6aaa4a',
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 2,
  },
  verTodosBtn: {
    color: '#C4956A',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 2,
    textDecoration: 'none',
    borderBottom: '1px solid #C4956A44',
    paddingBottom: 2,
  },

  // ── SPLIT ──
  splitGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: 48,
  },
  emptyCard: {
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderRadius: 3,
    padding: '40px 24px',
    textAlign: 'center',
    color: '#444',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },

  // ── EVENTOS ──
  eventCard: {
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderRadius: 2,
    padding: '14px 18px',
  },
  eventTipo: {
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 3,
    marginBottom: 6,
  },
  eventTitulo: {
    color: '#e0e0e0',
    fontWeight: 700,
    fontSize: 14,
    marginBottom: 8,
  },
  eventMeta: {
    display: 'flex',
    gap: 16,
    color: '#555',
    fontSize: 12,
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  eventBadge: {
    display: 'inline-block',
    background: 'rgba(106,170,74,0.12)',
    color: '#6aaa4a',
    border: '1px solid rgba(106,170,74,0.25)',
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 2,
    padding: '3px 8px',
    borderRadius: 2,
  },

  // ── NOTICIAS ──
  noticiaCard: {
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderLeft: '2px solid #C4956A44',
    borderRadius: 2,
    padding: '14px 18px',
  },
  noticiaDate: {
    color: '#444',
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 6,
  },
  noticiaTitulo: {
    color: '#e0e0e0',
    fontWeight: 700,
    fontSize: 14,
    marginBottom: 6,
  },
  noticiaResumen: {
    color: '#555',
    fontSize: 12,
    lineHeight: 1.6,
    margin: 0,
  },

  // ── CTA ──
  ctaSection: {
    background: 'linear-gradient(135deg, #0a0505 0%, #060606 100%)',
    borderTop: '1px solid #1a1a1a',
    padding: '80px 32px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  ctaGlow: {
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600, height: 300,
    background: 'radial-gradient(ellipse, rgba(196,149,106,0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  ctaContent: {
    position: 'relative', zIndex: 1,
    maxWidth: 600,
    margin: '0 auto',
  },
  ctaTitle: {
    color: '#f0f0f0',
    fontSize: 28,
    fontWeight: 900,
    letterSpacing: 4,
    marginBottom: 16,
  },
  ctaText: {
    color: '#666',
    fontSize: 14,
    lineHeight: 1.7,
    marginBottom: 32,
  },
  ctaBtn: {
    display: 'inline-block',
    background: '#C4956A',
    color: '#060606',
    padding: '16px 40px',
    fontWeight: 900,
    fontSize: 12,
    letterSpacing: 3,
    borderRadius: 2,
    textDecoration: 'none',
  },

  // ── RAZAS SPECS ──
  razaSpecItem: {
    fontSize: 11,
    color: '#666',
  },
}
