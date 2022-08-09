import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    useDrag,
    useDrop
} from 'react-dnd'
import styled from '@emotion/styled'

import { ItemTypes } from './ItemTypes'

import {
    selectAllTodos,
    selectTodoEntities,
    fetchTodos,
    selectTodoIds,
    selectTodoById,

    startTodo,
    pauseTodo,
    endTodo,
} from '../../todos/todosSlice'

const style = {
    //border: '1px dashed gray',
    //padding: '0 0px 0px 40px',//'0.5rem 1rem',
    //marginBottom: '.5rem',
    cursor: 'move',
    //margin: '0 -1px -1px 0',
}

export const SortableItem = ({ id, itemParent, moveItem, dragGroup, children }) => {
    const ref = useRef(null)
    let todosEntities = useSelector(selectTodoEntities);
    let todoIds = useSelector(selectTodoIds);
    let priority = todosEntities[id].priority;

    const [{ isOver, handlerId }, drop] = useDrop({
        accept: `${ItemTypes.TODO}-~-~${dragGroup}-~-~${itemParent}`,
        collect(monitor) {
            return {
                isOver: monitor.isOver(),
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.priority
            const hoverIndex = priority
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            moveItem(dragIndex, hoverIndex)
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.priority = hoverIndex
        },
    })
    const [{ isDragging }, drag] = useDrag({
        type: `${ItemTypes.TODO}-~-~${dragGroup}-~-~${itemParent}`, //`${ItemTypes.TODO}-${itemParent}`,
        item: () => {
            return { id, priority }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0 : 1
    // const SortableDiv = styled.div`
    //     border: 1px dashed gray;
    //     padding: 0.5rem 1rem;
    //     marginBottom: .5rem;
    //     backgroundColor: white;
    //     cursor: move;
    //     opacity: ${opacity};
    // `

    drag(drop(ref))
    return (
        <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
            {children}
        </div>
    )
}