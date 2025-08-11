import React from 'react'

import { Slot } from '@radix-ui/react-slot'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const flexVariants = cva(
  'flex',
  {
    variants: {
      direction: {
        row: 'flex-row',
        column: 'flex-col',
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
      },
      items: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
        baseline: 'items-baseline',
      },
      self: {
        auto: 'self-auto',
        start: 'self-start',
        center: 'self-center',
        end: 'self-end',
        stretch: 'self-stretch',
        baseline: 'self-baseline',
      },
      gap: {
        none: '',
        xs: 'gap-1',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
      },
    },
    defaultVariants: {
      direction: 'row',
      justify: 'start',
      items: 'center',
      self: 'auto',
    },
  },
)

interface FlexOwnProps extends Omit<VariantProps<typeof flexVariants>, 'gap'> {
  as?: React.ElementType
  asChild?: boolean
  wrap?: boolean
  direction?: 'row' | 'column'
  reverse?: boolean
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | string
}
type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref']

type PolymorphicComponentProps<
  C extends React.ElementType,
  P = object,
> = P
  & Omit<React.ComponentPropsWithoutRef<C>, keyof P | 'as' | 'ref'>
  & {
    as?: C
    ref?: PolymorphicRef<C>
  }

type FlexProps<T extends React.ElementType = 'div'> = PolymorphicComponentProps<T, FlexOwnProps>

function getGapWithVariant(gap: FlexProps['gap']) {
  switch (gap) {
    case 'xs':
      return 'xs'
    case 'sm':
      return 'sm'
    case 'md':
      return 'md'
    case 'lg':
      return 'lg'
    case 'xl':
      return 'xl'
    default:
      return 'none'
  }
}

function getGapWithOther(gap: FlexProps['gap']) {
  if (typeof gap === 'number') return `gap-${gap}`

  const variant = getGapWithVariant(gap)
  if (variant === 'none' && gap !== 'none') return `gap-[${gap}]`
  return ''
}

function Flex<T extends React.ElementType = 'div'>({
  as,
  asChild = false,
  direction,
  justify,
  items,
  gap,
  self,
  wrap = false,
  reverse = false,
  className,
  ...props
}: FlexProps<T>) {
  const Comp: React.ElementType = asChild ? Slot : (as || 'div')
  const reverseWrap = reverse ? 'flex-wrap-reverse' : 'flex-wrap'

  return (
    <Comp
      data-slot="flex-box"
      className={cn(
        flexVariants({
          direction,
          justify,
          items,
          gap: getGapWithVariant(gap),
          self,
        }),
        wrap ? reverseWrap : 'flex-nowrap',
        getGapWithOther(gap),
        className,
      )}
      {...props}
    />
  )
}

export { Flex, flexVariants }
export type { FlexProps }
