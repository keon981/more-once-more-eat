import { beforeEach, describe, expect, it } from 'vitest'

import { useMapStore } from '../map-store'
import { defaultCenter } from '@/utils/map-center'

describe('mapStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useMapStore.setState({
      center: defaultCenter,
      markers: [],
    })
  })

  it('should initialize with default values', () => {
    const { center, markers } = useMapStore.getState()

    expect(center).toEqual(defaultCenter)
    expect(markers).toEqual([])
  })

  it('should update center', () => {
    const newCenter = { lat: 25.0330, lng: 121.5654 }

    useMapStore.getState().setCenter(newCenter)

    const { center } = useMapStore.getState()
    expect(center).toEqual(newCenter)
  })

  it('should add marker', () => {
    const marker = { lat: 25.0330, lng: 121.5654 }

    useMapStore.getState().addMarker(marker)

    const { markers } = useMapStore.getState()
    expect(markers).toEqual([marker])
  })

  it('should add multiple markers', () => {
    const marker1 = { lat: 25.0330, lng: 121.5654 }
    const marker2 = { lat: 24.1821746, lng: 120.6591376 }

    useMapStore.getState().addMarker(marker1)
    useMapStore.getState().addMarker(marker2)

    const { markers } = useMapStore.getState()
    expect(markers).toEqual([marker1, marker2])
  })

  it('should replace marker when setting new one', () => {
    const marker1 = { lat: 25.0330, lng: 121.5654 }
    const marker2 = { lat: 24.1821746, lng: 120.6591376 }

    useMapStore.getState().setMarker(marker1)
    useMapStore.getState().setMarker(marker2)

    const { markers } = useMapStore.getState()
    expect(markers).toEqual([marker2])
  })

  it('should set multiple markers', () => {
    const newMarkers = [
      { lat: 25.0330, lng: 121.5654 },
      { lat: 24.1821746, lng: 120.6591376 },
    ]

    useMapStore.getState().setMarkers(newMarkers)

    const { markers } = useMapStore.getState()
    expect(markers).toEqual(newMarkers)
  })

  it('should clear markers', () => {
    const marker = { lat: 25.0330, lng: 121.5654 }

    useMapStore.getState().addMarker(marker)
    useMapStore.getState().clearMarkers()

    const { markers } = useMapStore.getState()
    expect(markers).toEqual([])
  })
})
