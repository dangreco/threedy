import React, { useContext, useState } from 'react';
import ThreedyContext from '../../Contexts/ThreedyContext';
import PrinterView from '../PrinterView';
import Stats from '../Stats';

import {motion} from 'framer-motion';

import styles from './styles';

const Card = ({ }) => {

    const {
        config,
        hass
    } = useContext(ThreedyContext);

    const theme = config.theme;

    const state = hass.states[`${config.base_entity}_current_state`].state
    const hidden = state !== 'Printing'
    const statusColor = state === 'Printing' ? "#4caf50" : state === "Unknown" ? "#f44336" : state === "Operational" ? "#00bcd4" : "#ffc107" 

    return (
        <motion.div
            animate={{ borderRadius: hidden ? 16 : 32 }}
            transition={{ ease: "easeInOut", duration: 0.25 }}
            style={{
                ...styles.Card,
                ...styles[theme]
            }}
        >
            <div style={{ ...styles.Root }}>

                <div style={{ ...styles.Header }}>
                    <div style={{ 
                        ...styles.StatusDot,
                        backgroundColor: statusColor
                    }}></div>
                    <p style={{ ...styles.HeaderText }}>{ config.name }</p>
                </div>

                <motion.div 
                    style={{ ...styles.Content }}
                    animate={{ height: hidden ? 0.0 : 'auto', opacity: hidden ? 0.0 : 1.0, scale: hidden ? 0.0 : 1.0 }}
                    transition={{ ease: "easeInOut", duration: 0.25 }}
                >
                    <div style={{ ...styles.Section }}>
                        <PrinterView />
                    </div>
                    <div style={{ ...styles.Section, paddingLeft: 32, paddingRight: 32 }}>
                        <Stats />
                    </div>
                </motion.div>

            </div>

        </motion.div>
    )

}

export default Card;