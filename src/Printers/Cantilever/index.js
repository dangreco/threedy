import { motion, animate, useMotionValue } from 'framer-motion';
import React, { useContext, useState, useEffect } from 'react';
import Measure from 'react-measure';
import ThreedyContext from '../../Contexts/ThreedyContext';

import styles from './styles';
import getDimensions from './utils';

const Cantilever = ({ printerConfig }) => {

    const {
        hass,
        config
    } = useContext(ThreedyContext);

    const [dimensions, setDimensions] = useState(undefined);

    const progress = hass.states[`${config.base_entity}_job_percentage`].state / 100;

    const x = useMotionValue(0);

    useEffect(() => {

        if (dimensions) {
            return animate(x, dimensions.BuildPlate.width, {
                duration: 2,
                repeat: 'Infinity',
                repeatType: 'reverse',
                ease: 'linear'
            })
        }

    }, [dimensions])

    return(
        <Measure
            bounds
            onResize={({bounds}) => setDimensions( getDimensions( printerConfig, bounds, config.scale || 1.0 ) )}
        >
            {
                ({ measureRef }) => (

                    <div style={{ ...styles.Cantilever }} ref={measureRef}>
                        
                        {
                            dimensions ? (
                                <div style={{ ...styles.Scalable, ...dimensions.Scalable }}>
                                    
                                    <div style={{ ...styles.ZAxis, ...dimensions.ZAxis }} />
                                    <div style={{ ...styles.Bottom, ...dimensions.Bottom }} />


                                    <motion.div style={{ ...styles.XAxis, ...dimensions.XAxis }} />


                                    <div style={{ ...styles.BuildPlate, ...dimensions.BuildPlate }} />



                                </div>
                            ) : (null)
                        }

                    </div>

                )
            }
        </Measure>
    )

}

export default Cantilever;