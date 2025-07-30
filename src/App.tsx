import { useEffect } from 'react'

import type { Libraries } from '@react-google-maps/api'
import { LoadScript } from '@react-google-maps/api'
import { Compass, Map } from 'lucide-react'

import { LiquidGlassTabsList, Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { MenuSidebar } from './layouts/menu-sidebar'
import GoogleMapComponent from '@/components/maps/GoogleMap'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useMapStore } from '@/stores/map-store'
import { mapApiKey } from '@/utils/map-center'

import './App.css'

const libraries: Libraries = ['places']

function App() {
  const { center, markers, setCenter, addMarker } = useMapStore()

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newMarker: LocationType = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      }
      addMarker(newMarker)
    }
  }

  useEffect(() => {
    if (!navigator?.geolocation?.getCurrentPosition) return
    navigator.geolocation.getCurrentPosition((pos) => {
      setCenter({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      })
    })
  }, [setCenter])

  return (
    <SidebarProvider>
      <LoadScript
        googleMapsApiKey={mapApiKey}
        libraries={libraries}
        language="zh-TW"
        region="TW"
        loadingElement={(
          <div className="flex w-screen h-screen gap-2 rounded overflow-hidden">
            <div className="w-64 bg-glassmorphism rounded">
              <div className="p-4">載入地圖 API 中...</div>
            </div>
            <main className="size-full flex flex-col gap-2 rounded">
              <nav className="items-center p-1 rounded bg-glassmorphism">
                <SidebarTrigger />
              </nav>
              <div className="size-full p-1 rounded bg-glassmorphism flex items-center justify-center">
                <div>Loading...</div>
              </div>
            </main>
          </div>
        )}
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
                  <Map /> Map
                </TabsTrigger>
                <TabsTrigger value="turntable" className="px-1 py-2.5 rounded-xl">
                  <Compass /> Turntable
                </TabsTrigger>
              </LiquidGlassTabsList>
              <TabsContent value="map" className="size-full p-1 rounded bg-glassmorphism">
                <GoogleMapComponent
                  center={center}
                  zoom={17}
                  markers={markers}
                  onMapClick={handleMapClick}
                />
              </TabsContent>
              <TabsContent value="turntable" className="size-full p-1 rounded bg-glassmorphism">Change your password here.</TabsContent>
            </Tabs>
          </main>
        </div>
      </LoadScript>
    </SidebarProvider>
  )
}

export default App
