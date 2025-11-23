import React, { useEffect, useState, useRef } from 'react'
import { login, register, fetchTodos, addTodo, updateTodo, deleteTodo } from './api'
import Login from './components/Login'
import Register from './components/Register'
import TodoList from './components/TodoList'

export default function App() {
  const [user, setUser] = useState(null)
  const [todos, setTodos] = useState([])
  const [view, setView] = useState('login')
  const rootRef = useRef()

  useEffect(() => {
    if (user) loadTodos(user.id || user._id)
  }, [user])

  useEffect(() => {
    // set sensible defaults
    document.documentElement.style.setProperty('--mx', '50')
    document.documentElement.style.setProperty('--my', '50')
  }, [])

  function handleMouseMove(e) {
    const el = rootRef.current || document.documentElement
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const px = Math.max(0, Math.min(100, Math.round((x / rect.width) * 100)))
    const py = Math.max(0, Math.min(100, Math.round((y / rect.height) * 100)))
    document.documentElement.style.setProperty('--mx', String(px))
    document.documentElement.style.setProperty('--my', String(py))
  }

  function handleMouseLeave() {
    document.documentElement.style.setProperty('--mx', '50')
    document.documentElement.style.setProperty('--my', '50')
  }

  async function doLogin(creds) {
    try {
      const data = await login(creds)
      setUser(data.user)
      setView('todos')
    } catch (err) {
      alert(err.msg || 'Login failed')
    }
  }

  async function doRegister(creds) {
    try {
      await register(creds)
      alert('Registered — please log in')
      setView('login')
    } catch (err) {
      alert(err.msg || 'Register failed')
    }
  }

  async function loadTodos(userId) {
    try {
      const res = await fetchTodos(userId)
      setTodos(res.todo || [])
    } catch (err) {
      console.error(err)
      setTodos([])
    }
  }

  async function handleAdd(payload) {
    try {
      await addTodo(payload)
      loadTodos(user?.id || user?._id)
    } catch (err) { alert(err.msg || 'Add failed') }
  }

  async function handleUpdate(id, subid, payload) {
    try {
      await updateTodo(id, subid, payload)
      loadTodos(user?.id || user?._id)
    } catch (err) { alert(err.msg || 'Update failed') }
  }

  async function handleDelete(_id) {
    if (!confirm('Delete this todo?')) return
    try {
      await deleteTodo(_id)
      loadTodos(user?.id || user?._id)
    } catch (err) { alert(err.msg || 'Delete failed') }
  }

  return (
    <div className="app-root" ref={rootRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="bg-layer" aria-hidden="true">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
      </div>
      <header className="topbar">
        <h1><span className="logo-badge">SD</span>Sunrise Todos</h1>
        <div className="user-area">
          {user ? <span>Hi, {user.first_name}</span> : null}
          {user ? <button onClick={() => { setUser(null); setTodos([]); setView('login') }} className="btn small">Logout</button> : null}
        </div>
      </header>

      <main className="container">
        {!user && view === 'login' && <Login onLogin={doLogin} onSwitch={() => setView('register')} />}
        {!user && view === 'register' && <Register onRegister={doRegister} onSwitch={() => setView('login')} />}
        {user && <TodoList todos={todos} onAdd={handleAdd} onUpdate={handleUpdate} onDelete={handleDelete} />}

        {!user && (
          <footer className="help">Tip: register then login. Backend cookies are used for auth.</footer>
        )}
      </main>
    </div>
  )
}
