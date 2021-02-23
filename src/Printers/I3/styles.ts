const styles = {

    I3: {
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    Scalable: {
        position: 'relative'
    },

    Frame: {
        top: 0,
        left: 0,
        borderRadius: 8,
        backgroundColor: '#777777',
        position: 'absolute'
    },

    Hole: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'var( --ha-card-background, var(--card-background-color, white) )',
        borderRadius: 8
    },

    BuildArea: {
        backgroundColor: "rgba(0,0,0,0.075)",
        boxSizing: 'border-box',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 8,
        overflow: 'hidden'
    },

    BuildPlate: {
        boxSizing: 'border-box',
        borderRadius: 8,
        position: 'absolute',
        backgroundColor: '#999999',
        height: 8,
    },

    XAxis: {
        position: 'absolute',
        borderRadius: 8,
        backgroundColor: '#999999'
    },

    Print: {
        backgroundColor: 'var(--primary-text-color)',
        width: '100%'
    },

    Stepper: {
        backgroundColor: '#aaaaaa',
        width: 40,
        height: 40,
        borderRadius: 8
    },

    Track: {
        position: 'relative'
    },
    Gantry: {
        backgroundColor: "#cccccc",
        borderRadius: 4,
        boxSizing: 'border-box',
        position: 'absolute'
    },
    Nozzle: {
        backgroundColor: '#aaaaaa',
        position: 'absolute',
        width: 12,
        height: 12,
        clipPath: 'polygon(100% 0, 100% 50%, 50% 75%, 0 50%, 0 0)'
    }

}

export default styles;