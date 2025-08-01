import { useState, useCallback } from 'react'

export interface TurntableOption {
  id: string
  label: string
  color: string
}

export interface UseTurntableProps {
  options: TurntableOption[]
  onResult?: (option: TurntableOption) => void
}

export function useTurntable({ options, onResult }: UseTurntableProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState<TurntableOption | null>(null)

  const segmentAngle = 360 / options.length

  const spin = useCallback(() => {
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
  }, [isSpinning, options, rotation, segmentAngle, onResult])

  const reset = useCallback(() => {
    if (isSpinning) return
    
    setRotation(0)
    setResult(null)
  }, [isSpinning])

  return {
    isSpinning,
    rotation,
    result,
    spin,
    reset,
    segmentAngle,
  }
}
