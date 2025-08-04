import { create } from 'zustand'

import { defaultCenter } from '@/utils/map-center'

interface MarkerType extends google.maps.LatLngLiteral {
  name?: string
  message?: string
}

interface MapState {
  center: LocationType
  markers: MarkerType[]
  setCenter: (center: LocationType) => void
  setMarkers: (markers: MarkerType[]) => void
  setMarker: (marker: MarkerType) => void
  addMarker: (marker: MarkerType) => void
  addMarkers: (markers: MarkerType[]) => void
  clearMarkers: () => void
}

export const useMapStore = create<MapState>(set => ({
  center: defaultCenter,
  markers: [],
  setCenter: center => set({ center }),
  setMarkers: markers => set({ markers }),
  setMarker: marker => set({ markers: [marker] }),
  addMarker: marker => set(state => ({ markers: [...state.markers, marker] })),
  addMarkers: markers => set(state => ({ markers: [...state.markers, ...markers] })),
  clearMarkers: () => set({ markers: [] }),
}))

export type { MarkerType }
