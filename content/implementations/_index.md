---
title: Implementations
---

{{% callout note %}}
To reference your implementation please
[create an issue](https://github.com/calypsonet/calypsonet-terminal-api-website/issues/new?title=Add%20new%20Terminal%20APIs%20implementation)
on GitHub.
{{% /callout %}}

<style>
table td:nth-child(1),
table td:nth-child(2),
table td:nth-child(3),
table td:nth-child(4) {
    white-space: nowrap;
}
</style>

| Project name| URL                               | Supported languages | License | Comments                                                                                                                                                                                                                                    |
|-------------|-----------------------------------|:-------------------:|---------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Eclipse Keypop®          | [keypop.org](https://keypop.org/) |      Java, C++      |🌍 [MIT](https://opensource.org/licenses/MIT) | Provides interfaces compliant with all Terminal APIs specifications<br/><ul><li>Reader Layer</li><li>Card Layer for Calypso</li><li>Card Layer for Storage Card</li></ul>                                                                   |
| Eclipse Keyple®          | [keyple.org](https://keyple.org/) |      Java, C++      |🌍 [Eclipse Public License v2.0](https://www.eclipse.org/legal/epl-2.0/) | Provides libraries implementing the main [Eclipse Keypop®](https://keypop.org/) interfaces based on the Terminal APIs specifications<br/><ul><li>Reader Layer</li><li>Card Layer for Calypso</li></ul>  |
| CNA Storage Card libraries | [keyple-support.calypsonet.org](https://keyple-support.calypsonet.org/add-ons/card-ext/storage-card/) |        Java         |🚫 [CNA restricted libraries](https://keyple-support.calypsonet.org/basics/licenses/) | Provides libraries implementing some [Eclipse Keypop®](https://keypop.org/) interfaces based on the Terminal APIs specifications<br/><ul><li>Card Layer for Storage Card</li></ul> |
