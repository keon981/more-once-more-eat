import { Plus, Search as SearchIcon } from 'lucide-react'
import { useHotkeys } from 'react-hotkeys-hook'

import { BorderBeam } from '../magicui/border-beam'
import type { ButtonProps } from '../ui/button'
import { Button } from '../ui/button'
import Command from '../ui/command'
import { Flex } from '../ui/flex'
import { Kbd, KbdKey } from '../ui/kbd'
import { useDialog } from '@/hooks/useDialog'
import { usePlaceSearch } from '@/hooks/usePlaceSearch'
import { cn } from '@/lib/utils'

interface Props extends ButtonProps {
  onPlaceSelect?: (place: google.maps.places.PlaceResult) => void
}

function SearchButton({ className, onPlaceSelect, ...props }: Props) {
  const { triggerProps, dialogProps, trigger } = useDialog()
  const {
    query,
    setQuery,
    predictions,
    isLoading,
    getPlacePredictions,
    getPlaceDetails,
    setPredictions,
  } = usePlaceSearch()
  const isEmpty = query.trim().length > 0 && predictions.length === 0 && !isLoading
  const loading = isLoading && query.trim().length > 0 && predictions.length === 0

  // keyboard shortcut
  useHotkeys('mod+k', () => {
    trigger()
  })

  const handleValueChange = async (value: string) => {
    setQuery(value)

    if (value.trim()) {
      getPlacePredictions(value)
    } else {
      setPredictions([])
    }
  }

  const handleAddMarker = (prediction: PlacePrediction) => {
    getPlaceDetails(prediction.place_id)
      .then((res) => {
        if (!res?.placeResult) return
        onPlaceSelect?.(res?.placeResult)
      })
  }

  return (
    <>
      {/* 搜尋按鈕 */}
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

      {/* 搜尋結果下拉選單 */}
      <Command.Dialog
        value={query}
        dialogProps={{
          showCloseButton: false,
          ...dialogProps,
          onOpenChange(open) {
            dialogProps.onOpenChange?.(open)
            if (!open) setQuery('')
          },
        }}
        shouldFilter={false}
      >
        <Command.Input
          placeholder="Search for a place..."
          value={query}
          onValueChange={handleValueChange}
        />

        <Command.List className="px-2">
          {loading && <Command.Loading />}
          {isEmpty && <Command.Empty>No results found.</Command.Empty>}

          {
            predictions.map(prediction => (
              <Command.Item key={prediction.structured_formatting.main_text}>
                <Flex as="p" items="start" direction="column" gap={1}>
                  <span className="font-medium text-sm">
                    {prediction.structured_formatting.main_text}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {prediction.structured_formatting.secondary_text}
                  </span>
                </Flex>
                <Button className="ml-auto" size="icon" variant="ghost" onClick={() => handleAddMarker(prediction)}>
                  <Plus />
                </Button>
              </Command.Item>
            ))
          }
        </Command.List>

        {/* 邊框效果 */}
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
