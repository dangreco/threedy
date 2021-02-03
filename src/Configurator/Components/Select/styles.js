const styles = {

    Select: {
        width: '100%',
        position: 'relative',
        background: 'var( --ha-card-background, var(--card-background-color, white) )'
    },
    SelectButton: {
        width: '100%',
        border: 'none',
        outline: 'none',
        padding: '0 16px',
        boxSizing: 'border-box',
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: '48px',
        borderRadius: 8,
        textAlign: 'left',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.05)',
        alignItems: 'center',
        color: 'var(--primary-text-color)'
    },
    Options: {
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 8,
        overflow: "hidden",
        boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
        zIndex: 999999,
        opacity: 0,
        transform: 'scaleY(0.0)',
        transformOrigin: 'top center'
    },
    Option: {
        width: '100%',
        border: 'none',
        outline: 'none',
        background: 'var( --ha-card-background, var(--card-background-color, white) )',
        padding: '0 16px',
        boxSizing: 'border-box',
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: '48px',
        textAlign: 'left',
        cursor: 'pointer',
        color: 'var(--primary-text-color)'
    }

};

export default styles;