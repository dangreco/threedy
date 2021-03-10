import React, { useContext, useRef, useEffect } from 'react';
import ThreedyContext from '../../Contexts/ThreedyContext';
import Cantilever from '../../Printers/Cantilever';
import Defaults from '../../Printers/Defaults';
import I3 from '../../Printers/I3';

import styles from './styles';

const PrinterView = ({ toggleVideo, hasCamera, style }) => {

    const {
        hass,
        config
    } = useContext(ThreedyContext);

    const ref = useRef();

    const getPrinterType = () => {

        switch (config.printer_type) {
            case 'I3':
                return I3
            case 'Cantilever':
                return Cantilever
            default:
                return I3
        }

    }

    let Printer = getPrinterType();

    useEffect(() => {

        if (!ref.current) return

        ref.current.addEventListener("click", toggleVideo);

        return () => ref.current.removeEventListener("click", toggleVideo);

    }, [ref])

    return (
        <div
            ref={ref}
            style={{
                ...styles.PrinterView,
                ...style,
                cursor: hasCamera ? 'pointer' : 'default'
            }}
        >
            <Printer printerConfig={config.printer_config || Defaults[config.printer_type]} />
        </div>
    )

}

export default PrinterView;
