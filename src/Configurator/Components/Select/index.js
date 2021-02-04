import React, { useEffect, useRef, useState } from 'react';
import { motion, useElementScroll } from 'framer-motion';

import { FiChevronDown } from 'react-icons/fi';

import styles from './styles';

const Option = ({ onClick, children }) => {

    const [active, setActive] = useState(false);

    const ref = useRef();

    const mouseDown = () => setActive(true);
    const mouseUp = () => setActive(false);

    /* Function to Detect Outside Click & Make inactive */
    const handleClick = e => {

        if (!ref.current.contains(e.target)) {
            setActive(false);
        }

    }

    useEffect(() => {

        document.addEventListener('mousedown', handleClick);

        return () => document.removeEventListener("mousedown", handleClick);

    }, []);

    return (
        <motion.button 
            ref={ref}
            style={{ ...styles.Option }} 
            animate={{
                filter: active ? 'brightness(80%)' : 'brightness(100%)'
            }}
            onClick={onClick}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            onMouseLeave={mouseUp}
        >
            { children }
        </motion.button>
    )

};

const Select = ({ options, placeholder, initial, onSelect = (s) => { } }) => {

    const [selection, setSelection] = useState(initial);
    const [hidden, setHidden] = useState(true);
    const [active, setActive] = useState(false);

    const selectRef = useRef();
    const optionsRef = useRef();

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

    /* Function to Detect Outside Click & Collapse */
    const handleClick = e => {

        const inSelect = selectRef.current.contains(e.target);
        const inOptions = optionsRef.current.contains(e.target);

        /* Outside of Select; Collapse */
        if (!(inSelect || inOptions)) {
            setHidden(true);
        }

    }

    useEffect(() => {

        document.addEventListener('mousedown', handleClick);

        return () => document.removeEventListener("mousedown", handleClick);

    }, []);

    return (
        <div style={{ ...styles.Select }}>

            <motion.button
                ref={selectRef}
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
                {selection ? options[selection] : placeholder}
                <FiChevronDown />
            </motion.button>

            <motion.div
                ref={optionsRef}
                animate={{
                    opacity: hidden ? 0.0 : 1.0,
                    scaleY: hidden ? 0.0 : 1.0
                }}
                transition={{
                    duration: 0.15,
                    ease: 'easeInOut'
                }}
                style={{ ...styles.Options }}
            >
                {
                    Object.keys(options).map(key => (
                        <Option onClick={() => selectOption(key)}>
                            { options[key] }
                        </Option>
                    ))
                }
            </motion.div>

        </div>
    )

}

export default Select;