import { Compass, Map as MapIcon, PanelLeftIcon } from 'lucide-react'

import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock/dock'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'

function Menubar() {
  return (
    <TabsList className="h-auto absolute p-0 z-30 bottom-4 left-20 border-0 bg-transparent">
      <Dock magnification={56} classNames={{ root: 'mx-0' }} className="">
        <DockItem className="aspect-square rounded-full  ">
          <SidebarTrigger size="icon" className="size-full text-xs rounded-full">
            <DockLabel>sidebar</DockLabel>
            <DockIcon>
              <PanelLeftIcon />
            </DockIcon>
          </SidebarTrigger>
        </DockItem>
        <DockItem className="aspect-square rounded-full  ">
          <TabsTrigger value="map" className="size-full text-xs rounded-full">
            <DockLabel>map</DockLabel>
            <DockIcon>
              <MapIcon />
            </DockIcon>
          </TabsTrigger>
        </DockItem>
        <DockItem className="aspect-square rounded-full ">
          <TabsTrigger value="turntable" className="size-full text-xs rounded-full ">
            <DockLabel>turntable</DockLabel>
            <DockIcon>
              <Compass />
            </DockIcon>
          </TabsTrigger>
        </DockItem>
      </Dock>
    </TabsList>
  )
}

export default Menubar
