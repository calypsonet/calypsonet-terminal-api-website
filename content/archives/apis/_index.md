---
title: == APIs 1.x ==
linktitle: == APIs 1.x ==
type: book
toc: false
private: true
---

{{% callout warning %}}
Version 1.0 of the documentation is no longer actively maintained. 
The site that you are currently viewing is an archived snapshot. 
For up-to-date documentation, see the latest version.
{{% /callout %}}

The diagram below shows the dependencies between the client application, the certifiable framework components and the 
terminal APIs:

{{< figure src="/media/archives/specifications/apis_dependencies_overview.drawio.svg" caption="" numbered="" >}}

Here are the most important things to remember:
* Each API has its **own life cycle**.
* The APIs contain **only interfaces**.
* The "Reader API", the "Calypso API" and the "Calypso Legacy SAM API" are **public** and can be used by the developer 
  of the client application.
* The "Card API" is **internal** and is intended for the developer of the certifiable framework components only.
