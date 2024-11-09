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
To facilitate the design of terminals processing smartcard readers (user card, security module), CNA (the [Calypso Networks Association](https://calypsonet.org/)) has standardized [software interfaces for ticketing terminals]({{< relref "specifications" >}}).

This solution enables:
- _any_ **smart card reader solution** to be operated _independently_ of the **terminal architecture**,
- and _any_ **ticketing applications** to be ported _independently_ of the **terminal products** supplied by manufacturers.

[First solutions]({{< relref "implementations" >}}) translating these interface definitions into programming languages, or implementing these interfaces, are available.