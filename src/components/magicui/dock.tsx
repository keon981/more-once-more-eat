'use client'

import React, { createContext, use, useMemo, useRef } from 'react'

import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import type {
  MotionProps,
  MotionValue,
} from 'motion/react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react'

import { TooltipProvider } from '../ui/tooltip'
import { cn } from '@/lib/utils'

interface DockContextValue {
  mouseX: MotionValue<number>
  size: number
  magnification: number
  distance: number
}

const DockContext = createContext<DockContextValue | null>(null)

export interface DockProps extends VariantProps<typeof dockVariants>,
  Omit<React.ComponentProps<'div'>, | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'> {
  className?: string
  iconSize?: number
  iconMagnification?: number
  iconDistance?: number
  direction?: 'top' | 'middle' | 'bottom'
  children: React.ReactNode
}

enum DEFAULT {
  SIZE = 32,
  MAGNIFICATION = 36,
  DISTANCE = 100,
}

const dockVariants = cva(
  'mx-auto w-max p-2 flex items-center justify-center gap-2 rounded-2xl border',
)

function Dock({
  ref,
  className,
  children,
  iconSize = DEFAULT.SIZE,
  iconMagnification = DEFAULT.MAGNIFICATION,
  iconDistance = DEFAULT.DISTANCE,
  direction = 'middle',
  ...props
}: DockProps) {
  const mouseX = useMotionValue(Infinity)

  const contextValue = useMemo<DockContextValue>(() => ({
    mouseX,
    size: iconSize,
    magnification: iconMagnification,
    distance: iconDistance,
  }), [mouseX, iconSize, iconMagnification, iconDistance])

  return (
    <TooltipProvider>
      <DockContext value={contextValue}>
        <motion.div
          ref={ref}
          data-slot="dock"
          onMouseMove={e => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          {...props}
          className={cn(dockVariants({ className }), {
            'items-start': direction === 'top',
            'items-center': direction === 'middle',
            'items-end': direction === 'bottom',
          })}
        >
          {children}
        </motion.div>
      </DockContext>
    </TooltipProvider>
  )
}

export interface DockIconProps
  extends Omit<MotionProps & React.HTMLAttributes<HTMLDivElement>, 'children'> {
  className?: string
  children?: React.ReactNode
}

function DockIcon({
  className,
  children,
  ...props
}: DockIconProps) {
  const context = use(DockContext)

  if (!context) {
    throw new Error('DockIcon must be used within a Dock component')
  }

  const { mouseX, size, magnification, distance } = context
  const ref = useRef<HTMLDivElement>(null)
  const padding = Math.max(6, size * 0.2)

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, magnification, size],
  )

  const scaleSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  return (
    <motion.div
      ref={ref}
      data-slot="dock-icon"
      style={{
        width: scaleSize,
        height: scaleSize,
        padding,
      }}
      className={cn(
        'flex aspect-square cursor-pointer items-center justify-center rounded-full',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export { Dock, DockIcon, dockVariants }
