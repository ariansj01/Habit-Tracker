"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAccessToken, getUser, type AuthUser } from '@/lib/auth'
import { useMounted } from '@/lib/hooks/use-mounted'

interface AuthContextType {
  isAuthenticated: boolean
  user: AuthUser | null
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  isLoading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const mounted = useMounted()
  const router = useRouter()

  useEffect(() => {
    if (!mounted) return

    const checkAuth = () => {
      const token = getAccessToken()
      const userData = getUser()
      
      if (token && userData) {
        setIsAuthenticated(true)
        setUser(userData)
      } else {
        setIsAuthenticated(false)
        setUser(null)
        // Redirect to login if not authenticated
        router.push('/login')
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router, mounted])

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
