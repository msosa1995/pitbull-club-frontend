import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPerros } from '../../api'
import PublicLayout from '../../layouts/PublicLayout'
import PitbullSilhouette from '../../components/PitbullSilhouette'

const CARACTERISTICAS = [
  { label: 'Peso', value: '14 – 27 kg', icon: '⚖️' },
  { label: 'Altura', value: '43 – 53 cm', icon: '📏' },
  { label: 'Vida útil', value: '12 – 16 años', icon: '🕐' },
  { label: 'Origen', value: 'Estados Unidos', icon: '🌎' },
  { label: 'Reconocido por', value: 'ADBA, UKC', icon: '🏅' },
  { label: 'Grupo', value: 'Terrier / Molosoides', icon: '📚' },
]

const TEMPERAMENTO = [
  { label: 'Lealtad', nivel: 95, color: '#4a7aaa' },
  { label: 'Energía', nivel: 90, color: '#CC1100' },
  { label: 'Inteligencia', nivel: 85, color: '#C4956A' },
  { label: 'Sociabilidad (entrenada)', nivel: 75, color: '#6aaa4a' },
  { label: 'Protección', nivel: 80, color: '#aa7a4a' },
]

const CUIDADOS = [
  {
    titulo: 'Ejercicio',
    icono: '🏃',
    desc: 'Requiere al menos 1-2 horas de ejercicio intenso diario. Es un atleta nato que necesita actividad física constante para mantenerse equilibrado.'
  },
  {
    titulo: 'Socialización',
    icono: '🤝',
    desc: 'La socialización temprana es fundamental. Debe ser expuesto a diferentes personas, ambientes y animales desde cachorro para desarrollar un temperamento equilibrado.'
  },
  {
    titulo: 'Entrenamiento',
    icono: '🎯',
    desc: 'Responde excelentemente al entrenamiento con refuerzo positivo. Su alta inteligencia y deseo de complacer lo hacen ideal para deportes caninos como weight pull, agility y obediencia.'
  },
  {
    titulo: 'Alimentación',
    icono: '🥩',
    desc: 'Dieta rica en proteínas de calidad para mantener su musculatura. Consultar con veterinario la porción adecuada según edad, peso y nivel de actividad.'
  },
  {
    titulo: 'Salud',
    icono: '❤️',
    desc: 'Predisposición a displasia de cadera, alergias cutáneas y cataratas. Controles veterinarios regulares y vacunación al día son esenciales.'
  },
  {
    titulo: 'Pelaje',
    icono: '✨',
    desc: 'Pelaje corto y brillante de bajo mantenimiento. Cepillado semanal, baño mensual. Revisar orejas y uñas regularmente.'
  },
]

