import React from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import './marker-list.css';

const MarkerList = ({ markers, onDeleteMarker, onChangeList }) => {

    const el = markers.map(({ id, label }, index) => (
        <Draggable key={id} draggableId={id.toString()} index={index}>
            {(provided) =>
                (<li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="list-group-item"
                >
                    <span>
                        <span>
                            {label}
                        </span>
                        <button type="button"
                                className="btn btn-outline-danger btn-md float-right"
                                onClick={() => onDeleteMarker(id)}
                        >
                            <i className="fa fa-trash-o"/>
                        </button>
                    </span>
                </li>)
            }
        </Draggable>
        )
    );
    return(
        <DragDropContext
            onDragEnd={(res)=>
            {
                if (!res.destination) return;
                const idx = {
                    startId: res.source.index,
                    endId: res.destination.index
                };
                onChangeList(idx);
            }}
        >
            <Droppable droppableId="droppable">
                { (provided) => (
                    <ul
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="list-group marker-list"
                    >
                        {el}
                    </ul>
                    )
                }
            </Droppable>
        </DragDropContext>

    );
}

export default MarkerList;
