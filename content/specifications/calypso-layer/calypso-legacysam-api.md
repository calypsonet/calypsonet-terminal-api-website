---
title: Calypso Legacy SAM API (external)
linktitle: 🟢 Legacy SAM
summary: Public high-level API which standardizes the way to interact with a Calypso® legacy SAM product (SAM-C1, HSM-C1, etc.).
type: book
weight: 2
toc: true
---

{{% callout note %}}
Latest version **`{{% calypso-legacysam-api-version %}}`**
<span class="component-metadata">{{< icon name="book" pack="fas" >}} [Specification](https://docs.terminal-api.calypsonet.org/calypso-crypto-legacysam/)</span>
<span class="component-metadata">{{< icon name="github" pack="fab" >}} [GitHub repository](https://github.com/calypsonet/calypsonet-terminal-calypso-crypto-legacysam-api-spec/)</span>
{{% /callout %}}

As part of the **Card Layer**, the **Calypso Crypto Legacy SAM API** provides the high-level functionality used
to select a Calypso legacy SAM and run transactions with it. Coupled with the **Calypso Card API**, it also performs
the cryptographic computations that a Calypso card transaction secured by symmetric keys requires.

The complete, versioned reference — types, operations, behaviour, diagrams and constraints — is maintained in the
[**Calypso Crypto Legacy SAM API specification**](https://docs.terminal-api.calypsonet.org/calypso-crypto-legacysam/). This page is only a short overview.

<br>

## What it provides

- **SAM image** — a successful selection yields a `LegacySam`, whose key parameters, counters and ceilings can be
  read, with access to the raw data where relevant.

- **Prepare then process** — as for cards, commands are grouped and then processed, which limits the exchanges with
  the SAM reader.

- **Transaction managers by capability** — reading, writing, secured writing, and the asynchronous creation and
  execution of a transaction for a remote SAM.

- **Crypto extension** — the same module provides the Calypso card transaction with its symmetric cryptographic
  primitives, card and SAM commands being interleaved within a single transaction.

<br>

## Learn more

→ [Read the full Calypso Crypto Legacy SAM API specification](https://docs.terminal-api.calypsonet.org/calypso-crypto-legacysam/)
