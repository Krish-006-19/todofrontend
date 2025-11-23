import React, { useState, useEffect, useRef } from 'react'

export default function AddTodo({ onAdd }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('low')

  const formRef = useRef()

  useEffect(() => {
    if (!open) return
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  async function submit(e) {
    e.preventDefault()
    await onAdd({ title, description, priority })
    setTitle('')
    setDescription('')
    setPriority('low')
    setOpen(false)
  }

  return (
    <>
      <button className="btn" onClick={() => setOpen(true)}>+ Add Todo</button>

      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="card add-modal" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
            <h3 style={{marginTop:0}}>Add Todo</h3>
            <form ref={formRef} className="stack" onSubmit={submit}>
              <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required autoFocus />
              <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
              <div className="row between">
                <select value={priority} onChange={e => setPriority(e.target.value)}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <div>
                  <button className="btn" type="submit">Save</button>
                  <button type="button" className="btn secondary" onClick={() => setOpen(false)}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
