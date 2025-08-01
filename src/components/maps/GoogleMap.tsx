import { AdvancedMarker, Map as GoogleMap } from '@vis.gl/react-google-maps'
import type { MapMouseEvent, MapProps } from '@vis.gl/react-google-maps'

import { cn } from '@/lib/utils'
import { useMapStore } from '@/stores/map-store'

interface Props extends MapProps {
  zoom?: number
  className?: string
}

function GoogleMapComponent({
  className,
  ...props
}: Props) {
  const { markers, addMarker } = useMapStore()

  const handleMapClick = (event: MapMouseEvent) => {
    if (event.detail.latLng) {
      addMarker(event.detail.latLng)
    }
  }

  return (
    <GoogleMap
      mapId="google-map"
      colorScheme="DARK"
      renderingType="UNINITIALIZED"
      defaultZoom={10}
      className={cn('size-full rounded', className)}
      gestureHandling="greedy"
      onClick={handleMapClick}
      reuseMaps
      {...props}
    >
      {markers.map((marker, index) => (
        <AdvancedMarker
          key={`marker-${marker.lat}-${marker.lng}-${index}`}
          position={marker}
        />
      ))}
    </GoogleMap>
  )
}

export default GoogleMapComponent
