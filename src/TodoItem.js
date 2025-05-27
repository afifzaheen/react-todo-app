import React, { useState } from 'react';
import './TodoItem.css'; // Import the CSS for this component

function TodoItem({ todo, onDeleteTodo, onEditTodo, onToggleEditMode }) {
  // State to hold the text while editing
  const [editedText, setEditedText] = useState(todo.text);

  const handleEditChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleSaveEdit = () => {
    if (editedText.trim()) { // Ensure the edited text is not empty
      onEditTodo(todo.id, editedText); // Call parent function to update todo
    } else {
      // If text is empty after editing, revert to original and exit edit mode
      setEditedText(todo.text);
      onToggleEditMode(todo.id);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    }
  };

  return (
    <li className="todo-item">
      {todo.isEditing ? (
        // Render input field when in edit mode
        <div className="edit-mode">
          <input
            type="text"
            value={editedText}
            onChange={handleEditChange}
            onKeyPress={handleKeyPress} // Allow saving with Enter key
            autoFocus // Automatically focus the input when it appears
            className="edit-input"
          />
          <button onClick={handleSaveEdit} className="save-button">
            Save
          </button>
        </div>
      ) : (
        // Render text and buttons when not in edit mode
        <>
          <span className="todo-text">{todo.text}</span>
          <div className="todo-buttons">
            <button onClick={() => onToggleEditMode(todo.id)} className="edit-button">
              Edit
            </button>
            <button onClick={() => onDeleteTodo(todo.id)} className="delete-button">
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;