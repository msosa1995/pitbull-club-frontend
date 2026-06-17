import { useState } from 'react'
import PublicLayout from '../../layouts/PublicLayout'
import PitbullSilhouette from '../../components/PitbullSilhouette'

const CIUDADES = [
  'Asunción', 'San Lorenzo', 'Luque', 'Mariano Roque Alonso',
  'Lambaré', 'Fernando de la Mora', 'Capiatá', 'Ciudad del Este',
  'Encarnación', 'Caaguazú', 'Pedro Juan Caballero', 'Otra',
]

export default function Contacto() {
  const [form, setForm] = useState({
    nombre: '', email: '', ciudad: '', whatsapp: '', asunto: '', mensaje: ''
  })
  const [enviado, setEnviado] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setEnviado(true)
      setLoading(false)
    }, 1000)
  }

  const whatsappMsg = encodeURIComponent(
    `Hola Pit Bull Club Paraguay! Me comunico desde tu sitio web.\n\n` +
    `Nombre: ${form.nombre || '...'}\n` +
    `Asunto: ${form.asunto || '...'}`
  )

  return (
    <PublicLayout>

      {/* ══════ HEADER ══════ */}
      <div style={styles.header}>
        <div style={styles.headerGlow} />
        <div style={styles.headerInner}>
          <div style={styles.badge}>COMUNICACIÓN OFICIAL</div>
          <h1 style={styles.title}>CONTACTO Y <span style={styles.accent}>CONSULTAS</span></h1>
          <p style={styles.sub}>
            Comunicate con el Pit Bull Club Paraguay. Respondemos consultas sobre membresías,
            registro de ejemplares, eventos y más.
          </p>
        </div>
        <div style={{ position: 'absolute', right: 0, bottom: 0, pointerEvents: 'none' }}>
          <PitbullSilhouette size={260} opacity={0.05} />
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.mainGrid}>

          {/* ══════ INFO DE CONTACTO ══════ */}
          <div style={styles.infoCol}>

            <div style={styles.infoCard}>
              <div style={styles.infoCardTitle}>INFORMACIÓN DEL CLUB</div>

              <div style={styles.infoItem}>
                <div style={styles.infoIcon}>📍</div>
                <div>
                  <div style={styles.infoLabel}>UBICACIÓN</div>
                  <div style={styles.infoValue}>Asunción, Paraguay</div>
                  <div style={styles.infoSub}>Actividades en todo el territorio nacional</div>
                </div>
              </div>

              <div style={styles.infoItem}>
                <div style={styles.infoIcon}>📱</div>
                <div>
                  <div style={styles.infoLabel}>WHATSAPP</div>
                  <a
                    href={`https://wa.me/595XXXXXXXXX?text=${whatsappMsg}`}
                    target="_blank" rel="noopener noreferrer"
                    style={styles.infoLink}
                  >
                    +595 XXX XXX XXX
                  </a>
                  <div style={styles.infoSub}>Lunes a sábados, 8:00 - 20:00 hs</div>
                </div>
              </div>

              <div style={styles.infoItem}>
                <div style={styles.infoIcon}>📧</div>
                <div>
                  <div style={styles.infoLabel}>EMAIL</div>
                  <div style={styles.infoValue}>info@pitbullclubpy.com</div>
                  <div style={styles.infoSub}>Respondemos en 24-48 horas hábiles</div>
                </div>
              </div>

              <div style={styles.infoItem}>
                <div style={styles.infoIcon}>🕐</div>
                <div>
                  <div style={styles.infoLabel}>HORARIO DE ATENCIÓN</div>
                  <div style={styles.infoValue}>Lunes a Viernes: 9:00 - 18:00 hs</div>
                  <div style={styles.infoValue}>Sábados: 9:00 - 14:00 hs</div>
                </div>
              </div>
            </div>

            {/* Redes sociales */}
            <div style={styles.socialCard}>
              <div style={styles.infoCardTitle}>REDES SOCIALES</div>
              <a href="#" style={styles.socialBtn}>
                <span style={styles.socialIcon}>📘</span>
                <span>Facebook</span>
                <span style={styles.socialArrow}>→</span>
              </a>
              <a href="#" style={styles.socialBtn}>
                <span style={styles.socialIcon}>📷</span>
                <span>Instagram</span>
                <span style={styles.socialArrow}>→</span>
              </a>
              <a href="#" style={styles.socialBtn}>
                <span style={styles.socialIcon}>📹</span>
                <span>YouTube</span>
                <span style={styles.socialArrow}>→</span>
              </a>
              <a href="#" style={styles.socialBtn}>
                <span style={styles.socialIcon}>💬</span>
                <span>TikTok</span>
                <span style={styles.socialArrow}>→</span>
              </a>
            </div>

            {/* Botón WhatsApp directo */}
            <a
              href={`https://wa.me/595XXXXXXXXX?text=${encodeURIComponent('Hola Pit Bull Club Paraguay!')}`}
              target="_blank" rel="noopener noreferrer"
              style={styles.whatsappBtn}
            >
              <span style={{ fontSize: 20 }}>📱</span>
              CONTACTAR POR WHATSAPP
            </a>
          </div>

          {/* ══════ FORMULARIO ══════ */}
          <div style={styles.formCol}>
            {enviado ? (
              <div style={styles.successCard}>
                <div style={{ fontSize: 52 }}>✅</div>
                <h3 style={styles.successTitle}>¡MENSAJE ENVIADO!</h3>
                <p style={styles.successText}>
                  Gracias por comunicarte con nosotros. Revisaremos tu mensaje y te
                  responderemos a la brevedad.
                </p>
                <button onClick={() => { setEnviado(false); setForm({ nombre: '', email: '', ciudad: '', whatsapp: '', asunto: '', mensaje: '' }) }}
                  style={styles.resetBtn}>
                  ENVIAR OTRO MENSAJE
                </button>
              </div>
            ) : (
              <div style={styles.formCard}>
                <div style={styles.formTitle}>ENVIAR CONSULTA</div>

                <form onSubmit={handleSubmit} style={styles.form}>
                  <div style={styles.formRow}>
                    <div style={styles.formField}>
                      <label style={styles.label}>NOMBRE COMPLETO *</label>
                      <input name="nombre" value={form.nombre} onChange={handleChange}
                        style={styles.input} required placeholder="Tu nombre" />
                    </div>
                    <div style={styles.formField}>
                      <label style={styles.label}>WHATSAPP</label>
                      <input name="whatsapp" value={form.whatsapp} onChange={handleChange}
                        style={styles.input} placeholder="+595 9XX XXX XXX" />
                    </div>
                  </div>

                  <div style={styles.formRow}>
                    <div style={styles.formField}>
                      <label style={styles.label}>EMAIL</label>
                      <input name="email" value={form.email} onChange={handleChange}
                        type="email" style={styles.input} placeholder="tu@email.com" />
                    </div>
                    <div style={styles.formField}>
                      <label style={styles.label}>CIUDAD</label>
                      <select name="ciudad" value={form.ciudad} onChange={handleChange}
                        style={styles.input}>
                        <option value="">Seleccioná tu ciudad...</option>
                        {CIUDADES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={styles.formField}>
                    <label style={styles.label}>ASUNTO *</label>
                    <select name="asunto" value={form.asunto} onChange={handleChange}
                      style={styles.input} required>
                      <option value="">¿Sobre qué querés consultar?</option>
                      <option value="membresia">Membresía al club</option>
                      <option value="registro">Registro de ejemplares / Pedigree</option>
                      <option value="eventos">Información sobre eventos</option>
                      <option value="campeonatos">Campeonatos y competencias</option>
                      <option value="crianza">Asesoramiento en crianza</option>
                      <option value="compra">Compra/venta de ejemplares</option>
                      <option value="otro">Otro motivo</option>
                    </select>
                  </div>

                  <div style={styles.formField}>
                    <label style={styles.label}>MENSAJE *</label>
                    <textarea
                      name="mensaje" value={form.mensaje} onChange={handleChange}
                      style={{ ...styles.input, minHeight: 130, resize: 'vertical' }}
                      required
                      placeholder="Describí tu consulta con el mayor detalle posible..."
                    />
                  </div>

                  <button type="submit" disabled={loading} style={styles.submitBtn}>
                    {loading ? 'ENVIANDO...' : 'ENVIAR CONSULTA'}
                  </button>

                  <p style={styles.formNote}>
                    * Campos obligatorios. Tu información es confidencial y no será compartida con terceros.
                  </p>
                </form>
              </div>
            )}
          </div>

        </div>

        {/* ══════ MEMBRESÍA CTA ══════ */}
        <div style={styles.cta}>
          <div style={styles.ctaLeft}>
            <div style={styles.ctaTitle}>¿QUERÉS SER SOCIO DEL CLUB?</div>
            <p style={styles.ctaText}>
              Registrá tus ejemplares, participá en eventos y formá parte de la comunidad
              más importante de APBT y American Bully en Paraguay.
            </p>
          </div>
          <a href="#" style={styles.ctaBtn}>SOLICITAR MEMBRESÍA</a>
        </div>

      </div>
    </PublicLayout>
  )
}

