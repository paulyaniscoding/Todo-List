import styled from '@emotion/styled'
import React, {
    useState,
} from 'react'
import { useSelector, } from 'react-redux'
import { TodoItem } from './TodoItem'

import { SortableItem } from '../utility/Sortable/SortableItem'
import { Collapsible } from '../utility/Collapsible/Collapsible'

import {
    selectTodoEntities,
    selectTodoIds,
} from './todosSlice'
import { AddTodoForm, } from './AddTodoForm/AddTodoForm'
import { AddTodoFormInlineLayout, } from './AddTodoForm/AddTodoFormInlineLayout'

import {
    MdAddCircleOutline,
    MdAddCircle,
} from "react-icons/md";
import { themeColor } from '../theme/theme'


const TodoSubtreeLayout = styled.div`
    margin-bottom: 10px;
`;
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

export const TodoSubtree = ({ itmId, onDragTodo, dragGroup }) => {
    let todosEntities = useSelector(selectTodoEntities);
    let todoIds = useSelector(selectTodoIds)
    let todoStatus = todosEntities[itmId].status;

    let treeRoots = todoIds.filter(id => todosEntities[itmId].children.includes(id))
    let todoSubtrees = (
        treeRoots.map(
            (childId, index) => {
                return (
                    <TodoSubtreeLayout>
                        <TodoSubtree
                            itmId={childId}
                            onDragTodo={onDragTodo}
                            dragGroup={dragGroup}
                            key={childId}
                        />
                    </TodoSubtreeLayout>
                );
            }
        )
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
};