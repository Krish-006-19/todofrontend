import axios from 'axios'

const API_BASE = 'https://todo-backend-api-6.onrender.com'

const client = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

// ✅ CRITICAL: Add interceptor to inject token into EVERY request
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

function unwrap(res) {
  console.log('API response:', res && res.data ? res.data : res)
  return res.data
}

export const register = (payload) => client.post('/register', payload).then(unwrap)

export const login = async (payload) => {
  const response = await client.post('/login', payload).then(unwrap)
  // ✅ Save token immediately after login
  if (response.accessToken) {
    localStorage.setItem('accessToken', response.accessToken)
    console.log('Token saved to localStorage:', response.accessToken)
  }
  return response
}

export const logout = () => {
  localStorage.removeItem('accessToken')
}

export const fetchTodos = (userId) => {
  if (!userId) return Promise.resolve({ todo: [] })
  return client.get(`/todo/${userId}`).then(unwrap)
}

export const addTodo = (payload) => client.post('/todo', payload).then(unwrap)

export const updateTodo = (id, subid, payload) => 
  client.patch(`/todo/${id}/${subid}`, payload).then(unwrap)

export const deleteTodo = (_id) => client.delete(`/todo/${_id}`).then(unwrap)
