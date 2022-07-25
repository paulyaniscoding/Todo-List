import update from 'immutability-helper'
import React, { 
    useCallback, 
    useEffect,
    useState,
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { MinimalRenderer } from './MinimalRenderer'
import { TodosSublist } from './TodosSublist'
import { TodoItem } from './TodoItem'
import { TodoSubtree } from './TodoSubtree'


import { Sortable } from '../utility/Sortable/Sortable'
import { SortableItem } from '../utility/Sortable/SortableItem'
import { ItemTypes } from '../utility/Sortable/ItemTypes'
import { Collapsible } from '../utility/Collapsible/Collapsible'

import '../../App.css';

import {
    selectAllTodos,
    selectTodoEntities,
    fetchTodos,
    selectTodoIds,
    selectTodoById,

    startTodo,
    pauseTodo,
    endTodo,
} from './todosSlice'

const useTodoIndex = (todoIds) => {
    let [todoIndex, setTodoIndex] = useState(todoIds)
    let todoIndexObj = Object.fromEntries(todoIndex.map((id, index) => [id, index]))
    return [todoIndex, todoIndexObj, setTodoIndex]
}

export const TodosDemo = () => {
    let todosEntities = useSelector(selectTodoEntities);
    let todoIds = useSelector(selectTodoIds)
    let [todoIndex, todoIndexObj, setTodoIndex] = useTodoIndex(todoIds)

    let dragTodoHandler = (dragIndex, hoverIndex,) => {
        console.log(`from ${dragIndex} to ${hoverIndex}`)
        setTodoIndex((prevIndex) =>
            update(prevIndex, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevIndex[dragIndex]],
                ],
            }),
        )
    }
    
    let sortableTree = todoIndex.filter(id => todosEntities['root'].children.includes(id)).map(
        (id) => (
            <TodoSubtree 
                itmId={id}
                todoIndex={todoIndex}
                todoIndexObj={todoIndexObj}
                onDragTodo={dragTodoHandler}
                key={id}
            />
        )
    );

    return (
        <Sortable>
            {/*console.log('todoIndexObj:', todoIndexObj)*/}
            {console.log('todoIndex:', todoIndex)}

            <Collapsible>
            {sortableTree}
            </Collapsible>
        </Sortable>
    )
}