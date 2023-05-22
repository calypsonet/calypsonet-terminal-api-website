---
title: Terminal APIs roadmap
linktitle: Overview
summary: possible evolutions of the Terminal APIs.
type: book
toc: false
---

---

## current work and future developments

 - extension of the Calypso API to add support for Prime PKI transaction mode
   - asymmetric card authentication without a SAM
 - refactoring of the Calypso API to integrate different Calypso SAM solutions (legacy SAM & Open SAM)
   - split of the Calypso API to separate card operations in a Calypso Card API independently to the SAM solution
   - Calypso Legacy SAM API to support all transaction modes of the legacy SAM C1.
 - Reader API & Card API refactoring for the setting of a card selection
   - moving of some elements of card DF selector from the Card API to the Reader API → This will simplify the Card API, and will allow the implementation of the ISO selection settings to be factorised independently of the card extensions.

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
    <td>2023/05/22</td>
    <td>Reader API 1.3</td>
    <td><ul><li>Introduced a new capability to export a locally processed card selection scenario to be imported and 
         analyzed remotely by another card selection manager.</li>
    </ul></td>
  </tr>
  <tr>
    <td>2023/04/04</td>
    <td>Calypso API 1.8</td>
    <td><ul><li>Adds the possibility to improve performance by anticipating the SAM context before the transaction is 
         started.</li>
    </ul></td>
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
    <td><ul><li>adds "counters & ceilings" management commands in static mode</li></ul></td>
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
    <td><ul><li>Adds a way to retrieve the name of the protocol currently used by the reader to communicate with the card
    </li></ul></td>
  </tr>
  <tr>
    <td>2022/12/22</td>
    <td>Calypso API 1.5</td>
    <td><ul><li>Completes the support of "Calypso Prime Extended" card products
      <ul><li>ciphered card commands/responses inside a secure session</li>
      <li>intermediate mutual authentication inside a secure session</li></ul>
    </li></ul></td>
  </tr>
  <tr>
    <td>2022/12/12</td>
    <td>Calypso Crypto Legacy SAM API 0.1</td>
    <td><ul><li>Alpha version of the new API dedicated to the management of legacy SAMs
      <ul><li>begins the support of free SAM transaction (without a control SAM)</li>
      <li>adds "compute/verify signature" commands</li>
      <li>adds "read event counter/ceiling" commands</li></ul>
    </li></ul></td>
  </tr>
  <tr>
    <td rowspan="2">2022/10/26</td>
    <td>Reader API 1.1</td>
    <td><ul><li>Adds an "import/export" feature for card selection scenarios
      <ul><li>allows a terminal to execute or schedule a card selection scenario, previously prepared on a server, without
            having the dedicated card library (e.g. Calypso API)</li></ul>
    </li></ul></td>
  </tr>
  <tr>
    <td>Calypso API 1.4</td>
    <td><ul><li>Improves the support of file selection responses for legacy card products</li></ul></td>
  </tr>
  <tr>
    <td>2022/10/04</td>
    <td>Calypso API 1.3</td>
    <td><ul><li>Adds a specific identifier to the Calypso HSM product
      <ul><li>allows to manage differences in behaviour with the legacy SAM C1</li></ul>
    </li></ul></td>
  </tr>
  <tr>
    <td>2022/05/30</td>
    <td>Calypso API 1.2</td>
    <td><ul><li>Begins the support of "Calypso Prime Extended" card products
      <ul><li>SAM operations to generate or verify data signatures</li></ul>
    </li></ul></td>
  </tr>
    <tr>
    <td>2022/02/01</td>
    <td>Calypso API 1.1</td>
    <td><ul><li>Completes the support of "Calypso Prime Regular" card products
      <ul><li>binary files management, update of multiple counters, record search, key change</li>
      <li>support of EF without SFI</li></ul>
    </li></ul></td>
  </tr>
</tbody>
</table>




