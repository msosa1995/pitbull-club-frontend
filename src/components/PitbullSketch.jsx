export default function PitbullSketch({ size = 240, color = '#fff', opacity = 0.1, flip = false }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 0.65)}
      viewBox="0 0 296 192"
      fill={color}
      opacity={opacity}
      style={{ display: 'block', transform: flip ? 'scaleX(-1)' : undefined }}
    >
      {/* CUERPO principal */}
      <ellipse cx="114" cy="114" rx="88" ry="46" />

      {/* PECHO - protrude hacia adelante (derecha) */}
      <ellipse cx="185" cy="126" rx="22" ry="30" />

      {/* CUELLO - ancho y musculoso */}
      <path d="M 196 80 C 210 66 224 57 234 54 L 238 76 C 228 80 216 88 208 100 Z" />

      {/* CABEZA - cuadrada y ancha (rasgo típico pitbull) */}
      <rect x="220" y="16" width="60" height="72" rx="10" />

      {/* MANDIBULA - más ancha abajo */}
      <path d="M 218 58 L 282 58 L 282 86 Q 282 94 271 94 L 228 94 Q 218 94 218 86 Z" />

      {/* HOCICO - bloque cuadrado */}
      <rect x="270" y="36" width="26" height="36" rx="8" />

      {/* NARIZ */}
      <ellipse cx="295" cy="54" rx="3" ry="4" />

      {/* OREJA - recortada / triangular */}
      <polygon points="226,16 238,1 254,16" />

      {/* OJO - círculo con sombra para destacar */}
      <circle cx="252" cy="44" r="6" fill="white" opacity="0.25" />
      <circle cx="252" cy="44" r="3" />

      {/* PATAS DELANTERAS */}
      <rect x="174" y="148" width="16" height="42" rx="7" />
      <rect x="194" y="150" width="16" height="40" rx="7" />

      {/* PATAS TRASERAS */}
      <path d="M 50 150 Q 48 168 50 192 L 66 192 Q 66 168 68 150 Z" />
      <path d="M 72 148 Q 70 167 72 192 L 88 192 Q 88 167 88 148 Z" />

      {/* COLA - corta, apuntando arriba */}
      <path d="M 32 104 Q 10 78 20 50"
        stroke={color} strokeWidth="10" strokeLinecap="round" fill="none" />

      {/* MUSCULOS en el cuerpo (detalle) */}
      <ellipse cx="145" cy="105" rx="30" ry="18" fill="white" opacity="0.04" />
    </svg>
  )
}
