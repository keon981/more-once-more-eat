const centerX = 150
const centerY = 150

interface Options {
  radius?: number // label distance from center; tweak to taste
  keepUpright?: boolean // keep letters upright for readability
  startAtTop?: boolean
}

function generateSegmentPath(
  index: number,
  segmentAngle: number,
) {
  const startAngle = (index * segmentAngle - 90) * (Math.PI / 180)
  const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180)
  const radius = 140

  const x1 = centerX + radius * Math.cos(startAngle)
  const y1 = centerY + radius * Math.sin(startAngle)
  const x2 = centerX + radius * Math.cos(endAngle)
  const y2 = centerY + radius * Math.sin(endAngle)

  const largeArcFlag = segmentAngle > 180 ? 1 : 0
  return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`
}

function getTextProps(
  index: number,
  segmentAngle: number,
  options: Options = {},
) {
  const radius = options.radius ?? 100
  // if your arc math starts at 12 o'clock, keep this true
  const startAtTop = options?.startAtTop ?? true
  const startOffset = startAtTop ? -90 : 0

  const midDeg = index * segmentAngle + segmentAngle / 2 + startOffset
  const angle = midDeg * (Math.PI / 180)
  const x = centerX + radius * Math.cos(angle)
  const y = centerY + radius * Math.sin(angle)

  // rotate so the "top" of the text points toward the center
  let rotate = midDeg - 90

  if (options?.keepUpright) {
    const norm = ((rotate % 360) + 360) % 360 // [0,360)
    if (norm > 90 && norm < 270) rotate += 180
  }

  return {
    x,
    y,
    transform: `rotate(${rotate} ${x} ${y})`,
  }
}

export { generateSegmentPath, getTextProps }
