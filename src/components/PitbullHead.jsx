export default function PitbullHead({ size = 200, color = '#C4956A', opacity = 0.15, style = {} }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 200 200"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={opacity}
      style={{ display: 'block', ...style }}
    >
      {/* contorno cabeza - ancha y cuadrada */}
      <path strokeWidth="4"
        d="M 100 14
           C 136 14 174 38 180 74
           L 184 108
           C 186 138 172 162 152 174
           L 126 188
           Q 100 197 100 197
           Q 100 197 74 188
           L 48 174
           C 28 162 14 138 16 108
           L 20 74
           C 26 38 64 14 100 14 Z"
      />

      {/* orejas */}
      <path strokeWidth="3" d="M 20 74 Q 4 46 14 24 Q 28 6 48 22" />
      <path strokeWidth="3" d="M 180 74 Q 196 46 186 24 Q 172 6 152 22" />
      <path strokeWidth="2" d="M 30 66 Q 22 50 28 36" opacity="0.5" />
      <path strokeWidth="2" d="M 170 66 Q 178 50 172 36" opacity="0.5" />

      {/* cejas fruncidas - expresión agresiva */}
      <path strokeWidth="3.5" d="M 46 76 Q 66 64 84 72" />
      <path strokeWidth="3.5" d="M 154 76 Q 134 64 116 72" />

      {/* arrugas del ceño */}
      <path strokeWidth="2" d="M 84 76 Q 100 71 116 76" />
      <path strokeWidth="1.5" d="M 88 66 Q 100 62 112 66" opacity="0.6" />
      <path strokeWidth="1.5" d="M 90 58 Q 100 55 110 58" opacity="0.35" />

      {/* ojos profundos y amenazantes */}
      <ellipse strokeWidth="3.5" cx="68" cy="94" rx="18" ry="15" />
      <ellipse strokeWidth="3.5" cx="132" cy="94" rx="18" ry="15" />
      <circle fill={color} cx="68" cy="94" r="8" opacity="0.5" stroke="none" />
      <circle fill={color} cx="132" cy="94" r="8" opacity="0.5" stroke="none" />
      <circle fill={color} cx="65" cy="91" r="3" opacity="0.7" stroke="none" />
      <circle fill={color} cx="129" cy="91" r="3" opacity="0.7" stroke="none" />

      {/* mejillas prominentes */}
      <path strokeWidth="2" d="M 18 106 Q 10 120 16 136" opacity="0.5" />
      <path strokeWidth="2" d="M 182 106 Q 190 120 184 136" opacity="0.5" />

      {/* hocico / muzzle - bloque ancho */}
      <rect strokeWidth="4" x="52" y="122" width="96" height="56" rx="22" />

      {/* nariz ancha y plana */}
      <ellipse strokeWidth="3.5" cx="100" cy="136" rx="28" ry="15" />
      <ellipse fill={color} cx="82" cy="141" rx="10" ry="7" opacity="0.55" stroke="none" />
      <ellipse fill={color} cx="118" cy="141" rx="10" ry="7" opacity="0.55" stroke="none" />

      {/* boca - recta, seria */}
      <path strokeWidth="2.5" d="M 62 162 L 100 168 L 138 162" />

      {/* papada / jowls */}
      <path strokeWidth="2" d="M 52 164 Q 44 178 56 188" opacity="0.5" />
      <path strokeWidth="2" d="M 148 164 Q 156 178 144 188" opacity="0.5" />
    </svg>
  )
}
