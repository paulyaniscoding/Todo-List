import React from 'react';

//import './App.css';
import { AddtodoForm } from './features/todos/AddTodoForm';

//import {TodoDemo} from './features/utility/Sortable/Sortable'
import { TodosDemo } from './features/todos/TodosDemo'

function App() {
  return (
    <>
      <AddtodoForm parentId={'root'}/>
      <TodosDemo/>
      {/*<TodosList />*/}
    </>
  );
}

export default App;
