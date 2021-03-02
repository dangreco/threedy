import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import useDimensions from "react-cool-dimensions";
import ThreedyContext from '../../Contexts/ThreedyContext';
import { animate, motion, useMotionValue } from "framer-motion"

import styles from './styles';

import getDimensions from './utils';

const I3 = ({ printerConfig }) => {

    const {
        hass,
        config
    } = useContext(ThreedyContext);

    const [dimensions, setDimensions] = useState(undefined);

    const { ref } = useDimensions({
        onResize: ({ width, height}) => {
            setDimensions(
                getDimensions(
                    printerConfig,
                    {width, height},
                    config.scale || 1.0
                )
            )
        },
    });


    const printing = (hass.states[config.use_mqtt ? `${config.base_entity}_print_status` : `${config.base_entity}_current_state`] || { state: "unknown" }).state === 'Printing';
    const progress = (hass.states[config.use_mqtt ? `${config.base_entity}_print_progress` : `${config.base_entity}_job_percentage`] || { state: 0 }).state / 100;

    const x = useMotionValue(0);

    useEffect(() => {

        if (dimensions && printing) {
            return animate(x, dimensions.BuildPlate.width, {
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'linear'
            })
        }

    }, [dimensions])


    return (
        <div style={{ ...styles.I3 }} ref={ref}>

            {

                dimensions !== undefined ? (
                    <div style={{ ...styles.Scalable, ...dimensions.Scalable }}>

                        <div style={{ ...styles.Frame, ...dimensions.Frame }}>
                            <div style={{ ...styles.Hole, ...dimensions.Hole }} />
                        </div>

                        <div style={{ ...styles.BuildArea, ...dimensions.BuildArea }}>
                            <div
                                style={{ ...styles.Print, height: `${progress * 100}%` }}
                            />
                        </div>

                        <div style={{ ...styles.BuildPlate, ...dimensions.BuildPlate }} />

                        <motion.div
                            animate={{
                                y: progress * -1 * dimensions.BuildArea.height
                            }}
                            style={{
                                ...styles.XAxis,
                                ...dimensions.XAxis
                            }}
                        />

                        <motion.div
                            animate={{
                                y: progress * -1 * dimensions.BuildArea.height
                            }}
                            style={{
                                x,
                                ...styles.Gantry,
                                ...dimensions.Gantry
                            }}
                        >
                            <div className="Nozzle"
                                style={{
                                    ...styles.Nozzle,
                                    ...dimensions.Nozzle
                                }}
                            >

                            </div>
                        </motion.div>
                    </div>
                ) : null

            }

        </div>

    )

}

export default I3;
