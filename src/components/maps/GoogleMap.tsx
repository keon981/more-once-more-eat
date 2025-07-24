import { useCallback, useState } from 'react'

import type { GoogleMapProps } from '@react-google-maps/api'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

import { cn } from '@/lib/utils'

interface Props extends GoogleMapProps {
  apiKey: string
  center?: google.maps.LatLngLiteral
  zoom?: number
  markers?: google.maps.LatLngLiteral[]
  style?: React.CSSProperties
  className?: string
  onMapClick?: (event: google.maps.MapMouseEvent) => void
}

function GoogleMapComponent({
  apiKey,
  zoom = 10,
  markers = [],
  style,
  className,
  onMapClick,
  ...props
}: Props) {
  const [map, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    // 地圖卸載時的清理邏輯
    setMap(null)
  }, [])

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={{ ...style }}
        mapContainerClassName={cn('size-full rounded', className)}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onMapClick}
        {...props}
      >
        {markers.map(marker => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={marker}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  )
}

export default GoogleMapComponent
