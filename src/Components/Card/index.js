import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoPower } from 'react-icons/io5'
import { FaRegLightbulb, FaLightbulb } from 'react-icons/fa';

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


    const borderRadius = styles[theme] ? styles[theme].borderRadius : styles['Default'].borderRadius;

    const state = (hass.states[`${config.base_entity}_current_state`] || {state: 'unknown'}).state
    const light_on = config.light_entity ? (hass.states[config.light_entity] || {state: 'off'}).state === 'on' : false;

    const neumorphicShadow = hass.themes.darkMode ? '-5px -5px 8px rgba(50, 50, 50,.2),5px 5px 8px rgba(0,0,0,.08)' : '-4px -4px 8px rgba(255,255,255,.5),5px 5px 8px rgba(0,0,0,.03)'
    const defaultShadow = 'var( --ha-card-box-shadow, 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12) )'

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
                fontFamily: config.font || 'sans-serif',
                boxShadow: theme === 'Neumorphic' ? neumorphicShadow : defaultShadow
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
                                style={{ ...styles.PowerButton }} 
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
                                {
                                    light_on ? <FaLightbulb /> : <FaRegLightbulb />
                                }
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