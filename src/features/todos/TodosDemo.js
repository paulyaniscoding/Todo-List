import update from 'immutability-helper'
import React, { 
    useCallback, 
    useEffect,
    useState,
} from 'react'
import { useSelector, useDispatch } from 'react-redux'


import { Sortable } from '../utility/Sortable/Sortable'
import { TodoSubtree } from './TodoSubtree'
import { 
    AddTodoForm, 
} from './AddTodoForm/AddTodoForm'

import {
    AddTodoFormInlineLayout,
} from './AddTodoForm/AddTodoFormInlineLayout'

import {
    AddTodoFormLayout,
} from './AddTodoForm/AddTodoFormLayout'

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
    
    // TODO: Category Sorting Output 要改, 一Category 上只可有一h2
    let treeRoots = todoIds.filter(id => todosEntities['root'].children.includes(id))
    let todoSubtrees = treeRoots.map(
        (id, index) => {
            let category = todosEntities[id].category;
            return (
                <>
                    <h2>{category}</h2>
                    <div style={{ marginBottom: '10px',/*marginBottom: (index === (treeRoots.length - 1) ? '0' : '10px'),*/ }}>
                        <TodoSubtree
                            itmId={id}
                            onDragTodo={dragTodoHandler}
                            key={id}
                        />
                    </div>
                </>
            );
        }
    );

    return (
        <>
            <AddTodoForm parentId={'root'} formLayout={<AddTodoFormInlineLayout/>}/>
            <Sortable>
                {todoSubtrees}
            </Sortable>
        </>
    )
}