
/**

    todoTask = {
        id,
        category: ...,
        title: ...,
        content: ...,

        recordingTime: ...,
        expectedRequiredTime: ...,

        startTime: ...,
        endTime: ...,

        status: current | paused | started | notStarted | finished 

    }

 */

const todoDemos = [
    {
        id: 'root',
        priority: 0,
        children: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',],
    }, 
    {
        id: '1',
        priority: 1,
        category: 'Todo List App',
        title: 'Add Ignore Todo function',
        content: 'Add Ignore Todo function',

        parent: 'root',
        children: [],

        recordingTime: '2022-08-15T06:26:00.970Z',
        expectedRequiredTime: '20',
        startTime: null,
        endTime: null,

        lastStartTimestamp: null,
        lastEndTimestamp: null,
        timeUsed: null,

        status: 'notStarted',
    },
    {
        id: '2',
        priority: 2,
        category: 'Todo List App',
        title: 'Add more nodes',
        content: 'Add more nodes',

        parent: 'root',
        children: ['21', '22', '23',],

        recordingTime: '2022-08-16T06:26:00.970Z',
        expectedRequiredTime: '20',
        startTime: null,
        endTime: null,

        lastStartTimestamp: null,
        lastEndTimestamp: null,
        timeUsed: null,

        status: 'notStarted',
    },
    {
        id: '21',
        priority: 13,
        category: 'Todo List App',
        title: 'Add Info Node',
        content: 'Add Info Node',

        parent: '2',
        children: [],

        recordingTime: '2022-08-16T06:26:00.970Z',
        expectedRequiredTime: '20',
        startTime: null,
        endTime: null,

        lastStartTimestamp: null,
        lastEndTimestamp: null,
        timeUsed: null,

        status: 'notStarted',
    },        
    {
        id: '22',
        priority: 14,
        category: 'Todo List App',
        title: 'Add Multimedia Node',
        content: 'Add Multimedia Node',

        parent: '2',
        children: [],

        recordingTime: '2022-08-16T06:26:00.970Z',
        expectedRequiredTime: '20',
        startTime: null,
        endTime: null,

        lastStartTimestamp: null,
        lastEndTimestamp: null,
        timeUsed: null,

        status: 'notStarted',
    },
    {
        id: '23',
        priority: 15,
        category: 'Todo List App',
        title: 'Switch Node function',
        content: 'Switch Node function',

        parent: '2',
        children: [],

        recordingTime: '2022-08-16T06:26:00.970Z',
        expectedRequiredTime: '20',
        startTime: null,
        endTime: null,

        lastStartTimestamp: null,
        lastEndTimestamp: null,
        timeUsed: null,

        status: 'notStarted',
    },
    {
        id: '3',
        priority: 3,
        category: 'Todo List App',
        title: 'Support Tag',
        content: 'Support Tag',

        parent: 'root',
        children: [],

        recordingTime: '2022-08-16T06:26:00.970Z',
        expectedRequiredTime: '20',
        startTime: null,
        endTime: null,

        lastStartTimestamp: null,
        lastEndTimestamp: null,
        timeUsed: null,

        status: 'notStarted',
    },
    {
        id: '4',
        priority: 4,
        category: 'Todo List App',
        title: 'Move Nodes',
        content: 'Move Nodes',

        parent: 'root',
        children: ['41', '42',],

        recordingTime: '2022-08-17T06:26:00.970Z',
        expectedRequiredTime: '20',
        startTime: null,
        endTime: null,

        lastStartTimestamp: null,
        lastEndTimestamp: null,
        timeUsed: null,

        status: 'notStarted',
    },
    {
        id: '41',
        priority: 16,
        category: 'Todo List App',
        title: 'Vertical Dragging (Parent lv <--> Children lv)',
        content: 'Vertical Dragging (Parent lv <--> Children lv)',

        parent: '4',
        children: [],

        recordingTime: '2022-08-17T06:26:00.970Z',
        expectedRequiredTime: '20',
        startTime: null,
        endTime: null,

        lastStartTimestamp: null,
        lastEndTimestamp: null,
        timeUsed: null,

        status: 'notStarted',
    },
    {
        id: '42',
        priority: 17,
        category: 'Todo List App',
        title: 'Move with node id',
        content: 'Move with node id',

        parent: '4',
        children: [],

        recordingTime: '2022-08-17T06:26:00.970Z',
        expectedRequiredTime: '20',
        startTime: null,
        endTime: null,

        lastStartTimestamp: null,
        lastEndTimestamp: null,
        timeUsed: null,

        status: 'notStarted',
    },
    {
        id: '5',
        priority: 5,
        category: 'Todo List App',
        title: 'Add Today-Todo area',
        content: 'Add Today-Todo area',

        parent: 'root',
        children: ['51',],

        recordingTime: '2022-08-17T06:26:00.970Z',
        expectedRequiredTime: '20',
        startTime: null,
        endTime: null,

        lastStartTimestamp: null,
        lastEndTimestamp: null,
        timeUsed: null,

        status: 'notStarted',
    },
    {
        id: '51',
        priority: 18,
        category: 'Todo List App',
        title: 'Add job to Today-Todo',
        content: 'Add job to Today-Todo',

        parent: '5',
        children: [],

        recordingTime: '2022-08-17T06:26:00.970Z',
        expectedRequiredTime: '20',
        startTime: null,
        endTime: null,

        lastStartTimestamp: null,
        lastEndTimestamp: null,
        timeUsed: null,

        status: 'notStarted',
    },
    {
        id: '6',
        priority: 6,
        category: 'Todo List App',
        title: 'Show NotStarted/Current/Paused/Done/Ignored (can choose multiple option)',
        content: 'Show NotStarted/Current/Paused/Done/Ignored (can choose multiple option)',

        parent: 'root',
        children: [],

        recordingTime: '2022-08-17T06:26:00.970Z',
        expectedRequiredTime: '20',
        startTime: null,
        endTime: null,

        lastStartTimestamp: null,
        lastEndTimestamp: null,
        timeUsed: null,

        status: 'notStarted',
    },
    {
        id: '7',
        priority: 7,
        category: 'Learn Node.js',
        title: 'watch udemy course',
        content: 'watch udemy course',

        parent: 'root',
        children: ['71',],

        recordingTime: '2022-08-17T06:26:00.970Z',
        expectedRequiredTime: '20',
        startTime: null,
        endTime: null,

        lastStartTimestamp: null,
        lastEndTimestamp: null,
        timeUsed: null,

        status: 'notStarted',
    },
    {
        id: '71',
        priority: 19,
        category: 'Learn Node.js',
        title: 'crud',
        content: 'crud',

        parent: '7',
        children: [],

        recordingTime: '2022-08-15T06:26:00.970Z',
        expectedRequiredTime: '20',
        startTime: null,
        endTime: null,

        lastStartTimestamp: null,
        lastEndTimestamp: null,
        timeUsed: null,

        status: 'notStarted',
    },
    {
        id: '8',
        priority: 8,
        category: 'Learn React',
        title: 'read code',
        content: 'read code',

        parent: 'root',
        children: ['81', '82',],

        recordingTime: '2022-08-15T06:26:00.970Z',
        expectedRequiredTime: '20',
        startTime: null,
        endTime: null,

        lastStartTimestamp: null,
        lastEndTimestamp: null,
        timeUsed: null,

        status: 'notStarted',
    },
    {
        id: '81',
        priority: 20,
        category: 'Learn React',
        title: 'find projects with many stars in Github',
        content: 'find projects with many stars in Github',

        parent: '8',
        children: [],

        recordingTime: '2022-08-15T06:26:00.970Z',
        expectedRequiredTime: '20',
        startTime: null,
        endTime: null,

        lastStartTimestamp: null,
        lastEndTimestamp: null,
        timeUsed: null,

        status: 'notStarted',
    },
    {
        id: '82',
        priority: 21,
        category: 'Learn React',
        title: 'find packages with many stars in Github',
        content: 'find packages with many stars in Github',

        parent: '8',
        children: [],

        recordingTime: '2022-08-15T06:26:00.970Z',
        expectedRequiredTime: '20',
        startTime: null,
        endTime: null,

        lastStartTimestamp: null,
        lastEndTimestamp: null,
        timeUsed: null,

        status: 'notStarted',
    },
    {
        id: '9',
        priority: 9,
        category: 'Clothing',
        title: 'find Popular Clothing',
        content: 'find Popular Clothing',

        parent: 'root',
        children: ['91',],

        recordingTime: '2022-08-15T06:26:00.970Z',
        expectedRequiredTime: '20',
        startTime: null,
        endTime: null,

        lastStartTimestamp: null,
        lastEndTimestamp: null,
        timeUsed: null,

        status: 'notStarted',
    },
    {
        id: '91',
        priority: 22,
        category: 'Clothing',
        title: 'Watch videos of famous youtubers',
        content: 'Watch videos of famous youtubers',

        parent: '9',
        children: [],

        recordingTime: '2022-08-15T06:26:00.970Z',
        expectedRequiredTime: '20',
        startTime: null,
        endTime: null,

        lastStartTimestamp: null,
        lastEndTimestamp: null,
        timeUsed: null,

        status: 'notStarted',
    },
    {
        id: '10',
        priority: 10,
        category: 'Clothing',
        title: 'check taobao',
        content: 'check taobao',

        parent: 'root',
        children: [],

        recordingTime: '2022-08-15T06:26:00.970Z',
        expectedRequiredTime: '20',
        startTime: null,
        endTime: null,

        lastStartTimestamp: null,
        lastEndTimestamp: null,
        timeUsed: null,

        status: 'notStarted',
    },
    {
        id: '11',
        priority: 11,
        category: 'Clothing',
        title: 'check clothing shops',
        content: 'check clothing shops',

        parent: 'root',
        children: [],

        recordingTime: '2022-08-16T06:26:00.970Z',
        expectedRequiredTime: '20',
        startTime: null,
        endTime: null,

        lastStartTimestamp: null,
        lastEndTimestamp: null,
        timeUsed: null,

        status: 'notStarted',
    },
    {
        id: '12',
        priority: 12,
        category: 'Clothing',
        title: 'make budget plan',
        content: 'make budget plan',

        parent: 'root',
        children: [],

        recordingTime: '2022-08-17T06:26:00.970Z',
        expectedRequiredTime: '20',
        startTime: null,
        endTime: null,

        lastStartTimestamp: null,
        lastEndTimestamp: null,
        timeUsed: null,

        status: 'notStarted',
    },
]

export const getTodosDemo = () => {
    return todoDemos
}