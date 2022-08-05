import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'


import {
    MdAdd,
} from "react-icons/md";

import { 
    selectAllTodos,
    addTodo,
    updateTodo,
    selectTodoEntities
} from '../todosSlice'



export const AddTodoForm = ({ parentId, defaultTitle, formLayout }) => {
    // Redux State and Dispatch
    const allTodos = useSelector(selectAllTodos);
    const todosEntities = useSelector(selectTodoEntities);
    const dispatch = useDispatch();

    // React State
    const [category, setCategory] = useState('');
    let defaultTitleState = defaultTitle ? defaultTitle : '';
    const [title, setTitle] = useState(defaultTitleState);
    const [content, setContent] = useState('');
    const [requiredTime, setRequiredTime] = useState('');

    // Event Handlers
    const onCategoryChanged = e => setCategory(e.target.value)
    const onTitleChanged = useCallback(e => {setTitle(e.target.value);}, []);

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
    const canAdd =
        [adjustedCategory, title].every(Boolean)
    const onAddTodoClicked = () => {
        if (canAdd) {
            //console.log('addTodo Args:', `${adjustedCategory}, ${title}, ${content}, ${requiredTime}, ${parentId}`)
            dispatch(addTodo(adjustedCategory, title, content, requiredTime, adjustedParentId));
            setCategory('');
            setTitle('');
            setContent('');
            setRequiredTime('');
        }
    }

    const canUpdate = title && title !== defaultTitle;
    const onUpdateTodoClicked = (todoId) => {
        if (canUpdate) {
            dispatch(updateTodo({id:todoId, title}));
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
        canAdd,
        onAddTodoClicked,
        canUpdate,
        onUpdateTodoClicked,
    }

    const clonedFormLayout = React.cloneElement(
        formLayout,
        {formProps: formLayoutProps}
    )

    return (
        <>
            {clonedFormLayout}
        </>
    )
}
