# React + TypeScript + Vite@6 模板

> 本模板提供一個簡約的設定，使 React 能在 Vite 中運行，並支援熱模組更新（HMR）及部分 ESLint 規則檢查。

## 需求

* NodeJS v20+
* pnpm v9+

## 概述

- [⚡️](https://vitejs.dev/)**[Vite 5](https://github.com/vitejs/vite)**：用於專案構建及啟動開發伺服器
  * **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)**：利用 SWC 提供 Fast Refresh 支援
- **[⚛️](https://reactjs.org/)[React 19](https://react.dev/) 與 [TypeScript](https://www.typescriptlang.org/)**
  * RTK Query：用於進行 HTTP 請求
- 🏄 **[React-router 6](https://reactrouter.com/docs/en/v6/getting-started/overview)**：為各種規模的 React 應用程式提供聲明式路由
- **[shadcn/ui](https://ui.shadcn.com)**：提供 React 使用的 UI 元件

* **[Tailwind CSS](https://tailwindcss.com/)**：用於樣式
* **ESLint v9.5.0+** : 用於程式碼檢查與格式化
  * **[@antfu/eslint-config](https://github.com/antfu/eslint-config/tree/main)** : 本專案基於 `@antfu/eslint-config` 設定進行 ESLint 配置，以確保程式碼風格與最佳實踐的一致性。
  * **[vite-plugin-eslint](https://www.npmjs.com/package/vite-plugin-eslint)**：將 ESLint 整合至 Vite 的建構流程中，即時執行程式碼檢查

- **Vitest**：用於單元測試
  * React Testing Library：一個輕量且最佳實踐的 React 元件測試解決方案
  * MSW（Mock Service Worker）：用於 API 模擬

## 快速開始

1. 開始使用非常簡單，只需要 clone 本 repository：
   ```bash
   git clone git@github.com:keon981/vite-tsx-app.git
   ```
2. 進入專案資料夾：
   ```bash
   cd vite-tsx-app
   ```
3. 安裝依賴：
   ```bash
   pnpm install
   ```
4. 刪除 .git 資料夾（以及任何你不需要的檔案、資料夾或相依套件）：
   ```bash
   rm -rf .git
   ```
5. 開啟瀏覽器並訪問 [http://localhost:5173](http://localhost:5173)：
   ```bash
   pnpm dev
   ```

> 如果你希望一次性執行以上所有命令，可使用下列整合命令：

```bash
git clone git@github.com:keon981/vite-tsx-app.git &&\
cd vite-tsx-app &&\
pnpm install &&\
rm -rf .git &&\
pnpm run dev
```

## 測試

單元測試由 React Testing Library 與 Vitest 執行，而端對端（E2E）測試則採用 Playwright 進行。

若要執行所有測試（包括單元測試及 E2E 測試），請運行以下命令：

```bash
pnpm run test
```

### 單元測試

在執行單元測試時，預設情況下測試檔會與原始檔案一起放置。請參考 src/components 內的 README 文件了解示例。

若僅想運行單元測試，可使用下面命令：

```bash
pnpm run test:unit
```

如果你需要生成測試覆蓋率報告，請運行：

```bash
pnpm run coverage
```
