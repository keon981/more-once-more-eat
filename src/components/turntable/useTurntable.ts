import { createContext, use } from 'react'

interface TurntableOption {
  id: string
  label: string
}

interface TurntableContextType {
  options: TurntableOption[]
  onResult?: (option: TurntableOption) => void
  size: number
  isSpinning: boolean
  rotation: number
  result: TurntableOption | null
  spin: () => void
  reset: () => void
  segmentAngle: number
}

const TurntableContext = createContext<TurntableContextType | null>(null)

function useTurntable() {
  const context = use(TurntableContext)
  if (!context) throw new Error('useTurntable must be used within an TurntableProvider')

  return context
}

export { TurntableContext, useTurntable }
export type { TurntableContextType, TurntableOption }
