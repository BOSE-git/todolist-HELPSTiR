import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css';
import tasksData from './dummy.jsx';
import TaskForm from './components/TaskForm.jsx';
import SearchBar from './components/SearchBar.jsx';
import TodoList from './components/TodoList.jsx';

function App() {
  // State to manage the list of tasks
  const [taskList, setTaskList] = useState(() => {
    const localValue = localStorage.getItem('ITEMS');
    return localValue ? JSON.parse(localValue) : tasksData;
  });
  const [isEditing, setIsEditing] = useState(false); // State to track if a task is being edited
  const [currentTaskId, setCurrentTaskId] = useState(null); // State to store the id of the current task being edited
  const [searchInput, setSearchInput] = useState(''); // State to store the search input
  const [expandedTaskId, setExpandedTaskId] = useState(null); // State to manage which task is expanded

  const location = useLocation(); // Hook to get the current location
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Save taskList to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('ITEMS', JSON.stringify(taskList));
  }, [taskList]);

  // Function to get query parameters from the URL
  function useQuery() {
    return new URLSearchParams(location.search);
  }

  const query = useQuery(); // Get query parameters
  const searchQuery = query.get('search') || ''; // Get the search query from the URL

  // Set the search input whenever the search query changes
  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  // Filter tasks based on the search query
  const filteredTasks = taskList.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle task submission for adding and updating tasks
  const handleTaskSubmit = (title, desc) => {
    if (title && desc) {
      if (isEditing) {
        const updatedTaskList = taskList.map((task) =>
          task.id === currentTaskId
            ? {
                ...task,
                title,
                description: desc,
                timestamp: new Date().toLocaleString(),
              }
            : task
        );
        setTaskList(updatedTaskList);
        setIsEditing(false);
        setCurrentTaskId(null);
      } else {
        const newTask = {
          id: crypto.randomUUID(),
          title,
          description: desc,
          timestamp: new Date().toLocaleString(),
          completed: false,
        };
        setTaskList([...taskList, newTask]);
      }
    }
  };

  // Set the task to be edited
  const handleEdit = (task) => {
    setIsEditing(true);
    setCurrentTaskId(task.id);
  };

  // Handle task deletion
  const handleDelete = (taskId) => {
    const updatedTaskList = taskList.filter((task) => task.id !== taskId);
    setTaskList(updatedTaskList);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/?search=${searchInput}`);
  };

  // Toggle task completion
  const handleCheckboxChange = (taskId) => {
    const updatedTaskList = taskList.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTaskList(updatedTaskList);
  };

  // Toggle task expansion
  const toggleDropDown = (taskId) => {
    setExpandedTaskId((prevId) => (prevId === taskId ? null : taskId));
  };

  return (
    <>
      <h1>ToDo List</h1>
      <TaskForm
        onSubmit={handleTaskSubmit}
        isEditing={isEditing}
        initialTitle={isEditing ? taskList.find((task) => task.id === currentTaskId)?.title : ''}
        initialDesc={isEditing ? taskList.find((task) => task.id === currentTaskId)?.description : ''}
      />
      <SearchBar
        searchInput={searchInput}
        onSearchChange={setSearchInput}
        onSearchSubmit={handleSearchSubmit}
        onClear={() => {
          setSearchInput('');
          navigate('/');
        }}
      />
      <TodoList
        tasks={filteredTasks}
        expandedTaskId={expandedTaskId}
        onToggle={toggleDropDown}
        onCheckboxChange={handleCheckboxChange}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
}

export default App;
