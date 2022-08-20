# Todo List

This project is a customized todo-list for my own use. This application is implemented with React.js, Redux, HTML, JS and CSS. Currently, it includes functions of adding to-do tasks, adding subtasks, changing task priority and managing task lifecycle. It will be kept scaling so as to fit my personal needs.

## Demo Webpage
https://paulyaniscoding.github.io/Todo-List/

## Deploy in Local Environment

Run the following commands one by one:<br />
`npm install`<br />
`npm start`

## Responsive Layout
![Responsive Layout](READMEIMG/responsive_layout.png "Responsive Layout")

## Features
### Add Tasks
1.Add Task Category<br />

![Add Category](READMEIMG/AddTasks_AddCategory.png "Add Category")

2.Add Task Content<br />

![Add Content](READMEIMG/AddTasks_AddTaskContent.png "Add Category")

3.Successful!<br />

![Successful!](READMEIMG/AddTasks_Successful.png "Successful!")


### Add Sub-tasks
1.Click the Expand button<br />

![Expand](READMEIMG/AddSubtasks_ClickExpand.png "Expand")

2.Add Sub-task Content<br />

![Add Content](READMEIMG/AddSubtasks_AddTaskContent.png "Add Content")

3.Click the Add Button<br />

![Add Subtask](READMEIMG/AddSubtasks_ClickAdd.png "Add Subtask")

4.Successful!<br />

![Successful!](READMEIMG/AddSubtasks_Successful.png "Successful!")


### Drag to Change Priority
Tasks of same category and same parent task can be sorted by dragging.

![Drag](READMEIMG/ChangePriority_Drags.png "Drag")
![Drop](READMEIMG/ChangePriority_Drop.png "Drop")
![Successful!](READMEIMG/ChangePriority_Successful.png "Successful!")


### Edit Tasks
1.Click the text in the task body<br />

![Click Text](READMEIMG/EditTasks_ClickText.png "Click Text")

A2.Edit and then Click the Update Button<br />

![Edit and Update](READMEIMG/EditTasks_EditAndUpdate.png "Edit and Update")

A3.Successful

![Successful!](READMEIMG/EditTasks_Successful.png "Successful!")

B2.Click the Undo Button to Discard unwanted change

![Undo](READMEIMG/EditTasks_Undo.png "Undo")

B3.Undo Successful

![Undo Successful!](READMEIMG/EditTasks_UndoSuccessful.png "Undo Successful!")


### Manage Task Lifecycle
There are four states in the task lifecycle, which are "Not Started", "WIP", "Paused", and "Done". Action buttons are added for users to update the task status.


![Task Lifecycle](READMEIMG/Lifecycle_Diagram.png "Task Lifecycle")
(Task Lifecycle Diagram)<br /><br />


![Color Prompt](READMEIMG/Lifecycle_ColorPrompt.png "Color Prompt")
(Color Prompt for Different States)
