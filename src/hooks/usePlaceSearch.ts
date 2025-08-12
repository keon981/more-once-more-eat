import { useCallback, useState } from 'react'

import { useMapsLibrary } from '@vis.gl/react-google-maps'

import { useMapStore } from '@/stores/map-store'

interface Props {
  radius?: number
}

function usePlaceSearch({ radius = 1500 }: Props = {}) {
  // state
  const [query, setQuery] = useState('')
  const [predictions, setPredictions] = useState<PlacePrediction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const places = useMapsLibrary('places')
  const { location, addMarker } = useMapStore()
  const radiusToMeter = radius / 111320
  const cosLat = Math.cos(location.lat * (Math.PI / 180))

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
        const isCenterValid = location && !Number.isNaN(location.lat) && !Number.isNaN(location.lng)
        const locationRestriction = isCenterValid
          ? {
              east: location.lng + (radius / (111320 * cosLat)),
              west: location.lng - (radius / (111320 * cosLat)),
              north: location.lat + radiusToMeter,
              south: location.lat - radiusToMeter,
            }
          : undefined
        const request: google.maps.places.AutocompleteRequest = {
          input,
          includedRegionCodes: ['tw'], // 限制台灣
          includedPrimaryTypes: ['restaurant', 'food'],
          locationRestriction,
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
              description: fullText, // mainText + secondaryText
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
    [places, location],
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
    getPlacePredictions,
    getPlaceDetails,
    setPredictions,
  }
}

export { usePlaceSearch }
