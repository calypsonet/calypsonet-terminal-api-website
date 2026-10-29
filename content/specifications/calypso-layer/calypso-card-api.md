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
<span class="component-metadata">{{< icon name="book" pack="fas" >}} [Specification](https://docs.terminal-api.calypsonet.org/calypso-card/)</span>
<span class="component-metadata">{{< icon name="github" pack="fab" >}} [GitHub repository](https://github.com/calypsonet/calypsonet-terminal-calypso-card-api-spec/)</span>
{{% /callout %}}

As part of the **Card Layer**, the **Calypso Card API** provides the high-level functionality that terminal
applications use to select a Calypso product and run transactions with it.

<br>

## What it provides

- **Card image** — a successful selection gives access to the identification data, the file structure and the
  records of the selected application.

- **Prepare then process** — commands are first prepared, then processed in a single exchange with the card, which
  minimises the number of round trips, especially in a distributed architecture.

- **One transaction manager per context** — free transactions, secure sessions in symmetric cryptography, regular or
  extended, and secure sessions in asymmetric cryptography, each offering the operations its context allows.

- **Security settings** — the keys, the certificates and the timing bounds of the countermeasures against relay
  attacks and card emulation are configured per card profile.

- **Stored Value** — reload, debit and debit cancellation, with the balance and the transaction history of the
  electronic purse.

<br>

## Calypso card transaction without secure session

Outside a secure session, the application prepares card commands, then processes them in a single exchange with the
reader. The commands addressed to the crypto module — data signature and verification, ciphering and un-ciphering —
are queued together with the card commands, in the order in which they were prepared, and processed by the same
call: the two kinds may be interleaved within one transaction.

### _Plain_ PIN Verification or Update

A free transaction is enough here: no cryptographic computation takes place, so no crypto module is involved.

{{< figure src="/media/specifications/calypso_transaction_Verify_Change_Plain_PIN_sequence_diagram.svg" caption="Calypso Card API - Plain PIN Verification or Update - Sequence Diagram" >}}

### _Ciphered_ Key / PIN update outside a session

The new value is ciphered by the SAM before being sent to the card, so the transaction must be secured with
symmetric cryptography even though no secure session is opened.

{{< figure src="/media/specifications/calypso_transaction_Change_Key_Ciphered_PIN_sequence_diagram.svg" caption="Calypso Card API - Ciphered Key / PIN update outside a session - Sequence Diagram" >}}

### Data secure processing (data PSO _signature_ / _ciphering_) outside a session

The data read from the card is signed, verified, ciphered or un-ciphered by the SAM; the card itself takes no part
in the computation.

{{< figure src="/media/specifications/calypso_transaction_DSP_outside_session_sequence_diagram.svg" caption="Calypso Card API - Data secure processing outside a session - Sequence Diagram" >}}

### Stored Value operation outside a session

A reload or a debit of the electronic purse may be run without opening a secure session. The Stored Value command
must immediately follow its SV Get, which carries the balance and the card challenge.

{{< figure src="/media/specifications/calypso_transaction_standalone_SV_operation_sequence_diagram.svg" caption="Calypso Card API - Stored Value operation outside a session - Sequence Diagram" >}}

## Secure session with a Calypso card

A secure session authenticates the card and the terminal to each other and makes the card modifications atomic:
either the session is closed successfully and every modification is kept, or it is interrupted and the card keeps
none of them. The scenarios below show that same mechanism tuned for different contexts.

### _Regular_ secure session <span style="color: red;">optimized for fast **embedded** performance</span>

This example illustrates the ticketing processing of a validation: only the necessary data is read from the card.

For access control to a transit network or a building, ticketing terminals are generally automatic machines on which
the rights verification transaction starts as soon as a contactless card is detected in the field emitted by the
reader. For transactions to run smoothly, without error recovery, the dialogue with the card must be very fast, and
the card presentation and withdrawal phases must be reliably managed.

The aim is to save milliseconds by minimizing the volume of data exchanged with the card. To keep the amount read to
the strict minimum, read operations are not grouped: each response is analyzed to determine whether the next read is
necessary. Reducing the data read from the card also reduces the data sent to the SAM reader during the session to
update the session hash computation.

On the SAM side, two rules apply:

- limit the number of operations performed during the contactless card transaction — the SAM challenge can be
  obtained before the card is even presented;
- group as many SAM exchanges as possible, to counteract the latency of a contact reader and to share one APDU
  command header with as much data as possible.

Card responses to write commands, such as counter increments and decrements, are therefore anticipated. Under these
conditions, a single group of SAM commands is needed during the card transaction to generate the session MAC, and
the card authenticity can be verified while waiting for the card to be removed.

The reader of a configured and active ticketing terminal moves between the three states the diagram names: *Wait For
Card Insertion*, while no card is present; *Wait For Card Processing*, once a card has been detected; and *Wait For
Card Removal*, once the transaction is over. A terminal must be certain that the card has left the field before
detecting a new one, and no timeout can guarantee that — too short, the card still present is caught again; too
long, the terminal stays unavailable. The reader is therefore the one that notifies the withdrawal.

For a transaction that updates card data, such as a rights decrementation or the recording of an event, the
ratification mechanism of the Calypso secure session guarantees that the cardholder loses no rights if the
radio-frequency transmission is interrupted. Reading the last ticketing event at session opening reveals a card
presented twice in quick succession on an access control line. When that event is very recent, the unratified status
of the card tells whether it is a recovery transaction, for which the cardholder may have to be re-authenticated
without being debited again, or an attempt to obtain a second access for another person — the anti-passback case.

At session closing, the ratification command is sent to the card immediately, to minimize the need for a recovery
transaction.

{{< figure src="/media/specifications/calypso_transaction_regular_secure_session_optimized_embedded_sequence_diagram.svg" caption="Calypso Card API - Regular secure session optimized for fast embedded performance - Sequence Diagram" >}}

### _Regular_ secure session <span style="color: red;">optimized for an efficient **distributed** system</span>

In most of the cases, it should be possible to handle a secure session with a Calypso card, using only:

- 3 exchanges with the card reader (selection processing, session opening processing, and session closing
  processing),
- and 3 exchanges with the SAM reader (terminal session challenge recovery, session MAC computation, and card
  authentication).

This example shows the loading of a contract during a sale. To speed up the identification of the card content while
limiting the exchange of messages with the card reader, some data is read out of session during the selection, then
read again during the session.

In case of communication failure with the card, if the recovery transaction is supported only on the same terminal,
then checking the ratification status is not necessary at session opening, and the session can be closed as
ratified.

{{< figure src="/media/specifications/calypso_transaction_simple_secure_session_distributed_sequence_diagram.svg" caption="Calypso Card API - Regular secure session optimized for an efficient distributed system - Sequence Diagram" >}}

### PIN ciphered verification inside a session

Inside a session, the PIN is ciphered by the SAM with the session keys before being presented to the card, so that
it never travels in clear.

{{< figure src="/media/specifications/calypso_transaction_Verify_Ciphered_PIN_inside_session_sequence_diagram.svg" caption="Calypso Card API - PIN ciphered verification inside a session - Sequence Diagram" >}}

### Data secure processing (data PSO _signature_ / _ciphering_) inside a session

The same secure processing of data takes place inside the session, the SAM commands being interleaved with the card
commands and processed together.

{{< figure src="/media/specifications/calypso_transaction_DSP_inside_session_sequence_diagram.svg" caption="Calypso Card API - Data secure processing inside a session - Sequence Diagram" >}}

### Stored Value operation inside a session

A Stored Value operation may also take place inside a secure session. It must immediately follow its SV Get, and
only one Stored Value command is allowed per session.

{{< figure src="/media/specifications/calypso_transaction_SV_inside_session_sequence_diagram.svg" caption="Calypso Card API - Stored Value operation inside a session - Sequence Diagram" >}}

### _Extended_ secure session with early mutual authentication

On a Calypso Prime Extended product, the terminal can be authenticated by the card early in the session instead of
at its closing, so that the sensitive operations are only performed once the mutual authentication is acquired.

{{< figure src="/media/specifications/calypso_transaction_extended_authentication_secure_session_embedded_sequence_diagram.svg" caption="Calypso Card API - Extended secure session with early mutual authentication - Sequence Diagram" >}}

### _Extended_ secure session with encrypted commands

Still on a Calypso Prime Extended product, the APDUs exchanged inside the session can be ciphered, which protects
the confidentiality of the data read and written. Encryption lengthens the transaction, so it is usually limited to
the commands that need it.

{{< figure src="/media/specifications/calypso_transaction_extended_encryption_secure_session_embedded_sequence_diagram.svg" caption="Calypso Card API - Extended secure session with encrypted commands - Sequence Diagram" >}}

### Multiple secure sessions

When the prepared modifications exceed the session buffer of the card, the transaction is split into several
consecutive sessions. The modifications are then no longer atomic: the diagram shows what the card has already
committed when the second session opens.

{{< figure src="/media/specifications/calypso_transaction_multiple_secure_session_sequence_diagram.svg" caption="Calypso Card API - Multiple secure sessions - Sequence Diagram" >}}

## Several applications in parallel

Several applications of the same card may be selected at once, each on its own logical channel, and operated one
after the other without a new selection.

{{< figure src="/media/specifications/calypso_transaction_multichannel_applications_sequence_diagram.svg" caption="Calypso Card API - Several applications in parallel - Sequence Diagram" >}}

## Command exchange duration bounds

The most sensitive command exchanges may be bounded in time, per card profile. An exchange longer than its bound
reveals a relay attack or a card emulation; what follows depends on whether a secure session is open.

{{< figure src="/media/specifications/calypso_transaction_duration_bound_overrun_sequence_diagram.svg" caption="Calypso Card API - Command exchange duration bound exceeded - Sequence Diagram" >}}

<br>

## Learn more

The specification is the normative reference: it covers the complete type and operation set, the behaviour of a
secure session, the duration bounds, the UML class diagram and the glossary of terms.

→ [Read the full Calypso Card API specification](https://docs.terminal-api.calypsonet.org/calypso-card/)
