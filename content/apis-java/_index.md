---
title: Java - APIs overview
linktitle: Overview
summary: General presentation of the dependencies between the different Terminal APIs.
type: book
toc: false
---

---
The diagram below shows the dependencies between the client application, the certifiable framework components and the terminal APIs:

{{< figure src="/media/uml/apis_dependencies_overview.svg" caption="" numbered="" >}}

Here are the most important things to remember:
* Each API has its **own life cycle**.
* The APIs contain **only interfaces**.
* The "Reader API" and the "Calypso API" are **public** while the "Card API" is **internal**.
* The **public APIs** can be used by the developer of the client application.
* The **internal API** is intended for the developer of the certifiable framework components only. 
