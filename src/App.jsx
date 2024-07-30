import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css';
import tasksData from './dummy.jsx';

function App() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [taskList, setTaskList] = useState(tasksData);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  // Parse query parameters
  function useQuery() {
    return new URLSearchParams(location.search);
  }

  const query = useQuery();
  const searchQuery = query.get('search') || '';

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  // Filter tasks based on search query
  const filteredTasks = taskList.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (title && desc) {
      if (isEditing) {
        const updatedTaskList = taskList.map(task =>
          task.id === currentTaskId ? { ...task, title, description: desc, timestamp: new Date().toLocaleString() } : task
        );
        setTaskList(updatedTaskList);
        setIsEditing(false);
        setCurrentTaskId(null);
      } else {
        const newTask = {
          id: crypto.randomUUID(),
          title: title,
          description: desc,
          timestamp: new Date().toLocaleString(),
          completed: false
        };

        setTaskList([...taskList, newTask]);
      }
      setTitle('');
      setDesc('');
      console.log(taskList);
    }
  }

  function handleEdit(task) {
    setIsEditing(true);
    setCurrentTaskId(task.id);
    setTitle(task.title);
    setDesc(task.description);
  }

  function handleDelete(taskId) {
    const updatedTaskList = taskList.filter(task => task.id !== taskId);
    setTaskList(updatedTaskList);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    navigate(`/?search=${searchInput}`);
  }

  function handleCheckboxChange(taskId) {
    const updatedTaskList = taskList.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTaskList(updatedTaskList);
  }

  return (
    <>
      <h1>ToDo List</h1>
      <div className="input-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input id='title' type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="description">Description</label>
          <input id='description' type="text" placeholder='Description' value={desc} onChange={(e) => setDesc(e.target.value)} />
          <button type='submit'>
            {isEditing ? 'Update Task' : 'Add Task'}
          </button>
        </form>
      </div>

      <div className="search-container">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit">Search</button>
          <button type="button" onClick={() => { setSearchInput(''); navigate('/'); }}>Clear</button>
        </form>
      </div>

      <div className="todo-list-container">
        <ul>
          {filteredTasks.map(task => (
            <li key={task.id}>
            <span>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCheckboxChange(task.id)}
              />
              <p>{task.title}</p>
            </span>
              
              <p>{task.description}</p>
              <p>{task.timestamp}</p>
              <button className='btn edit-bttn' onClick={() => handleEdit(task)}>Edit</button>
              <button className='btn del-btn' onClick={() => handleDelete(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
