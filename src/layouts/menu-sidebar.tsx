import { PlaceSearchInput } from '@/components/maps/PlaceSearch.Input'
import SearchButton from '@/components/maps/Search.button'
import LiquidGlass from '@/components/ui/liquid-glass'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar'
import { useMapStore } from '@/stores/map-store'

export function MenuSidebar() {
  const { markers } = useMapStore()
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
                <SidebarGroupLabel key={`marker-${marker.lat}-${marker.lng}`}>
                  {marker.name}
                </SidebarGroupLabel>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </LiquidGlass>
    </Sidebar>
  )
}
