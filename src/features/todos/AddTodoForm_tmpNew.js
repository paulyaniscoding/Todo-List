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

const useAddTodo = (parentId) => {
    const dispatch = useDispatch();
    const isRootTasks = parentId === 'root';

    const dispatchTodo = ({ category, title, content, requiredTime }) =>
        dispatch(addTodo(category, title, content, requiredTime, parentId));

    return [isRootTasks, dispatchTodo];
}

export const InlineAddTodoForm = ({ parentId }) => {


}

export const AddtodoForm = ({ parentId }) => {
    // *hook
    // Redux State and Dispatch
    const allTodos = useSelector(selectAllTodos);
    const todosEntities = useSelector(selectTodoEntities);
    //const dispatch = useDispatch();
    const [isRootTasks, dispatchTodo] = useAddTodo(parentId);

    // React State
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [requiredTime, setRequiredTime] = useState('');

    // Event Handlers
    const onCategoryChanged = e => setCategory(e.target.value)
    const onTitleChanged = e => {setTitle(e.target.value); console.log(e.target);}


    // *hook
    //const isRootTasks = parentId === 'root';
    let adjustedCategory = isRootTasks ? category : todosEntities[parentId].category;

    // TODO: 要check
    const canSave =
        [adjustedCategory, title].every(Boolean);
    const onSaveTodoClicked = async () => {
        if (canSave) {

            // *hook
            //dispatch(addTodo(adjustedCategory, title, content, requiredTime, parentId));
            dispatchTodo({ adjustedCategory, title, content, requiredTime });
            
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

    return (
        <div style={{marginBottom: '20px'}}>
            {isRootTasks && <h2>Add Todo</h2>}
            <form>   
                {isRootTasks && (
                    <div>
                        <input type="text" list="todoCategory" placeholder="Category" value={category} onChange={onCategoryChanged}/>
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
            </form>
        </div>
    )
}