
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
        children: ['1', '2', '3',],
    },
    {
        id: '1',
        category: 'JS Syntax',
        title: '睇 js class',
        content: '睇 js class',

        parent: 'root',
        children: ['11', '12',],

        recordingTime: '2022-07-12T06:26:00.970Z',
        expectedRequiredTime: '20',
        startTime: null,
        endTime: null,

        lastStartTimestamp: null,
        lastEndTimestamp: null,
        timeUsed: null,

        status: 'notStarted',
        //dependsOn: [],
        //dependedBy: ['2']
    },
    {
        id: '11',
        category: 'JS Syntax',
        title: '睇 js prototype',
        content: '睇 js prototype',

        parent: '1',
        children: [],

        recordingTime: '2022-07-12T06:26:00.970Z',
        expectedRequiredTime: '20',
        startTime: null,
        endTime: null,

        lastStartTimestamp: null,
        lastEndTimestamp: null,
        timeUsed: null,

        status: 'notStarted',
        //dependsOn: [],
        //dependedBy: ['2']
    },
    {
        id: '12',
        category: 'JS Syntax',
        title: '睇 js Object Literal',
        content: '睇 js Object Literal',

        parent: '1',
        children: [],

        recordingTime: '2022-07-12T06:26:00.970Z',
        expectedRequiredTime: '20',
        startTime: null,
        endTime: null,

        lastStartTimestamp: null,
        lastEndTimestamp: null,
        timeUsed: null,

        status: 'notStarted',
        //dependsOn: [],
        //dependedBy: ['2']
    },
    {
        id: '2',
        category: 'Redux',
        title: '補睇redux 官網tutorial 前兩篇',
        content: '補睇redux 官網tutorial 前兩篇',

        parent: 'root',
        children: [],

        recordingTime: '2022-07-12T06:26:00.970Z',
        expectedRequiredTime: '48',
        startTime: null,
        endTime: null,

        lastStartTimestamp: null,
        lastEndTimestamp: null,
        timeUsed: null,

        status: 'notStarted',
        //dependsOn: [],
        //dependedBy: ['2']
    },
    {
        id: '3',
        category: 'Git',
        title: '睇git, 整github, 唔洗睇得太齊, 夠開proj, 存到檔就得',
        content: '睇git, 整github, 唔洗睇得太齊, 夠開proj, 存到檔就得',

        parent: 'root',
        children: [],

        recordingTime: '2022-07-12T06:26:00.970Z',
        expectedRequiredTime: '20',
        startTime: null,
        endTime: null,

        lastStartTimestamp: null,
        lastEndTimestamp: null,
        timeUsed: null,

        status: 'notStarted',
        //dependsOn: [],
        //dependedBy: ['2']
    },
]

export const getTodosDemo = () => {
    return todoDemos
}