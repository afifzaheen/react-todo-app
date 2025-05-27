import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css'; // Import the CSS for this component

function TodoList({ todos, onDeleteTodo, onEditTodo, onToggleEditMode }) {
  return (
    <ul className="todo-list">
      {todos.length === 0 ? (
        <p className="no-todos-message">No tasks yet! Add some above.</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id} // Important for React list rendering performance
            todo={todo}
            onDeleteTodo={onDeleteTodo}
            onEditTodo={onEditTodo}
            onToggleEditMode={onToggleEditMode}
          />
        ))
      )}
    </ul>
  );
}

export default TodoList;