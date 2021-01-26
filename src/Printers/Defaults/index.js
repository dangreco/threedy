const Defaults = {
    'I3': {

        top: {
            width: 350,
            height: 20,
        },
        bottom: {
            width: 350,
            height: 52.3,
        },
        left: {
            width: 40,
            height: 405,
        },
        right: {
            width: 40,
            height: 405,
        },

        buildplate: {
            maxWidth: 235,
            maxHeight: 250,
            verticalOffset: 55,
        },

        xAxis: {
            stepper: true,
            width: 420,
            offsetLeft: -40,
            height: 20,
            extruders: [
                {
                    width: 60, 
                    height: 60
                }
            ]
        }

    },
    'Cantilever': {

    }
};

export default Defaults;