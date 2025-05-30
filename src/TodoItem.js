import React, { useState } from 'react';
import './TodoItem.css';

// Updated props: Removed onToggleComplete, kept onToggleStart
function TodoItem({
  todo,
  onDeleteTodo,
  onEditTodo,
  onToggleEditMode,
  onToggleStart // KEPT: For the 'Start' button's actual function
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


  // Placeholder function for the 'Start' button
  const handleStartButtonClick = () => {
    console.log(`Todo "${todo.text}" (ID: ${todo.id}) is now started!`);
    // This calls the actual onToggleStart function defined in App.js.
    // If you just wanted a local alert and no state update, you could remove the line below:
    onToggleStart(todo.id);
    alert(`Starting: ${todo.text}`); // Example: show an alert
  };


  // This is the array of button configurations (Edit, Delete, Start).
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
      // Using the local placeholder function for the 'Start' button's immediate action
      // This function then calls the prop function (onToggleStart) to update App.js state.
      onClick: handleStartButtonClick,
      className: "start-button"
    }
  ];

  return (
    // Removed conditional 'completed' class. Added 'started' class based on todo.isStarted.
    <li className={`todo-item ${todo.isStarted ? 'started' : ''}`}>
      {todo.isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editedText}
            onChange={handleEditChange}
            onKeyDown={handleKeyDown}
            onBlur={handleSaveEdit} // Auto-save when input loses focus.
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
          <div className="todo-buttons">
            {/* Using .map() to dynamically render buttons from the handleButtons array */}
            {handleButtons.map((eachButton, index) => {
              return (
                <button
                  key={index} // Essential for lists in React.
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