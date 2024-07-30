import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ tasks, expandedTaskId, onToggle, onCheckboxChange, onEdit, onDelete }) {
  return (
    <div className="todo-list-container">
      <ul>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            isExpanded={expandedTaskId === task.id}
            onToggle={onToggle}
            onCheckboxChange={onCheckboxChange}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
