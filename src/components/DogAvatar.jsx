export default function DogAvatar({ size = 80, raza = 'pitbull' }) {
  const color = raza === 'bully' ? '#bf7a9c' : '#7a9cbf'
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="60" fill={color} opacity="0.15" />
      {/* cuerpo */}
      <ellipse cx="60" cy="78" rx="28" ry="22" fill={color} opacity="0.6" />
      {/* cabeza */}
      <ellipse cx="60" cy="50" rx="24" ry="22" fill={color} opacity="0.8" />
      {/* orejas */}
      <ellipse cx="38" cy="35" rx="10" ry="14" fill={color} opacity="0.7" transform="rotate(-15 38 35)" />
      <ellipse cx="82" cy="35" rx="10" ry="14" fill={color} opacity="0.7" transform="rotate(15 82 35)" />
      {/* hocico */}
      <ellipse cx="60" cy="58" rx="12" ry="9" fill="white" opacity="0.5" />
      {/* nariz */}
      <ellipse cx="60" cy="54" rx="5" ry="3.5" fill={color} opacity="0.9" />
      {/* ojos */}
      <circle cx="51" cy="46" r="3" fill="white" opacity="0.9" />
      <circle cx="69" cy="46" r="3" fill="white" opacity="0.9" />
      <circle cx="52" cy="46" r="1.5" fill="#222" />
      <circle cx="70" cy="46" r="1.5" fill="#222" />
      {/* patas */}
      <ellipse cx="42" cy="96" rx="10" ry="7" fill={color} opacity="0.5" />
      <ellipse cx="78" cy="96" rx="10" ry="7" fill={color} opacity="0.5" />
    </svg>
  )
}
