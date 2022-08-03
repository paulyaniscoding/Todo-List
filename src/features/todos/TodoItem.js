import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'

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

import { 
    MdPlayArrow,
    MdPause,
    MdDone,
 } from "react-icons/md";

const StyledStartIcon = styled(MdPlayArrow)`
    width: 40px;
    height: 40px;
    cursor: pointer;
    color: gray;
    :hover {
        color: pink;
    };
`;

const StyledPauseIcon = styled(MdPause)`
    width: 40px;
    height: 40px;
    cursor: pointer;
    color: gray;
    :hover {
        color: pink;
    };
`;

const StyledFinishIcon = styled(MdDone)`
    width: 40px;
    height: 40px;
    cursor: pointer;
    color: gray;
    :hover {
        color: pink;
    };
`;

const StyledDiv = styled.div`
    display: grid;
    grid-template-columns: 100px 500px 100px;
    padding: 0.25rem 0.25rem;
    border: 1px solid rgb(177, 174, 174);
    border-radius: 0px;
`;
//
//box-shadow: 0 1px 3px 0 #999999;

export const TodoItem = ({ todoId }) => {
    const todo = useSelector(state => selectTodoById(state, todoId));
    const dispatch = useDispatch();

    const isDebugView = false;

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
                <StyledDiv className="todo-item" key={todoId}>
                    <div className='todo-title'>{todo.title}</div>
                    <div></div>
                    <div>
                        {(todo.status === 'notStarted' || todo.status === 'paused') && (
                            <StyledStartIcon onClick={(e) => onStartClicked(e, todoId)} />
                        )}
                        {(todo.status === 'current') && (
                            <StyledPauseIcon onClick={(e) => onPauseClicked(e, todoId)} />
                        )}
                        {(todo.status !== 'finished') && (
                            <StyledFinishIcon onClick={(e) => onEndClicked(e, todoId)} />
                        )}
                        <span className='todo-status'>{todo.status}</span>
                    </div>
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