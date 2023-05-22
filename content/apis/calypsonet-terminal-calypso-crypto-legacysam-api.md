---
title: Calypsonet Terminal Calypso Crypto Legacy SAM API
linktitle: Calypso Legacy SAM API
summary: Public high-level API which standardizes the way to interact with a Calypso® legacy SAM product (SAM-C1, HSM-C1, etc...).
type: book
weight: 5
toc: true
---

---
The **Calypsonet Terminal Calypso Crypto Legacy SAM API** is an extension of the **Calypsonet Terminal Reader API** which provides a 
high-level API standardizing the way to interact with a Calypso® legacy SAM product (SAM-C1, HSM-C1, etc...).

---
## Interfaces

The Calypso API provides the means to select a target or control SAM and then perform a transaction with the selected target.
- The result of a SAM selection is a smartcard image whose keys' parameters can be read.
- A transaction with a target SAM may involve a control SAM in order to secure the operations.

The `LegacySam` interface provide **accessors** in order to recover the information of the selected smartcard.

To optimize the number of exchanges with a SAM reader, the Legacy SAM API allows to group the commands. 
A set of command could be first **prepared**, and then be **processed** by a selected target at the selection or 
during the transaction.
A transaction with a Calypso SAM is fully managed through one of the `LSTransactionManager` interfaces:

![Calypso Crypto Legacy SAM API - class diagram](https://calypsonet.github.io/calypsonet-terminal-calypso-crypto-legacysam-uml-api/{{% calypsonet-terminal-calypso-crypto-legacysam-java-api-version %}}/api_class_diagram.svg)

---
#
## Implementations & API Documentation

{{% callout note %}}
The third version number (x.y.**z**) only concerns updates of the javadoc because this component does not contain any 
implementation, but only an API.
Therefore, it is recommended to always perform a **dynamic import** as described above in order to have the most
up-to-date documentation.
{{% /callout %}}

### Calypso Legacy SAM API in Java
{{% callout note %}}
**`{{% calypsonet-terminal-calypso-crypto-legacysam-java-api-version %}}`**
<span class="component-metadata">{{< icon name="book" pack="fas" >}} [API documentation](https://calypsonet.github.io/calypsonet-terminal-calypso-crypto-legacysam-java-api/)</span>
<span class="component-metadata">{{< icon name="project-diagram" pack="fas" >}} [UML](https://calypsonet.github.io/calypsonet-terminal-calypso-crypto-legacysam-uml-api/)</span>
<span class="component-metadata">{{< icon name="github" pack="fab" >}} [GitHub repository](https://github.com/calypsonet/calypsonet-terminal-calypso-crypto-legacysam-java-api/)</span>
<span class="component-metadata">{{< icon name="exchange-alt" pack="fas" >}} [Changelog](https://github.com/calypsonet/calypsonet-terminal-calypso-crypto-legacysam-java-api/blob/main/CHANGELOG.md)</span>
{{% /callout %}}

All deliverables are available directly from the [Maven Central Repository](https://central.sonatype.dev/search?q=calypsonet-terminal-calypso-crypto-legacysam-java-api) or by using one of the project resource managers below:

{{< tabpane >}}
{{< tab header="Gradle Groovy" lang="gradle" >}}
implementation 'org.calypsonet.terminal:calypsonet-terminal-calypso-crypto-legacysam-java-api:{{% calypsonet-terminal-calypso-crypto-legacysam-java-api-version %}}'
{{< /tab >}}
{{< tab header="Gradle Kotlin" lang="kotlin" >}}
implementation("org.calypsonet.terminal:calypsonet-terminal-calypso-crypto-legacysam-java-api:{{% calypsonet-terminal-calypso-crypto-legacysam-java-api-version %}}")
{{< /tab >}}
{{< tab header="Maven" lang="xml" >}}
<dependency>
<groupId>org.calypsonet.terminal</groupId>
<artifactId>calypsonet-terminal-calypso-crypto-legacysam-java-api</artifactId>
<version>{{% calypsonet-terminal-calypso-crypto-legacysam-java-api-version %}}</version>
</dependency>
{{< /tab >}}
{{< /tabpane >}}

### Calypso Legacy SAM API in C++
{{% callout note %}}
work in progress...
{{% /callout %}}
