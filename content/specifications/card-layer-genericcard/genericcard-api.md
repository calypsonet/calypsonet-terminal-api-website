---
title: Generic Card API (external)
linktitle: 🟢 Generic Card
summary: Public low-level API which standardizes the way to interact with generic cards. 
type: book
weight: 1
toc: true
---

{{% callout note %}}
Latest version **`{{% genericcard-api-version %}}`**
<span class="component-metadata">{{< icon name="book" pack="fas" >}} [Specification](https://docs.terminal-api.calypsonet.org/genericcard/)</span>
<span class="component-metadata">{{< icon name="github" pack="fab" >}} [GitHub repository](https://github.com/calypsonet/calypsonet-terminal-genericcard-api-spec/)</span>
{{% /callout %}}

As part of the **Card Layer**, the **Generic Card API** provides the low-level functionality used to exchange raw
APDUs with any card, without the API interpreting their content.

The complete, versioned reference — types, operations, behaviour, diagrams and constraints — is maintained in the
[**Generic Card API specification**](https://docs.terminal-api.calypsonet.org/genericcard/). This page is only a short overview.

<br>

## What it provides

- **Raw commands** — an APDU is prepared as supplied by the application, then processed with the other prepared
  commands.

- **Command identification** — a command may carry an identifier, used to retrieve its response or to name the
  offending command when processing fails.

- **Execution-time control** — a command may carry a maximum duration, which brings the timing countermeasure down
  to the level of the individual command.

<br>

## Learn more

→ [Read the full Generic Card API specification](https://docs.terminal-api.calypsonet.org/genericcard/)
