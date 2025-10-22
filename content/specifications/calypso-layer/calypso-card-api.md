---
title: Calypso Card API (external)
linktitle: 🟢 Calypso Card
summary: Public high-level API which standardizes the way to interact with a Calypso® product (card, NFC smartphone applet/application, SAM, etc.).
type: book
weight: 1
toc: true
---

{{% callout note %}}
Latest version **`{{% calypso-card-api-version %}}`**
<span class="component-metadata">{{< icon name="sitemap" pack="fas" >}} [UML class diagram](https://docs.terminal-api.calypsonet.org/calypsonet-terminal-calypso-card-uml-api/)</span>
<span class="component-metadata">{{< icon name="github" pack="fab" >}} [GitHub repository](https://github.com/calypsonet/calypsonet-terminal-calypso-card-uml-api/)</span>
{{% /callout %}}

As part of the **Card Layer**, the **Calypso Card API** provides high-level functionality for selecting and performing 
transactions with Calypso cards.

<br>

## Interfaces

The **Calypso Card API** provides the means to select a target card and then perform a transaction with the selected card.
- The result of a card selection is a smart card image whose file structure and data records can be browsed.
- A transaction with a target card may involve a control SAM to secure the operations.

The `CalypsoCard` interface provide **accessors** to recover the information of the selected smart card.

To optimize the number of exchanges with a card reader, the **Calypso Card API** allows grouping the commands.
A set of commands could be first **prepared**, and then be **processed** by a selected target at the selection or
during the transaction.
A transaction with a Calypso card is fully managed through the `CardTransactionManager` interface:

![Calypso Card API - class diagram](https://docs.terminal-api.calypsonet.org/calypsonet-terminal-calypso-card-uml-api/{{% calypso-card-api-version %}}/api_class_diagram.svg)

<br>

## Selection of a Calypso card

A Calypso card selection could be defined to accept or not invalidated card.

Through the selection only basic Select File (without changing DF) or Read Records commands could joined: the goal is to
recover in the selection result some file status or record data of elements present in all cards of a ticketing networks.
The type of card product has not yet been identified, the commands are prepared to be supported by all types of card
products: Prime, Light, or Regular.

Then, if a Calypso card has matched the selection request, a Calypso card image is returned, some file headers or file
records could be filled depending on the information recovered in the responses of the Select File or Read Records
processed.

<br>

## Calypso card transaction without secure session

Except the operations involving secure processing on "data" (data signature computation / verification, data ciphering /
un-ciphering), only commands for the card need to be prepared though the Card Transaction Manager interface.
Depending on the operation, if necessary the security involving the master SAM must be controlled internally by the
Calypso library.

### _Plain_ PIN Verification or Update

{{< figure src="/media/specifications/calypso_transaction_Verify_Change_Plain_PIN_sequence_diagram.svg" caption="Calypso Card API - Verify / Change Plain PIN - Sequence Diagram" >}}

### _Ciphered_ Key / PIN update outside a session

{{< figure src="/media/specifications/calypso_transaction_Change_Key_Ciphered_PIN_sequence_diagram.svg" caption="Calypso Card API - Change Key / Ciphered PIN outside a session - Sequence Diagram" >}}

### Data secure processing (data PSO _signature_ / _ciphering_) outside a session

{{< figure src="/media/specifications/calypso_transaction_DSP_outside_session_sequence_diagram.svg" caption="Calypso Card API - Data secure processing outside a session - Sequence Diagram" >}}

### Stored Value operation outside a session

{{< figure src="/media/specifications/calypso_transaction_standalone_SV_operation_sequence_diagram.svg" caption="Calypso Card API - standalone Stored Value transaction - Sequence Diagram" >}}

## Secure session with a Calypso card

### _Regular_ secure session <span style="color: red;">optimized for fast **embedded** performance</span>

This example illustrates the ticketing processing of a validation: only the necessary data is read from the card.

For access control to a transit network or a building, using a contactless card to authenticate the holder's rights, ticketing terminals are generally automatic machines for which the rights verification transaction is automatically launched when the contactless card is detected in the RF field emitted by the terminal's reader. For transactions to run smoothly, without the need for error recovery, it is important that the contactless transaction with the card is very fast, and that the card presentation and withdrawal detection phases are reliably managed.

The aim is to <u>save milliseconds</u> by minimizing the volume of data transmitted during contactless communication with the card to complete the ticketing transaction.<br>
In order to limit the amount of data to be read from the card to the strict minimum, card reading operations cannot be grouped together. Each card response needs to be analyzed, to determine whether the next reading operation is necessary. Reducing the volume of data transmitted by the contactless card reader also reduces the amount of data to be transmitted to the SAM reader during the session, in order to update the session hash calculation.<br>
On the SAM side, it is necessary to:
- limit the number of operations to be performed during the contactless card transaction: SAM challenge recovery can be anticipated before a card transaction.
- group as many SAM exchanges as possible to be processed during the session (to counteract contact reader latency, and to share an APDU command header with a maximum amount of data to be transmitted)

It is therefore necessary to anticipate card responses to write commands (counter increment/decrement). Under these conditions, only one group of SAM commands is needed during the card transaction to generate the SAM session MAC. Card authenticity verification can be performed while waiting for card removal.

The contactless reader of a configured and active ticketing terminal can switch between 3 states:
- in '*standby mode*', the reader is waiting for a new card to be detected.
- when a card is detected, the reader is in card '*processing mode*'.
- when the card transaction is completed, the reader is '*waiting for the removal*' of the card.
  Following a card transaction, a terminal must be sure that the card has indeed been removed from the RF field, before considering detecting a new one.

For this reason, a terminal cannot be confident of a timeout at the transaction completion, as this timeout will either be too short (the previous card still present will be grabbed again) or too long (the terminal will remain unavailable for a long time). The contactless reader shall notify the withdrawal of the card.

For a ticketing transaction during which card data is updated (right decrementation, memorization of an event), the “ratification” mechanism supported by the Calypso secure session guarantees that the cardholder will not lose any rights if the RF transmission with the card is interrupted.<br>
When a session is opened, the verification of a last ticketing event makes it possible to identify whether a card has been presented twice in quick succession on an access control line.<br>
In the case of very recent event, the card's “unratified” status can be used to determine whether
- whether it is a recovery transaction, for which it may be necessary to re-authenticate the cardholder without debiting new rights;
- or if it is an attempt to obtain a second access for another person (anti-passback).

When a session is closed, the ratification command is immediately transmitted to the card, to minimize the need for transaction recovery.



{{< figure src="/media/specifications/calypso_transaction_regular_secure_session_optimized_embedded_sequence_diagram.svg" caption="Calypso Card API - Simple Secure Session - Sequence Diagram" >}}

### _Regular_ secure session <span style="color: red;">optimized for an efficient **distributed** system</span>

In most of the cases, it should be possible to handle a secure session with a Calypso card, using only:
- 3 exchanges with the card reader (selection processing, session opening processing, and session closing processing),
- and 3 exchanges with the SAM reader (terminal session challenge recovery, session MAC computation, and card authentication).

This example shows the loading of a contract during a sale, to speed up the identification of the card content while
limiting the exchange of messages with the card reader, some data can be read out of session during the selection,
then read again during the session.

In case of communication failure with the card, if the recovery transaction is supported only on the same terminal,
then the checking of the ratification status is not necessary at the session opening, and the session could be closed as ratified.

{{< figure src="/media/specifications/calypso_transaction_simple_secure_session_distributed_sequence_diagram.svg" caption="Calypso Card API - Simple Secure Session - Sequence Diagram" >}}

### PIN ciphered verification inside a session

{{< figure src="/media/specifications/calypso_transaction_Verify_Ciphered_PIN_inside_session_sequence_diagram.svg" caption="Calypso Card API - Verify Ciphered PIN inside a session - Sequence Diagram" >}}

### Data secure processing (data PSO _signature_ / _ciphering_) inside a session

{{< figure src="/media/specifications/calypso_transaction_DSP_inside_session_sequence_diagram.svg" caption="Calypso Card API - Data secure processing inside a session - Sequence Diagram" >}}

### Stored Value operation inside a session

{{< figure src="/media/specifications/calypso_transaction_SV_inside_session_sequence_diagram.svg" caption="Calypso Card API - Stored Value transaction inside a secure session - Sequence Diagram" >}}

## Multiple secure sessions

{{< figure src="/media/specifications/calypso_transaction_multiple_secure_session_sequence_diagram.svg" caption="Calypso Card API - Multiple secure session - Sequence Diagram" >}}
