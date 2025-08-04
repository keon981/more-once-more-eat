import React from 'react'

import { cn } from '@/lib/utils'

type Names = 'filter' | 'overlay' | 'specular' | 'content'

interface Props {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  classNames?: Partial<Record<Names, string>>
  styles?: Partial<Record<Names, React.CSSProperties>>
}

function LiquidGlass({ children, className, style, classNames, styles }: Props) {
  return (
    <>
      <div className={cn('glass-filter', classNames?.filter)} style={styles?.filter} />
      <div className={cn('glass-overlay', classNames?.overlay)} style={styles?.overlay} />
      <div className={cn('glass-specular', classNames?.specular)} style={styles?.specular} />
      <div
        className={cn('glass-content', classNames?.content, className)}
        style={{ ...styles?.content, ...style }}
      >
        {children}
      </div>
    </>
  )
}

export default LiquidGlass
