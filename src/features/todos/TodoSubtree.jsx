import styled from '@emotion/styled'
import {css} from '@emotion/react'
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
import { AddTodoForm, } from './AddTodoForm/AddTodoForm'
import { AddTodoFormInlineLayout, } from './AddTodoForm/AddTodoFormInlineLayout'

import {
    MdAddCircleOutline,
    MdAddCircle,
} from "react-icons/md";
import { themeColor } from '../theme/theme'

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
export const TodoSubtree = ({ itmId, onDragTodo, dragGroup }) => {
    let [showingAddTodoForm, setShowingAddTodoForm] = useState(false)
    let todosEntities = useSelector(selectTodoEntities);
    let todoIds = useSelector(selectTodoIds)
    let todoStatus = todosEntities[itmId].status;

    let treeRoots = todoIds.filter(id => todosEntities[itmId].children.includes(id))
    let todoSubtrees = (
        treeRoots.map(
            (childId, index) => {
                return (
                    <div style={{ marginBottom: '10px',/*marginBottom: (index === (treeRoots.length - 1) ? '0' : '10px'),*/ }}>
                        <TodoSubtree
                            itmId={childId}
                            onDragTodo={onDragTodo}
                            dragGroup={dragGroup}
                            key={childId}
                        />
                    </div>
                );
            }
        )
    );
    let addTodoZone = showingAddTodoForm ? (
        <AddTodoForm parentId={itmId} formLayout={(<AddTodoFormInlineLayout/>)}/>
                        ) : (
                            <StyledAddIcon clickHandler={() => { setShowingAddTodoForm(true) }} />
                        );

    let itemParent = todosEntities[itmId].parent;
    return (
        <SortableItem id={itmId} itemParent={itemParent} moveItem={onDragTodo} dragGroup={dragGroup} key={itmId}>
            <Collapsible parentNode={(<TodoItem todoId={itmId} />)} collapsed={true} color={themeColor[todoStatus]}>
                {todoSubtrees}
                <AddTodoForm parentId={itmId} formLayout={<AddTodoFormInlineLayout layoutProps={{color: themeColor[todoStatus]}}/>}/>
            </Collapsible>
        </SortableItem>
    );
};//css={css`margin: 0 -1px -1px 0;`}