---
title: Ticketing Terminal APIs Specifications
linktitle: Specifications overview
type: book
weight: 5
toc: false
---

## Dedicated interfaces by software layer

Two levels of APIs are provided to interact with either the Reader or the Calypso layers, from the lowest to the
highest:

- At the bottom, the [Reader Layer]({{< ref "specifications/reader-layer" >}}) generic interfaces:
    - [Reader API]({{< ref "specifications/reader-layer/reader-api" >}}): Controls any reader solution and manages application selection on a smart card.
    - [Reader Definitions API]({{< ref "specifications/reader-layer/reader-definitions-api" >}}): Hosts the cross-cutting definitions shared by the terminal APIs, such as the radio-frequency technologies and the card types.
    - [Card API]({{< ref "specifications/reader-layer/card-api" >}}): Interfaces a card processing library specific to a given smart card solution.
- Above, the **Smart Card Solution Layer** specific interfaces:
    - several interfaces to integrate [Calypso processing]({{< ref "specifications/calypso-layer" >}}) support:
        - [Calypso Card API]({{< ref "specifications/calypso-layer/calypso-card-api" >}}) 
          and [Legacy SAM API]({{< ref "specifications/calypso-layer/calypso-legacysam-api" >}}): Performs secure transactions 
          with Calypso cards or with Calypso security modules such as SAM-S1 or SAM-C1.
        - [Symmetric Crypto API]({{< ref "specifications/calypso-layer/calypso-symmetric-crypto-api" >}}) 
          and [Asymmetric Crypto API]({{< ref "specifications/calypso-layer/calypso-asymmetric-crypto-api" >}}): Interfaces
          Calypso SAM or Calypso PKI processing libraries.
    - an interface to integrate [storage card processing]({{< ref "specifications/card-layer-storagecard" >}}) support:
      - [Storage Card API]({{< ref "specifications/card-layer-storagecard/storagecard-api" >}}): Performs transactions
          with storage cards.
    - a low-level interface to integrate [generic card processing]({{< ref "specifications/card-layer-genericcard" >}}) support:
      - [Generic Card API]({{< ref "specifications/card-layer-genericcard/genericcard-api" >}}): Performs transactions
          with any type of card.

## Dedicated interfaces according to development targets

The ticketing terminal APIs are differentiated according to development goals:
- in **green** 🟢, high-level public reader and Calypso APIs dedicated to the design of applications on ticketing terminals.
- in **orange** 🔶, internal APIs dedicated to the design of middleware for smart card solutions (Calypso or others).

## API element visual status

The elements of an API are displayed with a colour code — grey, blue, red struck through — whose meaning is given by
the **legend of the UML class diagram**, next to the diagram itself in each specification.

Two rules are worth remembering:

- **Grayed-out elements**, shown as *work in progress* in the legend, are **not yet officially part of the API**:
  they are under review and may either be formally added or removed in a future version.
- **Actual removal of an element** can only occur in a **major version update**, the element having been explicitly
  **deprecated in one or more previous minor versions**.
