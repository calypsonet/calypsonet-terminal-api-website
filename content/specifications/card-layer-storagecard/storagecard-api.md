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
<span class="component-metadata">{{< icon name="project-diagram" pack="fas" >}} [UML class diagram](https://docs.terminal-api.calypsonet.org/calypsonet-terminal-storagecard-uml-api/)</span>
<span class="component-metadata">{{< icon name="github" pack="fab" >}} [GitHub repository](https://github.com/calypsonet/calypsonet-terminal-storagecard-uml-api/)</span>
{{% /callout %}}

As part of the **Card Layer**, the **Storage Card API** provides high-level functionality for selecting and performing 
transactions with storage cards (NXP Mifare Ultralight, ST Microelectronics ST25 / SRT512, etc.).

<br>

## Interfaces

The **Storage Card API** provides the means to select a target card and then perform a transaction with the selected card.
- The result of a card selection is a storage card image whose UID and data blocks can be browsed.

The `StorageCard` interface provide **accessors** to recover the information of the selected storage card.

To optimize the number of exchanges with a card reader, the **Storage Card API** allows grouping the commands.
A set of commands could be first **prepared**, and then be **processed** by a selected target at the selection or
during the transaction.
A transaction with a storage card is fully managed through the `StorageCardTransactionManager` interface:

![Storage Card API - class diagram](https://docs.terminal-api.calypsonet.org/calypsonet-terminal-storagecard-uml-api/{{% storagecard-api-version %}}/api_class_diagram.svg)
