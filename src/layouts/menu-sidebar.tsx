import { PlaceSearchInput } from '@/components/maps/PlaceSearchInput'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar'

export function MenuSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>搜尋地點</SidebarGroupLabel>
          <SidebarGroupContent>
            <PlaceSearchInput placeholder="搜尋餐廳、美食..." />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
