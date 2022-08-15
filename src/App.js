import React from 'react';
import { Helmet } from "react-helmet";

import { TodosDemo } from './features/todos/TodosDemo'

function App() {
  return (
    <>
      <Helmet>
        <title>Todo List</title>
      </Helmet>
      <TodosDemo/>
    </>
  );
}

export default App;
