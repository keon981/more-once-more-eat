import { useEffect } from 'react'

import { APIProvider as GoogleMapAPIProvider } from '@vis.gl/react-google-maps'

import Turntable from './components/turntable'
import LiquidGlass from './components/ui/liquid-glass'
import { Vortex } from './components/ui/vortex'
import MenuList from './layouts/menu-list'
import { MenuSidebar } from './layouts/menu-sidebar'
import GoogleMapComponent from '@/components/maps/GoogleMap.layout'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { useMapStore } from '@/stores/map-store'
import { mapApiKey } from '@/utils/map-center'

import './App.css'

function App() {
  const { setCenter } = useMapStore()

  useEffect(() => {
    if (!navigator?.geolocation?.getCurrentPosition) return
    navigator.geolocation.getCurrentPosition((pos) => {
      setCenter({
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
              <Tabs defaultValue="map" className="relative size-full">
                <MenuList />
                <TabsContent value="map" className="size-full p-1 rounded bg-glassmorphism">
                  <LiquidGlass className="size-full">
                    <GoogleMapComponent />
                  </LiquidGlass>
                </TabsContent>
                <TabsContent value="turntable" className="size-full p-1 rounded bg-glassmorphism">
                  <LiquidGlass>
                    <Turntable onResult={option => console.log('選中了:', option.label)} />
                  </LiquidGlass>
                </TabsContent>
              </Tabs>

            </main>

          </Vortex>
        </div>
      </SidebarProvider>
    </GoogleMapAPIProvider>
  )
}

export default App
