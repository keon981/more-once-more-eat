import { useRef, useState } from 'react'

import { MapPin, Plus, Search as SearchIcon, X } from 'lucide-react'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { SidebarGroupAction, SidebarInput } from '../ui/sidebar'
import { Button } from '@/components/ui/button'
import Command from '@/components/ui/command'
import { usePlaceSearch } from '@/hooks/usePlaceSearch'
import { cn } from '@/lib/utils'
import { useMapStore } from '@/stores/map-store'

interface PlaceSearchInputProps {
  className?: string
  placeholder?: string
  onPlaceSelect?: (place: google.maps.places.PlaceResult) => void
}

export function PlaceSearchInput({
  className,
  placeholder = '搜尋地點...',
  onPlaceSelect,
}: PlaceSearchInputProps) {
  // state
  const [isOpenPopover, setIsOpenPopover] = useState(false)
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

  const open = isOpenPopover && predictions.length > 0 && query.trim()

  // ref
  const inputRef = useRef<HTMLInputElement>(null)

  // google maps
  const { center, setCenter } = useMapStore()

  // 處理輸入變化
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setSelectedIndex(-1)

    if (value.trim()) {
      setIsOpenPopover(true)
      getPlacePredictions(value)
    } else {
      setIsOpenPopover(false)
      setPredictions([])
    }
  }

  // 處理鍵盤導航
  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (!isOpenPopover || predictions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev =>
          prev < predictions.length - 1 ? prev + 1 : prev,
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < predictions.length) {
          setIsOpenPopover(false)
          getPlaceDetails(predictions[selectedIndex].place_id).then((res) => {
            if (!res?.marker || !res?.placeResult) return
            onPlaceSelect?.(res.placeResult)
            setCenter({
              lat: res.marker?.lat || center.lat,
              lng: res.marker?.lng || center.lat,
            })
          })
        }
        break
      case 'Escape':
        setIsOpenPopover(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  // 處理地點選擇
  const handlePlaceSelect = (prediction: PlacePrediction) => {
    getPlaceDetails(prediction.place_id)
      .then((res) => {
        if (!res) return
        onPlaceSelect?.(res.placeResult)
        setCenter({
          lat: res.marker.lat || center.lat,
          lng: res.marker.lng || center.lat,
        })
      })
    setIsOpenPopover(false)
  }

  // 清除搜尋
  const handleClear = () => {
    setQuery('')
    setPredictions([])
    setIsOpenPopover(false)
    setSelectedIndex(-1)
  }

  const handlePopoverOpenChange = () => {}

  return (
    <Command.Root className={cn('relative w-full bg-transparent', className)}>
      <Popover open={!!open} onOpenChange={handlePopoverOpenChange}>
        <PopoverTrigger asChild onClick={() => {}}>
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <SidebarInput
              ref={inputRef}
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="px-10 bg-transparent border-primary focus-visible:border-2"
            />
            {query && (
              <SidebarGroupAction
                onClick={handleClear}
                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
              >
                <X className="h-4 w-4" />
              </SidebarGroupAction>
            )}
          </div>
        </PopoverTrigger>

        {/* 搜尋結果下拉選單 */}
        <PopoverContent
          align="start"
          className="min-w-96"
          onOpenAutoFocus={(e) => {
            e.preventDefault()
          }}
        >
          {isLoading
            ? (
                <div className="flex items-center justify-center p-4">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  <span className="ml-2 text-sm text-muted-foreground">搜尋中...</span>
                </div>
              )
            : (
                <Command.List>
                  {predictions.map((prediction, index) => (
                    <Command.Item
                      key={prediction.place_id}
                      onSelect={() => handlePlaceSelect(prediction)}
                      className={cn(
                        'text-left transition-colors hover:bg-accent',
                        selectedIndex === index && 'bg-accent',
                      )}
                    >
                      <Command.Shortcut>
                        <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                      </Command.Shortcut>
                      <p className="flex flex-col flex-1 min-w-0">
                        <span className="font-medium text-sm">
                          {prediction.structured_formatting.main_text}
                        </span>
                        <span className="text-xs text-muted-foreground truncate">
                          {prediction.structured_formatting.secondary_text}
                        </span>
                      </p>
                      <Button
                        size="icon"
                        variant="link"
                        className="hover:bg-primary/30 hover:text-white"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          getPlaceDetails(prediction.place_id)
                            .then((res) => {
                              if (!res?.placeResult) return
                              onPlaceSelect?.(res?.placeResult)
                            })
                        }}
                      >
                        <Plus />
                      </Button>
                    </Command.Item>
                  ))}
                </Command.List>
              )}
        </PopoverContent>
      </Popover>

    </Command.Root>
  )
}
