import React from 'react';
import { motion } from "framer-motion"

import styles from './styles';


const Extruder = ({ dimensions }) => {

    const {
        Gantry,
        Nozzle,
        BuildPlate
    } = dimensions;

    return (
        <motion.div
            animate={{ x: [0, BuildPlate.width] }}
            transition={{ 
                repeatType: 'reverse',
                repeat: Infinity, 
                duration: 2,
                ease: 'linear'
            }}
            style={{
                ...styles.Gantry, 
                ...Gantry 
            }}
        >
            <div className="Nozzle"
                style={{
                    ...styles.Nozzle,
                    ...Nozzle
                }}
            >

            </div>
        </motion.div>
    )

}

export default Extruder;