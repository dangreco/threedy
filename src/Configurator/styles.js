const styles = {
    Configurator: {
        padding: 32,
        boxSizing: 'border-box',
        width: '100%',
        background: 'var( --ha-card-background, var(--card-background-color, white) )',

    },
    PrinterSelect: {
        width: '100%'
    },
    Label:  {
        marginBottom: 4,
        fontWeight: 'bold',
        fontSize: 14
    },
    ButtonContainer: {
        padding: '32px 0',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box'
    },
    Root: {
        position: 'relative',
        overflow: 'hidden'
    },
    Advanced: {
        position: 'absolute',
        width: '100%',
        opacity: 0,
        left: '-100%%',
        top: 0,
        zIndex: 999999999,
        height: '100%',
        backgroundColor: 'var( --ha-card-background, var(--card-background-color, white) )',
        overflowY: 'scroll'
    }
};

export default styles;