export default function RazaPitbull() {
  const [perros, setPerros] = useState([])

  useEffect(() => {
    getPerros({ raza: 'pitbull', ordering: 'nombre' }).then(r => {
      const data = r.data?.results ?? r.data
      setPerros(Array.isArray(data) ? data.slice(0, 6) : [])
    }).catch(() => {})
  }, [])

  return (
    <PublicLayout>

      {/* ══════ HERO ══════ */}
      <div style={styles.hero}>
        <div style={styles.heroGlow} />
        <div style={styles.heroPitbull}>
          <PitbullSilhouette size={500} opacity={0.07} />
        </div>
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>RAZA OFICIAL DEL CLUB</div>
          <h1 style={styles.heroTitle}>
            AMERICAN<br />
            <span style={styles.heroTitleAccent}>PIT BULL</span><br />
            TERRIER
          </h1>
          <div style={styles.heroLine} />
          <p style={styles.heroSubtitle}>
            El atleta canino por excelencia. Fuerza, lealtad y determinación en su máxima expresión.
          </p>
          <div style={styles.heroBtns}>
            <Link to="/ejemplares?raza=pitbull" style={styles.btnPrimary}>VER EJEMPLARES →</Link>
            <Link to="/contacto" style={styles.btnSecondary}>CONTACTAR</Link>
          </div>
        </div>
        <div style={styles.heroCard}>
          {CARACTERISTICAS.map(c => (
            <div key={c.label} style={styles.heroCardRow}>
              <span style={styles.heroCardIcon}>{c.icono}</span>
              <span style={styles.heroCardLabel}>{c.label}</span>
              <span style={styles.heroCardValue}>{c.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.container}>

        {/* ══════ HISTORIA ══════ */}
        <section style={styles.section}>
          <SectionDivider color="#4a7aaa" />
          <h2 style={styles.sectionTitle}>HISTORIA Y ORIGEN</h2>
          <div style={styles.textGrid}>
            <p style={styles.paragraph}>
              El American Pit Bull Terrier (APBT) tiene sus raíces en los bulldogs y terriers británicos
              del siglo XIX. Fue desarrollado originalmente para el bullbaiting y peleas de perros,
              pero rápidamente demostró ser un compañero excepcional para el trabajo y la familia.
            </p>
            <p style={styles.paragraph}>
              Con la llegada de los inmigrantes a América, la raza evolucionó significativamente.
              A principios del siglo XX, el APBT era conocido como la "mascota de América" y aparecía
              en carteles de la Primera y Segunda Guerra Mundial como símbolo de lealtad y fortaleza.
            </p>
            <p style={styles.paragraph}>
              La United Kennel Club (UKC) reconoció al American Pit Bull Terrier en 1898, siendo
              una de las primeras razas registradas en ese organismo. La American Dog Breeders Association
              (ADBA), fundada en 1909, se dedica exclusivamente a preservar y promover la raza en
              su forma atlética y de trabajo.
            </p>
            <p style={styles.paragraph}>
              Hoy en día, el APBT sobresale en deportes caninos como weight pull (jale de peso),
              agility, obediencia, Schutzhund y búsqueda y rescate. Su versatilidad, inteligencia
              y voluntad de trabajo lo convierten en un atleta sin igual en el mundo canino.
            </p>
          </div>
        </section>

        {/* ══════ CARACTERÍSTICAS FÍSICAS ══════ */}
        <section style={styles.section}>
          <SectionDivider color="#4a7aaa" />
          <h2 style={styles.sectionTitle}>CARACTERÍSTICAS FÍSICAS</h2>
          <div style={styles.featuresGrid}>
            <FeatureCard titulo="Cabeza" desc="Mediana a grande, ancha y profunda. Labios bien adheridos, mandíbulas fuertes con mordida en tijera. Ojos ovalados o almendrados de todos los colores excepto azul." />
            <FeatureCard titulo="Cuerpo" desc="Cuerpo de longitud media, bien musculado y definido. Pecho profundo y ancho. Costillas bien arqueadas, espalda fuerte y musculosa. Cola de inserción baja." />
            <FeatureCard titulo="Extremidades" desc="Patas delanteras rectas y fuertes. Patas traseras muy musculadas. Pies redondos y compactos con almohadillas gruesas. Movimiento ágil y poderoso." />
            <FeatureCard titulo="Pelaje" desc="Corto, denso, brillante y pegado al cuerpo. Se acepta cualquier color o combinación de colores excepto merle. El manto es una de las características más versátiles de la raza." />
            <FeatureCard titulo="Proporciones" desc="El cuerpo es ligeramente más largo que alto. La circunferencia del cráneo debe ser igual al perímetro del pecho. Estructura atlética y equilibrada." />
            <FeatureCard titulo="Orejas" desc="De inserción alta, medianas, semierguidas o rosas. Pueden ser cortadas aunque esto ya no es recomendado. Las orejas naturales caídas hacia adelante son parte del standard moderno." />
          </div>
        </section>

        {/* ══════ TEMPERAMENTO ══════ */}
        <section style={{ ...styles.section, background: '#0a0a0a', margin: '0 -32px', padding: '60px 32px' }}>
          <div style={styles.container}>
            <SectionDivider color="#4a7aaa" />
            <h2 style={styles.sectionTitle}>TEMPERAMENTO</h2>
            <div style={styles.temperGrid}>
              <div>
                <p style={styles.paragraph}>
                  El American Pit Bull Terrier es un perro de carácter fuerte, extremadamente
                  fiel a su familia y con una energía inagotable. Correctamente socializado y
                  entrenado, es un compañero excepcional que se destaca por su:
                </p>
                <ul style={styles.tempList}>
                  <li style={styles.tempItem}>✦ Alta tolerancia al dolor y determinación</li>
                  <li style={styles.tempItem}>✦ Lealtad incondicional hacia su familia</li>
                  <li style={styles.tempItem}>✦ Inteligencia y capacidad de aprendizaje</li>
                  <li style={styles.tempItem}>✦ Energía y entusiasmo para el trabajo</li>
                  <li style={styles.tempItem}>✦ Amor hacia los niños (históricamente conocido como "nanny dog")</li>
                  <li style={styles.tempItem}>✦ Tenacidad y voluntad de complacer</li>
                </ul>
                <div style={styles.warning}>
                  ⚠️ Como toda raza de trabajo, requiere un dueño experimentado, socialización
                  temprana y entrenamiento consistente. La responsabilidad del propietario es fundamental.
                </div>
              </div>
              <div>
                {TEMPERAMENTO.map(t => (
                  <div key={t.label} style={styles.temperBar}>
                    <div style={styles.temperBarHeader}>
                      <span style={styles.temperLabel}>{t.label}</span>
                      <span style={{ ...styles.temperPct, color: t.color }}>{t.nivel}%</span>
                    </div>
                    <div style={styles.temperBarBg}>
                      <div style={{ ...styles.temperBarFill, width: `${t.nivel}%`, background: t.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════ CUIDADOS ══════ */}
        <section style={styles.section}>
          <SectionDivider color="#4a7aaa" />
          <h2 style={styles.sectionTitle}>CUIDADOS Y MANTENIMIENTO</h2>
          <div style={styles.cuidadosGrid}>
            {CUIDADOS.map(c => (
              <div key={c.titulo} style={styles.cuidadoCard}>
                <div style={styles.cuidadoIcon}>{c.icono}</div>
                <h4 style={styles.cuidadoTitulo}>{c.titulo}</h4>
                <p style={styles.cuidadoDesc}>{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════ GALERÍA EJEMPLARES DEL CLUB ══════ */}
        {perros.length > 0 && (
          <section style={styles.section}>
            <SectionDivider color="#4a7aaa" />
            <h2 style={styles.sectionTitle}>APBT EN EL CLUB</h2>
            <div style={styles.perrosGrid}>
              {perros.map(p => (
                <Link to={`/ejemplares/${p.id}`} key={p.id} style={styles.perroCard}>
                  <div style={styles.perroPhoto}>
                    {p.foto_url
                      ? <img src={p.foto_url} alt={p.nombre} style={styles.perroImg} />
                      : <PitbullSilhouette size={70} opacity={0.2} />
                    }
                  </div>
                  <div style={styles.perroInfo}>
                    <div style={styles.perroNombre}>{p.nombre}</div>
                    <div style={styles.perroMeta}>{p.sexo_display} · {p.color}</div>
                    {p.kennel && <div style={styles.perroKennel}>{p.kennel}</div>}
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/ejemplares?raza=pitbull" style={styles.verTodosBtn}>VER TODOS LOS APBT DEL CLUB →</Link>
          </section>
        )}

      </div>
    </PublicLayout>
  )
}

function SectionDivider({ color = '#C4956A' }) {
  return <div style={{ height: 2, width: 50, background: color, marginBottom: 14 }} />
}

function FeatureCard({ titulo, desc }) {
  return (
    <div style={styles.featureCard}>
      <div style={styles.featureTitulo}>{titulo}</div>
      <p style={styles.featureDesc}>{desc}</p>
    </div>
  )
}

const styles = {
  hero: {
    minHeight: '85vh',
    background: 'linear-gradient(135deg, #060606 0%, #080a0e 100%)',
    borderBottom: '1px solid #1a1a1a',
    display: 'flex',
    alignItems: 'center',
    padding: '100px 48px 60px',
    position: 'relative',
    overflow: 'hidden',
    gap: 60,
    flexWrap: 'wrap',
  },
  heroGlow: {
    position: 'absolute', top: '30%', left: '20%',
    width: 500, height: 500,
    background: 'radial-gradient(circle, rgba(74,122,170,0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  heroPitbull: {
    position: 'absolute', right: -20, bottom: -20,
    opacity: 0.5, pointerEvents: 'none',
  },
  heroContent: {
    flex: 1, minWidth: 300, maxWidth: 540,
    position: 'relative', zIndex: 2,
  },
  heroBadge: {
    display: 'inline-block',
    background: 'rgba(74,122,170,0.1)',
    border: '1px solid rgba(74,122,170,0.3)',
    color: '#7aaddd',
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 4,
    padding: '5px 14px',
    borderRadius: 2,
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 'clamp(40px, 6vw, 72px)',
    fontWeight: 900,
    letterSpacing: 6,
    color: '#f0f0f0',
    margin: 0,
    lineHeight: 0.9,
  },
  heroTitleAccent: { color: '#7aaddd' },
  heroLine: {
    height: 2,
    width: 120,
    background: 'linear-gradient(90deg, #4a7aaa, transparent)',
    margin: '24px 0',
  },
  heroSubtitle: {
    color: '#666',
    fontSize: 14,
    lineHeight: 1.7,
    marginBottom: 28,
  },
  heroBtns: {
    display: 'flex',
    gap: 14,
    flexWrap: 'wrap',
  },
  btnPrimary: {
    background: '#4a7aaa',
    color: '#fff',
    padding: '12px 24px',
    fontWeight: 800,
    fontSize: 11,
    letterSpacing: 2,
    borderRadius: 2,
    textDecoration: 'none',
  },
  btnSecondary: {
    background: 'transparent',
    border: '1px solid #4a7aaa44',
    color: '#7aaddd',
    padding: '12px 24px',
    fontWeight: 700,
    fontSize: 11,
    letterSpacing: 2,
    borderRadius: 2,
    textDecoration: 'none',
  },
  heroCard: {
    background: '#0d0d0d',
    border: '1px solid #1e1e1e',
    borderLeft: '3px solid #4a7aaa',
    borderRadius: 3,
    padding: '20px 24px',
    minWidth: 260,
    position: 'relative', zIndex: 2,
  },
  heroCardRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '8px 0',
    borderBottom: '1px solid #111',
  },
  heroCardIcon: { fontSize: 16, width: 24 },
  heroCardLabel: { color: '#555', fontSize: 11, flex: 1 },
  heroCardValue: { color: '#e0e0e0', fontSize: 12, fontWeight: 700 },

  container: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 32px',
  },
  section: {
    padding: '60px 0',
    borderBottom: '1px solid #111',
  },
  sectionTitle: {
    color: '#f0f0f0',
    fontSize: 20,
    fontWeight: 900,
    letterSpacing: 4,
    marginBottom: 32,
  },

  textGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 20,
  },
  paragraph: {
    color: '#666',
    fontSize: 13,
    lineHeight: 1.8,
    margin: 0,
  },

  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: 14,
  },
  featureCard: {
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderTop: '2px solid #4a7aaa',
    borderRadius: 2,
    padding: '18px 18px',
  },
  featureTitulo: {
    color: '#7aaddd',
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: 2,
    marginBottom: 10,
  },
  featureDesc: {
    color: '#666',
    fontSize: 12,
    lineHeight: 1.7,
    margin: 0,
  },

  temperGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 40,
  },
  tempList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  tempItem: {
    color: '#888',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  warning: {
    background: 'rgba(196,149,106,0.08)',
    border: '1px solid rgba(196,149,106,0.2)',
    color: '#C4956A',
    fontSize: 12,
    lineHeight: 1.6,
    padding: '12px 16px',
    borderRadius: 2,
    borderLeft: '3px solid #C4956A',
  },
  temperBar: {
    marginBottom: 14,
  },
  temperBarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  temperLabel: { color: '#888', fontSize: 12 },
  temperPct: { fontSize: 12, fontWeight: 700 },
  temperBarBg: {
    height: 4,
    background: '#1a1a1a',
    borderRadius: 2,
  },
  temperBarFill: {
    height: 4,
    borderRadius: 2,
    transition: 'width 1s ease',
  },

  cuidadosGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 14,
  },
  cuidadoCard: {
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderRadius: 3,
    padding: '20px 18px',
  },
  cuidadoIcon: { fontSize: 28, marginBottom: 10 },
  cuidadoTitulo: {
    color: '#7aaddd',
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: 1,
    marginBottom: 10,
  },
  cuidadoDesc: {
    color: '#666',
    fontSize: 12,
    lineHeight: 1.7,
    margin: 0,
  },

  perrosGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: 12,
    marginBottom: 20,
  },
  perroCard: {
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderRadius: 3,
    overflow: 'hidden',
    textDecoration: 'none',
    transition: 'border-color 0.15s',
  },
  perroPhoto: {
    height: 140,
    background: 'rgba(74,122,170,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  perroImg: { width: '100%', height: '100%', objectFit: 'cover' },
  perroInfo: { padding: '10px 12px' },
  perroNombre: { color: '#e0e0e0', fontWeight: 700, fontSize: 13, marginBottom: 3 },
  perroMeta: { color: '#555', fontSize: 11, marginBottom: 3 },
  perroKennel: { color: '#7aaddd', fontSize: 10, letterSpacing: 0.5 },
  verTodosBtn: {
    display: 'inline-block',
    color: '#7aaddd',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 2,
    textDecoration: 'none',
    borderBottom: '1px solid #4a7aaa44',
    paddingBottom: 2,
    marginTop: 12,
  },
}
