import update from 'immutability-helper'
import React, { 
    useCallback, 
    useEffect,
    useState,
} from 'react'
import { useSelector, useDispatch } from 'react-redux'


import { Sortable } from '../utility/Sortable/Sortable'
import { TodoSubtree } from './TodoSubtree'

//import '../../App.css';

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
    
    let treeRoots = todoIds.filter(id => todosEntities['root'].children.includes(id))
    let todoSubtrees = treeRoots.map(
        (id, index) => {
            //
            return (
                <div style={{ marginBottom: '10px',/*marginBottom: (index === (treeRoots.length - 1) ? '0' : '10px'),*/ }}>
                    <TodoSubtree
                        itmId={id}
                        onDragTodo={dragTodoHandler}
                        key={id}
                        
                    />
                </div>
            );
        }
    );

    return (
        <>
            <Sortable>
                {todoSubtrees}
            </Sortable>
        </>
    )
}