import React, { useState } from 'react';
import { motion } from 'framer-motion';

import styles from './styles';

const FewSelector = ({ options = {}, initial, onUpdate = (key, value) => {}}) => {

    const [ active, setActive ] = useState(Object.values(options).indexOf(initial));

    return (

        <div style={{...styles.FewSelector}}>

            {


                Object.keys(options).map( (key, index) => (
                        <motion.button
                            onClick={() => {
                                let key = Object.keys(options)[index];
                                setActive(index)
                                onUpdate(key, options[key])
                            }}
                            animate={{
                                opacity: active === index ? 1.0 : 0.35
                            }}
                            transition={{
                                duration: 0.15,
                                ease: 'easeInOut'
                            }}
                            style={{
                                ...styles.FewOption
                            }}
                        >
                            { key }
                        </motion.button>
                    )
                )


            }


        </div>

    )



}

export default FewSelector;
