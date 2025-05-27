import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import './App.css'; // Main application styling

function App() {
  // State to store the array of todo objects
  const [todos, setTodos] = useState([]);

  // Function to add a new todo
  const addTodo = (text) => {
     // Create a new todo object with a unique ID (using Date.now() for simplicity),
    // the provided text, and an 'isEditing' flag set to false initially.
    const newTodo = {
      id: Date.now(), // Generate a unique ID (simple for this app)
      text: text,
      isEditing: false, // Flag to control edit mode for this specific todo
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]); // Add new todo to the array
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)); // Filter out the todo to be deleted
  };

  // Function to edit a todo's text
  const editTodo = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText, isEditing: false } : todo // Update text and exit edit mode
      )
    );
  };

  // Function to toggle the isEditing state for a specific todo
  const toggleEditMode = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo // Toggle isEditing
      )
    );
  };

  return (
    <div className="App">
      <div className="todo-container">
        <h1>My To-Do List</h1>
        <TodoForm onAddTodo={addTodo} /> {/* Pass addTodo function as prop */}
        <TodoList
          todos={todos} // Pass the todos array
          onDeleteTodo={deleteTodo} // Pass deleteTodo function
          onEditTodo={editTodo} // Pass editTodo function
          onToggleEditMode={toggleEditMode} // Pass toggleEditMode function
        />
      </div>
    </div>
  );
}

export default App;