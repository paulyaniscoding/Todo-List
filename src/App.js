import React from 'react';
import './App.css';
import { AddtodoForm } from './features/todos/AddTodoForm';

import { TodosList } from './features/todos/TodosList'
//import {TodoDemo} from './features/utility/Sortable/Sortable'
import { TodosDemo } from './features/todos/TodosDemo'


function App() {
  return (
    <>
      <AddtodoForm parentId={'1'}/>
      <TodosDemo/>
      {/*<TodosList />*/}
    </>
  );
}

export default App;
