const styles = {
    Stats: {
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
        
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Percent: {
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    PercentText: {
        margin: 0,
        fontSize: 42,
        fontWeight: 'bold',
        height: '44px',
        lineHeight: '44px'
    },
    Monitored: {    
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Stat: {
        boxSizing: 'border-box',
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '2px 0'
    },
    StatText: {
        margin: 0,
        fontSize: 16,
        display: 'inline-block'
    },
    Condition: {
        fontWeight: 'bold'
    }
}

export default styles;