import React from "react";

let Todo = ({text, todo, todos, setTodos}) => {
    // Events
    let deleteHandler = () => {
        setTodos(todos.filter((el) => el.id !== todo.id)); // match clicked elements by ID and delete
    };
    let completeHandler = () => {
        setTodos(todos.map(item => {
            if(item.id === todo.id){
                return {
                    ...item, completed: !item.completed
                };
            }

            return item;
            
            
        } )
        );
    };
    return(
        <div className="todo">
            <li className={`todo-item ${todo.completed ? "completed" : ""/* manipulate css by checking state */}` }>{text}</li>
            <button onClick={completeHandler}className="complete-btn"><i className="fas fa-check"></i></button>
            <button onClick={deleteHandler} className="trash-btn"><i className="fas fa-trash"></i></button>
        </div>    
    );
};


export default Todo;