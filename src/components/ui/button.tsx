import React from 'react'

import { Slot } from '@radix-ui/react-slot'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  `inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap outline-none rounded-md text-sm text-foreground font-medium transition-all cursor-pointer
  disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-ring/50 focus-visible:ring-[3px]
  [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 [&_svg]:shrink-0focus-visible:border-ring aria-invalid:ring-destructive/20 aria-invalid:border-destructive`,
  {
    variants: {
      variant: {
        solid: 'bg-background shadow-sm hover:bg-background/90',
        outline: 'border bg-background shadow-xs hover:text-accent-foreground',
        text: 'bg-background  shadow-sm hover:bg-background/90',
        ghost: 'bg-transparent hover:bg-background',
        link: 'text-background  underline-offset-4 hover:underline',
      },
      size: {
        xs: 'h-7 gap-1 px-3 has-[>svg]:px-2.5',
        sm: 'h-8 gap-1.5 px-3 has-[>svg]:px-2.5',
        md: 'h-9 px-4 py-2 has-[>svg]:px-3',
        lg: 'h-10 px-6 has-[>svg]:px-4',
        xl: 'h-11 px-8 has-[>svg]:px-5',
        icon: 'size-8',
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'md',
    },
  },
)

type ButtonColor = 'primary' | 'secondary' | 'accent' | 'danger' | 'muted'
interface ButtonProps
  extends Omit<React.ComponentProps<'button'>, 'color'>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  color?: ButtonColor
}

function Button({
  className,
  color = 'primary',
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      data-color={color}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
