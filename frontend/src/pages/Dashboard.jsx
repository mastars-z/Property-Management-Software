import { useAuth } from '../auth/AuthContext'
import { ROLES } from '../auth/roles'

export default function Dashboard() {
  const { user, logout } = useAuth()

  const renderDashboardMessage = () => {
  switch (user?.role) {
    case ROLES.ADMINISTRATOR:
      return 'Welcome to the Administrator Dashboard.'

    case ROLES.PROPERTY_OWNER:
      return 'Welcome to the Property Owner Dashboard.'

    case ROLES.PROPERTY_MANAGER:
      return 'Welcome to the Property Manager Dashboard.'

    case ROLES.TENANT:
      return 'Welcome to the Tenant Dashboard.'

    default:
      return 'Welcome to your Dashboard.'
  }
}

  return (
    <main>
      <h1>Dashboard</h1>

      <p>
        Welcome, {user?.name}
      </p>

      <p>
        Role: {user?.role}
      </p>

      <p>
        {renderDashboardMessage()}
      </p>

      <button onClick={logout}>
        Logout
      </button>
    </main>
  )
}