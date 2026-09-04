import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

const API_URL = 'http://localhost:8000/api'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(
    () => localStorage.getItem('auth_token')
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`${API_URL}/me`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          localStorage.removeItem('auth_token')
          setToken(null)
          setUser(null)
          return
        }

        const data = await response.json()
        setUser(data.user)
      } catch (error) {
        console.error('Authentication check failed:', error)
        localStorage.removeItem('auth_token')
        setToken(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [token])

  const login = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      const error = new Error(data.message || 'Login failed.')
      error.status = response.status
      error.errors = data.errors
      throw error
    }

    localStorage.setItem('auth_token', data.token)
    setToken(data.token)
    setUser(data.user)

    return data.user
  }

  const logout = async () => {
    if (!token) {
      setUser(null)
      return
    }

    try {
      await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      console.error('Logout request failed:', error)
    } finally {
      localStorage.removeItem('auth_token')
      setToken(null)
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: Boolean(user && token),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}