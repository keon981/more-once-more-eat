import { create } from 'zustand'

import { defaultCenter } from '@/utils/map-center'

interface MapState {
  center: LocationType
  markers: google.maps.LatLngLiteral[]
  setCenter: (center: LocationType) => void
  setMarkers: (markers: google.maps.LatLngLiteral[]) => void
  setMarker: (marker: google.maps.LatLngLiteral) => void
  addMarker: (marker: google.maps.LatLngLiteral) => void
  addMarkers: (markers: google.maps.LatLngLiteral[]) => void
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
