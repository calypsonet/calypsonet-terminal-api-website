---
title: Calypsonet Terminal Calypso API
linktitle: Calypso API
summary: Public high-level API which standardizes the way to interact with a Calypso® product (card, NFC smartphone applet/application, SAM, etc...).
type: book
weight: 4
toc: true
---

---
The **Calypsonet Terminal Calypso API** is an extension of the **Calypsonet Terminal Reader API** which provides a 
high-level API standardizing the way to interact with a Calypso® product (card, NFC smartphone applet/application, SAM, 
etc...).

---
## Interfaces

The Calypso API  provides the means to select a target card or SAM and then perform a transaction with the selected target.
- The result of a card selection is a smartcard image whose file structure and data records can be browsed.
- The result of a SAM selection is a smartcard image whose keys' parameters can be read.
- A transaction with a target card or SAM may involve a master SAM in order to secure the operations.

The CalypsoCard & CalypsoSam interfaces provide **accessors** in order to recover the information of the selected smartcard.

To optimize the number of exchanges with a card reader of a SAM reader, the Calypso API allows to group the commands. 
A set of command could be first **prepared**, and then be **processed** by a selected target at the selection or 
during the transaction.
A transaction with a Calypso card is fully managed through the `CardTransactionManager` interface:

![Calypso API - class diagram](https://calypsonet.github.io/calypsonet-terminal-calypso-uml-api/{{% calypsonet-terminal-calypso-java-api-version %}}/api_class_diagram.svg)

---
## Selection of a Calypso card

A Calypso card selection could be defined to accept or not invalidated card.

Through the selection only basic Select File (without changing DF) or Read Records commands could joined: the goal is to
recover in the selection result some file status or record data of elements present in all cards of a ticketing networks.
The type of card product has not yet been identified, the commands are prepared to be supported by all types of card 
products: Prime, Light, or Regular.

Then, if a Calypso card has matched the selection request, a Calypso card image is returned, some file headers or file 
records could be filled depending on the information recovered in the responses of the Select File or Read Records 
processed.

---
## Transaction with a Calypso card

Except the operations involving secure processing on "data" (data signature computation / verification, data ciphering /
un-ciphering), only commands for the card need to be prepared though the Card Transaction Manager interface.
Depending on the operation, if necessary the security involving the master SAM must be controlled internally by the 
Calypso library.

### Simple operation outside a session

### PIN plain verification / change outside a session

{{< figure src="/media/apis/calypso_transaction_Verify_Change_Plain_PIN_sequence_diagram.svg" caption="Calypso API - Verify / Change Plain PIN - Sequence Diagram" >}}

### Data secure processing outside a session

{{< figure src="/media/apis/calypso_transaction_DSP_outside_session_sequence_diagram.svg" caption="Calypso API - Data secure processing outside a session - Sequence Diagram" >}}

### Key / PIN ciphered update outside a session

{{< figure src="/media/apis/calypso_transaction_Change_Key_Ciphered_PIN_sequence_diagram.svg" caption="Calypso API - Change Key / Ciphered PIN outside a session - Sequence Diagram" >}}

### Stored Value operation outside a session

{{< figure src="/media/apis/calypso_transaction_standalone_SV_operation_sequence_diagram.svg" caption="Calypso API - standalone Stored Value transaction - Sequence Diagram" >}}

### Simple secure session for fast embedded performance

This example illustrates the ticketing processing of a validation: only the necessary data is read from the card.

In case of communication failure with the card, to support a recovery transaction on another terminal: the ratification
status and the last event are checked at the session opening, and the session is closed as not ratified directly 
followed by a ratification command.

{{< figure src="/media/apis/calypso_transaction_simple_secure_session_embedded_sequence_diagram.svg" caption="Calypso API - Simple Secure Session - Sequence Diagram" >}}

### Simple secure session for an efficient distributed system

In most of the cases, it should be possible to handle a secure session with a Calypso card, using only:
- 3 exchanges with the card reader (selection processing, session opening processing, and session closing processing),
- and 3 exchanges with the SAM reader (terminal session challenge recovery, session MAC computation, and card authentication).

This example shows the loading of a contract during a sale, to speed up the identification of the card content while
limiting the exchange of messages with the card reader, some data can be read out of session during the selection, 
then read again during the session.

In case of communication failure with the card, if the recovery transaction is supported only on the same terminal, 
then the checking of the ratification status is not necessary at the session opening, and the session could be closed as ratified.

{{< figure src="/media/apis/calypso_transaction_simple_secure_session_distributed_sequence_diagram.svg" caption="Calypso API - Simple Secure Session - Sequence Diagram" >}}

### PIN ciphered verification inside a session

{{< figure src="/media/apis/calypso_transaction_Verify_Ciphered_PIN_inside_session_sequence_diagram.svg" caption="Calypso API - Verify Ciphered PIN inside a session - Sequence Diagram" >}}

### Data secure processing inside a session

{{< figure src="/media/apis/calypso_transaction_DSP_inside_session_sequence_diagram.svg" caption="Calypso API - Data secure processing inside a session - Sequence Diagram" >}}

### Stored Value operation inside a session

{{< figure src="/media/apis/calypso_transaction_SV_inside_session_sequence_diagram.svg" caption="Calypso API - Stored Value transaction inside a secure session - Sequence Diagram" >}}

### Multiple secure sessions

{{< figure src="/media/apis/calypso_transaction_multiple_secure_session_sequence_diagram.svg" caption="Calypso API - Multiple secure session - Sequence Diagram" >}}

---
## Selection of a Calypso SAM

---
## Transaction with a Calypso SAM

---
#
## Implementations & API Documentation

{{% callout note %}}
The third version number (x.y.**z**) only concerns updates of the javadoc because this component does not contain any 
implementation, but only an API.
Therefore, it is recommended to always perform a **dynamic import** as described above in order to have the most
up-to-date documentation.
{{% /callout %}}

### Calypso API in Java
{{% callout note %}}
**`{{% calypsonet-terminal-calypso-java-api-version %}}`**
<span class="component-metadata">{{< icon name="book" pack="fas" >}} [API documentation](https://calypsonet.github.io/calypsonet-terminal-calypso-java-api/)</span>
<span class="component-metadata">{{< icon name="project-diagram" pack="fas" >}} [UML](https://calypsonet.github.io/calypsonet-terminal-calypso-uml-api/)</span>
<span class="component-metadata">{{< icon name="github" pack="fab" >}} [GitHub repository](https://github.com/calypsonet/calypsonet-terminal-calypso-java-api/)</span>
<span class="component-metadata">{{< icon name="exchange-alt" pack="fas" >}} [Changelog](https://github.com/calypsonet/calypsonet-terminal-calypso-java-api/blob/main/CHANGELOG.md)</span>
{{% /callout %}}

All deliverables are available directly from the [Maven Central Repository](https://central.sonatype.dev/search?q=calypsonet-terminal-calypso-java-api) or by using one of the project resource managers below:

{{< tabpane >}}
{{< tab header="Gradle Groovy" lang="gradle" >}}
implementation 'org.calypsonet.terminal:calypsonet-terminal-calypso-java-api:{{% calypsonet-terminal-calypso-java-api-version %}}'
{{< /tab >}}
{{< tab header="Gradle Kotlin" lang="kotlin" >}}
implementation("org.calypsonet.terminal:calypsonet-terminal-calypso-java-api:{{% calypsonet-terminal-calypso-java-api-version %}}")
{{< /tab >}}
{{< tab header="Maven" lang="xml" >}}
<dependency>
<groupId>org.calypsonet.terminal</groupId>
<artifactId>calypsonet-terminal-calypso-java-api</artifactId>
<version>{{% calypsonet-terminal-calypso-java-api-version %}}</version>
</dependency>
{{< /tab >}}
{{< /tabpane >}}

### Calypso API in C++
{{% callout note %}}
**`{{% calypsonet-terminal-calypso-cpp-api-version %}}`**
<span class="component-metadata">{{< icon name="book" pack="fas" >}} [API documentation](https://calypsonet.github.io/calypsonet-terminal-calypso-cpp-api/)</span>
<span class="component-metadata">{{< icon name="project-diagram" pack="fas" >}} [UML](https://calypsonet.github.io/calypsonet-terminal-calypso-uml-api/)</span>
<span class="component-metadata">{{< icon name="github" pack="fab" >}} [GitHub repository](https://github.com/calypsonet/calypsonet-terminal-calypso-cpp-api/)</span>
{{% /callout %}}
