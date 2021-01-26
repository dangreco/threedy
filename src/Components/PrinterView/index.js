import React, { useContext } from 'react';
import ThreedyContext from '../../Contexts/ThreedyContext';
import Cantilever from '../../Printers/Cantilever';
import Defaults from '../../Printers/Defaults';
import I3 from '../../Printers/I3';

import './styles.scss';

const PrinterView = () => {

    const {
        hass,
        config
    } = useContext(ThreedyContext);


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

    return (
        <div class="ThreedyPrinterView">
            <Printer config={config.printer_config || Defaults[config.printer_type]} />
        </div>
    )

}

export default PrinterView;