import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import styles from './styles';

type ButtonProps = {
    onClick: Function,
    style: Object
}

const Button: React.FC<ButtonProps> = ({ onClick, style, children }) => {

    const [active, setActive] = useState(false);

    const ref = useRef();

    const handleClick = e => {

        if (!ref.current.contains(e.target)) {
            setActive(false);
        }

    }

    return (
        <motion.button
            ref={ref}
            style={{ ...styles.Button, ...style }}
            animate={{
                scale: active ? 0.9 : 1.0
            }}
            onClick={onClick}
            onMouseDown={() => setActive(true)}
            onMouseUp={() => setActive(false)}
            onMouseLeave={() => setActive(false)}
        >
            { children }
        </motion.button>
    )

};

export default Button;
