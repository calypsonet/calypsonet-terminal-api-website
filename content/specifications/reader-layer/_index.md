---
title: Reader Layer Specification
linktitle: Reader Layer
type: book
toc: false
weight: 10
---

<br>

The diagram below shows the dependencies between the client application, the certifiable framework components and the 
terminal APIs:

{{< figure src="/media/specifications/reader_layer_apis_dependencies_overview.drawio.svg" caption="" numbered="" >}}

Key points:
* **Independent Lifecycle:** Each API follows its own distinct lifecycle.
* **Interface-Exclusive:** APIs exclusively consist of interfaces.
* **Public APIs:** Some APIs are intended to be used by application developers.
* **Internal Usage:** Some APIs are dedicated to internal use, and intended to developers of specific implementations.