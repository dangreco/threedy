import React, { useState } from 'react';
import styles from './styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    return {
        sourceClone,
        destClone
    };

};


const DragDrop = ({ items }) => {

    const [inUse, setInUse] = useState([]);
    const [available, setAvailable] = useState([
        'Status',
        'ETA',
        'Elapsed',
        'Hotend',
        'Bed'
    ])

    const getList = (droppableId) => {

        const isInUse = droppableId === 'inuse';

        return {
            list: isInUse ? inUse : available,
            setList: isInUse ? setInUse : setAvailable 
        }
    }

    const onDragEnd = ({ source, destination }) => {


        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {

            const {list, setList} = getList(source.droppableId)
            
            items = reorder(
                list,
                source.index,
                destination.index
            );

            setList(items)
            
        } else {

            const { 
                list: sourceList, 
                setList: setSourceList 
            } = getList(source.droppableId);

            const { 
                list: destList, 
                setList: setDestList 
            } = getList(destination.droppableId);

            const {
                sourceClone,
                destClone
            } = move(
                sourceList,
                destList,
                source,
                destination
            );

            setSourceList(sourceClone);
            setDestList(destClone);
        }
    };

    return (
        <div style={{ ...styles.DragDrop }}>


            <DragDropContext onDragEnd={onDragEnd}>

                <div style={{ ...styles.Column }}>
                    <p style={{ ...styles.ColumnText }}>In Use</p>
                    <Droppable droppableId="inuse">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={{ ...styles.DragDropArea }}>
                                {inUse.map((item, index) => (
                                    <Draggable
                                        key={item}
                                        draggableId={item}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                    width: snapshot.isDragging ? 'auto' : '100%',
                                                    ...provided.draggableProps.style,
                                                    ...styles.Item
                                                }}
                                            >
                                                {item}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>

                <div style={{ ...styles.Column }}>
                    <p style={{ ...styles.ColumnText }}>Available</p>
                    <Droppable droppableId="available">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={{ ...styles.DragDropArea }}>
                                {available.map((item, index) => (
                                    <Draggable
                                        key={item}
                                        draggableId={item}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                    width: snapshot.isDragging ? 'auto' : '100%',
                                                    ...provided.draggableProps.style,
                                                    ...styles.Item
                                                }}
                                            >
                                                {item}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>



            </DragDropContext>




        </div >
    )

};

export default DragDrop;