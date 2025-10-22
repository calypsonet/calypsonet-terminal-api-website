---
title: Card API (internal)
linktitle: 🔶 Card
summary: Internal API which defines the elements shared between the reader layer and the card layer.
type: book
weight: 2
toc: true
---

{{% callout note %}}
Latest version **`{{% card-api-version %}}`**
<span class="component-metadata">{{< icon name="sitemap" pack="fas" >}} [UML class diagram](https://docs.terminal-api.calypsonet.org/calypsonet-terminal-card-uml-api/)</span>
<span class="component-metadata">{{< icon name="github" pack="fab" >}} [GitHub repository](https://github.com/calypsonet/calypsonet-terminal-card-uml-api/)</span>
{{% /callout %}}

As part of the **Reader Layer**, the **Calypsonet Terminal Card API** defines the internal elements shared by the 
reader layer to implement specific card layers (like the Calypso Card layer).

<br>

## Interfaces

![Card API - class diagram](https://docs.terminal-api.calypsonet.org/calypsonet-terminal-card-uml-api/{{% card-api-version %}}/api_class_diagram.svg)

<br>

## APDU construction rules

APDU requests expected by the **Card API** must strictly comply with **ISO/IEC 7816-3**, 
requiring **Case 4** commands, i.e containing ingoing and outgoing data, to include the **Le** field.

We strongly recommend setting this field to **00h**.

<br>

## Limitations & constraints

The **Card API** doesn't allow to request the transmission to a card of the APDU commands "Select Application by DF Name"
or "Get Response":
- the selection of a specific card application could be managed only through a Card Selection Request.
- the APDU response status words 61XYh & 6CXYh are automatically handled by the reader layer library by issuing a
  Get Response or by re-issuing the previous command with the expected 'Le' field.
