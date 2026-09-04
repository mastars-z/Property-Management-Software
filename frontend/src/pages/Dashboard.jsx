import { useAuth } from '../auth/AuthContext'

export default function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <main>
      <h1>Dashboard</h1>

      <p>Welcome, {user?.name}</p>

      <p>Role: {user?.role}</p>

      <button onClick={logout}>
        Logout
      </button>
    </main>
  )
}