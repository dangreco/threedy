import React, { useState } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import styles from './styles';

const Configurator = ({ hass, config, configChanged }) => {

    const [selected, setSelected] = useState(undefined);

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
        <div style={{ ...styles.Configurator }}>
            <p style={{ ...styles.Label }}>Printer</p>
            <Select style={{ ...styles.PrinterSelect }} value={selected} onChange={(v) => setSelected(v)}>
                <MenuItem value={"test"}>Test</MenuItem>
                {
                    printers.map(printer => (
                        <MenuItem value={printer.baseEntity}>{printer.name}</MenuItem>
                    ))
                }
            </Select>
            {
                selected ? (
                    <>
                        <TextField label="Name" />
                        <p style={{ ...styles.Label }}>Type</p>
                        <p style={{ ...styles.Label }}>Monitored</p>
                    </>
                ) : (null)
            }
        </div>
    )

}

export default Configurator;
