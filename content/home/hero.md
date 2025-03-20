+++
widget = "hero" 
headless = true
active = true 
weight = 10 

title = "APIs for Ticketing Terminals processing smart cards"

hero_media = "hero-image.svg"

[design.background] 
  image = ""  
  color = "#039efd"
  #image_darken = 0.8 
  #text_color_light = true

+++
In order to facilitate the design of terminals processing smart card readers (user card, security module), 
CNA (the [Calypso Networks Association](https://calypsonet.org/)) has standardized 
[software interfaces for ticketing terminals]({{< relref "specifications" >}}).

This solution enables:
- **Any** smart card reader solution to be operated **independently** of the terminal architecture;
- **Any** ticketing application to be ported **regardless** of the terminal products provided by manufacturers.

The [first solutions]({{< relref "implementations" >}}) that translate these interface definitions into programming languages or implement these interfaces are now available.