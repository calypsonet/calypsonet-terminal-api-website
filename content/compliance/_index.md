---
title: Terminal Compliance
type: book
toc: true
weight: 10
---

## Ticketing Terminal Requirements
To counteract the interoperability issues frequently encountered between ticketing terminal solutions and contactless smartcard products, [CNA](https://calypsonet.org/) has specified a set of requirements that need to be followed by the different software layers of ticketing terminals.
These rules are specifically dedicated to 3 software layers, from the lowest to the highest level:
- the [Reader Layer Requirements](https://calypsonet.org/reader-layer-requirements-200422/),
- the [Calypso Layer Requirements](https://calypsonet.org/calypso-layer-requirements-200423/),
- and the [Ticketing Layer Requirements](https://calypsonet.org/ticketing-layer-requirements-200430/).

The structure of the ticketing terminal APIs has been designed to match this architecture targeted by the ticketing terminal requirements.

In the near future, CNA plans to offer a certification program for ticketing terminal solutions to validate compliance with requirements for the reader layer and the Calypso layer. → The support of the Ticketing Terminal APIs will then be required to pass these certifications.

## APIs compatibility with Terminal Requirements

### From Reader API version 2.0 & Calypso Card API version 2.0
The ticketing terminal APIs enable the implementation of libraries that unconditionally fully comply with the ticketing terminal requirements of the reader and Calypso layers.

### Up to Reader API version 1.3 & Calypso Card API version 1.8
The older ticketing terminal APIs can be implemented by libraries that can "generally" follow the terminal requirements of the reader and Calypso layers, but with a limitation on the localization of the card selection management.
<br>On early versions of the Reader and Calypso APIs, the card selection was managed through the Calypso API instead of the Reader API.

## Implementation compliance
CNA offers a [guide to assist declarations of compliance](https://keyple-support.calypsonet.org/basics/compliance/) with terminal requirements for solutions based on [Eclipse Keyple](https://keyple.org/) libraries.



