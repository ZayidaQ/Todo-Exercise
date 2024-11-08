// Select elements from the HTML
const form = document.querySelector("#add-todo");
const input = document.querySelector("#new-todo");
const todoList = document.querySelector("#todo-list");

// Save the list of todos to localStorage
function saveTodos() {
  // Get each todo item as an object with text and completion status
  const todos = Array.from(todoList.children).map((todo) => ({
    text: todo.firstChild.textContent,
    completed: todo.classList.contains("finishedTask"),
  }));
  // Store the todos array as a JSON string in localStorage
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Load todos from localStorage when the page loads
function loadTodos() {
  // Get todos from localStorage, or use an empty array if none exist
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  // Add each stored todo to the list
  todos.forEach((todoData) => addTodoToList(todoData.text, todoData.completed));
}

// Helper function to create a todo item and add it to the list
function addTodoToList(text, completed = false) {
  // Create a new list item and button for each todo
  const newTodo = document.createElement("li");
  newTodo.innerText = text;
  // Add 'finishedTask' class if the todo was marked complete
  if (completed) newTodo.classList.add("finishedTask");

  const removeBtn = document.createElement("button");
  removeBtn.innerText = "Remove";
  newTodo.appendChild(removeBtn);
  todoList.appendChild(newTodo);
}

// Load todos from localStorage when the page loads
document.addEventListener("DOMContentLoaded", loadTodos);

// Add new todo on form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const todoText = input.value.trim();
  if (todoText) {
    addTodoToList(todoText);
    input.value = ""; // Clear the input
    saveTodos(); // Save to localStorage
  }
});

// Handle clicks on the todo list for removing or toggling todos
todoList.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    // If 'Remove' button is clicked, remove the todo
    e.target.parentElement.remove();
    saveTodos(); // Save the updated list
  } else if (e.target.tagName === "LI") {
    // If a todo item (li) is clicked, toggle the completed state
    e.target.classList.toggle("finishedTask");
    saveTodos(); // Save the updated list
  }
});
