'use client'

import {
  Children,
  cloneElement,
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

import { cn } from '@/lib/utils'

enum DockEnum {
  HEIGHT = 128,
  MAGNIFICATION = 80,
  DISTANCE = 50,
  PANEL_HEIGHT = 64,
}

interface DockProps {
  children: React.ReactNode
  className?: string
  classNames?: Partial<Record<'root', string>>
  styles?: Partial<Record<'root', React.CSSProperties>>
  style?: React.CSSProperties
  distance?: number
  panelHeight?: number
  magnification?: number
  spring?: SpringOptions
}
interface DockItemProps {
  className?: string
  children: React.ReactNode
}
interface DockLabelProps {
  className?: string
  children: React.ReactNode
}
interface DockIconProps {
  className?: string
  children: React.ReactNode
}

interface DocContextType {
  mouseX: MotionValue
  spring: SpringOptions
  magnification: number
  distance: number
}
interface DockProviderProps {
  children: React.ReactNode
  value: DocContextType
}

const DockContext = createContext<DocContextType | undefined>(undefined)

function DockProvider({ children, value }: DockProviderProps) {
  return <DockContext value={value}>{children}</DockContext>
}

function useDock() {
  const context = use(DockContext)
  if (!context) {
    throw new Error('useDock must be used within an DockProvider')
  }
  return context
}

function Dock({
  children,
  className,
  classNames,
  styles,
  style,
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = DockEnum.MAGNIFICATION,
  distance = DockEnum.DISTANCE,
  panelHeight = DockEnum.PANEL_HEIGHT,
}: DockProps) {
  const mouseX = useMotionValue(Infinity)
  const isHovered = useMotionValue(0)

  const maxHeight = useMemo(() => {
    return Math.max(DockEnum.HEIGHT, magnification + magnification / 2 + 4)
  }, [magnification])

  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight])
  const height = useSpring(heightRow, spring)

  return (
    <div className="absolute p-1 z-30 bottom-4 left-20 border-0">
      <motion.div
        style={{
          height,
          minHeight: height,
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
          className={cn(
            'mx-auto flex w-fit gap-4 rounded-2xl px-4 dark:bg-neutral-900',
            className,
          )}
          style={{ height: panelHeight, ...style }}
          role="toolbar"
          aria-label="Application dock"
        >
          <DockProvider value={{ mouseX, spring, distance, magnification }}>
            {children}
          </DockProvider>
        </motion.div>
      </motion.div>
    </div>
  )
}

function DockItem({ children, className }: DockItemProps) {
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
    [48, magnification, 48],
  )

  const width = useSpring(widthTransform, spring)

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
    >
      {Children.map(children, child =>
        cloneElement(child as React.ReactElement<any>, { width, isHovered }))}
    </motion.div>
  )
}

function DockLabel({ children, className, ...rest }: DockLabelProps) {
  const restProps = rest as Record<string, unknown>
  const isHovered = restProps.isHovered as MotionValue<number>
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const unsubscribe = isHovered.on('change', (latest) => {
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
            'absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white',
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

function DockIcon({ children, className, ...rest }: DockIconProps) {
  const restProps = rest as Record<string, unknown>
  const width = restProps.width as MotionValue<number>

  const widthTransform = useTransform(width, val => val / 2)

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
