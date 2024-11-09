---
title: Specifications
linktitle: " "
type: book
weight: 0
toc: false
search: false
---
This section lists the specifications associated to the [Reader]({{< relref "reader-layer" >}}) & [Calypso]({{< relref "calypso-layer" >}}) layers.

<br>2 levels of APIs are offered, from the lowest to the highest:
- at the bottom the ['reader layer'](https://terminal-api.calypsonet.org/specifications/reader-layer/) _generic_ interfaces:
    - the [**Reader**](https://terminal-api.calypsonet.org/specifications/reader-layer/reader-api/) **API** to control any reader solution and manage the application selection on a smart card,
    - the [**Card**](https://terminal-api.calypsonet.org/specifications/reader-layer/card-api/) **API** for interfacing a card processing library specific to a smart card solution.
- Just below 'smartcard solution layer' _specific_ interfaces:
    - several interfaces to integrate [Calypso processing](https://terminal-api.calypsonet.org/specifications/calypso-layer/) support:
        - [**Card**](https://terminal-api.calypsonet.org/specifications/calypso-layer/calypso-card-api/) and **[Legacy SAM](https://terminal-api.calypsonet.org/specifications/calypso-layer/calypso-legacysam-api/) API**s to perform secure transactions with Calypso cards or with Calypso security modules such as SAM-S1 or SAM-C1.
        - [**Symmetric Crypto**](https://terminal-api.calypsonet.org/specifications/calypso-layer/calypso-symmetric-crypto-api/) and **[Asymmetric Crypto](https://terminal-api.calypsonet.org/specifications/calypso-layer/calypso-asymmetric-crypto-api/) API**s to interface Calypso SAM or Calypso PKI processing libraries.
