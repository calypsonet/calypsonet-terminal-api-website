---
title: Java - Dependency check
linktitle: Dependency check
summary: Online tool to check the compatibility of Keyple components according to their internal API versions.
type: book
weight: 30
toc: false
---

---
This online tool helps you to check the compatibility of Keyple components according to their API versions.

Select the targeted versions of the APIs to show the associated compliant libraries versions:

<!-- 
##########################################################
/!\ Instructions to maintain the content of this table /!\
##########################################################

- Insert a row each time an API has been updated (major or minor version) then update all impacted components.

- If the update does not concern the APIs, but only the libraries, then update only the version range of the concerned libraries
(ex: if keyple-service-java-api goes from "2.0.0" to "2.0.1", then put "2.0.0-2.0.1" in the table)
-->

<table id="datatable-dependency-check" class="display compact" style="width:100%">
    <thead>
        <tr>
            <th colspan="3" class="text-center c-orange">Calypso Networks Association Terminal APIs</th>
        </tr>
        <tr>
            <th class="rotate c-orange"><div class="rotate-190">calypsonet-terminal-reader-java-api</div></th>
            <th class="rotate c-orange"><div class="rotate-190">calypsonet-terminal-card-java-api</div></th>
            <th class="rotate c-orange"><div class="rotate-190">calypsonet-terminal-calypso-java-api</div></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1.0.+</td><!-- calypsonet-terminal-reader-java-api -->
            <td>1.0.+</td><!-- calypsonet-terminal-card-java-api -->
            <td>1.0.+</td><!-- calypsonet-terminal-calypso-java-api -->
        </tr>
    </tbody>
</table>
<script type="text/javascript">
document.body.onload = function() {
    initDatatableDependencyCheck();
};
</script>
