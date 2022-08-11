import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'


import {
    MdEditNote,
    MdUndo,
} from "react-icons/md";

import { Tooltip } from '../../utility/Tooltip/Tooltip';

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
    color: ${props => props.disabled ? props.color.disabled : props.color.frame};
    :hover {
        color: ${props => props.disabled ? props.color.disabled : props.color.hover};
    };
`

const StyledUndoIcon = styled(MdUndo)`
    width: 40px;
    height: 40px;
    font-weight: 800;
    cursor: pointer;
    color: ${props => props.color.frame};
    :hover {
        color: ${props => props.color.hover};
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

    layoutProps: { color }
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

                <Tooltip msg="Update">    
                    <StyledUpdateIcon
                        onClick={() => {
                            if (canUpdate) {
                                onUpdateTodoClicked(todoId);
                                endEditMode();
                            }
                        }}
                        disabled={!canUpdate}
                        color={color}
                    />
                </Tooltip>
                <Tooltip msg="Undo">  
                    <StyledUndoIcon 
                        onClick={endEditMode}
                        color={color}
                    />
                </Tooltip>
            </div>
        </>
    );
}
