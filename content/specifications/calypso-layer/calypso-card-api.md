---
title: Calypso Card API (external)
linktitle: 🟢 Calypso Card
summary: Public high-level API which standardizes the way to interact with a Calypso® product (card, NFC smartphone applet/application, SAM, etc...).
type: book
weight: 1
toc: true
---

{{% callout note %}}
Latest version **`{{% calypso-card-api-version %}}`**
<span class="component-metadata">{{< icon name="project-diagram" pack="fas" >}} [UML class diagram](https://calypso-card-uml.terminal-api.calypsonet.org/)</span>
<span class="component-metadata">{{< icon name="github" pack="fab" >}} [GitHub repository](https://github.com/calypsonet/calypsonet-terminal-calypso-card-uml-api/)</span>
{{% /callout %}}

As part of the **Card Layer**, the **Calypso Card API** provides high-level functionality for selecting and performing 
transactions with Calypso cards.

<br>

## Interfaces

The **Calypso Card API** provides the means to select a target card and then perform a transaction with the selected card.
- The result of a card selection is a smartcard image whose file structure and data records can be browsed.
- A transaction with a target card may involve a control SAM in order to secure the operations.

The `CalypsoCard` interfaces provide **accessors** in order to recover the information of the selected smart card.

To optimize the number of exchanges with a card reader, the **Calypso Card API** allows to group the commands.
A set of command could be first **prepared**, and then be **processed** by a selected target at the selection or
during the transaction.
A transaction with a Calypso card is fully managed through the `CardTransactionManager` interface:

![Calypso Card API - class diagram](https://calypso-card-uml.terminal-api.calypsonet.org/{{% calypso-card-api-version %}}/api_class_diagram.svg)

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

In case of communication failure with the card, to support a recovery transaction on another terminal: the ratification
status and the last event are checked at the session opening, and the session is closed as not ratified directly
followed by a ratification command.

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
