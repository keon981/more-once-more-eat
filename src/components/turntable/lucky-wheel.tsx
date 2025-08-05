import SegmentLayer from './segment-layout'
import type { TurntableOption } from '@/hooks/useTurntable'

interface Props {
  options: TurntableOption[]
  segmentAngle: number
}

function LuckyWheel({ options = [], segmentAngle }: Props) {
  if (options.length === 0) return null

  if (options.length === 1) {
    return (
      <>
        <circle
          cx="150"
          cy="150"
          r="140"
          fill="#666"
          stroke="#fff"
          strokeWidth="3"
        />
        <text
          {...getTextPosition(0, segmentAngle)}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-white font-medium text-sm pointer-events-none"
          style={{
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          }}
        >
          {options[0].label}
        </text>
      </>
    )
  }

  return (
    <>
      {
        options.map((option, index) => (
          <SegmentLayer
            key={option.id}
            pathProps={{
              d: generateSegmentPath(index, segmentAngle),
              fill: index % 2 === 0 ? '#666' : '#222',
            }}
            textProps={{ ...getTextPosition(index, segmentAngle) }}
            {...option}
          />
        ))
      }
    </>
  )
}

export default LuckyWheel

const centerX = 150
const centerY = 150

function generateSegmentPath(index: number, segmentAngle: number) {
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

function getTextPosition(index: number, segmentAngle: number) {
  const angle = (index * segmentAngle + segmentAngle / 2 - 90) * (Math.PI / 180)
  const radius = 100

  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  }
}
