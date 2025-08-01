import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTurntable, type TurntableOption } from '@/hooks/useTurntable'

interface TurntableProps {
  options?: TurntableOption[]
  onResult?: (option: TurntableOption) => void
  className?: string
}

const defaultOptions: TurntableOption[] = [
  { id: '1', label: '麥當勞', color: '#FF6B6B' },
  { id: '2', label: '肯德基', color: '#4ECDC4' },
  { id: '3', label: '摩斯漢堡', color: '#45B7D1' },
  { id: '4', label: '漢堡王', color: '#96CEB4' },
  { id: '5', label: '頂呱呱', color: '#FFEAA7' },
  { id: '6', label: '丹丹漢堡', color: '#DDA0DD' },
  { id: '7', label: '八方雲集', color: '#98D8C8' },
  { id: '8', label: '鼎泰豐', color: '#F7DC6F' },
]

export function Turntable({
  options = defaultOptions,
  onResult,
  className
}: TurntableProps) {
  const wheelRef = useRef<HTMLDivElement>(null)
  const { isSpinning, rotation, result, spin, segmentAngle } = useTurntable({
    options,
    onResult,
  })

  const generateSegmentPath = (index: number) => {
    const startAngle = (index * segmentAngle - 90) * (Math.PI / 180)
    const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180)
    const radius = 140
    const centerX = 150
    const centerY = 150
    
    const x1 = centerX + radius * Math.cos(startAngle)
    const y1 = centerY + radius * Math.sin(startAngle)
    const x2 = centerX + radius * Math.cos(endAngle)
    const y2 = centerY + radius * Math.sin(endAngle)
    
    const largeArcFlag = segmentAngle > 180 ? 1 : 0
    
    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`
  }

  const getTextPosition = (index: number) => {
    const angle = (index * segmentAngle + segmentAngle / 2 - 90) * (Math.PI / 180)
    const radius = 100
    const centerX = 150
    const centerY = 150
    
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    }
  }

  return (
    <div className={cn("flex flex-col items-center justify-center gap-6 p-4", className)}>
      <div className="relative">
        {/* Wheel */}
        <div
          ref={wheelRef}
          className="relative transition-transform duration-[3000ms] ease-out"
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'center'
          }}
        >
          <svg width="300" height="300" className="drop-shadow-lg">
            {options.map((option, index) => (
              <g key={option.id}>
                <path
                  d={generateSegmentPath(index)}
                  fill={option.color}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <text
                  x={getTextPosition(index).x}
                  y={getTextPosition(index).y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-white font-medium text-sm pointer-events-none"
                  style={{
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                  }}
                >
                  {option.label}
                </text>
              </g>
            ))}
            
            {/* Center circle */}
            <circle
              cx="150"
              cy="150"
              r="20"
              fill="#333"
              stroke="#fff"
              strokeWidth="3"
            />
          </svg>
        </div>
        
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1">
          <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[30px] border-l-transparent border-r-transparent border-b-red-500 drop-shadow-md" />
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex flex-col items-center gap-4">
        <Button
          onClick={spin}
          disabled={isSpinning}
          size="lg"
          className="px-8 py-3 text-lg font-semibold"
        >
          {isSpinning ? '轉動中...' : '開始轉動'}
        </Button>
        
        {result && !isSpinning && (
          <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <p className="text-sm text-gray-600 mb-1">結果是：</p>
            <p className="text-2xl font-bold" style={{ color: result.color }}>
              {result.label}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Turntable
