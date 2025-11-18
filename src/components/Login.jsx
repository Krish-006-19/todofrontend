import React, { useState } from 'react'

export default function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function submit(e) {
    e.preventDefault()
    onLogin({ email, password })
  }

  return (
    <div className="card auth-card">
      <h2>Welcome Back</h2>
      <form onSubmit={submit} className="stack">
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <div className="row">
          <button className="btn">Login</button>
          <button type="button" className="btn secondary" onClick={onSwitch}>Register</button>
        </div>
      </form>
    </div>
  )
}
