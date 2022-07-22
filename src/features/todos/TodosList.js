import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { MinimalRenderer } from './MinimalRenderer'
import { TodosSublist } from './TodosSublist'
import { TodoItem } from './TodoItem'

import '../../App.css';

import {
    selectAllTodos,
    selectTodoEntities,
    fetchTodos,
    selectTodoIds,
    selectTodoById,

    startTodo,
    pauseTodo,
    endTodo,
} from './todosSlice'

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

    content = Object.entries(sublists).map(([ sublistCategory, sublistIds ]) => {
        return (<TodosSublist listCategory={sublistCategory} listIds={sublistIds} key={sublistCategory}/>)
    } );
    return (
        <section className="todo-list" >
            {console.log('==== Start Rendering TodoList ================')}
            <h2>Todo List</h2>
            {content}
        </section>
    )
}