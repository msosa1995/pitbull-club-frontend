import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPerro, getCamadas } from '../../api'
import PublicLayout from '../../layouts/PublicLayout'
import PitbullSilhouette from '../../components/PitbullSilhouette'

const RAZA_COLOR = { pitbull: '#4a7aaa', bully: '#9a4aaa' }

function calcEdad(fechaNac) {
  if (!fechaNac) return null
  const hoy = new Date()
  const nac = new Date(fechaNac + 'T00:00:00')
  const años = hoy.getFullYear() - nac.getFullYear()
  const meses = hoy.getMonth() - nac.getMonth()
  if (años === 0) return `${meses < 0 ? 0 : meses} meses`
  return `${años} año${años !== 1 ? 's' : ''}`
}

export default function EjemplarDetalle() {
  const { id } = useParams()
  const [perro, setPerro] = useState(null)
  const [camadas, setCamadas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getPerro(id),
      getCamadas({ madre: id }),
    ]).then(([pRes, cRes]) => {
      setPerro(pRes.data)
      const cData = cRes.data?.results ?? cRes.data
      setCamadas(Array.isArray(cData) ? cData : [])
    }).finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <PublicLayout>
      <div style={s.loadingState}>
        <PitbullSilhouette size={80} opacity={0.15} />
        <span style={{ color: '#444', fontSize: 13, letterSpacing: 2 }}>CARGANDO...</span>
      </div>
    </PublicLayout>
  )

  if (!perro) return (
    <PublicLayout>
      <div style={s.loadingState}>
        <p style={{ color: '#555' }}>Ejemplar no encontrado.</p>
        <Link to="/ejemplares" style={s.backLink}>← Volver al catálogo</Link>
      </div>
    </PublicLayout>
  )

  const color = RAZA_COLOR[perro.raza] || '#C4956A'
  const totalCamadas = camadas.length
  const totalCachorros = camadas.reduce((sum, c) => sum + (c.cantidad_total || 0), 0)

  return (
    <PublicLayout>
      {/* ── HERO ── */}
      <div style={{ ...s.hero, borderBottom: `1px solid ${color}22` }}>
        <div style={{ ...s.heroGlow, background: `radial-gradient(ellipse, ${color}10 0%, transparent 70%)` }} />

        <div style={s.heroInner}>
          <div style={s.heroPhoto}>
            {perro.foto_principal
              ? <img src={perro.foto_principal} alt={perro.nombre} style={s.heroImg} />
              : <div style={{ ...s.heroImgPlaceholder, background: color + '18' }}>
                  <PitbullSilhouette size={140} opacity={0.2} />
                </div>
            }
            <div style={{ ...s.razaBadgeHero, background: color }}>
              {perro.raza === 'pitbull' ? 'APBT' : 'BULLY'}
            </div>
          </div>

          <div style={s.heroInfo}>
            <Link to="/ejemplares" style={s.backLink}>← CATÁLOGO DE EJEMPLARES</Link>
            <h1 style={s.heroNombre}>{perro.nombre}</h1>
            <div style={{ color, fontSize: 13, fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>
              {perro.raza_display}{perro.variante !== 'na' ? ` · ${perro.variante_display}` : ''}
            </div>
            <div style={s.heroMeta}>
              <MetaItem label="SEXO" value={perro.sexo_display} />
              <MetaItem label="COLOR" value={perro.color} />
              {perro.fecha_nacimiento && <MetaItem label="EDAD" value={calcEdad(perro.fecha_nacimiento)} />}
              {perro.kennel && <MetaItem label="KENNEL" value={perro.kennel} />}
              <MetaItem label="DUEÑO" value={perro.dueno_nombre} />
            </div>

            <div style={s.statsRow}>
              <StatBox n={totalCamadas} label="CAMADAS" color={color} />
              <StatBox n={totalCachorros} label="CACHORROS" color={color} />
              {perro.tiene_registro && (
                <div style={{ ...s.statBox, borderColor: '#5aaa5a22', background: '#5aaa5a0a' }}>
                  <div style={{ color: '#5aaa5a', fontSize: 16 }}>✓</div>
                  <div style={{ color: '#5aaa5a', fontSize: 8, fontWeight: 700, letterSpacing: 2 }}>PEDIGREE</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENIDO ── */}
      <div style={s.content}>

        {/* Sección info */}
        <div style={s.section}>
          <SectionTitle>INFORMACIÓN</SectionTitle>
          <div style={s.infoGrid}>
            <InfoRow label="Raza" value={perro.raza_display} />
            {perro.variante !== 'na' && <InfoRow label="Variante" value={perro.variante_display} />}
            <InfoRow label="Sexo" value={perro.sexo_display} />
            <InfoRow label="Color / Marcas" value={perro.color} />
            <InfoRow label="Fecha de nacimiento" value={perro.fecha_nacimiento} />
            {perro.peso && <InfoRow label="Peso" value={`${perro.peso} kg`} />}
            {perro.altura && <InfoRow label="Altura al hombro" value={`${perro.altura} cm`} />}
            {perro.microchip && <InfoRow label="Microchip" value={perro.microchip} />}
            <InfoRow label="Estado" value={perro.estado_display} />
          </div>
        </div>

        {/* Procedencia */}
        {(perro.procedencia || perro.padre || perro.madre) && (
          <div style={s.section}>
            <SectionTitle>PROCEDENCIA</SectionTitle>
            <div style={s.infoGrid}>
              {perro.padre && <InfoRow label="Padre" value={perro.padre} />}
              {perro.madre && <InfoRow label="Madre" value={perro.madre} />}
              {perro.procedencia && <InfoRow label="Adquirido de" value={perro.procedencia} />}
            </div>
          </div>
        )}

        {/* Registro */}
        {perro.tiene_registro && (
          <div style={s.section}>
            <SectionTitle>REGISTRO</SectionTitle>
            <div style={s.infoGrid}>
              <InfoRow label="Número de registro" value={perro.numero_registro} />
              {perro.kennel && <InfoRow label="Kennel" value={perro.kennel} />}
            </div>
          </div>
        )}

        {/* Camadas */}
        {totalCamadas > 0 && (
          <div style={s.section}>
            <SectionTitle>
              CAMADAS
              <span style={s.sectionCount}>{totalCamadas} camada{totalCamadas !== 1 ? 's' : ''} · {totalCachorros} cachorro{totalCachorros !== 1 ? 's' : ''} en total</span>
            </SectionTitle>
            <div style={s.camadasList}>
              {camadas.map(c => (
                <div key={c.id} style={s.camadaCard}>
                  <div style={s.camadaFecha}>{c.fecha_nacimiento}</div>
                  <div style={s.camadaStats}>
                    <span style={s.camadaStat}>🐶 {c.cantidad_total} total</span>
                    {c.cantidad_machos > 0 && <span style={s.camadaStat}>♂ {c.cantidad_machos} macho{c.cantidad_machos !== 1 ? 's' : ''}</span>}
                    {c.cantidad_hembras > 0 && <span style={s.camadaStat}>♀ {c.cantidad_hembras} hembra{c.cantidad_hembras !== 1 ? 's' : ''}</span>}
                  </div>
                  <div style={s.camadaPadre}>
                    {c.padre_nombre
                      ? <span>× {c.padre_nombre}</span>
                      : c.padre_externo
                        ? <span>× {c.padre_externo}</span>
                        : <span style={{ color: '#333' }}>Padre no especificado</span>
                    }
                  </div>
                  {c.notas && <div style={s.camadaNotas}>{c.notas}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notas */}
        {perro.notas && (
          <div style={s.section}>
            <SectionTitle>NOTAS</SectionTitle>
            <p style={{ color: '#666', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{perro.notas}</p>
          </div>
        )}

      </div>
    </PublicLayout>
  )
}

function SectionTitle({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 16 }}>
      <div style={{ color: '#444', fontSize: 9, fontWeight: 700, letterSpacing: 3 }}>{children}</div>
    </div>
  )
}

function MetaItem({ label, value }) {
  if (!value) return null
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <div style={{ color: '#333', fontSize: 8, fontWeight: 700, letterSpacing: 2 }}>{label}</div>
      <div style={{ color: '#e0e0e0', fontSize: 13, fontWeight: 600 }}>{value}</div>
    </div>
  )
}

function StatBox({ n, label, color }) {
  return (
    <div style={{ ...s.statBox, borderColor: color + '22', background: color + '0a' }}>
      <div style={{ color, fontSize: 22, fontWeight: 900 }}>{n}</div>
      <div style={{ color: '#444', fontSize: 8, fontWeight: 700, letterSpacing: 2 }}>{label}</div>
    </div>
  )
}

function InfoRow({ label, value }) {
  if (!value && value !== 0) return null
  return (
    <div style={s.infoRow}>
      <span style={s.infoLabel}>{label}</span>
      <span style={s.infoValue}>{value}</span>
    </div>
  )
}

const s = {
  loadingState: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '120px 0', color: '#555' },
  backLink: { color: '#555', fontSize: 10, fontWeight: 700, letterSpacing: 2, textDecoration: 'none', display: 'block', marginBottom: 16 },

  hero: { padding: '60px 48px 48px', position: 'relative', overflow: 'hidden', background: '#060606' },
  heroGlow: { position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%,-50%)', width: 600, height: 400, pointerEvents: 'none' },
  heroInner: { maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 48, alignItems: 'flex-start' },

  heroPhoto: { position: 'relative', flexShrink: 0 },
  heroImg: { width: 280, height: 280, objectFit: 'cover', borderRadius: 4, display: 'block' },
  heroImgPlaceholder: { width: 280, height: 280, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  razaBadgeHero: { position: 'absolute', top: 10, left: 10, padding: '4px 10px', fontSize: 9, fontWeight: 700, letterSpacing: 1, color: '#fff', borderRadius: 2 },

  heroInfo: { flex: 1, paddingTop: 8 },
  heroNombre: { color: '#f0f0f0', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, letterSpacing: 2, margin: '0 0 8px', lineHeight: 1.1 },
  heroMeta: { display: 'flex', flexWrap: 'wrap', gap: '16px 32px', marginBottom: 28 },

  statsRow: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  statBox: { border: '1px solid', borderRadius: 3, padding: '14px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 80 },

  content: { maxWidth: 1100, margin: '0 auto', padding: '48px 48px 80px' },

  section: { marginBottom: 48, paddingBottom: 40, borderBottom: '1px solid #111' },
  sectionCount: { color: '#555', fontSize: 10, fontWeight: 400, letterSpacing: 1, marginLeft: 8 },

  infoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0 32px' },
  infoRow: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #111' },
  infoLabel: { color: '#444', fontSize: 12 },
  infoValue: { color: '#ccc', fontSize: 12, fontWeight: 600, textAlign: 'right' },

  camadasList: { display: 'flex', flexDirection: 'column', gap: 8 },
  camadaCard: { background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 3, padding: '14px 18px', display: 'grid', gridTemplateColumns: '100px 1fr 1fr', gap: '4px 24px', alignItems: 'start' },
  camadaFecha: { color: '#C4956A', fontSize: 12, fontWeight: 700, letterSpacing: 0.5 },
  camadaStats: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  camadaStat: { color: '#888', fontSize: 12 },
  camadaPadre: { color: '#555', fontSize: 12, textAlign: 'right' },
  camadaNotas: { color: '#444', fontSize: 11, gridColumn: '1/-1', marginTop: 4, fontStyle: 'italic' },
}
