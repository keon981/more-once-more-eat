import { Search as SearchIcon } from 'lucide-react'

import type { ButtonProps } from '../ui/button'
import { Button } from '../ui/button'
import Command from '../ui/command'
import { usePlaceSearch } from '@/hooks/usePlaceSearch'
import { cn } from '@/lib/utils'

interface Props extends ButtonProps {

}

function SearchButton({ className, ...props }: Props) {
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
        {...props}
      >
        <SearchIcon className="h-4 w-4 text-muted-foreground" />
        <span>Search</span>
      </Button>
      <Command.Root></Command.Root>
    </>
  )
}

export default SearchButton
