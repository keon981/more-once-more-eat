import { useCallback, useState } from 'react'

import { useMapsLibrary } from '@vis.gl/react-google-maps'

import { useMapStore } from '@/stores/map-store'

interface Props {
  radius?: number
}

function usePlaceSearch({ radius = 0.000001 }: Props = {}) {
  // state
  const [query, setQuery] = useState('')
  const [predictions, setPredictions] = useState<PlacePrediction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const places = useMapsLibrary('places')
  const { center, addMarker } = useMapStore()

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

          addMarker({
            ...location,
            name: place.displayName || '未知地點',
            message: place.formattedAddress || '搜尋結果',
          })

          // 建立相容的 PlaceResult 物件
          const placeResult: google.maps.places.PlaceResult = {
            geometry: {
              location: place.location,
            },
            name: place.displayName || undefined,
            formatted_address: place.formattedAddress || undefined,
            place_id: place.id || undefined,
          }

          setQuery(place.displayName || place.formattedAddress || '')
          setSelectedIndex(-1)
          return {
            marker: {
              ...location,
              name: place.displayName || '未知地點',
              message: place.formattedAddress || '搜尋結果',
            },
            placeResult,
          }
        }
      } catch (error) {
        console.error('Error fetching place details:', error)
      }
    },
    [places],
  )

  return {
    query,
    setQuery,
    predictions,
    isLoading,
    selectedIndex,
    setSelectedIndex,
    getPlacePredictions,
    getPlaceDetails,
    setPredictions,
  }
}

export { usePlaceSearch }
