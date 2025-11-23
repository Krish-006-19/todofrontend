import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const client = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

function unwrap(res) {
  return res.data
}

export const register = (payload) => client.post('/register', payload).then(unwrap)
export const login = (payload) => client.post('/login', payload).then(unwrap)
export const fetchTodos = (userId) => {
  if (!userId) return Promise.resolve({ todo: [] })
  return client.get(`/todo/${userId}`).then(unwrap)
}
export const addTodo = (payload) => client.post('/todo', payload).then(unwrap)
export const updateTodo = (id, subid, payload) => client.patch(`/todo/${id}/${subid}`, payload).then(unwrap)
export const deleteTodo = (_id) => client.delete(`/${_id}`).then(unwrap)
