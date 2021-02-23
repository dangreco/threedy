const styles = {

    Cantilever: {
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

    ZAxis: {
        top: 0,
        left: 0,
        borderRadius: 8,
        boxSizing: 'border-box',
        backgroundColor: '#777777',
        position: 'absolute'
    },

    Bottom: {
        borderRadius: 8,
        boxSizing: 'border-box',
        backgroundColor: '#777777',
        position: 'absolute'
    },

    XAxis: {
        position: 'absolute',
        borderRadius: 8,
        backgroundColor: '#999999'
    },

    BuildPlate: {
        boxSizing: 'border-box',
        borderRadius: 8,
        position: 'absolute',
        backgroundColor: '#999999',
        height: 8,
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

    Print: {
        backgroundColor: 'var(--primary-text-color)',
        width: '100%'
    },

};

export default styles;