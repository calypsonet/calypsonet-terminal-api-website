---
title: Terminal architecture - APIs & software layers
linktitle: Overview
summary: General presentation of the dependencies between the different Terminal APIs.
type: book
toc: false
---

---
The diagram below shows the dependencies between the client application, the certifiable framework components and the 
terminal APIs:

{{< figure src="/media/uml/apis_dependencies_overview.drawio.svg" caption="" numbered="" >}}

Here are the most important things to remember:
* Each API has its **own life cycle**.
* The APIs contain **only interfaces**.
* The "Reader API", the "Calypso API" and the "Calypso Legacy SAM API" are **public** and can be used by the developer 
  of the client application.
* The "Card API" is **internal** and is intended for the developer of the certifiable framework components only.
