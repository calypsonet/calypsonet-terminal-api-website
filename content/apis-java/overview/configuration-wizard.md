---
title: Java - Configuration wizard
linktitle: Configuration wizard
summary: Online tool to generate the dependencies section of Gradle or Maven configuration files.
type: book
weight: 20
toc: false
---

---
This online tool generates for you the `dependencies` section of Gradle or Maven configuration files.

Choose your project profile and copy/paste the generated result into your project dependency manager.

{{< spoiler text="Custom Keyple card extension" >}}
Please find below the configuration to use when developing a specific Keyple card extension not already available:

---
**Do you need additional services?**
<div>
  <input type="checkbox" id="cardServiceResource" onclick="javascript:updateCardDependencies(2, this);">
  <label for="cardServiceResource">Service for dynamic card resource allocation (e.g. HSM or pool of readers)</label>
</div>

---
{{< tabpane ref="2" >}}
{{< tab header="Gradle Groovy" lang="gradle" >}}{{< /tab >}}
{{< tab header="Gradle Kotlin" lang="kotlin" >}}{{< /tab >}}
{{< tab header="Maven" lang="xml" >}}{{< /tab >}}
{{< /tabpane >}}
{{< /spoiler >}}

{{< spoiler text="Reader Layer" >}}
Please find below the configuration to use when developing a specific reader layer not already available:
{{< tabpane ref="3" >}}
{{< tab header="Gradle Groovy" lang="gradle" >}}
implementation 'org.calypsonet.terminal:calypsonet-terminal-reader-java-api:{{% calypsonet-terminal-reader-java-api-version %}}'
implementation 'org.calypsonet.terminal:calypsonet-terminal-card-java-api:{{% calypsonet-terminal-card-java-api-version %}}'
{{< /tab >}}
{{< tab header="Gradle Kotlin" lang="kotlin" >}}
implementation("org.calypsonet.terminal:calypsonet-terminal-reader-java-api:{{% calypsonet-terminal-reader-java-api-version %}}")
implementation("org.calypsonet.terminal:calypsonet-terminal-card-java-api:{{% calypsonet-terminal-card-java-api-version %}}")
{{< /tab >}}
{{< tab header="Maven" lang="xml" >}}
<dependency>
  <groupId>org.calypsonet.terminal</groupId>
  <artifactId>calypsonet-terminal-reader-java-api</artifactId>
  <version>{{% calypsonet-terminal-reader-java-api-version %}}</version>
</dependency>
<dependency>
  <groupId>org.calypsonet.terminal</groupId>
  <artifactId>calypsonet-terminal-card-java-api</artifactId>
  <version>{{% calypsonet-terminal-card-java-api-version %}}</version>
</dependency>
{{< /tab >}}
{{< /tabpane >}}
{{< /spoiler >}}

<!-- All groovy dependencies -->
<code id="all-groovy-dependencies" style="display:none">
<span id="calypsonet-terminal-reader-java-api">implementation <span class="hljs-string">'org.calypsonet.terminal:calypsonet-terminal-reader-java-api:{{% calypsonet-terminal-reader-java-api-version %}}'</span></span>
<span id="calypsonet-terminal-reader-java-api-dynamic">implementation <span class="hljs-string">'org.calypsonet.terminal:calypsonet-terminal-reader-java-api:{{% calypsonet-terminal-reader-java-api-dynamic-gradle-version %}}'</span></span>
<span id="calypsonet-terminal-card-java-api">implementation <span class="hljs-string">'org.calypsonet.terminal:calypsonet-terminal-card-java-api:{{% calypsonet-terminal-card-java-api-version %}}'</span></span>
<span id="calypsonet-terminal-card-java-api-dynamic">implementation <span class="hljs-string">'org.calypsonet.terminal:calypsonet-terminal-card-java-api:{{% calypsonet-terminal-card-java-api-dynamic-gradle-version %}}'</span></span>
<span id="calypsonet-terminal-calypso-java-api-dynamic">implementation <span class="hljs-string">'org.calypsonet.terminal:calypsonet-terminal-calypso-java-api:{{% calypsonet-terminal-calypso-java-api-dynamic-gradle-version %}}'</span></span>
</code>

<!-- All kotlin dependencies -->
<code id="all-kotlin-dependencies" style="display:none">
<span id="calypsonet-terminal-reader-java-api">implementation(<span class="hljs-string">"org.calypsonet.terminal:calypsonet-terminal-reader-java-api:{{% calypsonet-terminal-reader-java-api-version %}}"</span>)</span>
<span id="calypsonet-terminal-reader-java-api-dynamic">implementation(<span class="hljs-string">"org.calypsonet.terminal:calypsonet-terminal-reader-java-api:{{% calypsonet-terminal-reader-java-api-dynamic-gradle-version %}}"</span>)</span>
<span id="calypsonet-terminal-card-java-api">implementation(<span class="hljs-string">"org.calypsonet.terminal:calypsonet-terminal-card-java-api:{{% calypsonet-terminal-card-java-api-version %}}"</span>)</span>
<span id="calypsonet-terminal-card-java-api-dynamic">implementation(<span class="hljs-string">"org.calypsonet.terminal:calypsonet-terminal-card-java-api:{{% calypsonet-terminal-card-java-api-dynamic-gradle-version %}}"</span>)</span>
<span id="calypsonet-terminal-calypso-java-api-dynamic">implementation(<span class="hljs-string">"org.calypsonet.terminal:calypsonet-terminal-calypso-java-api:{{% calypsonet-terminal-calypso-java-api-dynamic-gradle-version %}}"</span>)</span>
</code>

<!-- All maven dependencies -->
<code id="all-maven-dependencies" style="display:none">
<span id="calypsonet-terminal-reader-java-api"><span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.calypsonet.terminal<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>calypsonet-terminal-reader-java-api<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>{{% calypsonet-terminal-reader-java-api-version %}}<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span></span>
<span id="calypsonet-terminal-reader-java-api-dynamic"><span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.calypsonet.terminal<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>calypsonet-terminal-reader-java-api<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>{{% calypsonet-terminal-reader-java-api-dynamic-maven-version %}}<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span></span>
<span id="calypsonet-terminal-card-java-api"><span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.calypsonet.terminal<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>calypsonet-terminal-card-java-api<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>{{% calypsonet-terminal-card-java-api-version %}}<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span></span>
<span id="calypsonet-terminal-card-java-api-dynamic"><span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.calypsonet.terminal<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>calypsonet-terminal-card-java-api<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>{{% calypsonet-terminal-card-java-api-dynamic-maven-version %}}<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span></span>
<span id="calypsonet-terminal-calypso-java-api-dynamic"><span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.calypsonet.terminal<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>calypsonet-terminal-calypso-java-api<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>{{% calypsonet-terminal-calypso-java-api-dynamic-maven-version %}}<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span></span>
</code>
<script type="text/javascript">
document.body.onload = function() {
    updateAppDependencies(1, null);
    updateCardDependencies(2, null);
};
</script>