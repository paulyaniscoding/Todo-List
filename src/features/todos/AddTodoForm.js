import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'

import { 
    selectAllTodos,
    addTodo, 
    selectTodoEntities
} from './todosSlice'


//import { selectAllUsers, selectUserById } from '../users/usersSlice'

const StyledInput = styled.input`
    width: 500px;
    height: 20px;
    color: orange;
    backgound: transparent;
    border: 1px solid black;
    border-radius: 5px;
    :focus {     
        outline: none;
    }
`

export const AddtodoForm = ({ parentId }) => {
    // Redux State and Dispatch
    const allTodos = useSelector(selectAllTodos);
    const todosEntities = useSelector(selectTodoEntities);
    const dispatch = useDispatch();

    // React State
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [requiredTime, setRequiredTime] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');


    // Event Handlers
    const onCategoryChanged = e => setCategory(e.target.value)
    const onTitleChanged = e => {setTitle(e.target.value); console.log(e.target);}
    const onContentChanged = e => setContent(e.target.value)
    const onRequiredTimeChanged = e => setRequiredTime(e.target.value)


    const isRootTasks = parentId === 'root';
    let adjustedCategory = isRootTasks ? category : todosEntities[parentId].category;
    // TODO: 要check
    const canSave =
        [adjustedCategory, title].every(Boolean) && addRequestStatus === 'idle'
    const onSaveTodoClicked = async () => {
        if (canSave) {

            dispatch(addTodo(adjustedCategory, title, content, requiredTime, parentId));
            setCategory('');
            setTitle('');
            setContent('');
            setRequiredTime('');
        }

        /*
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                await dispatch(addNewtodo({ title, content, user: userId })).unwrap()
                setTitle('')
                setContent('')
                //setUserId('')
            } catch (err) {
                console.error('Failed to save the todo: ', err)
            } finally {
                setAddRequestStatus('idle')
            }
        }
        */
    }

    let todoCategories = [...new Set(allTodos.filter(itm => itm.category).map(item => item.category))];
    const todoCategoryOptions = todoCategories.map(category => (
        <option key={category} value={category}>
            {category}
        </option>
    ));


    return (
        <div>
            {isRootTasks && <h2>Add Todo</h2>}
            <form>
                
                    
                {isRootTasks && (
                    <div>
                        <label htmlFor="todoCategory">Category: </label>
                        <input type="text" list="todoCategory" value={category} onChange={onCategoryChanged}/>
                        <datalist id="todoCategory">
                            {todoCategoryOptions}
                        </datalist>
                    </div>
                )}
                    
                
                <div>
                    <label htmlFor="todoTitle">Title:</label>
                    <StyledInput
                        type="text"
                        id="todoTitle"
                        name="todoTitle"
                        value={title}
                        onChange={onTitleChanged}
                    />

                    
                    {/**
                     * TODO: 要將Title Input 變翻做Controlled Component
                        style={{
                            width: '500px',
                            height: '30px',
                            color: 'orange',
                            backgound: 'transparent',
                            border: 'none',
                        }}
                        **/}
                    <button type="button" onClick={onSaveTodoClicked} disabled={!canSave}>
                        Save
                    </button>
                </div>
{/*
                <label htmlFor="todoAuthor">Author:</label>
                <select id="todoAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
*/}


            </form>
        </div>
    )
}