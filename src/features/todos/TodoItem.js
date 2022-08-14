import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import ReactTooltip from 'react-tooltip';
import { Tooltip } from '../utility/Tooltip/Tooltip';

import {
    MdPlayArrow,
    MdPause,
    MdDone,
    MdUndo,
} from "react-icons/md";

import {
    selectAllTodos,
    selectTodoEntities,
    fetchTodos,
    selectTodoIds,
    selectTodoById,

    startTodo,
    pauseTodo,
    endTodo,
    recoverTodo,
} from './todosSlice'

import { AddTodoForm } from './AddTodoForm/AddTodoForm'
import { EditTodoFormLayout } from './AddTodoForm/EditTodoFormLayout'
import { themeColor } from '../theme/theme';


const StyledStartIcon = styled(MdPlayArrow)`
    width: 40px;
    height: 40px;
    cursor: pointer;
    color: ${props => props.color.frame};
    :hover {
        color: ${props => props.color.hover};
    };
`;

const StyledPauseIcon = styled(MdPause)`
    width: 40px;
    height: 40px;
    cursor: pointer;
    color: ${props => props.color.frame};
    :hover {
        color: ${props => props.color.hover};
    };
`;

const StyledFinishIcon = styled(MdDone)`
    width: 40px;
    height: 40px;
    cursor: pointer;
    color: ${props => props.color.frame};
    :hover {
        color: ${props => props.color.hover};
    };
`;

const StyledRecoverIcon = styled(MdUndo)`
    width: 40px;
    height: 40px;
    cursor: pointer;
    color: ${props => props.color.frame};
    :hover {
        color: ${props => props.color.hover};
    };
`


const StyledDiv = styled.div`
    width: max(100%, 600px);
    display: grid;
    grid-template-columns: auto max(20vw, 200px);

    background-color: ${props => props.color.background};
    padding: 0.25rem 0.25rem;
    border: 1px solid ${props => props.color.frame};/*rgb(177, 174, 174);*/
    border-left: 0;
    margin: 0 -1px -1px 0; /* TODO: 負責出面layout 嘅css 應該放去出面 */
    border-radius: 0px;
`;
//margin: 0 -1px -1px 0;
//    grid-template-columns: 500px auto 100px;
//box-shadow: 0 1px 3px 0 #999999;

