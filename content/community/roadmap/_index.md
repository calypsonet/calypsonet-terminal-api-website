---
title: Project roadmap
linktitle: Roadmap
summary: Overview of past and future API Releases.
type: book
toc: false
weight: 2
---

## Current work and future developments

For 2025, addition of an interface dedicated to the management of the new Calypso "OpenSAM" secure module.
 - No impact on the secure card transaction thanks to the abstraction provided by the Calypso Symmetric Crypto interface.
 - OpenSAM selection and personalization functions.

## History of developments

<table>
<thead>
  <tr>
    <th>Date</th>
    <th>API Version</th>
    <th>Changes</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>2025/07/21</td>
    <td>Storage Card API 0.3</td>
    <td>
    Initial version of API for reading and writing data blocks in a contactless memory ticket
    </td>
  </tr>
  <tr>
    <td>2024/11/29</td>
    <td>Calypso Legacy SAM API 0.7</td>
    <td>
    <ul><li>Addition of secure write operations to personalize a legacy</li>
    <li>New getters to retrieve SAM profile and work keys parameters</li></ul>
    </td>
  </tr>
  <tr>
    <td rowspan="3">2024/04/11</td>
    <td>Calypso Card API 2.1.0</td>
    <td>
    Added management of PKI card functions
    <ul><li>configuring a chain of trust on a terminal</li>
    <li>asymmetric session signature verification</li>
    <li>personalization and retrieval of card and CA certificates</li></ul>
    </td>
  </tr>
  <tr>
    <td>Calypso Crypto Asymmetric API 0.2</td>
    <td>refactoring of the Calypso PKI interface</td>
  </tr>
  <tr>
    <td>Calypso Legacy SAM API 0.5</td>
    <td>
    <ul><li>support for 'CardCert' card certificate personalization (the 'CACert' Certificate Authority feature is managed by the SAM)</li></ul>
    </td>
  </tr>
  <tr>
    <td>2024/01/10</td>
    <td>Calypso Legacy SAM API 0.4</td>
    <td>
    <ul><li>Management of static & dynamic lock</li>
    <li>Adds dedicated SPI to provide lock data</li></ul>
    </td>
  </tr>
