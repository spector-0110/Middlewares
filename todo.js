const express = require("express");
const fs = require("fs");
const path= require("path");
const app = express();
app.use(express.json());




const DATA_FILE = 'todos.json';

// Load todos from the JSON file
function loadTodos() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

// Save todos to the JSON file
function saveTodos(todos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}

// GET /todos/:task - Get a specific todo or all todos
app.get('/todos/:task', (req, res) => {
  const taskName = req.params.task;
  const todos = loadTodos();

  if (taskName.toLowerCase() === "all") {
    return res.status(200).json(todos);
  }

  const todo = todos.find(t => t.task.toLowerCase() === taskName.toLowerCase());
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  res.status(200).json(todo);
});

// GET /todos/status/:status - Filter todos by status
app.get('/todos/status/:status', (req, res) => {
  const { status } = req.params;
  const todos = loadTodos();
  const filtered = todos.filter(t => t.status === status);
  res.status(200).json(filtered);
});

// POST /todo - Add a new todo
app.post('/todo', (req, res) => {
  const todos = loadTodos();
  const { task } = req.body;

  if (!task) return res.status(400).json({ error: "Task is required" });

  if (todos.some(t => t.task.toLowerCase() === task.toLowerCase())) {
    return res.status(400).json({ error: "Task already exists" });
  }

  const newTodo = { task, status: 'pending' };
  todos.push(newTodo);
  saveTodos(todos);

  res.status(201).json(newTodo);
});

// PATCH /update - Update todo status by task name
app.patch('/update', (req, res) => {
  const { task, status } = req.body;

  if (!task) return res.status(400).json({ error: "Task name is required" });

  const todos = loadTodos();
  const todo = todos.find(t => t.task.toLowerCase() === task.toLowerCase());

  if (!todo) return res.status(404).json({ error: "Todo not found" });

  if (status) todo.status = status;
  saveTodos(todos);

  res.status(200).json(todo);
});

// DELETE /todos/:task - Delete a todo by task name
app.delete('/todos/:task', (req, res) => {
  const taskName = req.params.task;
  let todos = loadTodos();

  const index = todos.findIndex(t => t.task.toLowerCase() === taskName.toLowerCase());
  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  const deleted = todos.splice(index, 1);
  saveTodos(todos);

  res.status(200).json({ message: "Todo deleted successfully", deleted: deleted[0] });
});

// DELETE /todos - Clear all todos
app.delete('/allTodos', (req, res) => {
  saveTodos([]);
  res.status(200).json({ message: "All todos cleared" });
});

app.get('/download' ,(req,res) =>{
  const filePath = path.join(__dirname, "todos.json");
  res.status(200).download(filePath);
  
})


app.listen(3000, () => {
  console.log("✅ Server is running at http://localhost:3000");
});
