import { AdvancedMarker, Map as GoogleMap } from '@vis.gl/react-google-maps'
import type { MapCameraChangedEvent, MapMouseEvent, MapProps } from '@vis.gl/react-google-maps'

import { cn } from '@/lib/utils'
import { useMapStore } from '@/stores/map-store'

interface Props extends MapProps {
  className?: string
}

function GoogleMapComponent({
  className,
  ...props
}: Props) {
  const { zoom, center, markers, addMarker, setCameraState } = useMapStore()

  const handleMapClick = (event: MapMouseEvent) => {
    if (event.detail.latLng) {
      addMarker({
        lat: event.detail.latLng.lat,
        lng: event.detail.latLng.lng,
        name: '新標記',
        message: '點擊地圖新增的標記',
      })
    }
  }

  const handleCameraChanged = (event: MapCameraChangedEvent) => {
    setCameraState({
      center: event.detail.center,
      zoom: event.detail.zoom,
    })
  }

  return (
    <GoogleMap
      center={center}
      zoom={zoom}
      mapId="google-map"
      colorScheme="DARK"
      renderingType="UNINITIALIZED"
      className={cn('size-full rounded overflow-hidden', className)}
      gestureHandling="greedy"
      onClick={handleMapClick}
      onCameraChanged={handleCameraChanged}
      reuseMaps
      {...props}
    >
      {markers.map(marker => (
        <AdvancedMarker
          key={`marker-${marker.lat}-${marker.lng}`}
          position={marker}
        />
      ))}
    </GoogleMap>
  )
}

export default GoogleMapComponent
