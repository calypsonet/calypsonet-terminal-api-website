---
title: Ticketing Terminal APIs Specifications
linktitle: Specifications
type: book
weight: 0
toc: false
search: false
---
This section lists the specifications associated to the [Reader]({{< relref "reader-layer" >}}) & [Calypso]({{< relref "calypso-layer" >}}) layers.

## Dedicated interfaces according to software layer
2 levels of APIs are offered, from the lowest to the highest:
- at the bottom the '[reader layer](https://terminal-api.calypsonet.org/specifications/reader-layer/)' _generic_ interfaces:
    - the [**Reader**](https://terminal-api.calypsonet.org/specifications/reader-layer/reader-api/) **API** to control any reader solution and manage the application selection on a smart card,
    - the [**Card**](https://terminal-api.calypsonet.org/specifications/reader-layer/card-api/) **API** for interfacing a card processing library specific to a smart card solution.
- Just below 'smartcard solution layer' _specific_ interfaces:
    - several interfaces to integrate [Calypso processing](https://terminal-api.calypsonet.org/specifications/calypso-layer/) support:
        - [**Card**](https://terminal-api.calypsonet.org/specifications/calypso-layer/calypso-card-api/) and **[Legacy SAM](https://terminal-api.calypsonet.org/specifications/calypso-layer/calypso-legacysam-api/) API**s to perform secure transactions with Calypso cards or with Calypso security modules such as SAM-S1 or SAM-C1.
        - [**Symmetric Crypto**](https://terminal-api.calypsonet.org/specifications/calypso-layer/calypso-symmetric-crypto-api/) and **[Asymmetric Crypto](https://terminal-api.calypsonet.org/specifications/calypso-layer/calypso-asymmetric-crypto-api/) API**s to interface Calypso SAM or Calypso PKI processing libraries.

## Dedicated interfaces according to development targets
The [ticketing terminal APIs specifications](https://terminal-api.calypsonet.org/specifications/) are differentiated according to development objectives:
- in “green”, high-level public reader and Calypso APIs dedicated to the design of applications on ticketing terminals.
- in “orange”, internal APIs dedicated to the design of middleware for smart card solutions (Calypso or others).
