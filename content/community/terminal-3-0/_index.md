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

The purpose of this document is to **present the evolutions of the Terminal APIs** introduced by their major version **3.0.0** — for the three existing APIs (`Reader API`, `Card API`, `Calypso Card API`) as well as for the new **Terminal Definitions API** created on this occasion — **for validation by the members of the TC Terminal** (Technical Committee Terminal) of the **Calypso Networks Association** (CNA).

For each evolution theme, it describes:

- the **motivation** (the "why");
- the **detailed changes** in each of the four APIs concerned;
- the **design rationale** (the "why this choice rather than another").

Alignment of the Keypop Java implementations with 3.0.0 and the writing of a **technical migration guide** for integrators will take place subsequently, after validation of 3.0.0 by the TC Terminal (see §8).

> **API visibility with respect to audiences**
>
> - The **Reader API**, the **Calypso Card API** and the new **Terminal Definitions API** are **public** APIs, directly manipulated by the **integrator** (application code).
> - The **Card API** is an **internal** API: it serves as an integration contract between reader implementations and card extensions. **The integrator does not have access to it**.
>
> This document describes the evolutions of the four APIs because they are coupled at the design level (in particular for themes 1, 2 and 6). Since the **Card API is internal**, its evolutions (see §2.3, §3.2, §6.2) require **no action** from the integrator; they are absorbed by the Keypop implementations.
>
> **New API: Terminal Definitions API**
>
> Version 3.0.0 introduces a new **foundation API** dedicated to hosting **cross-cutting enumerated types** of the Terminal APIs. It is created on the occasion of Theme 6 to host `RfTechnology` and `CardType`, but its scope is broader: it is **intended to potentially host other enumerations** that constitute **global constants** shared by several Terminal APIs. The Terminal Reader API now **depends** on this new API; the other Terminal APIs may depend on it in turn according to future evolutions.
>
> Concretely, this translates into:
>
> - a **new UML repository**: `calypsonet-terminal-definitions-uml-api` (created, version `1.0.0-SNAPSHOT`);
> - a **new Keypop Java module**: `keypop-definitions-jvm-api` (to be created, in accordance with the Keypop naming convention);
> - a **dependency** declared from the `keypop-reader-java-api` module to this new module.

---

## Reference UML Diagrams

