---
title: Ticketing Terminal APIs Specifications
linktitle: Specifications
type: book
weight: 0
toc: false
search: false
---

## Dedicated interfaces by software layer

Two levels of APIs are provided to interact with either the Reader or the Calypso layers, from the lowest to the
highest:

- At the bottom, the [Reader Layer]({{< relref "reader-layer" >}}) generic interfaces:
    - [Reader API]({{< relref "reader-layer/reader-api/" >}}): Controls any reader solution and manages application selection on a smart card.
    - [Card API]({{< relref "reader-layer/card-api/" >}}): Interfaces a card processing library specific to a given smart card solution.
- Above, the **Smart Card Solution Layer** specific interfaces:
    - several interfaces to integrate [Calypso processing]({{< relref "calypso-layer" >}}) support:
        - [Calypso Card API]({{< relref "calypso-layer/calypso-card-api/" >}}) 
          and [Legacy SAM API]({{< relref "calypso-layer/calypso-legacysam-api/" >}}): Performs secure transactions 
          with Calypso cards or with Calypso security modules such as SAM-S1 or SAM-C1.
        - [Symmetric Crypto API]({{< relref "calypso-layer/calypso-symmetric-crypto-api/" >}}) 
          and [Asymmetric Crypto API]({{< relref "calypso-layer/calypso-asymmetric-crypto-api/" >}}): Interfaces
          Calypso SAM or Calypso PKI processing libraries.

## Dedicated interfaces according to development targets

The ticketing terminal APIs are differentiated according to development objectives:
- in **green** 🟢, high-level public reader and Calypso APIs dedicated to the design of applications on ticketing terminals.
- in **orange** 🔶, internal APIs dedicated to the design of middleware for smart card solutions (Calypso or others).
