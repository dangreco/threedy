import React from 'react';
import { motion } from "framer-motion"
import './styles.scss';


const Extruder = ({ config, extruder }) => {

    const holeWidth = config.top.width - (config.left.width + config.right.width);
    const basisX = config.left.width + (holeWidth - config.buildplate.maxWidth) / 2 - (extruder.width) / 2 - config.xAxis.offsetLeft;

    return (
        <motion.div className="Extruder"
            animate={{ left: [basisX, basisX + config.buildplate.maxWidth] }}
            transition={{ 
                repeatType: 'reverse',
                repeat: Infinity, 
                duration: 2,
                ease: 'linear'
            }}
            style={{
                width: extruder.width,
                height: extruder.height,
                top: -(extruder.height - config.xAxis.height) / 2,
                left: basisX
            }}
        >
            <div className="Nozzle"
                style={{
                    top: extruder.height,
                    left: (extruder.width - 12) / 2
                }}
            >

            </div>
        </motion.div>
    )

}

export default Extruder;