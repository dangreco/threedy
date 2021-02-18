import React, {useEffect, useRef} from 'react';
import ReactPlayer from 'react-player'

import { motion } from 'framer-motion';

import styles from './styles'
import useDimensions from "react-cool-dimensions";


const Camera = ({ visible, toggleVideo, cameraEntity }) => {

    const { ref, width, height, entry, unobserve, observe } = useDimensions();

    const wrapper = useRef();

    const isMJPG = !!cameraEntity && !!cameraEntity.attributes.access_token;

    useEffect(() => {

        if (!wrapper.current) return

        wrapper.current.addEventListener("click", toggleVideo);

        return () => wrapper.current.removeEventListener("click", toggleVideo);

    }, [ref]);

    return (
        <motion.div
            animate={{
                scale: visible ? 1.0 : 0.0,
                opacity: visible ? 1.0 : 0.0
            }}
            transition={{
                duration: 0.15,
                ease: 'easeInOut'
            }}
            ref={ref}
            style={{ ...styles.CameraRoot }}
        >
            <div
                style={{
                    ...styles.Wrapper,
                    background:
                        isMJPG && !!cameraEntity ?
                            `url('${cameraEntity.test ?
                                cameraEntity.testUrl : `${window.location.origin}/api/camera_proxy_stream/${cameraEntity.entity_id}?token=${cameraEntity.attributes.access_token}`}')`

                            : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
                ref={wrapper}
            >
                {

                    /* TODO: Implement M3U8 Streams. Though, needed? */
                    !isMJPG ? (
                        <ReactPlayer
                            width={width}
                            height={height}
                            url={undefined}
                            muted
                            playing
                            config={{
                                file: {
                                    attributes: {
                                        style: {
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        },
                                    },
                                },
                            }}

                        >
                        </ReactPlayer>
                    ) : (null)

                }

            </div>
        </motion.div>
    )

};

export default Camera;
