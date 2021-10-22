---
title: Keyple Common Java API
linktitle: Common API
summary: Public API which defines the elements shared between all Keyple libraries.
type: book
toc: true
---

{{% alert note %}}
**`{{% calypsonet-terminal-reader-java-api-version %}}`**
<span class="component-metadata">{{< icon name="download" pack="fas" >}} [Download](#download)</span>
<span class="component-metadata">{{< icon name="github" pack="fab" >}} [GitHub](https://github.com/eclipse/keyple-common-java-api/)</span>
<span class="component-metadata">{{< icon name="exchange-alt" pack="fas" >}} [Changelog](https://github.com/eclipse/keyple-common-java-api/blob/main/CHANGELOG.md)</span>
{{% /alert %}}

## Overview

The **Keyple Common Java API** defines the public elements shared between all Keyple libraries.

Therefore, it must be used by all developers.

## Documentation

* [API documentation](https://calypsonet.github.io/keyple-common-java-api)
 
## Download

All deliverables are available directly from the [Maven Central Repository](https://search.maven.org/search?q=a:keyple-common-java-api) or by using one of the project resource managers below:

{{< tabpane >}}
{{< tab header="Gradle Groovy" lang="gradle" >}}
implementation 'org.calypsonet.terminal:calypsonet-terminal-reader-java-api:{{% calypsonet-terminal-reader-java-api-version %}}'
{{< /tab >}}
{{< tab header="Gradle Kotlin" lang="kotlin" >}}
implementation("org.calypsonet.terminal:calypsonet-terminal-reader-java-api:{{% calypsonet-terminal-reader-java-api-version %}}")
{{< /tab >}}
{{< tab header="Maven" lang="xml" >}}
<dependency>
  <groupId>org.calypsonet.terminal</groupId>
  <artifactId>calypsonet-terminal-reader-java-api</artifactId>
  <version>{{% calypsonet-terminal-reader-java-api-version %}}</version>
</dependency>
{{< /tab >}}
{{< /tabpane >}}

{{% alert note %}}
The third version number (x.y.**z**) only concerns updates of the javadoc because this component does not contain any implementation, but only an API.
Therefore, it is recommended to always perform a **dynamic import** as described above in order to have the most up-to-date documentation.
{{% /alert %}}