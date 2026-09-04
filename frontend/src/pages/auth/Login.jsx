import { useState } from 'react'
import { useAuth } from '../../auth/AuthContext'

export default function Login() {
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setLoading(true)

    try {
      await login(email, password)
    } catch (error) {
      if (error.status === 422) {
        setError('The email or password is incorrect.')
      } else if (error.status === 403) {
        setError('Your account is not active.')
      } else {
        setError('Unable to login. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <h1>Property Management Software</h1>

      <h2>Sign In</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        {error && (
          <p role="alert">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </main>
  )
}