import { useState } from 'react'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Button from '@mui/material/Button';
import './style.css';
import tasks from './dummy.jsx'
function App() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [taskList, setTaskList] = useState(tasks);

  function handleSubmit(e){
    e.preventDefault();
    if(title && desc){
      const newTask = {
        title: title,
        description: desc,
        timestamp: new Date().toLocaleString()
      };

      setTaskList([...taskList, newTask]);
      setTitle('');
      setDesc('');
      console.log(taskList);
    }
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
            <p>{task.title}</p>
            <p>{task.description}</p>
            <p>{task.timestamp}</p>
            <button className='btn edit-bttn'>Edit</button>
            <button className='btn del-btn'>Delete</button>
          </li>
        ))}
          
        </ul>
      </div>
    </>
  )
}

export default App
