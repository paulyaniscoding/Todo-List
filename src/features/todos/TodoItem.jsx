import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { Tooltip } from '../utility/Tooltip/Tooltip';

import {
    MdPlayArrow,
    MdPause,
    MdDone,
    MdUndo,
} from "react-icons/md";

import {
    selectTodoById,
    startTodo,
    pauseTodo,
    endTodo,
    recoverTodo,
} from './todosSlice'

import { AddTodoForm } from './AddTodoForm/AddTodoForm'
import { EditTodoFormLayout } from './AddTodoForm/EditTodoFormLayout'
import { themeColor } from '../theme/theme';

const TodoContent = styled.div`
    width: auto;
`
const TodoTitle = styled.div`
    width: 40vw;
    wordW-wrap: break-word;
    hyphens: auto;
    cursor: text;
    overflow-wrap: break-word;
`
const TodoOperation = styled.div`
    display: grid;
    grid-template-columns: 100px auto;
    align-items: start;
    justify-content: space-between;
    height: fit-content;
`
const TodoStatus = styled.div`
    align-self: center;
    display: flex;
    align-items: center;
    color: ${props => props.fontColor};
    font-size: 20px;
`
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
    margin: 0 -1px -1px 0; /* TODO: ????????????layout ???css ?????????????????? */
    border-radius: 0px;
`;

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
                            <TodoContent 
                                className='todo-title' 
                            >
                                <TodoTitle
                                    onClick={() => { toEditMode(true) }}
                                >
                                    {todo.title}
                                </TodoTitle>
                            </TodoContent>

                            <TodoOperation>
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
                                <TodoStatus 
                                    className='todo-status' 
                                    fontColor={themeColor[todo.status].hover}
                                >                          
                                    {todoOutputStatus[todo.status]}                            
                                </TodoStatus>
                            </TodoOperation>
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
}