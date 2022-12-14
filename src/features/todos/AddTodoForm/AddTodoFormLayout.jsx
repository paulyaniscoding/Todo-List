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

const FormContainer = styled.div`
    margin-bottom: 20px;
`
const StyledInput = styled.input`
    width: 500px;
    height: 20px;
    color: orange;
    backgound: transparent;
    border: 1px solid gray;
    border-radius: 5px;
    :focus {     
        outline: none;
    }
`

export const AddTodoFormLayout = ({
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
}) => (

    <FormContainer>
        {!isInlineForm && <h2>Add Todo</h2>}
        <form>
            {!isInlineForm && (
                <div>
                    <input type="text" list="todoCategory" placeholder="Category" value={category} onChange={onCategoryChanged} />
                    <datalist id="todoCategory">
                        {todoCategoryOptions}
                    </datalist>
                </div>
            )}

            <div>
                <StyledInput
                    type="text"
                    id="todoTitle"
                    name="todoTitle"
                    value={title}
                    placeholder="Title"
                    onChange={onTitleChanged}
                />

                <button type="button" onClick={onAddTodoClicked} disabled={!canAdd}>
                    Save
                </button>
            </div>
        </form>
    </FormContainer>
);