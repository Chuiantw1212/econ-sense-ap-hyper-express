# 其他東西
這邊Uncle Bob並沒有做其他定義。簡單說就是排除掉以下的其他內容
1. 資料交換與格式轉換
1. 企業層級商業邏輯
1. 專案層級與資料夾專屬商業邏輯

# 架構說明
個人並不追求完美解耦合，避免為抽象而抽象或是過度設計，造成維護成本不減反升。

1. interfaces: 就......interfaces
2. models: 針對"firebase collestion"以及對外的"爬蟲"封裝
3. plugins: 針對"套件"封裝


# Frameworks and Drivers.
The outermost layer is generally composed of frameworks and tools such as the Database, the Web Framework, etc. Generally you don’t write much code in this layer other than glue code that communicates to the next circle inwards.

This layer is where all the details go. The Web is a detail. The database is a detail. We keep these things on the outside where they can do little harm.