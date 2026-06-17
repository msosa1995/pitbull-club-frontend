import PublicLayout from '../../layouts/PublicLayout'
import PitbullSilhouette from '../../components/PitbullSilhouette'

const OBJETIVOS = [
  { icono: '📋', titulo: 'Registro de Ejemplares', desc: 'Mantener un registro oficial y confiable de los ejemplares de APBT y American Bully en Paraguay, garantizando la trazabilidad genealógica.' },
  { icono: '🏆', titulo: 'Competencias y Exposiciones', desc: 'Organizar y promover eventos de conformación, weight pull, agility y otras disciplinas del deporte canino para elevar los estándares de la raza.' },
  { icono: '🤝', titulo: 'Red de Criadores', desc: 'Conectar a criadores responsables con compradores conscientes, fomentando prácticas de cría éticas y el bienestar animal.' },
  { icono: '📚', titulo: 'Educación y Difusión', desc: 'Informar al público sobre las características reales de estas razas, combatiendo mitos y promoviendo una tenencia responsable.' },
  { icono: '🌎', titulo: 'Conexión Internacional', desc: 'Establecer vínculos con organizaciones internacionales como ADBA, ABKC y UKC para la homologación de registros y pedigrees.' },
  { icono: '⚖️', titulo: 'Defensa de las Razas', desc: 'Trabajar activamente contra las legislaciones discriminatorias que afectan a estas razas, promoviendo la evaluación individual de cada animal.' },
]

const DIRECTIVOS = [
  { cargo: 'PRESIDENTE', nombre: 'Por confirmar', icon: '👑' },
  { cargo: 'VICEPRESIDENTE', nombre: 'Por confirmar', icon: '🥈' },
  { cargo: 'SECRETARIO', nombre: 'Por confirmar', icon: '📝' },
  { cargo: 'TESORERO', nombre: 'Por confirmar', icon: '💰' },
  { cargo: 'VOCAL 1', nombre: 'Por confirmar', icon: '🎯' },
  { cargo: 'VOCAL 2', nombre: 'Por confirmar', icon: '🎯' },
]

