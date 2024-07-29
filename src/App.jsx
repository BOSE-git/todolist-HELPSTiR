import { useState } from "react";
import Button from "@mui/material/Button";
import "./style.css";
import tasks from "./dummy.jsx";
function App() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [taskList, setTaskList] = useState(tasks);
  const [editingTaskId, setEditingTaskId] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (title && desc) {
      if (editingTaskId) {
        const updatedTasks = taskList.map((task) => {
          if (task.id === editingTaskId) {
            return { ...task, title: title, description: desc };
          }
          return task;
        });
        setTaskList(updatedTasks);
        setEditingTaskId(null);
      } else {
        const newTask = {
          id: crypto.randomUUID(),
          title: title,
          description: desc,
          timestamp: new Date().toLocaleString(),
          completed: false,
        };
        setTaskList([...taskList, newTask]);
      }
      setTitle("");
      setDesc("");
    }
  }

  function handleDelete(id) {
    const updatedTasks = taskList.filter((task) => task.id !== id);
    setTaskList(updatedTasks);
  }

  function handleCompleted(id) {
    const updatedTasks = taskList.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTaskList(updatedTasks);
  }

  function handleEdit(task) {
    setEditingTaskId(task.id);
    setTitle(task.title);
    setDesc(task.description);
  }

  return (
    <>
      <h1>ToDo List</h1>
      <div className="input-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <Button type="submit">
            {editingTaskId ? "Update" : "Add Task"}
          </Button>
        </form>
      </div>

      <div className="todo-list-container">
        <ul>
          {taskList.map((task) => (
            <li key={task.id}>
              <span>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleCompleted(task.id)}
                />
                <p>{task.title}</p>
              </span>
              <p>{task.description}</p>
              <p>{task.timestamp}</p>
              <button
                className="btn edit-bttn"
                onClick={() => handleEdit(task)}
              >
                Edit
              </button>
              <button
                className="btn del-btn"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
