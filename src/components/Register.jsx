import React, { useState } from 'react'

export default function Register({ onRegister, onSwitch }) {
  const [first_name, setFirst] = useState('')
  const [last_name, setLast] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function submit(e) {
    e.preventDefault()
    onRegister({ first_name, last_name, email, password })
  }

  return (
    <div className="card auth-card">
      <h2>Create Account</h2>
      <form onSubmit={submit} className="stack">
        <div className="row">
          <input placeholder="First" value={first_name} onChange={e => setFirst(e.target.value)} required />
          <input placeholder="Last" value={last_name} onChange={e => setLast(e.target.value)} required />
        </div>
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <div className="row">
          <button className="btn">Register</button>
          <button type="button" className="btn secondary" onClick={onSwitch}>Back</button>
        </div>
      </form>
    </div>
  )
}
