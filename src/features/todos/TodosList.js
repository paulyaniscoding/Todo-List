import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import '../../App.css';

import {
    selectAllTodos,
    fetchTodos,
    selectTodoIds,
    selectTodoById
} from './todosSlice'

const Todo = ({ todoId }) => {
    const todo = useSelector( state => selectTodoById(state, todoId) )

    const formatedTime = (time) => {
        if ( time ) {
            return (new Date(time)).toISOString()
        } else {
            return 'N/A'
        }
    }

    return (
        <li className="todo" key={todoId}>
            <div className='todoId'>{todoId}</div>
            <div className='todoCategory'>{todo.category}</div>
            <div className='todoTitle'>{todo.title}</div>
            <div className='todoContent'>{todo.content}</div>

            <div className='todorRecordingTime'>{formatedTime(todo.recordingTime)}</div>
            <div className='todoExpectedRequiredTime'>{`${todo.expectedRequiredTime} hours`}</div>
            <div className='todoStartTime'>{formatedTime(todo.startTime)}</div>
            <div className='todoEndTime'>{formatedTime(todo.endTime)}</div>
            <div className='todoStatus'>{todo.status}</div>
        </li>
    )
}

export const TodosList = () => {
    const todoIds = useSelector(selectTodoIds)
    let content;
    content = todoIds.map(todoId=>(
        <Todo todoId={todoId} key={todoId} />
    ))
    return (
        <ul>
            {content}
        </ul>
    )
}