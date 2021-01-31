import React, { useEffect, useState } from 'react';
import DragDrop from './Components/DragDrop';
import Input from './Components/Input';
import MultiSelector from './Components/MultiSelector';
import Select from './Components/Select';

import styles from './styles';


const defaultConditions = [
    'Status',
    'ETA',
    'Elapsed',
    'Hotend',
    'Bed'
]


const Configurator = ({ hass, config, threedy }) => {

    const printers = [];
    const [modifiedConfig, setModifiedConfig] = useState(config);

    Object.keys(hass.states).filter(entityId => (/sensor\..*_current_state/g).test(entityId)).map(
        entityId => {

            const base_entity = entityId.replace('_current_state', '');
            const printerSlug = base_entity.replace('sensor.', '');
            const printerName = printerSlug.split("_").map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(" ");


            printers[base_entity] = printerName;
        }
    )

    useEffect(() => {
        setModifiedConfig(config);
    }, [config])

    const updateConfig = (updates) => {

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
        setModifiedConfig(event.detail.config);
    }

    const changePrinter = ({ key: base_entity, value: name }) => {
        updateConfig({
            base_entity,
            name
        });
    }

    const changePrinterType = ({ key: printer_type, value: _ }) => {
        updateConfig({
            printer_type
        })
    }

    const changePrinterName = (printerName) => {
        updateConfig({
            name: printerName
        })
    }

    const changeMonitored = (monitored) => {
        updateConfig({
            monitored
        })
    }

    if (!config) return <div></div>

    return (
        <div style={{ ...styles.Configurator }}>
            <p style={{ ...styles.Label }}>Printer</p>
            <Select
                placeholder="Select..."
                options={printers}
                onSelect={changePrinter}
                initial={config.base_entity}
            />

            {
                modifiedConfig ? modifiedConfig.name ? (
                    <>
                        <p style={{ ...styles.Label }}>Printer Type</p>
                        <Select
                            placeholder="Select..."
                            options={{
                                "I3": "I3",
                                "Cantilever": "Cantilever"
                            }}
                            onSelect={changePrinterType}
                            initial={config.printer_type}
                        />

                        <p style={{ ...styles.Label }}>Name</p>
                        <Input
                            onUpdate={changePrinterName}
                            initial={config.name || modifiedConfig.name}
                        />

                        <p style={{ ...styles.Label }}>Monitored</p>
                        <MultiSelector items={defaultConditions} initial={config.monitored} onChange={changeMonitored} />
                    </>
                ) : (null) : (null)
            }



        </div>
    )

}

export default Configurator;
