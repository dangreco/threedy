
# Threedy
## Home Asssistant card for 3D printers (via OctoPrint integration)


![Featured](https://github.com/dangreco/threedy/raw/master/screenshots/active.png)

<a href="https://www.buymeacoffee.com/dangreco" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

## Prerequisites
---
- [OctoPrint](https://octoprint.org/)-enabled 3D printer
- [Home Assistant](https://www.home-assistant.io/) instance
- Home Assistant [OctoPrint integration](https://www.home-assistant.io/integrations/octoprint/)
  - *** Make sure to expose all available data entities for your printer! ***


## Installation
---
### ~~Method 1: HACS~~

### Method 2: Manual

1. Download ```threedy-card.js``` from the releases section.
2. Either:
  * Move to the ```www``` folder of your Home Assistant instance
  * Or copy the ffle's contents via the file editor.
3. In the Resources section of Lovelace (```Configuration -> Lovelace Dashboards -> Resources```), add ```/local/threedy-card.js``` as a ```JavaScript Module```.
4. Save
5. Add a manual card to your lovelace dashboard using the configuration instructions below.


## Config
---

### Required

- ```type``` &mdash; Always ```'custom:threedy-card'```
- ```base_entity``` &mdash; Take the beginning of one of the OctoPrint sensors of your printer. Example: for ```sensor.ender_3_v2_current_state``` it would be ```sensor_ender_3_v2```.
- ```name``` &mdash; Can be whatever you want!
- ```printer_type``` &mdash; Use a  printer style: ```'I3' | 'Cantilever' | 'Boxy' | 'Delta' ```
- ```monitored``` &mdash; A list of values to monitor throughout the print; gets displayed to the right of the printer.

### Optional

- ```theme``` &mdash; Theme of the card: ```'Default' | 'Material' | 'Neumorphic' ```. Screenshots listed below.
- ```font``` &mdash; Specify the font used in the card. By default it is ```sans-serif```.
- ```scale``` &mdash; The scale factor of the animated 3D printer view. Try different values until you find one you like.
- ```round``` &mdash; Specify whether to round decimal numbers in the card. Defaults to true. ```true | false```
- ```printer_config``` &mdash; Use in with ```printer_type``` to set a custom printer style. If omitted, the default for the type will be used. Use [this tool](https://google.com) to create a custom value.

## Example Config
---

```yaml
# required
type: 'custom:threedy-card'
base_entity: 'sensor.ender_3_v2'
name: 'Ender 3 v2'
printer_type: I3
monitored:
  - Status
  - ETA
  - Elapsed
  - Hotend
  - Bed
# optionals  
theme: 'Default'
font: 'Roboto'
scale: 0.5
round: false 
```


## Screenshots
---

### Active Print

![Active](https://github.com/dangreco/threedy/raw/master/screenshots/active.png)

### Idle

![Idle](https://github.com/dangreco/threedy/raw/master/screenshots/idle.png)

### Printer Offline

![Offline](https://github.com/dangreco/threedy/raw/master/screenshots/offline.png)

### Show/Hide Animation

![ShowHide](https://media.giphy.com/media/14VgtFSulJkOaRiZFo/giphy.gif)

