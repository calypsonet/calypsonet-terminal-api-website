---
title: Calypso Crypto Symmetric API (internal)
linktitle: 🔶 Symmetric Crypto
summary: Internal API which defines the elements shared between the Calypso Card and the Calypso Crypto Symmetric libraries.
type: book
weight: 3
toc: true
---

{{% callout note %}}
Latest version **`{{% calypso-crypto-symmetric-api-version %}}`**
<span class="component-metadata">{{< icon name="book" pack="fas" >}} [Specification](https://docs.terminal-api.calypsonet.org/calypso-crypto-symmetric/)</span>
<span class="component-metadata">{{< icon name="github" pack="fab" >}} [GitHub repository](https://github.com/calypsonet/calypsonet-terminal-calypso-crypto-symmetric-api-spec/)</span>
{{% /callout %}}

The **Calypso Crypto Symmetric API** is the internal interface between the **Calypso Card** library and the
crypto modules that hold symmetric keys, such as a legacy SAM or an Open SAM.

The complete, versioned reference — types, operations, behaviour, diagrams and constraints — is maintained in the
[**Calypso Crypto Symmetric API specification**](https://docs.terminal-api.calypsonet.org/calypso-crypto-symmetric/). This page is only a short overview.

<br>

## What it provides

- **An SPI, not a service** — the API consists of the interfaces a crypto module implements, and that the Calypso
  card transaction calls during a symmetric secure session.

- **Session cryptography** — initialisation of the session context, computation and verification of the session MAC,
  encryption and decryption of the session APDUs.

- **PIN and Stored Value** — ciphering of the PIN for presentation or modification, and the security data an SV
  operation requires.

<br>

## Learn more

→ [Read the full Calypso Crypto Symmetric API specification](https://docs.terminal-api.calypsonet.org/calypso-crypto-symmetric/)
