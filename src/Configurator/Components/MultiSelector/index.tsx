import React, { useEffect, useState } from 'react';
import styles from './styles';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp, FiCheck } from 'react-icons/fi';
import {Enum} from "../../../types";


const Item = ({ item, selected, available, reorder, toggle }) => {


    const active = selected.includes(item);
    const y = active ? 56 * selected.indexOf(item) : 56 * (selected.length + available.indexOf(item));

    return (
        <motion.div
            layout
            animate={{
                y: y
            }}
            style={{ ...styles.Item }}
        >
            <button
                style={{ ...styles.SelectorButton }}
                onClick={() => toggle(item)}
            >
                {active ? (<FiCheck />) : (null)}
            </button>

            <p style={{ ...styles.ItemText, ...(!active ? styles.DeselectedText : {})}}>{item}</p>

            <motion.div
                animate={{
                    opacity: active ? 1.0 : 0.0,
                    scale: active ? 1.0 : 0.0
                }}
            >
                <button
                    style={{ ...styles.PositionButton }}
                    onClick={() => reorder(item, 1)}
                >
                    <FiChevronDown />
                </button>
                <button
                    style={{ ...styles.PositionButton }}
                    onClick={() => reorder(item, -1)}
                >
                    <FiChevronUp />
                </button>
            </motion.div>



        </motion.div>
    )

};

type MultiSelectorProps = {
    items: Enum;
    initial: any[];
    onChange(s: any);
}

const MultiSelector: React.FC<MultiSelectorProps> = ({ items, initial = [], onChange = (s) => { } }) => {

    const stock = Object.values(items);
    const [selected, setSelected] = useState(initial);
    const [available, setAvailable] = useState(
        stock.filter(item => !initial.includes(item))
    );

    const reorder = (item, mod) => {

        const ind = selected.indexOf(item);
        const newPos = ind + mod;

        if (newPos < 0 || newPos > selected.length - 1) return;

        const clone = selected.slice(0);
        const tmp = clone[newPos];
        clone[newPos] = item;
        clone[ind] = tmp;

        setSelected(clone);
    }

    const toggle = (item) => {

        if (selected.includes(item)) {

            const i = selected.indexOf(item);

            setSelected([
                ...selected.slice(0, i),
                ...selected.slice(i+1)
            ])

            setAvailable([
                item,
                ...available
            ])

        } else {

            const i = available.indexOf(item);

            setAvailable([
                ...available.slice(0,i),
                ...available.slice(i+1)
            ])

            setSelected([
                ...selected,
                item
            ])


        }

    }

    useEffect(() => {
        onChange(selected);
    }, [selected])

    return (
        <div style={{ ...styles.MultiSelector, height: stock.length * 56 }}>
            {
                stock.map(
                    item => <Item item={item} selected={selected} available={available} reorder={reorder} toggle={toggle} />
                )
            }
        </div>
    )

}

export default MultiSelector;
