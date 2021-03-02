import React from 'react';
import {HomeAssistant, ThreedyConfig} from "../types";

type ThreedyContextType = {
    hass: HomeAssistant;
    config: ThreedyConfig;
}

const ThreedyContext = React.createContext<ThreedyContextType>({
    hass: {},
    config: {}
})

export default ThreedyContext;
