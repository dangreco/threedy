import React from 'react';
import ThreedyContext from '../../Contexts/ThreedyContext';
import Card from '../Card';

const ThreedyWrapper = ({ hass, config }) => {

    return (
        <ThreedyContext.Provider value={{hass: hass, config: config}}>
            <Card>

            </Card>
        </ThreedyContext.Provider>
    )

}

export default ThreedyWrapper;