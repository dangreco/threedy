import React, { useContext } from 'react';
import moment from 'moment';
import ThreedyContext from '../../Contexts/ThreedyContext';

import styles from './styles';

const DAYSEC = 60*60*24;
const HRSEC = 60*60;
const MINSEC = 60;


const Stat = ({ condition }) => {

    const {
        hass,
        config
    } = useContext(ThreedyContext);

    const round = config.round === undefined ? true : config.round;

    const entityEnding = (() => {
        switch (condition) {
            case 'Status':
                return '_current_state'
            case 'ETA':
                return '_time_remaining'
            case 'Elapsed':
                return '_time_elapsed'
            case 'Hotend':
                return '_actual_tool0_temp'
            case 'Bed':
                return '_actual_bed_temp'
            default:
                return undefined
        }
    })();

    const entity = entityEnding === undefined ? undefined : hass.states[`${config.base_entity}${entityEnding}`];

    const format_seconds_elapsed = (s) => {
        let days = Math.floor(s / DAYSEC);
        s -= days * DAYSEC;
        let hours = Math.floor(s / HRSEC);
        s -= hours * HRSEC;
        let minutes = Math.floor(s / MINSEC);
        s -= minutes * MINSEC;
        let seconds = s;

        return `${days > 0 ? days + 'd ' : ''}${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + "m " : ''}${seconds > 0 ? seconds + "s" : ''}`;
    }

    const formatEntityState = () => {
        switch (condition) {
            case 'Status':
                return entity.state
            case 'ETA':
                return moment().add(entity.state, 's').format('h:mm a')
            case 'Elapsed':
                return format_seconds_elapsed(entity.state)
            case 'Hotend':
                return `${round ? Math.round(entity.state) : entity.state}${entity.attributes.unit_of_measurement}`
            case 'Bed':
                return `${round ? Math.round(entity.state) : entity.state}${entity.attributes.unit_of_measurement}`
            default:
                return '<unknown>'
        }
    }

    return (
        <div style={{ ...styles.Stat }}>
            <p style={{ ...styles.StatText, ...styles.Condition }}>{ condition }</p>
            <p style={{ ...styles.StatText }}>{ formatEntityState() }</p>
        </div>
    )

}

const Stats = () => {

    const {
        hass,
        config,
    } = useContext(ThreedyContext);

    const round = config.round === undefined ? true : config.round

    const percentComplete = hass.states[`${config.base_entity}_job_percentage`].state;

    return (
        <div style={{ ...styles.Stats }}>
            <div style={{ ...styles.Percent }}>
                <p style={{ ...styles.PercentText }}>{ round ? Math.round(percentComplete) : percentComplete }%</p>
            </div>
            <div style={{ ...styles.Monitored }}>
                {
                    config.monitored.map(condition => <Stat condition={condition} />)
                }
            </div>
        </div>
    )


} 

export default Stats;