import { useState } from 'react'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Button from '@mui/material/Button';
import './style.css';
import tasks from './dummy.jsx'
function App() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [taskList, setTaskList] = useState(tasks);
  const [isCompleted, setIsCompleted] = useState(false);

  function handleSubmit(e){
    e.preventDefault();
    if(title && desc){
      const newTask = {
        id: crypto.randomUUID(),
        title: title,
        description: desc,
        timestamp: new Date().toLocaleString(),
        completed: false
      };

      setTaskList([...taskList, newTask]);
      setTitle('');
      setDesc('');
      console.log(taskList);
    }
  }

  function handleDelete(id){
    const updatedTasks = taskList.filter(task => task.id !== id);
    setTaskList(updatedTasks);
  }

  function handleCompleted(id){
    const updatedTasks = taskList.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTaskList(updatedTasks);
  }

  return (
    <>
      <h1>ToDo List</h1>
      <div className="input-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input id='title' type="text" placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
          <label htmlFor="description">Description</label>
          <input id='description' type="text" placeholder='Description' value={desc} onChange={(e)=>setDesc(e.target.value)}/>
          <Button type='submit' startIcon={<ControlPointIcon />}>
          </Button>        
        </form>
      </div>

      <div className="todo-list-container">
        <ul>
        {taskList.map(task => (
          <li key={task.id}>
            <span>
              <input type="checkbox" onChange={() => handleCompleted(task.id)}/>
              <p>{task.title}</p>
            </span>
            <p>{task.description}</p>
            <p>{task.timestamp}</p>
            <button className='btn edit-bttn'>Edit</button>
            <button className='btn del-btn' onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
          
        </ul>
      </div>
    </>
  )
}

export default App
