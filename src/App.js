import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function App() {
  // 1. Initial state is now an empty array.
  //    The loading logic is moved to useEffect.
  const [todos, setTodos] = useState([]);

  // 2. useEffect for loading todos from localStorage (runs only once on mount)
  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    } catch (error) {
      console.error("Failed to load todos from localStorage:", error);
      // If loading fails, state remains empty, or you could set a default empty array.
    }
  }, []); // Empty dependency array ensures this runs only once after the initial render

  // 3. Existing useEffect for saving todos to localStorage (runs whenever 'todos' changes)
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
      isStarted: false,
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

  const toggleStart = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isStarted: !todo.isStarted } : todo
      )
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My To-Do List</h1>
      </header>
      <main>
        <TodoForm onAddTodo={addTodo} />
        <TodoList
          todos={todos}
          onDeleteTodo={deleteTodo}
          onEditTodo={editTodo}
          onToggleEditMode={toggleEditMode}
          onToggleStart={toggleStart}
        />
      </main>
    </div>
  );
}

export default App;