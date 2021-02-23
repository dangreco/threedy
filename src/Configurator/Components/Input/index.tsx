import React, { useState } from 'react';
import { motion } from 'framer-motion';

import styles from './styles';

const Input = ({ initial, placeholder, onUpdate = (v) => {} }) => {

    const [value, setValue] = useState(initial);
    const [active, setActive] = useState(false);

    const onChange = (e) => {
        const val = e.target.value;
        setValue(val);
        onUpdate(val);
    }

    return (
        <div style={{ ...styles.Wrapper }}>
            <motion.input
                animate={{
                    backgroundColor: active ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.05)'
                }}
                transition={{
                    duration: 0.15,
                    ease: 'easeInOut'
                }}
                style={{ ...styles.Input }}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={() => setActive(true)}
                onBlur={() => setActive(false)}
            />
        </div>

    )

}

export default Input;