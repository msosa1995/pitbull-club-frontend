import { useEffect, useState, useRef } from 'react'
import { getMapaRazas } from '../../api'
import PublicLayout from '../../layouts/PublicLayout'
import 'leaflet/dist/leaflet.css'

export default function Mapa() {
  const [ciudades, setCiudades] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    getMapaRazas()
      .then(r => { setCiudades(r.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (loading || !mapRef.current || mapInstanceRef.current) return

    import('leaflet').then(L => {
      const map = L.map(mapRef.current, { zoomControl: true }).setView([-23.5, -57.5], 6)
      mapInstanceRef.current = map

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CARTO',
        maxZoom: 18,
      }).addTo(map)

      const MAX = Math.max(...ciudades.map(c => c.total), 1)

      ciudades.forEach(c => {
        const baseRadius = 12 + (c.total / MAX) * 28

        if (c.pitbulls > 0) {
          const r = baseRadius * (c.pitbulls / c.total)
          const circle = L.circleMarker([c.lat, c.lng - 0.04], {
            radius: Math.max(r, 8),
            fillColor: '#CC1100',
            color: '#ff4422',
            weight: 1.5,
            opacity: 0.9,
            fillOpacity: 0.75,
          }).addTo(map)
          circle.bindTooltip(
            `<b>${c.ciudad}</b><br>🔴 ${c.pitbulls} APBT`,
            { direction: 'top', className: 'mapa-tooltip' }
          )
          circle.on('click', () => setSelected(c))
        }

        if (c.bullys > 0) {
          const r = baseRadius * (c.bullys / c.total)
          const circle = L.circleMarker([c.lat, c.lng + 0.04], {
            radius: Math.max(r, 8),
            fillColor: '#4a7aaa',
            color: '#6699cc',
            weight: 1.5,
            opacity: 0.9,
            fillOpacity: 0.75,
          }).addTo(map)
          circle.bindTooltip(
            `<b>${c.ciudad}</b><br>🔵 ${c.bullys} Bully`,
            { direction: 'top', className: 'mapa-tooltip' }
          )
          circle.on('click', () => setSelected(c))
        }

        // Etiqueta de ciudad
        L.tooltip({
          permanent: true,
          direction: 'bottom',
          className: 'ciudad-label',
          offset: [0, 8],
        })
          .setContent(`<span style="color:#888;font-size:10px;font-weight:700;letter-spacing:1px">${c.ciudad.toUpperCase()}</span>`)
          .setLatLng([c.lat, c.lng])
          .addTo(map)
      })

      if (ciudades.length > 0) {
        const bounds = ciudades.map(c => [c.lat, c.lng])
        map.fitBounds(bounds, { padding: [40, 40] })
      }
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [loading, ciudades])

  const totalPitbulls = ciudades.reduce((s, c) => s + c.pitbulls, 0)
  const totalBullys = ciudades.reduce((s, c) => s + c.bullys, 0)
  const totalPerros = totalPitbulls + totalBullys

  return (
    <PublicLayout>
      <style>{`
        .mapa-tooltip { background: #111 !important; border: 1px solid #2a2a2a !important; color: #e0e0e0 !important; font-size: 12px !important; }
        .mapa-tooltip::before { display: none !important; }
        .ciudad-label { background: transparent !important; border: none !important; box-shadow: none !important; }
        .leaflet-tooltip-bottom.ciudad-label::before { display: none !important; }
      `}</style>

      <div style={s.page}>
        {/* Header */}
        <div style={s.header}>
          <div style={s.headerInner}>
            <div style={s.headerBadge}>DISTRIBUCIÓN GEOGRÁFICA</div>
            <h1 style={s.title}>MAPA DE <span style={{ color: '#C4956A' }}>EJEMPLARES</span></h1>
            <p style={s.subtitle}>Distribución de ejemplares registrados en el club por ciudad.</p>

            <div style={s.legendRow}>
              <div style={s.legendItem}>
                <div style={{ ...s.legendDot, background: '#CC1100' }} />
                <span>American Pit Bull Terrier</span>
              </div>
              <div style={s.legendItem}>
                <div style={{ ...s.legendDot, background: '#4a7aaa' }} />
                <span>American Bully</span>
              </div>
            </div>
          </div>
        </div>

        <div style={s.body}>
          {/* Mapa */}
          <div style={s.mapWrap}>
            <div style={s.mapBox}>
              {loading ? (
                <div style={s.center}>Cargando mapa...</div>
              ) : ciudades.length === 0 ? (
                <div style={s.center}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🗺️</div>
                  <p style={{ color: '#555' }}>Aún no hay perros registrados.</p>
                </div>
              ) : (
                <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
              )}
            </div>

            {selected && (
              <div style={s.selectedCard}>
                <div style={s.selectedInfo}>
                  <div style={s.selectedCiudad}>{selected.ciudad}</div>
                  <div style={s.selectedStats}>
                    {selected.pitbulls > 0 && (
                      <span style={{ ...s.selectedBadge, color: '#ff6644', background: '#CC110015', border: '1px solid #CC110033' }}>
                        🔴 {selected.pitbulls} APBT
                      </span>
                    )}
                    {selected.bullys > 0 && (
                      <span style={{ ...s.selectedBadge, color: '#6699cc', background: '#4a7aaa15', border: '1px solid #4a7aaa33' }}>
                        🔵 {selected.bullys} Bully
                      </span>
                    )}
                  </div>
                </div>
                <button onClick={() => setSelected(null)} style={s.closeBtn}>×</button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={s.sidebar}>
            {/* Totales */}
            <div style={s.card}>
              <div style={s.cardTitle}>TOTALES</div>
              <div style={s.statRow}>
                <span style={s.statLabel}>Ejemplares</span>
                <span style={s.statValue}>{totalPerros}</span>
              </div>
              <div style={s.statRow}>
                <span style={{ ...s.statLabel, color: '#ff6644' }}>● APBT</span>
                <span style={{ ...s.statValue, color: '#ff6644' }}>{totalPitbulls}</span>
              </div>
              <div style={s.statRow}>
                <span style={{ ...s.statLabel, color: '#6699cc' }}>● Bully</span>
                <span style={{ ...s.statValue, color: '#6699cc' }}>{totalBullys}</span>
              </div>
              <div style={s.statRow}>
                <span style={s.statLabel}>Ciudades</span>
                <span style={s.statValue}>{ciudades.length}</span>
              </div>
            </div>

            {/* Por ciudad */}
            <div style={s.card}>
              <div style={s.cardTitle}>POR CIUDAD</div>
              {ciudades.map((c, i) => (
                <div
                  key={c.ciudad}
                  onClick={() => setSelected(c)}
                  style={{ ...s.ciudadRow, background: selected?.ciudad === c.ciudad ? '#1a1a1a' : 'transparent' }}
                >
                  <span style={s.ciudadPos}>{i + 1}</span>
                  <div style={{ flex: 1 }}>
                    <div style={s.ciudadNombre}>{c.ciudad}</div>
                    <div style={s.ciudadBars}>
                      {c.pitbulls > 0 && (
                        <div style={{ ...s.bar, width: `${(c.pitbulls / ciudades[0].total) * 100}%`, background: '#CC1100' }} />
                      )}
                      {c.bullys > 0 && (
                        <div style={{ ...s.bar, width: `${(c.bullys / ciudades[0].total) * 100}%`, background: '#4a7aaa' }} />
                      )}
                    </div>
                  </div>
                  <span style={s.ciudadTotal}>{c.total}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}

const s = {
  page: { background: '#060606', minHeight: '100vh' },

  header: { padding: '80px 48px 40px', borderBottom: '1px solid #111' },
  headerInner: { maxWidth: 1100, margin: '0 auto' },
  headerBadge: { display: 'inline-block', background: 'rgba(196,149,106,0.1)', border: '1px solid rgba(196,149,106,0.3)', color: '#C4956A', fontSize: 9, fontWeight: 700, letterSpacing: 4, padding: '5px 14px', borderRadius: 2, marginBottom: 16 },
  title: { color: '#f0f0f0', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, letterSpacing: 4, margin: '0 0 12px' },
  subtitle: { color: '#555', fontSize: 13, marginBottom: 20 },

  legendRow: { display: 'flex', gap: 24, alignItems: 'center' },
  legendItem: { display: 'flex', alignItems: 'center', gap: 8, color: '#777', fontSize: 12, fontWeight: 600 },
  legendDot: { width: 12, height: 12, borderRadius: '50%', flexShrink: 0 },

  body: { display: 'flex', gap: 24, maxWidth: 1300, margin: '0 auto', padding: '32px 48px 60px', alignItems: 'flex-start' },

  mapWrap: { flex: 1, minWidth: 0 },
  mapBox: { height: 520, background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 4, overflow: 'hidden', position: 'relative' },
  center: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#C4956A', fontSize: 14 },

  selectedCard: { marginTop: 12, background: '#111', border: '1px solid #C4956A44', borderRadius: 4, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  selectedInfo: { display: 'flex', flexDirection: 'column', gap: 8 },
  selectedCiudad: { color: '#C4956A', fontWeight: 800, fontSize: 16, letterSpacing: 1 },
  selectedStats: { display: 'flex', gap: 10 },
  selectedBadge: { padding: '4px 12px', borderRadius: 2, fontSize: 12, fontWeight: 700, letterSpacing: 0.5 },
  closeBtn: { background: 'none', border: 'none', color: '#444', fontSize: 22, cursor: 'pointer', padding: '0 4px', lineHeight: 1 },

  sidebar: { width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 },
  card: { background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 4, padding: '18px 16px' },
  cardTitle: { color: '#444', fontSize: 9, fontWeight: 700, letterSpacing: 3, marginBottom: 16 },

  statRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid #111' },
  statLabel: { color: '#666', fontSize: 12 },
  statValue: { color: '#e0e0e0', fontWeight: 800, fontSize: 18 },

  ciudadRow: { display: 'flex', alignItems: 'center', gap: 8, padding: '8px 6px', borderRadius: 2, cursor: 'pointer', marginBottom: 2 },
  ciudadPos: { color: '#333', fontSize: 10, fontWeight: 700, width: 16, textAlign: 'center', flexShrink: 0 },
  ciudadNombre: { color: '#ccc', fontSize: 12, marginBottom: 4 },
  ciudadBars: { display: 'flex', gap: 2, height: 4 },
  bar: { height: '100%', borderRadius: 2, minWidth: 4 },
  ciudadTotal: { color: '#C4956A', fontSize: 12, fontWeight: 700, flexShrink: 0 },
}
