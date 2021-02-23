import React, { useContext } from 'react';
import ThreedyContext from '../../Contexts/ThreedyContext';

import styles from './styles';
import {renderStats} from "./utils";


const Stats = () => {

    const {
        hass,
        config,
    } = useContext(ThreedyContext);

    const round = config.round === undefined ? true : config.round;
    const percentComplete = (hass.states[config.use_mqtt ? `${config.base_entity}_print_progress` : `${config.base_entity}_job_percentage`] || { state: -1.0 }).state;

    return (
        <div style={{ ...styles.Stats }}>
            <div style={{ ...styles.Percent }}>
                <p style={{ ...styles.PercentText }}>{round ? Math.round(percentComplete) : percentComplete}%</p>
            </div>
            <div style={{ ...styles.Monitored }}>
                {
                    config.monitored ? renderStats(hass, config) : null
                }
            </div>
        </div>
    )


}

export default Stats;
