import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { 
    selectAllTodos,
    addTodo 
} from './todosSlice'


//import { selectAllUsers, selectUserById } from '../users/usersSlice'

export const AddtodoForm = ({parentId}) => {
    // React State
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [requiredTime, setRequiredTime] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    // Redux State and Dispatch
    const allTodos = useSelector(selectAllTodos);
    const dispatch = useDispatch();

    // Event Handlers
    const onCategoryChanged = e => setCategory(e.target.value)
    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onRequiredTimeChanged = e => setRequiredTime(e.target.value)

    // TODO: 要check
    const canSave =
        [category, title, content, requiredTime].every(Boolean) && addRequestStatus === 'idle'
    const onSaveTodoClicked = async () => {
        if (canSave) {
            dispatch(addTodo(category, title, content, requiredTime, parentId));
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
        <section>
            <h2>Add Todo</h2>
            <form>
                <div>
                    <label htmlFor="todoCategory">Category:</label>
                    <input type="text" list="todoCategory" value={category} onChange={onCategoryChanged}/>
                    <datalist id="todoCategory">
                        {todoCategoryOptions}
                    </datalist>
                    
                </div>
                <div>
                    <label htmlFor="todoTitle">Title:</label>
                    <input
                        type="text"
                        id="todoTitle"
                        name="todoTitle"
                        value={title}
                        onChange={onTitleChanged}
                    />
                </div>
                <div>
                    <label htmlFor="todoContent">Content:</label>
                    <textarea
                        id="todoContent"
                        name="todoContent"
                        value={content}
                        onChange={onContentChanged}
                    />
                </div>
                <div>
                    <label htmlFor="todoRequiredTime">Time Needed:</label>
                    <input
                        type="text"
                        id="todoRequiredTime"
                        name="todoRequiredTime"
                        value={requiredTime}
                        onChange={onRequiredTimeChanged}
                    />
                </div>

{/*
                <label htmlFor="todoAuthor">Author:</label>
                <select id="todoAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
*/}


                <button type="button" onClick={onSaveTodoClicked} disabled={!canSave}>
                    Save
                </button>
            </form>
        </section>
    )
}