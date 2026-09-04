import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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
      await register(
        form.name,
        form.email,
        form.password,
        form.password_confirmation
      )

      navigate('/dashboard', { replace: true })
    } catch (err) {
      const firstError = err.errors
        ? Object.values(err.errors)[0]?.[0]
        : err.message

      setError(firstError || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-background" />

      <div className="auth-card register-card">

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
          <h1>Create Account</h1>
          <p>Register to manage your properties with ease.</p>
        </div>

        {/* Error */}
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="auth-form">

          {/* Full Name */}
          <label>
            Full Name

            <div className="input-wrapper">
              <span className="input-icon">♙</span>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          </label>

          {/* Email */}
          <label>
            Email Address

            <div className="input-wrapper">
              <span className="input-icon">✉</span>

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

          {/* Phone */}
          <label>
            Phone Number

            <div className="input-wrapper">
              <span className="input-icon">⌕</span>

              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </label>

          {/* Password */}
          <label>
            Password

            <div className="input-wrapper">
              <span className="input-icon">♙</span>

              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={8}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? '◉' : '◌'}
              </button>
            </div>
          </label>

          {/* Confirm Password */}
          <label>
            Confirm Password

            <div className="input-wrapper">
              <span className="input-icon">♙</span>

              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="password_confirmation"
                placeholder="Confirm your password"
                value={form.password_confirmation}
                onChange={handleChange}
                required
                minLength={8}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? '◉' : '◌'}
              </button>
            </div>
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            {loading
              ? 'Creating Account...'
              : 'Create Account'}
          </button>

        </form>

        {/* Login Link */}
        <div className="auth-footer">
          Already have an account?

          <Link to="/login">
            Sign in
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Register