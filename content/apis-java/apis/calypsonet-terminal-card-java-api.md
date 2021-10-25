---
title: Calypsonet Terminal Card Java API
linktitle: Card API
summary: Internal API which defines the elements shared between the reader layer and the card layer.
type: book
toc: true
---

{{% callout note %}}
**`{{% calypsonet-terminal-card-java-api-version %}}`**
<span class="component-metadata">{{< icon name="download" pack="fas" >}} [Download](#download)</span>
<span class="component-metadata">{{< icon name="github" pack="fab" >}} [GitHub](https://github.com/calypsonet/calypsonet-terminal-card-java-api/)</span>
<span class="component-metadata">{{< icon name="exchange-alt" pack="fas" >}} [Changelog](https://github.com/calypsonet/calypsonet-terminal-card-java-api/blob/main/CHANGELOG.md)</span>
{{% /callout %}}

## Overview

The **Calypsonet Terminal Card Java API** defines the internal elements shared between the reader layer and the card layer.

## Documentation

* [API documentation](https://calypsonet.github.io/calypsonet-terminal-card-java-api)
 
## Download

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

{{% callout note %}}
The third version number (x.y.**z**) only concerns updates of the javadoc because this component does not contain any implementation, but only an API.
Therefore, it is recommended to always perform a **dynamic import** as described above in order to have the most up-to-date documentation.
{{% /callout %}}