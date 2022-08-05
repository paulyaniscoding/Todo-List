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

    // Event Handlers {
    const onCategoryChanged = e => setCategory(e.target.value)
    const onTitleChanged = useCallback(e => {setTitle(e.target.value);}, []);

    // onAddTodoClicked Handler
    const isInlineForm = parentId !== 'root';
    // Adjust Category, cause there is no category input in inline form
    let adjustedCategory = isInlineForm ? todosEntities[parentId].category : category;
    let todoCategories = [...new Set(allTodos.filter(itm => itm.category).map(item => item.category))];
    const todoCategoryOptions = todoCategories.map(category => (
        <option
            key={category}
            value={category}
        >
            {category}
        </option>
    ));
    const canAdd =
        [adjustedCategory, title].every(Boolean)
    const onAddTodoClicked = () => {
        if (canAdd) {
            //console.log('addTodo Args:', `${adjustedCategory}, ${title}, ${content}, ${requiredTime}, ${parentId}`)
            dispatch(addTodo(adjustedCategory, title, content, requiredTime, parentId));
            setCategory('');
            setTitle('');
            setContent('');
            setRequiredTime('');
        }
    }

    // onUpdateTodoClicked Handler
    const canUpdate = title && title !== defaultTitle;
    const onUpdateTodoClicked = (todoId) => {
        if (canUpdate) {
            dispatch(updateTodo({ id: todoId, title }));
        }
    }
    // } Event Handlers


    /* 好似諗錯嘢, Commented
    @root
        同Category, parent=root (implement咗)
            => 無衝突
        同Category, parent=其他 (無implement到)
            => 唔合理
        唔同Category, parent = root(implement咗)
            => 更加無衝突
        唔同Category, parent = 其他 (無implement到)
            => 唔合理
        => 要整走adjusted parent
    @inline
        無得set category
            parent adjust嘅話
                => 唔合理
        => 無留adjusted parent嘅必要
    @edit
        無理parent
            => 唔洗理

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
    */
   
    const formLayoutWifFormProps = React.cloneElement(
        formLayout,
        {
            formProps: {
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
        }
    )

    return (
        <>
            {formLayoutWifFormProps}
        </>
    )
}
