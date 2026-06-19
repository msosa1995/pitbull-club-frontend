import { createContext, useContext, useState, useEffect } from 'react'
import { login as apiLogin } from './api'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      fetchMe(token)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchMe = async (token) => {
    try {
      const res = await axios.get(`${API_URL}/api/me/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setUser(res.data)
    } catch {
      localStorage.clear()
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (username, password) => {
    const res = await apiLogin(username, password)
    localStorage.setItem('access_token', res.data.access)
    localStorage.setItem('refresh_token', res.data.refresh)
    await fetchMe(res.data.access)
  }

  const loginConTokens = async (access, refresh) => {
    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)
    await fetchMe(access)
  }

  const logout = () => {
    localStorage.clear()
    setUser(null)
  }

  const refreshMe = () => {
    const token = localStorage.getItem('access_token')
    if (token) fetchMe(token)
  }

  return (
    <AuthContext.Provider value={{ user, login, loginConTokens, logout, loading, refreshMe }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
