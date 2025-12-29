import axios from 'axios'

const API_BASE = 'https://todo-backend-api-6.onrender.com'

const client = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

function unwrap(res) {
  console.log('API response:', res && res.data ? res.data : res)
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
export const deleteTodo = (_id) => client.delete(`/todo/${_id}`).then(unwrap)
