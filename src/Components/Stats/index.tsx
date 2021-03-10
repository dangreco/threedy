import React, { useContext } from 'react';
import ThreedyContext from '../../Contexts/ThreedyContext';

import styles from './styles';
import {percentComplete, renderStats} from "./utils";

type StatsProps = {
    showPercent?: boolean
};

const Stats: React.FC<StatsProps> = ({ showPercent = true }) => {

    const {
        hass,
        config,
    } = useContext(ThreedyContext);

    const round = config.round === undefined ? true : config.round;
    const percent = percentComplete(hass, config);

    return (
        <div style={{ ...styles.Stats }}>
            {
                showPercent ? (
                    <div style={{ ...styles.Percent }}>
                        <p style={{ ...styles.PercentText }}>{round ? Math.round(percent) : percent}%</p>
                    </div>
                ) : (null)
            }
            <div style={{ ...styles.Monitored }}>
                {
                    config.monitored ? renderStats(hass, config) : null
                }
            </div>
        </div>
    )


}

export default Stats;
