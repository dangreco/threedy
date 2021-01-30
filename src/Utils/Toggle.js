import {HapticStrength, fireHaptic} from './Haptics';

const toggleEntity = ( hass, entityId ) => {

    // Make sure entity exists
    if ( hass && entityId ) {

        if ( hass.states[entityId] ) {

            fireHaptic(HapticStrength.medium);

            hass.callService('homeassistant', 'toggle', { entity_id: entityId })
            
        }

    }
    
};


export default toggleEntity;