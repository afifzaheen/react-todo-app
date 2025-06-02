import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({
  todos = [], 
  onDeleteTodo = () => {}, // params added
  onEditTodo = () => {}, 
  onToggleEditMode = () => {},
  onToggleStart = () => {} 
}) {
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
            onToggleStart={onToggleStart}
            // Note: onToggleComplete is a prop here, but not passed to TodoItem in current structure.
            // If you add a "Complete" button to TodoItem, you'd pass it like others.
          />
        ))
      )}
    </ul>
  );
}

export default TodoList;