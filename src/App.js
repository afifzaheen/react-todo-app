import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem('todos');
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error("Failed to load todos from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error("Failed to save todos to localStorage:", error);
    }
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      isEditing: false,
      isCompleted: false, // NEW: Default to not completed
      isStarted: false,   // NEW: Default to not started
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
      )
    );
  };

  const toggleEditMode = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  // NEW FUNCTION: Toggles the completion status of a todo
  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        // If it's the right todo, flip its isCompleted status.
        // Also, if it's being completed, ensure it's not in edit mode.
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted, isEditing: false } : todo
      )
    );
  };

  // NEW FUNCTION: Toggles the started status of a todo
  const toggleStart = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        // If it's the right todo, flip its isStarted status.
        // You might want to add logic here: e.g., if started, it cannot be completed, etc.
        todo.id === id ? { ...todo, isStarted: !todo.isStarted } : todo
      )
    );
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>My Sleek To-Do App</h1>
      </header>
      <main>
        <TodoForm onAddTodo={addTodo} />
        <TodoList
          todos={todos}
          onDeleteTodo={deleteTodo}
          onEditTodo={editTodo}
          onToggleEditMode={toggleEditMode}
          onToggleComplete={toggleComplete} // Pass the new toggleComplete function
          onToggleStart={toggleStart}       // Pass the new toggleStart function
        />
      </main>
    </div>
  );
}

export default App;