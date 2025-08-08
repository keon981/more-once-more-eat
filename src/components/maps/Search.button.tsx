import { Search as SearchIcon } from 'lucide-react'

import type { ButtonProps } from '../ui/button'
import { Button } from '../ui/button'
import Command from '../ui/command'
import { useDialog } from '@/hooks/useDialog'
import { usePlaceSearch } from '@/hooks/usePlaceSearch'
import { cn } from '@/lib/utils'

interface Props extends ButtonProps {

}

function SearchButton({ className, ...props }: Props) {
  const { triggerProps, dialogProps } = useDialog()
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

  return (
    <>
      <Button
        className={cn(
          'w-full justify-start items-center rounded-full bg-accent-foreground/10 border border-accent-foreground/10',
          'hover:bg-accent-foreground/10 hover:border-accent-foreground/10',
          className,
        )}
        {...triggerProps}
        {...props}
      >
        <SearchIcon className="h-4 w-4 text-muted-foreground" />
        <span>Search</span>
      </Button>
      <Command.Dialog {...dialogProps}>
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
      </Command.Dialog>
    </>
  )
}

export default SearchButton
