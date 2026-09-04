import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setLoading(true)

    try {
      await login(
        form.email,
        form.password
      )

      navigate('/dashboard', { replace: true })
    } catch (err) {
      const firstError = err.errors
        ? Object.values(err.errors)[0]?.[0]
        : err.message

      setError(
        firstError || 'Unable to sign in. Please check your credentials.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-background" />

      <div className="auth-card login-card">

        {/* Logo */}
        <div className="brand">
          <div className="brand-logo">
            <span>⌂</span>
          </div>

          <div className="brand-name">
            Property Management
          </div>

          <div className="brand-subtitle">
            Software
          </div>
        </div>

        {/* Heading */}
        <div className="auth-heading">
          <h1>Welcome Back</h1>

          <p>
            Sign in to continue to your account.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >

          {/* Email */}
          <label>
            Email Address

            <div className="input-wrapper">
              <span className="input-icon">
                ✉
              </span>

              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </label>

          {/* Password */}
          <label>
            Password

            <div className="input-wrapper">
              <span className="input-icon">
                🔒
              </span>

              <input
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
              >
                {showPassword ? '◉' : '◌'}
              </button>
            </div>
          </label>

          {/* Remember + Forgot */}
          <div className="login-options">

            <label className="remember-option">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) =>
                  setRememberMe(event.target.checked)
                }
              />

              <span>
                Remember me
              </span>
            </label>

            <button
              type="button"
              className="forgot-password"
              onClick={() => {
                setError(
                  'Password reset is not available yet.'
                )
              }}
            >
              Forgot password?
            </button>

          </div>

          {/* Sign In */}
          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            {loading
              ? 'Signing In...'
              : 'Sign In'}
          </button>

        </form>

        {/* Divider */}
        <div className="auth-divider">
          <span />
          <p>or</p>
          <span />
        </div>

        {/* Google */}
        <button
          type="button"
          className="google-button"
          onClick={() => {
            setError(
              'Google sign-in is not available yet.'
            )
          }}
        >
          <span className="google-icon">
            G
          </span>

          <span>
            Sign in with Google
          </span>
        </button>

        {/* Register */}
        <div className="auth-footer">
          Don't have an account?

          <Link to="/register">
            Register
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Login