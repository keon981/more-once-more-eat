import { useMemo, useState } from 'react'

import LuckyWheel from './lucky-wheel'
import { Flex } from '../ui/flex'
import type { TurntableContextType, TurntableOption } from '@/components/turntable/useTurntable'
import { TurntableContext, useTurntable } from '@/components/turntable/useTurntable'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface TurntableProps {
  options?: TurntableOption[]
  onResult?: (option: TurntableOption) => void
  className?: string
  size?: number
}

const defaultOptions: TurntableOption[] = [
  { id: '1', label: '麥當勞' },
  { id: '2', label: '肯德基' },
  { id: '3', label: '全家' },
  { id: '4', label: '7-11' },
]

function Turntable({
  options = defaultOptions,
  onResult,
  className,
  size = 300,
}: TurntableProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState<TurntableOption | null>(null)

  const segmentAngle = 360 / options.length

  const spin = () => {
    if (isSpinning || options.length === 0) return

    setIsSpinning(true)
    setResult(null)

    // Generate random rotation (multiple full rotations + random angle)
    const minRotation = 1440 // 4 full rotations
    const maxRotation = 2160 // 6 full rotations
    const randomRotation = Math.random() * (maxRotation - minRotation) + minRotation
    const finalRotation = rotation + randomRotation

    setRotation(finalRotation)

    // Calculate which option was selected
    setTimeout(() => {
      const normalizedRotation = (360 - (finalRotation % 360)) % 360
      const selectedIndex = Math.floor(normalizedRotation / segmentAngle)
      const selectedOption = options[selectedIndex]

      setResult(selectedOption)
      setIsSpinning(false)
      onResult?.(selectedOption)
    }, 3000) // Match animation duration
  }

  const reset = () => {
    if (isSpinning) return

    setRotation(0)
    setResult(null)
  }

  const contextValue = useMemo<TurntableContextType>(
    () => ({
      options,
      onResult,
      size,
      isSpinning,
      rotation,
      result,
      spin,
      reset,
      segmentAngle,
    }),
    [options, onResult, size, isSpinning, rotation, result, spin, reset, segmentAngle],
  )

  return (
    <TurntableContext value={contextValue}>
      <Flex direction="column" justify="center" items="center" className={cn('gap-6 p-4', className)}>
        <LuckyWheel />
        <Controls />
      </Flex>
    </TurntableContext>
  )
}

function Controls() {
  const { isSpinning, spin, result } = useTurntable()

  return (
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
  )
}

export default Turntable
