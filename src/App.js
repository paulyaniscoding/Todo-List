import React from 'react';
import './App.css';
import { AddtodoForm } from './features/todos/AddTodoForm';

import { TodosList } from './features/todos/TodosList'

function App() {
  return (
    <>
      <AddtodoForm/>
      <TodosList />
    </>
  );
}

export default App;
