export enum ThreedyPrinter {
    I3 = "I3",
    Cantilever = "Cantilever"
}

export enum ThreedyTheme {
    Default = "Default",
    Neumorphic = "Neumorphic"
}

export enum ThreedyCondition {
    Status = "Status",
    ETA = "ETA",
    Elapsed = "Elapsed",
    Hotend = "Hotend",
    Bed = "Bed",
    Remaining = "Remaining"

}

export enum ThreedyTemperatureUnit {
    F = "F",
    C = "C"
}

export type ThreedyConfig = {

    type: string,
    base_entity?: string,
    name?: string,
    printer_type?: ThreedyPrinter,
    monitored?: ThreedyCondition[],
    theme?: ThreedyTheme,
    font?: string,
    scale?: number,
    round_temperature?: boolean,
    round_time?: boolean
    temperature_unit?: ThreedyTemperatureUnit,
    use_24hr?: boolean,
    use_mqtt?: boolean,
    light_entity?: string,
    power_entity?: string,
    camera_entity?: string,

}




/**

 From Home Assistant Frontend

 **/

import {
    HassEntities,
} from "home-assistant-js-websocket";

export interface HomeAssistant {
    states: HassEntities;
    [propName: string] : any;
}
