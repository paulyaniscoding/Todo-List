import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { MinimalRenderer } from './MinimalRenderer'


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

const TodoItem = ({ todoId }) => {
    const todo = useSelector( state => selectTodoById(state, todoId) );
    const dispatch = useDispatch();

    const formatedTime = (time) => {
        if ( time ) {
            return (new Date(time)).toISOString()
        } else {
            return 'N/A';
        }
    }

    const onStartClicked = (todoId) => {
        if (todo.status === 'notStarted') {
            let startTimeObj = new Date();
            dispatch(startTodo({
                id: todoId,
                startTime: startTimeObj.toISOString(),
                lastStartTimestamp: startTimeObj.getTime(),
                status: 'current',
            }));
        } else if (todo.status === 'paused') {
            let startTimeObj = new Date();
            dispatch(startTodo({
                id: todoId,
                lastStartTimestamp: startTimeObj.getTime(),
                status: 'current',
            }));
        }
    }

    const onPauseClicked = (todoId) => {
        if (todo.status === 'current') {
            let endTimeObj = new Date();
            let timeUsed = todo.timeUsed ? todo.timeUsed : 0
            timeUsed = timeUsed + (endTimeObj.getTime() - todo.lastStartTimestamp);
            dispatch(pauseTodo({
                id: todoId,
                lastEndTimestamp: endTimeObj.getTime(),
                timeUsed,
                status: 'paused',
            }));
        }
    }

    const onEndClicked = (todoId) => {
        let endTimeObj = new Date();
        let timeUsed = todo.timeUsed + ( endTimeObj.getTime() - todo.lastStartTimestamp );

        if (todo.status === 'notStarted') {
            dispatch(endTodo({
                id: todoId,
                endTime: endTimeObj.toISOString(),
                lastEndTimestamp: endTimeObj.getTime(),
                timeUsed: 0,
                status: 'finished'
            }));
        } else if (todo.status === 'current') {
            dispatch(endTodo({ 
                id: todoId, 
                endTime: endTimeObj.toISOString(),
                lastEndTimestamp: endTimeObj.getTime(),
                timeUsed,
                status: 'finished'
            }));
        } else if (todo.status === 'paused') {
            let endTime = new Date(todo.lastEndTimestamp).toISOString();
            dispatch(endTodo({
                id: todoId,
                endTime,
                status: 'finished'
            }));
        }
    }

    const getTimeUsed = (todoId) => {
        let timeUsedString = 'N/A'
        if ( todo.timeUsed || todo.timeUsed === 0 ) {

            let minsUsed = parseFloat((todo.timeUsed / 1000 / 60).toFixed(2));
            let hrsUsed = parseFloat((minsUsed / 60).toFixed(2));
            let daysUsed = parseFloat((hrsUsed / 24).toFixed(2));
            if ( daysUsed >= 1 ) {
                timeUsedString = daysUsed < 2 ? `${daysUsed} day` : `${daysUsed} days`
            } else if ( hrsUsed >= 1 ) {
                timeUsedString = hrsUsed < 2 ? `${hrsUsed} hour` : `${hrsUsed} hours`
            } else if (minsUsed >= 1) {
                timeUsedString = minsUsed < 2 ? `${minsUsed} minutes` : `${minsUsed} minutess`
            } else {
                timeUsedString = 'Less than 1 minute'
            }
        }
        return timeUsedString;
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
            <div className='todo-time-used'>{getTimeUsed(todoId)}</div>
            <div className='todo-status'>{todo.status}</div>
            <button onClick={() => onStartClicked(todoId)}>Start</button>
            <button onClick={() => onPauseClicked(todoId)}>Pause</button>
            <button onClick={() => onEndClicked(todoId)}>Finish</button>
        </div>
    )
}

const SubList = ({ listCategory, listIds }) => {
    let todoEntities = useSelector(selectTodoEntities)
    let listContent = listIds.map(itemId => (<TodoItem todoId={itemId} key={itemId} />) )

    let treeItems = {
        root: {
            index: 'root',
            canMove: false,
            hasChildren: true,
            children: listIds,
            data: 'Root item',
            canRename: true,
        }
    };
    //treeItems = Object.fromEntries(
    //    listIds.map(itemId => [itemId, {
    //        index: itemId,
    //        canMove: true,
    //        hasChildren: true,
    //        children: [],
    //        data: todoEntities[itemId],
    //        canRename: true,
    //    }])
    //)

    listIds.forEach(itemId=>{
        treeItems[itemId] = {
            index: itemId,
            canMove: true,
            hasChildren: true,
            children: [],
            data: todoEntities[itemId],
            canRename: true,
        };
    })


    console.log('treeItems111', treeItems)
    console.log('todos', todoEntities)
    console.log('todos3', todoEntities['3'])
/*
    const dummyTreeItems = {
        root: {
            index: 'root',
            canMove: true,
            hasChildren: true,
            children: ['lv1child1', 'lv1child2'],
            data: 'Root item',
            canRename: true,
        },
        lv1child1: {
            index: 'lv1child1',
            canMove: true,
            hasChildren: true,
            children: ['lv2child11'],
            data: 'lv1child1',
            canRename: true,
        },
        lv1child2: {
            index: 'lv1child2',
            canMove: true,
            hasChildren: true,
            children: ['lv2child21'],
            data: 'lv1child2',
            canRename: true,
        },
        lv2child11: {
            index: 'lv2child11',
            canMove: true,
            hasChildren: true,
            children: [],
            data: 'lv2child11',
            canRename: true,
        },
        lv2child21: {
            index: 'lv2child21',
            canMove: true,
            hasChildren: true,
            children: [],
            data: 'lv2child21 data',
            canRename: true,
        },
    };
*/
    return (
        <div style={{ margin: '10px 0', padding: '0 0 10px 0', borderBottom: '1px solid black' }} key={listCategory}>
            <div>{listCategory}</div>
            <div>
                {listContent}
            </div>
            <MinimalRenderer treeItems={treeItems} treeId="tree-1" />
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
    content = Object.entries(sublists).map(([ sublistCategory, sublistIds ]) => {
        return (<SubList listCategory={sublistCategory} listIds={sublistIds} key={sublistCategory}/>)
    } );
    return (
        <section className="todo-list" >
            <h2>Todo List</h2>
            {content}
        </section>
    )
}