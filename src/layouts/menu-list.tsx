import React from 'react'

import { Compass, Map as MapIcon } from 'lucide-react'

import { Dock, DockIcon } from '@/components/magicui/dock'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { LiquidGlassTabsList, TabsTrigger } from '@/components/ui/tabs'

function MenuList() {
  return (
    <LiquidGlassTabsList className="absolute py-6 px-1 z-30 bottom-4 left-20 min-w-10 -translate-x-1/2">
      <Dock className="border-0">
        <DockIcon className="overflow-hidden">
          <SidebarTrigger variant="ghost" size="icon" className="size-12 rounded-full text-accent-foreground/75" />
        </DockIcon>
        <DockIcon className="overflow-hidden">
          <TabsTrigger value="map" className="size-12 px-1 py-2.5">
            <MapIcon />
          </TabsTrigger>
        </DockIcon>
        <DockIcon className="overflow-hidden">
          <TabsTrigger value="turntable" className="size-12 px-1 py-2.5">
            <Compass />
          </TabsTrigger>
        </DockIcon>
      </Dock>
    </LiquidGlassTabsList>
  )
}

export default MenuList
