import React, { useState } from 'react';
import './TodoItem.css';

function TodoItem({
  todo, // NOTE: No default here. This is essential data for the component.
  onDeleteTodo = () => {},      // Default parameter added 
  onEditTodo = () => {},        // Default parameter added
  onToggleEditMode = () => {},  // Default parameter added 
  onToggleStart = () => {},     // Default parameter added
  priority = 'Low'              // Existing default parameter
}) {
  const [editedText, setEditedText] = useState(todo.text);

  const handleEditChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleSaveEdit = () => {
    if (editedText.trim()) {
      onEditTodo(todo.id, editedText);
    } else {
      setEditedText(todo.text);
      onToggleEditMode(todo.id);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    }
  };

  const handleStartButtonClick = () => {
    console.log(`Todo "${todo.text}" (ID: ${todo.id}) is now started!`);
    onToggleStart(todo.id); // This will call the provided function, or the default empty one
    alert(`Starting: ${todo.text}`);
  };

  const handleButtons = [
    {
      Label: "Edit",
      onClick: () => onToggleEditMode(todo.id),
      className: "edit-button"
    },
    {
      Label: "Delete",
      onClick: () => onDeleteTodo(todo.id),
      className: "delete-button"
    },
    {
      Label: "Start",
      onClick: handleStartButtonClick,
      className: "start-button"
    }
  ];

  return (
    <li className={`todo-item ${todo.isStarted ? 'started' : ''}`}>
      {todo.isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editedText}
            onChange={handleEditChange}
            onKeyDown={handleKeyDown}
            onBlur={handleSaveEdit}
            autoFocus
            className="edit-input"
          />
          <button onClick={handleSaveEdit} className="save-button">
            Save
          </button>
        </div>
      ) : (
        <>
          <span className="todo-text">{todo.text}</span>
          <span className="todo-priority">({priority} Priority)</span>
          <div className="todo-buttons">
            {handleButtons.map((eachButton) => {
              return (
                <button
                  key={eachButton.Label}
                  onClick={eachButton.onClick}
                  className={eachButton.className}
                >
                  {eachButton.Label}
                </button>
              );
            })}
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;