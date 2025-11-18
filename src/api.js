const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function request(path, options = {}) {
  const res = await fetch(API_BASE + path, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw { status: res.status, ...data }
  return data
}

export const register = (payload) => request('/register', { method: 'POST', body: JSON.stringify(payload) })
export const login = (payload) => request('/login', { method: 'POST', body: JSON.stringify(payload) })
export const fetchTodos = () => request('/todo', { method: 'GET' })
export const addTodo = (payload) => request('/todo', { method: 'POST', body: JSON.stringify(payload) })
export const updateTodo = (id, subid, payload) => request(`/todo/${id}/${subid}`, { method: 'PATCH', body: JSON.stringify(payload) })
export const deleteTodo = (_id) => request(`/todo/${_id}`, { method: 'DELETE' })
