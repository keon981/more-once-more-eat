import { useEffect, useState } from 'react'

import { MenuSidebar } from './layouts/menu-sidebar'
import GoogleMapComponent from '@/components/maps/GoogleMap'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { defaultCenter, mapApiKey } from '@/utils/map-center'

import './App.css'

// Replace with your actual Google Maps API key

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
        <main className="size-full p-2 flex flex-col gap-1 rounded border border-white bg-white/20">
          <nav className="flex items-center p-1 bg-white/20 rounded">
            <SidebarTrigger />
          </nav>
          <GoogleMapComponent
            apiKey={mapApiKey}
            center={defaultCenter}
            zoom={17}
            markers={markers}
            onMapClick={handleMapClick}
          />
        </main>
      </div>
    </SidebarProvider>
  )
}

export default App
