---
title: Terminal APIs 3.0 — Changes and Design Rationale
linktitle: APIs 3.0 Changes
summary: Overview of the changes introduced by the Terminal APIs 3.0 major release, with motivation and design rationale, submitted to the CNA TC Terminal for validation.
type: book
toc: true
weight: 5
---

---

> **Document status**: working draft submitted to the **CNA TC Terminal for validation**.

## Preamble

The purpose of this document is to **present all the evolutions of the Terminal APIs** between the **Keypop Java versions currently in production** and the **current specifications** of the CNA Terminal APIs — **for validation by the members of the TC Terminal** (Technical Committee Terminal) of the **Calypso Networks Association** (CNA).

### Compared versions

The "before" reference consists of the **latest published versions** of the Keypop Java modules (production tags). The "after" reference consists of the **normative specifications** (`index.adoc`) and the associated class diagrams (`uml/class-diagram.puml`) of each `calypsonet-terminal-*-uml-api` repository.

| API | Specification reference | Keypop Java version in production (before) | Specified version (after) |
|---|---|---|---|
| Terminal Reader API | CNA-TR-API | `keypop-reader-java-api` **2.1.0** | **3.0.0** |
| Terminal Card API *(internal)* | CNA-TC-API | `keypop-card-java-api` **2.0.1** | **3.0.0** |
| Terminal Calypso Card API | CNA-TCC-API | `keypop-calypso-card-java-api` **2.2.0** | **3.0.0** |
| Terminal Reader Definitions API *(new)* | CNA-TRD-API | — | **1.0.0** |
| Terminal Calypso Crypto Legacy SAM API | CNA-TCCL-API | `keypop-calypso-crypto-legacysam-java-api` **1.0.0** | **2.0.0** |
| Terminal Calypso Crypto Symmetric API | CNA-TCCS-API | `keypop-calypso-crypto-symmetric-java-api` **0.1.1** | **0.2.0** |
| Terminal Calypso Crypto Asymmetric API | CNA-TCCA-API | `keypop-calypso-crypto-asymmetric-java-api` **0.2.0** | **0.3.0** |
| Terminal Generic Card API | CNA-TGC-API | `keypop-genericcard-jvm-api` **1.0.0** | **2.0.0** |
| Terminal Storage Card API | CNA-TSC-API | `keypop-storagecard-java-api` **1.2.0** | **2.0.0** |

All the specifications are currently in `…-SNAPSHOT` versions.

For each evolution theme, it describes:

- the **motivation** (the "why");
- the **detailed changes** in each of the APIs concerned;
- the **design rationale** (the "why this choice rather than another").

**Annex A** additionally provides an **exhaustive, API-by-API mapping** between each element of the Java versions in production and what becomes of it in the specifications.

Alignment of the Keypop Java implementations with these versions and the writing of a **technical migration guide** for integrators will take place subsequently, after validation by the TC Terminal (see §18).

> **API visibility with respect to audiences**
>
> - The **Reader API**, the **Calypso Card API**, the **Terminal Reader Definitions API**, the **Legacy SAM API**, the **Generic Card API** and the **Storage Card API** are **public** APIs, directly manipulated by the **integrator** (application code).
> - The **Card API** is an **internal** API: it serves as an integration contract between reader implementations and card extensions. **The integrator does not have access to it**.
> - The **Crypto Symmetric API** and **Crypto Asymmetric API** define the contracts (SPI) between the Calypso Card API and the cryptographic modules; the integrator only uses them indirectly, through the crypto modules it instantiates (for example the Legacy SAM API).
>
> This document describes the evolutions of all impacted APIs because they are coupled at the design level. The evolutions of the internal and contract APIs require **no action** from the integrator; they are absorbed by the Keypop implementations.

> **New API: Terminal Reader Definitions API**
>
> Version 3.0.0 introduces a new **foundation API** dedicated to hosting **cross-cutting enumerated types** of the Terminal APIs. It is created on the occasion of Theme 6 to host `RfTechnology` and `CardType`, but its scope is broader: it is **intended to potentially host other enumerations** that constitute **global constants** shared by several Terminal APIs. The Terminal Reader API now **depends** on this new API.
>
> Concretely, this translates into:
>
> - a **new repository**: `calypsonet-terminal-reader-definitions-uml-api` (version `1.0.0-SNAPSHOT`);
> - a **new Keypop Java module**: `keypop-reader-definitions-jvm-api` (to be created, in accordance with the Keypop naming convention);
> - a declared **dependency** of the `keypop-reader-java-api` module on this new module.

> **New form of the deliverables: language-independent normative specifications**
>
> Until now, the Terminal APIs were described by a UML diagram and by the Javadoc of the Keypop Java modules. Each API now has a **normative specification** (`index.adoc`), written in a **notation independent of the implementation language** (inspired by Kotlin), together with its class diagram. This new design proposal aims to **broaden the choice of implementation languages** for the Terminal APIs beyond Java, for example **Kotlin Multiplatform (KMP)**, **Rust**, **Swift** or **C#**. This change of form affects the way types and operations are expressed; the consequences are described in **Theme 10** (§11).

---

## Reference documents

