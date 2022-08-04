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
    color: gray;
    :hover {
        color: ${props => props.disabled ? 'gray' : 'pink'};
    };
`

export const AddTodoFormInlineLayout = ({
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
        <div style={{
            display: 'grid',
            gridTemplateColumns: '7px 1fr',
            //gridTemplateRows: 'fit-content',
            gap: '0',
            justifyContent: 'start',
            alignItems: 'start',
            margin: '0 -1px -1px 0'
        }}>
            <div style={{
                width: '7px',
                border: 'none',
                padding: 'none',
                backgroundColor: 'gray',
                alignSelf: 'stretch',
                cursor: 'default',
            }} />
            <div style={{
                display: 'grid',
                width: 'auto',
                display: 'grid',
                gridTemplateColumns: 'auto 40vw max-content',
                alignSelf: 'stretch',
                padding: '0.25rem 0.25rem',
                border: '1px solid gray', /*rgb(177, 174, 174)',*/
                borderLeft: '0',
                borderRadius: '0px',
                cursor: 'text',
            }}>
                <div>
                    {!isInlineForm && (
                        <div>
                            <input type="text" list="todoCategory" placeholder="Category" value={category} onChange={onCategoryChanged} />
                            <datalist id="todoCategory">
                                {todoCategoryOptions}
                            </datalist>
                        </div>
                    )}
                    <textarea
                        type="text"
                        placeholder='Add New Todo'
                        value={title}
                        onChange={onTitleChanged}
                        style={{
                            cols: '10',
                            //rows: '3',
                            backgroundColor: 'transparent',
                            outline: 'none',
                            border: 'none',
                            //height: 'fit-content',
                            overflow: 'hidden',
                            resize: 'none',
                        }}
                    />
                </div>
                <div />
                <StyledAddIcon onClick={onSaveTodoClicked} disabled={!canSave} />
                {`cansave?: ${canSave}`}
            </div>
        </div>
    );
}
