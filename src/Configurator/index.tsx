import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import Button from './Components/Button';
import Input from './Components/Input';
import MultiSelector from './Components/MultiSelector';
import Select from './Components/Select';

import {
    getCameras,
    getPrinters,
    getToggleables,
    printerName,
    updateConfig,
    updateValue
} from './utils';

import styles from './styles';
import FewSelector from "./Components/FewSelector";
import {ThreedyCondition, ThreedyPrinter, ThreedyTheme} from '../types';


const Configurator = ({ hass, config, threedy }) => {

    const printers = getPrinters(hass);
    const toggleables = getToggleables(hass);
    const cameras = getCameras(hass);

    const [modifiedConfig, setModifiedConfig] = useState(config);
    const [advancedShown, setAdvancedShown] = useState(false);

    useEffect(() => {
        setModifiedConfig(config);
    }, [config])

    const _updateConfig = ( updates ) => setModifiedConfig( updateConfig(threedy, modifiedConfig, updates) );
    const _updateValue = (key, value) => updateValue( _updateConfig, key, value);

    if (!config) return (<div/>)

    // @ts-ignore
    return (
        <div style={{ ...styles.Root }}>

            <div style={{ ...styles.Configurator }}>

                <p style={{ ...styles.Label }}>Printer</p>
                <Select
                    placeholder="Select..."
                    options={printers}
                    onSelect={(s) => _updateValue('base_entity', s.value)}
                    initial={ printerName(config.base_entity) }
                />

                {
                    modifiedConfig ? modifiedConfig.base_entity ? (
                        <>
                            <p style={{ ...styles.Label }}>Printer Type</p>
                            <Select
                                placeholder="Select..."
                                options={ ThreedyPrinter }
                                onSelect={({key, value}) => _updateValue('printer_type', value)}
                                initial={config.printer_type}
                            />

                            <p style={{ ...styles.Label }}>Name</p>
                            <Input
                                placeholder={"Name"}
                                onUpdate={value => _updateValue('name', value)}
                                initial={config.name || modifiedConfig.name}
                            />

                            <p style={{ ...styles.Label }}>Monitored</p>
                            <MultiSelector
                                items={ ThreedyCondition }
                                initial={config.monitored}
                                onChange={selectedValues => _updateValue('monitored', selectedValues)}
                            />

                            <div style={{ ...styles.ButtonContainer }}>

                                <Button onClick={() => setAdvancedShown(true)} style={{ alignSelf: 'center' }}>
                                    Advanced
                                </Button>

                            </div>

                        </>
                    ) : (null) : (null)
                }



            </div>

            {
                modifiedConfig ? modifiedConfig.base_entity ? (
                    <motion.div
                        animate={{
                            left: advancedShown ? 0 : '-100%',
                            opacity: advancedShown ? 1.0 : 0.0
                        }}
                        style={{...styles.Advanced}}
                    >

                        <div style={{ ...styles.ButtonContainer, justifyContent: 'flex-start' }} >

                            <div style={{ ...styles.Configurator }}>

                                <Button onClick={() => setAdvancedShown(false)} style={{ alignSelf: 'center' }}>
                                    Back
                                </Button>


                                <p style={{ ...styles.Label }}>Theme</p>
                                <Select
                                    placeholder={"Select..."}
                                    options={ ThreedyTheme }
                                    onSelect={({key, value}) => _updateValue('theme', value)}
                                    initial={config.theme}
                                />

                                <p style={{ ...styles.Label }}>Font</p>
                                <Input
                                    placeholder={"Font"}
                                    onUpdate={value => _updateValue('font', value)}
                                    initial={config.font || modifiedConfig.font}
                                />


                                <p style={{ ...styles.Label }}>Scale</p>
                                <FewSelector
                                    onUpdate={(key, value) => _updateValue('scale', value)}
                                    initial={config.scale || modifiedConfig.scale}
                                    options={{
                                        '0.5': 0.5,
                                        '0.75': 0.75,
                                        '1.0': 1.0,
                                    }}
                                />


                                <p style={{ ...styles.Label }}>Round Time</p>
                                <FewSelector
                                    onUpdate={(key, value) => _updateValue('round_time', value)}
                                    initial={config.round_time || modifiedConfig.round_time}
                                    options={{
                                        'No': false,
                                        'Yes': true
                                    }}
                                />

                                <p style={{ ...styles.Label }}>Round Temperature</p>
                                <FewSelector
                                    onUpdate={(key, value) => _updateValue('round_temperature', value)}
                                    initial={config.round_temperature || modifiedConfig.round_temperature}
                                    options={{
                                        'No': false,
                                        'Yes': true
                                    }}
                                />


                                <p style={{ ...styles.Label }}>Temperature Unit</p>
                                <FewSelector
                                    onUpdate={(key, value) => _updateValue('temperature_unit', value)}
                                    initial={config.temperature_unit || modifiedConfig.temperature_unit}
                                    options={{
                                        '°C': 'C',
                                        '°F': 'F',
                                    }}
                                />


                                <p style={{ ...styles.Label }}>Use 24hr Time</p>
                                <FewSelector
                                    onUpdate={(key, value) => _updateValue('use_24hr', value)}
                                    initial={config.use_24hr || modifiedConfig.use_24hr}
                                    options={{
                                        'No': false,
                                        'Yes': true
                                    }}
                                />

                                <p style={{ ...styles.Label }}>Camera Entity</p>
                                <Select
                                    placeholder="Select..."
                                    options={cameras}
                                    onSelect={(s) => _updateValue('camera_entity', s.value)}
                                    initial={ config.camera_entity || modifiedConfig.camera_entity }
                                />

                                <p style={{ ...styles.Label }}>Power Entity</p>
                                <Select
                                    placeholder="Select..."
                                    options={toggleables}
                                    onSelect={(s) => _updateValue('power_entity', s.value)}
                                    initial={ config.power_entity || modifiedConfig.power_entity }
                                />

                                <p style={{ ...styles.Label }}>Light Entity</p>
                                <Select
                                    placeholder="Select..."
                                    options={toggleables}
                                    onSelect={(s) => _updateValue('light_entity', s.value)}
                                    initial={ config.light_entity || modifiedConfig.light_entity }
                                />


                            </div>


                        </div>

                    </motion.div>

                ) : null : null
            }



        </div>
    )

}

export default Configurator;
