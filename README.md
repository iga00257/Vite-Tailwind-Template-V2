# TutorDraw Frontend

基於 Vite + React 的互動式白板應用前端專案，整合了現代前端開發所需的各種工具和最佳實踐。

## 技術架構

- **框架**: React 18.2.0 + Vite 5.2.0
- **程式語言**: TypeScript
- **套件管理**: pnpm 9.14.2
- **樣式**: TailwindCSS
- **多國語系**: i18next
- **程式碼規範**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **狀態管理**: Jotai
- **API 整合**: TanStack Query (React Query)

## 專案說明

- 🎨 互動式白板功能

  - 支援多種繪圖工具（鉛筆、直線、矩形、橢圓等）
  - 支援檔案上傳（圖片、PDF）
  - 支援畫布縮放和存儲
  - 支援橡皮擦功能

- 🌐 多語系支援

  - 支援多語言切換（zh-TW、en）
  - i18next 整合
  - 瀏覽器語系偵測

- 🎨 樣式解決方案

  - TailwindCSS 工具類優先
  - 響應式設計
  - 深色模式支援
  - 自定義字體和顏色系統

- 📦 資源最佳化

  - SVG 元件化支援
  - 靜態資源最佳化
  - 字型最佳化

- 🛠 開發工具鏈

  - TypeScript 型別檢查
  - ESLint 程式碼檢查
  - Prettier 程式碼格式化
  - Husky Git hooks
  - lint-staged 提交檢查
  - Vitest 單元測試

- 💻 VSCode 擴展支援
  - ESLint 即時程式碼檢查
  - Prettier 自動格式化
  - i18n-ally 多語系開發
  - Tailwind CSS IntelliSense
  - Code Spell Checker 拼寫檢查

## 目錄結構

```
src/
├── api/          # API 相關服務
├── assets/       # 靜態資源
├── components/   # React 元件
│   ├── shared/   # 共用元件
│   └── ...       # 其他功能元件
├── constants/    # 常數定義
├── hooks/        # 自定義 Hooks
├── i18n/         # 多語系設定
│   └── locales/  # 翻譯檔案
├── pages/        # 頁面元件
├── styles/       # 全域樣式
├── types/        # TypeScript 型別定義
└── utils/        # 通用工具函式
```

## 開發指南

### 環境需求

- Node.js >= 20.15.0
- pnpm >= 9.14.2

### 安裝套件

```bash
pnpm install
```

### 開發伺服器

```bash
pnpm dev
```

### 建置正式版本

```bash
pnpm build
```

### 程式碼檢查

```bash
# ESLint 檢查
pnpm lint

# Prettier 格式化
pnpm prettier

# 修復 ESLint 問題
pnpm lint:fix
```

### 執行測試

```bash
# 執行測試
pnpm test

# 檢視測試覆蓋率
pnpm coverage
```

## 多國語系

專案使用 i18next 進行多國語系管理：

- 翻譯檔案位於 `src/i18n/locales/`
- 支援的語系：zh-TW、en
- 使用 i18next-browser-languagedetector 自動偵測瀏覽器語系

## Git 提交規範

使用 conventional commits 規範：

- feat: 新功能
- fix: 錯誤修復
- docs: 文件更新
- style: 程式碼格式（不影響程式碼運行的變動）
- refactor: 重構
- test: 測試相關
- chore: 建置過程或輔助工具的變動
- perf: 效能優化
- revert: 回復先前的提交

## 環境變數

- `VITE_DEPLOY_ENV`: 部署環境（development/production）

## 注意事項

- 確保使用正確的 Node.js 版本（建議使用 nvm）
- 遵循程式碼規範和提交規範
- 保持翻譯檔案的同步更新
- 開發新功能時需添加對應的單元測試
- 提交前確保所有測試通過