export default function Club() {
  return (
    <PublicLayout>

      {/* ══════ HERO ══════ */}
      <div style={styles.hero}>
        <div style={styles.heroGlow} />
        <div style={styles.heroPitbull}>
          <PitbullSilhouette size={400} opacity={0.07} />
        </div>
        <div style={styles.heroInner}>
          <div style={styles.heroBadge}>INSTITUCIÓN OFICIAL</div>
          <h1 style={styles.heroTitle}>EL <span style={styles.heroTitleAccent}>CLUB</span></h1>
          <div style={styles.heroLine} />
          <p style={styles.heroSubtitle}>
            La organización referente del American Pit Bull Terrier<br />
            y American Bully en la República del Paraguay.
          </p>
        </div>
      </div>

      <div style={styles.container}>

        {/* ══════ HISTORIA ══════ */}
        <section style={styles.section}>
          <div style={styles.twoCol}>
            <div>
              <Divider />
              <h2 style={styles.sectionTitle}>NUESTRA HISTORIA</h2>
              <p style={styles.paragraph}>
                El Pit Bull Club Paraguay nació de la pasión compartida de un grupo de criadores,
                deportistas y amantes de las razas American Pit Bull Terrier y American Bully en
                el país. Fundado en 2024, el club surge como respuesta a la necesidad de contar
                con una organización formal que representara y promoviera estas razas de manera
                responsable y transparente.
              </p>
              <p style={styles.paragraph}>
                Desde sus inicios, el club ha trabajado para establecer un registro serio de
                ejemplares, organizar eventos de calidad y educar al público sobre las
                características reales de estas razas, tan a menudo malentendidas por los medios
                y la legislación.
              </p>
              <p style={styles.paragraph}>
                Hoy, con más de 46 miembros activos distribuidos en distintas ciudades del país,
                el Pit Bull Club Paraguay se consolida como la referencia nacional para todo
                lo relacionado con el APBT y el American Bully.
              </p>
            </div>
            <div style={styles.historyCard}>
              <div style={styles.historyCardInner}>
                <div style={styles.historyLogoWrap}>
                  <div style={styles.historyLogoGlow} />
                  <img src="/logo.jpg" alt="Pit Bull Club Paraguay" style={styles.historyLogo} />
                </div>
                <div style={styles.historyStat}>
                  <div style={styles.historyStatNum}>2024</div>
                  <div style={styles.historyStatLabel}>AÑO DE FUNDACIÓN</div>
                </div>
                <div style={styles.historyStatRow}>
                  <div style={styles.historyStatSmall}>
                    <div style={{ color: '#C4956A', fontSize: 22, fontWeight: 900 }}>46+</div>
                    <div style={styles.historyStatSmallLabel}>MIEMBROS</div>
                  </div>
                  <div style={styles.historyStatSmall}>
                    <div style={{ color: '#C4956A', fontSize: 22, fontWeight: 900 }}>2</div>
                    <div style={styles.historyStatSmallLabel}>RAZAS</div>
                  </div>
                  <div style={styles.historyStatSmall}>
                    <div style={{ color: '#C4956A', fontSize: 22, fontWeight: 900 }}>PY</div>
                    <div style={styles.historyStatSmallLabel}>PARAGUAY</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════ MISIÓN Y VISIÓN ══════ */}
        <section style={{ ...styles.section, background: '#0a0a0a', margin: '0 -32px', padding: '60px 32px' }}>
          <div style={styles.container}>
            <div style={styles.mvGrid}>
              <div style={{ ...styles.mvCard, borderTop: '2px solid #C4956A' }}>
                <div style={styles.mvIcon}>🎯</div>
                <h3 style={styles.mvTitle}>MISIÓN</h3>
                <p style={styles.mvText}>
                  Promover, preservar y registrar los ejemplares de American Pit Bull Terrier
                  y American Bully en Paraguay, fomentando la cría responsable, la excelencia
                  en el deporte canino y la tenencia consciente de estas razas, en un marco
                  de ética, transparencia y respeto por el bienestar animal.
                </p>
              </div>
              <div style={{ ...styles.mvCard, borderTop: '2px solid #C4956A' }}>
                <div style={styles.mvIcon}>👁️</div>
                <h3 style={styles.mvTitle}>VISIÓN</h3>
                <p style={styles.mvText}>
                  Ser la organización de referencia en Sudamérica para el American Pit Bull
                  Terrier y el American Bully, reconocida internacionalmente por la calidad
                  de sus registros, la transparencia de sus procesos y la excelencia de sus
                  ejemplares en competencias de nivel mundial.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════ OBJETIVOS ══════ */}
        <section style={styles.section}>
          <Divider />
          <h2 style={styles.sectionTitle}>OBJETIVOS DEL CLUB</h2>
          <div style={styles.objetivosGrid}>
            {OBJETIVOS.map(o => (
              <div key={o.titulo} style={styles.objetivoCard}>
                <div style={styles.objetivoIcon}>{o.icono}</div>
                <h4 style={styles.objetivoTitulo}>{o.titulo}</h4>
                <p style={styles.objetivoDesc}>{o.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════ COMISIÓN DIRECTIVA ══════ */}
        <section style={{ ...styles.section, background: '#0a0a0a', margin: '0 -32px', padding: '60px 32px' }}>
          <div style={styles.container}>
            <Divider />
            <h2 style={styles.sectionTitle}>COMISIÓN DIRECTIVA</h2>
            <p style={{ ...styles.paragraph, marginBottom: 28 }}>
              El club está gobernado por una comisión directiva elegida democráticamente por
              los socios activos. La directiva se renueva periódicamente en asambleas ordinarias.
            </p>
            <div style={styles.directivosGrid}>
              {DIRECTIVOS.map(d => (
                <div key={d.cargo} style={styles.directivoCard}>
                  <div style={styles.directivoIcon}>{d.icon}</div>
                  <div style={styles.directivoCargo}>{d.cargo}</div>
                  <div style={styles.directivoNombre}>{d.nombre}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ MEMBRESÍA ══════ */}
        <section style={styles.section}>
          <Divider />
          <h2 style={styles.sectionTitle}>CÓMO ASOCIARSE</h2>
          <div style={styles.twoCol}>
            <div>
              <p style={styles.paragraph}>
                Cualquier persona mayor de 18 años que sea propietario o criador de American
                Pit Bull Terrier o American Bully puede solicitar su incorporación al club.
                El proceso de admisión incluye:
              </p>
              <div style={styles.pasosList}>
                <div style={styles.paso}>
                  <div style={styles.pasoNum}>01</div>
                  <div>
                    <strong style={styles.pasoLabel}>Contacto inicial</strong>
                    <p style={styles.pasoText}>Comunicarse con el club vía WhatsApp o email para expresar interés.</p>
                  </div>
                </div>
                <div style={styles.paso}>
                  <div style={styles.pasoNum}>02</div>
                  <div>
                    <strong style={styles.pasoLabel}>Formulario de ingreso</strong>
                    <p style={styles.pasoText}>Completar el formulario de solicitud con datos personales y de los ejemplares.</p>
                  </div>
                </div>
                <div style={styles.paso}>
                  <div style={styles.pasoNum}>03</div>
                  <div>
                    <strong style={styles.pasoLabel}>Evaluación</strong>
                    <p style={styles.pasoText}>La comisión directiva evalúa la solicitud y verifica los requisitos.</p>
                  </div>
                </div>
                <div style={styles.paso}>
                  <div style={styles.pasoNum}>04</div>
                  <div>
                    <strong style={styles.pasoLabel}>Aceptación y pago</strong>
                    <p style={styles.pasoText}>Una vez aprobado, el candidato abona la cuota de inscripción y cuota mensual.</p>
                  </div>
                </div>
              </div>
            </div>
            <div style={styles.beneficiosCard}>
              <div style={styles.beneficiosTitulo}>BENEFICIOS DEL SOCIO</div>
              <div style={styles.beneficiosList}>
                {[
                  '✦ Registro de ejemplares con pedigree oficial',
                  '✦ Acceso prioritario a eventos del club',
                  '✦ Red de contactos con criadores seleccionados',
                  '✦ Participación en campeonatos anuales',
                  '✦ Voto en asambleas y decisiones del club',
                  '✦ Publicación de ejemplares en catálogo oficial',
                  '✦ Asesoramiento veterinario de referencia',
                  '✦ Descuentos en eventos y servicios del club',
                ].map(b => (
                  <div key={b} style={styles.beneficioItem}>{b}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </PublicLayout>
  )
}

function Divider() {
  return <div style={{ height: 2, width: 50, background: '#C4956A', marginBottom: 14 }} />
}

const styles = {
  hero: {
    minHeight: '50vh',
    background: 'linear-gradient(135deg, #060606 0%, #0a0a08 100%)',
    borderBottom: '1px solid #1a1a1a',
    display: 'flex',
    alignItems: 'center',
    padding: '100px 48px 60px',
    position: 'relative',
    overflow: 'hidden',
  },
  heroGlow: {
    position: 'absolute', top: '30%', right: '20%',
    width: 400, height: 400,
    background: 'radial-gradient(circle, rgba(196,149,106,0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  heroPitbull: {
    position: 'absolute', right: -20, bottom: -20,
    pointerEvents: 'none',
  },
  heroInner: {
    position: 'relative', zIndex: 2,
    maxWidth: 700,
  },
  heroBadge: {
    display: 'inline-block',
    background: 'rgba(196,149,106,0.1)',
    border: '1px solid rgba(196,149,106,0.3)',
    color: '#C4956A',
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 4,
    padding: '5px 14px',
    borderRadius: 2,
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 'clamp(48px, 8vw, 96px)',
    fontWeight: 900,
    letterSpacing: 8,
    color: '#f0f0f0',
    margin: 0,
    lineHeight: 0.9,
  },
  heroTitleAccent: { color: '#C4956A' },
  heroLine: {
    height: 2,
    width: 120,
    background: 'linear-gradient(90deg, #C4956A, transparent)',
    margin: '24px 0',
  },
  heroSubtitle: {
    color: '#666',
    fontSize: 16,
    lineHeight: 1.7,
  },

  container: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 32px',
  },
  section: {
    padding: '64px 0',
    borderBottom: '1px solid #111',
  },
  sectionTitle: {
    color: '#f0f0f0',
    fontSize: 20,
    fontWeight: 900,
    letterSpacing: 4,
    marginBottom: 28,
  },
  paragraph: {
    color: '#666',
    fontSize: 13,
    lineHeight: 1.8,
    margin: '0 0 16px',
  },

  twoCol: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 40,
    alignItems: 'start',
  },

  historyCard: {
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderRadius: 3,
    overflow: 'hidden',
  },
  historyCardInner: {
    padding: '28px',
  },
  historyLogoWrap: {
    textAlign: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  historyLogoGlow: {
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 150, height: 150,
    background: 'radial-gradient(circle, rgba(196,149,106,0.12) 0%, transparent 70%)',
    borderRadius: '50%',
  },
  historyLogo: {
    width: '100%', maxWidth: 180,
    borderRadius: 4,
    position: 'relative', zIndex: 1,
  },
  historyStat: {
    textAlign: 'center',
    padding: '16px 0',
    borderTop: '1px solid #1a1a1a',
    borderBottom: '1px solid #1a1a1a',
    marginBottom: 16,
  },
  historyStatNum: {
    color: '#C4956A',
    fontSize: 40,
    fontWeight: 900,
    letterSpacing: 2,
  },
  historyStatLabel: {
    color: '#444',
    fontSize: 9,
    letterSpacing: 3,
    fontWeight: 700,
  },
  historyStatRow: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  historyStatSmall: {
    textAlign: 'center',
  },
  historyStatSmallLabel: {
    color: '#444',
    fontSize: 8,
    letterSpacing: 2,
    fontWeight: 700,
  },

  mvGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 20,
  },
  mvCard: {
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderRadius: 3,
    padding: '28px 24px',
  },
  mvIcon: { fontSize: 32, marginBottom: 12 },
  mvTitle: {
    color: '#C4956A',
    fontSize: 14,
    fontWeight: 900,
    letterSpacing: 4,
    marginBottom: 14,
  },
  mvText: {
    color: '#666',
    fontSize: 13,
    lineHeight: 1.8,
    margin: 0,
  },

  objetivosGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 14,
  },
  objetivoCard: {
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderLeft: '2px solid #C4956A44',
    borderRadius: 2,
    padding: '18px 16px',
  },
  objetivoIcon: { fontSize: 24, marginBottom: 10 },
  objetivoTitulo: {
    color: '#C4956A',
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 1,
    marginBottom: 8,
  },
  objetivoDesc: {
    color: '#666',
    fontSize: 12,
    lineHeight: 1.7,
    margin: 0,
  },

  directivosGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: 14,
  },
  directivoCard: {
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderRadius: 3,
    padding: '20px 16px',
    textAlign: 'center',
  },
  directivoIcon: { fontSize: 28, marginBottom: 10 },
  directivoCargo: {
    color: '#C4956A',
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 3,
    marginBottom: 8,
  },
  directivoNombre: {
    color: '#888',
    fontSize: 13,
    fontWeight: 700,
  },

  pasosList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    marginTop: 16,
  },
  paso: {
    display: 'flex',
    gap: 16,
    alignItems: 'flex-start',
  },
  pasoNum: {
    color: '#C4956A',
    fontSize: 22,
    fontWeight: 900,
    flexShrink: 0,
    width: 36,
    lineHeight: 1,
  },
  pasoLabel: {
    color: '#e0e0e0',
    fontSize: 13,
    fontWeight: 700,
    display: 'block',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  pasoText: {
    color: '#555',
    fontSize: 12,
    lineHeight: 1.6,
    margin: 0,
  },

  beneficiosCard: {
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderTop: '2px solid #C4956A',
    borderRadius: 3,
    padding: '24px',
  },
  beneficiosTitulo: {
    color: '#C4956A',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 4,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottom: '1px solid #1a1a1a',
  },
  beneficiosList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  beneficioItem: {
    color: '#777',
    fontSize: 12,
    letterSpacing: 0.3,
    paddingBottom: 10,
    borderBottom: '1px solid #111',
  },
}
