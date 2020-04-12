// Selectors
let todoInput = document.querySelector(".todo-input");
let todoButton = document.querySelector(".todo-button");
let todoList = document.querySelector(".todo-list");


// Events
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

// Functions

function addTodo(event){
    event.preventDefault();
    //console.log("Hello!");
    // Creating ToDO div
    let todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Creating list items
    let newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // Creating "task completed" button
    let completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-button");
    todoDiv.appendChild(completedButton);
     // Creating delete button
    let trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-button");
    todoDiv.appendChild(trashButton);
    // Appending to list
    todoList.appendChild(todoDiv);

    // Clearing the input value

    todoInput.value = "";
};

function deleteCheck(event){
    let item = event.target;
    // Deleting todo
    if(item.classList[0] === "trash-button"){
        let todo = item.parentElement;
        todo.remove();
    }
    
    // Check
    if(item.classList[0] === "complete.button"){
        let todo = item.parentElement;
        todo.classList.toggle("completed");
    }
};