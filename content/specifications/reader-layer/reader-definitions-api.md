---
title: Reader Definitions API (external)
linktitle: 🟢 Reader Definitions
summary: Public foundation API which hosts the cross-cutting definitions shared by the terminal APIs.
type: book
weight: 2
toc: true
---

{{% callout note %}}
Latest version **`{{% reader-definitions-api-version %}}`**
<span class="component-metadata">{{< icon name="book" pack="fas" >}} [Specification](https://docs.terminal-api.calypsonet.org/reader-definitions/)</span>
<span class="component-metadata">{{< icon name="github" pack="fab" >}} [GitHub repository](https://github.com/calypsonet/calypsonet-terminal-reader-definitions-api-spec/)</span>
{{% /callout %}}

As part of the **Reader Layer**, the **Reader Definitions API** is a foundation module: it exposes neither
service interface nor SPI, only the definitions that the other terminal APIs share.

The complete, versioned reference — types, operations, behaviour, diagrams and constraints — is maintained in the
[**Reader Definitions API specification**](https://docs.terminal-api.calypsonet.org/reader-definitions/). This page is only a short overview.

<br>

## What it provides

- **Radio-frequency technologies** — the `RfTechnology` enumeration declares the technologies a contactless
  reader activates during polling, including the mechanism required on iPhone.

- **Card types** — the `CardType` enumeration characterises a card as it was detected, combining the
  transport-protocol level and, where applicable, the product identity.

- **A stable dependency** — hosting these definitions in their own module lets them evolve, and be reused, without
  depending on the full Reader API.

<br>

## Learn more

→ [Read the full Reader Definitions API specification](https://docs.terminal-api.calypsonet.org/reader-definitions/)
