const conditions = [
    'Status',
    'ETA',
    'Elapsed',
    'Hotend',
    'Bed',
    'Remaining'
];

const printerTypes = {
    "I3": "I3",
    "Cantilever": "Cantilever"
}

const themes = {
    'Default': 'Default',
    'Neumorphic': 'Neumorphic'
}


/* Printer Entity ID -> Name; E.G. sensor.printer_name_current_state -> Printer Name */
const printerName = ( entityId ) => {

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
const printerBase = ( entityId ) => {

    if ( !entityId ) {
        return undefined;
    }

    return entityId
        .replace(/(_current_state|_print_progress)/, '');

}

const getPrinters = ( hass ) => {

    const printers = {};
    Object.keys( hass.states ).filter(
        entityId => (/sensor\..*(_current_state|_print_progress)/g).test(entityId)
    ).map(
        entityId => {

            const name = printerName(entityId);
            const base = printerBase(entityId);

            printers[name] = base;

        }
    )


    return printers;
}

const getToggleables = ( hass ) => {

    const toggleables = {};

    Object.keys(hass.states).filter(
        entityId => (/^(switch|light)/g).test(entityId)
    ).map( toggleable => toggleables[toggleable] = toggleable );

    return toggleables;

}

const getCameras = ( hass ) => {

    const cameras = {};

    Object.keys( hass.states ).filter(
        entityId => (/^camera\..*/g).test(entityId)
    ).map( camera => cameras[camera] = camera );

    return cameras;

}

/* Updates the Threedy Card config given updates */
const updateConfig = ( threedy, modifiedConfig, updates ) => {

    const event = new Event("config-changed", {
        bubbles: true,
        composed: true
    });
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
    conditions,
    printerTypes,
    themes,
    printerName,
    getPrinters,
    getToggleables,
    getCameras,
    updateConfig,
    updateValue
}
