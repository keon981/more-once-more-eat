import { useEffect } from 'react'

import { APIProvider as GoogleMapAPIProvider } from '@vis.gl/react-google-maps'
import { ChartArea, MapIcon, PanelLeftIcon } from 'lucide-react'

import { DockIcon } from './components/ui/dock/dock'
import LiquidGlass from './components/ui/liquid-glass'
import { Vortex } from './components/ui/vortex'
import { MenuSidebar } from './layouts/menu-sidebar'
import Menubar from './layouts/menubar'
import type { MenubarItem } from './layouts/menubar'
import RechartsLayout from './layouts/recharts.layout'
import WheelDialog from './layouts/wheel-dialog'
import GoogleMapComponent from '@/components/maps/GoogleMap.layout'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Tabs, TabsContent, TabsTrigger } from '@/components/ui/tabs'
import { useMapStore } from '@/stores/map-store'
import { mapApiKey } from '@/utils/map-center'

import './App.css'

const menubarList = [
  {
    label: 'sidebar',
    asChild: true,
    children: (
      <SidebarTrigger> <DockIcon>
        <PanelLeftIcon />
      </DockIcon>
      </SidebarTrigger>
    ),
  },
  {
    label: 'map',
    children: (
      <TabsTrigger value="map" className="size-full text-xs rounded-full">
        <DockIcon><MapIcon /></DockIcon>
      </TabsTrigger>
    ),
  },
  {
    label: 'turntable',
    children: (<WheelDialog />),
  },
  {
    label: 'chart',
    children: (
      <TabsTrigger value="chart" className="size-full text-xs rounded-full ">
        <DockIcon><ChartArea /></DockIcon>
      </TabsTrigger>
    ),
  },
] satisfies MenubarItem[]

function App() {
  const { setLocation } = useMapStore()

  useEffect(() => {
    if (!navigator?.geolocation?.getCurrentPosition) return
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      })
    })
  }, [])

  return (
    <GoogleMapAPIProvider
      apiKey={mapApiKey}
      libraries={['places']}
      language="zh-TW"
      region="TW"
    >
      <SidebarProvider className="p-0">
        <div className="w-screen max-h-screen p-2 rounded overflow-hidden">
          <Vortex backgroundColor="black" className="flex size-full">
            <MenuSidebar />
            <main className="size-full relative flex flex-col gap-2 rounded">
              <Tabs defaultValue="chart" className="relative size-full">
                {/* Map Tab */}
                <TabsContent value="map" className="size-full p-1 rounded border-stereoscopic">
                  <LiquidGlass className="size-full">
                    <GoogleMapComponent />
                  </LiquidGlass>
                </TabsContent>
                {/* Recharts Tab */}
                <TabsContent value="chart" className="size-full p-1 rounded border-stereoscopic">
                  <LiquidGlass>
                    <RechartsLayout />
                  </LiquidGlass>
                </TabsContent>
                <Menubar data={menubarList} />
              </Tabs>
            </main>
          </Vortex>
        </div>

      </SidebarProvider>
    </GoogleMapAPIProvider>
  )
}

export default App
