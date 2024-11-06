+++
widget = "hero" 
headless = true
active = true 
weight = 10 

title = "APIs for Ticketing Terminal processing smartcard"

hero_media = "hero-image.svg"

[design.background] 
  image = ""  
  color = "#039efd"
  #image_darken = 0.8 
  #text_color_light = true

+++
In order to facilitate the design of terminals processing smartcard readers (user card, security module), CNA (the [Calypso Networks Association](https://calypsonet.org/)) has standardized [software interfaces for ticketing terminals](https://calypsonet.org/calypso-for-terminals/#section-interoperability-and-portability-of-ticketing-terminal-solutions).
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

