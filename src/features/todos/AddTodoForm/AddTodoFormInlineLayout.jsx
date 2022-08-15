import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'


import {
    MdAdd,
} from "react-icons/md";

import { Tooltip } from '../../utility/Tooltip/Tooltip';

import {
    selectAllTodos,
    addTodo,
    selectTodoEntities
} from '../todosSlice'


const FakeBtn = styled.div`
    width: 7px;
    border: none;
    padding: none;
    background-color: ${props => props.color};
    align-self: stretch;
    cursor: default;
`

const FormContent = styled.div`         
    background-color: ${ props => props.color.background };
    display: grid;
    width: auto;
    grid-template-columns: auto max(20vw, 200px); /*66% 34%,*/
    align-self: stretch;
    padding: 0.25rem 0.25rem;
    border: 1px solid ${ props => props.color.frame }; /*rgb(177, 174, 174),*/
    border-left: 0;
    border-radius: 0px;
    cursor: text;
`

const CategoryLayout = styled.div`
    margin: 0 0 5px 0;
`
const TodoTitleInput = styled.textarea`
    width: 100%;
    background-color: transparent;
    outline: none;
    border: none;
    overflow: hidden;
    resize: none;
`
const TodoCategoryInput = styled.input`
    width: min(100%, 150px);
    background-color: transparent;
    border: none;
    outline: none;
`
const StyledAddIcon = styled(MdAdd)`
    width: 40px;
    height: 40px;
    /*font-weight: 800;*/
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
    color: ${props => props.disabled ? props.color.disabled : props.color.frame};
    :hover {
        color: ${props => props.disabled ? props.color.disabled : props.color.hover};
    };
`
const FormContainer = styled.div`  
    display: grid;
    grid-template-columns: 7px 1fr;
    /*gridTemplateRows: fit-content;*/
    gap: 0;
    justify-content: start;
    align-items: start;
    margin: 0 -1px -1px 0;

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
        <FormContainer>
            <FakeBtn color={color.frame}/>
            <FormContent color={color}>
                <div>
                    {!isInlineForm && (
                        <CategoryLayout>
                            <TodoCategoryInput 
                                type="text" 
                                list="todoCategory" 
                                placeholder="Category" 
                                value={category} 
                                onChange={onCategoryChanged} 
                            />
                            <datalist 
                                id="todoCategory"
                            >
                                {todoCategoryOptions}
                            </datalist>
                        </CategoryLayout>
                    )}
                    <TodoTitleInput
                        type="text"
                        placeholder='Add New Todo'
                        value={title}
                        onChange={onTitleChanged}
                    />
                </div>
                <div>
                    <Tooltip msg="Add">
                        <StyledAddIcon
                            onClick={onAddTodoClicked}
                            disabled={!canAdd}
                            color={color}
                        />
                    </Tooltip>
                </div>
            </FormContent>
        </FormContainer>
    );
}
