import { useEffect, useState, useRef } from 'react'
import { getMapa } from '../../api'
import PublicLayout from '../../layouts/PublicLayout'
import 'leaflet/dist/leaflet.css'

export default function Mapa() {
  const [puntos, setPuntos] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])

  useEffect(() => {
    getMapa().then(r => {
      setPuntos(r.data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (loading || !mapRef.current) return
    if (mapInstanceRef.current) return

    import('leaflet').then(L => {
      // Fix default marker icons
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const map = L.map(mapRef.current).setView([-23.5, -57.5], 6)
      mapInstanceRef.current = map

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CARTO',
        maxZoom: 18,
      }).addTo(map)

      const goldIcon = L.divIcon({
        className: '',
        html: `<div style="
          width:32px;height:32px;
          background:#C4956A;
          border:2px solid #fff;
          border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          color:#000;font-weight:bold;font-size:12px;
          box-shadow:0 2px 8px rgba(0,0,0,0.5);
          cursor:pointer;
        ">🐕</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      })

      puntos.forEach(p => {
        const marker = L.marker([p.lat, p.lng], { icon: goldIcon }).addTo(map)
        marker.bindTooltip(`<b>${p.nombre}</b><br>${p.ciudad}<br>${p.total_perros} perro(s)`, {
          permanent: false,
          direction: 'top',
        })
        marker.on('click', () => setSelected(p))
        markersRef.current.push(marker)
      })

      // Ajustar vista si hay puntos
      if (puntos.length > 0) {
        const group = L.featureGroup(markersRef.current)
        map.fitBounds(group.getBounds().pad(0.2))
      }
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [loading, puntos])

  // Estadísticas por ciudad
  const porCiudad = puntos.reduce((acc, p) => {
    acc[p.ciudad] = (acc[p.ciudad] || 0) + 1
    return acc
  }, {})
  const ciudadesOrdenadas = Object.entries(porCiudad).sort((a, b) => b[1] - a[1])

  return (
    <PublicLayout>
      <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: '80px' }}>
        {/* Header */}
        <div style={{ padding: '40px 20px 20px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: '4px', height: '32px', background: 'linear-gradient(#C4956A, #8B6240)' }} />
            <h1 style={{ color: '#C4956A', fontSize: '28px', fontWeight: 800, letterSpacing: '2px', margin: 0 }}>
              MAPA DE INTEGRANTES
            </h1>
          </div>
          <p style={{ color: '#888', margin: '0 0 0 16px' }}>
            Distribución geográfica de los miembros del club en Paraguay
          </p>
        </div>

        <div style={{ display: 'flex', gap: '20px', maxWidth: '1200px', margin: '0 auto', padding: '0 20px 40px', flexWrap: 'wrap' }}>
          {/* Mapa */}
          <div style={{ flex: 1, minWidth: '300px' }}>
            <div style={{
              background: '#111',
              border: '1px solid #2a2a2a',
              borderRadius: '12px',
              overflow: 'hidden',
              height: '520px',
              position: 'relative',
            }}>
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#C4956A' }}>
                  Cargando mapa...
                </div>
              ) : puntos.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#555' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗺️</div>
                  <p>No hay integrantes con ubicación cargada aún.</p>
                  <p style={{ fontSize: '13px' }}>Los administradores pueden agregar la ciudad de cada miembro.</p>
                </div>
              ) : (
                <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
              )}
            </div>

            {/* Panel del seleccionado */}
            {selected && (
              <div style={{
                marginTop: '12px',
                background: '#111',
                border: '1px solid #C4956A',
                borderRadius: '10px',
                padding: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <div style={{ color: '#C4956A', fontWeight: 700, fontSize: '16px' }}>{selected.nombre}</div>
                  <div style={{ color: '#aaa', fontSize: '13px' }}>{selected.ciudad}</div>
                  <div style={{ color: '#888', fontSize: '12px', marginTop: '4px' }}>
                    {selected.total_perros} perro(s) · {selected.total_camadas} camada(s)
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  style={{ background: 'none', border: 'none', color: '#555', fontSize: '20px', cursor: 'pointer' }}
                >×</button>
              </div>
            )}
          </div>

          {/* Sidebar stats */}
          <div style={{ width: '240px', minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Resumen */}
            <div style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '20px' }}>
              <div style={{ color: '#C4956A', fontWeight: 700, fontSize: '13px', letterSpacing: '1px', marginBottom: '16px' }}>
                RESUMEN
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Stat label="En el mapa" value={puntos.length} />
                <Stat label="Ciudades" value={ciudadesOrdenadas.length} />
                <Stat label="Total perros" value={puntos.reduce((s, p) => s + p.total_perros, 0)} />
                <Stat label="Total camadas" value={puntos.reduce((s, p) => s + p.total_camadas, 0)} />
              </div>
            </div>

            {/* Top ciudades */}
            <div style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '20px' }}>
              <div style={{ color: '#C4956A', fontWeight: 700, fontSize: '13px', letterSpacing: '1px', marginBottom: '16px' }}>
                TOP CIUDADES
              </div>
              {ciudadesOrdenadas.length === 0 ? (
                <p style={{ color: '#555', fontSize: '13px' }}>Sin datos</p>
              ) : (
                ciudadesOrdenadas.slice(0, 8).map(([ciudad, count], i) => (
                  <div key={ciudad} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ color: '#C4956A', fontSize: '12px', width: '16px', fontWeight: 700 }}>{i + 1}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                        <span style={{ color: '#ccc', fontSize: '12px' }}>{ciudad}</span>
                        <span style={{ color: '#C4956A', fontSize: '12px', fontWeight: 700 }}>{count}</span>
                      </div>
                      <div style={{ height: '3px', background: '#1a1a1a', borderRadius: '2px' }}>
                        <div style={{
                          height: '100%',
                          width: `${(count / ciudadesOrdenadas[0][1]) * 100}%`,
                          background: 'linear-gradient(90deg, #C4956A, #8B6240)',
                          borderRadius: '2px',
                        }} />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}

function Stat({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ color: '#888', fontSize: '13px' }}>{label}</span>
      <span style={{ color: '#fff', fontWeight: 700, fontSize: '18px' }}>{value}</span>
    </div>
  )
}
