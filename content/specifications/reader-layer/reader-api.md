---
title: Reader API (external)
linktitle: 🟢 Reader
summary: Public API which defines the elements shared by the reader.
type: book
weight: 1
toc: true
---

{{% callout note %}}
Latest version **`{{% reader-api-version %}}`**
<span class="component-metadata">{{< icon name="project-diagram" pack="fas" >}} [UML class diagram](https://docs.terminal-api.calypsonet.org/calypsonet-terminal-reader-uml-api/)</span>
<span class="component-metadata">{{< icon name="github" pack="fab" >}} [GitHub repository](https://github.com/calypsonet/calypsonet-terminal-reader-uml-api/)</span>
{{% /callout %}}

As part of the **Reader Layer**, the **Reader API** provides high-level functionality for identifying, monitoring, 
configuring readers and process card selection scenarios.

<br>

## Interfaces

The **Reader API** is a high-level interface used by terminal applications to operate smart card readers, it:

- provides the means to identify card readers and verify the presence of smart cards.

- offers the possibility to configure the observation of readers in order to be notified on card insertion or withdrawal.

- is the entry point to manage the selection of a smart card in a specific reader.

![Reader API - class diagram](https://docs.terminal-api.calypsonet.org/calypsonet-terminal-reader-uml-api/{{% reader-api-version %}}/api_class_diagram.svg)

### Reader identification

Any smart card reader entity should be accessible through an implementation of the `CardReader` interface.
Each is defined with a specific name.
A reader could be designed to operate contactless card or a contact card.
Finally, this interface can inform about the presence of a card in the reader.

### ConfigurableCardReader

A reader with the capability to configure the communication protocols with smart card (contactless or contact) could
implement the `ConfigurableCardReader` interface to activate or deactivate some communication protocols.

### Reader observation

If a reader has the ability to dynamically detect changes on the card presence, then it can also implement the interface
`ObservableCardReader`.

Observers implementing the `CardReaderObserverSpi` could be declared to an observable card reader to be notified on
specific `CardReaderEvent`: card insertion, card selection (matched), or card removal.

### Card Selection

The `CardSelectionManager` provides the possibility to prepare a request that could contain one or several card
application selections.

The `CardSelection` SPI interface could be extended by the API of a specific smart card solution to improve the
selection request with settings specific to the smart card solution.

Through the card selection manager, the prepared card selections could be managed in

- **synchronously**: processed directly on a specific card reader on which a card is already present,

- or **asynchronously**: scheduled on a specific observable reader in order to be operated dynamically in case of card
  insertion detection.

If several card selections are prepared, the card selection manager operate the card selection in the order of
preparation.
By default, the card selection manager stops the card selection processing on the first successful card selection,
and the logical channel is kept open.

- In case the multiple selection mode is activated during the preparation, the card selection manager tries to operate
  ‘all’ the prepared selections, even if one or several of them are successful.
  If the last selection is successful, the logical channel could be kept open with the last selected application.

- during the card selection preparation, it could also be explicitly requested to close the logical channel after the
  card selection.

Moreover, it is possible to export/import a selection scenario in JSON format.

<br>

## Card selection modes

Depending on the card transaction use case, or on the reader capability, there are two ways to manage the selection of a
card:

- Either synchronously on a simple reader, a selection could be operated directly by transmitting the card selection
  scenario. In this case the same entity manages both the card selection and the card processing.
- Otherwise asynchronously on an observable reader, a scheduled card selection could be defined.
  In this case the card selection is operated automatically at the insertion of the card. In this case,
  the card selection is next managed by the observable reader, but the card processing is managed by a reader observer.

{{< figure src="/media/specifications/reader_management_card_selection_modes_activity_diagram.svg" caption="Reader API - Card Selection Modes - Activity Diagram" >}}

<br>

## Observable reader states

An observable reader is active only when at least one reader observer is registered, and if the start of the detection
has been requested.
When active, an observable reader could switch between three internal states:
* Wait for card insertion
* Wait for card processing
* Wait for card removal

In the nominal case, a reader observer indicates to the observable reader that the processing of the card is finished by
releasing the card channel.
To manage a failure of the reader observer process, the observable reader interface provides also a method to finalize
the card processing.

{{< figure src="/media/specifications/reader_management_reader_observation_state_diagram.svg" caption="Reader API - Observable Reader States - Activity Diagram" >}}

The states could be switched:
- due to an explicit API request (blue arrows):
  - the release of the card channel,
  - the call of an observable reader method:
    - the addition or the remove of an observable reader,
    - a request to start or stop the detection, to finalize the card processing.
- Or because of an external event (red arrows), the insertion or the remove of a card.
  - the insertion of a card causing the observable reader to notify a `CARD_MATCHED` reader event (in case of successful
    scheduled selection) or a `CARD_INSERTED` reader event (notification mode defined as `ALWAYS`).
  - the removal of a card causing the observable reader to notify a `CARD_REMOVED` reader event.

If a card detection is started with the `REPEATING` detection mode, then later when the card is removed, the reader
starts again the detection of a new card.

Notification of card removal during the card removal wait state is a feature of any observable reader.
However, some observable readers may additionally have the ability to notify removal during the card processing state.

<br>

## Limitations & constraints
On a specific card reader, the **Reader API** allows to address only a **single logical channel**.
