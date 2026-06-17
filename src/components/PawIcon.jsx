export default function PawIcon({ size = 40, color = '#C4956A', opacity = 1, rotate = 0 }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 100 100"
      fill={color} opacity={opacity}
      style={{ transform: `rotate(${rotate}deg)`, display: 'block' }}
    >
      <ellipse cx="50" cy="67" rx="22" ry="24" />
      <ellipse cx="24" cy="42" rx="11" ry="13" />
      <ellipse cx="42" cy="32" rx="11" ry="13" />
      <ellipse cx="60" cy="32" rx="11" ry="13" />
      <ellipse cx="77" cy="42" rx="11" ry="13" />
    </svg>
  )
}
