import React from 'react'
import AddTodo from './AddTodo'
import TodoItem from './TodoItem'

export default function TodoList({ todos, onAdd, onUpdate, onDelete }) {
  // server returns an array of todo documents; each document may contain user_todos array
  const entries = todos.flatMap(doc => (doc.user_todos || []).map(t => ({ ...t, parentId: doc._id })))

  return (
    <div className="card">
      <div className="list-header">
        <h2>Your Todos</h2>
        <AddTodo onAdd={onAdd} />
      </div>
      <div className="todo-grid">
        {entries.length === 0 && <div className="empty">No todos yet — add one!</div>}
        {entries.map(t => (
          <TodoItem key={t._id} todo={t} parentId={t.parentId} onUpdate={onUpdate} onDelete={onDelete} />
        ))}
      </div>
    </div>
  )
}
