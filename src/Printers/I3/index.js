import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import ThreedyContext from '../../Contexts/ThreedyContext';
import Extruder from '../Extruder';
import './styles.scss';

const I3 = ({ config }) => {

    const context = useContext(ThreedyContext);
    const ha_config = context.config;
    const hass = context.hass;

    const progress = hass.states[`${ha_config.base_entity}_job_percentage`].state / 100;
    console.log(progress)

    const boxRef = useRef();

    const [offset, setOffset] = useState({ width: 0, height: 0 })

    const H = config.top.height + config.bottom.height + config.left.height;

    const FRAME_WIDTH = config.top.width;
    const FRAME_HEIGHT = H;

    const HOLE_WIDTH = config.top.width - (config.left.width + config.right.width);
    const HOLE_HEIGHT = config.left.height;

    useLayoutEffect(() => {
        if (boxRef.current)
            setOffset({
                width: boxRef.current.offsetWidth,
                height: boxRef.current.offsetHeight
            })
    }, []);

    const scaleFactor = offset.height / H;

    const BASE_Y = config.top.height + (HOLE_HEIGHT - config.buildplate.verticalOffset)
    const X_START = BASE_Y + (config.xAxis.extruders[0].height - config.xAxis.height) / 2 - (config.xAxis.extruders[0].height + 12);

    return (
        <div className="I3" ref={boxRef}>

            <div className="Scalable" 
                style={{ 
                    transform: `scale(${scaleFactor * ha_config.scale})`, 
                    marginLeft: (offset.width - (scaleFactor * ha_config.scale * FRAME_WIDTH)) / 2,
                    marginTop: (offset.height - (scaleFactor * ha_config.scale * FRAME_HEIGHT)) / 2
                }}
                >
                <div className="Frame"
                    style={{
                        width: FRAME_WIDTH,
                        height: FRAME_HEIGHT
                    }}
                >
                    <div className="Hole"
                        style={{
                            width: HOLE_WIDTH,
                            height: HOLE_HEIGHT,
                            left: config.left.width,
                            top: config.top.height
                        }}
                    >

                    </div>
                </div>

                <div className="Build"
                    style={{
                        width: config.buildplate.maxWidth,
                        height: config.buildplate.maxHeight,
                        top: BASE_Y - config.buildplate.maxHeight,
                        left: config.left.width + (HOLE_WIDTH - config.buildplate.maxWidth) / 2
                    }}
                >
                    <div className="Print"
                        style={{
                            height: `${progress * 100}%`
                        }}
                    ></div>
                </div>

                <div className="BuildPlate"
                    style={{
                        width: config.buildplate.maxWidth,
                        top: BASE_Y,
                        left: config.left.width + (HOLE_WIDTH - config.buildplate.maxWidth) / 2
                    }}
                >

                </div>

                <div className="XAxis"
                    style={{
                        width: config.xAxis.width,
                        height: config.xAxis.height,
                        left: config.xAxis.offsetLeft,
                        top: X_START - progress * (config.buildplate.maxHeight)
                    }}
                >
                    <div className="Track"
                        style={{
                            width: config.xAxis.width,
                            height: config.xAxis.height,
                        }}
                    >
                        {
                            config.xAxis.extruders.map(extruder => (
                                <Extruder config={config} extruder={extruder} />
                            ))
                        }
                    </div>
                </div>

            </div>
        </div>
    )

}

export default I3;