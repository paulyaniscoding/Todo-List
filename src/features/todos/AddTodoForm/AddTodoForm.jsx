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



export const AddTodoForm = ({ parentId, formLayout }) => {
    // Redux State and Dispatch
    const allTodos = useSelector(selectAllTodos);
    const todosEntities = useSelector(selectTodoEntities);
    const dispatch = useDispatch();

    // React State
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [requiredTime, setRequiredTime] = useState('');

    // Event Handlers
    const onCategoryChanged = e => setCategory(e.target.value)
    const onTitleChanged = e => {setTitle(e.target.value);}


    const isInlineForm = parentId !== 'root';
    // Adjust Parent Id
    let adjustedParentId = parentId;
    if (!isInlineForm) {
        let existingCategories = Object.fromEntries(allTodos
            .filter(entity => entity.parent === 'root')
            .map(entity => {
                return [entity.category, entity.id];
            }
            ));
        let categoryExists = Object.keys(existingCategories).includes(category);
        adjustedParentId = categoryExists ? existingCategories[category] : parentId;
    }
    // Adjust Category
    let adjustedCategory = isInlineForm ? todosEntities[parentId].category : category;



    // TODO: 要check
    const canSave =
        [adjustedCategory, title].every(Boolean)
    const onSaveTodoClicked = async () => {
        if (canSave) {
            //console.log('addTodo Args:', `${adjustedCategory}, ${title}, ${content}, ${requiredTime}, ${parentId}`)
            dispatch(addTodo(adjustedCategory, title, content, requiredTime, adjustedParentId));
            setCategory('');
            setTitle('');
            setContent('');
            setRequiredTime('');
        }
    }

    let todoCategories = [...new Set(allTodos.filter(itm => itm.category).map(item => item.category))];
    const todoCategoryOptions = todoCategories.map(category => (
        <option 
            key={category} 
            value={category} 
        >
            {category}
        </option>
    ));

    const formLayoutProps = {
        isInlineForm,
        todoCategoryOptions,
        category: adjustedCategory,
        onCategoryChanged,
        title,
        onTitleChanged,
        canSave,
        onSaveTodoClicked,
    }

    const clonedFormLayout = React.cloneElement(
        formLayout,
        {...formLayoutProps}
    )

    return (
        <>
            {clonedFormLayout}
        </>
    )
}
