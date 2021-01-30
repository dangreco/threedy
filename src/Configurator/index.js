import React from 'react';

import styles from './styles';

const Configurator = ({ config }) => {

    return (
        <div>
            <p>Config: </p>
            <p>{
                JSON.stringify(config)
            }
            </p>
        </div>
    )

}

export default Configurator;
