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
    changePriority,
} from './todosSlice'

export const TodosDemo = () => {
    let todosEntities = useSelector(selectTodoEntities);
    let todoIds = useSelector(selectTodoIds)
    let dispatch = useDispatch();

    let dragTodoHandler = (dragIndex, hoverIndex) => {
        dispatch(changePriority([dragIndex, hoverIndex]))
    }
    
    let sortableTree = todoIds.filter(id => todosEntities['root'].children.includes(id)).map(
        (id) => (
            <TodoSubtree 
                itmId={id}
                onDragTodo={dragTodoHandler}
                key={id}
            />
        )
    );

    return (
        <Sortable>
            <Collapsible>
                {sortableTree}
            </Collapsible>
        </Sortable>
    )
}