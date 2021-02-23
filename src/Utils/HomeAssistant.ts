import {HomeAssistant} from "../types";
import {HassEntity} from "home-assistant-js-websocket";


const getEntity = (
    hass: HomeAssistant | undefined,
    entityId: string
) : HassEntity | undefined => {

    if (!hass || !hass.states || !hass.states[entityId]) return undefined;

    return hass.states[entityId];

}


export {
    getEntity
}
