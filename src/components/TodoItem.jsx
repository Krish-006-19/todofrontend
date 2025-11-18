import React, { useState } from 'react'

export default function TodoItem({ todo, parentId, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const [description, setDescription] = useState(todo.description)
  const [priority, setPriority] = useState(todo.priority)
  const [completed, setCompleted] = useState(todo.completed || false)

  async function save() {
    await onUpdate(parentId, todo._id, { title, description, priority, completed })
    setEditing(false)
  }

  return (
    <div className={`todo ${completed ? 'done' : ''}`}>
      {!editing ? (
        <>
          <div className="row between">
            <h3>{title}</h3>
            <div className="pill">{priority}</div>
          </div>
          <p className="muted">{description}</p>
          <div className="row">
            <label className="switch"><input type="checkbox" checked={completed} onChange={e => { setCompleted(e.target.checked); onUpdate(parentId, todo._id, { title, description, priority, completed: e.target.checked }) }} /><span></span></label>
            <div className="spacer" />
            <button className="btn small" onClick={() => setEditing(true)}>Edit</button>
            <button className="btn danger small" onClick={() => onDelete(todo._id)}>Delete</button>
          </div>
        </>
      ) : (
        <div className="stack">
          <input value={title} onChange={e => setTitle(e.target.value)} />
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
          <div className="row between">
            <select value={priority} onChange={e => setPriority(e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <div>
              <button className="btn" onClick={save}>Save</button>
              <button className="btn secondary" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
