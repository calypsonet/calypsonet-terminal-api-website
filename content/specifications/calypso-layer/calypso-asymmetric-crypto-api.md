---
title: Calypso Crypto Asymmetric API (internal)
linktitle: 🔶 Asymmetric Crypto
summary: Internal API which defines the elements shared between the Calypso Card and the Calypso Crypto Asymmetric libraries.
type: book
weight: 4
toc: true
---

{{% callout note %}}
Latest version **`{{% calypso-crypto-asymmetric-api-version %}}`**
<span class="component-metadata">{{< icon name="book" pack="fas" >}} [Specification](https://docs.terminal-api.calypsonet.org/calypso-crypto-asymmetric/)</span>
<span class="component-metadata">{{< icon name="github" pack="fab" >}} [GitHub repository](https://github.com/calypsonet/calypsonet-terminal-calypso-crypto-asymmetric-api-spec/)</span>
{{% /callout %}}

The **Calypso Crypto Asymmetric API** is the internal interface between the **Calypso Card** library and the
crypto modules that perform the asymmetric computations of a PKI secure session.

The complete, versioned reference — types, operations, behaviour, diagrams and constraints — is maintained in the
[**Calypso Crypto Asymmetric API specification**](https://docs.terminal-api.calypsonet.org/calypso-crypto-asymmetric/). This page is only a short overview.

<br>

## What it provides

- **An SPI, not a service** — the API consists of the interfaces a crypto module implements, and that the Calypso
  card transaction calls during a PKI secure session.

- **Certificates** — card and certification authority certificates, with their parsers, are supplied by the
  implementation and consumed when the card is authenticated.

- **Session cryptography** — initialisation of the session context and verification of the card signature.

<br>

## Learn more

→ [Read the full Calypso Crypto Asymmetric API specification](https://docs.terminal-api.calypsonet.org/calypso-crypto-asymmetric/)
