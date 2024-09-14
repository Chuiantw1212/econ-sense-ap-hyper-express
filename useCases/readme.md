# 商業邏輯層

個人理財的商業邏輯不是什麼機密，網路上都找得到，也沒有理由透過ap運算，所以我放[前端](https://github.com/Chuiantw1212/econ-sense-vitepress/tree/econ-sense-vite-press/components/calculator)去了，這也是為什麼這個資料夾是空的。

按照 Clean Architecture 架構圖，
這邊應該要包含 Use Case Input Port / Use Case Interactor / Use Case output port

簡而言之就是各種Interface

# Use Cases / Domain Services / Repository / Interface

The software in this layer contains application specific business rules. It encapsulates and implements all of the use cases of the system. These use cases orchestrate the flow of data to and from the entities, and direct those entities to use their enterprise wide business rules to achieve the goals of the use case.

We do not expect changes in this layer to affect the entities. We also do not expect this layer to be affected by changes to externalities such as the database, the UI, or any of the common frameworks. This layer is isolated from such concerns.

We do, however, expect that changes to the operation of the application will affect the use-cases and therefore the software in this layer. If the details of a use-case change, then some code in this layer will certainly be affected.