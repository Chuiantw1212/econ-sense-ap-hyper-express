# 商業邏輯層

原本這邊應該是放不對外公開的商業邏輯，演算法什麼的，但是因為我的商業邏輯(個人理財)，本身是公開資訊，也無需透過伺服器運算，所以全部放在前端，這也是為什麼這個資料夾是空的。

# Uncle Bob 原文
Entities encapsulate Enterprise wide business rules. An entity can be an object with methods, or it can be a set of data structures and functions. It doesn’t matter so long as the entities could be used by many different applications in the enterprise.

If you don’t have an enterprise, and are just writing a single application, then these entities are the business objects of the application. They encapsulate the most general and high-level rules. They are the least likely to change when something external changes. For example, you would not expect these objects to be affected by a change to page navigation, or security. No operational change to any particular application should affect the entity layer.