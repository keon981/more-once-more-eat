import { Fragment } from 'react'
import type { ComponentProps, ReactNode } from 'react'

import type { Key } from 'ts-key-enum'

import { cn } from '@/lib/utils'

function DefaultKbdSeparator({
  className,
  children = '+',
  ...props
}: ComponentProps<'span'>) {
  return (
    <span className={cn('text-muted-foreground/50', className)} {...props}>
      {children}
    </span>
  )
}

type KbdProps = ComponentProps<'span'> & {
  separator?: ReactNode
}

function Kbd({
  className,
  separator = <DefaultKbdSeparator />,
  children,
  ...props
}: KbdProps) {
  return (
    <span
      data-slot="kbd"
      className={cn(
        'inline-flex select-none items-center gap-1 rounded border px-1.5 align-middle font-medium font-mono text-[10px] bg-muted text-muted-foreground leading-loose',
        className,
      )}
      {...props}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <Fragment key={index}>
              {child}
              {index < children.length - 1 && separator}
            </Fragment>
          ))
        : children}
    </span>
  )
}

type KbdKeyProps = Omit<ComponentProps<'kbd'>, 'aria-label'> & {
  'aria-label'?: keyof typeof Key | (string & {})
}

function KbdKey({ className, ...props }: KbdKeyProps) {
  return (
    <kbd
      data-slot="kbd-key"
      className={cn(
        'bg-muted text-muted-foreground text-center tracking-widest rounded',
        className,
      )}
      {...props}
    />
  )
}

export { Kbd, KbdKey }
export type { KbdKeyProps, KbdProps }
