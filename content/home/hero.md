+++
widget = "hero" 
headless = true
active = true 
weight = 10 

title = "Terminal APIs"

hero_media = "hero-image.svg"
# caption = <a href="http://www.freepik.com">Designed by macrovector_official / Freepik</a>

[design.background] 
  image = ""  
  color = "#039efd"
  #image_darken = 0.8 
  # caption = <a href="http://www.freepik.com">Designed by starline / Freepik</a>
  #text_color_light = true

+++
In order to facilitate the design of terminals processing smart card readers (user card, security module), CNA (the [Calypso Networks Association](https://calypsonet.org/)) has standardized [software interfaces for ticketing terminals](https://calypsonet.org/calypso-for-terminals/#section-interoperability-and-portability-of-ticketing-terminal-solutions).
This solution enables:
- _any_ **smart card reader solution** to be operated _independently_ of the **terminal architecture**,
- and _any_ **ticketing applications** to be ported _independently_ of the **terminal products** supplied by manufacturers.

First solutions translating these interface definitions into programming languages, or implementing these interfaces, are [available](https://terminal-api.calypsonet.org/implementations/).

<br>2 levels of APIs are offered, from the lowest to the highest:
- at the bottom the ['reader layer'](https://terminal-api.calypsonet.org/specifications/reader-layer/) _generic_ interfaces:
  - the [**Reader**](https://terminal-api.calypsonet.org/specifications/reader-layer/reader-api/) **API** to control any reader solution and manage the application selection on a smart card,
  - the [**Card**](https://terminal-api.calypsonet.org/specifications/reader-layer/card-api/) **API** for interfacing a card processing library specific to a smart card solution.
- Just below 'smartcard solution layer' _specific_ interfaces:
  - several interfaces to integrate [Calypso processing](https://terminal-api.calypsonet.org/specifications/calypso-layer/) support:
    - [**Card**](https://terminal-api.calypsonet.org/specifications/calypso-layer/calypso-card-api/) and **[Legacy SAM](https://terminal-api.calypsonet.org/specifications/calypso-layer/calypso-legacysam-api/) API**s to perform secure transactions with Calypso cards or with Calypso security modules such as SAM-S1 or SAM-C1.
    - [**Symmetric Crypto**](https://terminal-api.calypsonet.org/specifications/calypso-layer/calypso-symmetric-crypto-api/) and **[Asymmetric Crypto](https://terminal-api.calypsonet.org/specifications/calypso-layer/calypso-asymmetric-crypto-api/) API**s to interface Calypso SAM or Calypso PKI processing libraries.

[CNA](https://calypsonet.org/)'s [legitimacy to lead](https://terminal-api.calypsonet.org/community/contributing/#definition-of-calypso-layer-apis) the definition of software interfaces to manage [Calypso solutions](https://calypsonet.org/solutions-overview/) is obvious.
<br><span style="color: red;">Regarding the definition of generic interfaces for the smart card industry, CNA is open to share the driving of this work with any interested organization or manufacturer</span>.

<br><br>To ensure the proper working and interoperability of ticketing terminal solutions, [CNA](https://calypsonet.org/) has also defined [rules that shall be followed by terminal solutions](https://calypsonet.org/calypso-for-terminals/#section-how-to-implement-calypso-in-a-ticketing-terminal) for different software layers. From the lowest to the highest level:
- the [Reader Layer Requirements](https://calypsonet.org/reader-layer-requirements-200422/),
- the [Calypso Layer Requirements](https://calypsonet.org/calypso-layer-requirements-200423/),
- and the [Ticketing Layer Requirements](https://calypsonet.org/ticketing-layer-requirements-200430/).

The layout of the ticketing terminal APIs matches the architecture targeted by the ticketing terminal requirements.
It should therefore be possible in the future to certify the compliance with the terminal requirements for ticketing terminal solutions based on these APIs.