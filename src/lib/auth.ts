// Simple client-side auth storage helpers

export type AuthUser = { _id: string; email?: string; displayName?: string }

const ACCESS_TOKEN_KEY = 'auth.accessToken'
const REFRESH_TOKEN_KEY = 'auth.refreshToken'
const USER_KEY = 'auth.user'

export function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

export function getAccessToken(): string | null {
  if (!isBrowser()) return null
  return window.localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken(): string | null {
  if (!isBrowser()) return null
  return window.localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function getUser(): AuthUser | null {
  if (!isBrowser()) return null
  const raw = window.localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

export function getUserId(): string | null {
  return getUser()?._id || null
}

export function setAuth(params: { accessToken: string; refreshToken?: string; user: AuthUser }): void {
  if (!isBrowser()) return
  window.localStorage.setItem(ACCESS_TOKEN_KEY, params.accessToken)
  if (params.refreshToken) {
    window.localStorage.setItem(REFRESH_TOKEN_KEY, params.refreshToken)
  }
  window.localStorage.setItem(USER_KEY, JSON.stringify(params.user))
}

export function clearAuth(): void {
  if (!isBrowser()) return
  window.localStorage.removeItem(ACCESS_TOKEN_KEY)
  window.localStorage.removeItem(REFRESH_TOKEN_KEY)
  window.localStorage.removeItem(USER_KEY)
}


