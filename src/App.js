import React from 'react';
import { Helmet } from "react-helmet";

//import './App.css';
import { AddtodoForm } from './features/todos/AddTodoForm';

//import {TodoDemo} from './features/utility/Sortable/Sortable'
import { TodosDemo } from './features/todos/TodosDemo'

function App() {
  return (
    <>
      <Helmet>
        <title>Todo List</title>
      </Helmet>
      <AddtodoForm parentId={'root'}/>
      <TodosDemo/>
      {/*<TodosList />*/}
    </>
  );
}

export default App;
