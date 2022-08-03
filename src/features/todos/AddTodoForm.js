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

export const AddTodoFormInlineLayout = ({
    isRootTasks,
    todoCategoryOptions,
    category,
    onCategoryChanged,
    title,
    onTitleChanged,
    canSave,
    onSaveTodoClicked,
}) => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '7px 1fr',
            gap: '0',
            justifyContent: 'start',
            alignItems: 'start',
        }}>
            <div style={{
                width: '7px',
                height: '50px',
                border: 'none',
                padding: 'none',
                backgroundColor: 'gray',
            }}/>
            <div style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'auto 40vw max-content',
                padding: '0.25rem 0.25rem',
                border: '1px solid rgb(177, 174, 174)',
                borderLeft: '0',
                borderRadius: '0px',
            }}/>
        </div>
    );
}

export const AddTodoFormLayout = ({ 
    isRootTasks, 
    todoCategoryOptions, 
    category, 
    onCategoryChanged,
    title,
    onTitleChanged,
    canSave,
    onSaveTodoClicked,
}) => (

    <div style={{ marginBottom: '20px' }}>
        {isRootTasks && <h2>Add Todo</h2>}
        <form>
            {isRootTasks && (
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
);

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
    const onTitleChanged = e => {setTitle(e.target.value); console.log(e.target);}

    const isRootTasks = parentId === 'root';
    let adjustedCategory = isRootTasks ? category : todosEntities[parentId].category;
    // TODO: 要check
    const canSave =
        [adjustedCategory, title].every(Boolean)
    const onSaveTodoClicked = async () => {
        if (canSave) {
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
        category,
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
