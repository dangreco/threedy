import React from 'react';

import styles from './styles';

const Configurator = ({ hass, config }) => {

    const printers = Object.keys(hass.states).filter(entityId => (/sensor\..*_current_state/g).test(entityId)).map(
        entityId => {

            const printerSlug = entityId.replace('sensor.', '').replace('_current_state', '');
            const printerName = printerSlug.split("_").map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(" ");

            return {
                name: printerName,
                baseEntity: entityId.replace('_current_state', '')
            }
        }
    )

    return (
        <div>
            <p>Printers:</p>
            {
                printers.map(printer => <p>{printer.name}</p>)
            }
        </div>
    )

}

export default Configurator;
