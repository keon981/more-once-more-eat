'use client'

import React, {
  createContext,
  use,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import type {
  MotionValue,
  SpringOptions,
} from 'motion/react'
import {
  AnimatePresence,
  motion,

  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react'

import LiquidGlass from '../liquid-glass'
import { cn } from '@/lib/utils'

enum DockEnum {
  HEIGHT = 128,
  MAGNIFICATION = 80,
  DISTANCE = 50,
  PANEL_HEIGHT = 64,
  SIZE = 32,
}

const DEFAULT_SPRING_CONFIG = { mass: 0.1, stiffness: 80, damping: 12 }

interface DockContextType {
  mouseX: MotionValue
  spring: SpringOptions
  magnification: number
  distance: number
  size: number
}

interface DockProps extends Partial<Omit<DockContextType, 'mouseX'>> {
  children: React.ReactNode
  className?: string
  classNames?: Partial<Record<'root', string>>
  styles?: Partial<Record<'root', React.CSSProperties>>
  style?: React.CSSProperties
  panelHeight?: number
}

const DockContext = createContext<DockContextType | undefined>(undefined)

function DockProvider({ children, value }: ProviderProps<DockContextType>) {
  return <DockContext value={value}>{children}</DockContext>
}

function useDock() {
  const context = use(DockContext)
  if (!context) throw new Error('useDock must be used within an DockProvider')

  return context
}

function Dock({
  children,
  className,
  classNames,
  styles,
  style,
  spring = DEFAULT_SPRING_CONFIG,
  magnification = DockEnum.MAGNIFICATION,
  distance = DockEnum.DISTANCE,
  panelHeight = DockEnum.PANEL_HEIGHT,
  size = DockEnum.SIZE,
}: DockProps) {
  const mouseX = useMotionValue(Infinity)
  const isHovered = useMotionValue(0)

  const maxHeight = useMemo(() => {
    return Math.max(DockEnum.HEIGHT, magnification + magnification / 2 + 4)
  }, [magnification])

  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight])
  const height = useSpring(heightRow, spring)

  return (
    <motion.div
      style={{
        height,
        scrollbarWidth: 'none',
        ...styles?.root,
      }}
      className={cn('mx-2 flex max-w-full items-end overflow-x-auto', classNames?.root)}
    >
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1)
          mouseX.set(pageX)
        }}
        onMouseLeave={() => {
          isHovered.set(0)
          mouseX.set(Infinity)
        }}
        className="relative w-fit liquid-glass-container"
        style={{ height: panelHeight, ...style }}
        role="toolbar"
        aria-label="Application dock"
      >
        <DockProvider value={{ mouseX, spring, distance, magnification, size }}>
          <LiquidGlass className={cn(
            'w-full h-full inline-flex px-4  gap-4 items-center justify-center text-center rounded-2xl',
            className,
          )}
          >
            {children}
          </LiquidGlass>
        </DockProvider>
      </motion.div>

    </motion.div>
  )
}

interface DockItemProps {
  children: React.ReactNode
  className?: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

interface HighlightContextType {
  isHovered: MotionValue<number>
  width: MotionValue<number>
}

const HighlightContext = createContext<HighlightContextType | undefined>(undefined)
function useHighlight() {
  const context = use(HighlightContext)
  if (!context) throw new Error('useHighlight must be used within a HighlightContext')
  return context
}

function DockItem({ children, className, onClick }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { distance, magnification, mouseX, spring } = useDock()

  const isHovered = useMotionValue(0)

  const mouseDistance = useTransform(mouseX, (val) => {
    const domRect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - domRect.x - domRect.width / 2
  })

  const widthTransform = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [DockEnum.SIZE, magnification, DockEnum.SIZE],
  )

  const width = useSpring(widthTransform, spring)

  const contextValue = useMemo(() => ({ isHovered, width }), [isHovered, width])

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      className={cn(
        'relative inline-flex items-center justify-center',
        className,
      )}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
      onClick={onClick}
    >
      <HighlightContext value={contextValue}>
        {children}
      </HighlightContext>
    </motion.div>
  )
}

function DockLabel({ children, className }: { children: React.ReactNode, className?: string }) {
  const { isHovered } = useHighlight()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const unsubscribe = isHovered.on('change', (latest: number) => {
      setIsVisible(latest === 1)
    })

    return () => unsubscribe()
  }, [isHovered])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'absolute -top-6 left-1/2 px-2 py-0.5 w-fit whitespace-pre rounded-md border border-gray-200 bg-gray-100  text-xs text-neutral-700  dark:text-white',
            className,
          )}
          role="tooltip"
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function DockIcon({ children, className }: { children: React.ReactNode, className?: string }) {
  const { width } = useHighlight()

  const widthTransform = useTransform(width, (val: number) => val / 2)

  return (
    <motion.div
      style={{ width: widthTransform }}
      className={cn('flex items-center justify-center', className)}
    >
      {children}
    </motion.div>
  )
}

export { Dock, DockIcon, DockItem, DockLabel }
