import { Compass, Map as MapIcon } from 'lucide-react'

import { Dock, DockItem } from '@/components/ui/dock/dock'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { LiquidGlassTabsList, TabsTrigger } from '@/components/ui/tabs'

function MenuList() {
  return (
    <Dock>
      <LiquidGlassTabsList className="min-w-10 -translate-x-1/2">
        <DockItem className="overflow-hidden">
          <SidebarTrigger variant="ghost" size="icon" className="size-12 rounded-full text-accent-foreground/75" />
        </DockItem>
        <DockItem className="overflow-hidden">
          <TabsTrigger value="map" className="size-12 px-1 py-2.5">
            <MapIcon />
          </TabsTrigger>
        </DockItem>
        <DockItem className="overflow-hidden">
          <TabsTrigger value="turntable" className="size-12 px-1 py-2.5">
            <Compass />
          </TabsTrigger>
        </DockItem>
      </LiquidGlassTabsList>
    </Dock>
  )
}

export default MenuList
