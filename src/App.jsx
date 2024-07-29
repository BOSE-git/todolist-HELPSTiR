import { useState } from 'react'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Button from '@mui/material/Button';
import './style.css';
function App() {
  return (
    <>
      <h1>ToDo List</h1>
      <div className="input-container">
        <form>
          <label htmlFor="title">Title</label>
          <input id='title' type="text" placeholder='Title'/>
          <label htmlFor="description">Description</label>
          <input id='description' type="text" placeholder='Description'/>
          <Button startIcon={<ControlPointIcon />}>
          </Button>
        </form>
      </div>

      <div className="todo-list-container">
        <ul>
          <li>
            <p>Title</p>
            <p>Description</p>
            <p>Time Stamp</p>
            <button className='btn edit-bttn'>Edit</button>
            <button className='btn del-btn'>Delete</button>
          </li>
          <li>
            <p>Title</p>
            <p>Description</p>
            <p>Time Stamp</p>
            <button className='btn edit-bttn'>Edit</button>
            <button className='btn del-btn'>Delete</button>
          </li>
          <li>
            <p>Title</p>
            <p>Description</p>
            <p>Time Stamp</p>
            <button className='btn edit-bttn'>Edit</button>
            <button className='btn del-btn'>Delete</button>
          </li>
        </ul>
      </div>
    </>
  )
}

export default App
