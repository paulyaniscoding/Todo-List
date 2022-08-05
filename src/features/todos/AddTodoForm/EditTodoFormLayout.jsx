import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'


import {
    MdEditNote,
    MdUndo,
} from "react-icons/md";

import {
    selectAllTodos,
    selectTodoEntities,
    fetchTodos,
    selectTodoIds,
    selectTodoById,

    startTodo,
    pauseTodo,
    endTodo,
} from '../todosSlice'
import { useEffect } from 'react';

const StyledUpdateIcon = styled(MdEditNote)`
    width: 40px;
    height: 40px;
    font-weight: 800;
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
    color: ${props => props.disabled ? '#c0c0c0' : 'gray'};
    :hover {
        color: ${props => props.disabled ? 'c0c0c0' : 'pink'};
    };
`

const StyledUndoIcon = styled(MdUndo)`
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
    formProps: {
        isInlineForm,
        todoCategoryOptions,
        category,
        onCategoryChanged,
        title,
        onTitleChanged,
        canUpdate,
        onUpdateTodoClicked,
    },
    
    editProps: {
        todoId,
        endEditMode,
    },
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
            <div>

                <StyledUpdateIcon
                    onClick={() => {
                        if (canUpdate) {
                            onUpdateTodoClicked(todoId);
                            endEditMode();
                        }
                    }}
                    disabled={!canUpdate}
                />
                <StyledUndoIcon onClick={endEditMode}/>
            </div>
        </>
    );
}
