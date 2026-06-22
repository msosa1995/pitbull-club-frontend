import { useEffect, useState } from 'react'

export default function IntroSplash({ onDone }) {
  const [phase, setPhase] = useState('in') // 'in' | 'out'

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('out'), 2800)
    const t2 = setTimeout(() => onDone(), 3500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <>
      <style>{`
        @keyframes logoIn {
          0%   { opacity: 0; transform: scale(0.75); filter: brightness(0); }
          40%  { opacity: 1; transform: scale(1.05); filter: brightness(1.2) drop-shadow(0 0 40px rgba(196,149,106,0.8)); }
          100% { opacity: 1; transform: scale(1);    filter: brightness(1)  drop-shadow(0 0 20px rgba(196,149,106,0.4)); }
        }
        @keyframes titleIn {
          0%   { opacity: 0; transform: translateY(24px); letter-spacing: 12px; }
          100% { opacity: 1; transform: translateY(0);    letter-spacing: 8px; }
        }
        @keyframes countryIn {
          0%   { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes taglineIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes lineSweep {
          0%   { width: 0;    opacity: 0; }
          20%  { opacity: 1; }
          100% { width: 280px; opacity: 1; }
        }
        @keyframes splashOut {
          0%   { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.04); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.15; }
          50%       { opacity: 0.35; }
        }
        .splash-wrap {
          animation: ${phase === 'out' ? 'splashOut 0.7s cubic-bezier(0.4,0,1,1) forwards' : 'none'};
        }
      `}</style>

      <div className="splash-wrap" style={s.wrap}>
        {/* Fondo radial animado */}
        <div style={s.bgGlow} />

        {/* Partículas decorativas */}
        <div style={{ ...s.particle, top: '20%', left: '15%', animationDelay: '0.8s' }} />
        <div style={{ ...s.particle, top: '70%', left: '80%', animationDelay: '1.2s', width: 3, height: 3 }} />
        <div style={{ ...s.particle, top: '40%', left: '88%', animationDelay: '1.6s' }} />
        <div style={{ ...s.particle, top: '80%', left: '10%', animationDelay: '1.0s', width: 2, height: 2 }} />

        {/* Contenido central */}
        <div style={s.center}>
          {/* Logo */}
          <div style={s.logoWrap}>
            <img
              src="/logo.jpg"
              alt="Pit Bull Club Paraguay"
              style={s.logo}
            />
          </div>

          {/* Línea superior */}
          <div style={s.lineWrap}>
            <div style={s.line} />
          </div>

          {/* Nombre del club */}
          <div style={s.title}>PIT BULL CLUB</div>

          {/* País */}
          <div style={s.country}>PARAGUAY</div>

          {/* Línea inferior */}
          <div style={{ ...s.lineWrap, animationDelay: '1.6s' }}>
            <div style={{ ...s.line, animationDelay: '1.6s' }} />
          </div>

          {/* Tagline */}
          <div style={s.tagline}>LA CASA DEL DEPORTE CANINO</div>
        </div>

        {/* Esquinas decorativas */}
        <div style={{ ...s.corner, top: 32, left: 32, borderTop: '1px solid #C4956A44', borderLeft: '1px solid #C4956A44' }} />
        <div style={{ ...s.corner, top: 32, right: 32, borderTop: '1px solid #C4956A44', borderRight: '1px solid #C4956A44' }} />
        <div style={{ ...s.corner, bottom: 32, left: 32, borderBottom: '1px solid #C4956A44', borderLeft: '1px solid #C4956A44' }} />
        <div style={{ ...s.corner, bottom: 32, right: 32, borderBottom: '1px solid #C4956A44', borderRight: '1px solid #C4956A44' }} />
      </div>
    </>
  )
}

const s = {
  wrap: {
    position: 'fixed', inset: 0, zIndex: 9999,
    background: '#030303',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  bgGlow: {
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600, height: 600, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(196,149,106,0.12) 0%, transparent 70%)',
    animation: 'glowPulse 2s ease-in-out infinite',
  },
  particle: {
    position: 'absolute',
    width: 4, height: 4, borderRadius: '50%',
    background: '#C4956A',
    opacity: 0,
    animation: 'taglineIn 0.5s ease forwards',
  },
  center: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0,
    position: 'relative', zIndex: 2,
  },
  logoWrap: {
    marginBottom: 28,
    animation: 'logoIn 1.0s cubic-bezier(0.2,0,0.2,1) 0.1s both',
  },
  logo: {
    width: 160, height: 160,
    borderRadius: 8,
    objectFit: 'contain',
  },
  lineWrap: {
    overflow: 'hidden',
    height: 1, width: 280,
    margin: '14px 0',
    animation: 'taglineIn 0.1s ease 1.0s both',
  },
  line: {
    height: 1,
    background: 'linear-gradient(90deg, transparent, #C4956A, transparent)',
    animation: 'lineSweep 0.6s cubic-bezier(0.4,0,0.2,1) 1.0s both',
  },
  title: {
    color: '#f0f0f0',
    fontSize: 'clamp(28px, 5vw, 48px)',
    fontWeight: 900,
    letterSpacing: 8,
    lineHeight: 1,
    animation: 'titleIn 0.7s cubic-bezier(0.2,0,0.2,1) 0.9s both',
  },
  country: {
    color: '#C4956A',
    fontSize: 'clamp(11px, 2vw, 16px)',
    fontWeight: 700,
    letterSpacing: 10,
    marginTop: 6,
    animation: 'countryIn 0.5s ease 1.4s both',
  },
  tagline: {
    color: '#555',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 4,
    marginTop: 8,
    animation: 'taglineIn 0.6s ease 2.0s both',
  },
  corner: {
    position: 'absolute',
    width: 24, height: 24,
    animation: 'taglineIn 0.5s ease 0.5s both',
    opacity: 0,
  },
}
