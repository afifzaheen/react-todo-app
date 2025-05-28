import React, { useState } from 'react';
import './TodoForm.css'; // Import the CSS for this component

function TodoForm({ onAddTodo }) {
  const [newTodoText, setNewTodoText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission (page reload)
    if (!!newTodoText) { // Ensure the input is not empty or just whitespace
      onAddTodo(newTodoText); // Call the function passed from App to add the todo
      setNewTodoText(''); // Clear the input field after adding
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Add a new task..."
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        className="todo-input"
      />
      <button type="submit" className="add-button">
        Add To-Do
      </button>
    </form>
  );
}

export default TodoForm;