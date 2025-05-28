// Import useState hook for managing the edited text state and local edit mode within the item.
import React, { useState } from 'react';
// Import the CSS for the TodoItem component.
import './TodoItem.css';

// Define the TodoItem functional component.
// It receives the 'todo' object, and functions for delete, edit, and toggling edit mode as props.
function TodoItem({ todo, onDeleteTodo, onEditTodo, onToggleEditMode }) {
  // State to temporarily hold the text being edited.
  // It's initialized with the current todo's text.
  const [editedText, setEditedText] = useState(todo.text);

  // Handler for changes in the edit input field.
  const handleEditChange = (e) => {
    setEditedText(e.target.value); // Update editedText state as user types.
  };

  // Handler for saving the edited text.
  const handleSaveEdit = () => {
    // Check if the edited text is not empty or just whitespace.
    if (editedText.trim()) {
      onEditTodo(todo.id, editedText); // Call parent's edit function with todo ID and new text.
    } else {
      // If the edited text is empty, revert to original text and exit edit mode.
      setEditedText(todo.text);
      onToggleEditMode(todo.id); // Exit edit mode
    }
  };

  // Handler for key presses in the edit input field.
  // Using onKeyDown for better compatibility and control over specific keys.
  const handleKeyDown = (e) => { // Changed function name to handleKeyDown
    if (e.key === 'Enter') {
      handleSaveEdit();
    }
  };

  // This is the array of button configurations, EDIt and Delete button.
  const handleButtons = [
    {
      Label: "Edit",
      onClick: () => onToggleEditMode(todo.id), // Calls parent's toggle edit mode function
      className: "edit-button"
    },
    {
      Label: "Delete",
      onClick: () => onDeleteTodo(todo.id), // Calls parent's delete function
      className: "delete-button"
    }
  ];


  // The component's JSX structure.
  return (
    <li className="todo-item"> {/* List item for a single todo */}
      {/* Conditional rendering: Show input field if in edit mode, otherwise show text and buttons. */}
      {todo.isEditing ? (
        // Render input field when 'isEditing' is true.
        <div className="edit-mode">
          <input
            type="text"
            value={editedText} // Bind input value to editedText state.
            onChange={handleEditChange} // Update state on change.
            onKeyDown={handleKeyDown} // *** Changed from onKeyPress to onKeyDown ***
            autoFocus // Automatically focus the input when it appears.
            className="edit-input" // CSS class for styling.
          />
          <button onClick={handleSaveEdit} className="save-button"> {/* Save button */}
            Save
          </button>
        </div>
      ) : (
        // Render todo text and action buttons when not in edit mode.
        <> {/* React Fragment to group elements without adding an extra DOM node */}
          <span className="todo-text">{todo.text}</span> {/* Display todo text */}
          <div className="todo-buttons"> {/* Container for action buttons */}
            {/* Explicitly declare each button, referencing elements from the handleButtons array */}
            {/* Button 1: Edit */}
            <button
              onClick={handleButtons[0].onClick}
              className={handleButtons[0].className}
            >
              {handleButtons[0].Label}
            </button>

            {/* Button 2: Delete */}
            <button
              onClick={handleButtons[1].onClick}
              className={handleButtons[1].className}
            >
              {handleButtons[1].Label}
            </button>
          </div>
        </>
      )}
    </li>
  );
}

// Export the component for use in other files (e.g., TodoList.js).
export default TodoItem;