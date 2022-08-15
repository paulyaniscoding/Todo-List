import { 
    createEntityAdapter, 
    createSlice, 
    nanoid
} from '@reduxjs/toolkit'

import { getTodosDemo } from '../utility/DemoData/todosDemoData'

const todosAdapter = createEntityAdapter(
    {
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
                if (state.entities[action.payload.parent]?.children) {
                    state.entities[action.payload.parent].children = [
                        ...state.entities[action.payload.parent].children,
                        action.payload.id
                    ];
                } else {
                    Object.defineProperty(state.entities[action.payload.parent], 'children', {
                        value: [
                            action.payload.id
                        ],
                    })
                }

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
        recoverTodo: todosAdapter.upsertOne,
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
        reactionAdded(state, action) {  
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
})

export const { 
    addTodo, 
    updateTodo,
    startTodo, 
    pauseTodo, 
    endTodo, 
    recoverTodo,
    changePriority,

    postUpdated, 
    postDeleted, 
    reactionAdded 
} = todosSlice.actions

export default todosSlice.reducer;

export const {
    selectAll: selectAllTodos,
    selectEntities: selectTodoEntities,
    selectById: selectTodoById,
    selectIds: selectTodoIds
} = todosAdapter.getSelectors(state => state.todos)
