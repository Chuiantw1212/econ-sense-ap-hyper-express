# 常識經濟學的 AP Server

這是常識經濟學的 AP Server，主要開源希望能做為參考讓有需要的工程師可以學到模組的用法。

## 開發登入須知

<https://cloud.google.com/docs/authentication/provide-credentials-adc>

```js
gcloud auth application-default login
```

## 核心模組

### Hyper-Express

Hyper-Express 是基於 Node.js 平台的高效能 HTTP 伺服器框架，專為高併發和低延遲的應用程式設計。相比傳統的 Express 框架，Hyper-Express 能夠處理更多的請求並降低延遲，這確保了 API 伺服器在處理大量請求時依然能夠保持高效的響應速度，提升整體的使用體驗。

更多信息請參考 [Hyper-Express 的 GitHub 頁面](https://github.com/kartikk221/hyper-express)。

### TypeScript

TypeScript 是 JavaScript 的強型別超集，為專案提供更好的開發體驗和代碼可靠性。使用 TypeScript 來構建 API 伺服器不僅能減少錯誤，還能提高代碼的可維護性。TypeScript 提供了更強大的編譯期檢查，讓開發者在編譯時就能捕捉潛在的問題，增強代碼的穩定性。

### Firebase

Firebase 作為後端服務，處理即時資料庫、身份驗證和雲端儲存等功能。Firebase 提供了簡化的應用程式開發過程，使得開發者能夠專注於功能而非基礎設施。此 API 伺服器使用 Firebase 管理使用者身份驗證，並儲存和同步部落格的資料，保證資料安全和高效訪問。

### Google Cloud Run

Google Cloud Run 是無伺服器的平台，讓應用程式可以在 Docker 容器中運行。這個 API 伺服器部署在 Cloud Run 上，享受無伺服器架構的彈性，具備自動擴展和高可用性的特性。無需管理基礎設施，API 可以根據流量需求自動增減實例，確保性能與成本的最佳平衡。

### Google Cloud Secret Manager

Google Cloud Secret Manager 用於安全地儲存和管理敏感的應用程式資料，如 API 金鑰、憑證和環境變數等機密信息。透過此模組，應用程式可以以安全的方式動態讀取這些機密資料，無需將它們硬編碼在代碼中，確保資料的安全性與可控性。此外，Secret Manager 提供了版本控制功能，允許對機密進行更新並回滾至先前版本。

### ChatGpt 故事生成

ChatGPT 故事生成 模組基於 OpenAI 的 GPT 模型，為部落格生成故事內容。該模組利用 ChatGPT 的語言處理能力，根據預設的主題和參數自動生成高品質、富有創意的故事，作為常識經濟學部落格中的一部分內容。這提高了內容創作的效率，並且保持一致性和多樣性。

### Jsdom 爬蟲

JSDOM 是一個模擬瀏覽器 DOM 的 JavaScript 環境，使得我們能夠在伺服器端操作 HTML 文件和執行 DOM 操作。這在需要抓取或解析網頁資料、或是對 HTML 進行動態渲染時特別有用。本 API 伺服器利用 JSDOM 進行資料抓取與處理，為部落格提供必要的資料。

## 社群貢獻

這些技術組件的結合，將為部落格帶來更好的性能、可擴展性和開發效率，同時也為 JavaScript 工程師提供了一個學習和觀摩的機會。
