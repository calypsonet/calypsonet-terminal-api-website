---
title: Reader API (external)
linktitle: 🟢 Reader
summary: Public API which defines the elements shared by the reader.
type: book
weight: 1
toc: true
---

{{% callout note %}}
Latest version **`{{% reader-api-version %}}`**
<span class="component-metadata">{{< icon name="book" pack="fas" >}} [Specification](https://docs.terminal-api.calypsonet.org/reader/)</span>
<span class="component-metadata">{{< icon name="github" pack="fab" >}} [GitHub repository](https://github.com/calypsonet/calypsonet-terminal-reader-api-spec/)</span>
{{% /callout %}}

As part of the **Reader Layer**, the **Reader API** provides the high-level functionality that terminal applications
use to identify readers, observe card insertion and removal, and run card selection scenarios.

<br>

## What it provides

- **Reader access and presence** — the readers available on the terminal are discovered through a single entry point,
  and each of them tells its name, whether it is contactless or contact, and whether a card is present.

- **Reader observation** — the application is notified when a card is inserted, when it matches a selection scenario
  and when it is removed, the technologies to be polled being declared together with the detection settings.

- **Card selection** — a selection scenario describes the applications looked for and the data to be read along the
  way. It is run either on a card already present or scheduled on an observed reader, with a dedicated manager per
  use case: a single application, several applications in sequence, or several applications in parallel on distinct
  logical channels.

<br>

## Learn more

The specification is the normative reference: it covers the complete type and operation set, the observation
lifecycle, the synchronous and asynchronous selection flows, the UML class diagram and the glossary of terms.

→ [Read the full Reader API specification](https://docs.terminal-api.calypsonet.org/reader/)
