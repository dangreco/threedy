import {HassEntity} from "home-assistant-js-websocket";
import {ThreedyConfig, ThreedyTemperatureUnit} from "../../types";
import * as React from "react";
import Stat from "./Stat";

/**
 * Parses the correct temperature unit from the given Hass Entity
 * @param entity
 */
const temperatureUnitFromEntity = (entity: HassEntity) => {

    switch (entity.attributes.unit_of_measurement) {
        case '°C':
            return ThreedyTemperatureUnit.C;
        case '°F':
            return ThreedyTemperatureUnit.F;
        default:
            return ThreedyTemperatureUnit.C;
    }

}

/**
 * Object containing the functions to convert between temperature systems
 */
const temperatureMap = {
    [ThreedyTemperatureUnit.C]: {
        [ThreedyTemperatureUnit.C]: t => t,
        [ThreedyTemperatureUnit.F]: t => (t * 9.0 / 5.0) + 32.0
    },
    [ThreedyTemperatureUnit.F]: {
        [ThreedyTemperatureUnit.C]: t => (t - 32.0) * 5.0 / 9.0,
        [ThreedyTemperatureUnit.F]: t => t
    },
}

/**
 * Function to call the correct temperature conversion function
 * @param temperature
 * @param from
 * @param to
 */
const convertTemperature = (
    temperature: number,
    from: ThreedyTemperatureUnit,
    to: ThreedyTemperatureUnit
) => {

    if (!temperatureMap[from] || !temperatureMap[from][to]) return -1;

    return temperatureMap[from][to](temperature);
}

/**
 * Retrieves & formats the current temperature of a temperature-related Hass Entity
 * @param temperatureEntity
 * @param config
 */
const temperature = (
    temperatureEntity: HassEntity,
    config: ThreedyConfig
) => {

    const t: number = parseFloat(temperatureEntity.state);
    const u: ThreedyTemperatureUnit = temperatureUnitFromEntity(temperatureEntity);
    const tc: number = convertTemperature(t, u, config.temperature_unit || u);

    return `${
        config.round_temperature ? Math.round(tc) : tc.toFixed(2)
    }°${config.temperature_unit || u}`

}


type TemperatureStatProps = {
    name: string,
    temperatureEntity: HassEntity,
    config: ThreedyConfig
}

const TemperatureStat: React.FC<TemperatureStatProps> = ({name, temperatureEntity, config}) => {


    return (
        <Stat
            name={name}
            value={
                temperature(
                    temperatureEntity,
                    config
                )
            }
        />
    )


};

export default TemperatureStat;
