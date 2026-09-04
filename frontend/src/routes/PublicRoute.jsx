import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function PublicRoute() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <p>Loading...</p>
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}