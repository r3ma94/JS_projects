import React from "react";



let Form = ({setInputText, todos, setTodos, inputText, setStatus}) => {

    // 
    let inputTextHandler = (e) => {
        //console.log(e.target.value);
        setInputText(e.target.value);
    };

    let submitTodoHandler = (e) => {
        e.preventDefault();
        setTodos([
            ...todos, 
            {text: inputText, completed: false, id: Math.random() * 1000 }, // no package just a random number
        ]);
        setInputText("");

    };

    let statusHandler = (e) => {
        setStatus(e.target.value);
    }


    return(
    <form>
      <input value = {inputText} onChange={inputTextHandler} type="text" className="todo-input" /> 
      <button className="todo-button" type="submit" onClick={submitTodoHandler}>
        <i className="fas fa-plus-square"></i>
      </button>
      <div className="select">
        <select onChange={statusHandler} name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
    </form>
    );
};


export default Form;