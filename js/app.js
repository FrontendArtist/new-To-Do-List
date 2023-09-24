const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const editButton = document.getElementById("edit-button")
const deleteAll = document.getElementById("delete-all");
const tasksBody = document.querySelector("tbody");
const alertMessage = document.getElementById("alert");
const todoFilter = document.querySelectorAll(".todo-filter")
let todos = JSON.parse(localStorage.getItem("savedtodos")) || [];


console.log(todoFilter);
const deleteAllHandler = () => {
  todos = [];
  saveToLocalStorage();
  displayTodos();
  showAlert("all tasks deleted successfully!", "success")
};

const displayTodos = () => {
  tasksBody.innerHTML = "";
  if (!todos.length) {
    tasksBody.innerHTML = "<tr><td colspan='4'>no task found!</td></tr>";
    return;
  }
  todos.forEach((todo) => {
    tasksBody.innerHTML += `
    <tr>
        <td>${todo.task}</td>
        <td>${todo.date || "No Date"}</td>
        <td>${todo.completed ? "Completed" : "Pending"}</td>
        <td>
        <button onclick="editHandler(${todo.id})">Edit</button>
        <button onclick="toggleHandler(${todo.id})">${todo.completed?"Undo":"Do"}</button>
        <button onclick="deleteHandler(${todo.id})">Delete</button>
        </td>
    </tr>
   `;
  });
};

const saveToLocalStorage = () => {
  localStorage.setItem("savedtodos", JSON.stringify(todos));
};

const generateId = () => {
  const id = Math.round(
    Math.random() * Math.random() * Math.pow(10, 15).toString()
  );
  return id;
};

const showAlert = (message, type) => {
  alertMessage.innerHTML = "";
  const alert = document.createElement("p");
  alert.innerText = message;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alertMessage.appendChild(alert);
  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};

const addHandler = () => {
  const task = taskInput.value;
  const date = dateInput.value;
  const todo = {
    id: generateId(),
    task,
    date,
    completed: false,
  };
  if (task) {
    todos.push(todo);
    saveToLocalStorage();
    displayTodos();
    console.log(todos);
    taskInput.value = "";
    dateInput.value = "";
    showAlert("todo added succesfully", "success");
  } else {
    showAlert("please enter a todo", "error");
  }
};

const deleteHandler = (id) => {
    const newTodos = todos.filter((todo) => todo.id!==id)
    todos=newTodos;
    displayTodos()
    saveToLocalStorage()
    showAlert("task deleted" , "success")
}
const toggleHandler = (id) => {

const todo = todos.find(todo => todo.id === id)
todo.completed = !todo.completed
  displayTodos()
  saveToLocalStorage()
  
}
const editHandler = (id) => {
  const todo = todos.find(todo =>  todo.id === id)
  taskInput.value = todo.task;
  dateInput.value = todo.date;
  addButton.style.display = "none"
  editButton.style.display ="inline-block"
  editButton.dataset.id = id;

}
const applyEditHandler = event =>{
  id =+event.target.dataset.id;
  console.log(id);
  const todo = todos.find((todo) => todo.id === id)

   todo.task = taskInput.value;
   todo.date = dateInput.value;
   editButton.style.display="none";
   addButton.style.display="inline-block";
   displayTodos()
  saveToLocalStorage()
  showAlert("task edited successfully!")

}
const filterHandler = (event) => {
  

  let newTasks = {}
  const filter = event.target.dataset.filter;
  newTasks = todos.filter(item => {
    console.log(item);
    switch (filter) {
      case "all":
        return item ;
        
        case "pending" : 
       return item.completed === false;
        
       break;
        case "completed" : 
       return item.completed === true;
       break;
        default:
        break;
    }
  })
  todos = newTasks;
  displayTodos()
  todos = JSON.parse(localStorage.getItem("savedtodos")) 
  
}
window.addEventListener("load", displayTodos);
addButton.addEventListener("click", addHandler);
deleteAll.addEventListener("click", deleteAllHandler);
editButton.addEventListener("click", applyEditHandler);
todoFilter.forEach(item => {item.addEventListener("click" , filterHandler)})