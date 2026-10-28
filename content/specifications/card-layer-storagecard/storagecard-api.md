---
title: Storage Card API (external)
linktitle: 🟢 Storage Card
summary: Public high-level API which standardizes the way to interact with storage cards (NXP Mifare Ultralight, ST Microelectronics ST25 / SRT512, etc.).
type: book
weight: 1
toc: true
---

{{% callout note %}}
Latest version **`{{% storagecard-api-version %}}`**
<span class="component-metadata">{{< icon name="book" pack="fas" >}} [Specification](https://docs.terminal-api.calypsonet.org/storagecard/)</span>
<span class="component-metadata">{{< icon name="github" pack="fab" >}} [GitHub repository](https://github.com/calypsonet/calypsonet-terminal-storagecard-api-spec/)</span>
{{% /callout %}}

As part of the **Card Layer**, the **Storage Card API** provides the high-level functionality used to select a
storage card and run transactions with it, for the products listed in the specification, such as NXP MIFARE
Ultralight and MIFARE Classic, or ST Microelectronics ST25 / SRT512.

The complete, versioned reference — types, operations, behaviour, diagrams and constraints — is maintained in the
[**Storage Card API specification**](https://docs.terminal-api.calypsonet.org/storagecard/). This page is only a short overview.

<br>

## What it provides

- **Card image** — a successful selection yields a `StorageCard`, whose UID, data blocks and, where the product
  provides one, system block can be read.

- **Product structure** — the `StorageCardProductType` enumeration exposes the structural properties of each
  supported product: number of blocks, block size, system block, write acknowledgment, authentication.

- **Prepare then process** — reads, writes and MIFARE Classic authentications are grouped, then processed; each
  write carries an identifier, so a failure names the offending command.

- **Security settings** — a maximum duration may be set per product type for read commands, as a countermeasure
  against card emulation.

<br>

## Learn more

→ [Read the full Storage Card API specification](https://docs.terminal-api.calypsonet.org/storagecard/)
