import { create } from 'zustand'

import { defaultCenter } from '@/utils/map-center'

interface MarkerType extends google.maps.LatLngLiteral {
  name?: string
  message?: string
}

interface CameraState {
  center?: LocationType
  zoom?: number
}

interface MapState {
  center: LocationType
  markers: MarkerType[]
  zoom: number
  setCenter: (center: LocationType) => void
  setZoom: (zoom: number) => void
  setCameraState: (camera: CameraState) => void
  setMarkers: (markers: MarkerType[]) => void
  setMarker: (marker: MarkerType) => void
  addMarker: (marker: MarkerType) => void
  addMarkers: (markers: MarkerType[]) => void
  clearMarkers: () => void
}

export const useMapStore = create<MapState>(set => ({
  center: defaultCenter,
  zoom: 17,
  markers: [],
  setCenter: center => set({ center }),
  setZoom: zoom => set({ zoom }),
  setCameraState: camera => set(state => ({ ...state, ...camera })),
  setMarkers: markers => set({ markers }),
  setMarker: marker => set({ markers: [marker] }),
  addMarker: marker => set(state => ({ markers: [...state.markers, marker] })),
  addMarkers: markers => set(state => ({ markers: [...state.markers, ...markers] })),
  clearMarkers: () => set({ markers: [] }),
}))

export type { CameraState, MarkerType }
