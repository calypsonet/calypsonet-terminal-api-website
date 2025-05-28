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
<span class="component-metadata">{{< icon name="project-diagram" pack="fas" >}} [UML class diagram](https://docs.terminal-api.calypsonet.org/calypsonet-terminal-calypso-crypto-legacysam-uml-api/)</span>
<span class="component-metadata">{{< icon name="github" pack="fab" >}} [GitHub repository](https://github.com/calypsonet/calypsonet-terminal-calypso-crypto-legacysam-uml-api/)</span>
{{% /callout %}}

As part of the **Card Layer**, the **Calypso Crypto Legacy SAM API** provides high-level functionality for selecting 
and performing transactions with Calypso Legacy SAMs and can also be coupled with the **Calypso Card API** to handle the 
cryptographic calculations required for Calypso card transactions secured by symmetric keys.

<br>

## Interfaces

The **Calypso Crypto Legacy SAM API** provides the means to select a target or control SAM and then perform a transaction with the selected target.
- The result of a SAM selection is a smartcard image whose keys' parameters can be read.
- A transaction with a target SAM may involve a control SAM in order to secure the operations.

The `LegacySam` interface provide **accessors** in order to recover the information of the selected smartcard.

To optimize the number of exchanges with a SAM reader, the Legacy SAM API allows to group the commands.
A set of command could be first **prepared**, and then be **processed** by a selected target at the selection or
during the transaction.
A transaction with a Calypso SAM is fully managed through one of the `LSTransactionManager` interfaces:

![Calypso Crypto Legacy SAM API - class diagram](https://docs.terminal-api.calypsonet.org/calypsonet-terminal-calypso-crypto-legacysam-uml-api/{{% calypso-legacysam-api-version %}}/api_class_diagram.svg)
