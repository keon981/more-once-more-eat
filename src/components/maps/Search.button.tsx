import { Search as SearchIcon } from 'lucide-react'
import { useHotkeys } from 'react-hotkeys-hook'

import { BorderBeam } from '../magicui/border-beam'
import type { ButtonProps } from '../ui/button'
import { Button } from '../ui/button'
import Command from '../ui/command'
import { Flex } from '../ui/flex'
import { Kbd, KbdKey } from '../ui/kbd'
import Shortcut from '../ui/shortcut'
import { useDialog } from '@/hooks/useDialog'
import { usePlaceSearch } from '@/hooks/usePlaceSearch'
import { cn } from '@/lib/utils'

interface Props extends ButtonProps {

}

function SearchButton({ className, ...props }: Props) {
  const { triggerProps, dialogProps, setIsOpen } = useDialog()
  const {
    query,
    setQuery,
    predictions,
    isLoading,
    selectedIndex,
    setSelectedIndex,
    getPlacePredictions,
    getPlaceDetails,
    setPredictions,
  } = usePlaceSearch()

  // keyboard shortcut
  useHotkeys('mod+k', () => {
    setIsOpen?.(open => !open)
  })

  return (
    <>
      <Button
        className={cn(
          'w-full justify-between items-center rounded-full bg-accent-foreground/10 border border-accent-foreground/10',
          'hover:bg-accent-foreground/10 hover:border-accent-foreground/10',
          className,
        )}
        {...triggerProps}
        {...props}
      >
        <Flex gap="sm">
          <SearchIcon className="h-4 w-4 text-muted-foreground" />
          <span>Search</span>
        </Flex>
        <Kbd>
          <KbdKey aria-label="Meta">⌘</KbdKey>
          <KbdKey>K</KbdKey>
        </Kbd>
      </Button>
      <Command.Dialog showCloseButton={false} {...dialogProps}>
        <Command.Input />

        <Command.List>
          {/* {loading && <Command.Loading>Hang on…</Command.Loading>} */}

          <Command.Empty>No results found.</Command.Empty>

          <Command.Group heading="Fruits">
            <Command.Item>Apple</Command.Item>
            <Command.Item>Orange</Command.Item>
            <Command.Separator />
            <Command.Item>Pear</Command.Item>
            <Command.Item>Blueberry</Command.Item>
          </Command.Group>

          <Command.Item>Fish</Command.Item>
        </Command.List>
        <BorderBeam
          duration={6}
          size={400}
          className="from-transparent via-white/75 to-transparent"
        />
        <BorderBeam
          duration={6}
          delay={3}
          size={400}
          borderWidth={2}
          className="from-transparent via-white/75 to-transparent"
        />
      </Command.Dialog>
    </>
  )
}

export default SearchButton
