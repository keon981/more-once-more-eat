const mapApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE'

const defaultCenter = {
  lat: 24.1821746,
  lng: 120.6591376,
}

export { defaultCenter, mapApiKey }
