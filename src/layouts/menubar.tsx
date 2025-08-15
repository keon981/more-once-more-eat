import type { ButtonProps } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock/dock'
import { TabsList } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

interface MenubarItem extends ButtonProps {
  label: string
  icon?: React.ReactNode
}
interface MenubarProps {
  data?: MenubarItem[]
}

const defaultData = [] satisfies MenubarItem[]

function Menubar({ data = defaultData }: MenubarProps) {
  return (
    <TabsList className="h-auto absolute p-0 z-30 bottom-4 left-4 border-0 bg-transparent">
      <Dock magnification={56} classNames={{ root: 'mx-0' }} className="">
        {
          data.map(({ label, icon, children, className, ...item }) => (
            <DockItem key={label} className="aspect-square rounded-full">
              <DockLabel>{label}</DockLabel>
              <Button
                size="icon"
                variant="ghost"
                color="accent"
                className={cn('size-full text-xs rounded-full', className)}
                {...item}
              >
                {children ?? <DockIcon>{icon}</DockIcon>}
              </Button>
            </DockItem>
          ))
        }
      </Dock>
    </TabsList>
  )
}
export type { MenubarItem, MenubarProps }
export default Menubar
