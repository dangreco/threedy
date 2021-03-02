import {HomeAssistant, ThreedyConfig} from "../types";

/* Printer Entity ID -> Name; E.G. sensor.printer_name_current_state -> Printer Name */
const printerName = ( entityId: string | undefined ) => {

    if ( !entityId ) {
        return undefined;
    }

    return entityId
        .replace(/(_current_state|_print_progress)/, '')
        .replace('sensor.', '')
        .split("_")
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");

}

/* Printer Entity ID -> Base Entity; E.G. sensor.printer_name_current_state -> sensor.printer_name */
const printerBase = ( entityId: string | undefined ) => {

    if ( !entityId ) {
        return undefined;
    }

    return entityId
        .replace(/(_current_state|_print_progress)/, '');

}

const getPrinters = ( hass: HomeAssistant ) => {

    const printers = {};
    Object.keys( hass.states ).filter(
        entityId => (/sensor\..*(_current_state|_print_progress)/g).test(entityId)
    ).map(
        entityId => {

            const name = printerName(entityId);
            printers[name] = printerBase(entityId);

        }
    )


    return printers;
}

const getToggleables = ( hass: HomeAssistant) => {

    const toggleables = {};

    Object.keys(hass.states).filter(
        entityId => (/^(switch|light)/g).test(entityId)
    ).map( toggleable => toggleables[toggleable] = toggleable );

    return toggleables;

}

const getCameras = ( hass: HomeAssistant ) => {

    const cameras = {};

    Object.keys( hass.states ).filter(
        entityId => (/^camera\..*/g).test(entityId)
    ).map( camera => cameras[camera] = camera );

    return cameras;

}

type ConfigEventData = {
    config: ThreedyConfig;
}

interface ConfigEvent extends Event {
    detail: ConfigEventData
}

/* Updates the Threedy Card config given updates */
const updateConfig = ( threedy: HTMLElement, modifiedConfig: ThreedyConfig, updates: object ) => {

    const event: ConfigEvent = new Event("config-changed", {
        bubbles: true,
        composed: true
    }) as ConfigEvent;

    event.detail = {
        config: {
            ...modifiedConfig,
            ...updates
        }
    };

    threedy.dispatchEvent(event);

    return event.detail.config;
}

const updateValue = ( _updateConfig, key, value ) => {
    _updateConfig({
        [key]: value
    })
}


export {
    printerName,
    getPrinters,
    getToggleables,
    getCameras,
    updateConfig,
    updateValue
}
