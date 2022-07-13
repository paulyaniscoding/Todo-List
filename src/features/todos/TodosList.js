import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import '../../App.css';

import {
    selectAllTodos,
    fetchTodos,
    selectTodoIds,
    selectTodoById,
} from './todosSlice'

const TodoItem = ({ todoId }) => {
    const todo = useSelector( state => selectTodoById(state, todoId) )

    const formatedTime = (time) => {
        if ( time ) {
            return (new Date(time)).toISOString()
        } else {
            return 'N/A'
        }
    }

    return (
        <div className="todo-item" key={todoId}>
            <div className='todo-id'>{todoId}</div>
            <div className='todo-category'>{todo.category}</div>
            <div className='todo-title'>{todo.title}</div>
            <div className='todo-content'>{todo.content}</div>

            <div className='todo-recordingTime'>{formatedTime(todo.recordingTime)}</div>
            <div className='todo-expectedRequiredTime'>{`${(todo.expectedRequiredTime)} hours`}</div>
            <div className='todo-startTime'>{formatedTime(todo.startTime)}</div>
            <div className='todo-endTime'>{formatedTime(todo.endTime)}</div>
            <div className='todo-status'>{todo.status}</div>
            <button>Start</button>
            <button>Finish</button>
        </div>
    )
}

const SubList = ({ listTitle, listIds }) => {
    console.log('listIds', listIds);
    let listContent = listIds.map(itemId => (<TodoItem todoId={itemId} key={itemId} />) )
    return (
        <div style={{ margin: '10px 0', padding: '0 0 10px 0', borderBottom: '1px solid black' }} key={listTitle}>
            <div>{listTitle}</div>
            <div>
                {listContent}
            </div>
        </div>
    );
}

export const TodosList = () => {
    const todoItems = useSelector(selectAllTodos)

    const getSublists = (todoItems, sublistType) => {
        let sublists = {};
        if ( sublistType === 'category' ) {

            todoItems.forEach((item) => {
                if (!(sublists.hasOwnProperty(item[sublistType]))) {
                    sublists[item[sublistType]] = [item.id]
                } else {
                    sublists[item[sublistType]].push(item.id);
                }
            })
        } 
        //else if () {
//
        //}
        return sublists;
    }

    let content;
    let sublistType = 'category';
    let sublists = getSublists(todoItems, sublistType);
    console.log(sublists);
    console.log('Object.entries(sublists)', Object.entries(sublists))
    content = Object.entries(sublists).map(([ sublistTitle, sublistIds ]) => {
        return (<SubList listTitle={sublistTitle} listIds={sublistIds} key={sublistTitle}/>)
    } );
    return (
        <section className="todo-list" >
            <h2>Todo List</h2>
            {content}
        </section>
    )
}