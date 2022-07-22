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

import { Sortable, SortableItem } from '../utility/Sortable/Sortable'
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







// TodoEntities 要加 children field
const TodoSubtree = ({itmId, todoIndexObj, onDragTodo}) => {
    let todosEntities = useSelector(selectTodoEntities);

    // 要改
    const moveItem = onDragTodo//useCallback(onDragTodo)
    //const moveItem = useCallback((dragIndex, hoverIndex, ) => {
    //    setTodos((prevTodos) =>
    //        update(prevTodos, {
    //            $splice: [
    //                [dragIndex, 1],
    //                [hoverIndex, 0, prevTodos[dragIndex]],
    //            ],
    //        }),
    //    )
    //}, []);


    let subtree = '';
    if (todosEntities[itmId]?.children) {
        subtree = (
            <Collapsible>
                {todosEntities[itmId].children.map(
                    (childId) => (
                        <TodoSubtree
                            itmId={childId}
                            todoIndexObj={todoIndexObj}
                            onDragTodo={onDragTodo}
                            key={childId}
                        />
                    )
                )}
            </Collapsible>
        )
    };
    return (
        <SortableItem id={itmId} index={todoIndexObj[itmId]} moveItem={moveItem} key={itmId}>
            <TodoItem todoId={itmId} />
            {subtree}
            {/** 
            
            
            */}
        </SortableItem>
    );
};





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
                todoIndexObj={todoIndexObj}
                onDragTodo={dragTodoHandler}
                key={id}
            />
        )
    );

    return (
        <Sortable>
            {sortableTree}
        </Sortable>
    )
}