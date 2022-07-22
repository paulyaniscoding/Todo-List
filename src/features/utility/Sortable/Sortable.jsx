import update from 'immutability-helper'
import { useCallback, useState } from 'react'
import { useRef } from 'react'
import {
    DndProvider,
    useDrag,
    useDrop
} from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Collapsible } from '../Collapsible/Collapsible'

const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
}

const ItemTypes = {
    TODO: 'todo',
}

export const todoData = {
    ids: [
        'root',
        '1',
        '2',
        '3',
        '4',
        '5',
    ],
    entities: {
        'root': {
            children: ['1', '2', '3', '4', '5'],
        },
        '1': {
            id: '1',
            title: 'title1',
            category: 'category1',
            status: 'notStarted',

            //children: ['11', '12', '13', '14', '15'],
        },
        '2': {
            id: '2',
            title: 'title2',
            category: 'category2',
            status: 'current',
        },
        '3': {
            id: '3',
            title: 'title3',
            category: 'category3',
            status: 'paused',
        },
        '4': {
            id: '4',
            title: 'title4',
            category: 'category4',
            status: 'finished',
        },
        '5': {
            id: '5',
            title: 'title5',
            category: 'category5',
            status: 'finished',
        },
        /*'11': {
            id: '11',
            title: 'title11',
            category: 'category11',
            status: 'notStarted',
        },
        '12': {
            id: '12',
            title: 'title12',
            category: 'category12',
            status: 'current',
        },
        '13': {
            id: '13',
            title: 'title13',
            category: 'category13',
            status: 'paused',
        },
        '14': {
            id: '14',
            title: 'title14',
            category: 'category14',
            status: 'finished',
        },
        '15': {
            id: '15',
            title: 'title15',
            category: 'category15',
            status: 'finished',
        },*/
    }
}

export const TodoItem = ({ todo }) => {
    return (
        <div style={{ border: '1px solid blue' }} className="todo-item" key={todo.id}>
            <div className='todo-id'>{todo.id}</div>
            <div className='todo-category'>{todo.category}</div>
            <div className='todo-title'>{todo.title}</div>
            <div className='todo-status'>{todo.status}</div>
        </div>
    )
}

export const SortableItem = ({ id, index, moveItem, children }) => {
    const ref = useRef(null)
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.TODO,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
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
            item.index = hoverIndex
        },
    })
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.TODO,
        item: () => {
            return { id, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0 : 1
    drag(drop(ref))
    return (
        <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
            {children}
        </div>
    )
}

export const Sortable = (props) => {

    return (
        <DndProvider backend={HTML5Backend}>
            {props.children}
        </DndProvider>
    );
}

export const TodoDemo = () => {
    const todolist = Object.entries(todoData.entities).map(([key, todo]) => (todo));
    let [todos, setTodos] = useState(todolist);
    let [reduxTodos, setReduxTodos] = useState(todoData);

    const moveItem = useCallback((dragIndex, hoverIndex) => {
        setTodos((prevTodos) =>
            update(prevTodos, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevTodos[dragIndex]],
                ],
            }),
        )
    }, []);

    const moveItemE = useCallback((dragIndex, hoverIndex) => {
        setReduxTodos((prevTodos) =>
            update(prevTodos.ids, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevTodos.ids[dragIndex]],
                ],
            }),
        )
    }, []);

    const getSubtree = (itmEntities, itm, index) => {
        let subtree = '';
        if (itm.children) {
            subtree = (
                <Collapsible key={itm.id}>
                    {itm.children.map(
                        (childId, childIndex) => 
                            getSubtree(itmEntities, itmEntities[childId], childIndex)
                    )}
                </Collapsible>
            )
        };
        return (
            <SortableItem id={itm.id} index={index} moveItem={moveItemE} key={itm.id}>
                <TodoItem todo={itm} key={itm.id} />
                {/*subtree*/}
            </SortableItem>
        );
    };
    let sortableTree = reduxTodos.entities['root'].children.map(
        (id, index) => 
            getSubtree(reduxTodos.entities, reduxTodos.entities[id], index)
    );

    let sortablelist = todos.map((itm, index) => {
        return (
            <SortableItem id={itm.id} index={index} moveItem={moveItem} key={itm.id}>
                <TodoItem todo={itm} key={itm.id} />
            </SortableItem>
        );
    })

    return (
        <Sortable>
            {sortableTree}
            {/*sortablelist*/}
        </Sortable>
    )
}