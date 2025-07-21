import { useCallback, useState } from 'react'

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

import { cn } from '@/lib/utils'

interface GoogleMapComponentProps {
  apiKey: string
  center?: google.maps.LatLngLiteral
  zoom?: number
  markers?: google.maps.LatLngLiteral[]
  style?: React.CSSProperties
  className?: string
  onMapClick?: (event: google.maps.MapMouseEvent) => void
}

const defaultCenter = {
  lat: 25.0330,
  lng: 121.5654, // Taipei, Taiwan
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  apiKey,
  center = defaultCenter,
  zoom = 10,
  markers = [],
  style,
  className,
  onMapClick,
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map)
    console.log(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={{ ...style }}
        mapContainerClassName={cn('w-full h-full min-w-full min-h-full', className)}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onMapClick}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  )
}

export default GoogleMapComponent
