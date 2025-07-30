import { useEffect } from 'react'

import { APIProvider } from '@vis.gl/react-google-maps'
import { Compass, Map as MapIcon } from 'lucide-react'

import { LiquidGlassTabsList, Tabs, TabsContent, TabsTrigger } from './components/ui/tabs'
import { MenuSidebar } from './layouts/menu-sidebar'
import GoogleMapComponent from '@/components/maps/GoogleMap'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useMapStore } from '@/stores/map-store'
import { mapApiKey } from '@/utils/map-center'

import './App.css'

function App() {
  const { center, setCenter } = useMapStore()

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
    <SidebarProvider>
      <APIProvider
        apiKey={mapApiKey}
        libraries={['places']}
        language="zh-TW"
        region="TW"
        onLoad={() => console.log('Google Maps API loaded')}
      >
        <div className="flex w-screen max-h-screen h-full gap-2 rounded overflow-hidden">
          <MenuSidebar />
          <main className="size-full flex flex-col gap-2 rounded">
            <nav className="items-center p-1 rounded bg-glassmorphism">
              <SidebarTrigger />
            </nav>

            <Tabs defaultValue="map" className="relative size-full">
              <LiquidGlassTabsList className="absolute py-6 px-1 bottom-14 left-1/2 -translate-x-1/2 z-30">
                <TabsTrigger value="map" className="px-1 py-2.5 rounded-xl">
                  <MapIcon /> Map
                </TabsTrigger>
                <TabsTrigger value="turntable" className="px-1 py-2.5 rounded-xl">
                  <Compass /> Turntable
                </TabsTrigger>
              </LiquidGlassTabsList>
              <TabsContent value="map" className="size-full p-1 rounded bg-glassmorphism">
                <GoogleMapComponent defaultCenter={center} defaultZoom={17} />
              </TabsContent>
              <TabsContent value="turntable" className="size-full p-1 rounded bg-glassmorphism">Change your password here.</TabsContent>
            </Tabs>
          </main>
        </div>
      </APIProvider>
    </SidebarProvider>
  )
}

export default App