export const TodoItem = ({ todoId }) => {
    const [inEditMode, toEditMode] = useState(false);

    const todo = useSelector(state => selectTodoById(state, todoId));
    const dispatch = useDispatch();

    const isDebugView = false;

    const todoOutputStatus = {
        notStarted: 'Not Started',
        current: 'WIP',
        paused: 'Paused',
        finished: 'Done'
    }

    const formatedTime = (time) => {
        if (time) {
            return (new Date(time)).toISOString()
        } else {
            return 'N/A';
        }
    }


    const onStartClicked = (e, todoId) => {
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
        e.stopPropagation();
    }

    const onPauseClicked = (e, todoId) => {
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
        e.stopPropagation();
    }

    const onEndClicked = (e, todoId) => {
        let endTimeObj = new Date();
        let timeUsed = todo.timeUsed + (endTimeObj.getTime() - todo.lastStartTimestamp);

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
        e.stopPropagation();
    }

    const onRecoverClicked = (e, todoId) => {
        if (todo.status === 'finished') {
            dispatch(recoverTodo({
                id: todoId,
                endTime: null,
                status: 'paused',
            }));
        }
        e.stopPropagation();
    }

    const getTimeUsed = (todoId) => {
        let timeUsedString = 'N/A'
        if (todo.timeUsed || todo.timeUsed === 0) {

            let minsUsed = parseFloat((todo.timeUsed / 1000 / 60).toFixed(2));
            let hrsUsed = parseFloat((minsUsed / 60).toFixed(2));
            let daysUsed = parseFloat((hrsUsed / 24).toFixed(2));
            if (daysUsed >= 1) {
                timeUsedString = daysUsed < 2 ? `${daysUsed} day` : `${daysUsed} days`
            } else if (hrsUsed >= 1) {
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
        <>
            { isDebugView ? (
                <div className = "todo-item" key = { todoId } >
                    <div className='todo-id'></div>
                    <div className='todo-category'><b>Category:</b> {todo.category}</div>
                    <div className='todo-title'>{`(${todo.priority}) `}{`${todoId}. `}{todo.title}</div>

                    <div>
                        <button onClick={(e) => onStartClicked(e, todoId)}>Start</button>
                        <button onClick={(e) => onPauseClicked(e, todoId)}>Pause</button>
                        <button onClick={(e) => onEndClicked(e, todoId)}>Finish</button>
                        <span className='todo-status'>{todo.status}{', '}</span>
                        <span className='todo-recordingTime'>{formatedTime(todo.recordingTime)}</span>
                    </div>
                </div >
            ) : (
                    <StyledDiv 
                        className="todo-item" 
                        todoStatus={todo.status} 
                        color={themeColor[todo.status]}
                        key={todoId}
                    >
                    {!inEditMode ? (    
                        <>
                            <div 
                                className='todo-title' 
                                style={{
                                    width: 'auto',
                                }}
                            >
                                <div
                                    style={{
                                        width: '25vw',
                                        wordWrap: 'break-word',
                                        hyphens: 'auto',
                                        cursor: 'text',
                                        overflowWrap: 'break-word',
                                    }}
                                    onClick={() => { toEditMode(true) }}
                                >
                                    {todo.title}
                                </div>
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '100px auto',
                                alignItems: 'start',
                                justifyContent: 'space-between',
                                height: 'fit-content',
                            }}>
                                <div>
                                    {(todo.status === 'notStarted' || todo.status === 'paused') && (
                                        <Tooltip msg="Start">
                                            <StyledStartIcon
                                                onClick={(e) => onStartClicked(e, todoId)}
                                                color={themeColor[todo.status]}
                                            />
                                        </Tooltip>
                                    )}
                                    {(todo.status === 'current') && (
                                        <Tooltip msg="Pause">
                                            <StyledPauseIcon
                                                onClick={(e) => onPauseClicked(e, todoId)}
                                                color={themeColor[todo.status]}
                                            />
                                        </Tooltip>
                                    )}
                                    {(todo.status !== 'finished') && (
                                        <Tooltip msg="Finish">
                                            <StyledFinishIcon
                                                onClick={(e) => onEndClicked(e, todoId)}
                                                color={themeColor[todo.status]}
                                            />
                                        </Tooltip>
                                    )}
                                    {(todo.status === 'finished') && (
                                        <Tooltip msg="Recover">
                                            <StyledRecoverIcon
                                                onClick={(e) => onRecoverClicked(e, todoId)}
                                                color={themeColor[todo.status]}
                                            />
                                        </Tooltip>
                                    )}
                                </div>
                                
                                <div className='todo-status' style={{
                                    alignSelf: 'center',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                    <span style={{
                                        color: themeColor[todo.status].hover,
                                        fontSize: '20px',
                                    }}>
                                        {todoOutputStatus[todo.status]}
                                    </span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <AddTodoForm 
                            parentId={todo.parent} 
                            defaultTitle={todo.title}
                            formLayout={(
                                <EditTodoFormLayout 
                                    editProps={{
                                        todoId: todoId,
                                        endEditMode: () => { toEditMode(false) },
                                    }}
                                    layoutProps={{color: themeColor[todo.status]}}
                                />
                            )}
                        />
                    )}
                </StyledDiv>
            )}
        </>
    )

    //return (
    //    <div className="todo-item" key={todoId}>
    //        <div className='todo-id'>{todoId}</div>
    //        <div className='todo-category'>{todo.category}</div>
    //        <div className='todo-title'>{todo.title}</div>
    //        <div className='todo-content'>{todo.content}</div>
//
    //        <div className='todo-recordingTime'>{formatedTime(todo.recordingTime)}</div>
    //        <div className='todo-expectedRequiredTime'>{`${(todo.expectedRequiredTime)} hours`}</div>
    //        <div className='todo-startTime'>{formatedTime(todo.startTime)}</div>
    //        <div className='todo-endTime'>{formatedTime(todo.endTime)}</div>
    //        <div className='todo-time-used'>{getTimeUsed(todoId)}</div>
    //        <div className='todo-status'>{todo.status}</div>
    //        <button onClick={(e) => onStartClicked(e, todoId)}>Start</button>
    //        <button onClick={(e) => onPauseClicked(e, todoId)}>Pause</button>
    //        <button onClick={(e) => onEndClicked(e, todoId)}>Finish</button>
    //    </div>
    //)
}