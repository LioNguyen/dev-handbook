import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthLayout } from '@/components/templates'
import { LoginForm, RegisterForm } from '@/domains/auth/components'

export const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showRegister, setShowRegister] = useState(false)

  const from = (location.state as { from?: string })?.from || '/dashboard'

  const handleLoginSuccess = () => {
    navigate(from, { replace: true })
  }

  const handleRegisterSuccess = () => {
    navigate(from, { replace: true })
  }

  return (
    <AuthLayout
      title={showRegister ? 'Create Account' : 'Welcome Back'}
      subtitle={
        showRegister
          ? 'Sign up to get started with your dashboard'
          : 'Sign in to access your account'
      }
    >
      {showRegister ? (
        <RegisterForm
          onSuccess={handleRegisterSuccess}
          onSwitchToLogin={() => setShowRegister(false)}
        />
      ) : (
        <LoginForm
          onSuccess={handleLoginSuccess}
          onSwitchToRegister={() => setShowRegister(true)}
        />
      )}
    </AuthLayout>
  )
}
