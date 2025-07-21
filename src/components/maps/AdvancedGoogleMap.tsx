import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  Circle,
  Polygon,
  Polyline,
} from '@react-google-maps/api'
import { useState, useCallback } from 'react'

interface MarkerData {
  id: string
  position: google.maps.LatLngLiteral
  title?: string
  description?: string
}

interface AdvancedGoogleMapProps {
  apiKey: string
  center?: google.maps.LatLngLiteral
  zoom?: number
  height?: string
  width?: string
  markers?: MarkerData[]
  showCircle?: boolean
  showPolygon?: boolean
  showPolyline?: boolean
  onMapClick?: (event: google.maps.MapMouseEvent) => void
  onMarkerClick?: (marker: MarkerData) => void
}

const defaultCenter = {
  lat: 25.0330,
  lng: 121.5654, // Taipei, Taiwan
}

// Circle options
const circleOptions = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  radius: 1000, // 1km radius
}

// Polygon coordinates (triangle around Taipei)
const polygonPaths = [
  { lat: 25.0330, lng: 121.5654 },
  { lat: 25.0430, lng: 121.5754 },
  { lat: 25.0230, lng: 121.5754 },
]

// Polyline coordinates
const polylinePath = [
  { lat: 25.0330, lng: 121.5654 },
  { lat: 25.0430, lng: 121.5754 },
  { lat: 25.0530, lng: 121.5854 },
]

const AdvancedGoogleMap: React.FC<AdvancedGoogleMapProps> = ({
  apiKey,
  center = defaultCenter,
  zoom = 12,
  height = '500px',
  width = '100%',
  markers = [],
  showCircle = false,
  showPolygon = false,
  showPolyline = false,
  onMapClick,
  onMarkerClick,
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null)

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  const handleMarkerClick = (marker: MarkerData) => {
    setSelectedMarker(marker)
    onMarkerClick?.(marker)
  }

  const mapContainerStyle = {
    width,
    height,
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onMapClick}
        options={{
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: true,
          mapTypeControl: true,
          fullscreenControl: true,
        }}
      >
        {/* Markers */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            title={marker.title}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}

        {/* Info Window */}
        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-2">
              <h3 className="font-semibold text-lg">
                {selectedMarker.title || 'Marker'}
              </h3>
              {selectedMarker.description && (
                <p className="text-gray-600 mt-1">
                  {selectedMarker.description}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Lat: {selectedMarker.position.lat.toFixed(6)}, 
                Lng: {selectedMarker.position.lng.toFixed(6)}
              </p>
            </div>
          </InfoWindow>
        )}

        {/* Circle */}
        {showCircle && (
          <Circle
            center={center}
            options={circleOptions}
          />
        )}

        {/* Polygon */}
        {showPolygon && (
          <Polygon
            paths={polygonPaths}
            options={{
              strokeColor: '#0000FF',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#0000FF',
              fillOpacity: 0.35,
            }}
          />
        )}

        {/* Polyline */}
        {showPolyline && (
          <Polyline
            path={polylinePath}
            options={{
              strokeColor: '#00FF00',
              strokeOpacity: 1.0,
              strokeWeight: 3,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default AdvancedGoogleMap
