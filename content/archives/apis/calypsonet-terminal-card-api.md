---
title: Calypsonet Terminal Card API
linktitle: Card API
summary: Internal API which defines the elements shared between the reader layer and the card layer.
type: book
weight: 2
toc: true
---

{{% callout warning %}}
Version 1.0 of the documentation is no longer actively maintained.
The site that you are currently viewing is an archived snapshot.
For up-to-date documentation, see the latest version.
{{% /callout %}}

<br>

The **Calypsonet Terminal Card API** defines the internal elements shared by the reader layer to implement specific card
layers (like the Calypso Card layer).

<br>

## Interfaces

![Card API - class diagram](https://calypsonet.github.io/calypsonet-terminal-card-uml-api/1.0.0/api_class_diagram.svg)

<br>

## Limitations & constraints

The Card API doesn't allow to request the transmission to a card of the APDU commands "Select Application by DF Name" 
or "Get Response":
- the selection of a specific card application could be managed only through a Card Selection Request.
- the APDU response status words 61XYh & 6CXYh are automatically handled by the reader layer library by issuing a 
  Get Response or by re-issuing the previous command with the expected 'Le' field.

<br>

#
## Implementations & API Documentation

{{% callout note %}}
The third version number (x.y.**z**) only concerns updates of the javadoc because this component does not contain any 
implementation, but only an API.
Therefore, it is recommended to always perform a **dynamic import** as described above in order to have the most 
up-to-date documentation.
{{% /callout %}}

### Card API in Java
{{% callout note %}}
**`1.0.0`**
<span class="component-metadata">{{< icon name="book" pack="fas" >}} [API documentation](https://calypsonet.github.io/calypsonet-terminal-card-java-api/)</span>
<span class="component-metadata">{{< icon name="project-diagram" pack="fas" >}} [UML](https://calypsonet.github.io/calypsonet-terminal-card-uml-api/)</span>
<span class="component-metadata">{{< icon name="github" pack="fab" >}} [GitHub repository](https://github.com/calypsonet/calypsonet-terminal-card-java-api/)</span>
<span class="component-metadata">{{< icon name="exchange-alt" pack="fas" >}} [Changelog](https://github.com/calypsonet/calypsonet-terminal-card-java-api/blob/main/CHANGELOG.md)</span>
{{% /callout %}}

All deliverables are available directly from the [Maven Central Repository](https://central.sonatype.com/search?q=calypsonet-terminal-card-java-api) or by using one of the project resource managers below:

{{< tabpane >}}
{{< tab header="Gradle Groovy" >}}
{{< code lang="gradle" copy="true">}}
implementation 'org.calypsonet.terminal:calypsonet-terminal-card-java-api:1.0.0'
{{< /code>}}
{{< /tab >}}
{{< tab header="Gradle Kotlin" >}}
{{< code lang="kotlin" copy="true">}}
implementation("org.calypsonet.terminal:calypsonet-terminal-card-java-api:1.0.0")
{{< /code>}}
{{< /tab >}}
{{< tab header="Maven" >}}
{{< code lang="xml" copy="true">}}
<dependency>
  <groupId>org.calypsonet.terminal</groupId>
  <artifactId>calypsonet-terminal-card-java-api</artifactId>
  <version>1.0.0</version>
</dependency>
{{< /code>}}
{{< /tab >}}
{{< /tabpane >}}

### Card API in C++
{{% callout note %}}
**`1.0.0`**
<span class="component-metadata">{{< icon name="book" pack="fas" >}} [API documentation](https://calypsonet.github.io/calypsonet-terminal-card-cpp-api/)</span>
<span class="component-metadata">{{< icon name="project-diagram" pack="fas" >}} [UML](https://calypsonet.github.io/calypsonet-terminal-card-uml-api/)</span>
<span class="component-metadata">{{< icon name="github" pack="fab" >}} [GitHub repository](https://github.com/calypsonet/calypsonet-terminal-card-cpp-api/)</span>
{{% /callout %}}
