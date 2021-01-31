import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { FiChevronDown } from 'react-icons/fi';

import styles from './styles';

const Select = ({ options, placeholder, initial, onSelect = (s) => {} }) => {

    const [selection, setSelection] = useState(initial);
    const [hidden, setHidden] = useState(true);
    const [active, setActive] = useState(false);

    const showOptions = () => {
        setHidden(false);
    }

    const hideOptions = () => {
        setHidden(true);
    }

    const selectOption = (option) => {
        setSelection(option);
        onSelect({
            key: option,
            value: options[option]
        })
        hideOptions();
    }

    return (
        <div style={{ ...styles.Select }}>

            <motion.button 
                animate={{
                    backgroundColor: active ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.05)'
                }}
                transition={{
                    duration: 0.15,
                    ease: 'easeInOut'
                }}
                style={{ 
                    ...styles.SelectButton,
                }} 
                onClick={showOptions}
                onMouseEnter={() => setActive(true)}
                onMouseLeave={() => setActive(false)}
            >
                { selection ? options[selection] : placeholder }
                <FiChevronDown />
            </motion.button>

            <motion.div 
                animate={{
                    opacity: hidden ? 0.0 : 1.0,
                    scale: hidden ? 0.0 : 1.0
                }}
                transition={{
                    duration: 0.15,
                    ease: 'easeInOut'
                }}
                style={{ ...styles.Options }}
            >
                {
                    Object.keys(options).map( key => (
                        <button style={{ ...styles.Option }} onClick={() => selectOption(key)}>
                            { options[key] }
                        </button>
                    ) )
                }
            </motion.div>

        </div>
    )

}

export default Select;