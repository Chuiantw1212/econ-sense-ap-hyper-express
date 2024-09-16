# Interface Adapters

## Clean Architecture 整潔的軟體設計與架構篇

可能的資料夾名稱有 controllers/gateways/presenters。

## Clean Architecture 在整潔的架構上弄髒你的手

使用in、out、port這些六角形架構的術語，但這樣的命名法則有時不太可行，比如開發socket，場景容易出現on以及emit放在附近實作，這時的命名是否要堅持out, in就可以再斟酌。我個人就命名的很隨意，意思差不多有到就好。

## Middleware

避免過度設計，所以並沒有單獨抽出middleware資料夾，本專案唯一應用到middleware的案例放在plan.ctrl.ts

## Clean Architecture 英文原文

The software in this layer is a set of adapters that convert data from the format most convenient for the use cases and entities, to the format most convenient for some external agency such as the Database or the Web. It is this layer, for example, that will wholly contain the MVC architecture of a GUI. The Presenters, Views, and Controllers all belong in here. The models are likely just data structures that are passed from the controllers to the use cases, and then back from the use cases to the presenters and views.

Similarly, data is converted, in this layer, from the form most convenient for entities and use cases, into the form most convenient for whatever persistence framework is being used. i.e. The Database. No code inward of this circle should know anything at all about the database. If the database is a SQL database, then all the SQL should be restricted to this layer, and in particular to the parts of this layer that have to do with the database.

Also in this layer is any other adapter necessary to convert data from some external form, such as an external service, to the internal form used by the use cases and entities.
