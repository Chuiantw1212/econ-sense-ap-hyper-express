# domain

## Clean Architecture 整潔的軟體設計與架構篇

1. 不是越細越好
2. 和能不能拉出來佈署跟獨立運作未必有關係

## Clean Architecture 在整潔的架構上弄髒你的手

主張service的拆分與細緻化，比較好找。但我並不完全認同這樣的理念，因為這樣子做，取而代之的是組裝service的複雜度。但我倒是認同service拆分避免了service之間耦合的狀況，可以更輕易的搬動業務邏輯。

這裡的services實作了Uncle Bob所意思表示的Use Case Interactor。在這邊操作操作model(DB)以及adapter(外部系統)，按照書上services以及models會是兩個資料夾，但我認為目前資料夾這樣命名有同樣的效果，而且更好維護。

Use Case的部分我整個拿掉了，目前看不出來使用Use Cases的好處。

## DDD

這邊的models可以改名為repository，功能相同。

## Clean Architecture 英文原文

無提及。