const styles = {
  header: {
    background: 'linear-gradient(135deg, #060606 0%, #080806 100%)',
    borderBottom: '1px solid #1a1a1a',
    padding: '100px 48px 52px',
    position: 'relative', overflow: 'hidden',
  },
  headerGlow: {
    position: 'absolute', top: '30%', left: '20%',
    width: 400, height: 300,
    background: 'radial-gradient(ellipse, rgba(196,149,106,0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  headerInner: { position: 'relative', zIndex: 2, maxWidth: 700 },
  badge: {
    display: 'inline-block',
    background: 'rgba(196,149,106,0.1)',
    border: '1px solid rgba(196,149,106,0.3)',
    color: '#C4956A', fontSize: 9, fontWeight: 700, letterSpacing: 4,
    padding: '5px 14px', borderRadius: 2, marginBottom: 18,
  },
  title: {
    fontSize: 'clamp(32px, 5vw, 56px)',
    fontWeight: 900, letterSpacing: 4, color: '#f0f0f0',
    margin: '0 0 12px',
  },
  accent: { color: '#C4956A' },
  sub: { color: '#555', fontSize: 13, lineHeight: 1.7 },

  container: {
    maxWidth: 1200, margin: '0 auto', padding: '40px 32px',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 32,
    marginBottom: 48,
  },

  infoCol: {
    display: 'flex', flexDirection: 'column', gap: 16,
  },
  infoCard: {
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderRadius: 3,
    padding: '20px 22px',
  },
  infoCardTitle: {
    color: '#444', fontSize: 9, fontWeight: 700, letterSpacing: 4,
    marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #111',
  },
  infoItem: {
    display: 'flex', gap: 14, alignItems: 'flex-start',
    padding: '12px 0', borderBottom: '1px solid #111',
  },
  infoIcon: { fontSize: 20, width: 28, flexShrink: 0, marginTop: 2 },
  infoLabel: { color: '#444', fontSize: 9, fontWeight: 700, letterSpacing: 3, marginBottom: 4 },
  infoValue: { color: '#e0e0e0', fontSize: 13, fontWeight: 600, marginBottom: 3 },
  infoSub: { color: '#444', fontSize: 11 },
  infoLink: {
    color: '#C4956A', fontSize: 13, fontWeight: 700,
    textDecoration: 'none', display: 'block', marginBottom: 3,
  },

  socialCard: {
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderRadius: 3,
    padding: '20px 22px',
  },
  socialBtn: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '10px 0',
    borderBottom: '1px solid #111',
    color: '#777', fontSize: 13, textDecoration: 'none',
    transition: 'color 0.1s',
  },
  socialIcon: { fontSize: 18, width: 28 },
  socialArrow: { marginLeft: 'auto', color: '#333' },

  whatsappBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    background: '#25d366',
    color: '#fff',
    padding: '14px',
    borderRadius: 3,
    fontWeight: 800,
    fontSize: 12,
    letterSpacing: 2,
    textDecoration: 'none',
  },

  formCol: {},
  formCard: {
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderTop: '2px solid #C4956A',
    borderRadius: 3,
    padding: '28px 28px',
  },
  formTitle: {
    color: '#C4956A', fontSize: 10, fontWeight: 700, letterSpacing: 4,
    marginBottom: 24, paddingBottom: 14, borderBottom: '1px solid #1a1a1a',
  },
  form: { display: 'flex', flexDirection: 'column', gap: 16 },
  formRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 },
  formField: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { color: '#444', fontSize: 9, fontWeight: 700, letterSpacing: 2 },
  input: {
    padding: '11px 14px',
    background: '#080808',
    border: '1px solid #1e1e1e',
    color: '#e0e0e0',
    fontSize: 13,
    borderRadius: 2,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  submitBtn: {
    padding: '14px',
    background: '#C4956A',
    border: 'none',
    color: '#060606',
    fontWeight: 900,
    fontSize: 12,
    letterSpacing: 3,
    borderRadius: 2,
    cursor: 'pointer',
    marginTop: 4,
  },
  formNote: {
    color: '#333', fontSize: 10, lineHeight: 1.6, margin: 0,
  },

  successCard: {
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderRadius: 3,
    padding: '60px 28px',
    textAlign: 'center',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
  },
  successTitle: {
    color: '#C4956A', fontSize: 18, fontWeight: 900, letterSpacing: 3, margin: 0,
  },
  successText: {
    color: '#666', fontSize: 13, lineHeight: 1.7, maxWidth: 360,
  },
  resetBtn: {
    background: 'transparent',
    border: '1px solid #C4956A44',
    color: '#C4956A',
    padding: '10px 24px',
    fontSize: 11, fontWeight: 700, letterSpacing: 2,
    borderRadius: 2, cursor: 'pointer',
  },

  cta: {
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderLeft: '3px solid #C4956A',
    borderRadius: 3,
    padding: '28px 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 24,
    flexWrap: 'wrap',
  },
  ctaLeft: { flex: 1, minWidth: 250 },
  ctaTitle: {
    color: '#C4956A', fontSize: 14, fontWeight: 900, letterSpacing: 3, marginBottom: 8,
  },
  ctaText: {
    color: '#555', fontSize: 13, lineHeight: 1.6, margin: 0,
  },
  ctaBtn: {
    display: 'inline-block',
    background: '#C4956A',
    color: '#060606',
    padding: '13px 28px',
    fontWeight: 900,
    fontSize: 11,
    letterSpacing: 3,
    borderRadius: 2,
    textDecoration: 'none',
    flexShrink: 0,
  },
}
