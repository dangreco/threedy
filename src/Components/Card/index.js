import React, { useContext, useState } from 'react';
import ThreedyContext from '../../Contexts/ThreedyContext';
import PrinterView from '../PrinterView';
import Stats from '../Stats';

import { motion } from 'framer-motion';

import { IoPower } from 'react-icons/io5'
import { GoLightBulb } from 'react-icons/go';

import styles from './styles';



const Card = ({ }) => {

    const {
        config,
        hass
    } = useContext(ThreedyContext);

    const [hiddenOverride, setHiddenOveride] = useState(false);

    const theme = config.theme;

    const state = hass.states[`${config.base_entity}_current_state`].state
    const hidden = state !== 'Printing' && !hiddenOverride;
    const statusColor = state === 'Printing' ? "#4caf50" : state === "unknown" ? "#f44336" : state === "Operational" ? "#00bcd4" : "#ffc107"
    const borderRadius = styles[theme].borderRadius;

    const togglePower = config.power_entity ? () => {
        hass.callService('homeassistant', 'toggle', { entity_id: config.power_entity })
            .then((context) => {
                console.log(context)
            })
    } : () => { };

    const toggleLight = config.light_entity ? () => {
        hass.callService('homeassistant', 'toggle', { entity_id: config.light_entity })
            .then((context) => {
                console.log(context)
            })
    } : () => { };

    return (
        <motion.div
            animate={{ borderRadius: hidden ? borderRadius : borderRadius * 2 }}
            transition={{ ease: "easeInOut", duration: 0.25 }}
            style={{
                ...styles.Card,
                ...styles[theme],
                fontFamily: config.font || 'sans-serif'
            }}
        >
            <div style={{ ...styles.Root }}>

                <div style={{ ...styles.Header, justifyContent: config.power_entity || config.light_entity ? 'space-between' : 'center' }}>
                    {
                        config.light_entity && !config.power_entity ? (
                            <div style={{ ...styles.PowerButton }}></div>
                        ) : (null)
                    }


                    {
                        config.power_entity ? (
                            <button style={{ ...styles.PowerButton }} onClick={togglePower}><IoPower /></button>
                        ) : (null)
                    }

                    <button style={{ ...styles.NameStatus }} onClick={() => setHiddenOveride(!hiddenOverride)}>
                        <div style={{
                            ...styles.StatusDot,
                            backgroundColor: statusColor
                        }}></div>
                        <p style={{ ...styles.HeaderText }}>{config.name}</p>
                    </button>


                    {
                        config.light_entity ? (
                            <button style={{ ...styles.PowerButton }} onClick={toggleLight}><GoLightBulb /></button>
                        ) : (null)
                    }

                    {
                        config.power_entity && !config.light_entity ? (
                            <div style={{ ...styles.PowerButton }}></div>
                        ) : (null)
                    }

                </div>

                <motion.div
                    style={{ ...styles.Content }}
                    animate={{ height: hidden ? 0.0 : 'auto', opacity: hidden ? 0.0 : 1.0, scale: hidden ? 0.0 : 1.0 }}
                    transition={{ ease: "easeInOut", duration: 0.25 }}
                >
                    <div style={{ ...styles.Section }}>
                        <PrinterView />
                    </div>
                    <div style={{ ...styles.Section, paddingLeft: 16, paddingRight: 32 }}>
                        <Stats />
                    </div>
                </motion.div>

            </div>

        </motion.div>
    )

}

export default Card;