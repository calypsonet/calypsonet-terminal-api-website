---
title: Terminal Compliance
type: book
toc: true
weight: 10
---

[CNA (Calypso Networks Association)](https://calypsonet.org/) has defined software interfaces that enable the generic control of any smart card reader, contactless or contact-based, regardless of whether it is used within or outside a Calypso ticketing system. These interfaces were designed to maximize compatibility and interoperability with all smart card solutions and all terminal architectures, both integrated and distributed.

## RF Certifications for contactless smartcard reader

Depending on the industry, various certification programs for the RF communication of contactless smart card readers are available:
-	EMVCo leads the “EMVCo Contactless Level 1 (PCD)” certification program to validate the lower layers for point-of-sale (POS) terminals and payment readers
-	The NFC Forum offers “NFC Forum Device Certification” for the “Reader/Writer” functions of mobile devices and consumer electronics
-	The “ICAO” verifies the compliance of biometric passport reader terminals with the “ICAO Doc 9303” standard.
-	For transportation ticketing terminals, CNA strongly recommends [ISO/IEC TS 24192 certification for PCD (Proximity Coupling Device)](https://www.smart-ticketing.org/certification-program), led by the [STA (Smart Ticketing Alliance)](https://www.smart-ticketing.org/).

Actual support for some optional RF features verified by these RF certifications may depend on the capabilities of the reader's software interface.

### Functional coverage of contactless readers with RF certified by the STA

The STA provides manufacturers of readers and terminals with an ICS form to fill out in order to register a solution for certification: ["Implementation Conformance Statements (ICS) for PT Readers version 3.3"](https://www.smart-ticketing.org/_files/ugd/fcd3b9_4f9bf46d93b54449810c8f0a49f89fc5.pdf) 

This form lists various optional capabilities to be declared for contactless readers: support for some of these features may require consideration at the level of the reader's software interfaces.

The STA certification verifies the optional **capability to handle and accept collisions between multiple cards at the same time** into the RF field of the reader:
> [**PCD2.2**] PT reader requires only one PICC in the field:
> - [ ] Yes
> - [ ] No

(To our knowledge, this is the only proximity RF certification program that supports this functionality.)

For a proximity contactless identification solution, we at CNA haven't yet identified a use case that would justify accepting card collisions on a contactless reader. Thus, **the “Terminal Reader API” defined by CNA does not offer the ability to handle conflicting connections**.

However, the “Terminal Reader API” is perfectly suited for controlling contactless reader solutions that do not support or prohibit RF collisions. We therefore **recommend integrating STA-certified contactless reader solutions with the “Terminal Reader API”, that are certified to require only one card in the field**.

The STA certifies the optional **capability of a contactless reader to shut off the RF field**.
> [**PCD2.8**] Capability to shut-off the field:
> - [ ] Yes
> - [ ] No

Starting **from version 3.0+, the Reader API provides a native method for controlling RF field shutdown** for contactless readers that support this feature.

For earlier versions (1.x / 2.x), the Reader API does not directly provide a method for managing RF field shutdown, but the Reader API integration remains compatible with these readers. In this case, a reader-specific software interface is required to manage RF shutdown.

Depending on the capabilities of the contactless readers, the STA verifies **support for various optional mechanisms that enable management of card “presence” detection**.

> [**PCD2.5**] (*) Card presence check method:
>  - [ ] Empty I-blocks
>  - [ ] R(NAK)
>  - [ ] None

Since version 1.0+, the Reader API offers an **“ObservableReader” interface that allows controlling readers able to notify when a card is inserted, or removed at the end of a transaction**. These APIs operate independently of the method used by the reader to detect the presence of a card. It is up to the software libraries implementing the Reader API to integrate the various card detection methods.

The STA verifies the **maximum sizes supported by contactless readers for transmitting an APDU** command or response.
> [**PCD5.1a**]  PCD internal output buffer size (used for Maximum size
> of UT_APDU):
> 
> [**PCD5.1b**]  PCD internal input buffer size (used for
> Maximum size of response UT_APDU):

Since version 1.0+, the “Card API” places no limits on the sizes of APDU commands or responses. The Card API supports all possible sizes of “Short APDU” or “Extended APDU” if the reader allows them.

## Ticketing Terminal Requirements
To counteract the interoperability issues frequently encountered between ticketing terminal solutions and contactless smartcard products, [CNA](https://calypsonet.org/) has specified a set of requirements that need to be followed by the different software layers of ticketing terminals.
These rules are specifically dedicated to 3 software layers, from the lowest to the highest level:
- the [Reader Layer Requirements](https://calypsonet.org/reader-layer-requirements-200422/),
- the [Calypso Layer Requirements](https://calypsonet.org/calypso-layer-requirements-200423/),
- and the [Ticketing Layer Requirements](https://calypsonet.org/ticketing-layer-requirements-200430/).

The structure of the ticketing terminal APIs has been designed to match this architecture targeted by the ticketing terminal requirements.

### Terminal APIs compatibility with Reader Layer Requirements 3.0

The optional support for **managing multiple logical channels** (requirement `RL-CLA-CHAAUTO.2` with applicability `Channels`) is supported **only starting with version 3.0+ of the “Reader API” and “Card API”** interfaces. For earlier versions of these interfaces, establishing card communication with a reader is limited to the “basic” channel.

Regarding the optional “Detection” applicability,
- For rule `RL-DET-REMNOTIF.1`: The Reader API 2.0+ and later define an `ObservableReader` interface that allows the ticketing software layer to be notified of card insertion or **removal events only during the transaction ending phase** (which corresponds to the practical use case).
- Rule `RL-DET-REMCTRL.1` is not supported; this requirement is irrelevant since, for a specific reader, the card detection mechanism cannot be selected; the reader layer only needs to be able to adapt to the detection methods implemented by compatible readers.
- The rule `RL-DET-REMCFG.1` cannot be directly supported by the “high-level” reader API: this requirement can potentially be supported for the readers concerned, on an optional basis, by a "low-level" reader API.

Regarding support for the `RL-SEL-USAGE.2` rule related to the `Selection` applicability, the **Reader API, since version 2.0+, does indeed require initiating a transaction with a card application using a “Select Application” APDU command** with a “DF Name” parameter provided by the ticketing software layer, **but only for smart card solutions complying with ISO 7816-4** (which meets the practical need).

Support for all other reader layer requirements should be handled transparently by a software library that implements the terminal Reader & Card APIs.

### Terminal APIs compatibility with Calypso Layer Requirements 2.0

The Calypso APIs have been designed to provide wide functional compatibility with Calypso card and SAM solutions:
- Starting with { `Calypso Card API 2.0+` / `Calypso Crypto Symmetric API 0.1+` / `Calypso Legacy SAM API 0.3+` }, all card features of the `Prime Extended`, `Prime Regular`, `Prime Revision 2`, `HCE`, `Light`, and `Basic` are supported, as well as all SAM features of the `SAM-C1`, `SAM-S1E1`, and `SAM-S1 DX` products.
- `Prime PKI` card features are supported starting with the { `Calypso Card API 2.1+` / `Calypso Crypto Asymmetric API 0.2+` } interfaces.

The Calypso APIs allow software libraries that implement them to comply with all requirements of the Calypso layer, except for these two.
- The `CL-SEL-SNHEADER.2` requirement defined for support of the Calypso `HCE` feature is not “directly” supported: in this case, the validity of the HCE token is not automatically verified internally, but the Calypso Card API provides the ticketing software layer with the elements needed to perform this verification at the upper layer.
- The `CL-SV-RECOVERY.1` requirement related to `Stored Value` functionality is not supported:
  - The definition of this requirement does not specify that this method of recovering a Stored Value transaction is possible only on the same ticketing terminal that detected the previous interruption, and only if that terminal has maintained the previous SAM context of the failed transaction (no other card must have been presented to the terminal before the recovery).
  - The Calypso Card API supports another, more reliable method for recovering Stored Value transactions: by recommending that a Stored Value transaction be nested within a secure Calypso session, in order to benefit from proof of ratification.


