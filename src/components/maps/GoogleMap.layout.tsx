import { AdvancedMarker, Map as GoogleMap, Pin } from '@vis.gl/react-google-maps'
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
  const { zoom, center, markers, setMarker, setCameraState } = useMapStore()

  const handleMapClick = (event: MapMouseEvent) => {
    if (event.detail.latLng) {
      setMarker({
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
      disableDefaultUI={true}
      {...props}
    >
      {markers.map(marker => (
        <AdvancedMarker
          key={`marker-${marker.lat}-${marker.lng}`}
          position={marker}
        >
          <Pin
            background="#FBBC04"
            glyphColor="#000"
            borderColor="#000"
          >
            {/* <img src={imgsrc} alt="img" className="size-8 rounded-full" /> */}
          </Pin>
        </AdvancedMarker>
      ))}
    </GoogleMap>
  )
}

export default GoogleMapComponent
