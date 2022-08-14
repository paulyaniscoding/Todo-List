import React from 'react';
import { Helmet } from "react-helmet";

//import './App.css';
import { AddTodoForm, } from './features/todos/AddTodoForm/AddTodoForm';
import { AddTodoFormLayout, } from './features/todos/AddTodoForm/AddTodoFormLayout';

//import {TodoDemo} from './features/utility/Sortable/Sortable'
import { TodosDemo } from './features/todos/TodosDemo'

function App() {
  return (
    <>
      <Helmet>
        <title>Todo List</title>
      </Helmet>
      <TodosDemo/>
      {/*<TodosList />*/}
    </>
  );
}

export default App;
