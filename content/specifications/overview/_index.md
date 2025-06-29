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

## Dedicated interfaces according to development targets

The ticketing terminal APIs are differentiated according to development goals:
- in **green** 🟢, high-level public reader and Calypso APIs dedicated to the design of applications on ticketing terminals.
- in **orange** 🔶, internal APIs dedicated to the design of middleware for smart card solutions (Calypso or others).

## API element visual status explanation

- **Grayed-out elements** indicate features that are **not yet officially part of the API**. These are currently under
  review and may either be formally added or removed in a future version.
- On **minor or major API updates**, elements displayed in **blue** represent **newly introduced features** officially
  added in the current version.
- On **minor API versions**, elements displayed in **red** that are marked with **strikethrough** are those that have
  been **deprecated** but are still present in the API.
- **Actual removal of an element** can only occur in a **major version update**. In such cases, the element must have
  been explicitly **deprecated in one or more previous minor versions**.
