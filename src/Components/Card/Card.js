import React, {useContext} from 'react';
import ThreedyContext from '../../Contexts/ThreedyContext';
import PrinterView from '../PrinterView';
import Stats from '../Stats';

import './styles.scss';

const Card = ({}) => {

    const {
        config
    } = useContext(ThreedyContext);
    
    const theme = config.theme;

    return (
        <div className={`ThreedyCard ${theme || "Default"}Card`}>
            <div className="ThreedySection">
                <PrinterView />
            </div>
            <div className="ThreedySection">
                <Stats />
            </div>
        </div>
    )

}

export default Card;