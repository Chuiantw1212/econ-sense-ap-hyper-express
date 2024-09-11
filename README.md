# 常識經濟學的 AP Server

這是常識經濟學的 AP Server，主要開源希望能做為參考讓有需要的工程師可以學到模組的用法。

## 性能測試報告

這次性能測試報告顯示出明顯的效能優勢，可以簡單描述為：「Hyper-Express 是 JavaScript 的皮、C++ 的骨」。這表示 Hyper-express 雖然是用 JavaScript 編寫的框架，但其內部的性能表現，得益於 C++ 的底層優化，展現出更高的執行效率和穩定性。

### 框架效能比較

| 框架              | 語言                | 每秒請求數  | 延遲（Latency） | 吞吐量（Bytes/Sec）  | 適合場景                          |
| ----------------- | ------------------- | ---------- | --------------- | ------------------- | --------------------------------- |
| **Hyper-Express**  | Node.js             | ~93,000    | 115 ms          | 29.9 MB/s            | 高併發、I/O 密集型應用             |
| **ASP.NET Core**   | C#                  | ~85,000    | 80 ms           | 28.0 MB/s            | 微服務架構、企業應用，與 .NET 整合  |
| **Vert.x**         | Java                | ~85,000    | 90 ms           | 28.7 MB/s            | 高效處理並發的分散式系統           |
| **FastAPI**        | Python (Starlette)  | ~50,000    | 160 ms          | 18.0 MB/s            | 快速開發、API 驅動應用             |
         |

### 評語

**Hyper-Express** 的高效能主要來自於它建立在 [**uWebSocket**](https://github.com/uNetworking/uWebSockets) 之上。**uWebSocket** 是一個以 C++ 編寫的超高效能 HTTP 和 WebSocket 庫，專門針對極低延遲和高併發進行優化。由於 **uWebSocket** 本身使用了 C 語言 和 C++，它能夠在非常低的層級操作網路請求，並充分利用現代 CPU 的性能，達到極高的效率。

整體來看，**Hyper-Express** 在處理高併發和 I/O 密集型任務時表現出色，與其他常見的伺服器框架相比，它具有更低的延遲和更高的每秒請求處理能力，是構建高效能應用的理想選擇。

## Clean Architecture

這個專案符合 Uncle Bob 的 [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)，因為它將系統分為清楚的層次：

1. **實體層 (Entities Layer)**：負責定義跨專案的核心商業規則，比如檢查用戶是否為公司員工，但由於本專案並沒有跨專案的商業邏輯，因此這個資料夾目前是空的。
2. **用例層 (Use Case Layer)**：負責具體的商業邏輯操作，比如檢查用戶是否有登入本應用的權限，但由於本專案的商業邏輯大多數放在前端，因此這個資料夾也是空的。
3. **介面適配層 (Interface Adapters Layer)**：把外部的 HTTP 請求或資料庫操作轉換成業務層能處理的資料。
4. **框架與驅動層 (Frameworks & Drivers Layer)**：包含了抓取外部資料的爬蟲、存取 Firestore 的機制，以及套件的管理。

這種分層設計確保了高內聚、低耦合，並且達到框架獨立性和高測試性。

## 核心模組

### Hyper-Express

[Hyper-Express](https://github.com/kartikk221/hyper-express) 是基於 Node.js 平台的高效能 HTTP 伺服器框架，專為高併發和低延遲的應用程式設計。相比傳統的 Express 框架，Hyper-Express 能夠處理更多的請求並降低延遲，這確保了 API 伺服器在處理大量請求時依然能夠保持高效的響應速度，提升整體的使用體驗。

### TypeScript

[TypeScript](https://www.typescriptlang.org/) 是 JavaScript 的強型別超集，為專案提供更好的開發體驗和代碼可靠性。使用 TypeScript 來構建 API 伺服器不僅能減少錯誤，還能提高代碼的可維護性。TypeScript 提供了更強大的編譯期檢查，讓開發者在編譯時就能捕捉潛在的問題，增強代碼的穩定性。

### Firebase

[Firebase](https://firebase.google.com/docs/admin/setup) 作為後端服務，處理即時資料庫、身份驗證和雲端儲存等功能。Firebase 提供了簡化的應用程式開發過程，使得開發者能夠專注於功能而非基礎設施。此 API 伺服器使用 Firebase 管理使用者身份驗證，並儲存和同步部落格的資料，保證資料安全和高效訪問。

### Google Cloud Run

[Google Cloud Run](https://cloud.google.com/run?hl=en) 是無伺服器的平台，讓應用程式可以在 Docker 容器中運行。這個 API 伺服器部署在 Cloud Run 上，享受無伺服器架構的彈性，具備自動擴展和高可用性的特性。無需管理基礎設施，API 可以根據流量需求自動增減實例，確保性能與成本的最佳平衡。

### Google Cloud Secret Manager

[Google Cloud Secret Manager](https://cloud.google.com/security/products/secret-manager?hl=en) 用於安全地儲存和管理敏感的應用程式資料，如 API 金鑰、憑證和環境變數等機密信息。透過此模組，應用程式可以以安全的方式動態讀取這些機密資料，無需將它們硬編碼在代碼中，確保資料的安全性與可控性。此外，Secret Manager 提供了版本控制功能，允許對機密進行更新並回滾至先前版本。

### ChatGpt 故事生成

[ChatGPT](https://www.npmjs.com/package/chatgpt) 故事生成 模組基於 OpenAI 的 GPT 模型，為部落格生成故事內容。該模組利用 ChatGPT 的語言處理能力，根據預設的主題和參數自動生成高品質、富有創意的故事，作為常識經濟學部落格中的一部分內容。這提高了內容創作的效率，並且保持一致性和多樣性。

### Jsdom 爬蟲

[JSDOM](https://github.com/jsdom/jsdom) 是一個模擬瀏覽器 DOM 的 JavaScript 環境，使得我們能夠在伺服器端操作 HTML 文件和執行 DOM 操作。這在需要抓取或解析網頁資料、或是對 HTML 進行動態渲染時特別有用。本 API 伺服器利用 JSDOM 進行資料抓取與處理，為部落格提供必要的資料。

## 開發登入須知

<https://cloud.google.com/docs/authentication/provide-credentials-adc>

```js
gcloud auth application-default login
```