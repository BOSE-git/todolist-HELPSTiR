import React from 'react';

function TodoItem({ task, isExpanded, onToggle, onCheckboxChange, onEdit, onDelete }) {
  return (
    <li className="todo-item" onClick={() => onToggle(task.id)}>
      <div className="todo-item-contents">
        <span>
          <input
            type="checkbox"
            checked={task.completed} // Checkbox checked state
            onChange={() => onCheckboxChange(task.id)} // Handle checkbox change
          />
          <p>{task.title}</p> {/* Display task title */}
        </span>
        {isExpanded && (
          <>
            <p>{task.description}</p> {/* Display task description if expanded */}
            <p>{task.timestamp}</p> {/* Display task timestamp if expanded */}
          </>
        )}
      </div>
      <div className="list-btn-container">
        <button
          className="btn edit-bttn"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task); // Handle edit button click
          }}
        >
          Edit
        </button>
        <button
          className="btn del-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id); // Handle delete button click
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
