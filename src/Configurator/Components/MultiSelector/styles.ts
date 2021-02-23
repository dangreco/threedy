const styles = {
    MultiSelector: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        position: 'relative'
    },

    Item: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    SelectorButton: {
        boxSizing: 'border-box',
        width: 24,
        height: 24,
        borderRadius: 8,
        backgroundColor: 'rgba(0,0,0,0.1)',
        outline: 'none',
        border: 'none',
        marginRight: 16,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'var(--primary-text-color)',
        cursor: 'pointer'
    },

    PositionButton: {
        boxSizing: 'border-box',
        width: 24,
        height: 24,
        borderRadius: 8,
        backgroundColor: 'transparent',
        outline: 'none',
        border: 'none',
        marginLeft: 16,
        color: 'var(--primary-text-color)',
        cursor: 'pointer'
    },

    ItemText: {
        flexGrow: 1,
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: '24px'
    },

    DeselectedText: {
        textDecoration: 'line-through',
        fontStyle: 'oblique',
        color: "#777777"
    }

};

export default styles;