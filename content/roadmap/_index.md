---
title: Terminal APIs - draft discussion
linktitle: Overview
summary: possible evolutions of the Terminal APIs.
type: book
toc: false
---

---

## current work and future developments

 - extension of the Calypso API to add support for Prime Extended and Prime PKI transaction modes
   - ciphered card commands/responses, and intermediate mutual authentication inside a secure session
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
    <td rowspan="2">2022/10/26</td>
    <td>Reader API 1.1</td>
    <td><ul><li>add the importation/exportation of card selection scenarios
    <ul><li>allows a solution-specific selection request prepared on a terminal with the specific card library to be deployed to a terminal without this dedicated library</li></ul></li></ul></td>
  </tr>
  <tr>
    <td>Calypso API 1.4</td>
    <td><ul><li>improves support for file selection responses for old card products</li></ul></td>
  </tr>
  <tr>
    <td>2022/10/04</td>
    <td>Calypso API 1.3</td>
    <td><ul><li>addition of a specific identifier to the Calypso HSM product
    <ul><li>allows to manage differences in behaviour with the legacy SAM C1</li></ul></li></ul></td>
  </tr>
  <tr>
    <td>2022/05/30</td>
    <td>Calypso API 1.2</td>
    <td><ul><li><b>Support of Calypso Prime Extended</b>
    <ul><li>SAM operations to generate or verify data signatures</li>
    </ul></li></ul></td>
  </tr>
    <tr>
    <td>2022/02/01</td>
    <td>Calypso API 1.1</td>
    <td><ul><li><b>Support of the full card command set of Calypso Prime Regular</b>
    <ul><li>Binary files management, update of multiple counters, record search, key change</li>
    <li>Support of EF without SFI</li>
    </ul></td>
  </tr>
</tbody>
</table>




