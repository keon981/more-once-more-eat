import * as React from 'react'

import * as TabsPrimitive from '@radix-ui/react-tabs'

import { buttonVariants } from './button'
import LiquidGlass from './liquid-glass'
import { cn } from '@/lib/utils'

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'bg-muted text-muted-foreground inline-flex gap-1 h-9 w-fit items-center justify-center rounded-lg p-[3px]',
        className,
      )}
      {...props}
    />
  )
}

function LiquidGlassTabsList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsList className={cn('h-13 bg-transparent liquid-glasscard gap-0 rounded-xl absolute z-30 overflow-hidden', className)} {...props}>
      <LiquidGlass className="inline-flex gap-1 items-center justify-center text-center">
        {children}
      </LiquidGlass>
    </TabsList>
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      // data-color="secondary"
      className={cn(
        buttonVariants({ variant: 'ghost', size: 'icon' }),
        'data-[state=active]:bg-foreground data-[state=active]:text-background focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-ring focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  )
}

export { LiquidGlassTabsList, Tabs, TabsContent, TabsList, TabsTrigger }
