import React, { useState, useEffect } from 'react';

function TaskForm({ onSubmit, isEditing, initialTitle = '', initialDesc = '' }) {
  const [title, setTitle] = useState(initialTitle); // State to store the task title
  const [desc, setDesc] = useState(initialDesc); // State to store the task description

  // Update the title and description when the initial values change
  useEffect(() => {
    setTitle(initialTitle);
    setDesc(initialDesc);
  }, [initialTitle, initialDesc]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(title, desc);
    setTitle(''); // Clear the title input after submission
    setDesc(''); // Clear the description input after submission
  };

  return (
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
        <button type="submit">
          {isEditing ? 'Update Task' : 'Add Task'} {/* Button text changes based on editing state */}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
