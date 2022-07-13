import { 
    createEntityAdapter, 
    createSlice, 
    createAsyncThunk,
    createSelector,
    nanoid
} from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils';

import { getTodosDemo } from '../utility/todosDemo'

//import { sub } from 'date-fns'

const todosAdapter = createEntityAdapter({
    sortComparer: (a, b) => {
        if ( a.startTime && b.startTime ){
            return b.startTime.localeCompare(a.startTime)
        } else if ( a.startTime && !b.startTime ){
            return -1;
        } else if ( !a.startTime && b.startTime){
            return 1;
        } else {
            return 1;
        }
    }
})

let initialState = todosAdapter.getInitialState()

initialState = todosAdapter.addMany(initialState, getTodosDemo())

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: {
            reducer: todosAdapter.addOne,
            prepare(category, title, content, requiredTime) {
                return {
                    payload: {
                        id: nanoid(),
                        category,
                        title,
                        content,

                        recordingTime: new Date().toISOString(),
                        expectedRequiredTime: requiredTime,
                        startTime: null,
                        endTime: null,

                        status: 'notStarted',
                    }
                }
            }
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

export const { addTodo, postUpdated, postDeleted, reactionAdded } = todosSlice.actions

export default todosSlice.reducer;

// Export the customized selectors for this adapter using `getSelectors`
export const {
    selectAll: selectAllTodos,
    selectById: selectTodoById,
    selectIds: selectTodoIds
    // Pass in a selector that returns the todos slice of state
} = todosAdapter.getSelectors(state => state.todos)
