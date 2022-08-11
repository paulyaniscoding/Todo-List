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
    color: ${props => props.disabled ? props.color.disabled : props.color.frame};
    :hover {
        color: ${props => props.disabled ? props.color.disabled : props.color.hover};
    };
`

export const AddTodoFormInlineLayout = ({
    formProps: {
        isInlineForm,
        todoCategoryOptions,
        category,
        onCategoryChanged,
        title,
        onTitleChanged,
        canAdd,
        onAddTodoClicked,
    },
    layoutProps: { color }
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
                backgroundColor: color.frame,
                alignSelf: 'stretch',
                cursor: 'default',
            }} />
            <div style={{
                backgroundColor: color.background,
                display: 'grid',
                width: 'auto',
                gridTemplateColumns: 'auto max(20vw, 200px)', //'66% 34%',
                alignSelf: 'stretch',
                padding: '0.25rem 0.25rem',
                border: `1px solid ${color.frame}`, /*rgb(177, 174, 174)',*/
                borderLeft: '0',
                borderRadius: '0px',
                cursor: 'text',
            }}>
                <div>
                    {!isInlineForm && (
                        <div style={{
                            margin: '0 0 5px 0',
                        }}>
                            <input 
                                type="text" 
                                list="todoCategory" 
                                placeholder="Category" 
                                value={category} 
                                onChange={onCategoryChanged} 
                                style={{
                                    width: 'min(100%, 150px)',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    outline: 'none',
                                }}
                            />
                            <datalist 
                                id="todoCategory"
                            >
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
                            width: '100%',
                            //cols: '10',
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
                <StyledAddIcon 
                    onClick={onAddTodoClicked} 
                    disabled={!canAdd} 
                    color={color}                    
                />
            </div>
        </div>
    );
}
