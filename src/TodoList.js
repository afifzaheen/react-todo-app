import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

// Updated props to include onToggleComplete and onToggleStart
function TodoList({ todos, onDeleteTodo, onEditTodo, onToggleEditMode, onToggleComplete, onToggleStart }) {
  return (
    <ul className="todo-list">
      {todos.length === 0 ? (
        <p className="no-todos-message">No tasks yet! Add some above.</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDeleteTodo={onDeleteTodo}
            onEditTodo={onEditTodo}
            onToggleEditMode={onToggleEditMode}
            onToggleComplete={onToggleComplete} // Pass onToggleComplete
            onToggleStart={onToggleStart}       // Pass onToggleStart
          />
        ))
      )}
    </ul>
  );
}

export default TodoList;