The UML diagrams are available on the **`develop`** branch of each of the CNA repositories hosted on [github.com/calypsonet](https://github.com/calypsonet/). For each repository (except the Terminal Definitions API which is new), **two variants** are provided:

- **Final diagram** (`api_class_diagram.svg`) — version **cleaned** of all struck-through, red and grey elements; this is what will be published at the 3.0.0 release.
- **Diff diagram** (`api_class_diagram_diff.svg`) — version **preserving** the struck-through, red and grey elements to enable **reading the delta** between 2.x and 3.0.0.

The links below point directly to the SVG files, which render visually in the GitHub interface.

| Module                               | Version        | Final diagram                                                                                                                         | Diff diagram                                                                                                                              |
|--------------------------------------|----------------|---------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| **Terminal Reader API**              | 3.0.0-SNAPSHOT | [Final SVG](https://github.com/calypsonet/calypsonet-terminal-reader-uml-api/blob/develop/3.0.0-SNAPSHOT/api_class_diagram.svg)       | [Diff SVG](https://github.com/calypsonet/calypsonet-terminal-reader-uml-api/blob/develop/3.0.0-SNAPSHOT/api_class_diagram_diff.svg)       |
| **Terminal Card API** *(internal)*   | 3.0.0-SNAPSHOT | [Final SVG](https://github.com/calypsonet/calypsonet-terminal-card-uml-api/blob/develop/3.0.0-SNAPSHOT/api_class_diagram.svg)         | [Diff SVG](https://github.com/calypsonet/calypsonet-terminal-card-uml-api/blob/develop/3.0.0-SNAPSHOT/api_class_diagram_diff.svg)         |
| **Terminal Calypso Card API**        | 3.0.0-SNAPSHOT | [Final SVG](https://github.com/calypsonet/calypsonet-terminal-calypso-card-uml-api/blob/develop/3.0.0-SNAPSHOT/api_class_diagram.svg) | [Diff SVG](https://github.com/calypsonet/calypsonet-terminal-calypso-card-uml-api/blob/develop/3.0.0-SNAPSHOT/api_class_diagram_diff.svg) |
| **Terminal Definitions API** *(new)* | 1.0.0-SNAPSHOT | [Final SVG](https://github.com/calypsonet/calypsonet-terminal-definitions-uml-api/blob/develop/1.0.0-SNAPSHOT/api_class_diagram.svg)  | — *(new API, no diff)*                                                                                                                    |

> The PlantUML sources (`.puml`) are also available in the same folders of each repository, for those who wish to regenerate the rendering or inspect the annotations.

---

> Scope: **Reader API**, **Card API** and **Calypso Card API** — to which is added, as a **new foundation API**, the **Terminal Definitions API** (see the preamble box and Theme 6).
>
> **Diagram reading conventions**:
> - **(diff only)** **Struck-through** elements (`<s>`) in the `_diff` diagrams are kept solely to facilitate reading the delta between 2.x and 3.0.0. They **do not appear** in the final diagrams.
> - **(diff only)** Elements in **blue** are 3.0.0 **additions**.
> - **(diff only)** Elements in **grey** (`<color:grey>`) are **work-in-progress** items. The 3.0.0 cleans up: these elements **do not appear** in the final diagrams.

---

## Table of Contents

0. [Reference UML Diagrams](#reference-uml-diagrams)
1. [Overview](#1-overview)
2. [Theme 1 — Multiple Logical Channel Support](#2-theme-1--multiple-logical-channel-support)
3. [Theme 2 — Countermeasure Against Relay Attack Vulnerability](#3-theme-2--countermeasure-against-relay-attack-vulnerability)
4. [Theme 3 — Simplified Observation Management](#4-theme-3--simplified-observation-management)
5. [Theme 4 — Current Secure Session Status Awareness](#5-theme-4--current-secure-session-status-awareness)
6. [Theme 5 — Semantic Improvements (Renamings and Concept Migration)](#6-theme-5--semantic-improvements-renamings-and-concept-migration)
7. [Theme 6 — Strict Typing of RF Technologies and Card Types (ECP Support)](#7-theme-6--strict-typing-of-rf-technologies-and-card-types-ecp-support)
8. [Migration Procedure](#8-migration-procedure)
9. [Next Steps and TC Terminal Validation](#9-next-steps-and-tc-terminal-validation)

---

## 1. Overview

Version 3.0.0 is a **major version**: it introduces compatibility breaks on the three existing APIs and **creates a new foundation API** (`Terminal Definitions API`). The changes are motivated by six major work streams:

| # | Theme                         | Reader | Card | Calypso Card | Definitions  |
|---|-------------------------------|:------:|:----:|:------------:|:------------:|
| 1 | Multiple logical channels     |   ●    |  ●   |      ●       |      —       |
| 2 | Relay attack countermeasure   |   —    |  ●   |      ●       |      —       |
| 3 | Observation simplification    |   ●    |  —   |      —       |      —       |
| 4 | Current secure session status |   —    |  —   |      ●       |      —       |
| 5 | Semantic improvements         |   ●    |  ●   |      ●       |      —       |
| 6 | RF / card type typing, ECP    |   ●    |  —   |      —       | ● (creation) |

Cross-cutting consequences:

- **Removal of all deprecated legacy**: the major version 3.0.0 is the opportunity to clean up. All elements that had been marked `@Deprecated` in versions 1.x or 2.x — including those that had been deprecated only recently — are removed without a compatibility alternative. No deprecated element remains in 3.0.0.
- **Removal of "work in progress" elements** (in grey, `<color:grey>`). They appeared in the diagrams only as prospective items. The following are concerned:
   - **Reader API (grey in 2.x, removed in 3.0.0)**: `ReaderApiFactory.createMultichannelCardSelector()`, the `MultichannelCardSelector` interface and its `useDedicatedLogicalChannel()` method, as well as `CardSelectionResult.getCardReader()`. The notion they prefigured (multi-channel) is properly addressed by the new model described in §2.
   - **Calypso Card API (still grey in the 3.0.0 snapshot)**: `AsymmetricCryptoSecuritySetting.authorizeAllTrustedCa()`, `authorizeOnlyConfiguredCa()` and `revokeCa(byte[])`. These fine-grained PKI revocation management methods are left in grey in the current diagram: they **will not appear in the final 3.0.0** published version.
- Complete removal of the `ChannelControl` enum (Reader API and Card API). Channel closure is no longer driven by a parameter passed to commands, but becomes an **explicit operation** on the new dedicated methods (`closeChannel`, `transmitCardRequestAndCloseChannel`, `processCommandsAndCloseChannel`).
- Removal of `prepareReleaseChannel()` on the Reader API side and `releaseChannel()` on the Card API side: channel release becomes a side effect of the new multi-channel model and no longer needs a dedicated API.
- Removal of the `InvalidCardResponseException` exception from the `selection` package (still present as a "legacy" class in the diagram for information), in favor of the exception from the root `reader` package.

---

## 2. Theme 1 — Multiple Logical Channel Support

### 2.1 Motivation

Until 2.x, the API implicitly assumed that only one logical channel was open at a time between the terminal and the card. Version 3.0.0 explicitly introduces the notion of **multiple logical channels** (ISO cards supporting several simultaneous application selections on distinct logical channels), with two objectives:

1. enable selection and manipulation of **several applications** of the same card in parallel;
2. clearly distinguish, for each smart card, **on which channel** it is attached and **whether it is still active**.

The concrete trigger for this work stream is the arrival of a new CNA product, **OpenSAM**, whose usage model is based on the **simultaneous coexistence of several security applications** accessible in parallel on distinct logical channels. Without explicit multi-channel support in the API, integrating OpenSAM into Keypop would require an implementation-side workaround; 3.0.0 provides it with the idiomatic infrastructure. The detailed specifications of OpenSAM belong to the dedicated CNA documentation for this product.

### 2.2 Reader API

#### Multi-channel selection

- **New method** `CardSelectionManager.processMultichannelCardSelectionScenario(CardReader, ChannelSelectionPolicy)` — multi-channel equivalent of `processCardSelectionScenario`. **Prerequisite**: the presented card must support multi-channel; otherwise, an exception is thrown when the selection scenario is executed.
- **New enumeration** `ChannelSelectionPolicy`:
   - `ALLOW_BASIC_CHANNEL` — authorizes the use of the basic channel (channel 0) in addition to additional logical channels;
   - `LOGICAL_CHANNEL_ONLY` — restricts selection to additional logical channels (channel 0 is not used).

#### Fine-grained selection result handling

- **New method** `CardSelectionResult.getActiveSelectionIndexes() : List<Integer>` — returns **all** active selection indexes (one per channel). The existing `getActiveSelectionIndex()` method is retained for compatibility with the single-channel case.
- **Semantic clarification** on `getActiveSmartCard()` (noted in the diagram): in case of several active cards, the card active on **channel 0** is returned; `getActiveSelectionIndexes()` must now be used to obtain all active selections.

#### Channel awareness at the card level

- **New method** `SmartCard.isActive() : boolean` — the card knows whether it is still active on its channel.
- **New method** `IsoSmartCard.isBasicChannel() : boolean` — indicates whether the card is attached to the basic channel or to an additional logical channel.

#### Multi-channel transactional management

- **New interface** `MultichannelCardTransactionManager<T>` (in `reader.transactionApi.spi`) which extends `CardTransactionManager<T>` and adds:
   - `T processCommandsAndCloseChannel()` — executes pending commands and **closes the channel** in the process;
   - `T closeChannel()` — explicit channel closure.

> On the `CardTransactionManager` side, `processCommands(ChannelControl)` is replaced by `processCommands()` without parameter: channel closure is now delegated to the new multi-channel manager.

### 2.3 Card API

- **New method** `SmartCardSpi.deactivate()` — allows the `ProxyReaderApi` to **deactivate** the SmartCard on its side, so that the client application, if it holds a reference to the corresponding `SmartCard`, immediately sees its `isActive()` flip to `false`.
- **New SPI interface** `MultichannelSmartCardSpi extends SmartCardSpi` with `int getChannel()` — the multi-channel SmartCard SPI exposes its attachment channel.
- **Refactoring of `ProxyReaderApi`**:
   - **Removed**: `transmitCardRequest(CardRequestSpi, ChannelControl)` and `releaseChannel()`.
   - **Added**:
      - `CardResponseApi transmitCardRequest(CardRequestSpi, SmartCardSpi)` — the APDU target is designated by the SmartCard (see §2.3.1 below);
      - `CardResponseApi transmitCardRequestAndCloseChannel(CardRequestSpi, MultichannelSmartCardSpi)` — atomic "execute + close" variant;
      - `void closeChannel(MultichannelSmartCardSpi)` — targeted closure of a given channel.
- **Addition**: `CardSelectionResponseApi.getChannel() : int` — the selection response now carries the channel information.
- **Removal**: `CardResponseApi.isLogicalChannelOpen()` — becomes redundant with the new model where the channel is a property of the SmartCard SPI.

#### 2.3.1 Role of the SmartCard (S)PI passed to `ProxyReaderApi`

The three new methods of `ProxyReaderApi` receive a SmartCard (S)PI as parameter — `SmartCardSpi` for `transmitCardRequest(...)`, `MultichannelSmartCardSpi` for `transmitCardRequestAndCloseChannel(...)` and `closeChannel(...)`. This parameter is **not** a mere vehicle for the channel number. It plays up to three roles:

1. **Carry the logical channel number** (only with `MultichannelSmartCardSpi`, via `getChannel()`) on which the APDU request or the closure must be addressed.
2. **Carry the active/inactive state of the SmartCard** so that the `ProxyReaderApi` can **verify upfront** that the card is still active before emitting any request. This protects the application against the unintentional use of a SmartCard whose actual state no longer corresponds to what the calling code believes (card removed, channel closed by another path, prior communication exception, etc.).
3. **Allow the `ProxyReaderApi` to deactivate the SmartCard** (`SmartCardSpi.deactivate()`) if the situation requires it — typically after a communication exception or at explicit channel closure — so that this deactivation is immediately visible on the application side via `SmartCard.isActive() == false`.

Roles 2 and 3 are common to `SmartCardSpi` and `MultichannelSmartCardSpi`; role 1 is specific to the multi-channel variants.

#### 2.3.2 Lifecycle of `SmartCard` references held by the `CardReader`

For this "actual state reflected" contract to work, the `CardReader` **temporarily holds references to the `SmartCard`s resulting from the last selection** (until the next step that invalidates their state). This holding allows the `CardReader` to **automatically deactivate** the relevant SmartCards in the following four cases:

1. on a **new selection in single-channel mode** (the old SmartCards become obsolete);
2. on an **explicit channel closure request** (`closeChannel`, `transmitCardRequestAndCloseChannel`, `processCommandsAndCloseChannel`);
3. on a call to **`ObservableCardReader.endCardProcessing()`** (end of processing of the current card);
4. on an **exception indicating that the card is no longer contactable** (typically `CardCommunicationException` / `ReaderCommunicationException` at the Reader level, or `CardBrokenCommunicationException` / `ReaderBrokenCommunicationException` at the Card API level).

The objective is that, in all these cases, **any subsequent attempt to use a now-invalid SmartCard in a transaction** (Calypso or other) can be intercepted by the `ProxyReaderApi` at the `isActive()` verification step — instead of producing a later error that is more difficult to diagnose.

**Lifetime of the holding**: the `CardReader` keeps the references to the SmartCards from their creation (selection result) until one of the four events above. Concretely, on the call to `endCardProcessing()` (the most frequent case), the SmartCards are deactivated **and** their references are released by the `CardReader`; they can then be finalized by the Java garbage collector if the application does not keep its own reference.

> This responsibility falls to the **implementation** of the `CardReader` and the `ProxyReaderApi`: the public API merely exposes `SmartCard.isActive()` and `SmartCardSpi.deactivate()`; the "holding + deactivation at the four points above" contract must be documented in the Javadoc of the Java module but does not appear explicitly in the UML diagram.

### 2.4 Calypso Card API

- **New method** `TransactionManager.getLogicalChannelSupport() : MultichannelTransactionManager` — entry point to multi-channel operations on the Calypso side.
- **New interface** `MultichannelTransactionManager` (mapped to `MultichannelCardTransactionManager` of the Reader API).

### 2.5 Rationale

The "by parameter" control (`ChannelControl.KEEP_OPEN` / `CLOSE_AFTER`) relied on an implicit, global notion of "single current channel". In a multi-channel context, this model is ambiguous: which channel does `CLOSE_AFTER` apply to? Moving to a model where the target (the `SmartCard(Spi)`) is **explicitly named** in each call resolves this ambiguity and makes the API self-descriptive.

---

## 3. Theme 2 — Countermeasure Against Relay Attack Vulnerability

### 3.1 Motivation

A **relay attack** consists in interposing an attacker between the card and the terminal and relaying the APDU exchanges to a remote card, which enables a fraudulent operation without the holder's knowledge. Version 3.0.0 introduces a mechanism for **measuring and bounding APDU exchange durations** and **bounding the duration of secure sessions**, which allows the framework to detect the abnormal lengthening of communication times characteristic of a relay.

#### Threat model adopted

- **Targeted attack surface**: **application-level attack** (software relay of APDUs within the application environment), as opposed to attacks at the physical RF transport level, which fall under hardware countermeasures.
- **Order of magnitude** of relevant bounds: the **millisecond** (`ms`). Effective exchange and session durations are measured in this unit, and the bounds defined by the integrator are expressed in the same unit.
- **Place of measurement**: the **Terminal Reader API implementation** (Keypop framework layer on the terminal side). It is the layer that measures the effective duration of each APDU exchange and each secure session, and compares this measurement against the bounds declared by the application.
- **Post-overrun behavior**: if a bound is exceeded, the **current session is automatically cancelled** by the implementation and an **`InvalidCardResponseException`** exception is thrown, with a detailed message indicating the exceeded bound and the measured duration. The application can thus distinguish this case from other communication errors and log/alert accordingly.

### 3.2 Card API

- **Request side**: `ApduRequestSpi.getApduExchangeMaxDuration() : Long` — maximum duration tolerated for the APDU exchange (in milliseconds). The return type is intentionally `Long` (boxed): the value `null` means **"no bound defined"** for this request.
- **Response side**: `ApduResponseApi.getApduExchangeDuration() : Long` — effective duration of the exchange, as measured by the reader. The value `null` means **"duration not measured"** (the reader does not provide the measurement).
- **New exception** `ApduExchangeDurationExceededException extends AbstractApduException` — thrown by `ProxyReaderApi.transmitCardRequest(...)` (Card API, internal level) when the effective duration of the exchange exceeds the `getApduExchangeMaxDuration()` bound declared on the request (no effect if the bound is `null`). On the **integrator** side, this exception is intercepted by the Terminal Reader API implementation, which **automatically cancels the current session** and propagates the event as an `InvalidCardResponseException` enriched with the detail (see §3.1, threat model).

### 3.3 Calypso Card API

All new methods take a `csnMin` parameter which is a **threshold** on the CSN (Card Serial Number): the rule applies to **any card whose CSN is greater than or equal to `csnMin`**. This mechanism enables introducing or progressively tightening duration bounds as new generations of cards (with higher CSNs) are issued, without penalizing older cards.

> **Combination rule for `csnMin`**: when several calls to `assignOpenSecureSessionMaxDuration(...)` (or `assignSvOperationMaxDuration(...)`) are made with different `csnMin` values, each call defines a **range** bounded by its `csnMin` and the immediately higher declared `csnMin` (or +∞ for the declaration at the highest threshold). For a given card, it is the **range to which its CSN belongs** that determines the applied bound. Example: `assignOpenSecureSessionMaxDuration(100, …, 200)` then `assignOpenSecureSessionMaxDuration(500, …, 100)` defines two ranges — `[100, 499]` bounded at 200 ms, `[500, +∞[` bounded at 100 ms.

- **`SymmetricCryptoSecuritySetting`** — four new methods:
   - `assignOpenSecureSessionMaxDuration(long csnMin, byte[] dfName, long maxDuration)` — maximum duration of a secure session for cards with CSN ≥ `csnMin` and a target DF;
   - `assignOpenSecureSessionMaxDuration(long csnMin, long maxDuration)` — all-DF variant;
   - `assignSvOperationMaxDuration(long csnMin, byte[] dfName, long maxDuration)` — bound dedicated to Stored Value (SV) operations;
   - `assignSvOperationMaxDuration(long csnMin, long maxDuration)` — all-DF variant.
- **`AsymmetricCryptoSecuritySetting`** — two new methods:
   - `assignOpenSecureSessionMaxDuration(long csnMin, byte[] dfName, long maxDuration)`;
   - `assignOpenSecureSessionMaxDuration(long csnMin, long maxDuration)`.

### 3.4 Rationale

A relay attack introduces a significant and systematic delay on APDU exchanges; monitoring this delay at the reader level (Card API) and at the Calypso session level (Calypso Card API) provides coverage at both the per-exchange level and at the level of the secure transactional protocol.

---

## 4. Theme 3 — Simplified Observation Management

### 4.1 Motivation

The 2.x model exposed a complete **Observer pattern** (`addObserver`, `removeObserver`, `clearObservers`, `countObservers`, `setReaderObservationExceptionHandler`) augmented by two distinct SPIs (`CardReaderObserverSpi` for events and `CardReaderObservationExceptionHandlerSpi` for errors). In practice, in all real-world usage, **a single observer** is registered, and the separation between event handler and error handler did not bring value (the two were implemented together most of the time).

### 4.2 Reader API — ObservableCardReader

**Removed methods**:

- `setReaderObservationExceptionHandler(CardReaderObservationExceptionHandlerSpi)`
- `addObserver(CardReaderObserverSpi)`
- `removeObserver(CardReaderObserverSpi)`
- `clearObservers()`
- `countObservers()`
- `startCardDetection(DetectionMode)` (single-argument signature)

**Added / refactored methods**:

- `startCardDetection(CardDetectionSettings settings, CardReaderEventHandler eventHandler)` — observer registration (and its declaration) now happens **at the moment detection is started**, in a single operation. The first parameter is no longer a mere `DetectionMode` but a `CardDetectionSettings` object (single builder), which carries the detection mode **and** the other characteristics (targeted RF technologies, ECP frame, etc.). This refactoring is detailed in Theme 6 (see §7); we simply note here that observation and detection parameterization are now co-located in a single call.

**Removed SPIs**:

- `CardReaderObserverSpi`
- `CardReaderObservationExceptionHandlerSpi`

**Added SPI**:

- `CardReaderEventHandler` which **merges** the two previous SPIs:
   - `void onReaderEvent(CardReaderEvent cardReaderEvent)`
   - `void onReaderError(String context, String readerName, Throwable e)`

### 4.3 Rationale

This simplification:

1. **Reduces the API surface** (5 methods and 2 SPIs become 1 method and 1 SPI);
2. **Eliminates invalid states** (observer registered without error handler, detection started without observer, etc.);
3. **Aligns the API** with the actual usage observed at integrators.

---

## 5. Theme 4 — Current Secure Session Status Awareness

### 5.1 Motivation

On the Calypso side, the client application had no direct way, at a given moment, to know **whether a secure session was open** nor to know its **nature** (symmetric / asymmetric) or the **write access level** requested at opening. This was useful information for business layers, in particular to decide whether or not to chain certain command preparations.

### 5.2 Calypso Card API

- **New method** `TransactionManager.getSecureSessionStatus() : SecureSessionStatus` — accessor of the current status. The returned object is an **immutable snapshot** captured at the moment of the call; it does not reflect subsequent changes to the session state. To obtain a refreshed state, the caller must re-invoke `getSecureSessionStatus()`.
- **New interface** `SecureSessionStatus`:
   - `boolean isOpen()` — is a secure session open at the snapshot moment?
   - `SecureSessionType getType()` — cryptographic nature of the session;
   - `WriteAccessLevel getWriteAccessLevel()` — write access level requested at opening. This method returns **`null` in PKI mode** (`SecureSessionType.ASYMMETRIC`), where session opening is done via `prepareOpenSecureSession()` without `WriteAccessLevel`.
- **New enumeration** `SecureSessionType`:
   - `SYMMETRIC` (PSO/SAM sessions, Regular and Extended modes);
   - `ASYMMETRIC` (PKI mode).

> **Granularity adopted for `SecureSessionType`**: the enumeration reflects the **cryptographic nature** of the session (symmetric vs asymmetric) and not the **application mode** (Regular / Extended). These two modes on the symmetric side share the same underlying cryptography and only differ in their configuration at the `TransactionManager` level (see the `SecureRegularModeTransactionManager` / `SecureExtendedModeTransactionManager` subtypes). An integrator who needs to know the application mode obtains it directly via the subtype of the `TransactionManager` they instantiated; `SecureSessionStatus` focuses on the strategic "symmetric or asymmetric" information that conditions the scope of possible operations (keys, certificates, etc.).

### 5.3 Rationale

The Calypso `TransactionManager` is now **introspectable** on its own secure session, which:

- prevents the caller from having to maintain its own state tracking in parallel;
- makes explicit information that was previously implicit (the session type is currently inferred from the instantiated subtype of `SecureTransactionManager` — which the caller loses grasp of as soon as it manipulates the `T extends TransactionManager<T>` generic).

---

## 6. Theme 5 — Semantic Improvements (Renamings and Concept Migration)

### 6.1 Reader API

#### Enumeration and value renamings

| Before (2.x)                                    | After (3.0.0)                                                 | Rationale                                                                                                                                       |
|-------------------------------------------------|---------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| `DetectionMode.SINGLESHOT`                      | `DetectionMode.SINGLE_SHOT`                                   | Compliance with the `SCREAMING_SNAKE_CASE` naming convention (compound word).                                                                   |
| `CardReaderEvent.Type.UNAVAILABLE`              | `CardReaderEvent.Type.READER_UNREGISTERED`                    | The name now describes the actual **cause** of the event (the reader has been unregistered) and no longer a vague consequence ("unavailable").  |
| `NotificationMode` (package `reader`)           | `CardPresenceNotificationPolicy` (package `reader.selection`) | The name describes what is notified (card presence); the package move reflects that this notion belongs to **selection** and not to the reader. |
| `ObservableCardReader.finalizeCardProcessing()` | `ObservableCardReader.endCardProcessing()`                    | `finalize` is a charged reserved word in Java (method of `Object`, now deprecated by the JDK); `end` is more neutral and shorter.               |

#### Migration of the "multiple selection mode" concept

- **Removed**: `CardSelectionManager.setMultipleSelectionMode()` — a side-effecting method that silently modified the behavior of the next `process...`.
- **Replaced** by an **explicit parameter** `SelectionExecutionPolicy` passed to `processCardSelectionScenario` and `scheduleCardSelectionScenario`:
   - `STOP_ON_FIRST_MATCH` — historical default behavior;
   - `PROCESS_ALL` — equivalent of the previous multiple mode.

Impact on signatures:

```text
2.x : processCardSelectionScenario(CardReader)
3.0 : processCardSelectionScenario(CardReader, SelectionExecutionPolicy)

2.x : scheduleCardSelectionScenario(ObservableCardReader, NotificationMode)
3.0 : scheduleCardSelectionScenario(ObservableCardReader,
                                    CardPresenceNotificationPolicy,
                                    SelectionExecutionPolicy)
```

#### Selector hierarchy simplifications

- **Removal** of the intermediate interface `CommonIsoCardSelector<T>` (2.1.0).
- `IsoCardSelector` now directly extends `CardSelector` and carries the methods `filterByDfName`, `setFileOccurrence`, `setFileControlInformation`.

#### Removals tied to the channel model

- **Removed**: `CardSelectionManager.prepareReleaseChannel()`.
- **Removed**: `ChannelControl` (enumeration) — see Theme 1.
- **Removed**: `CardTransactionManager.processCommands(ChannelControl)`, replaced by `processCommands()` without parameter.

#### Removals tied to string-based protocol configuration

These evolutions are **detailed in Theme 6** (see §7) and listed here as a summary:

- **Removed**: `ConfigurableCardReader` interface (and its methods `activateProtocol`, `deactivateProtocol`, `getCurrentProtocol`). The string-based protocol activation mechanism disappears entirely.
- **Removed**: `CardSelector.filterByCardProtocol(String logicalProtocolName)`, replaced by typed `filterByCardType(CardType)` (see §7.3).

### 6.2 Card API

- **Removal**: `ChannelControl` (consistency with the Reader API).
- **Removal**: `ProxyReaderApi.releaseChannel()`.
- **Removal**: `CardResponseApi.isLogicalChannelOpen()`.

### 6.3 Calypso Card API

#### Removals

- `TransactionManager.processCommands(ChannelControl)` — alignment with the Reader API and the Card API.
- Removed exceptions:
   - `UnexpectedCommandStatusException` — covered by `InvalidCardResponseException` at the Reader level;
   - `ReaderIOException` — covered by `ReaderCommunicationException` at the Reader level;
   - `CardIOException` — covered by `CardCommunicationException` at the Reader level.

  Rationale: these three Calypso exceptions duplicated exceptions at the Reader / Card level. They are removed in favor of the lower-level exception hierarchy, which is already propagated naturally.

#### Consistency with Reader API renamings

- The `CardTransactionManager` interface (Reader API) remains referenced by stereotype on `TransactionManager` (Calypso); the new multi-channel interface `MultichannelCardTransactionManager` is also referenced by stereotype on the new Calypso `MultichannelTransactionManager`. The internal Reader API renamings thus propagate by stereotype in the Calypso diagram, without requiring additional modification on the Calypso Card API side.

---

## 7. Theme 6 — Strict Typing of RF Technologies and Card Types (ECP Support)

### 7.1 Motivation

Two drivers converge and justify this work stream:

1. **End of free-form strings for protocols**. Versions 1.x and 2.x configured protocol activation and selection filtering using **character strings** (`String physicalProtocolName`, `String logicalProtocolName`). This approach posed several problems: non-normalized values from one integrator to another, typos undetected at compile time, scattered documentation of the "right" values to use, inability for the IDE to assist the integrator, lack of discoverability of supported cases.
2. **Arrival of ECP support** (Enhanced Contactless Polling). ECP is a mechanism defined by the **Apple ECP specification** enabling fast card detection (notably Calypso) in transit mode on iPhone, which requires sending a **specific polling frame** at the moment detection starts. The frame itself is treated as opaque binary data (`byte[]`) constructed by the application in accordance with the Apple specification, and transmitted as-is by the framework to the reader. This need had no proper representation in the 2.x API: `startCardDetection` took only a `DetectionMode`, with no way to carry an ECP frame or to target particular RF technologies.

The conjunction of the two has triggered the refactoring. ECP is the concrete occasion that justifies ending the free-form protocol string system now, by introducing both:

- **strongly typed enumerations** (`RfTechnology`, `CardType`) that replace strings;
- a **detection parameters interface** (`CardDetectionSettings`) extensible in builder format, which makes ECP support possible without breaking the signature when other sophisticated polling mechanisms appear.

### 7.2 New Foundation API — Terminal Definitions API

The `RfTechnology` and `CardType` enumerations **are not defined in the Reader API**: they are placed in a **new foundation API** created on the occasion of 3.0.0, the **Terminal Definitions API**.

#### Role and purpose

The Terminal Definitions API exposes neither service interfaces, nor SPIs, nor state machines. Its sole purpose is to host the **cross-cutting enumerated types** that constitute **global constants** shared between several Terminal APIs. At its creation, it contains the two enumerations introduced by Theme 6; but it is **intended to progressively host** other cross-cutting enumerations as future evolutions occur (for instance, one can imagine migrating to it tomorrow notions currently scattered such as `FileOccurrence`, `FileControlInformation`, or future enumerations shared between Reader, Card and Calypso).

#### Structural consequences

- **New UML repository**: `calypsonet-terminal-definitions-uml-api`, created on the same organizational model as the other `calypsonet-terminal-*-uml-api` repositories, with its own `api_class_diagram.puml` (version `1.0.0-SNAPSHOT`) and its independent versioning cycle.
- **New Keypop Java module**: `keypop-definitions-jvm-api` (to be created).
- **Dependency**: the Terminal Reader API 3.0.0 **depends** on the Terminal Definitions API. This dependency is:
   - **public** (the enums appear in the public signatures of `CardSelector.filterByCardType`, `CardDetectionSettings.setRfTechnologies`, `CardSelectionResult.getCardType`, etc.);
   - **transitive** on the Java side (consumers of the Reader API automatically obtain access to the enums without additional declaration).
- The other Terminal APIs (Card, Calypso Card) **do not** depend on the Terminal Definitions API at this stage, but may do so in the future if a cross-cutting enumeration concerns them.

#### Rationale for a dedicated API rather than a sub-package of the Reader API

Several reasons motivate the extraction into a separate module:

1. **Cross-cutting reusability**: `RfTechnology` and `CardType` (and future enums) are lower-level notions than the Reader API. Confining them to the Reader API would force any other Terminal API that wished to reference them to depend on the entire Reader API.
2. **Stability**: global constants evolve at their own pace (generally very slow and backward-compatible). Isolating them in a dedicated module allows them to have their own versioning cycle, without carrying the noise of Reader API changes.
3. **Readability**: the Terminal Definitions API acts as a single, documented entry point for global constants, rather than scattering these notions in `…/definitions` packages within each API.

#### Initial content of the Terminal Definitions API

The UML repository `calypsonet-terminal-definitions-uml-api` has been created and embeds, in its version `1.0.0-SNAPSHOT`, a diagram with:

- **`DefinitionsApiProperties`** — class carrying the module's `VERSION` constant (on the same model as `ReaderApiProperties`, `CardApiProperties`, etc.);
- **`RfTechnology`** — supported radio communication technologies:
   - `ISO_14443_AB`
   - `INNOVATRON_B_PRIME`
   - `FELICA`
   - `ISO_15693`
- **`CardType`** — identifiable card types:
   - `ISO_7816_3` (contact cards)
   - `ISO_14443_4` (ISO 14443-4 contactless cards, without A/B distinction at the type level)
   - `ISO_14443_3A_MIFARE_CLASSIC_1K`, `ISO_14443_3A_MIFARE_CLASSIC_4K`, `ISO_14443_3A_MIFARE_ULTRALIGHT`
   - `ISO_14443_3B_ST25_SRT512`
   - `INNOVATRON_B_PRIME`, `FELICA`, `ISO_15693`
   - `UNKNOWN`

> **Note on `CardType` granularity and the A/B asymmetry with `RfTechnology`**:
>
> - `RfTechnology` is an **input** datum (polling) at the RF sub-layer level: `ISO_14443_AB` merges A and B because, at the polling level, the integrator declares interrogating "the ISO 14443 family" without having to distinguish the variant.
> - `CardType` is an **output** datum (detection result) that combines protocol level and product identity:
    >   - for **transport** standards (ISO 14443-4, ISO 7816-3, ISO 15693), the RF sub-layer (3A or 3B) does not change the application behavior: a single value `ISO_14443_4` is sufficient.
>   - for **proprietary products** where the RF sub-layer is semantically tied to the product (MIFARE on 14443-3A, ST25 on 14443-3B), the product granularity naturally exposes the variant (`ISO_14443_3A_MIFARE_CLASSIC_1K`, `ISO_14443_3B_ST25_SRT512`, etc.).
>
> This dual granularity (transport vs product) explains why A/B is merged on the input side (`RfTechnology`) and at the ISO 14443-4 transport level (`CardType`), while remaining distinguishable at the product type level.
>
> Both enumerations are designed to evolve: adding a new value in the Terminal Definitions API is a **backward-compatible** evolution on its minor versions.
>
> **Note on `CardType.UNKNOWN`**: this value is returned by `CardSelectionResult.getCardType()` when the framework **could not identify** the type of the detected card (card of a type not yet referenced in the enumeration, or partial detection). On the `CardSelector.filterByCardType(UNKNOWN)` side, this allows the integrator to **explicitly capture** these unidentified cards rather than ignoring them silently.

### 7.3 Reader API — strict typing

#### `CardSelector` refactoring

- **Removed**: `T filterByCardProtocol(String logicalProtocolName)`.
- **New method**: `T filterByCardType(CardType cardType)` — filters by card type, using the `CardType` enumeration of the Terminal Definitions API.

`CardType` is the datum characterizing what was detected and is, as such, the natural filtering criterion at selection: we filter by **what the card is**. The associated RF technology is implicitly encoded by `CardType` (`ISO_14443_4` ⇒ ISO 14443-AB, `FELICA` ⇒ FELICA, etc.), which makes any additional filter on `RfTechnology` redundant.

#### Complete removal of `ConfigurableCardReader`

The `ConfigurableCardReader` interface and its three methods `activateProtocol(String, String)`, `deactivateProtocol(String)`, `getCurrentProtocol()` are **entirely removed** in 3.0.0. The string-based mechanism no longer has a place in the model: protocol activation on the reader side now passes through the typed parameters transmitted at detection startup (see §7.4).

### 7.4 Reader API — detection parameterization

#### Single `CardDetectionSettings` interface (builder)

All detection information (mode, RF technologies, ECP frame) is carried by **a single interface** in builder format:

```text
CardDetectionSettings
  ├── CardDetectionSettings setDetectionMode(DetectionMode detectionMode)
  ├── CardDetectionSettings setRfTechnologies(Set<RfTechnology> rfTechnologies)
  └── CardDetectionSettings setEcpFrame(byte[] ecpFrame)
```

- **`setDetectionMode`** — sets the detection mode (`REPEATING` or `SINGLE_SHOT`). `DetectionMode` is now the **inner enumeration** of `CardDetectionSettings`.
- **`setRfTechnologies`** — declares the set of RF technologies to activate during polling. Not relevant for contact readers (accepted without effect).
- **`setEcpFrame`** — provides the ECP frame to emit at polling startup. Relevant only on readers supporting ECP.

The instance is created via the factory:

```text
ReaderApiFactory.createCardDetectionSettings() : CardDetectionSettings
```

#### Default values and tolerance of unsupported parameters

- **Default values** applied if the corresponding setters are not invoked:
   - `DetectionMode.REPEATING` for the detection mode;
   - `{ RfTechnology.ISO_14443_AB }` for the set of RF technologies.
- **Tolerance of unsupported parameters**: if a provided parameter is not supported by the reader (for example an `RfTechnology` that the reader cannot activate, or an ECP frame transmitted to a reader that does not support ECP), the parameter is **silently ignored** and a **`WARN`-level message** is logged by the implementation. **No exception** is thrown. This permissive behavior guarantees that a heterogeneous deployment (ECP terminals + non-ECP terminals, mixed fleet) can share the same application code.

The complete contract is documented in the Javadoc on the implementation side.

### 7.5 Reader API — refactoring of ObservableCardReader

`ObservableCardReader` is a **single** interface, valid for all reader types (contact, contactless, ECP). Its new detection start signature is:

```text
2.x : void startCardDetection(DetectionMode detectionMode)
3.0 : void startCardDetection(CardDetectionSettings settings, CardReaderEventHandler eventHandler)
```

The signature carries in a single call the **observer** (`CardReaderEventHandler`, see Theme 3) **and the detection configuration** (`CardDetectionSettings`, see §7.4), thereby eliminating the invalid intermediate states of the 2.x model. The nature of the reader is reflected at runtime by the setters used on `CardDetectionSettings` and by the internal consistency of the reader implementation.

#### Exposure of the detected `CardType` on `CardSelectionResult`

The "detected card type" information is carried by the **selection result** (`CardSelectionResult`). A new method is added to it:

- `CardType getCardType()` — on `CardSelectionResult`, returns the card type (`CardType` of the Terminal Definitions API) effectively detected.

This is the unique post-detection getter: `RfTechnology` is not the subject of a dedicated getter, since it is implicitly encoded by `CardType`.

This placement homogenizes the API surface: `CardSelectionResult` is the access point to the information resulting from detection / selection (`getSmartCards()`, `getActiveSmartCard()`, `getActiveSelectionIndex…()`, `getCardType()`), and the validity lifetime of the `CardType` is intrinsically tied to the lifecycle of the selection result.

### 7.6 Rationale

- **Compile-time safety on values**: moving from `String` (free-form protocols) to enums (`RfTechnology`, `CardType`) eliminates a whole class of bugs (typos, undocumented proprietary values) and makes the API self-describing (IDE auto-completion, Javadoc centralized on the enums).
- **API simplicity**: a single `ObservableCardReader`, a single `CardDetectionSettings`. The API surface exposed to the integrator is minimal and homogeneous regardless of the targeted reader type.
- **Extensibility**: `CardDetectionSettings` is open — adding tomorrow a new polling parameter (a new optimization technique for a new standard, etc.) will consist in adding a setter to the interface, **without touching** the signature of `startCardDetection` and without breaking binary compatibility (adding a `default` method to an interface is backward-compatible).
- **Input / output separation**: `RfTechnology` is an **input** parameter (polling, via `CardDetectionSettings.setRfTechnologies`); `CardType` is the **output** datum (detection result, exposed by `CardSelectionResult.getCardType()` and usable in selection via `CardSelector.filterByCardType`).
- **Consistent data localization**: the detected `CardType` is exposed on `CardSelectionResult`, which gathers all the information resulting from detection / selection.
- **Single, typed protocol declaration**: in 2.x, the protocol had to be declared twice (once on the reader side via `activateProtocol`, once on the selector side via `filterByCardProtocol`). In 3.0.0, the declaration is unique and typed (`CardDetectionSettings.setRfTechnologies` for polling, `CardSelector.filterByCardType` for selection).
- **Cross-cutting reusability**: the extraction of the enums into the **Terminal Definitions API** (see §7.2) guarantees that future Terminal APIs (or evolutions of current APIs) will be able to reference these global constants **without inducing a dependency to the Reader API**.

---

## 8. Migration Procedure

The migration of application code from versions 1.x or 2.x to 3.0.0 will be the subject of a **dedicated technical migration guide**, published separately after validation of 3.0.0 by the TC Terminal and after alignment of the associated Keypop Java implementations.

This guide will aim to **simplify the transition** to 3.0.0 as much as possible: 1:1 mapping of removed / renamed / refactored elements, rewriting patterns (`before` / `after`) for the most frequent use cases, progressive adoption rules and known pitfalls.

---

## 9. Next Steps and TC Terminal Validation

### 9.1 Scope submitted for validation

This document submits the following elements to the validation of the **CNA TC Terminal**:

1. **The principle** of the six evolution themes exposed (§2 to §7) and the overall consistency of the 3.0.0 work stream.
2. **The design choices** documented in the "Rationale" sections of each theme — in particular:
   - the explicit multi-channel model relying on the `SmartCard(Spi)` as named target (§2.5);
   - the duration bounding carried both at the APDU level and at the Calypso session level, with filtering by `csnMin` threshold (§3.4);
   - the merging of the Observer pattern into a single `CardReaderEventHandler` SPI (§4.3);
   - the introspection of the Calypso secure session via `SecureSessionStatus` and `SecureSessionType` (§5.3);
   - the extraction of `RfTechnology` and `CardType` into a **new foundation API** (`Terminal Definitions API`) (§7.2, §7.6);
   - the **`CardDetectionSettings` builder model** for detection parameterization (§7.4);
   - the **`CardSelector.filterByCardType` filter** as the unique typed filtering criterion at selection (§7.3);
   - the **exposure of the detected `CardType` on `CardSelectionResult`** (§7.5).
3. **The detailed content** of the `3.0.0-SNAPSHOT` UML diagrams of the three existing APIs (`Reader`, `Card`, `Calypso Card`) and `1.0.0-SNAPSHOT` of the new `calypsonet-terminal-definitions-uml-api` UML repository, which materialize these choices — **accessible directly** via the links provided in the [Reference UML Diagrams](#reference-uml-diagrams) section at the top of the document, in two forms: final version and version with 2.x → 3.0.0 diff.
4. **The introduction** of the new foundation API (UML repository created, Java module `keypop-definitions-jvm-api` to be created).
5. **The principle** of a dedicated migration procedure to be provided subsequently to integrators (see §8).

### 9.2 Points of attention for the review

A few points for which particular TC attention is sought:

- the **stability of the initial content** of the `RfTechnology` and `CardType` enumerations (§7.2) — the future addition of values will be backward-compatible, but the removal of a value would not be; in particular, the choice to represent ISO 14443-4 by a single value `ISO_14443_4` without A/B distinction (see §7.2, note on `CardType`) deserves explicit TC confirmation;
- the appropriateness of the **complete removal** of `ConfigurableCardReader` without a transitional deprecation phase (§7.3), justified by the major version context;
- the **semantics of `csnMin`** as a threshold on the CSN for duration bounds (§3.3) — this mechanism must be usable by all targeted Calypso deployment profiles;
- the **`SmartCard` lifecycle contract** held by the `CardReader` (§2.3.2), which is documented in the Javadoc on the implementation side but does not appear in the UML diagram; the TC is invited to confirm that this prose description is sufficient, or to request additional formalization.

### 9.3 Next steps

Once version 3.0.0 is validated by the TC Terminal:

1. **Finalization of the UML diagrams**: removal of struck-through (`<s>`) elements and grey (`<color:grey>`) elements that are not retained, generation of the definitive SVGs, transition of the repositories from `3.0.0-SNAPSHOT` to `3.0.0` (and from `1.0.0-SNAPSHOT` to `1.0.0` for the `calypsonet-terminal-definitions-uml-api` UML repository, already created).
2. **Creation of the new Java module** `keypop-definitions-jvm-api` corresponding to the Terminal Definitions API, and **alignment of the existing Keypop Java modules** (`keypop-reader-java-api`, `keypop-card-java-api`, `keypop-calypso-card-java-api`) with 3.0.0.
3. **Writing and publication of the technical migration guide** for the integrator (see §8).
4. **Communication** of the availability of 3.0.0 to the integrators and to the CNA working groups concerned.

---

*End of document.*