<tr>
  <td rowspan="7">2023/11/27</td>
  <td colspan="2">Global refactoring to enable any implementation of terminal APIs and to allow the Eclipse Keypop project to continue to implement open source Java and C++ versions of the terminal APIs.
    <ul>
      <li>refactoring of the Calypso API to integrate different Calypso SAM solutions (legacy SAM & Open SAM)
      <ul>
        <li>split of the Calypso API to separate card operations in a Calypso Card API independently to the SAM solution</li>
        <li>Calypso Legacy SAM API to support all transaction modes of the legacy SAM C1.</li>
      </ul>
      </li>
      <li>Reader API & Card API refactoring for the setting of a card selection
        <ul><li>moving of some elements of card DF selector from the Card API to the Reader API → This will simplify the Card API, and will allow the implementation of the ISO selection settings to be factorised independently of the card extensions.</li></ul>
      </li>
    </ul>
  </td>
  </tr>
  <tr>
    <td>Reader API 2.0</td>
    <td>Recovery of the Card Selector SPI from the Card API</td>
  </tr>
  <tr>
    <td>Card API 2.0</td>
    <td>Moved Card Selector SPI to the Reader API</td>
  </tr>
  <tr>
    <td>Calypso Card API 2.0</td>
    <td><ul><li>split of the Calypso API to separate card operations in a Calypso Card API independently to the SAM solution</li>
    <li>refactoring to integrate in a Calypso card transaction different Calypso SAM solutions: initially the Calypso Legacy SAM, then later the Calypso OpenSAM</li></ul></td>
  </tr>
  <tr>
    <td>Calypso Crypto Asymmetric API 0.1</td>
    <td>New interface to manage the communication between a library implementing the Calypso Card API and another library processing the Calypso card PKI</td>
  </tr>
  <tr>
    <td>Calypso Crypto Symmetric API 0.1</td>
    <td>New interface to manage the communication between a library implementing the Calypso Card API and another library processing a Calypso SAM solution</td>
  </tr>
  <tr>
    <td>Calypso Legacy SAM API 0.3</td>
    <td>New public API to manage a transaction with a Calypso Legacy SAM (e.g. SAM-C1)
      <ul><li>secure reading of target SAM parameters</li>
        <li>secure writing of parameters, keys and counter ceilings of a target SAM</li>
        <li>free reading and writing with a target SAM</li>
        <li>data PSO signature computation & verification by a target SAM</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>2023/05/22</td>
    <td>Reader API 1.3</td>
    <td>Introduced a new capability to export a locally processed card selection scenario to be imported and 
         analyzed remotely by another card selection manager.
    </td>
  </tr>
  <tr>
    <td>2023/04/04</td>
    <td>Calypso API 1.8</td>
    <td>Adds the possibility to improve performance by anticipating the SAM context before the transaction is 
         started.
    </td>
  </tr>
  <tr>
    <td>2023/03/08</td>
    <td>Calypso API 1.7</td>
    <td><ul><li>Adds the secure session "pre-open" variant</li>
    <li>Adds the possibility read counters and binary files during the card selection process</li>
    </ul></td>
  </tr>
  <tr>
    <td>2023/02/27</td>
    <td>Calypso Crypto Legacy SAM API 0.2</td>
    <td>adds "counters & ceilings" management commands in static mode</td>
  </tr>
  <tr>
    <td>2023/02/17</td>
    <td>Calypso API 1.6</td>
    <td><ul><li>Simplifies the card transaction API by providing a single "process" method</li>
    <li>Adds a security setting to be able to disable the automatic combination of a "Read Record" command with the 
        "Open Secure Session" command</li>
    </ul></td>
  </tr>
  <tr>
    <td>2023/01/10</td>
    <td>Reader API 1.2</td>
    <td>Adds a way to retrieve the name of the protocol currently used by the reader to communicate with the card</td>
  </tr>
  <tr>
    <td>2022/12/22</td>
    <td>Calypso API 1.5</td>
    <td>Completes the support of "Calypso Prime Extended" card products
      <ul><li>ciphered card commands/responses inside a secure session</li>
      <li>intermediate mutual authentication inside a secure session</li></ul>
    </td>
  </tr>
  <tr>
    <td>2022/12/12</td>
    <td>Calypso Crypto Legacy SAM API 0.1</td>
    <td>Alpha version of the new API dedicated to the management of legacy SAMs
      <ul><li>begins the support of free SAM transaction (without a control SAM)</li>
      <li>adds "compute/verify signature" commands</li>
      <li>adds "read event counter/ceiling" commands</li></ul>
    </td>
  </tr>
  <tr>
    <td rowspan="2">2022/10/26</td>
    <td>Reader API 1.1</td>
    <td>Adds an "import/export" feature for card selection scenarios
      <ul><li>allows a terminal to execute or schedule a card selection scenario, previously prepared on a server, without
            having the dedicated card library (e.g. Calypso API)</li></ul>
    </td>
  </tr>
  <tr>
    <td>Calypso API 1.4</td>
    <td>Improves the support of file selection responses for legacy card products</td>
  </tr>
  <tr>
    <td>2022/10/04</td>
    <td>Calypso API 1.3</td>
    <td>Adds a specific identifier to the Calypso HSM product
      <ul><li>allows to manage differences in behaviour with the legacy SAM C1</li></ul>
    </td>
  </tr>
  <tr>
    <td>2022/05/30</td>
    <td>Calypso API 1.2</td>
    <td>Begins the support of "Calypso Prime Extended" card products
      <ul><li>SAM operations to generate or verify data signatures</li></ul>
    </td>
  </tr>
    <tr>
    <td>2022/02/01</td>
    <td>Calypso API 1.1</td>
    <td>Completes the support of "Calypso Prime Regular" card products
      <ul><li>binary files management, update of multiple counters, record search, key change</li>
      <li>support of EF without SFI</li></ul>
    </td>
  </tr>
</tbody>
</table>




