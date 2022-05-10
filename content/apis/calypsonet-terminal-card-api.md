---
title: Calypsonet Terminal Card API
linktitle: Card API
summary: Internal API which defines the elements shared between the reader layer and the card layer.
type: book
weight: 2
toc: true
---

The **Calypsonet Terminal Card API** defines the internal elements shared between the reader layer and the card layer.

## Interfaces

![Card API - class diagram](https://calypsonet.github.io/calypsonet-terminal-card-java-api/1.0.1-SNAPSHOT/api_class_diagram.svg)


## Limitations & constraints
The Card API doesn't allow to request the transmssion to a card of the APDU commands "Select Application by DF Name" or "Get Response":
- the selection of a specific card application could be managed only through a Card Selection Request.
- the APDU response status words 61XYh & 6CXYh are automatically handled by the reader layer library by issuing a Get Response or by re-issuing the previous command with the rigth 'Le' field.

#
## Implementations & API Documentation

{{% callout note %}}
The third version number (x.y.**z**) only concerns updates of the javadoc because this component does not contain any implementation, but only an API.
Therefore, it is recommended to always perform a **dynamic import** as described above in order to have the most up-to-date documentation.
{{% /callout %}}

### Card API in Java
{{% callout note %}}
**`{{% calypsonet-terminal-card-java-api-version %}}`**
<span class="component-metadata">{{< icon name="doc" pack="fas" >}} [Java Doc](https://calypsonet.github.io/calypsonet-terminal-card-java-api/)</span>
<span class="component-metadata">{{< icon name="github" pack="fab" >}} [GitHub repository](https://github.com/calypsonet/calypsonet-terminal-card-java-api/)</span>
<span class="component-metadata">{{< icon name="exchange-alt" pack="fas" >}} [Changelog](https://github.com/calypsonet/calypsonet-terminal-card-java-api/blob/main/CHANGELOG.md)</span>
{{% /callout %}}

All deliverables are available directly from the [Maven Central Repository](https://search.maven.org/search?q=a:calypsonet-terminal-card-java-api) or by using one of the project resource managers below:

{{< tabpane >}}
{{< tab header="Gradle Groovy" lang="gradle" >}}
implementation 'org.calypsonet.terminal:calypsonet-terminal-card-java-api:{{% calypsonet-terminal-card-java-api-dynamic-gradle-version %}}'
{{< /tab >}}
{{< tab header="Gradle Kotlin" lang="kotlin" >}}
implementation("org.calypsonet.terminal:calypsonet-terminal-card-java-api:{{% calypsonet-terminal-card-java-api-dynamic-gradle-version %}}")
{{< /tab >}}
{{< tab header="Maven" lang="xml" >}}
<dependency>
<groupId>org.calypsonet.terminal</groupId>
<artifactId>calypsonet-terminal-card-java-api</artifactId>
<version>{{% calypsonet-terminal-card-java-api-dynamic-maven-version %}}</version>
</dependency>
{{< /tab >}}
{{< /tabpane >}}

### Card API in C++
{{% callout note %}}
**`{{% calypsonet-terminal-card-cpp-api-version %}}`**
<span class="component-metadata">{{< icon name="github" pack="fab" >}} [GitHub repository](https://github.com/calypsonet/calypsonet-terminal-card-cpp-api/)</span>
{{% /callout %}}
