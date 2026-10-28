---
title: Card API (internal)
linktitle: 🔶 Card
summary: Internal API which defines the elements shared between the reader layer and the card layer.
type: book
weight: 3
toc: true
---

{{% callout note %}}
Latest version **`{{% card-api-version %}}`**
<span class="component-metadata">{{< icon name="book" pack="fas" >}} [Specification](https://docs.terminal-api.calypsonet.org/card/)</span>
<span class="component-metadata">{{< icon name="github" pack="fab" >}} [GitHub repository](https://github.com/calypsonet/calypsonet-terminal-card-api-spec/)</span>
{{% /callout %}}

As part of the **Reader Layer**, the **Card API** defines the internal elements shared by the reader layer with
the card layers built on top of it, such as the Calypso card layer.

The complete, versioned reference — types, operations, behaviour, diagrams and constraints — is maintained in the
[**Card API specification**](https://docs.terminal-api.calypsonet.org/card/). This page is only a short overview.

<br>

## What it provides

- **APDU exchanges** — requests and responses are carried by data types (`ApduRequest`, `ApduResponse`,
  `CardRequest`, `CardResponse`) and transmitted through the `ProxyReaderApi`.

- **APDU construction rules** — the constraints a card extension must respect when building its APDUs are
  normative.

- **Limitations and constraints** — the commands the API never transmits, and the status words the reader layer
  handles itself, are listed in the specification.

- **Execution-time control** — each exchange may carry a maximum duration and report its effective duration, which
  is the basis of the timing countermeasures against relay and card emulation.

<br>

## Learn more

→ [Read the full Card API specification](https://docs.terminal-api.calypsonet.org/card/)
