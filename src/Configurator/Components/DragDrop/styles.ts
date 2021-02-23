
const styles = {

    DragDrop: {
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        background: 'var( --ha-card-background, var(--card-background-color, white) )'
    },

    Column: {
        width: 'calc(50% - 16px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 8,
        padding: '8px 16px',
        backgroundColor: 'rgba(0,0,0,0.05)',
        boxSizing: 'border-box',
    },
    
    ColumnText: {
        margin: 0,
        fontWeight: 'bold',
        fontSize: 14,
        width: '100%',
        textAlign: 'center'
    },

    DragDropArea: {
        width: '100%',
        boxSizing: 'border-box',
        minHeight: 100,
    },

    Item: {
        margin: '8px 0', 
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 8,
        boxSizing: 'border-box',
        color: 'var(--primary-text-color)',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: '42px'
    }

};

export default styles;