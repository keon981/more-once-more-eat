import { useRef } from 'react'

import LuckyWheel from './lucky-wheel'
import { Button } from '@/components/ui/button'
import { useTurntable } from '@/hooks/useTurntable'
import type { TurntableOption } from '@/hooks/useTurntable'
import { cn } from '@/lib/utils'

interface TurntableProps {
  options?: TurntableOption[]
  onResult?: (option: TurntableOption) => void
  className?: string
}

const defaultOptions: TurntableOption[] = [
  { id: '1', label: '麥當勞' },
  { id: '2', label: '肯德基' },
]

export function Turntable({
  options = defaultOptions,
  onResult,
  className,
}: TurntableProps) {
  const wheelRef = useRef<HTMLDivElement>(null)
  const { isSpinning, rotation, result, spin, segmentAngle } = useTurntable({
    options,
    onResult,
  })

  return (
    <div className={cn('flex flex-col items-center justify-center gap-6 p-4', className)}>
      <div className="relative">
        {/* Wheel */}
        <div
          ref={wheelRef}
          className="relative transition-transform duration-[3000ms] ease-out"
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'center',
          }}
        >
          <svg width="300" height="300" className="drop-shadow-lg">
            <LuckyWheel options={options} segmentAngle={segmentAngle} />

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
          <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[30px] border-l-transparent border-r-transparent border-t-red-500 drop-shadow-md" />
        </div>
      </div>

      {/* Controls */}
      <div className="relative z-1 flex flex-col items-center gap-4">
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
            <p className="text-sm text-foreground mb-1">結果是：</p>
            <p className="text-2xl font-bold text-primary">
              {result.label}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Turntable
