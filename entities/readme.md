# Entities

## Clean Architecture 整潔的軟體設計與架構篇

企業層級，跨專案的商業邏輯、演算法什麼的，比如說用戶權限管理。但是因為我的專案就這麼一個，所以這只放商業用途的物件。
商業邏輯不動，物件本身就不動。

按照乾淨架構，當我這個層級並非為企業服務而是單一應用時，這裡放商業物件。以個人理財為例，就是個人理財的"規劃"。並且把相關interface一起放在這裡也合理。
個人理解是最不該變動的部分，或說變更成本最高的東西。

## Clean Architecture 在整潔的架構上弄髒你的手

與前面所述差異不大。

## Clean Architecture 英文原文

Entities encapsulate Enterprise wide business rules. An entity can be an object with methods, or it can be a set of data structures and functions. It doesn’t matter so long as the entities could be used by many different applications in the enterprise.

If you don’t have an enterprise, and are just writing a single application, then these entities are the business objects of the application. They encapsulate the most general and high-level rules. They are the least likely to change when something external changes. For example, you would not expect these objects to be affected by a change to page navigation, or security. No operational change to any particular application should affect the entity layer.
