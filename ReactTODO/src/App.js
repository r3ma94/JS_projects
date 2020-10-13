import React, {useState, useEffect} from 'react';
import './App.css';

// Components:

import Form from "./components/Form";
import TodoList from "./components/TodoList";




function App() {


  //States
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);


  
  useEffect(() => {
    let filterHandler = () =>{
      switch(status){
        case "completed":
          setFilteredTodos(todos.filter(todo => todo.completed === true));
          break;
        case "incomplete":
          setFilteredTodos(todos.filter(todo => todo.completed === false));
          break;
        default:
          setFilteredTodos(todos);
          break;
      }
    };
    filterHandler();
  }, [todos, status]);
  //Fs and events

  
  return (
    <div className="App">
      <header>
        <h1>ToDo List</h1>
      </header>
      <Form inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText} setStatus={setStatus} />
      <TodoList setTodos={setTodos} todos={todos} filteredTodos={filteredTodos}/>
      
    </div>
  );
}

export default App;
