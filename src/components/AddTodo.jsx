import React, { useState } from 'react'

export default function AddTodo({ onAdd }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('low')

  async function submit(e) {
    e.preventDefault()
    await onAdd({ title, description, priority })
    setTitle(''); setDescription(''); setPriority('low'); setOpen(false)
  }

  if (!open) return <button className="btn" onClick={() => setOpen(true)}>+ Add Todo</button>

  return (
    <form className="stack add-form" onSubmit={submit}>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
      <div className="row between">
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div>
          <button className="btn">Save</button>
          <button type="button" className="btn secondary" onClick={() => setOpen(false)}>Cancel</button>
        </div>
      </div>
    </form>
  )
}
