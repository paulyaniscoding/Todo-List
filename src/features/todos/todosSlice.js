import { 
    createEntityAdapter, 
    createSlice, 
    createAsyncThunk,
    createSelector,
    nanoid
} from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils';

import { getTodosDemo } from '../utility/DemoData/todosDemoData'

//import { sub } from 'date-fns'

const todosAdapter = createEntityAdapter(
    {
        // TODO: 要check check
        sortComparer: (a, b) => {
            const exist = (num) => num || num ===0;
            let aExists = exist(a.priority)
            let bExists = exist(b.priority)

            if (aExists && bExists) {
                return a.priority <= b.priority ? -1:1;
            } else if (aExists && !bExists) {
                return -1;
            } else if (!aExists && bExists) {
                return 1;
            } else {
                return -1;
            }
        },
    }

    //{
    //    sortComparer: (a, b) => {
    //    if (a.category && b.category ){
    //        return b.category.localeCompare(a.category)
    //    } else if ( a.category && !b.category ){
    //        return -1;
    //    } else if ( !a.category && b.category){
    //        return 1;
    //    } else {
    //        return 1;
    //    }
    //    },
    //}
)


let initialState = todosAdapter.getInitialState()

initialState = todosAdapter.addMany(initialState, getTodosDemo())

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: {
            reducer(state, action) { 
                let prevTodoNum = state.ids.length;
                //console.log('prevTodoNum', prevTodoNum)
                if (state.entities[action.payload.parent]?.children) {
                    state.entities[action.payload.parent].children = [
                        ...state.entities[action.payload.parent].children,
                        action.payload.id
                    ];
                } else {
                    //console.log('state.entities[action.payload.parent]', state.entities[action.payload.parent])
                    Object.defineProperty(state.entities[action.payload.parent], 'children', {
                        value: [
                            action.payload.id
                        ],
                    })
                    //state.entities[action.payload.parent].children = [
                    //    action.payload.id
                    //];
                }

                //todosAdapter.addOne(state, action.payload);
                state.ids = [...state.ids, action.payload.id];
                state.entities[action.payload.id] = {
                    ...action.payload,
                    parent: action.payload.parent,
                    priority: prevTodoNum,
                };
                if (action.payload.parent!=='root'){
                    state.entities[action.payload.id] = {
                        ...state.entities[action.payload.id],
                        category: state.entities[action.payload.id].category,
                    }; 
                }
            },
            prepare(category, title, content, requiredTime, parentId) {
                return {
                    payload: {
                        id: nanoid(),
                        category,
                        title,
                        content,

                        parent: parentId,
                        children: [],

                        recordingTime: new Date().toISOString(),
                        expectedRequiredTime: requiredTime,
                        startTime: null,
                        endTime: null,

                        lastStartTimestamp: null,
                        lastEndTimestamp: null,
                        timeUsed: null,

                        status: 'notStarted',
                    }
                }
            }
        },
        updateTodo: todosAdapter.upsertOne,
        startTodo: todosAdapter.upsertOne,
        pauseTodo: todosAdapter.upsertOne,
        endTodo: todosAdapter.upsertOne,
        changePriority: (state, action) => {
            // slow version
            let [dragIndex, hoverIndex] = action.payload;
            let dragId = state.ids[dragIndex];
            let priorityList = state.ids.slice();

            priorityList.splice(dragIndex, 1);
            priorityList.splice(hoverIndex, 0, dragId);

            let priorityObj = priorityList.map((id, priority)=>{
                return { id: id, priority: priority };
            })
            todosAdapter.upsertMany(state, priorityObj);
        },

        // postAdded: {
        //     reducer(state, action) {
        //         state.todos.push(action.payload)
        //     },
        //     prepare(title, content, userId) {
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 date: new Date().toISOString(),
        //                 title,
        //                 content,
        //                 users: userId
        //             }
        //         }
        //     }
        // },

        reactionAdded(state, action) {  // todo: reducer 嘅args 可唔可以唔跟 (state, action) 嘅樣? s, https://github.com/reduxjs/redux-toolkit/issues/464
            const { postId, reaction } = action.payload
            const existingPost = state.entities[postId]
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload
            const existingPost = state.entities[id]
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        },
        postDeleted: (state, action) => {
            state.todos = state.todos.filter(
                post=>post.id!==action.payload
            )
        },
    },
    extraReducers(builder) {

    }
})

export const { 
    addTodo, 
    updateTodo,
    startTodo, 
    pauseTodo, 
    endTodo, 
    changePriority,

    postUpdated, 
    postDeleted, 
    reactionAdded 
} = todosSlice.actions

export default todosSlice.reducer;

// Export the customized selectors for this adapter using `getSelectors`
export const {
    selectAll: selectAllTodos,
    selectEntities: selectTodoEntities,
    selectById: selectTodoById,
    selectIds: selectTodoIds
    // Pass in a selector that returns the todos slice of state
} = todosAdapter.getSelectors(state => state.todos)
