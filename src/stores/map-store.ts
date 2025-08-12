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
  location: LocationType
  markers: MarkerType[]
  zoom: number
  setCenter: (center: LocationType) => void
  setLocation: (location: LocationType) => void
  setZoom: (zoom: number) => void
  setCameraState: (camera: CameraState) => void
  setMarkers: (markers: MarkerType[]) => void
  setMarker: (marker: MarkerType) => void
  addMarker: (marker: MarkerType) => void
  addMarkers: (markers: MarkerType[]) => void
  removeMarker: (marker: MarkerType) => void
  clearMarkers: () => void
}

function addMarker(state: MapState, marker: MarkerType) {
  const isDuplicate = state.markers.find(m => m.name === marker.name && m.lat === marker.lat && m.lng === marker.lng)
  if (isDuplicate) return state.markers

  return [...state.markers, marker]
}

export const useMapStore = create<MapState>(set => ({
  center: defaultCenter,
  location: defaultCenter,
  zoom: 17,
  markers: [],
  setCenter: center => set({ center }),
  setLocation: location => set({ location }),
  setZoom: zoom => set({ zoom }),
  setCameraState: camera => set(state => ({ ...state, ...camera })),
  setMarkers: markers => set({ markers }),
  setMarker: marker => set({ markers: [marker] }),
  addMarker: marker => set(state => ({ markers: addMarker(state, marker) })),
  addMarkers: markers => set(state => ({ markers: [...state.markers, ...markers] })),
  removeMarker: marker => set(state => ({ markers: state.markers.filter(m => m !== marker) })),
  clearMarkers: () => set({ markers: [] }),
}))

export type { CameraState, MarkerType }
