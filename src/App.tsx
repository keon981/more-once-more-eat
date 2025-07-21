import { useEffect, useState } from 'react'

import GoogleMapComponent from './components/maps/GoogleMap'
import { defaultCenter, mapApiKey } from './utils/map-center'

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
    <div className="h-screen w-screen   bg-gray-50">
      <GoogleMapComponent
        apiKey={mapApiKey}
        center={defaultCenter}
        zoom={17}
        markers={markers}
        onMapClick={handleMapClick}
      />
    </div>
  )
}

export default App
