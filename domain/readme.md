# domain

## Clean Architecture 整潔的軟體設計與架構篇

1. 不是越細越好
2. 和能不能拉出來佈署跟獨立運作未必有關係

## Clean Architecture 在整潔的架構上弄髒你的手

在這邊操作操作model(DB)以及adapter(外部系統)，按照書上services以及models會是兩個資料夾，但我認為目前資料夾這樣命名有同樣的效果，而且更好維護。
個人懷疑這裡的services以及models才是Uncle Bob所意思表示的Use Cases，
而非"Use Cases"由interface定義，service進行實作，但這樣做還可以理解是便利於區分，有應用到model就在service中組裝model，有應用到外部系統就在service中組裝adapter，如果沒有就單純service也可以。

## DDD

這邊的models可以改名為repository，功能相同。

## Clean Architecture 英文原文

無提及。