Each `calypsonet-terminal-*-uml-api` repository hosted on [github.com/calypsonet](https://github.com/calypsonet/) contains, at its root:

- the **normative specification** `index.adoc`;
- the **class diagram** `uml/class-diagram.puml`, whose content is strictly aligned with the specification.

| Module | Repository | Version |
|---|---|---|
| **Terminal Reader API** | [calypsonet-terminal-reader-uml-api](https://github.com/calypsonet/calypsonet-terminal-reader-uml-api) | 3.0.0-SNAPSHOT |
| **Terminal Card API** *(internal)* | [calypsonet-terminal-card-uml-api](https://github.com/calypsonet/calypsonet-terminal-card-uml-api) | 3.0.0-SNAPSHOT |
| **Terminal Calypso Card API** | [calypsonet-terminal-calypso-card-uml-api](https://github.com/calypsonet/calypsonet-terminal-calypso-card-uml-api) | 3.0.0-SNAPSHOT |
| **Terminal Reader Definitions API** *(new)* | [calypsonet-terminal-reader-definitions-uml-api](https://github.com/calypsonet/calypsonet-terminal-reader-definitions-uml-api) | 1.0.0-SNAPSHOT |
| **Terminal Calypso Crypto Legacy SAM API** | [calypsonet-terminal-calypso-crypto-legacysam-uml-api](https://github.com/calypsonet/calypsonet-terminal-calypso-crypto-legacysam-uml-api) | 2.0.0-SNAPSHOT |
| **Terminal Calypso Crypto Symmetric API** | [calypsonet-terminal-calypso-crypto-symmetric-uml-api](https://github.com/calypsonet/calypsonet-terminal-calypso-crypto-symmetric-uml-api) | 0.2.0-SNAPSHOT |
| **Terminal Calypso Crypto Asymmetric API** | [calypsonet-terminal-calypso-crypto-asymmetric-uml-api](https://github.com/calypsonet/calypsonet-terminal-calypso-crypto-asymmetric-uml-api) | 0.3.0-SNAPSHOT |
| **Terminal Generic Card API** | [calypsonet-terminal-genericcard-uml-api](https://github.com/calypsonet/calypsonet-terminal-genericcard-uml-api) | 2.0.0-SNAPSHOT |
| **Terminal Storage Card API** | [calypsonet-terminal-storagecard-uml-api](https://github.com/calypsonet/calypsonet-terminal-storagecard-uml-api) | 2.0.0-SNAPSHOT |

> The former diagrams published in the `…-SNAPSHOT/` folders (`api_class_diagram.svg` and `api_class_diagram_diff.svg`) reflect an **intermediate state** of the work and are no longer up to date; the reference is now the `index.adoc` specification.

**Diagram reading conventions**:

- elements in **blue** are **additions or modifications** of the new version;
- elements in **grey** are **under study** ("work in progress"): they have never been implemented and are not part of the normative scope (see §17);
- green classes group **data, constants, enumerations and errors**;
- signatures follow the language-independent notation described in Theme 10 (`→ Self`, `T?`, `val property: Type = default`, etc.).

---

## Table of contents

1. [Overview](#1-overview)
2. [Theme 1 — Support for multiple logical channels](#2-theme-1--support-for-multiple-logical-channels)
3. [Theme 2 — Countermeasure against relay attacks](#3-theme-2--countermeasure-against-relay-attacks)
4. [Theme 3 — Simplified observation management](#4-theme-3--simplified-observation-management)
5. [Theme 4 — Knowledge of the current secure session state](#5-theme-4--knowledge-of-the-current-secure-session-state)
6. [Theme 5 — Semantic improvements (renamings and removals)](#6-theme-5--semantic-improvements-renamings-and-removals)
7. [Theme 6 — Strict typing of RF technologies and card types (ECP support)](#7-theme-6--strict-typing-of-rf-technologies-and-card-types-ecp-support)
8. [Theme 7 — Command identification (`commandId`)](#8-theme-7--command-identification-commandid)
9. [Theme 8 — Standardised reader discovery and access (`CardReaderProvider`)](#9-theme-8--standardised-reader-discovery-and-access-cardreaderprovider)
10. [Theme 9 — Redesign of the card selection model](#10-theme-9--redesign-of-the-card-selection-model)
11. [Theme 10 — Implementation-language-independent specification](#11-theme-10--implementation-language-independent-specification)
12. [Theme 11 — Data exposed without computation and access to raw data](#12-theme-11--data-exposed-without-computation-and-access-to-raw-data)
13. [Theme 12 — Stored Value (SV) operations](#13-theme-12--stored-value-sv-operations)
14. [Theme 13 — Tolerance of a missing file (`6A82h`) in a secure session](#14-theme-13--tolerance-of-a-missing-file-6a82h-in-a-secure-session)
15. [Theme 14 — Crypto extensions and command interleaving](#15-theme-14--crypto-extensions-and-command-interleaving)
16. [Normative clarifications](#16-normative-clarifications)
17. [Elements under study](#17-elements-under-study)
18. [Migration procedure](#18-migration-procedure)
19. [Next steps and validation by the TC Terminal](#19-next-steps-and-validation-by-the-tc-terminal)
- [Annex A — Detailed mapping per API](#annex-a--detailed-mapping-per-api)

---

## 1. Overview

The new generation of the Terminal APIs introduces compatibility breaks on all existing APIs, **creates a new foundation API** (`Terminal Reader Definitions API`), and comes with a **change of form** of the deliverables (language-independent normative specifications). The changes are grouped into fourteen themes:

| # | Theme | Reader | Card | Calypso Card | Definitions | Legacy SAM | Crypto Sym. | Crypto Asym. | Generic Card | Storage Card |
|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | Multiple logical channels | ● | ● | ● | — | — | — | — | ● | — |
| 2 | Relay attack countermeasure | — | ● | ● | — | — | — | — | ● | — |
| 3 | Simplified observation | ● | — | — | — | — | — | — | — | — |
| 4 | Current secure session state | — | — | ● | — | — | — | — | — | — |
| 5 | Semantic improvements | ● | ● | ● | — | ● | ● | ● | ● | ● |
| 6 | RF / card type typing (ECP) | ● | — | — | ● (creation) | — | — | — | — | — |
| 7 | Command identification (`commandId`) | — | — | ● | — | ● | — | — | ● | ● |
| 8 | Standardised reader discovery | ● | — | — | — | — | — | — | — | — |
| 9 | Redesign of the selection model | ● | — | — | — | — | — | — | — | — |
| 10 | Language-independent specification | ● | ● | ● | ● | ● | ● | ● | ● | ● |
| 11 | Data without computation, raw data | — | ● | ● | — | ● | ● | ● | — | ● |
| 12 | Stored Value operations | — | — | ● | — | — | — | — | — | — |
| 13 | Missing file tolerated in session | — | — | ● | — | — | — | — | — | — |
| 14 | Crypto extensions and interleaving | — | — | ● | — | ● | — | — | — | — |

Cross-cutting consequences:

- **Removal of the entire deprecated legacy**: all elements marked `@Deprecated` in the production versions are removed with no compatibility alternative (for example `ChannelControl` in the Calypso Card API, `TransactionManager.processCommands()` in the Legacy SAM API, `prepareReadSystemBlock()` in the Storage Card API).
- **Removal of the "work in progress" elements** that appeared in the former diagrams for prospective purposes without ever being implemented: `ReaderApiFactory.createMultichannelCardSelector()`, `MultichannelCardSelector`, `CardSelectionResult.getCardReader()` (Reader API); `AsymmetricCryptoSecuritySetting.authorizeAllTrustedCa()`, `authorizeOnlyConfiguredCa()` and `revokeCa(byte[])` (Calypso Card API). The elements still under study in the Legacy SAM API are listed in §17.
- **Complete disappearance of `ChannelControl`** (Reader API, Card API, Calypso Card API): closing the channel becomes an **explicit operation** (`closeChannel`, `transmitCardRequestAndCloseChannel`, `processCommandsAndCloseChannel`).
- **Disappearance of duplicate errors**: the `InvalidCardResponseException` of the `reader.selection` package, as well as the communication and status errors specific to the Calypso Card API and the Legacy SAM API, disappear in favour of the Reader API errors.
- **Recursive genericity dropped**: all interfaces of the form `T extends X<T>` (transaction managers, selectors, signature data) lose their type parameter; fluent chaining is expressed by the `Self` return type (see Theme 10).

---

## 2. Theme 1 — Support for multiple logical channels

### 2.1 Motivation

Until now, the API implicitly assumed that only one logical channel was open at a time between the terminal and the card. Version 3.0.0 explicitly introduces the notion of **multiple logical channels** (ISO cards supporting several simultaneous application selections on distinct logical channels), with two objectives:

1. to allow **several applications** of the same card to be selected and handled in parallel;
2. to clearly distinguish, for each smart card, **on which channel** it is attached and **whether it is still active**.

The concrete trigger for this work is the arrival of a new CNA product, **OpenSAM**, whose usage model relies on the **simultaneous coexistence of several security applications** accessible in parallel on distinct logical channels. The detailed specifications of OpenSAM are covered by the CNA documentation dedicated to this product.

### 2.2 Reader API

#### Multi-channel selection

- **New manager** `MultichannelCardSelectionManager`, obtained through `ReaderApiFactory.createMultichannelCardSelectionManager()`, whose operation `processCardSelectionScenario(reader: CardReader, channelSelectionPolicy: ChannelSelectionPolicy) → MultichannelCardSelectionResult` executes the scenario by placing **each successful selection on its own logical channel**. If the presented card does not support multi-channel, an `InvalidCardResponse` error is raised at scenario execution time. This manager is part of the overall redesign of the selection described in **Theme 9** (§10).
- **New enumeration** `ChannelSelectionPolicy`:
  - `ALLOW_BASIC_CHANNEL` — allows the use of the basic channel (channel 0) in addition to the additional logical channels;
  - `LOGICAL_CHANNEL_ONLY` — restricts the selection to the additional logical channels (channel 0 is not used).
- **New result** `MultichannelCardSelectionResult` (`cardType`, `smartCards`): all the cards it exposes are active in parallel, each on its own channel. The scheduled mode (selection on card insertion) is not offered in multi-channel mode.

#### Channel knowledge at card level

- **New operation** `SmartCard.isActive() → Boolean` — the card knows whether it is still active on its channel.
- **New operation** `IsoSmartCard.isBasicChannel() → Boolean` — indicates whether the card is attached to the basic channel or to an additional logical channel.

#### Multi-channel transaction management

The hierarchy of transaction managers (namespace `reader.transaction.spi`) is restructured into three levels:

```text
CardTransactionManager  (root interface, non-generic)
  ├─ IsoCardTransactionManager  (new, ISO 7816-4 — carries the conversion to multi-channel)
  └─ MultichannelCardTransactionManager  (new, actual multi-channel)
```

- **`CardTransactionManager`** (redesigned) — no longer generic; exposes `processCommands() → Unit` (without parameter). It is the common root interface of all transaction managers.
- **`IsoCardTransactionManager`** — **new** intermediate **interface** dedicated to ISO 7816-4 cards. It exposes a single operation `asMultichannelCardTransactionManager() → MultichannelCardTransactionManager`, which returns a multi-channel view of the manager. **The conversion itself never fails**: if the underlying card does not support multi-channel, the `InvalidCardResponse` error is only raised **when the commands are processed** by the obtained manager (`processCommands`, `processCommandsAndCloseChannel`).
- **`MultichannelCardTransactionManager`** — **new interface** extending `CardTransactionManager`; exposes:
  - `processCommandsAndCloseChannel() → Unit` — processes the pending commands and, upon success, **closes the channel**;
  - `closeChannel() → Unit` — explicit, idempotent closing of the channel.

> **Expected anchoring on the consumer API side**:
>
> - APIs targeting ISO 7816-4 cards that are **not intrinsically multi-channel** (Calypso Card, Generic Card) make their transaction manager extend **`IsoCardTransactionManager`** and access multi-channel **on demand** through `asMultichannelCardTransactionManager()`.
> - APIs targeting **intrinsically multi-channel** cards (the **future Terminal OpenSAM API** in particular) make their transaction manager extend **`MultichannelCardTransactionManager` directly**.

### 2.3 Card API

- **New operation** `SmartCardSpi.deactivate() → Unit` — allows the reader to **deactivate** the card, so that the application immediately sees `SmartCard.isActive()` switch to `false`.
- **New SPI interface** `MultichannelSmartCardSpi` (extends `SmartCardSpi`) with `getChannel() → Int`.
- **Redesign of `ProxyReaderApi`**:
  - **removed**: `transmitCardRequest(CardRequestSpi, ChannelControl)` and `releaseChannel()`;
  - **added**:
    - `transmitCardRequest(cardRequest: CardRequest, smartCard: SmartCardSpi) → CardResponse`;
    - `transmitCardRequestAndCloseChannel(cardRequest: CardRequest, multichannelSmartCard: MultichannelSmartCardSpi) → CardResponse`;
    - `closeChannel(multichannelSmartCard: MultichannelSmartCardSpi) → Unit`.
- **Addition** of the property `CardSelectionResponse.channel: Int` — the selection response carries the channel number (`0` in single-channel mode).
- **Removal** of `CardResponseApi.isLogicalChannelOpen()` — made redundant by the new model.

#### 2.3.1 Role of the card passed to the `ProxyReaderApi`

The `SmartCardSpi` / `MultichannelSmartCardSpi` parameter is **not** a mere vehicle for the channel number. It plays up to three roles:

1. **carrying the logical channel number** (with `MultichannelSmartCardSpi` only);
2. **carrying the active state of the card**, so that the reader checks that it is still active before any transmission — an inactive card causes the `CardBrokenCommunication` error;
3. **allowing the reader to deactivate the card** (`SmartCardSpi.deactivate()`), for example after a communication error or on explicit channel closure.

#### 2.3.2 `SmartCard` lifecycle

The reader **keeps the references to the `SmartCard` instances resulting from the last selection** and **deactivates** them in four cases:

1. on a **new selection in single-channel mode**;
2. on an **explicit channel closure request** (`closeChannel`, `processCommandsAndCloseChannel`);
3. on the call to **`ObservableCardReader.endCardProcessing()`**;
4. on an **error indicating that the card can no longer be reached** (`CardCommunication`, `ReaderCommunication`).

This contract, which only appeared as prose in the previous version of this document, is now **normative**: it is defined in the Reader API specification (description of `SmartCard.isActive`, *SmartCard lifecycle* section).

### 2.4 Calypso Card API

- The Calypso `TransactionManager` now extends **`IsoCardTransactionManager`** (instead of `CardTransactionManager`). Multi-channel access is performed **without a dedicated operation**: the integrator calls `asMultichannelCardTransactionManager()` and then uses `processCommandsAndCloseChannel()` / `closeChannel()`.

### 2.5 Generic Card API

- The transaction manager (renamed `GenericCardTransactionManager`, see Theme 5) now extends **`IsoCardTransactionManager`**.

### 2.6 Rationale

"By parameter" control (`ChannelControl.KEEP_OPEN` / `CLOSE_AFTER`) relied on an implicit, global notion of a "single current channel". In a multi-channel context, this model is ambiguous: which channel does `CLOSE_AFTER` apply to? Moving to a model where the target (the `SmartCard(Spi)`) is **explicitly named** in each call removes this ambiguity.

The three-level hierarchy allows **each consumer API to anchor itself at the capability level that exactly matches its card model**: on-demand conversion for cards for which multi-channel is only an optional capability, direct anchoring for intrinsically multi-channel cards.

---

## 3. Theme 2 — Countermeasure against relay attacks

### 3.1 Motivation

A **relay attack** consists in relaying the dialogue with a card to a remote location, which makes a fraudulent operation possible without the cardholder's knowledge. The relay adds a transmission delay: an abnormally long exchange can therefore reveal that the card is not actually present in front of the reader. The new versions introduce a mechanism for **measuring and bounding APDU exchange durations** and for **bounding the secure session duration**.

#### Threat model

- **Targeted attack surface**: **application-level attack** (software relay of APDUs), as opposed to attacks at the physical RF transport level, which are covered by hardware countermeasures.
- **Order of magnitude** of the bounds: the **millisecond** (`ms`).
- **Measurement location**: the **Terminal Reader API implementation** measures the effective duration of each APDU exchange and compares it with the bound declared on the request. The Calypso duration bounds are declared in the Calypso Card API and each covers **a single command exchange** (_Open Secure Session_, _Close Secure Session_, _SV Reload_ / _SV Debit_ / _SV Undebit_).
- **Behaviour after an overrun**: the Card API raises the **`ApduExchangeDurationExceeded`** error, which the higher-level extensions intercept and propagate to the application as an **`InvalidCardResponse`**. The Calypso Card API now specifies this behaviour: if a **secure session is open, it is automatically cancelled** before the error is propagated, so that no modification performed during the session is validated by the card; **outside a session** (SV command), there is nothing to cancel and only the error is propagated to the ticketing layer, which decides what to do according to its own context. In the Generic Card API, an overrun raises `InvalidCardResponse`, whose message identifies the offending command.

### 3.2 Card API

- **Request side**: `ApduRequest.apduExchangeMaxDuration: Long? = null` — maximum tolerated duration for the exchange (in milliseconds); `null` means "no bound".
- **Response side**: `ApduResponse.apduExchangeDuration: Long?` — effective duration of the exchange; `null` means "duration not measured".
- **New error** `ApduExchangeDurationExceeded` — raised by `ProxyReaderApi.transmitCardRequest(...)` when the effective duration exceeds the declared bound. Like the other APDU errors, it carries `cardResponse` and `isCardResponseComplete`.
- The Card API specification now documents this mechanism as a **practical solution for implementing anti-relay countermeasures** (*APDU exchange execution-time control* chapter).

### 3.3 Calypso Card API

Each bound is declared according to two families of settings, each with a dedicated operation:

- **by CSN** (`…ByCsn(maxDuration: Long, csnMin: Long)`): `csnMin` is a **threshold** on the CSN (Calypso Serial Number, i.e. the Application Serial Number, compared as an unsigned 64-bit integer);
- **by FCI** (`…ByFci(maxDuration: Long, fciRegex: String)`): `fciRegex` is a regular expression applied to the **whole FCI** returned by *Select Application* (excluding the status word), represented as an uppercase hexadecimal string without separators.

- **`SymmetricCryptoSecuritySettings`** — six new operations:
  - `assignOpenSecureSessionMaxDurationByCsn(maxDuration: Long, csnMin: Long) → Self` and `assignOpenSecureSessionMaxDurationByFci(maxDuration: Long, fciRegex: String) → Self` — maximum duration of the _Open Secure Session_ command exchange;
  - `assignCloseSecureSessionMaxDurationByCsn(maxDuration: Long, csnMin: Long) → Self` and `assignCloseSecureSessionMaxDurationByFci(maxDuration: Long, fciRegex: String) → Self` — maximum duration of the _Close Secure Session_ command exchange;
  - `assignSvCommandMaxDurationByCsn(maxDuration: Long, csnMin: Long) → Self` and `assignSvCommandMaxDurationByFci(maxDuration: Long, fciRegex: String) → Self` — maximum duration of the exchange of one of the _SV Reload_, _SV Debit_ or _SV Undebit_ commands.
- **`AsymmetricCryptoSecuritySettings`** — four new operations:
  - `assignOpenSecureSessionMaxDurationByCsn(maxDuration: Long, csnMin: Long) → Self` and `assignOpenSecureSessionMaxDurationByFci(maxDuration: Long, fciRegex: String) → Self` — maximum duration of the _Open Secure Session_ command exchange;
  - `assignCloseSecureSessionMaxDurationByCsn(maxDuration: Long, csnMin: Long) → Self` and `assignCloseSecureSessionMaxDurationByFci(maxDuration: Long, fciRegex: String) → Self` — maximum duration of the _Close Secure Session_ command exchange.

> **Resolution rule** (for a given card, per kind of bounded operation):
> 1. **CSN-based settings**: each call defines a **range** bounded by its `csnMin` and the immediately higher declared `csnMin` (or +∞). If the card's CSN belongs to a range whose `maxDuration` differs from `Long.MAX_VALUE`, this value applies.
> 2. **FCI-based settings**: otherwise, the FCI-based settings are evaluated **in declaration order** and the first one whose expression matches the FCI applies; a `maxDuration` equal to `Long.MAX_VALUE` then means "no bound".
> 3. Otherwise, no bound applies.

Consequences and details:

- CSN-based settings act as **overrides**: a default bound is expressed by a last FCI-based setting with the expression `.*`, not by a CSN-based setting with the lowest threshold, which would shadow every FCI-based setting; `Long.MAX_VALUE` on a CSN range hands the decision back to the FCI-based settings for the cards of that range;
- the match applies to the **whole string** (implicitly anchored at both ends); a byte is matched by `..`;
- to remain portable (Java, .NET, Swift/ICU, Rust), the expression is restricted to a **common subset**: literal characters, `.`, classes `[...]`, quantifiers `*`, `+`, `?`, `{n}`, `{n,}`, `{n,m}`, alternation `|` and groups `(...)`; backreferences, lookaround assertions, anchors and inline flags are excluded;
- an invalid expression or one outside the subset, or a `maxDuration` that is not strictly positive, is rejected **at call time** (*Argument* pre-condition);
- a new call with an already declared `csnMin` replaces the previous value; a new call with an identical `fciRegex` replaces the value while **keeping its position** in the evaluation order;
- when no FCI is available, no FCI-based setting matches;
- **FCI integrity**: the FCI is obtained during the selection, outside any session, and is therefore not authenticated. If the expression filters on the *startup info* data, the integrator **must** execute a `prepareGetData(FCI_FOR_CURRENT_DF)` inside the session to ensure the integrity of the FCI obtained during the selection. `prepareGetData` is now allowed inside a session **for this tag only**; if the returned value differs from the *Select Application* response, the `InconsistentData` error is raised by `processCommands` (not by `prepareGetData`).

`maxDuration` comes first, as it is the value the operation assigns.

> **Measured duration**: each bound covers the **relevant command exchange alone**, from the transmission of the command to the reception of its response; the other commands of the secure session or of the SV operation are not counted. **Consequence of an overrun**: an open secure session is automatically cancelled and the error is propagated as an `InvalidCardResponse`; outside a session, only the error is propagated (see §3.1).

> The regular expression on the FCI alone covers the DF name, the startup information (product families, byte masking) and even a prefix of the serial number (tag `C7`), with a priority order chosen by the integrator. This form replaces the `dfName` / `startupInfo` criteria of the previous working versions of this document.

### 3.4 Generic Card API

- **`GenericCardTransactionManager.prepareCommandWithMaxDuration(commandId: Int, apdu: ByteArray, maxDuration: Long) → Self`** — prepares a command with an identifier (see Theme 7) and a duration bound. If the effective duration exceeds the bound, the `InvalidCardResponse` error identifies the offending command.

> The Generic Card API thus exposes the relay countermeasure **at the level of each individual command**, consistent with its usage model (APDU sequences without an explicit secure transaction).

### 3.5 Rationale

A relay attack introduces a significant and systematic delay on APDU exchanges; monitoring this delay at the reader level (Card API), at the Calypso session level (Calypso Card API) and at the level of each generic command (Generic Card API) covers all the usage scenarios of the Terminal APIs.

---

## 4. Theme 3 — Simplified observation management

### 4.1 Motivation

The production model exposed a complete **Observer pattern** (`addObserver`, `removeObserver`, `clearObservers`, `countObservers`, `setReaderObservationExceptionHandler`) plus two distinct SPIs (`CardReaderObserverSpi` and `CardReaderObservationExceptionHandlerSpi`). In practice, **a single observer** is registered, and the separation between event handler and error handler brought no value.

### 4.2 Reader API — `ObservableCardReader`

**Removed operations**:

- `setReaderObservationExceptionHandler(CardReaderObservationExceptionHandlerSpi)`
- `addObserver(CardReaderObserverSpi)`, `removeObserver(CardReaderObserverSpi)`, `clearObservers()`, `countObservers()`
- `startCardDetection(DetectionMode)` (single-argument signature)
- `finalizeCardProcessing()` (renamed, see below)

**Added / redesigned operations**:

- `startCardDetection(settings: CardDetectionSettings, eventHandler: CardReaderEventHandler) → Unit` — the handler is registered **when detection starts**, in a single operation, together with the detection settings (see Theme 6).
- `endCardProcessing() → Unit` — replaces `finalizeCardProcessing()`; idempotent; additionally releases the references to the `SmartCard` instances of the last selection (see §2.3.2).
- `clearScheduledCardSelectionScenario() → Unit` — **new operation** that removes the card selection scenario scheduled on the reader. From the next insertion onwards, no scenario is executed and `CardReaderEvent.scheduledCardSelectionsResponse` is `null`. Idempotent.

**Removed SPIs**: `CardReaderObserverSpi`, `CardReaderObservationExceptionHandlerSpi`.

**Added SPI**: `CardReaderEventHandler`, which **merges** the two previous SPIs:

- `onReaderEvent(cardReaderEvent: CardReaderEvent) → Unit`;
- `onReaderError(context: String, readerName: String, error: Any) → Unit`.

### 4.3 Rationale

This simplification:

1. **reduces the API surface** (5 operations and 2 SPIs become 1 operation and 1 SPI);
2. **eliminates invalid states** (observer registered without an error handler, detection started without an observer, etc.);
3. **aligns the API** with the actual usage observed among integrators.

---

## 5. Theme 4 — Knowledge of the current secure session state

### 5.1 Motivation

On the Calypso side, the application had no direct means of knowing **whether a secure session was open**, nor its **nature** (symmetric / asymmetric) or its **write access level**.

### 5.2 Calypso Card API

- **New operation** `TransactionManager.getSecureSessionState() → SecureSessionState` — returns the state of the secure session at the moment of the call.
- **New enumeration** `SecureSessionState`:
  - `NO_SESSION` — no secure session is open: none has been opened yet, or the last one has been closed or cancelled;
  - `ASYMMETRIC` — PKI session;
  - `SYMMETRIC_PERSONALIZATION`, `SYMMETRIC_LOAD`, `SYMMETRIC_DEBIT` — symmetric session opened with the corresponding write access level.

> **Change compared with the previous working version of this document**: the `SecureSessionStatus` object (with `isOpen`, `type`, `writeAccessLevel`) / `SecureSessionType` pair is replaced by a single enumeration. The former form left `type` and `writeAccessLevel` undefined when no session was open; the enumeration makes these combinations impossible. The name *State* (rather than *Status*) designates one state among mutually exclusive states and avoids any confusion with the status data returned by the card (status word, `dfStatus`, etc.).

> **Chosen granularity**: the values reflect the **cryptographic nature** of the session and not the **application mode** (Regular / Extended); the latter is deduced from the sub-type of the instantiated `TransactionManager`.

### 5.3 Rationale

The Calypso `TransactionManager` can now be **introspected** about its own secure session, which spares the caller from maintaining its own state tracking.

---

## 6. Theme 5 — Semantic improvements (renamings and removals)

This theme groups the renamings and removals motivated by clarity or consistency. The changes resulting from the language-independent notation (`Exception`, `Spi`, `Api` suffixes, nested enumerations, overloads) are described in Theme 10; the exhaustive list is given in Annex A.

### 6.1 Reader API

| Before (Java 2.1.0) | After (3.0.0) | Rationale |
|---|---|---|
| `ObservableCardReader.DetectionMode.SINGLESHOT` | `DetectionMode.SINGLE_SHOT` | `UPPER_SNAKE_CASE` convention (compound word). |
| `CardReaderEvent.Type.UNAVAILABLE` | `CardReaderEventType.READER_UNREGISTERED` | The name describes the actual **cause** of the event. |
| `ObservableCardReader.NotificationMode` | `CardPresenceNotificationPolicy` (namespace `reader.selection`) | The name describes what is notified; the notion belongs to **selection**. |
| `ObservableCardReader.finalizeCardProcessing()` | `ObservableCardReader.endCardProcessing()` | `finalize` is loaded in Java (method of `Object`, deprecated by the JDK). |

**Removals**:

- `CardSelectionManager.setMultipleSelectionMode()` and `prepareReleaseChannel()` — see Themes 1 and 9;
- `ChannelControl` and `CardTransactionManager.processCommands(ChannelControl)` — replaced by `processCommands()`;
- `ReaderProtocolNotSupportedException` — disappears with `ConfigurableCardReader` (see Theme 6);
- `reader.selection.InvalidCardResponseException` — duplicate of the error of the same name in the `reader` namespace.

### 6.2 Card API

- **Removal** of `ChannelControl`, of `ProxyReaderApi.releaseChannel()` and of `CardResponseApi.isLogicalChannelOpen()` (see Theme 1).
- **Removal** of the abstract error `AbstractApduException`: its information (`cardResponse`, `isCardResponseComplete`) is carried directly by the four errors concerned (`ReaderBrokenCommunication`, `CardBrokenCommunication`, `UnexpectedStatusWord`, `ApduExchangeDurationExceeded`).

### 6.3 Calypso Card API

- **Removals**:
  - `TransactionManager.processCommands(ChannelControl)` and `ChannelControl` (deprecated);
  - the errors `UnexpectedCommandStatusException`, `ReaderIOException`, `CardIOException` (deprecated), covered by `InvalidCardResponse`, `ReaderCommunication` and `CardCommunication` of the Reader API;
  - the `SelectFileException` error, which has become pointless (see Theme 13);
  - `CalypsoCardApiFactory.createSearchCommandData()` (see Theme 11).
- **Renaming** of overloaded operations (see Theme 10): `prepareSelectFile(short)` → `prepareSelectFileByLid`, `prepareSelectFile(SelectFileControl)` → `prepareSelectFileByControl` (parameter harmonised as `selectFileControl`), in `CalypsoCardSelectionExtension` and `TransactionManager`.
- **Nested enumerations renamed**: `CalypsoCard.ProductType` → `CalypsoCardProductType`, `ElementaryFile.Type` → `ElementaryFileType`.
- **Collections named in the plural**: the `counterNumberToDecValueMap` / `counterNumberToIncValueMap` parameters of `prepareDecreaseCounters` / `prepareIncreaseCounters` become `decrementValues` / `incrementValues`; the `kif` / `kvc` properties of `DirectoryHeader` become `kifByAccessLevel` / `kvcByAccessLevel`.
- **Security settings renamed to the plural**: `SymmetricCryptoSecuritySetting` → `SymmetricCryptoSecuritySettings`, `AsymmetricCryptoSecuritySetting` → `AsymmetricCryptoSecuritySettings`; the factory operations follow (`createSymmetricCryptoSecuritySettings`, `createAsymmetricCryptoSecuritySettings`), as does the `securitySettings` parameter of the `createSecure…TransactionManager` operations.

### 6.4 Legacy SAM API

- **Removals**:
  - `TransactionManager.processCommands()` (deprecated) and `processCommands(ChannelControl)`: the manager now inherits `CardTransactionManager.processCommands()` from the Reader API;
  - the errors `UnexpectedCommandStatusException`, `ReaderIOException`, `SamIOException`, covered by the Reader API errors;
  - `LegacySamRevocationServiceSpi.isSamRevoked(serialNumber)` (variant without counter value): only `isSamRevoked(serialNumber: ByteArray, counterValue: Int) → Boolean` remains.
- **Renaming** of overloaded operations (see Theme 10):

| Before (Java 1.0.0) | After (2.0.0) |
|---|---|
| `setUnlockData(String, LegacySam.ProductType)` | `setUnlockDataForProductType(unlockData, productType)` |
| `setStaticUnlockDataProvider(provider)` | `setStaticUnlockDataProviderWithDeferredReader(provider)` |
| `setStaticUnlockDataProvider(provider, targetSamReader)` | `setStaticUnlockDataProvider(provider, targetSamReader)` *(nominal case, name unchanged)* |
| `setDynamicUnlockDataProvider(provider)` | `setDynamicUnlockDataProviderWithDeferredReader(provider)` |
| `setDynamicUnlockDataProvider(provider, targetSamReader)` | `setDynamicUnlockDataProvider(provider, targetSamReader)` *(nominal case, name unchanged)* |
| `prepareReadWorkKeyParameters(int)` / `(byte, byte)` | `prepareReadWorkKeyParametersByRecordNumber` / `prepareReadWorkKeyParametersByKifKvc` |
| `getWorkKeyParameter(int)` / `(byte, byte)` | `getWorkKeyParametersByRecordNumber` / `getWorkKeyParametersByKifKvc` |
| `prepareTransferWorkKeyDiversified(…, diversifier)` | `prepareTransferWorkKeyDiversifiedWithSpecificDiversifier(…, diversifier)` |
| `LegacySam.ProductType` | `LegacySamProductType` |

### 6.5 Generic Card API

| Before (Java 1.0.0) | After (2.0.0) | Rationale |
|---|---|---|
| `CardTransactionManager` | `GenericCardTransactionManager` | Name specific to the API, with no collision with the Reader API `CardTransactionManager` it inherits from. |
| `GenericCardApiFactory.createCardTransaction(reader, card)` | `createGenericCardTransactionManager(reader, card)` | The name designates the created object. |
| `prepareApdu(String)` | *(removed)* | Conversion from a string is left to the application. |
| `prepareApdu(byte[])` | `prepareCommand(apdu: ByteArray)` | "Command"-oriented name. |
| `prepareApdu(byte cla, byte ins, byte p1, byte p2, byte[] dataIn, Byte le)` | *(removed)* | Building APDUs field by field is left to the application. |
| `getResponsesAsByteArrays()` | `getLastExecutionResponses() → List<ByteArray>` | Specifies the **time scope** (last execution). |
| `getResponsesAsHexStrings()` | *(removed)* | The hexadecimal representation is left to the application. |

New operations related to Themes 2 and 7: `prepareCommandWithId`, `prepareCommandWithMaxDuration`, `getLastExecutionResponse` (see §8.2).

### 6.6 Storage Card API

| Before (Java 1.2.0) | After (2.0.0) | Rationale |
|---|---|---|
| `ProductType` (namespace `storagecard.card`) | `StorageCardProductType` | Name specific to the API, unambiguous with respect to the other product types of the family. |
| `ProductType.getBlockCount()`, `getBlockSize()`, `hasSystemBlock()`, `hasWriteAcknowledgment()`, `hasAuthentication()` | properties `blockCount`, `blockSize`, `hasSystemBlock`, `hasWriteAcknowledgment`, `hasAuthentication` of the enumeration | These are data specific to each product, exposed as such (see Theme 10). |
| `StorageCard.getUID()` | `StorageCard.getUid()` | `lowerCamelCase` convention for acronyms. |
| `prepareMifareClassicAuthenticate(…, byte[] key)` | `prepareMifareClassicAuthenticateWithKey(…, key)` | Unique operation names (see Theme 10). |
| `prepareMifareClassicAuthenticate(…, int keyNumber)` | `prepareMifareClassicAuthenticateWithKeyNumber(…, keyNumber)` | (same) |
| `StorageCardTransactionManager.prepareReadSystemBlock()`, `prepareWriteSystemBlock(byte[])` *(deprecated)* | *(removed)*; `prepareSt25ReadSystemBlock()` and `prepareSt25WriteSystemBlock(commandId, data)` remain | The `St25` prefix reflects the product-specific nature of the system block. |
| `StorageCardException` interface (`getBlockAddress()`) | *(removed)*; the errors carry `blockAddress: Int?` and `commandId: Int?` | The information is carried directly by each error. |
| `SCAuthenticationFailedException extends CardCommunicationException` | `SCAuthenticationFailed` *(no parent error)* | An authentication failure is not a communication error. |

In addition, `StorageCard.getBlock`, `getBlocks` and `getSystemBlock` now explicitly return `ByteArray?` (`null` if the data has not been read).

### 6.7 Crypto Symmetric and Crypto Asymmetric APIs

The evolutions of these two APIs relate to Themes 10 and 11 (data objects, removal of input/output objects); they are detailed in §11 and §12 and in Annex A.

---

## 7. Theme 6 — Strict typing of RF technologies and card types (ECP support)

### 7.1 Motivation

Two drivers converge:

1. **End of free-form strings for protocols**. The production versions configured protocol activation and selection filtering with **character strings** (`physicalProtocolName`, `logicalProtocolName`): non-standardised values, undetected typos, scattered documentation.
2. **Arrival of ECP support** (Enhanced Contactless Polling), a mechanism defined by the **Apple ECP specification** that allows fast detection of cards (notably Calypso) in transit mode on iPhone, and requires sending a **specific polling frame** when detection starts. The frame is handled as opaque binary data built by the application.

### 7.2 New foundation API — Terminal Reader Definitions API

The `RfTechnology` and `CardType` enumerations are placed in a **new foundation API**, the **Terminal Reader Definitions API**, which exposes neither service interface nor SPI; its only purpose is to host the **cross-cutting enumerated types** shared between Terminal APIs.

#### Structural consequences

- **New repository**: `calypsonet-terminal-reader-definitions-uml-api` (version `1.0.0-SNAPSHOT`).
- **New Keypop Java module**: `keypop-reader-definitions-jvm-api` (to be created).
- Public and transitive **dependency** of the Terminal Reader API on the Terminal Reader Definitions API (the enumerations appear in the properties `BasicCardSelector.cardType`, `IsoCardSelector.cardType`, `CardDetectionSettings.rfTechnologies` and `…CardSelectionResult.cardType`).

#### Initial content

- **`ReaderDefinitionsApiProperties`** — `VERSION` constant of the module;
- **`RfTechnology`**: `ISO_14443_AB`, `INNOVATRON_B_PRIME`, `FELICA`, `ISO_15693`;
- **`CardType`**: `ISO_7816_3`, `ISO_14443_4`, `ISO_14443_3A_MIFARE_CLASSIC_1K`, `ISO_14443_3A_MIFARE_CLASSIC_4K`, `ISO_14443_3A_MIFARE_ULTRALIGHT`, `ISO_14443_3B_ST25_SRT512`, `INNOVATRON_B_PRIME`, `FELICA`, `ISO_15693`, `UNKNOWN`.

> **`CardType` granularity and A/B asymmetry with `RfTechnology`**: `RfTechnology` is an **input** (polling) that merges A and B at the ISO 14443 level; `CardType` is an **output** that combines protocol level and product identity — a single `ISO_14443_4` value for the transport, but a product granularity (`ISO_14443_3A_…`, `ISO_14443_3B_…`) for proprietary products.
>
> **`CardType.UNKNOWN`** is returned when the card type could not be identified; used as a selection filter, it allows these cards to be **captured explicitly**.

### 7.3 Reader API — strict typing

- **Removed**: `CardSelector.filterByCardProtocol(String logicalProtocolName)`.
- **Added**: the `cardType: CardType? = null` property of the `BasicCardSelector` and `IsoCardSelector` selectors — filters by card type (`null` disables the filter).
- **Removed entirely**: the `ConfigurableCardReader` interface and its operations `activateProtocol(String, String)`, `deactivateProtocol(String)`, `getCurrentProtocol()`.

### 7.4 Reader API — detection settings

All detection information is grouped in the **data class** `CardDetectionSettings`, built directly by the application:

| Property | Type | Default value | Role |
|---|---|---|---|
| `detectionMode` | `DetectionMode` | `DetectionMode.REPEATING` | whether detection resumes after each card processing |
| `rfTechnologies` | `Set<RfTechnology>` | `setOf(RfTechnology.ISO_14443_AB)` | RF technologies activated during polling (no effect on a contact reader) |
| `ecpFrame` | `ByteArray?` | `null` | ECP frame emitted when polling starts (ECP readers only) |

- `DetectionMode` becomes a **top-level** enumeration of the `reader` namespace (it was nested in `ObservableCardReader`).
- **Tolerance of unsupported settings**: a setting not supported by the reader (RF technology, ECP frame) is **silently ignored** and a `WARN`-level message is typically logged; **no error** is raised.

> **Change compared with the previous working version of this document**: `CardDetectionSettings` is no longer a "builder" interface obtained through `ReaderApiFactory.createCardDetectionSettings()`, but a data class with default values (see Theme 10).

### 7.5 Reader API — `ObservableCardReader` and selection result

- `startCardDetection(settings: CardDetectionSettings, eventHandler: CardReaderEventHandler) → Unit` carries the event handler and the detection configuration in a single call.
- The detected card type is exposed by the **`cardType: CardType`** property of the selection results (`SingleCardSelectionResult`, `MultipleCardSelectionResult`, `MultichannelCardSelectionResult`, see Theme 9); `UNKNOWN` if the type could not be identified.

### 7.6 Rationale

- **Compile-time safety for values**: moving from strings to enumerations eliminates a class of bugs and makes the API self-describing.
- **Simplicity**: a single `ObservableCardReader`, a single detection settings class.
- **Extensibility**: adding a polling setting amounts to adding a property with a default value to `CardDetectionSettings`, without touching the `startCardDetection` signature.
- **Input / output separation**: `RfTechnology` as input (polling), `CardType` as output (result) and as a selection criterion.
- **Single, typed declaration**: in production, the protocol had to be declared twice (`activateProtocol` on the reader side, `filterByCardProtocol` on the selector side); it is now declared only once, in a typed way.
- **Cross-cutting reusability** thanks to the extraction of the enumerations into the Terminal Reader Definitions API.

---

## 8. Theme 7 — Command identification (`commandId`)

### 8.1 Motivation

Several APIs allow **several commands to be prepared** before executing them as a batch. In production, the application had no direct means of identifying **which command** caused a problem, nor of accessing the **result of a specific command**; some APIs relied on mutable container objects for this purpose (`KeyPairContainer`, `SearchCommandData.getMatchingRecordNumbers()`, `SignatureComputationData.getSignature()`, etc.).

The new versions generalise a single mechanism: an **integer identifier `commandId` supplied by the application** when preparing the command, then used to retrieve the result of the command or to identify the failing command. The `commandId` parameter, **always placed first**, follows the same convention as `selectionId` in the Reader API (see Theme 9).

> The name `commandId` replaces `idCommand` from the previous working version of this document, for consistency with `selectionId`.

### 8.2 Generic Card API

- `prepareCommandWithId(commandId: Int, apdu: ByteArray) → Self`;
- `prepareCommandWithMaxDuration(commandId: Int, apdu: ByteArray, maxDuration: Long) → Self` (see Theme 2);
- `getLastExecutionResponse(commandId: Int) → ByteArray?` — response of the identified command; if several commands share the same identifier, the most recently processed one is returned.
- `prepareCommand(apdu: ByteArray) → Self` remains available for unidentified commands.

### 8.3 Storage Card API

- `prepareWriteBlocks(commandId: Int, fromBlockAddress: Int, data: ByteArray) → Self`;
- `prepareSt25WriteSystemBlock(commandId: Int, data: ByteArray) → Self`.

For these two write operations, **`commandId` is mandatory** (non-nullable). It is returned by the `commandId: Int?` property of the Storage Card API errors when the identified command caused them (`null` for commands that carry none, such as reads).

### 8.4 Calypso Card API

- `prepareSearchRecords(commandId: Int, data: SearchCommandData) → Self`;
- `CalypsoCard.getMatchingRecordNumbers(commandId: Int) → List<Int>?` — numbers of the records found by the identified search. This operation replaces `SearchCommandData.getMatchingRecordNumbers()` (see Theme 11).

### 8.5 Legacy SAM API

The results of the cryptographic commands are no longer read from container objects but from the `LegacySam`, by identifier:

| Preparation | Reading the result |
|---|---|
| `FreeTransactionManager.prepareGenerateCardAsymmetricKeyPair(commandId: Int)` | `LegacySam.getKeyPair(commandId: Int) → ByteArray?` |
| `FreeTransactionManager.prepareComputeCardCertificate(commandId: Int, data: LegacyCardCertificateComputationData)` | `LegacySam.getComputedCardCertificate(commandId: Int) → ByteArray?` |
| `prepareComputeSignature(commandId: Int, data: SignatureComputationData)` (on `FreeTransactionManager` and `CardTransactionLegacySamExtension`) | `LegacySam.getSignature(commandId: Int) → ByteArray?` and, in traceable mode, `LegacySam.getSignedData(commandId: Int) → ByteArray?` |
| `prepareVerifySignature(commandId: Int, data: SignatureVerificationData)` (same) | `LegacySam.isSignatureValid(commandId: Int) → Boolean?` |

These reads replace `KeyPairContainer.getKeyPair()`, `LegacyCardCertificateComputationData.getCertificate()`, `SignatureComputationData.getSignature()`, `TraceableSignatureComputationData.getSignedData()` and `SignatureVerificationData.isSignatureValid()`.

### 8.6 Rationale

- **Application semantics**: the identifier is **chosen by the application**, which can align it with its own business logic.
- **Immutable data objects**: the parameters of a command become pure data (see Theme 10); the result is carried by the live object that receives the responses (`CalypsoCard`, `LegacySam`, transaction manager), like all the other data coming from the card.
- **Cross-API consistency**: the same pattern (identifier first, read by identifier) applies to all the APIs concerned.

---

## 9. Theme 8 — Standardised reader discovery and access (`CardReaderProvider`)

### 9.1 Motivation

In production, the Reader API exposed no standard means of **discovering** the available readers or of **obtaining a reference to a reader**. The application had to rely on the plugin and pool abstractions of the underlying Keyple framework, which are implementation-specific and not portable.

### 9.2 Reader API

- **New operation** `ReaderApiFactory.getCardReaderProvider() → CardReaderProvider` — returns the `CardReaderProvider` of the execution environment; successive calls return the same instance.
- **New interface** `CardReaderProvider`:
  - `getReaderNames() → Set<String>`;
  - `getReaders() → Set<CardReader>`;
  - `getReader(readerName: String) → CardReader?` — exact name match, `null` if no reader matches;
  - `findReader(readerNameRegex: String) → CardReader?` — first reader whose name matches the regular expression, `null` otherwise.

The reader lifecycle remains driven by the execution environment; `CardReaderProvider` is a **read-only view** of the readers active at each call.

### 9.3 Rationale

- **Decoupling from Keyple implementation concepts**: the application only knows the Reader API.
- **First-class citizen of the public API** for a universal need.
- **Two complementary search modes**: exact name and regular expression.

---

## 10. Theme 9 — Redesign of the card selection model

### 10.1 Motivation

In production, the `CardSelectionManager` gathered all selection modes, driven by a side effect (`setMultipleSelectionMode()`), and returned a single `CardSelectionResult` in which some properties could be deduced from others (`getActiveSmartCard()` and `getActiveSelectionIndex()` from `getSmartCards()`). Adding multi-channel made this single result ambiguous (which card is "the" active card when several are active?). The previous working version of this document proposed a `SelectionExecutionPolicy` parameter; this approach has been abandoned in favour of **one manager type per selection mode**.

### 10.2 Reader API — one manager per mode

The selection mode is no longer a parameter: it is carried by the **type of the manager**, each obtained through its own factory operation and producing its own result type.

| Manager | Behaviour | Execution | Result |
|---|---|---|---|
| `SingleCardSelectionManager` | single-channel; stops at the first successful selection | explicit or scheduled | `SingleCardSelectionResult` |
| `MultipleCardSelectionManager` | single-channel; processes every selection, whatever the intermediate successes | explicit or scheduled | `MultipleCardSelectionResult` |
| `MultichannelCardSelectionManager` | multi-channel ISO 7816-4 cards; each successful selection occupies its own logical channel | explicit | `MultichannelCardSelectionResult` |

- **Factory**: `createCardSelectionManager()` is replaced by `createSingleCardSelectionManager()`, `createMultipleCardSelectionManager()` and `createMultichannelCardSelectionManager()`.
- **`CardSelectionManager`** becomes the common interface and only keeps the mode-independent operations:
  - `prepareSelection(selectionId: Int, cardSelector: CardSelector, cardSelectionExtension: CardSelectionExtension) → Self` — the selection identifier is **chosen by the application** (instead of an index returned by the API); it must be unique within the scenario; selections are executed in preparation order;
  - `exportCardSelectionScenario() → String`;
  - `importCardSelectionScenario(cardSelectionScenario: String) → Self` — **replaces** the current scenario (instead of returning the index of the last imported selection);
  - `exportProcessedCardSelectionScenario() → String`.
- **Operations specific to each manager** (typed by their result): `processCardSelectionScenario`, `scheduleCardSelectionScenario` and `parseScheduledCardSelectionsResponse` (single-channel only), `importProcessedCardSelectionScenario` (the imported processed scenario must come from a manager of the same type).
- `scheduleCardSelectionScenario(observableCardReader: ObservableCardReader, cardPresenceNotificationPolicy: CardPresenceNotificationPolicy) → Unit` no longer has an execution policy parameter.

#### Selection results

| Result | Properties |
|---|---|
| `SingleCardSelectionResult` | `cardType: CardType`, `selectionId: Int?`, `smartCard: SmartCard?` (both `null` if no selection succeeded) |
| `MultipleCardSelectionResult` | `cardType: CardType`, `smartCards: Map<Int, SmartCard>`, `activeSelectionId: Int?` (only the card of the last successful selection remains active) |
| `MultichannelCardSelectionResult` | `cardType: CardType`, `smartCards: Map<Int, SmartCard>` (all active, one per channel) |

`CardSelectionResult` (with `getSmartCards()`, `getActiveSmartCard()`, `getActiveSelectionIndex()`) and `SelectionExecutionPolicy` disappear.

#### Selectors

- `BasicCardSelector` and `IsoCardSelector` become **data classes** built directly by the application (instead of "builder" interfaces created by `ReaderApiFactory.createBasicCardSelector()` / `createIsoCardSelector()`, which are removed):
  - `BasicCardSelector`: `cardType: CardType? = null`, `powerOnDataRegex: String? = null`;
  - `IsoCardSelector`: the same, plus `dfName: ByteArray? = null`, `fileOccurrence: FileOccurrence = FileOccurrence.FIRST`, `fileControlInformation: FileControlInformation = FileControlInformation.FCI`.
- `CardSelector<T>` becomes a **sealed interface** without members, whose only implementations are these two selectors.
- The intermediate interface `CommonIsoCardSelector<T>` is removed; its nested enumerations become `FileOccurrence` and `FileControlInformation` (namespace `reader.selection`).
- `filterByDfName(String)` (AID in hexadecimal) is removed: `dfName` is a `ByteArray`.

### 10.3 Rationale

- **No side effect**: the selection mode is set when the manager is created.
- **Unambiguous results**: each result only exposes what makes sense in its mode; deducible properties and the "channel 0 card" / "first active index" contradiction disappear.
- **Identifiers chosen by the application**, consistent with `commandId` (Theme 7).
- **Naming**: *Single* and *Multiple* designate the number of successful selections kept in the result, not a number of cards; all the selections of a scenario target the same card.

---

## 11. Theme 10 — Implementation-language-independent specification

### 11.1 Motivation

The Terminal APIs were until now defined by Java interfaces. This model de facto tied the APIs to the JVM and hindered their implementation in other environments (native mobile applications, embedded systems, non-Java terminals). The new design proposal aims to **broaden the choice of implementation languages**: **Kotlin Multiplatform (KMP)**, **Rust**, **Swift**, **C#**, etc., in addition to Java. The new specifications are therefore written in a **language-independent notation**, inspired by Kotlin, so that each binding translates the contract into the most idiomatic form of its platform. This notation entails systematic changes of form, described below; **most of them do not affect behaviour**, but all of them affect the way calling code is written.

### 11.2 Notation principles

| Principle | In production (Java) | In the specifications | Examples |
|---|---|---|---|
| **Basic types** | `byte`, `short`, `int`, `long`, `boolean`, `byte[]`, `Integer`… | `Byte`, `Short`, `Int`, `Long`, `Boolean`, `ByteArray`, `Int?`… (*Data types* table of each spec) | — |
| **Explicit nullability** | `null` values documented in the Javadoc | `T?` type; otherwise the value is never `null` | `getFileBySfi(sfi: Byte) → ElementaryFile?` |
| **Fluent chaining** | recursive genericity `T extends X<T>` | **`Self`** return type; no more recursive genericity | `TransactionManager.prepareReadRecords(...) → Self` |
| **Data classes** | "builder" interfaces (setters) or read interfaces (getters), created by the factory | immutable **data classes** with properties (`val`) and default values, built directly by the application; the corresponding `create…` operations disappear from the factory | `SearchCommandData`, `BasicCardSelector`, `CardDetectionSettings`, `ApduRequest` |
| **Enumerations** | enumerations nested in an interface | **top-level** enumerations, named autonomously | `CardReaderEvent.Type` → `CardReaderEventType` |
| **Data specific to an enumeration value** | methods of the enumeration | **properties** of the enumeration | `StorageCardProductType.blockSize` |
| **Closed types** | open generic interface | **sealed interface** | `CardSelector`, `SignatureComputationData`, `SignatureVerificationData` |
| **Interfaces without operations** | empty interface | **marker interface** | `ScheduledCardSelectionsResponse`, `CardSelectionExtension` |
| **Errors** | `…Exception` classes (checked or unchecked) | errors named **without suffix**, carrying `message: String` and `cause: Any?` | `CardCommunicationException` → `CardCommunication` |
| **Technical suffixes** | `…Spi`, `…Api` on the data types of the Card API and the crypto APIs | removed for **data**; kept for contract interfaces | `ApduRequestSpi` → `ApduRequest`, `SvCommandSecurityDataApi` → `SvCommandSecurityData` |
| **Unique operation names** | overloads (same name, different parameters) | **one unique name per operation** within an interface and its hierarchy; `By…`, `With…`, `For…` suffixes | `prepareSelectFile` → `prepareSelectFileByLid` / `prepareSelectFileByControl` |
| **Universal type** | `Object`, `Throwable` | `Any` | `onReaderError(context, readerName, error: Any)` |
| **Reflection** | `Class<E>` | removed | `getCryptoExtension(Class<E>)` → `getCryptoExtension()` (see Theme 14) |
| **Serialisation** | `extends Serializable` | removed from the notation | `ApduResponseApi`, `CardResponseApi` |

### 11.3 Normative contracts

Each operation is now described by a normative table that specifies:

- its **signature**, its introduction version (*Since*) and its **description**;
- its **pre-conditions**, each prefixed by its nature, which determines the error raised if it is not met: *Argument* (invalid argument, including a value outside the bounds of the card or SAM protocol), *Range* (position outside the bounds of a collection or memory image exposed by the API), *State* (illegal state), *Capability* (unsupported operation);
- its **errors**, i.e. the situations a correct caller must handle;
- **cross-references** to related operations and types.

The specifications also define common rules (non-`null` results unless stated otherwise, empty collections rather than `null`, instances not shared between threads, default parameter values) as well as, for the Card API and the crypto APIs, **conformance clauses** that establish the correspondence between their types and those of the Reader API or the Calypso Card API (for example, any object implementing `ProxyReaderApi` must also implement `CardReader`).

### 11.4 Rationale

- **Portability**: the contract no longer imposes any Java-specific mechanism (reflection, recursive genericity, overloads); it can be transposed into any language, including those without overloading or class inheritance (Rust in particular), which paves the way for implementations in Kotlin Multiplatform, Rust, Swift or C#.
- **Robustness**: explicit nullability and immutable data eliminate invalid states (incomplete "builder" object, unexpected `null` value).
- **Precision**: typed pre-conditions and errors listed per operation make the contract verifiable.
- **Java binding**: the way the Java binding will implement these principles (data classes, `Self`, default values) is part of the alignment of the Keypop modules (see §19.3) and of the migration guide.

---

## 12. Theme 11 — Data exposed without computation and access to raw data

### 12.1 Motivation

Several data types of the production versions mixed **data** and **computations** (decoding a counter from a record, selecting a parameter by number), exposed both a raw value and its decoded fields, or served both as input and output. The specifications apply three rules:

1. **no computational operation** on a data type: such computations are performed by the live object that holds the data (`CalypsoCard`, `LegacySam`);
2. **no field deducible** from other fields in a data class;
3. **no input/output object**: inputs are parameters, outputs are returned values.

### 12.2 Calypso Card API

- **`FileData` is removed**, together with its operations `getContent()`, `getContent(numRecord)`, `getContent(numRecord, dataOffset, dataLength)`, `getAllRecordsContent()`, `getContentAsCounterValue(numCounter)` and `getAllCountersValue()`:
  - the records are exposed directly by the `ElementaryFile.records: SortedMap<Int, ByteArray>` property (instead of `ElementaryFile.getData()`);
  - counter values are obtained through `CalypsoCard.getCounterValuesBySfi(sfi: Byte) → SortedMap<Int, Int>?` and `CalypsoCard.getCounterValuesByLid(lid: Short) → SortedMap<Int, Int>?`.
- **`DirectoryHeader`**: `getKif(WriteAccessLevel)` and `getKvc(WriteAccessLevel)` become the properties `kifByAccessLevel: Map<WriteAccessLevel, Byte>` and `kvcByAccessLevel: Map<WriteAccessLevel, Byte>`.
- **`SearchCommandData`** becomes an input data class (`sfi`, `searchData`, `startAtRecord = 1`, `offset = 0`, `repeatedOffset = false`, `mask: ByteArray? = null`, `fetchFirstMatchingResult = false`); the result is read through `CalypsoCard.getMatchingRecordNumbers(commandId)` (see Theme 7); `CalypsoCardApiFactory.createSearchCommandData()` disappears.
- **`SvLoadLogRecord` and `SvDebitLogRecord`** become data classes without the `rawData` property, which is redundant with the decoded fields. The raw values remain accessible through three new `CalypsoCard` operations: `getSvLoadLogRecordRawData() → ByteArray?`, `getSvDebitLogLastRecordRawData() → ByteArray?` and `getSvDebitLogAllRecordsRawData() → List<ByteArray>`; each returned decoded object is the decoding of the raw value at the moment of the call.
- `DirectoryHeader`, `ElementaryFile` and `FileHeader` become data classes.

### 12.3 Legacy SAM API

- **`KeyParameter`** becomes the **`KeyParameters`** data class, renamed to the plural like the `getSystemKeyParameters` / `getWorkKeyParameters…` getters that return it (`kif`, `kvc`, `algorithm`, `parameterValues: SortedMap<Int, Byte>`), without `rawData`; `getParameterValue(parameterNumber)` is replaced by the `parameterValues` property. The raw values are accessible through `LegacySam.getSystemKeyParametersRawData(systemKeyType)`, `getWorkKeyParametersRawDataByRecordNumber(recordNumber)` and `getWorkKeyParametersRawDataByKifKvc(kif, kvc)`.
- **`SamParameters`** is removed: `LegacySam.getSamParameters()` directly returns `ByteArray?`.
- **Counters**: `getCounter(counterNumber)` and `getCounterCeiling(counterNumber)` are removed (the `getCounters()` and `getCounterCeilings()` tables are sufficient); `getCounterIncrementAccess(counterNumber)` is replaced by `getCounterIncrementAccesses() → SortedMap<Int, CounterIncrementAccess>`.
- **Command data**: `LegacyCardCertificateComputationData`, `BasicSignatureComputationData`, `TraceableSignatureComputationData`, `BasicSignatureVerificationData` and `TraceableSignatureVerificationData` become input data classes (properties and default values instead of setters; `withSamTraceabilityMode(offset, mode)` becomes `samTraceabilityMode` / `traceabilityOffset`, `withoutBusyMode()` becomes `busyMode = false`); their results are read from the `LegacySam` by `commandId` (see §8.5). `KeyPairContainer` is removed. The `create…Data()` and `createKeyPairContainer()` operations disappear from `LegacySamApiFactory`.
- **`SecuritySetting`** becomes the **`SecuritySettings`** data class (`samReader`, `controlSam`), renamed to the plural like the security settings of the Calypso Card API, instead of `setControlSamResource(samReader, controlSam)`; `LegacySamApiFactory.createSecuritySetting()` disappears.

### 12.4 Card API

- **`ApduResponse`** only keeps `apdu` (and `apduExchangeDuration`): `getDataOut()` and `getStatusWord()` are removed, as they can be deduced from `apdu`.
- `ApduRequestSpi`, `CardRequestSpi`, `CardSelectionRequestSpi`, `ApduResponseApi`, `CardResponseApi` and `CardSelectionResponseApi` become the data classes `ApduRequest`, `CardRequest`, `CardSelectionRequest`, `ApduResponse`, `CardResponse` and `CardSelectionResponse`. Default values are explicit: `successfulStatusWords = setOf(0x9000)`, `successfulSelectionStatusWords = setOf(0x9000)`, `info = null`, `cardRequest = null`.

### 12.5 Crypto Symmetric API

- **`SvCommandSecurityDataApi`** (input/output object) is replaced:
  - the inputs become parameters: `computeSvCommandSecurityData(svGetRequest: ByteArray, svGetResponse: ByteArray, svCommandPartialRequest: ByteArray) → SvCommandSecurityData`;
  - the output is the `SvCommandSecurityData` data class (`serialNumber`, `transactionNumber`, `terminalChallenge`, `terminalSvMac`, non-nullable).
- `createCardTransactionManager(..., transactionAuditData: MutableList<ByteArray>)`: the audit list is explicitly **mutable** (the crypto module appends its data to it).
- `cipherPinForPresentation` and `cipherPinForModification` take non-nullable `kif: Byte` and `kvc: Byte` (instead of boxed `Byte`).

### 12.6 Crypto Asymmetric API

- **`CaCertificateContentSpi`** becomes the `CaCertificateContent` data class; the `isAidCheckRequested` property is removed, as it can be deduced from `aid` (`null` when the AID check is not requested).
- **`CardPublicKeySpi`** is removed: the card public key is a `ByteArray` (`CardCertificateSpi.checkCertificateAndGetPublicKey(...) → ByteArray`, `AsymmetricCryptoCardTransactionManagerSpi.initTerminalPkiSession(cardPublicKey: ByteArray)`).
- A **conformance clause** establishes the correspondence between the SPIs of this API and the marker interfaces of the Calypso Card API (`PcaCertificate`, `CaCertificate`, `CardCertificate`, the parsers and the factory).

### 12.7 Rationale

- **An API describes data and behaviours, not decoding algorithms**: computations on data remain the responsibility of the object that holds them.
- **No double truth**: a deducible field can diverge from its source; removing it eliminates the risk.
- **Raw access preserved** where it has a real use (transmission to the back office, re-injection of key parameters into transfer commands).

---

## 13. Theme 12 — Stored Value (SV) operations

### 13.1 Motivation

The Calypso card specification defines three SV commands — *Reload*, *Debit* and *Undebit* — preceded by an *SV Get* command, one parameter of which indicates the targeted operation: *Reload* or *Debit/Undebit*. The production model additionally introduced a DO/UNDO notion (`SvAction`) that does not exist for reloading and hid the undebit behind `prepareSvDebit`.

### 13.2 Calypso Card API

- **`SvAction` is removed**.
- `prepareSvGet(svOperation: SvOperation) → Self` — only takes the operation.
- **`SvOperation.DEBIT` is renamed `DEBIT_UNDEBIT`**, in accordance with the card specification; `RELOAD` is unchanged.
- **New operation** `prepareSvUndebit(amount: Int, date: ByteArray, time: ByteArray) → Self` — cancels, totally or partially, a previous debit; amount in `0..32768`.
- `prepareSvDebit(amount: Int, date: ByteArray, time: ByteArray) → Self` — now only performs the debit; amount in `0..32767`.
- `prepareSvReload(amount: Int, date: ByteArray, time: ByteArray, free: ByteArray) → Self` — amount in `-8388608..8388607` (a negative reload is expressed directly by a negative amount).
- **The overloads without data** `prepareSvDebit(int)` and `prepareSvReload(int)` are removed: all parameters are **mandatory and non-nullable**; the `date`, `time` and `free` fields (2 bytes each) are recorded in the SV log.
- Each command requires a prior *SV Get* prepared with the corresponding operation (`DEBIT_UNDEBIT` for debit and undebit, `RELOAD` for reload).

### 13.3 Rationale

The model now follows the card specification exactly: three commands, two *SV Get* contexts. The `amount` range and the log data are explicit in each operation.

---

## 14. Theme 13 — Tolerance of a missing file (`6A82h`) in a secure session

### 14.1 Motivation

All Calypso cards now tolerate the `6A82h` status word (*File Not Found*) in a secure session for read commands (*Select File*, *Get Data*, *Read Binary*, *Read Records*, *Read Record Multiple*, *Search Record Multiple*).

### 14.2 Calypso Card API

- **Reads** (`prepareReadBinary`, `prepareReadCounter`, `prepareReadRecords`): processing no longer fails if the targeted file is missing, **inside a secure session as well as outside**; the `CalypsoCard` is simply not filled. The other anomalies (invalid offset, missing record or counter) keep the two modes *best-effort* (outside a session) and *strict* (inside a session).
- **File selection** (`prepareSelectFileByLid`, `prepareSelectFileByControl`): a missing file no longer causes processing to fail, inside a session or not.
- **The `SelectFileException` error is removed**.
- The in-session usage restrictions of `prepareGetData`, `prepareReadRecord`, `prepareReadRecordsPartially` and `prepareSearchRecords` are **unchanged**.

---

## 15. Theme 14 — Crypto extensions and command interleaving

### 15.1 Motivation

During a card transaction, the application must be able to access the specific operations of the crypto module (for example signature computation by a SAM) in order to **interleave** card commands and crypto commands within the same transaction. The crypto extension is the instance created, for the current transaction, by the crypto module factory attached to the security setting.

### 15.2 Calypso Card API

- `<E extends CardTransactionCryptoExtension> E getCryptoExtension(Class<E> cryptoExtensionClass)` becomes **`getCryptoExtension() → CardTransactionCryptoExtension`**:
  - the operation returns **the instance created for this transaction**; successive calls return the same instance;
  - commands prepared through the extension join the **same queue** as the card commands, in call order, and are processed by the same `processCommands()`;
  - the caller converts the instance to the concrete type defined by the crypto module in use (for example `CardTransactionLegacySamExtension`).

### 15.3 Legacy SAM API

- `CardTransactionLegacySamExtension.prepareComputeSignature(commandId, data)` and `prepareVerifySignature(commandId, data)` follow the `commandId` model (see §8.5).

### 15.4 Rationale

The `Class<E>` parameter only existed to work around the JVM's type erasure; it has no equivalent in other languages (Rust in particular). The chosen signature is **identical in all bindings**, and the identity clause guarantees that the obtained extension is indeed the one sharing the transaction's command queue.

---

## 16. Normative clarifications

The specifications also bring clarifications that do not change signatures but specify the contract:

- **Card API — APDU construction rules**: commands must strictly comply with ISO/IEC 7816-3; a case 4 command must include the `Le` field, for which the value `00h` is **recommended** (it was previously presented as mandatory).
- **Card API — limitations**: the transmission of the *Select Application* by DF name command (reserved to the `CardSelectionRequest`) and of the *Get Response* command (status words `61XYh` and `6CXYh` are handled automatically by the reader implementation) cannot be requested.
- **Card API — anti-relay**: the APDU exchange execution-time control mechanism is explicitly presented as an anti-relay countermeasure solution (see Theme 2).
- **Reader API — `SmartCard` lifecycle**: now normative (see §2.3.2).
- **All APIs — pre-condition natures**: an explicit criterion distinguishes *Range* (position in a collection or memory image exposed by the API) from *Argument* (any other invalid value, including values bounded by the card or SAM protocol).
- **Storage Card API — scope**: the *Scope* section explicitly lists the supported products (MIFARE Ultralight, MIFARE Classic 1K, MIFARE Classic 4K, ST25 SRT512), identified by the values of `StorageCardProductType`.

---

## 17. Elements under study

The following elements appear in grey in the Legacy SAM API diagram; they are **not** part of the normative scope submitted for validation:

- `LegacySamApiFactory.createSecureReadTransactionManager(samReader, sam, securitySettings)` and the `SecureReadTransactionManager` interface;
- `FreeTransactionManager.preparePlainLoadWorkKey(...)` and `preparePlainExportWorkKey(...)`;
- `LegacySamSelectionExtension.prepareReadCaadRecord(...)` / `prepareReadCaadRecords(...)` and their equivalents on `ReadTransactionManager`;
- `SecureWriteTransactionManager.prepareWriteCaadRecord(...)`.

---

## 18. Migration procedure

Migrating application code from the production versions to the new versions will be covered by a **dedicated technical migration guide**, published separately after validation by the TC Terminal and after alignment of the associated Keypop Java implementations.

This guide will aim to **simplify the transition as much as possible**: 1:1 mapping of removed / renamed / redesigned elements (of which Annex A is the basis), rewriting patterns (`before` / `after`) for the most common use cases, progressive adoption rules and known pitfalls. It will also describe the **Java implementation** of the notation principles of Theme 10 (data classes, `Self`, default values, nullability).

---

## 19. Next steps and validation by the TC Terminal

### 19.1 Scope submitted for validation

This document submits to the validation of the **CNA TC Terminal**:

1. **The principle** of the fourteen evolution themes (§2 to §15) and the overall consistency of the work (versions 3.0.0 for Reader / Card / Calypso Card, 1.0.0 for Definitions, 2.0.0 for Legacy SAM / Generic Card / Storage Card, 0.2.0 for Crypto Symmetric, 0.3.0 for Crypto Asymmetric).
2. **The design choices** documented in the "Rationale" sections, in particular:
  - the explicit multi-channel model relying on the `SmartCard(Spi)` as the named target and the three-level hierarchy of transaction managers (§2);
  - duration bounding at the APDU, Calypso session and generic command levels, with CSN-based and FCI-based settings (§3);
  - the merge of the Observer pattern into a single `CardReaderEventHandler` SPI (§4);
  - the `SecureSessionState` enumeration (§5);
  - the extraction of `RfTechnology` and `CardType` into the Terminal Reader Definitions API and the `CardDetectionSettings` detection settings (§7);
  - the generalised `commandId` model (§8);
  - standardised reader discovery through `CardReaderProvider` (§9);
  - the **hierarchy of selection managers per mode** and the three result types (§10);
  - the **language-independent notation** and its principles, which aim to broaden the choice of implementation languages (KMP, Rust, Swift, etc.) (§11);
  - **data without computation** and access to raw data (§12);
  - the SV model aligned with the card specification (§13);
  - the tolerance of a missing file in a session (§14);
  - access to the crypto extension with an identity clause (§15).
3. **The detailed content of the nine specifications** and their diagrams (see [Reference documents](#reference-documents)).
4. **The introduction** of the new Reader Definitions foundation API.
5. **The principle** of a dedicated migration procedure (see §18).

### 19.2 Points of attention for the review

- the **stability of the initial content** of the `RfTechnology` and `CardType` enumerations (§7.2), in particular the representation of ISO 14443-4 by a single `ISO_14443_4` value;
- the **complete removal** of `ConfigurableCardReader` without a deprecation phase (§7.3);
- the Calypso **duration bound resolution rule**: priority of CSN-based over FCI-based settings, `Long.MAX_VALUE` as the deferral value, portable subset of regular expressions (§3.3);
- the **enforcement of the Calypso duration bounds** (§3.1, §3.3): both what is measured (the relevant command exchange alone) and the consequence of an overrun (automatic cancellation of an open session, error propagation outside a session) are now specified;
- the **three-level gradation** of transaction managers (§2.2);
- the **replacement of overloads** by unique operation names (§11.2), which changes many operation names for Java integrators;
- the **replacement of "builder" interfaces** by data classes (§11.2, §12), whose Java implementation remains to be defined;
- the **change from `SvOperation.DEBIT` to `DEBIT_UNDEBIT`** and the removal of the SV overloads without data (§13).

### 19.3 Next steps

Once the versions have been validated by the TC Terminal:

1. **Finalisation of the specifications**: moving the repositories from their `…-SNAPSHOT` versions to their final versions; removal or specification of the elements under study (§17).
2. **Creation of the new Java module** `keypop-reader-definitions-jvm-api`, and **alignment of the existing Keypop Java modules** (`keypop-reader-java-api`, `keypop-card-java-api`, `keypop-calypso-card-java-api`, `keypop-calypso-crypto-legacysam-java-api`, `keypop-calypso-crypto-symmetric-java-api`, `keypop-calypso-crypto-asymmetric-java-api`, `keypop-genericcard-jvm-api`, `keypop-storagecard-java-api`) with their new versions.
3. **Writing and publication of the technical migration guide** (see §18).
4. **Communication** of the availability of the new versions to integrators and to the CNA working groups concerned.

---

## Annex A — Detailed mapping per API

This annex lists, for each API, what becomes of each element of the Java versions in production. **Unchanged** elements (apart from the move to the Theme 10 notation: basic types, `Self`, explicit nullability) are not listed. The "after" signatures are expressed in the specification notation.

### A.1 Terminal Reader API (Java 2.1.0 → 3.0.0)

| Element in production | What it becomes |
|---|---|
| `ReaderApiFactory.createCardSelectionManager()` | Removed → `createSingleCardSelectionManager()`, `createMultipleCardSelectionManager()`, `createMultichannelCardSelectionManager()` |
| `ReaderApiFactory.createBasicCardSelector()`, `createIsoCardSelector()` | Removed (selectors = data classes) |
| — | Added: `ReaderApiFactory.getCardReaderProvider() → CardReaderProvider`; `CardReaderProvider` interface |
| `ConfigurableCardReader` (`activateProtocol`, `deactivateProtocol`, `getCurrentProtocol`) | Removed |
| `ObservableCardReader.setReaderObservationExceptionHandler`, `addObserver`, `removeObserver`, `clearObservers`, `countObservers` | Removed |
| `ObservableCardReader.startCardDetection(DetectionMode)` | → `startCardDetection(settings: CardDetectionSettings, eventHandler: CardReaderEventHandler)` |
| `ObservableCardReader.finalizeCardProcessing()` | → `endCardProcessing()` |
| — | Added: `ObservableCardReader.clearScheduledCardSelectionScenario()` |
| `ObservableCardReader.DetectionMode` (`REPEATING`, `SINGLESHOT`) | → `DetectionMode` (`REPEATING`, `SINGLE_SHOT`) |
| `ObservableCardReader.NotificationMode` | → `CardPresenceNotificationPolicy` (namespace `reader.selection`) |
| `CardReaderEvent` (interface) | → `CardReaderEvent` data class (`readerName`, `type`, `scheduledCardSelectionsResponse?`) |
| `CardReaderEvent.Type` (`…`, `UNAVAILABLE`) | → `CardReaderEventType` (`…`, `READER_UNREGISTERED`) |
| `ChannelControl` | Removed |
| `CardCommunicationException`, `ReaderCommunicationException`, `InvalidCardResponseException` | → `CardCommunication`, `ReaderCommunication`, `InvalidCardResponse` |
| `ReaderProtocolNotSupportedException` | Removed |
| `reader.selection.InvalidCardResponseException` | Removed (duplicate) |
| `CardSelectionManager.setMultipleSelectionMode()`, `prepareReleaseChannel()` | Removed |
| `CardSelectionManager.prepareSelection(CardSelector<?>, CardSelectionExtension) → int` | → `prepareSelection(selectionId: Int, cardSelector: CardSelector, cardSelectionExtension: CardSelectionExtension) → Self` |
| `CardSelectionManager.importCardSelectionScenario(String) → int` | → `importCardSelectionScenario(cardSelectionScenario: String) → Self` (replaces the scenario) |
| `CardSelectionManager.processCardSelectionScenario(CardReader)` | → `processCardSelectionScenario(reader)` on `SingleCardSelectionManager` / `MultipleCardSelectionManager`; `processCardSelectionScenario(reader, channelSelectionPolicy)` on `MultichannelCardSelectionManager` |
| `CardSelectionManager.scheduleCardSelectionScenario(ObservableCardReader, NotificationMode)` | → `scheduleCardSelectionScenario(observableCardReader, cardPresenceNotificationPolicy)` on the single-channel managers |
| `CardSelectionManager.parseScheduledCardSelectionsResponse(...)` | → on the single-channel managers, returns the typed result |
| `CardSelectionManager.importProcessedCardSelectionScenario(String)` | → on each manager, returns the typed result |
| `CardSelectionResult` (`getSmartCards`, `getActiveSmartCard`, `getActiveSelectionIndex`) | Removed → `SingleCardSelectionResult`, `MultipleCardSelectionResult`, `MultichannelCardSelectionResult` |
| — | Added: `ChannelSelectionPolicy` |
| `CardSelector<T>` (`filterByCardProtocol`, `filterByPowerOnData`) | → sealed interface `CardSelector`; `filterByCardProtocol` removed; `filterByPowerOnData` → `powerOnDataRegex` property; `cardType` property added |
| `BasicCardSelector` (interface) | → data class (`cardType?`, `powerOnDataRegex?`) |
| `CommonIsoCardSelector<T>` (`filterByDfName(byte[])`, `filterByDfName(String)`, `setFileOccurrence`, `setFileControlInformation`) | Removed → `dfName: ByteArray?`, `fileOccurrence`, `fileControlInformation` properties of `IsoCardSelector`; `filterByDfName(String)` removed |
| `CommonIsoCardSelector.FileOccurrence`, `.FileControlInformation` | → `FileOccurrence`, `FileControlInformation` |
| `IsoCardSelector` (interface) | → data class |
| `SmartCard.getPowerOnData()` | → `getPowerOnData() → String?`; `isActive() → Boolean` added |
| `IsoSmartCard.getSelectApplicationResponse()` | → `getSelectApplicationResponse() → ByteArray?`; `isBasicChannel() → Boolean` added |
| `CardReaderObserverSpi.onReaderEvent(CardReaderEvent)` | → `CardReaderEventHandler.onReaderEvent(cardReaderEvent: CardReaderEvent)` |
| `CardReaderObservationExceptionHandlerSpi.onReaderObservationError(String contextInfo, String readerName, Throwable e)` | → `CardReaderEventHandler.onReaderError(context: String, readerName: String, error: Any)` |
| `CardTransactionManager<T>.processCommands(ChannelControl) → T` | → `CardTransactionManager.processCommands() → Unit` (non-generic) |
| — | Added: `IsoCardTransactionManager`, `MultichannelCardTransactionManager` |
| — | Added: `CardDetectionSettings` data class |

### A.2 Terminal Card API (Java 2.0.1 → 3.0.0)

| Element in production | What it becomes |
|---|---|
| `ApduRequestSpi` (`getApdu`, `getSuccessfulStatusWords`, `getInfo`) | → `ApduRequest` data class (`apdu`, `successfulStatusWords = setOf(0x9000)`, `info: String? = null`) + `apduExchangeMaxDuration: Long? = null` |
| `ApduResponseApi` (`getApdu`, `getDataOut`, `getStatusWord`, `Serializable`) | → `ApduResponse` data class (`apdu`) + `apduExchangeDuration: Long?`; `getDataOut`, `getStatusWord` removed |
| `CardRequestSpi` (`getApduRequests`, `stopOnUnsuccessfulStatusWord`) | → `CardRequest` data class |
| `CardResponseApi` (`getApduResponses`, `isLogicalChannelOpen`) | → `CardResponse` data class (`apduResponses`); `isLogicalChannelOpen` removed |
| `CardSelectionRequestSpi` (`getSuccessfulSelectionStatusWords`, `getCardRequest`) | → `CardSelectionRequest` data class (`successfulSelectionStatusWords = setOf(0x9000)`, `cardRequest: CardRequest? = null`) |
| `CardSelectionResponseApi` (`getPowerOnData`, `getSelectApplicationResponse`, `hasMatched`, `getCardResponse`) | → `CardSelectionResponse` data class (same information, explicit nullability) + `channel: Int` |
| `CardSelectionExtensionSpi.getCardSelectionRequest()`, `parse(CardSelectionResponseApi)` | → `CardSelectionRequest` / `CardSelectionResponse` types |
| `SmartCardSpi` | `deactivate() → Unit` added |
| — | Added: `MultichannelSmartCardSpi` (`getChannel() → Int`) |
| `ProxyReaderApi.transmitCardRequest(CardRequestSpi, ChannelControl)`, `releaseChannel()` | Removed → `transmitCardRequest(cardRequest, smartCard)`, `transmitCardRequestAndCloseChannel(cardRequest, multichannelSmartCard)`, `closeChannel(multichannelSmartCard)` |
| `ChannelControl` | Removed |
| `AbstractApduException` (`getCardResponse`, `isCardResponseComplete`) | Removed; `cardResponse: CardResponse?` and `isCardResponseComplete: Boolean` properties carried by the APDU errors |
| `CardBrokenCommunicationException`, `ReaderBrokenCommunicationException`, `UnexpectedStatusWordException`, `ParseException` | → `CardBrokenCommunication` (also raised if the card is no longer active), `ReaderBrokenCommunication`, `UnexpectedStatusWord`, `Parse` |
| — | Added: `ApduExchangeDurationExceeded` error |

### A.3 Terminal Calypso Card API (Java 2.2.0 → 3.0.0)

| Element in production | What it becomes |
|---|---|
| `CalypsoCardApiFactory.createSearchCommandData()` | Removed |
| `CalypsoCard.getProductType() → CalypsoCard.ProductType` | → `getProductType() → CalypsoCardProductType` |
| `CalypsoCard.getDirectoryHeader()`, `getFileBySfi`, `getFileByLid`, `getSvLoadLogRecord`, `getSvDebitLogLastRecord` | → explicit nullable returns |
| — | Added: `CalypsoCard.getCounterValuesBySfi`, `getCounterValuesByLid`, `getMatchingRecordNumbers(commandId)`, `getSvLoadLogRecordRawData`, `getSvDebitLogLastRecordRawData`, `getSvDebitLogAllRecordsRawData` |
| `CalypsoCard.ProductType` | → `CalypsoCardProductType` |
| `TransactionManager.prepareDecreaseCounters(sfi, counterNumberToDecValueMap)`, `prepareIncreaseCounters(sfi, counterNumberToIncValueMap)` | → parameters renamed `decrementValues`, `incrementValues` |
| `SymmetricCryptoSecuritySetting`, `AsymmetricCryptoSecuritySetting` | → `SymmetricCryptoSecuritySettings`, `AsymmetricCryptoSecuritySettings` |
| `CalypsoCardApiFactory.createSymmetricCryptoSecuritySetting(...)`, `createAsymmetricCryptoSecuritySetting(...)` | → `createSymmetricCryptoSecuritySettings(...)`, `createAsymmetricCryptoSecuritySettings(...)`; `securitySetting` parameter → `securitySettings` in `createSecure…TransactionManager` |
| `CalypsoCardSelectionExtension.prepareSelectFile(short)` / `prepareSelectFile(SelectFileControl selectControl)` | → `prepareSelectFileByLid(lid)` / `prepareSelectFileByControl(selectFileControl)` |
| `DirectoryHeader` (interface; `getKif(level)`, `getKvc(level)`) | → data class; `kifByAccessLevel`, `kvcByAccessLevel`: `Map<WriteAccessLevel, Byte>` |
| `ElementaryFile` (interface; `getData()`) | → data class (`sfi`, `header?`, `records: SortedMap<Int, ByteArray>`) |
| `ElementaryFile.Type` | → `ElementaryFileType` |
| `FileData` (all operations) | Removed (see §12.2) |
| `FileHeader` (interface) | → data class (`efType: ElementaryFileType`) |
| `SvDebitLogRecord`, `SvLoadLogRecord` (interfaces, `getRawData`) | → data classes without `rawData` |
| `SearchCommandData.setSfi`, `startAtRecord`, `setOffset`, `enableRepeatedOffset`, `setSearchData`, `setMask`, `fetchFirstMatchingResult` | → properties of the `SearchCommandData` data class: `sfi`, `startAtRecord = 1`, `offset = 0`, `repeatedOffset = false`, `searchData`, `mask: ByteArray? = null`, `fetchFirstMatchingResult = false` |
| `SearchCommandData.getMatchingRecordNumbers()` | → `CalypsoCard.getMatchingRecordNumbers(commandId: Int) → List<Int>?` |
| `TransactionManager<T>` and generic sub-interfaces | → non-generic, `Self` returns; `TransactionManager` extends `IsoCardTransactionManager` |
| `TransactionManager.prepareSelectFile(short)` / `(SelectFileControl)` | → `prepareSelectFileByLid` / `prepareSelectFileByControl` |
| `TransactionManager.prepareSearchRecords(SearchCommandData)` | → `prepareSearchRecords(commandId: Int, data: SearchCommandData)` |
| `TransactionManager.processCommands(ChannelControl)` | Removed (inherited `CardTransactionManager.processCommands()`) |
| — | Added: `TransactionManager.getSecureSessionState() → SecureSessionState`; `SecureSessionState` enumeration |
| `SecureTransactionManager.getCryptoExtension(Class<E>) → E` | → `getCryptoExtension() → CardTransactionCryptoExtension` |
| `SecureSymmetricCryptoTransactionManager.prepareSvGet(SvOperation, SvAction)` | → `prepareSvGet(svOperation: SvOperation)` |
| `prepareSvReload(int)`, `prepareSvDebit(int)` | Removed |
| — | Added: `prepareSvUndebit(amount, date, time)` |
| `SvAction` | Removed |
| `SvOperation.DEBIT` | → `SvOperation.DEBIT_UNDEBIT` |
| — | Added: `SymmetricCryptoSecuritySettings.assignOpenSecureSessionMaxDurationByCsn/ByFci(...)`, `assignCloseSecureSessionMaxDurationByCsn/ByFci(...)`, `assignSvCommandMaxDurationByCsn/ByFci(...)`; `AsymmetricCryptoSecuritySettings.assignOpenSecureSessionMaxDurationByCsn/ByFci(...)`, `assignCloseSecureSessionMaxDurationByCsn/ByFci(...)` |
| `ChannelControl` | Removed |
| `CardIOException`, `ReaderIOException`, `UnexpectedCommandStatusException`, `SelectFileException` | Removed |
| `CardSignatureNotVerifiableException`, `CryptoException`, `CryptoIOException`, `InconsistentDataException`, `InvalidCardSignatureException`, `InvalidCertificateException`, `InvalidPinException`, `SessionBufferOverflowException`, `UnauthorizedKeyException` | → same names without the `Exception` suffix |

### A.4 Terminal Calypso Crypto Legacy SAM API (Java 1.0.0 → 2.0.0)

| Element in production | What it becomes |
|---|---|
| `LegacySamApiFactory.createSecuritySetting()`, `createKeyPairContainer()`, `createLegacyCardCertificateComputationData()`, `createBasicSignatureComputationData()`, `createTraceableSignatureComputationData()`, `createBasicSignatureVerificationData()`, `createTraceableSignatureVerificationData()` | Removed (data classes) |
| `LegacySam.getProductType() → LegacySam.ProductType` | → `getProductType() → LegacySamProductType` |
| `LegacySam.getCounter(int)`, `getCounterCeiling(int)` | Removed (use `getCounters()`, `getCounterCeilings()`) |
| `LegacySam.getCounterIncrementAccess(int)` | → `getCounterIncrementAccesses() → SortedMap<Int, CounterIncrementAccess>` |
| `LegacySam.getSamParameters() → SamParameters` | → `getSamParameters() → ByteArray?`; `SamParameters` removed |
| `LegacySam.getSystemKeyParameter(SystemKeyType)` | → `getSystemKeyParameters(systemKeyType) → KeyParameters?` |
| `LegacySam.getWorkKeyParameter(int)` / `(byte, byte)` | → `getWorkKeyParametersByRecordNumber` / `getWorkKeyParametersByKifKvc` |
| — | Added: `LegacySam.getSystemKeyParametersRawData`, `getWorkKeyParametersRawDataByRecordNumber`, `getWorkKeyParametersRawDataByKifKvc`, `getKeyPair(commandId)`, `getComputedCardCertificate(commandId)`, `getSignature(commandId)`, `getSignedData(commandId)`, `isSignatureValid(commandId)` |
| `LegacySam.ProductType` | → `LegacySamProductType` |
| `KeyParameter` (interface; `getRawData`, `getParameterValue(int)`) | → `KeyParameters` data class (`kif`, `kvc`, `algorithm`, `parameterValues`) |
| `LegacySamSelectionExtension.setUnlockData(String, ProductType)` | → `setUnlockDataForProductType(unlockData, productType)` |
| `LegacySamSelectionExtension.setStaticUnlockDataProvider(provider)` / `setDynamicUnlockDataProvider(provider)` | → `setStaticUnlockDataProviderWithDeferredReader(provider)` / `setDynamicUnlockDataProviderWithDeferredReader(provider)` |
| `LegacySamSelectionExtension.prepareReadWorkKeyParameters(int)` / `(byte, byte)` | → `prepareReadWorkKeyParametersByRecordNumber` / `prepareReadWorkKeyParametersByKifKvc` |
| `LegacySamRevocationServiceSpi.isSamRevoked(byte[])` | Removed (`isSamRevoked(serialNumber, counterValue: Int)` remains) |
| `TransactionManager<T>` and generic sub-interfaces | → non-generic, `Self` returns |
| `TransactionManager.processCommands()`, `processCommands(ChannelControl)` | Removed (inherited `CardTransactionManager.processCommands()`) |
| `ReadTransactionManager.prepareReadWorkKeyParameters(int)` / `(byte, byte)` | → `…ByRecordNumber` / `…ByKifKvc` |
| `FreeTransactionManager.prepareGenerateCardAsymmetricKeyPair(KeyPairContainer)` | → `prepareGenerateCardAsymmetricKeyPair(commandId: Int)` |
| `FreeTransactionManager.prepareComputeCardCertificate(data)` | → `prepareComputeCardCertificate(commandId: Int, data)` |
| `FreeTransactionManager` / `CardTransactionLegacySamExtension` `.prepareComputeSignature(data)`, `.prepareVerifySignature(data)` | → `prepareComputeSignature(commandId: Int, data)`, `prepareVerifySignature(commandId: Int, data)` |
| `SecureWriteTransactionManager.prepareTransferWorkKeyDiversified(…, diversifier)` | → `prepareTransferWorkKeyDiversifiedWithSpecificDiversifier(…, diversifier)` |
| `KeyPairContainer` | Removed |
| `LegacyCardCertificateComputationData.setCardPublicKey`, `setStartDate`, `setEndDate`, `setCardAid`, `setCardSerialNumber`, `setCardStartupInfo` | → properties of the data class: `cardPublicKey`, `startDate`, `endDate`, `cardAid`, `cardSerialNumber`, `cardStartupInfo` |
| `LegacyCardCertificateComputationData.getCertificate()` | → `LegacySam.getComputedCardCertificate(commandId: Int) → ByteArray?` |
| `SignatureComputationData<T>` | → sealed interface `SignatureComputationData` |
| `SignatureComputationData.setData(byte[] data, byte kif, byte kvc)`, `setSignatureSize(int)`, `setKeyDiversifier(byte[])` | → properties `data`, `kif`, `kvc`, `signatureSize = 8`, `keyDiversifier: ByteArray? = null` of the data classes |
| `SignatureComputationData.getSignature()` | → `LegacySam.getSignature(commandId: Int) → ByteArray?` |
| `BasicSignatureComputationData`, `TraceableSignatureComputationData` | → data classes implementing `SignatureComputationData` |
| `TraceableSignatureComputationData.withSamTraceabilityMode(int offset, SamTraceabilityMode mode)`, `withoutBusyMode()` | → properties `traceabilityOffset = 0`, `samTraceabilityMode: SamTraceabilityMode? = null`, `busyMode = true` |
| `TraceableSignatureComputationData.getSignedData()` | → `LegacySam.getSignedData(commandId: Int) → ByteArray?` |
| `SignatureVerificationData<T>` | → sealed interface `SignatureVerificationData` |
| `SignatureVerificationData.setData(byte[] data, byte[] signature, byte kif, byte kvc)`, `setKeyDiversifier(byte[])` | → properties `data`, `signature`, `kif`, `kvc`, `keyDiversifier: ByteArray? = null` of the data classes |
| `SignatureVerificationData.isSignatureValid()` | → `LegacySam.isSignatureValid(commandId: Int) → Boolean?` |
| `BasicSignatureVerificationData`, `TraceableSignatureVerificationData` | → data classes implementing `SignatureVerificationData` |
| `TraceableSignatureVerificationData.withSamTraceabilityMode(int offset, SamTraceabilityMode mode, LegacySamRevocationServiceSpi service)`, `withoutBusyMode()` | → properties `traceabilityOffset = 0`, `samTraceabilityMode: SamTraceabilityMode? = null`, `samRevocationService: LegacySamRevocationServiceSpi? = null`, `busyMode = true` |
| `SecuritySetting.setControlSamResource(samReader, controlSam)` | → `SecuritySettings` data class (`samReader`, `controlSam`); `securitySetting` parameter → `securitySettings` in `createSecureWriteTransactionManager` and `createAsyncTransactionCreatorManager` |
| `ReaderIOException`, `SamIOException`, `UnexpectedCommandStatusException` | Removed |
| `InconsistentDataException`, `InvalidSignatureException`, `SamRevokedException` | → `InconsistentData`, `InvalidSignature`, `SamRevoked` |

### A.5 Terminal Calypso Crypto Symmetric API (Java 0.1.1 → 0.2.0)

| Element in production | What it becomes |
|---|---|
| `SvCommandSecurityDataApi.getSvGetRequest()`, `getSvGetResponse()`, `getSvCommandPartialRequest()` (inputs) | → `svGetRequest`, `svGetResponse`, `svCommandPartialRequest` parameters of `computeSvCommandSecurityData` |
| `SvCommandSecurityDataApi.setSerialNumber`, `setTransactionNumber`, `setTerminalChallenge`, `setTerminalSvMac` (outputs) | → `serialNumber`, `transactionNumber`, `terminalChallenge`, `terminalSvMac` properties of the `SvCommandSecurityData` data class (namespace `calypso.crypto.symmetric.spi`) |
| `SymmetricCryptoCardTransactionManagerSpi.computeSvCommandSecurityData(SvCommandSecurityDataApi) → void` | → `computeSvCommandSecurityData(svGetRequest, svGetResponse, svCommandPartialRequest) → SvCommandSecurityData` |
| `SymmetricCryptoCardTransactionManagerSpi.cipherPinForPresentation(…, Byte kif, Byte kvc)`, `cipherPinForModification(…, Byte kif, Byte kvc)` | → non-nullable `kif: Byte`, `kvc: Byte` |
| `SymmetricCryptoCardTransactionManagerFactorySpi.createCardTransactionManager(…, List<byte[]> transactionAuditData)` | → `transactionAuditData: MutableList<ByteArray>` |
| `SymmetricCryptoException`, `SymmetricCryptoIOException` | → `SymmetricCrypto`, `SymmetricCryptoIO` |

### A.6 Terminal Calypso Crypto Asymmetric API (Java 0.2.0 → 0.3.0)

| Element in production | What it becomes |
|---|---|
| `CaCertificateContentSpi.getPublicKey`, `getPublicKeyReference`, `getStartDate`, `getEndDate`, `isAidTruncated`, `getAid`, `isCaCertificatesAuthenticationAllowed`, `isCardCertificatesAuthenticationAllowed` | → properties of the `CaCertificateContent` data class: `publicKey`, `publicKeyReference`, `startDate`, `endDate`, `isAidTruncated`, `aid: ByteArray?`, `isCaCertificatesAuthenticationAllowed`, `isCardCertificatesAuthenticationAllowed` |
| `CaCertificateContentSpi.isAidCheckRequested()` | Removed (deducible from `aid`, `null` if the check is not requested) |
| `CaCertificateSpi.checkCertificateAndGetContent(CaCertificateContentSpi) → CaCertificateContentSpi` | → `checkCertificateAndGetContent(issuerCertificateContent: CaCertificateContent) → CaCertificateContent` |
| `PcaCertificateSpi.checkCertificateAndGetContent() → CaCertificateContentSpi` | → `… → CaCertificateContent` |
| `CardCertificateSpi.checkCertificateAndGetPublicKey(CaCertificateContentSpi) → CardPublicKeySpi` | → `checkCertificateAndGetPublicKey(issuerCertificateContent: CaCertificateContent) → ByteArray` |
| `CardPublicKeySpi` (`getRawValue`) | Removed |
| `AsymmetricCryptoCardTransactionManagerSpi.initTerminalPkiSession(CardPublicKeySpi)` | → `initTerminalPkiSession(cardPublicKey: ByteArray)` |
| `AsymmetricCryptoException`, `CertificateValidationException` | → `AsymmetricCrypto`, `CertificateValidation` |

### A.7 Terminal Generic Card API (Java 1.0.0 → 2.0.0)

| Element in production | What it becomes |
|---|---|
| `CardTransactionManager` (extends the Reader API `CardTransactionManager<…>`) | → `GenericCardTransactionManager` (extends `IsoCardTransactionManager`) |
| `prepareApdu(String)` | Removed |
| `prepareApdu(byte[])` | → `prepareCommand(apdu: ByteArray)` |
| `prepareApdu(byte cla, byte ins, byte p1, byte p2, byte[] dataIn, Byte le)` | Removed |
| — | Added: `prepareCommandWithId(commandId, apdu)`, `prepareCommandWithMaxDuration(commandId, apdu, maxDuration)`, `getLastExecutionResponse(commandId) → ByteArray?` |
| `getResponsesAsByteArrays()` | → `getLastExecutionResponses() → List<ByteArray>` |
| `getResponsesAsHexStrings()` | Removed |
| `GenericCardApiFactory.createCardTransaction(reader, card)` | → `createGenericCardTransactionManager(reader, card)` |

### A.8 Terminal Storage Card API (Java 1.2.0 → 2.0.0)

| Element in production | What it becomes |
|---|---|
| `ProductType` (methods `getBlockCount`, `getBlockSize`, `hasSystemBlock`, `hasWriteAcknowledgment`, `hasAuthentication`) | → `StorageCardProductType` with properties `blockCount`, `blockSize`, `hasSystemBlock`, `hasWriteAcknowledgment`, `hasAuthentication` |
| `StorageCardApiFactory.createStorageCardSelectionExtension(ProductType)` | → `productType: StorageCardProductType` parameter |
| `StorageCard.getUID()` | → `getUid()` |
| `StorageCard.getSystemBlock()`, `getBlock(int)`, `getBlocks(int, int)` | → `ByteArray?` returns |
| `StorageCardSelectionExtension` / `StorageCardTransactionManager` `.prepareMifareClassicAuthenticate(…, byte[] key)` / `(…, int keyNumber)` | → `prepareMifareClassicAuthenticateWithKey` / `prepareMifareClassicAuthenticateWithKeyNumber` |
| `StorageCardTransactionManager` (extends `CardTransactionManager<…>`) | → non-generic, `Self` returns |
| `StorageCardTransactionManager.prepareReadSystemBlock()`, `prepareWriteSystemBlock(byte[])` *(deprecated)* | Removed |
| `StorageCardTransactionManager.prepareSt25WriteSystemBlock(byte[])` | → `prepareSt25WriteSystemBlock(commandId: Int, data: ByteArray)` |
| `StorageCardTransactionManager.prepareWriteBlocks(int, byte[])` | → `prepareWriteBlocks(commandId: Int, fromBlockAddress: Int, data: ByteArray)` |
| `StorageCardException` (`getBlockAddress`) | Removed; the errors carry `blockAddress: Int?` and `commandId: Int?` |
| `SCAuthenticationFailedException` (extends `CardCommunicationException`) | → `SCAuthenticationFailed` (no parent error) |
| `SCCardCommunicationException`, `SCInvalidCardResponseException`, `SCReaderCommunicationException` | → `SCCardCommunication`, `SCInvalidCardResponse`, `SCReaderCommunication` (parents unchanged) |

### A.9 Terminal Reader Definitions API (new, 1.0.0)

| Element | Content |
|---|---|
| `ReaderDefinitionsApiProperties` | `VERSION` constant |
| `RfTechnology` | `ISO_14443_AB`, `INNOVATRON_B_PRIME`, `FELICA`, `ISO_15693` |
| `CardType` | `ISO_7816_3`, `ISO_14443_4`, `ISO_14443_3A_MIFARE_CLASSIC_1K`, `ISO_14443_3A_MIFARE_CLASSIC_4K`, `ISO_14443_3A_MIFARE_ULTRALIGHT`, `ISO_14443_3B_ST25_SRT512`, `INNOVATRON_B_PRIME`, `FELICA`, `ISO_15693`, `UNKNOWN` |

---

*End of document.*
