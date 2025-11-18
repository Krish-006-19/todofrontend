import React, { useEffect, useState } from 'react'
import { login, register, fetchTodos, addTodo, updateTodo, deleteTodo } from './api'
import Login from './components/Login'
import Register from './components/Register'
import TodoList from './components/TodoList'

export default function App() {
  const [user, setUser] = useState(null)
  const [todos, setTodos] = useState([])
  const [view, setView] = useState('login')

  useEffect(() => {
    if (user) loadTodos(user.id || user._id)
  }, [user])

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
    <div className="app-root">
      <header className="topbar">
        <h1>Sunrise Todos</h1>
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
