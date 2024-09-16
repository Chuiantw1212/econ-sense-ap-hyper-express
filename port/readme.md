# Application Business Rules

## Clean Architecture 整潔的軟體設計與架構篇

按照架構圖，這邊應該要包含 Use Case Input Port / Use Case Interactor / Use Case output port
並且不僅僅是interface，而是包含了所有系統中的使用案例(use cases)

## Clean Architecture 在整潔的架構上弄髒你的手

但是在實作篇，這邊僅放interface，實作交給了services/adapters。

## Clean Architecture 英文原文

The software in this layer contains application specific business rules. It encapsulates and implements all of the use cases of the system. These use cases orchestrate the flow of data to and from the entities, and direct those entities to use their enterprise wide business rules to achieve the goals of the use case.

We do not expect changes in this layer to affect the entities. We also do not expect this layer to be affected by changes to externalities such as the database, the UI, or any of the common frameworks. This layer is isolated from such concerns.

We do, however, expect that changes to the operation of the application will affect the use-cases and therefore the software in this layer. If the details of a use-case change, then some code in this layer will certainly be affected.
