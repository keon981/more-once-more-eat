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
