import { useEffect, useState } from 'react'

import { MenuSidebar } from './layouts/menu-sidebar'
import GoogleMapComponent from '@/components/maps/GoogleMap'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { defaultCenter, mapApiKey } from '@/utils/map-center'

import './App.css'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Map } from 'lucide-react'

function App() {
  const [markers, setMarkers] = useState<google.maps.LatLngLiteral[]>([defaultCenter])

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newMarker = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      }
      setMarkers([newMarker])
    }
  }

  useEffect(() => {
    if (!navigator?.geolocation?.getCurrentPosition) return
    navigator.geolocation.getCurrentPosition((pos) => {
      setMarkers([{
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      }])
    })
  }, [])

  return (
    <SidebarProvider>
      <div className="flex size-full gap-2 rounded overflow-hidden">
        <MenuSidebar />
        <main className="size-full flex flex-col gap-2 rounded">
          <nav className="items-center p-1  rounded bg-glassmorphism">
            <SidebarTrigger />
          </nav>

          <Tabs defaultValue="map" className="relative size-full">
            <TabsList className='absolute py-6 px-2 bottom-14 left-1/2 -translate-x-1/2 z-30 bg-glassmorphism'>
              <TabsTrigger value="map" className=' p-5'><Map></Map> Map</TabsTrigger>
              <TabsTrigger value="password" className=' p-5'>Password</TabsTrigger>
            </TabsList>
            <TabsContent value="map" className="size-full p-1 rounded bg-glassmorphism">
              <GoogleMapComponent
                apiKey={mapApiKey}
                center={defaultCenter}
                zoom={17}
                markers={markers}
                onMapClick={handleMapClick}
              />
            </TabsContent>
            <TabsContent value="password">Change your password here.</TabsContent>
          </Tabs>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default App
