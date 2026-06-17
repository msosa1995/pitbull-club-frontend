export default function PitbullSilhouette({ size = 200, opacity = 0.12, style = {} }) {
  return (
    <img
      src="/pitbull_icon.png"
      width={size}
      style={{
        display: 'block',
        opacity,
        filter: 'drop-shadow(0 0 0px transparent)',
        pointerEvents: 'none',
        userSelect: 'none',
        ...style,
      }}
      alt=""
      draggable={false}
    />
  )
}
