/**
 * useAdminAuth — PIN-based admin authentication using sessionStorage.
 *
 * The PIN is set via VITE_ADMIN_PIN environment variable (defaults to "1234").
 * Auth state lives in sessionStorage so it clears when the browser tab closes.
 */
import { useState, useCallback } from 'react'

const SESSION_KEY = 'cafe_admin_auth'
const CORRECT_PIN = import.meta.env.VITE_ADMIN_PIN ?? '1234'

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(SESSION_KEY) === 'true'
  })
  const [error, setError] = useState('')

  const login = useCallback((pin: string) => {
    if (pin === CORRECT_PIN) {
      sessionStorage.setItem(SESSION_KEY, 'true')
      setIsAuthenticated(true)
      setError('')
      return true
    }
    setError('Incorrect PIN. Try again.')
    return false
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY)
    setIsAuthenticated(false)
  }, [])

  return { isAuthenticated, login, logout, error }
}
