import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPerros } from '../../api'
import PublicLayout from '../../layouts/PublicLayout'
import PitbullSilhouette from '../../components/PitbullSilhouette'

const VARIANTES = [
  {
    nombre: 'POCKET',
    altura: '< 43 cm (machos) / < 40 cm (hembras)',
    peso: '11 – 20 kg',
    desc: 'La variante más compacta. Mayor musculatura relativa a su tamaño, cabeza extremadamente ancha y masa muscular concentrada.',
    color: '#9a4aaa',
  },
  {
    nombre: 'STANDARD',
    altura: '43 – 51 cm (machos) / 40 – 48 cm (hembras)',
    peso: '25 – 40 kg',
    desc: 'La variante de referencia. Equilibrio perfecto entre tamaño, musculatura y proporciones. Base del estándar ABKC.',
    color: '#7a4aaa',
  },
  {
    nombre: 'CLASSIC',
    altura: '43 – 51 cm (machos) / 40 – 48 cm (hembras)',
    peso: '23 – 36 kg',
    desc: 'Apariencia más parecida al APBT original. Menos masa muscular que el Standard pero con las características del Bully.',
    color: '#5a4aaa',
  },
  {
    nombre: 'XL',
    altura: '> 51 cm (machos) / > 48 cm (hembras)',
    peso: '35 – 54 kg',
    desc: 'La variante de mayor tamaño. Mantiene todas las características del Bully pero a escala mayor. Impresionante presencia.',
    color: '#4a5aaa',
  },
  {
    nombre: 'EXTREME',
    altura: 'Varía por subcategoría',
    peso: '35 – 60+ kg',
    desc: 'Musculatura extrema y exagerada. La variante más selectiva, con características físicas llevadas al máximo. Reconocida por organizaciones específicas.',
    color: '#4a4aaa',
  },
]

const CARACTERISTICAS = [
  { label: 'Peso Standard', value: '25 – 40 kg', icono: '⚖️' },
  { label: 'Altura Standard', value: '43 – 51 cm', icono: '📏' },
  { label: 'Vida útil', value: '10 – 13 años', icono: '🕐' },
  { label: 'Origen', value: 'Estados Unidos (1990s)', icono: '🌎' },
  { label: 'Reconocido por', value: 'ABKC, UKC', icono: '🏅' },
  { label: 'Derivado de', value: 'APBT + Bulldog', icono: '🐕' },
]

