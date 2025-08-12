import { Minus } from 'lucide-react'

import SearchButton from '@/components/maps/Search.button'
import { Button } from '@/components/ui/button'
import LiquidGlass from '@/components/ui/liquid-glass'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar'
import type { MarkerType } from '@/stores/map-store'
import { useMapStore } from '@/stores/map-store'

export function MenuSidebar() {
  const { markers, removeMarker } = useMapStore()
  const handleRemoveMarker = (marker: MarkerType) => {
    removeMarker(marker)
  }

  return (
    <Sidebar collapsible="offcanvas">
      <LiquidGlass>
        <SidebarContent>
          <div className="m-4">
            <SearchButton>搜尋餐廳、地點...</SearchButton>
          </div>
          <SidebarGroup>
            <SidebarGroupContent>
              {markers.map(marker => (
                <SidebarGroupLabel className="not-first:mt-4 h-auto min-h-8" key={`marker-${marker.lat}-${marker.lng}`}>
                  <span>{marker.name}</span>
                  <Button
                    className="ml-auto size-6 hover:bg-destructive"
                    size="icon"
                    variant="ghost"
                    onClick={() => handleRemoveMarker(marker)}
                  >
                    <Minus />
                  </Button>
                </SidebarGroupLabel>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </LiquidGlass>
    </Sidebar>
  )
}
