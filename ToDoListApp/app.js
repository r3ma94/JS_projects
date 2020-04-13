// Selectors
let todoInput = document.querySelector(".todo-input");
let todoButton = document.querySelector(".todo-button");
let todoList = document.querySelector(".todo-list");
let filterOption = document.querySelector(".filter-todo");


// Events
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

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
        // Add animation style
        todo.classList.add("fall");
        // Remove the element after ending the style transition
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });
    }    
    // Check
    if(item.classList[0] === "complete-button"){
        let todo = item.parentElement;
        todo.classList.toggle("completed");
    }

};

function filterTodo(event){
    let todos = todoList.childNodes;
    //console.log(todos);
    todos.forEach(function(todo) {
        switch(event.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}