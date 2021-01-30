import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { IoPower } from 'react-icons/io5'
import { GoLightBulb } from 'react-icons/go';

import ThreedyContext from '../../Contexts/ThreedyContext';
import toggleEntity from '../../Utils/Toggle';

import PrinterView from '../PrinterView';
import Stats from '../Stats';

import styles from './styles';


const Card = ({ }) => {

    const {
        config,
        hass
    } = useContext(ThreedyContext);

    const [hiddenOverride, setHiddenOveride] = useState(false);

    const theme = config.theme || 'Default';
    const borderRadius = styles[theme].borderRadius;

    const state = (hass.states[`${config.base_entity}_current_state`] || {state: 'unknown'}).state
    const light_color = config.light_entity ? (hass.states[config.light_entity] || {state: 'off'}).state === 'on' ? 'var(--primary-text-color)' : '#777777' : '#777777'    

    const hidden = state !== 'Printing' && !hiddenOverride;
    const statusColor = 
        state === 'Printing' ? 
            "#4caf50" 
            : state === "unknown" ? 
                "#f44336" 
                : state === "Operational" ? 
                    "#00bcd4" 
                    : "#ffc107"
    
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

                <div 
                    style={{ 
                        ...styles.Header, 
                        justifyContent: config.power_entity || config.light_entity ? 'space-between' : 'center' 
                    }}
                >
                    
                    {
                        config.light_entity && !config.power_entity ? (
                            <div style={{ ...styles.PowerButton }} />
                        ) : (null)
                    }

                    {
                        config.power_entity ? (
                            <button
                                style={{ ...styles.PowerButton, color: light_color }} 
                                onClick={() => toggleEntity(config.power_entity)}
                            >
                                <IoPower />
                            </button>
                        ) : (null)
                    }

                    <button 
                        style={{ ...styles.NameStatus }} 
                        onClick={() => setHiddenOveride(!hiddenOverride)}
                    >
                        <div
                            style={{
                                ...styles.StatusDot,
                                backgroundColor: statusColor
                            }}
                        />
                        <p style={{ ...styles.HeaderText }}>{ config.name || '(no name)' }</p>
                    </button>

                    {
                        config.light_entity ? (
                            <button 
                                style={{ ...styles.PowerButton }} 
                                onClick={() => toggleEntity(config.light_entity)}
                            >
                                <GoLightBulb />
                            </button>
                        ) : (null)
                    }

                    {
                        config.power_entity && !config.light_entity ? (
                            <div style={{ ...styles.PowerButton }} />
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
                    <div 
                        style={{ 
                            ...styles.Section, 
                            paddingLeft: 16, 
                            paddingRight: 32 
                        }}
                    >
                        <Stats />
                    </div>
                </motion.div>

            </div>

        </motion.div>
    )

}

export default Card;