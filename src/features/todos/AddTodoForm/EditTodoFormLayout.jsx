import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'


import {
    MdAdd,
} from "react-icons/md";

import {
    selectAllTodos,
    addTodo,
    selectTodoEntities
} from '../todosSlice'


const StyledAddIcon = styled(MdAdd)`
    width: 40px;
    height: 40px;
    font-weight: 800;
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
    color: ${props => props.disabled ? '#c0c0c0' : 'gray'};
    :hover {
        color: ${props => props.disabled ? 'c0c0c0' : 'pink'};
    };
`

export const EditTodoFormLayout = ({
    isInlineForm,
    todoCategoryOptions,
    category,
    onCategoryChanged,
    title,
    onTitleChanged,
    canSave,
    onSaveTodoClicked,
}) => {
    return (
        <>
            <div>
                <textarea
                    type="text"
                    placeholder='Add New Todo'
                    value={title}
                    onChange={onTitleChanged}
                    style={{
                        width: '100%',
                        //cols: '10',
                        //rows: '3',
                        backgroundColor: 'transparent',
                        outline: 'none',
                        border: 'none',
                        //height: 'fit-content',
                        overflow: 'hidden',
                        resize: 'none',
                        cursor: 'text',
                    }}
                />
            </div>
            <StyledAddIcon onClick={onSaveTodoClicked} disabled={!canSave} />
        </>
    );
}
