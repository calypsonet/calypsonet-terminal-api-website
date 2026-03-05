---
title: Generic Card API (external)
linktitle: 🟢 Generic Card
summary: Public high-level API which standardizes the way to interact with storage cards (NXP Mifare Ultralight, ST Microelectronics ST25 / SRT512, etc.).
type: book
weight: 1
toc: true
---

{{% callout note %}}
Latest version **`{{% genericcard-api-version %}}`**
<span class="component-metadata">{{< icon name="sitemap" pack="fas" >}} [UML class diagram](https://docs.terminal-api.calypsonet.org/calypsonet-terminal-genericcard-uml-api/)</span>
<span class="component-metadata">{{< icon name="github" pack="fab" >}} [GitHub repository](https://github.com/calypsonet/calypsonet-terminal-genericcard-uml-api/)</span>
{{% /callout %}}

As part of the **Card Layer**, the **Generic Card API** provides high-level functionality for selecting and performing
transactions with any type of card.

<br>

## Interfaces

The **Generic Card API** provides the means to select a target card and then perform a transaction with the selected card.
- The result of a card selection is a smart card image whose file structure and data records can be browsed.
- A transaction with a target card may involve a control SAM to secure the operations.

The `GenericCard` interface provide **accessors** to recover the information of the selected smart card.

To optimize the number of exchanges with a card reader, the **Generic Card API** allows grouping the commands.
A set of commands could be first **prepared**, and then be **processed** by a selected target at the selection or
during the transaction.
A transaction with any card is fully managed through the `CardTransactionManager` interface:

![Generic Card API - class diagram](https://docs.terminal-api.calypsonet.org/calypsonet-terminal-genericcard-uml-api/{{% genericcard-api-version %}}/api_class_diagram.svg)