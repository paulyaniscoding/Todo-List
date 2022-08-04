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

    const isRootTasks = parentId === 'root';
    let adjustedCategory = isRootTasks ? category : todosEntities[parentId].category;
    // TODO: 要check
    const canSave =
        [adjustedCategory, title].every(Boolean)
    const onSaveTodoClicked = async () => {
        if (canSave) {
            console.log('addTodo Args:', `${adjustedCategory}, ${title}, ${content}, ${requiredTime}, ${parentId}`)
            dispatch(addTodo(adjustedCategory, title, content, requiredTime, parentId));
            setCategory('');
            setTitle('');
            setContent('');
            setRequiredTime('');
        }
    }

    let todoCategories = [...new Set(allTodos.filter(itm => itm.category).map(item => item.category))];
    const todoCategoryOptions = todoCategories.map(category => (
        <option key={category} value={category}>
            {category}
        </option>
    ));

    const formLayoutProps = {
        isRootTasks,
        todoCategoryOptions,
        adjustedCategory,
        onCategoryChanged,
        title,
        onTitleChanged,
        canSave,
        onSaveTodoClicked,
    }
    return (
        <>
            {formLayout(formLayoutProps) }
        </>
    )
}
