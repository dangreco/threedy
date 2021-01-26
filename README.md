![Screenshot](https://github.com/dangreco/threedy/raw/master/screenshot.png)

# Threedy
## Home Asssistant card for 3D printers (via OctoPrint integration)



## Prerequisites
---
- [OctoPrint](https://octoprint.org/)-enabled 3D printer
- [Home Assistant](https://www.home-assistant.io/) instance
- Home Assistant [OctoPrint integration](https://www.home-assistant.io/integrations/octoprint/)
  - *** Make sure to expose all available data entities for your printer! ***


## Installation
---
### ~~Method 1: HACS~~

### ~~Method 2: Manual~~


## Config
---

- ```type``` &mdash; Always ```'custom:threedy-card'```
- ```base_entity``` &mdash; Take the beginning of one of the OctoPrint sensors of your printer. Example: for ```sensor.ender_3_v2_current_state``` it would be ```sensor_ender_3_v2```.
- ```name``` &mdash; Can be whatever you want!
- ```theme``` &mdash; Theme of the card: ```'Default' | 'Material' | 'Neumorphic' ```. Screenshots listed below.
- ```scale``` &mdash; The scale factor of the animated 3D printer view. Try different values until you find one you like.
- ```printer_type``` &mdash; Use a  printer style: ```'I3' | 'Cantilever' | 'Boxy' | 'Delta' ```
- ```printer_config``` &mdash; Use in with ```printer_type``` to set a custom printer style. If omitted, the default for the type will be used. Use [this tool](https://google.com) to create a custom value.
- ```monitored``` &mdash; A list of values to monitor throughout the print; gets displayed to the right of the printer.

## Example Config
---

```yaml
type: 'custom:threedy-card'
base_entity: 'sensor.ender_3_v2'
name: 'Ender 3 v2'
theme: 'Default' 
scale: 0.5
printer_type: I3
monitored:
  - Status
  - ETA
  - Elapsed
  - Hotend
  - Bed
```


