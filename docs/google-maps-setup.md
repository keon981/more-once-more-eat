# Google Maps 設定指南

## 快速開始

### 1. 取得 Google Maps API Key

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 建立新專案或選擇現有專案
3. 啟用 Maps JavaScript API
4. 建立 API 金鑰
5. 設定 API 金鑰的限制（建議限制網域）

### 2. 設定環境變數

1. 複製 `.env.example` 檔案並重新命名為 `.env`
2. 將您的 API 金鑰填入：

```bash
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

### 3. 啟動開發伺服器

```bash
npm run dev
```

## 組件說明

### GoogleMapComponent (基本組件)

基本的 Google Maps 組件，包含以下功能：
- 顯示地圖
- 新增標記
- 點擊事件處理
- 自訂中心點和縮放等級

#### 使用範例

```tsx
import GoogleMapComponent from './components/GoogleMap'

const MyComponent = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  
  return (
    <GoogleMapComponent
      apiKey={apiKey}
      center={{ lat: 25.0330, lng: 121.5654 }}
      zoom={12}
      height="500px"
      markers={[
        { lat: 25.0330, lng: 121.5654 },
        { lat: 25.0478, lng: 121.5318 }
      ]}
      onMapClick={(event) => {
        console.log('Map clicked:', event.latLng)
      }}
    />
  )
}
```

### AdvancedGoogleMap (進階組件)

進階的 Google Maps 組件，包含更多功能：
- 標記與資訊視窗
- 圓形、多邊形、路線繪製
- 自訂地圖控制項
- 標記點擊事件

#### 使用範例

```tsx
import AdvancedGoogleMap from './components/AdvancedGoogleMap'

const markers = [
  {
    id: '1',
    position: { lat: 25.0330, lng: 121.5654 },
    title: 'Taipei 101',
    description: '台北最著名的地標建築'
  }
]

const MyAdvancedComponent = () => {
  return (
    <AdvancedGoogleMap
      apiKey={apiKey}
      markers={markers}
      showCircle={true}
      showPolygon={true}
      showPolyline={true}
      onMarkerClick={(marker) => {
        console.log('Marker clicked:', marker)
      }}
    />
  )
}
```

## 功能特色

### 基本功能
- ✅ 地圖顯示
- ✅ 標記新增/移除
- ✅ 地圖點擊事件
- ✅ 自訂樣式

### 進階功能
- ✅ 資訊視窗 (InfoWindow)
- ✅ 圓形區域 (Circle)
- ✅ 多邊形區域 (Polygon)
- ✅ 路線軌跡 (Polyline)
- ✅ 地圖控制項
- ✅ 標記互動

## API 參考

### GoogleMapComponent Props

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| apiKey | string | - | Google Maps API 金鑰 |
| center | LatLngLiteral | Taipei | 地圖中心點 |
| zoom | number | 10 | 縮放等級 |
| height | string | '400px' | 地圖高度 |
| width | string | '100%' | 地圖寬度 |
| markers | LatLngLiteral[] | [] | 標記陣列 |
| onMapClick | function | - | 地圖點擊回調 |

### AdvancedGoogleMap Props

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| apiKey | string | - | Google Maps API 金鑰 |
| center | LatLngLiteral | Taipei | 地圖中心點 |
| zoom | number | 12 | 縮放等級 |
| height | string | '500px' | 地圖高度 |
| width | string | '100%' | 地圖寬度 |
| markers | MarkerData[] | [] | 標記資料陣列 |
| showCircle | boolean | false | 顯示圓形 |
| showPolygon | boolean | false | 顯示多邊形 |
| showPolyline | boolean | false | 顯示路線 |
| onMapClick | function | - | 地圖點擊回調 |
| onMarkerClick | function | - | 標記點擊回調 |

## 常見問題

### Q: 地圖無法顯示？
A: 請檢查：
1. API 金鑰是否正確設定
2. Maps JavaScript API 是否已啟用
3. 網域限制是否正確設定

### Q: 如何自訂地圖樣式？
A: 可以在 GoogleMap 組件的 options 屬性中設定：

```tsx
<GoogleMap
  options={{
    styles: [
      // 自訂地圖樣式
    ]
  }}
/>
```

### Q: 如何新增更多地圖控制項？
A: 在 options 中設定：

```tsx
<GoogleMap
  options={{
    zoomControl: true,
    streetViewControl: true,
    mapTypeControl: true,
    fullscreenControl: true
  }}
/>
```

## 相關資源

- [Google Maps JavaScript API 文件](https://developers.google.com/maps/documentation/javascript)
- [@react-google-maps/api 文件](https://react-google-maps-api-docs.netlify.app/)
- [Google Cloud Console](https://console.cloud.google.com/)
