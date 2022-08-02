import styled from '@emotion/styled'
import React, {
    useCallback,
    useEffect,
    useState,
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TodoItem } from './TodoItem'

import { Sortable } from '../utility/Sortable/Sortable'
import { SortableItem } from '../utility/Sortable/SortableItem'
import { ItemTypes } from '../utility/Sortable/ItemTypes'
import { Collapsible } from '../utility/Collapsible/Collapsible'

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
} from './todosSlice'
import { AddtodoForm } from './AddTodoForm'

import {
    MdAddCircleOutline,
    MdAddCircle,
} from "react-icons/md";

const StyledNonHoveringAddIcon = styled(MdAddCircleOutline)`
    width: 40px;
    height: 40px;
    cursor: pointer;
    color: gray;
`;

const StyledHoveringAddIcon = styled(MdAddCircle)`
    width: 40px;
    height: 40px;
    cursor: pointer;
    color: pink;
`;

const StyledAddIcon = ({ clickHandler }) => {

    let [isHoveringAdd, setHoverAdd] = useState(false)
    return (
        isHoveringAdd ? (
            <StyledHoveringAddIcon
                onClick={clickHandler}
                onMouseOver={() => { setHoverAdd(true) }}
                onMouseOut={() => { setHoverAdd(false) }}
            />
        ) : (
            <StyledNonHoveringAddIcon
                onClick={clickHandler}
                onMouseOver={() => { setHoverAdd(true) }}
                onMouseOut={() => { setHoverAdd(false) }}
            />
        )
    );
}

// TodoEntities 要加 children field
export const TodoSubtree = ({ itmId, onDragTodo }) => {
    let [showingAddTodoForm, setShowingAddTodoForm] = useState(false)
    let todosEntities = useSelector(selectTodoEntities);
    let todoIds = useSelector(selectTodoIds)

    let todoSubtrees = (
        todoIds.filter(id => todosEntities[itmId].children.includes(id)).map(
            (childId) => (
                <TodoSubtree
                    itmId={childId}
                    onDragTodo={onDragTodo}
                    key={childId}
                />
            )
        )
    );
    let addTodoZone = showingAddTodoForm ? (
                            <AddtodoForm parentId={itmId} />
                        ) : (
                            <StyledAddIcon clickHandler={() => { setShowingAddTodoForm(true) }} />
                        );

    let itemParent = todosEntities[itmId].parent
    return (
        <SortableItem id={itmId} itemParent={itemParent} moveItem={onDragTodo} key={itmId}>
            <Collapsible parentNode={(<TodoItem todoId={itmId} />)} collapsed={true}>
                {todoSubtrees}
                {addTodoZone}
            </Collapsible>
        </SortableItem>
    );
};