import { useCallback, useRef, useState } from 'react'

import { useMapsLibrary } from '@vis.gl/react-google-maps'
import { MapPin, Plus, Search as SearchIcon, X } from 'lucide-react'

import { Command, CommandItem, CommandList, CommandShortcut } from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useMapStore } from '@/stores/map-store'

interface PlacePrediction {
  place_id: string
  description: string
  structured_formatting: {
    main_text: string
    secondary_text: string
  }
}

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
  const [query, setQuery] = useState('')
  const [predictions, setPredictions] = useState<PlacePrediction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenPopover, setIsOpenPopover] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const open = isOpenPopover && predictions.length > 0 && query.trim()

  // ref
  const inputRef = useRef<HTMLInputElement>(null)

  // google maps
  const places = useMapsLibrary('places')
  const { center, setCenter, addMarker } = useMapStore()

  // 取得地點預測
  const getPlacePredictions = useCallback(
    async (input: string) => {
      if (!places || !input.trim()) {
        setPredictions([])
        return
      }

      setIsLoading(true)

      try {
        // 建立搜尋參數，包含距離限制
        const radius = 0.000001 // 1公里
        const isCenterValid = center && !Number.isNaN(center.lat) && !Number.isNaN(center.lng)
        const locationBias = isCenterValid
          ? {
              east: center.lng + radius,
              west: center.lng - radius,
              north: center.lat + radius,
              south: center.lat - radius,
            }
          : undefined
        const request: google.maps.places.AutocompleteRequest = {
          input,
          includedRegionCodes: ['tw'], // 限制台灣
          includedPrimaryTypes: ['restaurant', 'food'],
          locationBias,
        }

        // 使用靜態方法調用
        const result = await places.AutocompleteSuggestion.fetchAutocompleteSuggestions(request)

        if (result.suggestions) {
          const formattedPredictions = result.suggestions.map((suggestion) => {
            // 取得地點預測
            const placePrediction = suggestion.placePrediction
            const fullText = placePrediction?.text?.text || ''
            const mainText = placePrediction?.mainText?.text || ''
            const secondaryText = placePrediction?.secondaryText?.text || ''

            return {
              place_id: placePrediction?.placeId || '',
              description: fullText,
              structured_formatting: {
                main_text: mainText,
                secondary_text: secondaryText,
              },
            }
          })
          setPredictions(formattedPredictions)
        } else {
          setPredictions([])
        }
      } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error)
        setPredictions([])
      } finally {
        setIsLoading(false)
      }
    },
    [places, center],
  )

  // 取得地點詳細資訊
  const getPlaceDetails = useCallback(
    async (placeId: string) => {
      if (!places) return

      try {
        const place = new places.Place({
          id: placeId,
          requestedLanguage: 'zh-TW',
          requestedRegion: 'tw',
        })

        // 使用 fetchFields 方法獲取地點詳細資訊
        await place.fetchFields({
          fields: ['location', 'displayName', 'formattedAddress', 'id'],
        })

        if (place.location) {
          const location = {
            lat: place.location.lat(),
            lng: place.location.lng(),
          }

          setCenter(location)
          addMarker(location)

          // 建立相容的 PlaceResult 物件
          const placeResult: google.maps.places.PlaceResult = {
            geometry: {
              location: place.location,
            },
            name: place.displayName || undefined,
            formatted_address: place.formattedAddress || undefined,
            place_id: place.id || undefined,
          }

          onPlaceSelect?.(placeResult)

          setQuery(place.displayName || place.formattedAddress || '')
          setSelectedIndex(-1)
        }
      } catch (error) {
        console.error('Error fetching place details:', error)
      }
    },
    [places, setCenter, addMarker, onPlaceSelect],
  )

  // 處理輸入變化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  const handleKeyDown = (e: React.KeyboardEvent) => {
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
          getPlaceDetails(predictions[selectedIndex].place_id)
          setIsOpenPopover(false)
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
    <Command className={cn('relative w-full max-w-1/3', className)}>
      <Popover open={!!open} onOpenChange={handlePopoverOpenChange}>
        <PopoverTrigger asChild onClick={() => {}}>
          <div className="relative min-w-96">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={inputRef}
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="px-10 bg-indigo-100/50"
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
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
                <CommandList>
                  {predictions.map((prediction, index) => (
                    <CommandItem
                      key={prediction.place_id}
                      onSelect={() => handlePlaceSelect(prediction)}
                      className={cn(
                        'text-left transition-colors hover:bg-accent',
                        selectedIndex === index && 'bg-accent',
                      )}
                    >
                      <CommandShortcut>
                        <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                      </CommandShortcut>
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
                        }}
                      >
                        <Plus />
                      </Button>
                    </CommandItem>
                  ))}
                </CommandList>
              )}
        </PopoverContent>
      </Popover>

    </Command>
  )
}
