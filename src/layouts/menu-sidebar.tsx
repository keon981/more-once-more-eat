import { useRef } from 'react'

// import { Autocomplete } from '@vis.gl/react-google-maps'

import { Input } from '@/components/ui/input'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from '@/components/ui/sidebar'
import { useMapStore } from '@/stores/map-store'

const distance = 0.01

export function MenuSidebar() {
  const { center, setCenter, addMarker } = useMapStore()
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

  const handlePlaceChanged = (): void => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace()
      if (!place || !place.geometry?.location) return

      const location = {
        lat: place.geometry?.location.lat(),
        lng: place.geometry?.location.lng(),
      }
      setCenter(location)
      addMarker(location)
    }
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {/* <Autocomplete
              onLoad={(autocomplete) => {
                autocompleteRef.current = autocomplete
              }}
              types={['restaurant', 'food']}
              bounds={{
                east: center.lng + distance,
                west: center.lng - distance,
                north: center.lat + distance,
                south: center.lat - distance,
              }}
              onPlaceChanged={handlePlaceChanged}
            >
              <Input />
            </Autocomplete> */}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
