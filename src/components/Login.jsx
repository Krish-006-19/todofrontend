import { useState } from 'react'
import { login, fetchTodos } from './api'

function LoginComponent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    
    try {
      console.log('Logging in with', { email, password })
      
      // ✅ Login and get user data
      const response = await login({ email, password })
      console.log('Login response', response)
      
      // ✅ IMPORTANT: Set user state
      setUser(response.user)
      
      // ✅ NOW fetch todos (token is already in localStorage)
      const todos = await fetchTodos(response.user._id)
      console.log('Fetched todos:', todos)
      
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email"
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  )
}
