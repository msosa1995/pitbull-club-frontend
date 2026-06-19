import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({ baseURL: API_URL })

api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  r => r,
  async error => {
    if (error.response?.status === 401) {
      const refresh = localStorage.getItem('refresh_token')
      if (refresh) {
        try {
          const res = await axios.post(`${API_URL}/api/token/refresh/`, { refresh })
          localStorage.setItem('access_token', res.data.access)
          error.config.headers.Authorization = `Bearer ${res.data.access}`
          return api(error.config)
        } catch {
          localStorage.clear()
          window.location.href = '/login'
        }
      }
    }
    return Promise.reject(error)
  }
)

export const login = (username, password) =>
  axios.post(`${API_URL}/api/token/`, { username, password })

// Stats (público)
export const getStats = () => axios.get(`${API_URL}/api/integrantes/stats/`)

// Integrantes (admin)
export const getIntegrantes = (params) => api.get('/api/integrantes/', { params })
export const getIntegrante = (id) => api.get(`/api/integrantes/${id}/`)
export const createIntegrante = (data) => api.post('/api/integrantes/', data)
export const updateIntegrante = (id, data) => api.patch(`/api/integrantes/${id}/`, data)
export const deleteIntegrante = (id) => api.delete(`/api/integrantes/${id}/`)

// Perros (público GET, auth para write)
export const getPerros = (params) => axios.get(`${API_URL}/api/perros/`, { params })
export const getPerrosAdmin = (params) => api.get('/api/perros/', { params })
export const getPerro = (id) => axios.get(`${API_URL}/api/perros/${id}/`)
export const createPerro = (data) => api.post('/api/perros/', data)
export const updatePerro = (id, data) => api.patch(`/api/perros/${id}/`, data)
export const deletePerro = (id) => api.delete(`/api/perros/${id}/`)

// Eventos (público GET, auth para write)
export const getEventos = (params) => axios.get(`${API_URL}/api/eventos/`, { params })
export const getEvento = (id) => axios.get(`${API_URL}/api/eventos/${id}/`)
export const createEvento = (data) => api.post('/api/eventos/', data)
export const updateEvento = (id, data) => api.patch(`/api/eventos/${id}/`, data)
export const deleteEvento = (id) => api.delete(`/api/eventos/${id}/`)

// Noticias (público GET)
export const getNoticias = (params) => axios.get(`${API_URL}/api/noticias/`, { params })
export const getNoticia = (id) => axios.get(`${API_URL}/api/noticias/${id}/`)
export const createNoticia = (data) => api.post('/api/noticias/', data)
export const updateNoticia = (id, data) => api.patch(`/api/noticias/${id}/`, data)
export const deleteNoticia = (id) => api.delete(`/api/noticias/${id}/`)

// Campeonatos (público GET)
export const getCampeonatos = () => axios.get(`${API_URL}/api/campeonatos/`)
export const getCampeonato = (id) => axios.get(`${API_URL}/api/campeonatos/${id}/`)

// Mapa (público)
export const getMapa = () => axios.get(`${API_URL}/api/integrantes/mapa/`)

// Camadas (público GET)
export const getCamadas = (params) => axios.get(`${API_URL}/api/camadas/`, { params })
export const createCamada = (data) => api.post('/api/camadas/', data)
export const updateCamada = (id, data) => api.patch(`/api/camadas/${id}/`, data)
export const deleteCamada = (id) => api.delete(`/api/camadas/${id}/`)

// Sesión
export const getMe = () => api.get('/api/me/')
export const cambiarPassword = (data) => api.post('/api/cambiar-password/', data)

// Panel de miembro — mis perros
export const getMisPerros = (params) => api.get('/api/mis-perros/', { params })
export const getMiPerro = (id) => api.get(`/api/mis-perros/${id}/`)
export const createMiPerro = (data) => api.post('/api/mis-perros/', data)
export const updateMiPerro = (id, data) => api.patch(`/api/mis-perros/${id}/`, data)
export const deleteMiPerro = (id) => api.delete(`/api/mis-perros/${id}/`)

// Panel de miembro — mis camadas
export const getMisCamadas = (params) => api.get('/api/mis-camadas/', { params })
export const createMiCamada = (data) => api.post('/api/mis-camadas/', data)
export const updateMiCamada = (id, data) => api.patch(`/api/mis-camadas/${id}/`, data)
export const deleteMiCamada = (id) => api.delete(`/api/mis-camadas/${id}/`)

// Crear usuario para integrante (admin)
export const crearUsuarioIntegrante = (id) => api.post(`/api/integrantes/${id}/crear_usuario/`)

export default api
