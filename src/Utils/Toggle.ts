import {HapticStrength, fireHaptic} from './Haptics';
import {HomeAssistant} from "../types";

const toggleEntity = ( hass: HomeAssistant, entityId: string ) => {

    // Make sure entity exists
    if ( hass && entityId ) {

        if ( hass.states[entityId] ) {

            fireHaptic();

            hass.callService('homeassistant', 'toggle', { entity_id: entityId })

        }

    }

};


export default toggleEntity;