export default function RazaBully() {
  const [perros, setPerros] = useState([])

  useEffect(() => {
    getPerros({ raza: 'bully', ordering: 'nombre' }).then(r => {
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
            <span style={styles.heroTitleAccent}>BULLY</span>
          </h1>
          <div style={styles.heroLine} />
          <p style={styles.heroSubtitle}>
            Musculatura extrema, temperamento excepcional. La evolución moderna del APBT.
          </p>
          <div style={styles.heroBtns}>
            <Link to="/ejemplares?raza=bully" style={styles.btnPrimary}>VER EJEMPLARES →</Link>
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
          <SectionDivider />
          <h2 style={styles.sectionTitle}>HISTORIA Y ORIGEN</h2>
          <div style={styles.textGrid}>
            <p style={styles.paragraph}>
              El American Bully es una raza relativamente nueva, desarrollada en los Estados Unidos
              durante la década de 1990. Sus creadores, liderados por Dave Wilson, buscaban crear
              un perro compañero ideal: la musculatura y apariencia del American Pit Bull Terrier
              pero con un temperamento aún más dócil y afectuoso.
            </p>
            <p style={styles.paragraph}>
              La raza se desarrolló mediante la selección cuidadosa de ejemplares de APBT con
              características físicas particulares, incorporando eventualmente genes de American
              Staffordshire Terrier, Bulldog Americano y otras razas afines para potenciar
              la musculatura y la estructura del cráneo.
            </p>
            <p style={styles.paragraph}>
              La American Bully Kennel Club (ABKC) se fundó en 2004 para establecer el estándar
              oficial de la raza y organizar eventos de conformación. Poco después, la United
              Kennel Club (UKC) la reconoció oficialmente en 2013, dándole visibilidad internacional.
            </p>
            <p style={styles.paragraph}>
              Hoy, el American Bully es una de las razas de mayor crecimiento en el mundo. Su
              combinación de apariencia poderosa y temperamento equilibrado lo han convertido en
              el favorito de criadores y familias de todo el planeta, incluyendo Paraguay.
            </p>
          </div>
        </section>

        {/* ══════ VARIANTES ══════ */}
        <section style={{ ...styles.section, background: '#0a0a0a', margin: '0 -32px', padding: '60px 32px' }}>
          <div style={styles.container}>
            <SectionDivider />
            <h2 style={styles.sectionTitle}>VARIANTES RECONOCIDAS</h2>
            <p style={{ ...styles.paragraph, marginBottom: 28 }}>
              El American Bully se clasifica en 5 variantes oficiales según su tamaño. Todas
              mantienen las mismas características de temperamento y estructura general, diferenciándose
              principalmente en la altura al hombro y la masa corporal.
            </p>
            <div style={styles.variantesGrid}>
              {VARIANTES.map(v => (
                <div key={v.nombre} style={{ ...styles.varianteCard, borderTop: `2px solid ${v.color}` }}>
                  <div style={{ ...styles.varianteNombre, color: v.color }}>{v.nombre}</div>
                  <div style={styles.varianteDato}>
                    <span style={styles.varianteDatoLabel}>Altura:</span>
                    <span style={styles.varianteDatoVal}>{v.altura}</span>
                  </div>
                  <div style={styles.varianteDato}>
                    <span style={styles.varianteDatoLabel}>Peso:</span>
                    <span style={styles.varianteDatoVal}>{v.peso}</span>
                  </div>
                  <p style={styles.varianteDesc}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ CARACTERÍSTICAS FÍSICAS ══════ */}
        <section style={styles.section}>
          <SectionDivider />
          <h2 style={styles.sectionTitle}>CARACTERÍSTICAS FÍSICAS</h2>
          <div style={styles.featuresGrid}>
            <FeatureCard titulo="Cabeza" desc="Grande y ancha, característica más distintiva de la raza. Cráneo amplio con mejillas pronunciadas y musculatura maseterina evidente. Hocico corto a mediano, bien definido." />
            <FeatureCard titulo="Cuerpo" desc="Extremadamente musculado y compacto. Pecho ancho y profundo con costillas bien arqueadas. La relación entre ancho de pecho y altura al hombro es superior a cualquier otra raza." />
            <FeatureCard titulo="Musculatura" desc="Musculatura visible en todo el cuerpo, especialmente en cuello, hombros, espalda y cuartos traseros. La masa muscular es la característica definitoria del American Bully." />
            <FeatureCard titulo="Pelaje" desc="Corto, brillante y pegado al cuerpo. Se acepta cualquier color excepto merle. La variedad de colores es enorme: azul, champagne, lilac, tri-color, ghostpied y muchos más." />
            <FeatureCard titulo="Ojos" desc="Ovalados, de tamaño mediano, bien separados. Todos los colores son aceptables excepto albino. Los ojos azules son permitidos aunque no preferidos en todas las variantes." />
            <FeatureCard titulo="Temperamento" desc="A pesar de su imponente apariencia, el American Bully tiene uno de los temperamentos más dóciles y equilibrados. Extremadamente afectuoso con niños y familias." />
          </div>
        </section>

        {/* ══════ TEMPERAMENTO Y CUIDADOS ══════ */}
        <section style={styles.section}>
          <SectionDivider />
          <h2 style={styles.sectionTitle}>TEMPERAMENTO Y CUIDADOS</h2>
          <div style={styles.temperGrid}>
            <div>
              <h3 style={styles.subTitle}>Carácter</h3>
              <p style={styles.paragraph}>
                El American Bully fue específicamente seleccionado para ser un perro de compañía
                excepcional. A diferencia del APBT orientado al trabajo, el Bully prioriza la
                interacción social y el afecto familiar.
              </p>
              <ul style={styles.tempList}>
                <li style={styles.tempItem}>✦ Extremadamente afectuoso con la familia</li>
                <li style={styles.tempItem}>✦ Muy gentil con niños (ideal como perro familiar)</li>
                <li style={styles.tempItem}>✦ Seguro de sí mismo y equilibrado</li>
                <li style={styles.tempItem}>✦ Menos propenso a la selectividad con otros perros que el APBT</li>
                <li style={styles.tempItem}>✦ Adaptable a diferentes estilos de vida</li>
                <li style={styles.tempItem}>✦ Sociable pero buen guardián del hogar</li>
              </ul>
            </div>
            <div>
              <h3 style={styles.subTitle}>Cuidados específicos</h3>
              <div style={styles.cuidadosList}>
                <div style={styles.cuidadoItem}>
                  <span style={styles.cuidadoIcon}>🏃</span>
                  <div>
                    <strong style={styles.cuidadoLabel}>Ejercicio moderado</strong>
                    <p style={styles.cuidadoText}>45-60 min diarios. Cuidar el sobrecalentamiento por su estructura braquicéfala en algunas variantes.</p>
                  </div>
                </div>
                <div style={styles.cuidadoItem}>
                  <span style={styles.cuidadoIcon}>🥩</span>
                  <div>
                    <strong style={styles.cuidadoLabel}>Alimentación</strong>
                    <p style={styles.cuidadoText}>Dieta alta en proteínas y grasas de calidad para mantener masa muscular. Suplementos articulares recomendados.</p>
                  </div>
                </div>
                <div style={styles.cuidadoItem}>
                  <span style={styles.cuidadoIcon}>❤️</span>
                  <div>
                    <strong style={styles.cuidadoLabel}>Salud</strong>
                    <p style={styles.cuidadoText}>Atención a problemas de piel, displasia de cadera, y en variantes Pocket/Extreme, posibles problemas respiratorios.</p>
                  </div>
                </div>
                <div style={styles.cuidadoItem}>
                  <span style={styles.cuidadoIcon}>✨</span>
                  <div>
                    <strong style={styles.cuidadoLabel}>Pelaje y limpieza</strong>
                    <p style={styles.cuidadoText}>Cepillado semanal, baño mensual. Limpiar pliegues de piel si los hay. Control regular de oídos.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════ EJEMPLARES DEL CLUB ══════ */}
        {perros.length > 0 && (
          <section style={styles.section}>
            <SectionDivider />
            <h2 style={styles.sectionTitle}>AMERICAN BULLY EN EL CLUB</h2>
            <div style={styles.perrosGrid}>
              {perros.map(p => (
                <Link to={`/ejemplares/${p.id}`} key={p.id} style={styles.perroCard}>
                  <div style={styles.perroPhoto}>
                    {p.foto_url
                      ? <img src={p.foto_url} alt={p.nombre} style={styles.perroImg} />
                      : <PitbullSilhouette size={70} opacity={0.2} />
                    }
                    {p.variante && p.variante !== 'na' && (
                      <div style={styles.varianteBadge}>{p.variante_display}</div>
                    )}
                  </div>
                  <div style={styles.perroInfo}>
                    <div style={styles.perroNombre}>{p.nombre}</div>
                    <div style={styles.perroMeta}>{p.sexo_display} · {p.color}</div>
                    {p.kennel && <div style={styles.perroKennel}>{p.kennel}</div>}
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/ejemplares?raza=bully" style={styles.verTodosBtn}>VER TODOS LOS BULLY DEL CLUB →</Link>
          </section>
        )}

      </div>
    </PublicLayout>
  )
}

function SectionDivider() {
  return <div style={{ height: 2, width: 50, background: '#9a4aaa', marginBottom: 14 }} />
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
    background: 'linear-gradient(135deg, #060606 0%, #0a080e 100%)',
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
    background: 'radial-gradient(circle, rgba(154,74,170,0.08) 0%, transparent 70%)',
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
    background: 'rgba(154,74,170,0.1)',
    border: '1px solid rgba(154,74,170,0.3)',
    color: '#cc7add',
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
  heroTitleAccent: { color: '#cc7add' },
  heroLine: {
    height: 2,
    width: 120,
    background: 'linear-gradient(90deg, #9a4aaa, transparent)',
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
    background: '#9a4aaa',
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
    border: '1px solid #9a4aaa44',
    color: '#cc7add',
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
    borderLeft: '3px solid #9a4aaa',
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
  subTitle: {
    color: '#cc7add',
    fontSize: 14,
    fontWeight: 800,
    letterSpacing: 2,
    marginBottom: 16,
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

  variantesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: 14,
  },
  varianteCard: {
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderRadius: 3,
    padding: '18px 16px',
  },
  varianteNombre: {
    fontSize: 14,
    fontWeight: 900,
    letterSpacing: 3,
    marginBottom: 12,
  },
  varianteDato: {
    display: 'flex',
    gap: 6,
    marginBottom: 4,
  },
  varianteDatoLabel: { color: '#444', fontSize: 11 },
  varianteDatoVal: { color: '#888', fontSize: 11, fontWeight: 700 },
  varianteDesc: {
    color: '#555',
    fontSize: 11,
    lineHeight: 1.6,
    margin: '10px 0 0',
  },

  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: 14,
  },
  featureCard: {
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderTop: '2px solid #9a4aaa',
    borderRadius: 2,
    padding: '18px 18px',
  },
  featureTitulo: {
    color: '#cc7add',
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
    margin: '16px 0 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  tempItem: {
    color: '#888',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  cuidadosList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  cuidadoItem: {
    display: 'flex',
    gap: 12,
    alignItems: 'flex-start',
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    padding: '12px 14px',
    borderRadius: 2,
  },
  cuidadoIcon: { fontSize: 20, flexShrink: 0 },
  cuidadoLabel: { color: '#cc7add', fontSize: 12, letterSpacing: 0.5, display: 'block', marginBottom: 4 },
  cuidadoText: { color: '#555', fontSize: 12, lineHeight: 1.6, margin: 0 },

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
  },
  perroPhoto: {
    height: 140,
    background: 'rgba(154,74,170,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  perroImg: { width: '100%', height: '100%', objectFit: 'cover' },
  varianteBadge: {
    position: 'absolute',
    bottom: 8, right: 8,
    background: '#9a4aaa',
    color: '#fff',
    fontSize: 9,
    fontWeight: 700,
    padding: '3px 7px',
    borderRadius: 2,
    letterSpacing: 1,
  },
  perroInfo: { padding: '10px 12px' },
  perroNombre: { color: '#e0e0e0', fontWeight: 700, fontSize: 13, marginBottom: 3 },
  perroMeta: { color: '#555', fontSize: 11, marginBottom: 3 },
  perroKennel: { color: '#cc7add', fontSize: 10, letterSpacing: 0.5 },
  verTodosBtn: {
    display: 'inline-block',
    color: '#cc7add',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 2,
    textDecoration: 'none',
    borderBottom: '1px solid #9a4aaa44',
    paddingBottom: 2,
    marginTop: 12,
  },
}
