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
import { AddtodoForm } from './AddTodoForm'

// TodoEntities 要加 children field
export const TodoSubtree = ({ itmId, onDragTodo }) => {
    let todosEntities = useSelector(selectTodoEntities);
    let todoIds = useSelector(selectTodoIds)

    let subtree = '';
    if (true){//(todosEntities[itmId]?.children) {
        subtree = (
            <Collapsible>
                {todoIds.filter(id => todosEntities[itmId].children.includes(id) ).map(
                    (childId) => (
                        <TodoSubtree
                            itmId={childId}
                            onDragTodo={onDragTodo}
                            key={childId}
                        />
                    )
                )}
                <AddtodoForm parentId={itmId}/>
            </Collapsible>
        )
    };

    let itemParent = todosEntities[itmId].parent
    return (
        <SortableItem id={itmId} itemParent={itemParent} moveItem={onDragTodo} key={itmId}>
            <TodoItem todoId={itmId} />
            {subtree}
        </SortableItem>
    );
};